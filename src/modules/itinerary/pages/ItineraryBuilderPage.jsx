import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton
} from '@mui/material';
import {
  MdOutlineSettings,
  MdOutlineVisibility,
  MdListAlt,
  MdOutlineEdit,
  MdAdd,
  MdOutlineCameraAlt,
  MdHotel,
  MdFlight,
  MdDirectionsCar,
  MdLocalActivity,
  MdDirectionsBoat,
  MdDirectionsBus,
  MdTrain,
  MdCardGiftcard,
  MdMoreVert,
  MdClose
} from 'react-icons/md';

import ServiceModal from '../components/ServiceModals';
import { create, update, getById } from '@/services/itinerary.service';
import { formatCurrency } from '@utils/formatters';
import '../styles/itinerary.css';

const TRIP_TYPES = ['Honeymoon', 'Family', 'Friends', 'Solo', 'Corporate'];

const SERVICE_ICONS = {
  Hotel: MdHotel,
  Flight: MdFlight,
  Transport: MdDirectionsCar,
  Sightseeing: MdLocalActivity,
  Activity: MdLocalActivity,
  Cruise: MdDirectionsBoat,
  Ferry: MdDirectionsBoat,
  Bus: MdDirectionsBus,
  Train: MdTrain,
  Complementary: MdCardGiftcard,
  Complementry: MdCardGiftcard
};

const SERVICE_TYPES = [
  'Hotel',
  'Flight',
  'Transport',
  'Sightseeing',
  'Activity',
  'Cruise',
  'Ferry',
  'Bus',
  'Train',
  'Complementry'
];

const PRESET_COVERS = [
  { name: 'Mountain & Valley', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tropical Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sacred Temple', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80' },
  { name: 'Kashmir Lake', url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80' },
  { name: 'Pine Forest', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mountain Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' }
];

export default function ItineraryBuilderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Itinerary General Form States
  const [itinId, setItinId] = useState(`ITN-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [name, setName] = useState('');
  const [customerName, setCustomerName] = useState('Ramesh Sharma'); // default dummy matching screenshot
  const [phone, setPhone] = useState('+91 98765 43210');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [durationDays, setDurationDays] = useState(0);
  const [durationNights, setDurationNights] = useState(0);
  const [type, setType] = useState('Honeymoon');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('Draft');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);

  // Travelers breakdown
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Lists
  const [services, setServices] = useState([]);
  const [days, setDays] = useState([]);

  // Active UI States
  const [activeDay, setActiveDay] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Custom Menu & Dialog Openers
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState(null);
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  
  // Service action dropdown inside card
  const [serviceActionIndex, setServiceActionIndex] = useState(null);

  // Dialog states
  const [editCoverOpen, setEditCoverOpen] = useState(false);
  const [editDayOpen, setEditDayOpen] = useState(false);
  const [editBasicOpen, setEditBasicOpen] = useState(false);

  // Temporary dialog fields
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [tempDayTitle, setTempDayTitle] = useState('');
  const [tempDayDesc, setTempDayDesc] = useState('');
  
  // Temporary basic info edit fields
  const [tempName, setTempName] = useState('');
  const [tempDest, setTempDest] = useState('');
  const [tempType, setTempType] = useState('');
  const [tempAdults, setTempAdults] = useState(2);
  const [tempChildren, setTempChildren] = useState(0);
  const [tempInfants, setTempInfants] = useState(0);
  const [tempDesc, setTempDesc] = useState('');

  // Load itinerary if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadItinerary = async () => {
        try {
          const item = await getById(id);
          setItinId(item.id);
          setName(item.name);
          setCustomerName(item.customerName || 'Aarav Mehta');
          setPhone(item.phone || '+91 98765 43210');
          setDestination(item.destination);
          setStartDate(item.startDate);
          setEndDate(item.endDate);
          setDurationDays(item.durationDays);
          setDurationNights(item.durationNights);
          setType(item.type);
          setDescription(item.description);
          setAmount(item.amount);
          setStatus(item.status);
          setCoverImage(item.coverImage || PRESET_COVERS[0].url);
          setAdults(item.adults ?? 2);
          setChildren(item.children ?? 0);
          setInfants(item.infants ?? 0);
          setServices(item.services || []);
          setDays(item.days || []);
        } catch (error) {
          setErrorMsg('Failed to fetch itinerary details.');
        }
      };
      loadItinerary();
    }
  }, [id, isEditMode]);

  // Handle auto-calculation of duration when dates change in basic info form
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setDurationDays(diffDays);
        setDurationNights(diffDays - 1);
      } else {
        setDurationDays(0);
        setDurationNights(0);
      }
    }
  }, [startDate, endDate]);

  // Sync pricing based on added services
  useEffect(() => {
    if (isEditMode) {
      const total = services.reduce((acc, curr) => acc + (curr.totalCost || 0), 0);
      setAmount(total);
    }
  }, [services, isEditMode]);

  // Distribute destinations comma-separated to day titles upon creation
  const distributeDestinations = (destList, daysCount) => {
    const dests = destList ? destList.split(',').map((d) => d.trim()).filter(Boolean) : [];
    if (dests.length === 0) return Array.from({ length: daysCount }, (_, i) => `Day ${i + 1}`);

    const result = [];
    for (let i = 0; i < daysCount; i++) {
      // Rotate or assign destination matching indices
      const destIndex = Math.min(i, dests.length - 1);
      result.push(dests[destIndex]);
    }
    return result;
  };

  // Create new itinerary (Basic Info Form Save)
  const handleCreateItinerary = async () => {
    setErrorMsg('');
    if (!name.trim()) return setErrorMsg('Itinerary name is required.');
    if (!destination.trim()) return setErrorMsg('Destination is required.');
    if (!startDate) return setErrorMsg('Start date is required.');
    if (!endDate) return setErrorMsg('End date is required.');

    const calculatedDays = durationDays;
    const destList = distributeDestinations(destination, calculatedDays);

    // Initialize days structure
    const initialDays = Array.from({ length: calculatedDays }, (_, i) => ({
      dayNumber: i + 1,
      title: destList[i],
      description: i === 0 ? `Arrival in ${destList[i]} airport` : `Local sightseeing in ${destList[i]}`,
      image: PRESET_COVERS[Math.min(i, PRESET_COVERS.length - 1)].url
    }));

    const payload = {
      id: itinId,
      name,
      customerName,
      phone,
      destination,
      startDate,
      endDate,
      durationDays,
      durationNights,
      travelers: adults + children + infants,
      adults,
      children,
      infants,
      type,
      amount: 0,
      description,
      status: 'Draft',
      coverImage: PRESET_COVERS[0].url,
      days: initialDays,
      services: []
    };

    try {
      const createdItem = await create(payload);
      navigate(`/itinerary/build/${createdItem.id}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create itinerary.');
    }
  };

  // Save Service to the active day
  const handleSaveService = (serviceData) => {
    const typeLabel = serviceData.type === 'Complementary' ? 'Complementry' : serviceData.type;
    const newService = {
      ...serviceData,
      type: typeLabel,
      dayNumber: activeDay
    };

    let updatedServices;
    if (editingServiceIndex !== null) {
      updatedServices = [...services];
      updatedServices[editingServiceIndex] = newService;
    } else {
      updatedServices = [...services, newService];
    }

    setServices(updatedServices);
    saveItineraryUpdates({ services: updatedServices });
    
    setActiveModalType(null);
    setEditingServiceIndex(null);
  };

  const handleEditServiceClick = (index) => {
    setEditingServiceIndex(index);
    const srv = services[index];
    setActiveModalType(srv.type === 'Complementry' ? 'Complementary' : srv.type);
    setServiceActionIndex(null);
  };

  const handleRemoveService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    saveItineraryUpdates({ services: updatedServices });
    setServiceActionIndex(null);
  };

  // Quick save to localStorage
  const saveItineraryUpdates = async (updates) => {
    try {
      const current = await getById(id);
      const payload = { ...current, ...updates };
      await update(id, payload);
    } catch (e) {
      console.error('Failed to auto-save itinerary updates:', e);
    }
  };

  // Trigger Cover Image Dialog
  const handleSaveCoverImage = () => {
    setCoverImage(customCoverUrl);
    saveItineraryUpdates({ coverImage: customCoverUrl });
    setEditCoverOpen(false);
  };

  const selectPresetCover = (url) => {
    setCustomCoverUrl(url);
  };

  // Trigger Edit Day Dialog
  const handleOpenEditDay = () => {
    const currentDay = days.find((d) => d.dayNumber === activeDay) || { title: '', description: '' };
    setTempDayTitle(currentDay.title);
    setTempDayDesc(currentDay.description);
    setEditDayOpen(true);
  };

  const handleSaveDay = () => {
    const updatedDays = days.map((d) => {
      if (d.dayNumber === activeDay) {
        return { ...d, title: tempDayTitle, description: tempDayDesc };
      }
      return d;
    });
    setDays(updatedDays);

    // Sync destinations list in top subtitle if needed
    const destList = Array.from(new Set(updatedDays.map((d) => d.title))).join(', ');
    setDestination(destList);

    saveItineraryUpdates({ days: updatedDays, destination: destList });
    setEditDayOpen(false);
  };

  // Trigger Edit Basic Info Dialog
  const handleOpenEditBasic = () => {
    setTempName(name);
    setTempDest(destination);
    setTempType(type);
    setTempAdults(adults);
    setTempChildren(children);
    setTempInfants(infants);
    setTempDesc(description);
    setEditBasicOpen(true);
  };

  const handleSaveBasic = () => {
    setName(tempName);
    setDestination(tempDest);
    setType(tempType);
    setAdults(tempAdults);
    setChildren(tempChildren);
    setInfants(tempInfants);
    setDescription(tempDesc);

    // update duration nights/days just in case
    saveItineraryUpdates({
      name: tempName,
      destination: tempDest,
      type: tempType,
      adults: tempAdults,
      children: tempChildren,
      infants: tempInfants,
      travelers: tempAdults + tempChildren + tempInfants,
      description: tempDesc
    });

    setEditBasicOpen(false);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Popup blocked. Please allow popups for this site.');
      return;
    }

    const servicesByDay = (dayNum) => services.filter(s => s.dayNumber === dayNum);

    const html = `
      <html>
        <head>
          <title>${name} - Travel Itinerary</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              margin: 0;
              padding: 40px;
              color: #1F2937;
              background-color: #ffffff;
              line-height: 1.5;
            }
            .itinerary-container {
              max-width: 850px;
              margin: 0 auto;
            }
            .header-card {
              position: relative;
              background-color: #111827;
              color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              margin-bottom: 32px;
              height: 280px;
            }
            .header-card img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              opacity: 0.65;
            }
            .header-overlay {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 32px;
              background: linear-gradient(transparent, rgba(0,0,0,0.85));
            }
            .header-overlay h1 {
              margin: 0 0 8px 0;
              font-size: 2.5rem;
              font-weight: 800;
              letter-spacing: -0.025em;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
              background-color: #F9FAFB;
              padding: 20px;
              border-radius: 12px;
              margin-bottom: 32px;
              border: 1px solid #E5E7EB;
            }
            .meta-item {
              display: flex;
              flex-direction: column;
            }
            .meta-label {
              font-size: 0.7rem;
              text-transform: uppercase;
              color: #6B7280;
              font-weight: 700;
              margin-bottom: 6px;
              letter-spacing: 0.05em;
            }
            .meta-value {
              font-size: 0.95rem;
              font-weight: 700;
              color: #111827;
            }
            .section-title {
              font-size: 1.6rem;
              font-weight: 800;
              color: #111827;
              border-bottom: 2px solid #E5E7EB;
              padding-bottom: 10px;
              margin-top: 40px;
              margin-bottom: 24px;
              letter-spacing: -0.02em;
            }
            .day-card {
              margin-bottom: 32px;
              page-break-inside: avoid;
            }
            .day-header {
              font-size: 1.25rem;
              font-weight: 800;
              color: #E15A3E;
              margin-bottom: 8px;
            }
            .day-desc {
              font-size: 0.95rem;
              color: #4B5563;
              margin-bottom: 18px;
              line-height: 1.6;
            }
            .service-card {
              background-color: #ffffff;
              border: 1px solid #E5E7EB;
              border-radius: 10px;
              padding: 16px;
              margin-bottom: 14px;
              display: flex;
              align-items: center;
              gap: 18px;
            }
            .service-icon-wrapper {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #F3F4F6;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.25rem;
              flex-shrink: 0;
            }
            .service-details {
              flex-grow: 1;
            }
            .service-title {
              font-weight: 700;
              font-size: 1rem;
              margin: 0 0 4px 0;
              color: #111827;
            }
            .service-meta {
              font-size: 0.825rem;
              color: #6B7280;
            }
            .service-desc {
              font-size: 0.825rem;
              color: #4B5563;
              margin: 6px 0 0 0;
              font-style: italic;
              border-left: 2px solid #E5E7EB;
              padding-left: 8px;
            }
            .service-price {
              font-weight: 800;
              color: #15803D;
              font-size: 1rem;
              flex-shrink: 0;
            }
            .pricing-summary {
              margin-top: 48px;
              padding: 24px;
              border-radius: 12px;
              background-color: #ECFDF5;
              border: 1px solid #A7F3D0;
              text-align: right;
              font-size: 1.35rem;
              font-weight: 800;
              color: #064E3B;
              page-break-inside: avoid;
            }
            .footer {
              text-align: center;
              margin-top: 64px;
              font-size: 0.8rem;
              color: #9CA3AF;
              border-top: 1px solid #E5E7EB;
              padding-top: 20px;
            }
            @media print {
              body {
                padding: 0;
              }
              .pricing-summary {
                background-color: #ECFDF5 !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="itinerary-container">
            <div class="header-card">
              <img src="${coverImage}" />
              <div class="header-overlay">
                <h1>${name}</h1>
                <div>Destination: ${destination}</div>
              </div>
            </div>

            <div class="meta-grid">
              <div class="meta-item">
                <span class="meta-label">Customer Name</span>
                <span class="meta-value">${customerName}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Start Date</span>
                <span class="meta-value">${startDate}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">End Date</span>
                <span class="meta-value">${endDate}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Total Pax</span>
                <span class="meta-value">${adults} Adults, ${children} Children, ${infants} Infants</span>
              </div>
            </div>

            ${description ? `
            <div style="margin-bottom: 32px; line-height: 1.6; font-size: 1rem; color: #374151;">
              ${description}
            </div>
            ` : ''}

            <div class="section-title">Day-by-Day Plan</div>
            ${days.map(day => `
              <div class="day-card">
                <div class="day-header">Day ${day.dayNumber} - ${day.title}</div>
                <div class="day-desc">${day.description || ''}</div>
                ${servicesByDay(day.dayNumber).map(srv => `
                  <div class="service-card">
                    <div class="service-icon-wrapper">
                      ${srv.type === 'Hotel' ? '🏨' : srv.type === 'Flight' ? '✈️' : srv.type === 'Transport' ? '🚗' : '🎟️'}
                    </div>
                    <div class="service-details">
                      <h4 class="service-title">${srv.title}</h4>
                      <div class="service-meta">
                        Type: ${srv.type}
                        ${srv.durationText ? ` &bull; Duration: ${srv.durationText}` : ''}
                        ${srv.type === 'Hotel' && srv.nights ? ` &bull; ${srv.nights} Nights` : ''}
                        ${srv.type === 'Hotel' && srv.bedOption ? ` &bull; Bed Option: ${srv.bedOption} (x${srv.bedCount})` : ''}
                      </div>
                      ${srv.description ? `<p class="service-desc">"${srv.description}"</p>` : ''}
                    </div>
                    <div class="service-price">₹${srv.totalCost.toLocaleString()}</div>
                  </div>
                `).join('')}
              </div>
            `).join('')}

            <div class="pricing-summary">
              Total Itinerary Price: ₹${amount.toLocaleString()}
            </div>

            <div class="footer">
              Thank you for booking with us. Generated on ${new Date().toLocaleDateString()}.
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Helper check to display icons in left sidebar
  const getAttachedIcons = (dayNum) => {
    const dayServices = services.filter((s) => s.dayNumber === dayNum);
    const types = Array.from(new Set(dayServices.map((s) => s.type)));
    return types.map((t, i) => {
      const Icon = SERVICE_ICONS[t] || MdCardGiftcard;
      return <Icon key={i} size={14} style={{ marginRight: '3px' }} />;
    });
  };

  // Toggle Context menu inside service card
  const toggleServiceAction = (e, index) => {
    e.stopPropagation();
    setServiceActionIndex(serviceActionIndex === index ? null : index);
  };

  // Close context menu on click outside
  useEffect(() => {
    const closeActionMenu = () => setServiceActionIndex(null);
    document.addEventListener('click', closeActionMenu);
    return () => document.removeEventListener('click', closeActionMenu);
  }, []);

  // Filter services for the active day
  const activeDayServices = services.filter((s) => s.dayNumber === activeDay);
  const activeDayData = days.find((d) => d.dayNumber === activeDay) || { title: 'Day Details', description: 'Arrival and activities', image: PRESET_COVERS[0].url };

  // Render CREATE Mode (Image 3)
  if (!isEditMode) {
    return (
      <div className="itinerary-module-wrapper">
        <div className="itin-create-container">
          <a className="itin-back-link" onClick={() => navigate('/itinerary')}>
            &larr; Back to dashboard
          </a>
          <h1 className="itin-form-title">Create itinerary</h1>
          <p className="itin-form-subtitle">Enter the basic trip details. You\'ll build the day-by-day plan next.</p>

          <div className="itin-form-card">
            <div className="itin-form-section-header">Basic Information</div>

            {errorMsg && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label className="itin-form-label">Itinerary name</label>
                <input
                  type="text"
                  className="itin-form-input"
                  placeholder="e.g. Bali Honeymoon Escape"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="itin-form-label">Itinerary ID</label>
                <input type="text" className="itin-form-input" disabled value={itinId} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label className="itin-form-label">Destination</label>
                <select
                  className="itin-form-select"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">Select a country...</option>
                  <option value="Shimla, Manali, Dharamshala">Shimla, Manali, Dharamshala (Himachal)</option>
                  <option value="Haridwar, guptakashi, Kedarnath">Haridwar, guptakashi, Kedarnath (Chardham)</option>
                  <option value="Srinagar, Gulmarg, Pahalgam, Sonmarg">Srinagar, Gulmarg, Pahalgam (Kashmir)</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Bali, Indonesia">Bali, Indonesia</option>
                  <option value="Interlaken, Switzerland">Interlaken, Switzerland</option>
                </select>
                <span className="itin-form-input-subtext">Loaded from country reference data</span>
              </div>
              <div>
                <label className="itin-form-label">Trip type</label>
                <select className="itin-form-select" value={type} onChange={(e) => setType(e.target.value)}>
                  {TRIP_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label className="itin-form-label">Start date</label>
                <input
                  type="date"
                  className="itin-form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="itin-form-label">End date</label>
                <input
                  type="date"
                  className="itin-form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <label className="itin-form-label">Duration</label>
                <input
                  type="text"
                  className="itin-form-input"
                  disabled
                  value={startDate && endDate ? `${durationNights} Nights - ${durationDays} Days` : 'Auto-calculated'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label className="itin-form-label">Number of travelers</label>
                <input
                  type="number"
                  className="itin-form-input"
                  value={adults}
                  onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value || 1, 10)))}
                />
              </div>
              <div>
                <label className="itin-form-label">Estimated amount</label>
                <input type="text" className="itin-form-input" disabled value="₹ 0" />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="itin-form-label">Description</label>
              <textarea
                rows={4}
                className="itin-form-textarea"
                placeholder="Trip highlights, client preferences, notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="itin-form-actions">
              <button className="btn-cancel" onClick={() => navigate('/itinerary')}>
                Cancel
              </button>
              <button className="btn-coral" onClick={handleCreateItinerary}>
                Save & build day plan &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render EDIT/BUILD Mode (Image 4)
  return (
    <div className="itinerary-module-wrapper">
      {/* 1. Header */}
      <div className="itin-builder-top-header">
        <div className="itin-builder-header-titles">
          <a className="itin-back-link" onClick={() => navigate('/itinerary')}>
            &larr; Back to dashboard
          </a>
          <h1>{name}</h1>
          <div className="itin-builder-header-subtitle">
            {durationNights} Nights - {durationDays} Days &bull; {destination} &bull; {adults} Adults, {children} Children, {infants} Infants
          </div>
        </div>

        <div className="itin-builder-header-actions">
          <button className="btn-builder-action" title="Settings">
            <MdOutlineSettings size={18} />
          </button>
          <button className="btn-builder-action outline-green" onClick={() => navigate('/itinerary')}>
            <MdOutlineVisibility size={18} />
            Preview
          </button>
          <button className="btn-builder-action solid-green" onClick={handleExportPDF}>
            <MdListAlt size={18} />
            Export PDF
          </button>
          <button className="btn-builder-action solid-green" onClick={handleOpenEditBasic}>
            <MdOutlineEdit size={18} />
            Edit Itinerary
          </button>
        </div>
      </div>

      {/* 2. Cover Image Banner */}
      <div className="itin-builder-banner-container">
        <img src={coverImage} alt={name} className="itin-builder-banner-img" />
        <div className="itin-builder-banner-overlay"></div>
        <button className="btn-edit-cover" onClick={() => { setCustomCoverUrl(coverImage); setEditCoverOpen(true); }}>
          <MdOutlineCameraAlt size={16} />
          Edit Cover Image
        </button>
      </div>

      {/* 3. Main Builder Body */}
      <div className="itin-builder-body">
        {/* Left Days Sidebar */}
        <div className="itin-builder-sidebar">
          <div className="itin-builder-sidebar-header">
            <h4 className="itin-builder-sidebar-title">Days</h4>
            <span className="itin-builder-sidebar-sub">{durationDays} days</span>
          </div>

          <div className="itin-builder-days-list">
            {days.map((day) => (
              <button
                key={day.dayNumber}
                className={`itin-builder-day-item ${activeDay === day.dayNumber ? 'active' : ''}`}
                onClick={() => setActiveDay(day.dayNumber)}
              >
                <span className="itin-builder-day-item-num">Day {day.dayNumber}</span>
                <span className="itin-builder-day-item-name">{day.title}</span>
                <div className="itin-builder-day-item-icons">{getAttachedIcons(day.dayNumber)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Day Panel */}
        <div className="itin-builder-main">
          <div className="itin-day-header-row">
            <h2 className="itin-day-title">Day {activeDay} - {activeDayData.title}</h2>

            <div className="itin-day-actions">
              {/* Dropdown triggers custom menu from Image 5 */}
              <button className="btn-day-action" onClick={() => setServiceMenuOpen(!serviceMenuOpen)}>
                + Add Service &nbsp; &or;
              </button>
              
              {serviceMenuOpen && (
                <div className="itin-add-service-menu">
                  <div className="itin-menu-header">
                    <MdAdd size={16} />
                    + Add Service
                  </div>
                  {SERVICE_TYPES.map((st) => (
                    <button
                      key={st}
                      className="itin-menu-item"
                      onClick={() => {
                        setActiveModalType(st === 'Complementry' ? 'Complementary' : st);
                        setEditingServiceIndex(null);
                        setServiceMenuOpen(false);
                      }}
                    >
                      {React.createElement(SERVICE_ICONS[st] || MdCardGiftcard, { size: 16 })}
                      {st}
                    </button>
                  ))}
                </div>
              )}

              <button className="btn-day-action grey-outline" onClick={handleOpenEditDay}>
                Edit Day
              </button>
            </div>
          </div>

          {/* Day Cover Card */}
          <div className="itin-day-cover-card">
            <div className="itin-day-cover-img-wrapper">
              <img src={activeDayData.image || PRESET_COVERS[0].url} alt={activeDayData.title} className="itin-day-cover-img" />
            </div>
            <div className="itin-day-cover-info">
              <span className="itin-day-cover-num">Day {activeDay}</span>
              <p className="itin-day-cover-desc">{activeDayData.description || 'Arrival and local activities.'}</p>
            </div>
          </div>

          {/* Attached Services List - Timeline UI */}
          <div className="itin-day-services-timeline-wrapper" style={{ marginTop: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 2 }}>
              Day Bookings & Services Timeline
            </Typography>

            {activeDayServices.length === 0 ? (
              <div className="itin-day-empty-services">
                No services added to Day {activeDay}. Click "+ Add Service" above to attach flights, hotels, or custom sightseeing events.
              </div>
            ) : (
              <div className="itin-timeline-container">
                {activeDayServices.map((srv) => {
                  const originalIndex = services.findIndex((s) => s.id === srv.id);
                  const IconComp = SERVICE_ICONS[srv.type] || MdCardGiftcard;
                  const badgeClass = `badge-${srv.type?.toLowerCase() || 'default'}`;

                  return (
                    <div className="itin-timeline-item" key={srv.id}>
                      {/* Circle Badge Node on vertical timeline track */}
                      <div className={`itin-timeline-badge-node ${badgeClass}`}>
                        <IconComp size={16} />
                      </div>

                      <div className="itin-service-card" style={{ marginLeft: '16px' }}>
                        <div className="itin-service-card-left">
                          {/* Drag Handle */}
                          <div className="itin-drag-handle">
                            <div className="itin-drag-row"><div className="itin-drag-dot"></div><div className="itin-drag-dot"></div></div>
                            <div className="itin-drag-row"><div className="itin-drag-dot"></div><div className="itin-drag-dot"></div></div>
                            <div className="itin-drag-row"><div className="itin-drag-dot"></div><div className="itin-drag-dot"></div></div>
                          </div>

                          {/* Details */}
                          <div className="itin-service-details" style={{ flexGrow: 1 }}>
                            <div className="itin-service-meta">
                              <span className="itin-service-type-label">{srv.type}</span>
                              {srv.durationText && (
                                <span className="itin-duration-pill">
                                  ⏱️ {srv.durationText}
                                </span>
                              )}
                            </div>
                            
                            <div className="itin-service-title-row">
                              <h4 className="itin-service-title">{srv.title}</h4>
                              <span className="itin-service-price-badge">{formatCurrency(srv.totalCost)}</span>
                            </div>

                            {/* Custom descriptions based on service type */}
                            <p className="itin-service-desc">
                              {srv.type === 'Hotel' && `${srv.location || ''} • ${srv.bedOption || 'Double Bed'} (x${srv.bedCount || 1}) • ${srv.mealPlan || 'CP'} • ${srv.nights || 1} Night(s)`}
                              {srv.type === 'Flight' && `${srv.fromPort || ''} &rarr; ${srv.toPort || ''} (${srv.cabinClass || 'Economy'})`}
                              {srv.type === 'Cruise' && `${srv.cabinShip || ''} • ${srv.fromPort || ''} to ${srv.toPort || ''}`}
                              {srv.type === 'Transport' && `Vehicle: ${srv.vehicleType || 'SUV'} • Rate: ₹${srv.dailyRate || 0} (${srv.days || 1} days)`}
                              {(!['Hotel', 'Flight', 'Cruise', 'Transport'].includes(srv.type)) && srv.description}
                              
                              {srv.description && ['Hotel', 'Flight', 'Cruise', 'Transport'].includes(srv.type) && (
                                <span style={{ display: 'block', marginTop: '4px', fontStyle: 'italic' }}>
                                  "{srv.description.slice(0, 70)}..."
                                  <a className="itin-read-more" onClick={() => alert(srv.description)}>Read more</a>
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="itin-service-card-right">
                          <div style={{ position: 'relative' }}>
                            <button className="itin-service-actions-btn" onClick={(e) => toggleServiceAction(e, originalIndex)}>
                              <MdMoreVert size={18} />
                            </button>
                            {serviceActionIndex === originalIndex && (
                              <div className="itin-service-dropdown-actions">
                                <button className="itin-action-menu-item" onClick={() => handleEditServiceClick(originalIndex)}>
                                  Edit Service
                                </button>
                                <button className="itin-action-menu-item delete" onClick={() => handleRemoveService(originalIndex)}>
                                  Delete Service
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Edit Cover Image Dialog */}
      <Dialog open={editCoverOpen} onClose={() => setEditCoverOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Choose Cover Image</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">Select from pre-loaded travel covers:</Typography>
          <div className="presets-grid">
            {PRESET_COVERS.map((preset, idx) => (
              <button
                key={idx}
                className={`preset-img-btn ${customCoverUrl === preset.url ? 'selected' : ''}`}
                onClick={() => selectPresetCover(preset.url)}
              >
                <img src={preset.url} alt={preset.name} />
                <span className="preset-label">{preset.name}</span>
              </button>
            ))}
          </div>

          <TextField
            label="Or enter custom Image URL"
            fullWidth
            margin="normal"
            size="small"
            sx={{ mt: 3 }}
            value={customCoverUrl}
            onChange={(e) => setCustomCoverUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setEditCoverOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>Cancel</Button>
          <Button onClick={handleSaveCoverImage} variant="contained" color="primary" sx={{ fontWeight: 700 }}>Apply Cover</Button>
        </DialogActions>
      </Dialog>

      {/* 5. Edit Day Title & Description Dialog */}
      <Dialog open={editDayOpen} onClose={() => setEditDayOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Edit Day {activeDay} Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Day Title / Destination"
            fullWidth
            margin="normal"
            value={tempDayTitle}
            onChange={(e) => setTempDayTitle(e.target.value)}
            placeholder="e.g. Manali Sightseeing"
          />
          <TextField
            label="Day Description / Itinerary highlights"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={tempDayDesc}
            onChange={(e) => setTempDayDesc(e.target.value)}
            placeholder="Describe what activities are planned for this day..."
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setEditDayOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>Cancel</Button>
          <Button onClick={handleSaveDay} variant="contained" color="primary" sx={{ fontWeight: 700 }}>Save Day</Button>
        </DialogActions>
      </Dialog>

      {/* 6. Edit Basic Info Dialog */}
      <Dialog open={editBasicOpen} onClose={() => setEditBasicOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Edit Basic Itinerary Information
          <IconButton onClick={() => setEditBasicOpen(false)}><MdClose /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', mt: 1 }}>
            <TextField
              label="Itinerary Name"
              fullWidth
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
            <TextField
              label="Destination(s)"
              fullWidth
              value={tempDest}
              onChange={(e) => setTempDest(e.target.value)}
              placeholder="e.g. Shimla, Manali"
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', mt: 2.5 }}>
            <FormControl fullWidth>
              <InputLabel>Trip Type</InputLabel>
              <Select
                value={tempType}
                label="Trip Type"
                onChange={(e) => setTempType(e.target.value)}
              >
                {TRIP_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Adults"
              type="number"
              fullWidth
              value={tempAdults}
              onChange={(e) => setTempAdults(Math.max(1, parseInt(e.target.value || 1, 10)))}
            />
            <TextField
              label="Children"
              type="number"
              fullWidth
              value={tempChildren}
              onChange={(e) => setTempChildren(Math.max(0, parseInt(e.target.value || 0, 10)))}
            />
          </Box>
          <Box sx={{ mt: 2.5 }}>
            <TextField
              label="General Description"
              fullWidth
              multiline
              rows={3}
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setEditBasicOpen(false)} color="inherit" sx={{ fontWeight: 700 }}>Cancel</Button>
          <Button onClick={handleSaveBasic} variant="contained" color="primary" sx={{ fontWeight: 700 }}>Apply Changes</Button>
        </DialogActions>
      </Dialog>

      {/* 7. Attached Service Add/Edit Modals */}
      <ServiceModal
        open={activeModalType !== null}
        type={activeModalType}
        initialData={editingServiceIndex !== null ? services[editingServiceIndex] : null}
        travelers={{ total: adults + children + infants, adults, children, infants }}
        onClose={() => {
          setActiveModalType(null);
          setEditingServiceIndex(null);
        }}
        onSave={handleSaveService}
      />
    </div>
  );
}
