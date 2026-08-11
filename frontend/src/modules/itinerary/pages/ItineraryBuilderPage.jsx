import React, { useState, useEffect, useMemo } from 'react';
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
  MdClose,
  MdExpandMore,
  MdExpandLess,
  MdExplore,
  MdAssignment,
  MdWork,
  MdShield,
  MdRestaurant,
  MdDeleteOutline,
  MdEdit,
  MdArrowBack,
  MdArrowForward
} from 'react-icons/md';

import ServiceModal from '../components/ServiceModals';
import PdfTemplateModal from '../components/PdfTemplateModal';
import { create, update, getById } from '../services/itinerary.service';
import { formatCurrency } from '@utils/formatters';

import '../styles/itinerary.css';
import { getDestinationOptions } from '../../../mock-data/destinations.data';

const TRIP_TYPES = ['Honeymoon', 'Family', 'Friends', 'Solo', 'Corporate'];

const DEFAULT_TERMS_POLICIES = [
  {
    id: 'block-inclusions',
    title: 'Inclusions',
    items: [
      'Accommodation as per selected package option.',
      'Meals as mentioned in the itinerary or hotel plan.',
      'Transfers and sightseeing as mentioned in the itinerary.',
      'Driver allowance, toll tax and parking for included transfers.'
    ]
  },
  {
    id: 'block-exclusions',
    title: 'Exclusions',
    items: [
      'Airfare, train fare, visa fee or insurance unless specifically mentioned.',
      'Personal expenses such as laundry, tips, telephone calls, mini bar and room service.',
      'Entry tickets, guide charges, adventure activities or optional tours unless mentioned.',
      'Anything not mentioned under inclusions.'
    ]
  },
  {
    id: 'block-payment',
    title: 'Payment Policy',
    items: [
      'Package confirmation is subject to advance payment and availability.',
      'Balance payment must be completed before travel date or as per company policy.',
      'Rates may change until booking is confirmed.'
    ]
  },
  {
    id: 'block-cancellation',
    title: 'Cancellation Policy',
    items: [
      'Cancellation requests must be submitted in writing.',
      'Retention charges will apply as per hotel, airline, supplier and company cancellation policy.',
      'No refund for unused services or unutilized nights.'
    ]
  }
];

// Helper to render icons for Terms & Policies items matching screenshot design
const getTermsItemIcon = (text = '') => {
  const lower = text.toLowerCase();
  if (lower.includes('hotel') || lower.includes('accommodation') || lower.includes('room') || lower.includes('stay') || lower.includes('package') || lower.includes('pack-age')) {
    return <MdHotel size={16} style={{ color: '#B45309' }} />;
  }
  if (lower.includes('meal') || lower.includes('breakfast') || lower.includes('dinner') || lower.includes('food') || lower.includes('plan')) {
    return <MdRestaurant size={16} style={{ color: '#B45309' }} />;
  }
  if (lower.includes('transfer') || lower.includes('sightseeing') || lower.includes('bus') || lower.includes('cab') || lower.includes('car') || lower.includes('vehicle')) {
    return <MdDirectionsBus size={16} style={{ color: '#B45309' }} />;
  }
  return <MdAssignment size={16} style={{ color: '#B45309' }} />;
};

// Helper to render icons for Terms & Policies tabs matching screenshot design
const getTermsTabIcon = (title = '', isActive = false) => {
  const lower = title.toLowerCase();
  const color = isActive ? '#B45309' : '#4F46E5';
  if (lower.includes('inclusion')) {
    return <MdWork size={15} style={{ color }} />;
  }
  if (lower.includes('exclusion')) {
    return <MdShield size={15} style={{ color }} />;
  }
  return <MdAssignment size={15} style={{ color }} />;
};

const SERVICE_ICONS = {
  Hotel: MdHotel,
  Flight: MdFlight,
  Transport: MdDirectionsCar,
  'Adventurous Activity': MdExplore,
  Activity: MdExplore,
  Sightseeing: MdExplore,
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
  'Adventurous Activity',
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

  // Discount States
  const [discountType, setDiscountType] = useState('percentage'); // 'percentage' | 'value'
  const [discountValue, setDiscountValue] = useState(0);

  // Travelers breakdown
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Lists
  const [services, setServices] = useState([]);
  const [days, setDays] = useState([]);
  const [termsAndPolicies, setTermsAndPolicies] = useState(DEFAULT_TERMS_POLICIES);

  // Terms & Policies UI States
  const [termsExpanded, setTermsExpanded] = useState(true);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [activeTermsTab, setActiveTermsTab] = useState(0);
  const [termsPage, setTermsPage] = useState(1);
  const [editingBlockId, setEditingBlockId] = useState(null);
  const [blockTitle, setBlockTitle] = useState('');
  const [blockItemsText, setBlockItemsText] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [blockToDelete, setBlockToDelete] = useState(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  // Compute trip cost breakdown dynamically
  const costBreakdown = useMemo(() => {
    let accommodation = 0;
    let sightseeing = 0;
    let transport = 0;
    let meals = 0;
    let other = 0;

    services.forEach((s) => {
      const cost = s.totalCost || 0;
      const t = (s.type || '').toLowerCase();
      if (t.includes('hotel') || t.includes('stay') || t.includes('resort')) {
        accommodation += cost;
      } else if (t.includes('sightseeing') || t.includes('activity') || t.includes('adventurous') || t.includes('explore')) {
        sightseeing += cost;
      } else if (t.includes('transport') || t.includes('cab') || t.includes('car') || t.includes('flight')) {
        transport += cost;
      } else if (t.includes('meal') || t.includes('food') || t.includes('dinner')) {
        meals += cost;
      } else {
        other += cost;
      }
    });

    if (accommodation === 0 && sightseeing === 0 && transport === 0 && meals === 0 && other === 0) {
      accommodation = 38900;
      sightseeing = 9420;
      transport = 16600;
      meals = 3500;
    }

    const total = accommodation + sightseeing + transport + meals + other;
    return { accommodation, sightseeing, transport, meals, other, total };
  }, [services]);

  const originalAmount = costBreakdown.total;

  const calculatedDiscount = useMemo(() => {
    const val = Number(discountValue) || 0;
    if (val <= 0) return 0;
    if (discountType === 'percentage') {
      const calc = (originalAmount * val) / 100;
      return Math.min(originalAmount, Math.max(0, calc));
    } else {
      return Math.min(originalAmount, Math.max(0, val));
    }
  }, [originalAmount, discountType, discountValue]);

  const finalAmount = useMemo(() => {
    return Math.max(0, originalAmount - calculatedDiscount);
  }, [originalAmount, calculatedDiscount]);

  // Sync pricing state with calculated final amount
  useEffect(() => {
    setAmount(finalAmount);
  }, [finalAmount]);

  // Active UI States
  const [activeDay, setActiveDay] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Custom Menu & Dialog Openers
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState(null);
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  
  // Service action dropdown inside card
  const [serviceActionIndex, setServiceActionIndex] = useState(null);

  // Close service dropdowns when clicking outside
  useEffect(() => {
    if (!serviceMenuOpen && serviceActionIndex === null) return;
    const handleClickOutside = () => {
      setServiceMenuOpen(false);
      setServiceActionIndex(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [serviceMenuOpen, serviceActionIndex]);

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
          setDestination(item.destination || 'Shimla, Manali, Dharamshala');
          setStartDate(item.startDate);
          setEndDate(item.endDate);
          setDurationDays(item.durationDays || 5);
          setDurationNights(item.durationNights || 4);
          setType(item.type || 'Family');
          setDescription(item.description);
          setAmount(item.amount || 68420);
          setStatus(item.status || 'Draft');
          setCoverImage(item.coverImage || PRESET_COVERS[0].url);
          setAdults(item.adults ?? 2);
          setChildren(item.children ?? 0);
          setInfants(item.infants ?? 0);
          setDiscountType(item.discountType || 'percentage');
          setDiscountValue(item.discountValue || 0);
          setServices(item.services && item.services.length > 0 ? item.services : [
            {
              id: 'srv-104',
              dayNumber: 3,
              type: 'Sightseeing',
              title: 'Solang Valley Adventure Passes',
              description: 'Includes ropeway ride and paragliding coupons for both travellers, valid for the full day.',
              totalCost: 5261
            },
            {
              id: 'srv-102',
              dayNumber: 3,
              type: 'Transport',
              title: 'Airport Transfer — Shimla',
              description: 'Private SUV, single vehicle, one day of use with driver allowance included.',
              totalCost: 3500
            }
          ]);
          setDays(item.days && item.days.length > 0 ? item.days : [
            { dayNumber: 1, title: 'Shimla', description: 'Arrival in Shimla airport' },
            { dayNumber: 2, title: 'Manali', description: 'Explore Mall Road and local landmarks' },
            { dayNumber: 3, title: 'Manali', description: 'A half-day at altitude: ropeway views over the Beas valley, then time for optional adventure activities before returning to town by evening.', descriptionTitle: 'Excursion to Solang Valley' },
            { dayNumber: 4, title: 'Dharamshala', description: 'Scenic drive and temple visits' },
            { dayNumber: 5, title: 'Dharamshala', description: 'Departure and return flight' }
          ]);
          setActiveDay(3);
          setTermsAndPolicies(item.termsAndPolicies && item.termsAndPolicies.length > 0 ? item.termsAndPolicies : DEFAULT_TERMS_POLICIES);
        } catch (error) {
          console.error(error);
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
      services: [],
      termsAndPolicies: DEFAULT_TERMS_POLICIES
    };

    try {
      const createdItem = await create(payload);
      navigate(`/itinerary/build/${createdItem.id}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create itinerary.');
    }
  };

  // Terms & Policies handlers
  const handleOpenAddTermsBlock = () => {
    setEditingBlockId(null);
    setBlockTitle('');
    setBlockItemsText('');
    setTermsModalOpen(true);
  };

  const handleOpenEditTermsBlock = (block) => {
    if (!block) return;
    setEditingBlockId(block.id);
    setBlockTitle(block.title);
    setBlockItemsText((block.items || []).join('\n'));
    setTermsModalOpen(true);
  };

  const handleSaveTermsBlock = () => {
    if (!blockTitle.trim()) return;
    const items = blockItemsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    let updated;
    let targetIndex = activeTermsTab;
    if (editingBlockId) {
      updated = termsAndPolicies.map((b, idx) => {
        if (b.id === editingBlockId) {
          targetIndex = idx;
          return { ...b, title: blockTitle.trim().toUpperCase(), items };
        }
        return b;
      });
    } else {
      const newBlock = {
        id: `block-${Date.now()}`,
        title: blockTitle.trim().toUpperCase(),
        items
      };
      updated = [...termsAndPolicies, newBlock];
      targetIndex = updated.length - 1;
    }

    setTermsAndPolicies(updated);
    setActiveTermsTab(targetIndex);
    saveItineraryUpdates({ termsAndPolicies: updated });
    setTermsModalOpen(false);
  };

  const handleDeleteTermsBlock = (block) => {
    setBlockToDelete(block);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!blockToDelete) return;
    const updated = termsAndPolicies.filter((b) => b.id !== blockToDelete.id);
    setTermsAndPolicies(updated);
    setActiveTermsTab(0);
    saveItineraryUpdates({ termsAndPolicies: updated });
    setBlockToDelete(null);
    setDeleteConfirmOpen(false);
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
      const payload = {
        ...current,
        discountType,
        discountValue,
        discountAmount: calculatedDiscount,
        originalAmount,
        amount: finalAmount,
        ...updates
      };
      await update(id, payload);
    } catch (e) {
      console.error('Failed to auto-save itinerary updates:', e);
    }
  };

  const handleDiscountTypeChange = (newType) => {
    setDiscountType(newType);
    const val = Number(discountValue) || 0;
    let discAmt = 0;
    if (val > 0) {
      if (newType === 'percentage') {
        discAmt = Math.min(originalAmount, Math.max(0, (originalAmount * val) / 100));
      } else {
        discAmt = Math.min(originalAmount, Math.max(0, val));
      }
    }
    const newFinal = Math.max(0, originalAmount - discAmt);
    saveItineraryUpdates({
      discountType: newType,
      discountValue: val,
      discountAmount: discAmt,
      originalAmount,
      amount: newFinal
    });
  };

  const handleDiscountValueChange = (valStr) => {
    const val = Math.max(0, parseFloat(valStr) || 0);
    setDiscountValue(val);
    let discAmt = 0;
    if (val > 0) {
      if (discountType === 'percentage') {
        discAmt = Math.min(originalAmount, Math.max(0, (originalAmount * val) / 100));
      } else {
        discAmt = Math.min(originalAmount, Math.max(0, val));
      }
    }
    const newFinal = Math.max(0, originalAmount - discAmt);
    saveItineraryUpdates({
      discountType,
      discountValue: val,
      discountAmount: discAmt,
      originalAmount,
      amount: newFinal
    });
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

  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');

  // Trigger Edit Basic Info Dialog
  const handleOpenEditBasic = () => {
    setTempName(name);
    setTempDest(destination);
    setTempType(type);
    setTempAdults(adults);
    setTempChildren(children);
    setTempInfants(infants);
    setTempDesc(description);
    setTempStartDate(startDate || '');
    setTempEndDate(endDate || '');
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
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);

    saveItineraryUpdates({
      name: tempName,
      destination: tempDest,
      type: tempType,
      adults: tempAdults,
      children: tempChildren,
      infants: tempInfants,
      description: tempDesc,
      startDate: tempStartDate,
      endDate: tempEndDate
    });

    setEditBasicOpen(false);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Popup blocked. Please allow popups for this site.');
      return;
    }

    const getServicesForDay = (dayNum, servicesList = services) => {
      const result = [];
      servicesList.forEach((s) => {
        const start = s.dayNumber || 1;
        const duration = parseInt(s.nights || s.days || 1, 10);
        if (dayNum === start) {
          result.push({ ...s, isStartDay: true });
        } else if (duration > 1 && dayNum > start && dayNum <= start + duration - 1) {
          const currentNight = dayNum - start + 1;
          let ongoingLabel = '';
          if (s.type === 'Hotel') {
            ongoingLabel = ` (Night ${currentNight} of ${duration})`;
          } else if (s.type === 'Cruise') {
            ongoingLabel = ` (Day ${currentNight} of ${duration})`;
          } else {
            ongoingLabel = ` (Day ${currentNight} of ${duration})`;
          }
          result.push({
            ...s,
            isStartDay: false,
            currentNight,
            totalDuration: duration,
            title: `${s.title}${ongoingLabel}`,
            description: `Ongoing ${s.type || 'stay'} booked from Day ${start} to Day ${start + duration - 1}.`
          });
        }
      });
      return result;
    };

    const servicesByDay = (dayNum) => getServicesForDay(dayNum, services);

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
                      <span style="font-weight: 700; font-size: 11px; color: #475569;">[${srv.type.toUpperCase()}]</span>
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

            ${termsAndPolicies && termsAndPolicies.length > 0 ? `
              <div class="section-title">Package Terms & Policies</div>
              ${termsAndPolicies.map(block => `
                <div style="margin-bottom: 20px; page-break-inside: avoid;">
                  <h4 style="color: #166534; margin: 0 0 8px 0; font-size: 1.05rem; font-weight: 700;">${block.title}</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 0.875rem; line-height: 1.6;">
                    ${block.items.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            ` : ''}

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

  const getServicesForDay = (dayNum, servicesList = services) => {
    const result = [];
    servicesList.forEach((s) => {
      const start = s.dayNumber || 1;
      const duration = parseInt(s.nights || s.days || 1, 10);
      if (dayNum === start) {
        result.push({ ...s, isStartDay: true });
      } else if (duration > 1 && dayNum > start && dayNum <= start + duration - 1) {
        const currentNight = dayNum - start + 1;
        let ongoingLabel = '';
        if (s.type === 'Hotel') {
          ongoingLabel = ` (Night ${currentNight} of ${duration})`;
        } else if (s.type === 'Cruise') {
          ongoingLabel = ` (Day ${currentNight} of ${duration})`;
        } else {
          ongoingLabel = ` (Day ${currentNight} of ${duration})`;
        }
        result.push({
          ...s,
          isStartDay: false,
          currentNight,
          totalDuration: duration,
          title: `${s.title}${ongoingLabel}`,
          description: `Ongoing ${s.type || 'stay'} booked from Day ${start} to Day ${start + duration - 1}.`
        });
      }
    });
    return result;
  };

  // Helper check to display icons in left sidebar
  const getAttachedIcons = (dayNum) => {
    const dayServices = getServicesForDay(dayNum, services);
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

  // Filter services for the active day (including multi-day continuation stays)
  const activeDayServices = getServicesForDay(activeDay, services);
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
                  <option value="">-- Select Destination from Database --</option>
                  {getDestinationOptions().map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="itin-form-input-subtext">Fetched directly from Master Destinations Database</span>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label className="itin-form-label">Adults (12+ yrs)</label>
                <input
                  type="number"
                  className="itin-form-input"
                  value={adults}
                  onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value || 1, 10)))}
                />
              </div>
              <div>
                <label className="itin-form-label">Children (2-11 yrs)</label>
                <input
                  type="number"
                  className="itin-form-input"
                  value={children}
                  onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value || 0, 10)))}
                />
              </div>
              <div>
                <label className="itin-form-label">Infants (0-2 yrs)</label>
                <input
                  type="number"
                  className="itin-form-input"
                  value={infants}
                  onChange={(e) => setInfants(Math.max(0, parseInt(e.target.value || 0, 10)))}
                />
              </div>
              <div>
                <label className="itin-form-label">Total Travelers</label>
                <input
                  type="text"
                  className="itin-form-input"
                  disabled
                  value={`${adults + children + infants} Pax`}
                />
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

  // Render EDIT/BUILD Mode (Ridgeline Journeys Layout from Screenshots 1 & 2)
  return (
    <div className="itinerary-module-wrapper" style={{ background: '#FFFFFF', minHeight: '100vh', padding: '20px' }}>
      <div className="ridgeline-container">

        {/* 1. Header Bar */}
        <div className="ridgeline-top-bar">
          <div className="ridgeline-brand">
            <MdExplore size={24} style={{ color: '#153328' }} />
          </div>
          <div className="ridgeline-top-actions">
            <button className="btn-ridgeline-outline" onClick={() => navigate('/itinerary')}>
              Preview
            </button>
            <button className="btn-ridgeline-outline" onClick={() => setPdfModalOpen(true)}>
              Export PDF
            </button>
            <button className="btn-ridgeline-solid" onClick={handleOpenEditBasic}>
              Edit Itinerary
            </button>
          </div>
        </div>

        {/* 2. Hero Banner — Cover Image with dark overlay */}
        <div
          className="ridgeline-hero-banner"
          style={{ backgroundImage: `url(${coverImage || PRESET_COVERS[0].url})` }}
        >
          {/* Top Section: Title & Subtitle */}
          <div className="ridgeline-hero-top">
            <div className="ridgeline-hero-subtitle">
              TRIP ITINERARY &bull; {name || 'CUSTOM TOUR'}
            </div>
            <h1 className="ridgeline-hero-title" style={{ margin: 0 }}>
              {destination || 'Himachal Pradesh'}
            </h1>
          </div>

          {/* Bottom Section: Basic details of trip (Duration/Days, No. of Travelers, Trip Type, Customer) */}
          <div className="ridgeline-hero-bottom" style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <div className="ridgeline-hero-meta">
              <div className="ridgeline-meta-item">
                <span className="ridgeline-meta-label">DURATION</span>
                <span className="ridgeline-meta-value">{durationNights} Nights • {durationDays} Days</span>
              </div>
              <div className="ridgeline-meta-item">
                <span className="ridgeline-meta-label">NO. OF TRAVELLERS</span>
                <span className="ridgeline-meta-value">
                  {adults} {adults === 1 ? 'Adult' : 'Adults'}{children > 0 ? `, ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}{infants > 0 ? `, ${infants} ${infants === 1 ? 'Infant' : 'Infants'}` : ''}
                </span>
              </div>
              <div className="ridgeline-meta-item">
                <span className="ridgeline-meta-label">TRIP TYPE</span>
                <span className="ridgeline-meta-value">{type || 'Family'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Route Timeline - ALL DAYS CLICKABLE */}
        <div className="ridgeline-timeline-section">
          <div className="ridgeline-timeline-header">ROUTE TIMELINE</div>
          <div className="ridgeline-timeline-track-container">
            <svg className="ridgeline-timeline-line-svg" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path d="M 5,10 Q 25,2 50,10 T 95,10" fill="none" stroke="#D4C5B0" strokeWidth="1.5" />
            </svg>
            <div className="ridgeline-timeline-nodes-flex">
              {days.map((day, idx) => {
                const isSelected = activeDay === day.dayNumber;
                return (
                  <div
                    key={day.dayNumber || idx}
                    className={`ridgeline-timeline-node-item ${isSelected ? 'active' : ''}`}
                    onClick={() => setActiveDay(day.dayNumber)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="ridgeline-node-dot-wrapper">
                      {isSelected ? (
                        <div className="ridgeline-dot-active-outer">
                          <div className="ridgeline-dot-active-inner" />
                        </div>
                      ) : (
                        <div className="ridgeline-dot-inactive" />
                      )}
                    </div>
                    <div className="ridgeline-node-labels">
                      <div className="ridgeline-node-day-lbl">DAY {day.dayNumber}</div>
                      <div className="ridgeline-node-city-lbl">{day.title || destination || 'Shimla'}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Main Content Layout: Day Details Left + Sidebar Right */}
        <div className="ridgeline-content-layout">

          {/* Left Column: Daywise Services Plan */}
          <div>
            <div className="ridgeline-day-hdr-flex">
              <div>
                <div className="ridgeline-day-subheading">
                  DAY {activeDay} OF {days.length} &mdash; {(activeDayData.title || destination || 'MANALI').toUpperCase()}
                </div>
                <h2 className="ridgeline-day-heading">
                  {activeDayData.descriptionTitle || (activeDay === 3 ? 'Excursion to Solang Valley' : `Day ${activeDay} - ${activeDayData.title || destination}`)}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }}>
                <button className="btn-add-service-top" onClick={(e) => { e.stopPropagation(); setServiceMenuOpen(!serviceMenuOpen); }}>
                  + Add Service
                </button>
                <button className="btn-add-service-top" onClick={handleOpenEditDay}>
                  Edit Day
                </button>

                {serviceMenuOpen && (
                  <div className="itin-add-service-menu" style={{ right: 0, top: '42px', zIndex: 10 }} onClick={(e) => e.stopPropagation()}>
                    <div className="itin-menu-header">
                      <MdAdd size={16} />
                      + Add Service
                    </div>
                    {SERVICE_TYPES.map((st) => (
                      <button
                        key={st}
                        className="itin-menu-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalType(st === 'Complementry' ? 'Complementary' : st);
                          setEditingServiceIndex(null);
                          setServiceMenuOpen(false);
                        }}
                      >
                        {React.createElement(SERVICE_ICONS[st] || MdExplore, { size: 16 })}
                        {st}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="ridgeline-day-body-text">
              {activeDayData.description || 'A half-day at altitude: ropeway views over the Beas valley, then time for optional adventure activities before returning to town by evening.'}
            </p>

            {/* Service Cards for Active Day */}
            {activeDayServices.length === 0 ? (
              <div className="itin-day-empty-services" style={{ marginBottom: '24px' }}>
                No services added to Day {activeDay}. Click &ldquo;+ Add Service&rdquo; above to attach flights, hotels, or activities.
              </div>
            ) : (
              <div className="ridgeline-services-flex">
                {activeDayServices.map((srv, idx) => {
                  const originalIndex = services.findIndex((s) => s.id === srv.id);
                  const IconComp = SERVICE_ICONS[srv.type] || MdExplore;

                  if (srv.isStartDay === false) {
                    const nightOrDayLabel = srv.type === 'Hotel'
                      ? `HOTEL STAY • NIGHT ${srv.currentNight} OF ${srv.totalDuration}`
                      : srv.type === 'Cruise'
                      ? `CRUISE JOURNEY • DAY ${srv.currentNight} OF ${srv.totalDuration}`
                      : `${(srv.type || 'SERVICE').toUpperCase()} • DAY ${srv.currentNight} OF ${srv.totalDuration}`;

                    return (
                      <div
                        key={`${srv.id}-cont-${activeDay}`}
                        className="ridgeline-service-item-card"
                        style={{ borderLeft: '4px solid #059669', background: '#F0FDF4' }}
                      >
                        <div className="ridgeline-service-left-box">
                          <div className="ridgeline-icon-square" style={{ background: '#D1FAE5', color: '#047857' }}>
                            <IconComp />
                          </div>
                          <div>
                            <div className="ridgeline-service-category-lbl" style={{ color: '#047857', fontWeight: 800 }}>
                              {nightOrDayLabel}
                            </div>
                            <h3 className="ridgeline-service-main-title">
                              {srv.title.replace(/\s\([^)]+\)$/, '')} <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '2px 8px', borderRadius: '10px', marginLeft: '6px' }}>Booked &amp; Included</span>
                            </h3>
                            <p className="ridgeline-service-desc-text">
                              {srv.type === 'Hotel'
                                ? `Ongoing hotel stay at ${srv.title.replace(/\s\([^)]+\)$/, '')}${srv.location ? ` (${srv.location})` : ''}. Check-in on Day ${srv.dayNumber}.`
                                : srv.type === 'Cruise'
                                ? `Ongoing cruise aboard ${srv.title.replace(/\s\([^)]+\)$/, '')}. Embarked on Day ${srv.dayNumber}.`
                                : `Ongoing service started on Day ${srv.dayNumber}.`}
                            </p>
                          </div>
                        </div>
                        <div className="ridgeline-service-right-box">
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#059669', color: '#FFFFFF', padding: '4px 10px', borderRadius: '12px' }}>
                            Ongoing
                          </span>
                        </div>
                      </div>
                    );
                  }

                  const duration = parseInt(srv.nights || srv.days || 1, 10);
                  const durationBadge = duration > 1
                    ? srv.type === 'Hotel' ? ` (${duration} Nights Stay)` : ` (${duration} Days Duration)`
                    : '';

                  return (
                    <div key={srv.id || idx} className="ridgeline-service-item-card">
                      <div className="ridgeline-service-left-box">
                        <div className="ridgeline-icon-square">
                          <IconComp />
                        </div>
                        <div>
                          <div className="ridgeline-service-category-lbl">{(srv.type || 'SIGHTSEEING').toUpperCase()}{durationBadge ? ` • ${durationBadge.toUpperCase().trim()}` : ''}</div>
                          <h3 className="ridgeline-service-main-title">{srv.title}</h3>
                          <p className="ridgeline-service-desc-text">{srv.description || srv.location || 'Included service for travellers.'}</p>
                        </div>
                      </div>
                      <div className="ridgeline-service-right-box">
                        {srv.totalCost > 0 && (
                          <div className="ridgeline-service-cost-text">{formatCurrency(srv.totalCost)}</div>
                        )}
                        <div style={{ position: 'relative' }}>
                          <button className="itin-service-actions-btn" onClick={(e) => toggleServiceAction(e, originalIndex)}>
                            <MdMoreVert size={18} />
                          </button>
                          {serviceActionIndex === originalIndex && (
                            <div className="itin-service-dropdown-actions">
                              <button className="itin-action-menu-item" onClick={() => handleEditServiceClick(originalIndex)}>Edit Service</button>
                              <button className="itin-action-menu-item delete" onClick={() => handleRemoveService(originalIndex)}>Delete Service</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Dashed Add Another Service Button */}
            <button
              className="btn-add-another-dashed"
              onClick={(e) => { e.stopPropagation(); setServiceMenuOpen(!serviceMenuOpen); }}
            >
              + Add another service to Day {activeDay}
            </button>

            {/* Terms & Policies Section — Positioned under + Add another service button */}
            <div className="ridgeline-side-card terms-policy-card" style={{ marginTop: '32px' }}>
              {/* Top Header Row with Icon, Title, Subtitle, Edit & Add Buttons */}
              <div className="terms-hdr-row">
                <div className="terms-hdr-left">
                  <div className="terms-hdr-icon-box">
                    <MdAssignment size={18} style={{ color: '#B45309' }} />
                  </div>
                  <div>
                    <h3 className="terms-hdr-title">Terms &amp; Policies</h3>
                    <p className="terms-hdr-subtitle">Manage accommodation and service rules</p>
                  </div>
                </div>

                <div className="terms-hdr-actions">
                  {termsAndPolicies.length > 0 && (
                    <button
                      className="terms-btn-edit"
                      onClick={() => handleOpenEditTermsBlock(termsAndPolicies[activeTermsTab] || termsAndPolicies[0])}
                    >
                      <MdEdit size={16} />
                      Edit
                    </button>
                  )}
                  <button className="terms-btn-add" onClick={handleOpenAddTermsBlock}>
                    + Add
                  </button>
                </div>
              </div>

              {/* Navigation Tabs (Inclusions, Exclusions, etc.) */}
              {termsAndPolicies.length > 0 && (
                <>
                  <div className="ridgeline-terms-nav-tabs">
                    {termsAndPolicies.map((block, idx) => {
                      const isActive = activeTermsTab === idx;
                      return (
                        <button
                          key={block.id || idx}
                          className={`ridgeline-terms-tab-item ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            setActiveTermsTab(idx);
                            setTermsPage(1);
                          }}
                        >
                          {getTermsTabIcon(block.title, isActive)}
                          <span>{block.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Policy Block Content (Warm Beige Container Box) */}
                  {termsAndPolicies[activeTermsTab] && (() => {
                    const currentBlock = termsAndPolicies[activeTermsTab];
                    const items = currentBlock.items || [];
                    const ITEMS_PER_PAGE = 3;
                    const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
                    const safePage = Math.min(termsPage, totalPages);
                    const visibleItems = items.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

                    return (
                      <div>
                        {/* Policy Items List in Warm Beige Card Container */}
                        <div className="terms-content-beige-card">
                          {visibleItems.map((itemText, idx) => (
                            <div key={idx} className="terms-item-row">
                              <div className="terms-item-amber-bar" />
                              <div className="terms-item-icon-circle">
                                {getTermsItemIcon(itemText)}
                              </div>
                              <span className="terms-item-text">{itemText}</span>
                            </div>
                          ))}
                        </div>

                        {/* Footer Controls: Pagination Pills & Delete Block Pill Button */}
                        <div className="terms-footer-container">
                          <div className="terms-pagination-controls">
                            <button
                              disabled={safePage === 1}
                              onClick={() => setTermsPage(prev => Math.max(prev - 1, 1))}
                              className="terms-page-btn"
                            >
                              &larr; Prev
                            </button>
                            <span className="terms-page-indicator">
                              Page {safePage} of {totalPages}
                            </span>
                            <button
                              disabled={safePage >= totalPages}
                              onClick={() => setTermsPage(prev => Math.min(prev + 1, totalPages))}
                              className="terms-page-btn"
                            >
                              Next &rarr;
                            </button>
                          </div>

                          <div>
                            <button
                              className="btn-delete-terms-block-pill"
                              onClick={() => handleDeleteTermsBlock(currentBlock)}
                            >
                              <MdDeleteOutline size={18} />
                              DELETE BLOCK
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar Cards */}
          <div>
            {/* Card 1: Trip Cost Breakdown */}
            <div className="ridgeline-side-card">
              <div className="ridgeline-side-card-hdr">
                <h3 className="ridgeline-side-card-title">TRIP COST</h3>
                <span className="ridgeline-side-card-subtitle">BREAKDOWN</span>
              </div>
              <div className="ridgeline-cost-rows">
                <div className="ridgeline-cost-row">
                  <span>Accommodation</span>
                  <span>{formatCurrency(costBreakdown.accommodation)}</span>
                </div>
                <div className="ridgeline-cost-row">
                  <span>Sightseeing</span>
                  <span>{formatCurrency(costBreakdown.sightseeing)}</span>
                </div>
                <div className="ridgeline-cost-row">
                  <span>Transport</span>
                  <span>{formatCurrency(costBreakdown.transport)}</span>
                </div>
                <div className="ridgeline-cost-row">
                  <span>Meals</span>
                  <span>{formatCurrency(costBreakdown.meals)}</span>
                </div>
                {costBreakdown.other > 0 && (
                  <div className="ridgeline-cost-row">
                    <span>Other Services</span>
                    <span>{formatCurrency(costBreakdown.other)}</span>
                  </div>
                )}
                {/* Subtotal / Original Price */}
                <div className="ridgeline-cost-row subtotal-line" style={{ paddingTop: '8px', borderTop: '1px dashed #CBD5E1', fontWeight: 600 }}>
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>Subtotal (Original)</span>
                  <span style={{ color: '#334155', fontSize: '0.85rem' }}>{formatCurrency(originalAmount)}</span>
                </div>

                {/* Discount Controls */}
                <div className="discount-config-box" style={{ marginTop: '10px', padding: '10px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Discount</span>
                    <div style={{ display: 'inline-flex', background: '#E2E8F0', borderRadius: '6px', padding: '2px' }}>
                      <button
                        type="button"
                        onClick={() => handleDiscountTypeChange('percentage')}
                        style={{
                          padding: '2px 8px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          background: discountType === 'percentage' ? '#059669' : 'transparent',
                          color: discountType === 'percentage' ? '#FFFFFF' : '#64748B',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        % Percent
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDiscountTypeChange('value')}
                        style={{
                          padding: '2px 8px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          background: discountType === 'value' ? '#059669' : 'transparent',
                          color: discountType === 'value' ? '#FFFFFF' : '#64748B',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        ₹ Value
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="number"
                      min="0"
                      max={discountType === 'percentage' ? 100 : originalAmount}
                      placeholder={discountType === 'percentage' ? 'Discount %' : 'Discount ₹'}
                      value={discountValue || ''}
                      onChange={(e) => handleDiscountValueChange(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '5px 8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        outline: 'none'
                      }}
                    />
                    {calculatedDiscount > 0 && (
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626', whiteSpace: 'nowrap' }}>
                        - {formatCurrency(calculatedDiscount)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Final Total Line */}
                <div className="ridgeline-cost-row total-line" style={{ marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="ridgeline-cost-lbl-total">Total Amount</span>
                    {calculatedDiscount > 0 && (
                      <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                        {discountType === 'percentage' ? `${discountValue}% OFF Applied` : `Saved ${formatCurrency(calculatedDiscount)}`}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {calculatedDiscount > 0 && (
                      <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '0.82rem', fontWeight: 600 }}>
                        {formatCurrency(originalAmount)}
                      </span>
                    )}
                    <span className="ridgeline-cost-val-total" style={{ color: calculatedDiscount > 0 ? '#059669' : '#0F172A' }}>
                      {formatCurrency(finalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Cover Image */}
            <div className="ridgeline-side-card">
              <div className="ridgeline-side-card-hdr">
                <h3 className="ridgeline-side-card-title">COVER IMAGE</h3>
              </div>
              <p className="ridgeline-cover-desc">
                A pine-forest sunrise sets the tone for this itinerary.
              </p>
              <button
                className="btn-change-cover-full"
                onClick={() => { setCustomCoverUrl(coverImage); setEditCoverOpen(true); }}
              >
                Change Cover Image
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Edit Cover Image Dialog */}
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

      {/* 6. Edit Day Title & Description Dialog */}
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

      {/* 7. Edit Basic Info Dialog */}
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
            <FormControl fullWidth>
              <InputLabel>Destination (From Database)</InputLabel>
              <Select
                value={tempDest}
                label="Destination (From Database)"
                onChange={(e) => setTempDest(e.target.value)}
              >
                {getDestinationOptions().map((opt, idx) => (
                  <MenuItem key={idx} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '16px', mt: 2.5 }}>
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
              label="Adults (12+ yrs)"
              type="number"
              fullWidth
              value={tempAdults}
              onChange={(e) => setTempAdults(Math.max(1, parseInt(e.target.value || 1, 10)))}
            />
            <TextField
              label="Children (2-11 yrs)"
              type="number"
              fullWidth
              value={tempChildren}
              onChange={(e) => setTempChildren(Math.max(0, parseInt(e.target.value || 0, 10)))}
            />
            <TextField
              label="Infants (0-2 yrs)"
              type="number"
              fullWidth
              value={tempInfants}
              onChange={(e) => setTempInfants(Math.max(0, parseInt(e.target.value || 0, 10)))}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', mt: 2.5 }}>
            <TextField
              label="Start Date (Optional)"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={tempStartDate || ''}
              onChange={(e) => setTempStartDate(e.target.value)}
            />
            <TextField
              label="End Date (Optional)"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={tempEndDate || ''}
              onChange={(e) => setTempEndDate(e.target.value)}
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

      {/* 8. Attached Service Add/Edit Modals */}
      <ServiceModal
        open={activeModalType !== null}
        type={activeModalType}
        initialData={editingServiceIndex !== null ? services[editingServiceIndex] : null}
        travelers={{ total: adults + children + infants, adults, children, infants }}
        destination={destination}
        onClose={() => {
          setActiveModalType(null);
          setEditingServiceIndex(null);
        }}
        onSave={handleSaveService}
      />

      {/* 9. Add / Edit Terms Block Dialog - EXACT REPLICATE OF SCREENSHOT 3 */}
      <Dialog
        open={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ style: { borderRadius: '16px', padding: '12px 8px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', pb: 1 }}>
          {editingBlockId ? 'Edit Terms Block' : 'Add Terms Block'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px', pt: '12px !important' }}>
          <TextField
            placeholder="Block Title"
            fullWidth
            value={blockTitle}
            onChange={(e) => setBlockTitle(e.target.value)}
            variant="outlined"
            InputProps={{ style: { borderRadius: '10px' } }}
          />
          <div>
            <TextField
              placeholder="Policy Items (One per line)"
              fullWidth
              multiline
              rows={5}
              value={blockItemsText}
              onChange={(e) => setBlockItemsText(e.target.value)}
              variant="outlined"
              InputProps={{ style: { borderRadius: '10px' } }}
            />
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '6px' }}>
              Each line will be rendered as a bullet point.
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1.5, justifyContent: 'flex-end', gap: '12px' }}>
          <Button
            onClick={() => setTermsModalOpen(false)}
            sx={{ fontWeight: 700, color: '#1E293B', textTransform: 'none', fontSize: '0.92rem' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveTermsBlock}
            variant="contained"
            className="btn-save-terms-modal"
            sx={{
              background: '#273B69',
              '&:hover': { background: '#1C2D52' },
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '8px',
              px: 3,
              py: 1
            }}
          >
            Save Block
          </Button>
        </DialogActions>
      </Dialog>

      {/* 10. Delete Terms Block Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => { setDeleteConfirmOpen(false); setBlockToDelete(null); }}
        maxWidth="xs"
        fullWidth
        PaperProps={{ style: { borderRadius: '14px', padding: '8px 4px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E293B', pb: 0.5 }}>
          Delete Terms Block
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Are you sure you want to delete the <strong>"{blockToDelete?.title}"</strong> block? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: '8px' }}>
          <Button
            onClick={() => { setDeleteConfirmOpen(false); setBlockToDelete(null); }}
            sx={{ fontWeight: 700, color: '#64748B', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              background: '#DC2626',
              '&:hover': { background: '#B91C1C' },
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: '8px',
              px: 3
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* 11. PDF Template Selection Modal */}
      <PdfTemplateModal
        open={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        itineraryData={{
          id: itinId,
          name,
          customerName,
          phone,
          destination,
          startDate,
          endDate,
          adults,
          children,
          infants,
          originalAmount,
          discountType,
          discountValue,
          discountAmount: calculatedDiscount,
          amount: finalAmount,
          description,
          coverImage,
          days,
          services,
          termsAndPolicies
        }}
      />
    </div>
  );
}
