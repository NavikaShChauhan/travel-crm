import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  MdArrowBack,
  MdPhone,
  MdChat,
  MdEmail,
  MdAdd,
  MdEdit,
  MdDeleteOutline,
  MdSave,
  MdCloudUpload,
  MdHistory,
  MdPersonAdd,
  MdPlace,
  MdWarning,
  MdCheckCircle,
  MdClose,
} from 'react-icons/md';

import { useInquiry } from '../contexts/InquiryContext';
import EditLeadModal from '../components/EditLeadModal';

const STAGE_OPTIONS = [
  'New',
  'Contacted',
  'Follow-up',
  'Quotation Sent',
  'Quotation Viewed',
  'Negotiation',
  'Booking Pending',
  'Won',
  'Lost',
  'On Hold',
];

const PRIORITY_OPTIONS = ['Hot', 'Warm', 'Cold'];
const SALES_USERS = ['Priya Nair', 'Neha Gupta', 'Rahul Sharma', 'Ananya Roy', 'Priya Sharma', 'Arjun Nair'];
const OPS_USERS = ['Amit Kumar', 'Vikram Singh', 'Sonia Verma'];

export default function InquiryLeadDetailPage() {
  const { id } = useParams();
  const inquiryContext = useInquiry();

  const leads = inquiryContext?.leads || [];
  const updateLead = inquiryContext?.updateLead || (() => {});
  const openEditModal = inquiryContext?.openEditModal || (() => {});
  const isEditModalOpen = inquiryContext?.isEditModalOpen || false;
  const closeEditModal = inquiryContext?.closeEditModal || (() => {});
  const editingLead = inquiryContext?.editingLead || null;

  const navigate = useNavigate();

  // Safely parse Lead ID param
  const decodedId = decodeURIComponent(id || '').replace(/__/g, '/');
  const cleanId = decodedId.replace('LD-', '');

  const lead =
    leads.find(
      (l) =>
        l.id === decodedId ||
        l.id === cleanId ||
        l.id.endsWith(cleanId) ||
        `LD-${l.id}` === decodedId
    ) ||
    leads[0] || {
      id: decodedId || '1961922',
      clientName: 'Ritika Sharma',
      name: 'Ritika Sharma',
      phone: '+91 98710 77224',
      contactPhone: '+91 98710 77224',
      email: 'ritika.sharma@example.com',
      destination: 'Maldives',
      departureCity: 'Gwalior',
      travelStart: '2026-08-22',
      travelEnd: '2026-08-25',
      stage: 'Contacted',
      priority: 'Warm',
    };

  // Main Tab State: 'overview' (Full Lead Form), 'create-package', 'itinerary', 'optional', 'tnc', 'cost-sheet', 'history'
  const [activeTab, setActiveTab] = useState('overview');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // 1. Lead & Customer Information State
  const [leadSource, setLeadSource] = useState('Website');
  const [campaignName, setCampaignName] = useState('Summer Holiday Special');
  const [stage, setStage] = useState('Contacted');
  const [priority, setPriority] = useState('Warm');
  const [assignedSales, setAssignedSales] = useState('Priya Nair');
  const [assignedOps, setAssignedOps] = useState('Amit Kumar');
  const [leadTags, setLeadTags] = useState('Honeymoon, High Priority');

  const [customerName, setCustomerName] = useState('Ritika Sharma');
  const [phone, setPhone] = useState('+91 98710 77224');
  const [email, setEmail] = useState('ritika.sharma@example.com');
  const [customerType, setCustomerType] = useState('Individual');
  const [customerCategory, setCustomerCategory] = useState('New');
  const [preferredContactMode, setPreferredContactMode] = useState('WhatsApp');
  const [preferredContactTime, setPreferredContactTime] = useState('Evening (5 PM - 8 PM)');

  // 2. Travel Requirement & Destinations State
  const [departureCity, setDepartureCity] = useState('Gwalior');
  const [returnCityOption, setReturnCityOption] = useState('Same as Origin');
  const [returnCity, setReturnCity] = useState('Gwalior');
  const [destinationsList, setDestinationsList] = useState([
    { id: 1, name: 'Maldives' },
    { id: 2, name: 'Goa' },
  ]);
  const [newDestInput, setNewDestInput] = useState('');

  const [departureDate, setDepartureDate] = useState('2026-08-22');
  const [returnDate, setReturnDate] = useState('2026-08-25');
  const [dateFlexibility, setDateFlexibility] = useState('Fixed');

  const [tripType, setTripType] = useState('Domestic');
  const [travelPurpose, setTravelPurpose] = useState('Group');

  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  // Auto calculated nights = Return Date - Departure Date
  const durationNights = useMemo(() => {
    if (!departureDate || !returnDate) return 1;
    const start = new Date(departureDate).getTime();
    const end = new Date(returnDate).getTime();
    const diffDays = Math.ceil((end - start) / (1000 * 3600 * 24));
    return Math.max(1, isNaN(diffDays) ? 1 : diffDays);
  }, [departureDate, returnDate]);

  // Computed Route String e.g. Gwalior -> Maldives -> Goa -> Gwalior
  const computedRouteString = useMemo(() => {
    const finalReturn = returnCityOption === 'Different City' ? (returnCity || departureCity) : departureCity;
    const destNames = destinationsList.map((d) => d.name).filter(Boolean);
    return [departureCity, ...destNames, finalReturn].filter(Boolean).join(' → ');
  }, [departureCity, destinationsList, returnCityOption, returnCity]);

  // 3. Dynamic Travellers List State
  const [travellersList, setTravellersList] = useState([
    {
      id: 1,
      fullName: 'Ritika Sharma',
      age: 29,
      gender: 'Female',
      nationality: 'Indian',
      type: 'Adult',
      passportStatus: 'Available',
      specialReq: 'Vegetarian Meal',
    },
    {
      id: 2,
      fullName: 'Passenger 2',
      age: 32,
      gender: 'Male',
      nationality: 'Indian',
      type: 'Adult',
      passportStatus: 'Available',
      specialReq: 'Window Seat',
    },
  ]);
  const [newTravellerName, setNewTravellerName] = useState('');
  const [newTravellerAge, setNewTravellerAge] = useState('25');
  const [newTravellerType, setNewTravellerType] = useState('Adult');

  // 4. Accommodation Preferences
  const [hotelCategory, setHotelCategory] = useState('4-Star');
  const [preferredHotel, setPreferredHotel] = useState('Grand Hyatt / Adaaran Resort');
  const [preferredLocation, setPreferredLocation] = useState('Beachfront / Atoll');
  const [roomCategory, setRoomCategory] = useState('Deluxe Ocean View Villa');
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [bedPreference, setBedPreference] = useState('King Double');
  const [mealPlan, setMealPlan] = useState('Breakfast Only');

  // 5. Transportation & Flight Preferences
  const [flightRequired, setFlightRequired] = useState('Yes');
  const [preferredAirline, setPreferredAirline] = useState('Singapore Airlines / Emirates');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [airportPickup, setAirportPickup] = useState('Private Speedboat');

  // 6. Visa, Passport & Documents
  const [passportAvailable, setPassportAvailable] = useState('Available');
  const [visaRequired, setVisaRequired] = useState('Visa Required');
  const [visaStatus, setVisaStatus] = useState('Approved / On Arrival');

  // 7. Budget & Commercial Qualification
  const [customerBudget, setCustomerBudget] = useState('₹3,50,000');
  const [estimatedDealValue, setEstimatedDealValue] = useState('350000');
  const [probabilityPct, setProbabilityPct] = useState(75);
  const [priceSensitivity, setPriceSensitivity] = useState('Medium');

  // 8. Requirements & Setups
  const [customerRequirements, setCustomerRequirements] = useState(
    'Group trip requirement for 2 adults. Prefers 4★ resort with breakfast + speedboat transfers.'
  );
  const [internalNotes, setInternalNotes] = useState(
    'Customer prefers evening calls after 6 PM. Price-sensitive regarding flight upgrades.'
  );

  // Synchronize state when target lead changes
  useEffect(() => {
    if (lead) {
      setLeadSource(lead.source || lead.leadSource || 'Website');
      setCampaignName(lead.campaignName || 'Summer Holiday Special');
      setStage(lead.leadStage || lead.stage || lead.status || 'Contacted');
      setPriority(lead.priority || lead.temperature || 'Warm');
      setAssignedSales(lead.assignedSalesUser || lead.salesExecutive || 'Priya Nair');
      setAssignedOps(lead.assignedOpsUser || 'Amit Kumar');
      setLeadTags(lead.leadTags || 'Honeymoon, High Priority');

      const nameVal = lead.clientName || lead.name || 'Ritika Sharma';
      setCustomerName(nameVal);
      setPhone(lead.phone || lead.contactPhone || '+91 98710 77224');
      setEmail(lead.email || lead.contactEmail || 'ritika.sharma@example.com');
      setCustomerType(lead.customerType || 'Individual');
      setCustomerCategory(lead.customerCategory || 'New');

      setDepartureCity(lead.departureCity || 'Gwalior');
      setReturnCity(lead.returnCity || lead.departureCity || 'Gwalior');
      setReturnCityOption(lead.returnCityOption || 'Same as Origin');

      if (lead.destinationsList && lead.destinationsList.length > 0) {
        setDestinationsList(lead.destinationsList);
      } else if (lead.destination) {
        setDestinationsList(
          lead.destination
            .split(/->|,/)
            .map((d, i) => ({ id: i + 1, name: d.trim() }))
            .filter((d) => d.name)
        );
      } else {
        setDestinationsList([{ id: 1, name: 'Maldives' }, { id: 2, name: 'Goa' }]);
      }

      setDepartureDate(lead.travelStart || lead.departureDate || '2026-08-22');
      setReturnDate(lead.travelEnd || lead.returnDate || '2026-08-25');
      setDateFlexibility(lead.dateFlexibility || 'Fixed');
      setTripType(lead.travelType || 'Domestic');
      setTravelPurpose(lead.travelPurpose || lead.inquiryType || 'Group');

      setAdultsCount(lead.adults || lead.pax || 2);
      setChildrenCount(lead.children || 0);
      setInfantsCount(lead.infants || 0);

      setTravellersList(
        lead.travellersList || [
          {
            id: 1,
            fullName: nameVal,
            age: 29,
            gender: 'Female',
            nationality: 'Indian',
            type: 'Adult',
            passportStatus: 'Available',
            specialReq: 'Vegetarian Meal',
          },
          {
            id: 2,
            fullName: 'Passenger 2',
            age: 32,
            gender: 'Male',
            nationality: 'Indian',
            type: 'Adult',
            passportStatus: 'Available',
            specialReq: 'Window Seat',
          },
        ]
      );

      setHotelCategory(lead.hotelCategory || '4-Star');
      setPreferredHotel(lead.preferredHotel || 'Grand Hyatt / Adaaran Resort');
      setPreferredLocation(lead.preferredLocation || 'Beachfront / Atoll');
      setRoomCategory(lead.roomCategory || 'Deluxe Ocean View Villa');
      setMealPlan(lead.mealPreference || 'Breakfast Only');

      setCustomerBudget(lead.budget || '₹3,50,000');
      setEstimatedDealValue(lead.estimatedDealValue || '350000');
      setProbabilityPct(lead.probabilityPct || 75);

      setCustomerRequirements(
        lead.customerRequirements ||
          'Group trip requirement for 2 adults. Prefers 4★ resort with breakfast + speedboat transfers.'
      );
      setInternalNotes(
        lead.internalNotes || 'Customer prefers evening calls after 6 PM. Price-sensitive regarding flight upgrades.'
      );
    }
  }, [id, lead?.id]);

  const handleAddTraveller = () => {
    if (!newTravellerName.trim()) return;
    setTravellersList([
      ...travellersList,
      {
        id: Date.now(),
        fullName: newTravellerName,
        age: Number(newTravellerAge) || 25,
        gender: 'Other',
        nationality: 'Indian',
        type: newTravellerType,
        passportStatus: 'Available',
        specialReq: '',
      },
    ]);
    setNewTravellerName('');
  };

  const handleDeleteTraveller = (tId) => {
    setTravellersList(travellersList.filter((t) => t.id !== tId));
  };

  const handleAddDestination = () => {
    if (!newDestInput.trim()) return;
    setDestinationsList([
      ...destinationsList,
      { id: Date.now(), name: newDestInput.trim() },
    ]);
    setNewDestInput('');
  };

  // Qualification Score Calculation
  const qualificationScore = Math.min(
    100,
    (stage === 'Quotation Sent' ? 30 : 20) +
      (probabilityPct > 70 ? 30 : 15) +
      (passportAvailable === 'Available' ? 20 : 10) +
      (customerBudget ? 20 : 10)
  );

  // Master Save Full Lead Handler
  const handleSaveFullLead = () => {
    if (lead && lead.id) {
      updateLead(lead.id, {
        clientName: customerName,
        name: customerName,
        phone,
        contactPhone: phone,
        email,
        contactEmail: email,
        destination: destinationsList.map((d) => d.name).join(' -> '),
        destinationsList,
        departureCity,
        origin: departureCity,
        returnCity: returnCityOption === 'Different City' ? returnCity : departureCity,
        returnCityOption,
        travelStart: departureDate,
        departureDate,
        travelEnd: returnDate,
        returnDate,
        durationNights,
        nights: durationNights,
        dateFlexibility,
        travelType: tripType,
        tripScope: tripType,
        travelPurpose,
        adults: adultsCount,
        children: childrenCount,
        infants: infantsCount,
        pax: adultsCount + childrenCount + infantsCount,
        stage,
        leadStage: stage,
        priority,
        assignedSalesUser: assignedSales,
        assignedOpsUser: assignedOps,
        budget: customerBudget,
        estimatedDealValue,
        probabilityPct,
        hotelCategory,
        mealPreference: mealPlan,
        customerRequirements,
        internalNotes,
        travellersList,
        customerType,
        customerCategory,
      });
    }

    setSaveSuccessMsg('Full Lead Record successfully updated and saved!');
    setTimeout(() => {
      setSaveSuccessMsg('');
    }, 4000);
  };

  const leadDisplayId = lead?.id ? (lead.id.startsWith('LD-') ? lead.id : `LD-${lead.id}`) : 'LD-1961922';

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#F8FAFC', minHeight: '100vh', pb: 8 }}>
      <EditLeadModal open={isEditModalOpen} onClose={closeEditModal} lead={editingLead || lead} />

      {/* Save Success Alert */}
      {saveSuccessMsg && (
        <Alert
          icon={<MdCheckCircle size={20} />}
          severity="success"
          onClose={() => setSaveSuccessMsg('')}
          sx={{ mb: 2.5, borderRadius: '12px', fontWeight: 800 }}
        >
          {saveSuccessMsg}
        </Alert>
      )}

      {/* Header Bar */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Button
            startIcon={<MdArrowBack size={20} />}
            onClick={() => navigate('/inquiry/manual')}
            sx={{ color: '#475569', fontWeight: 700, textTransform: 'none' }}
          >
            Back to Workspace
          </Button>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
            Full Lead Profile — {customerName}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="contained"
            disableElevation
            startIcon={<MdSave size={18} />}
            onClick={handleSaveFullLead}
            sx={{
              bgcolor: '#2563EB',
              '&:hover': { bgcolor: '#1D4ED8' },
              borderRadius: '8px',
              px: 2.5,
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            Save Full Lead
          </Button>
        </Stack>
      </Stack>

      {/* Full Lead Identity Banner */}
      <Card
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: '16px',
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
                  {customerName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, fontFamily: 'monospace', fontSize: 13 }}>
                  {leadDisplayId}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
              <Chip label={priority === 'Hot' ? '🔥 Hot' : '🟠 Warm'} size="small" sx={{ fontWeight: 800, bgcolor: priority === 'Hot' ? '#FCE7F3' : '#FEF3C7', color: priority === 'Hot' ? '#BE185D' : '#D97706' }} />
              <Chip label={stage} size="small" sx={{ fontWeight: 700, bgcolor: '#F1F5F9', color: '#334155' }} />
              <Chip label={`${customerType} • ${customerCategory}`} size="small" sx={{ fontWeight: 600, bgcolor: '#EFF6FF', color: '#2563EB' }} />
              <Chip label={`Qualification Score: ${qualificationScore}/100`} size="small" sx={{ fontWeight: 800, bgcolor: '#DCFCE7', color: '#15803D' }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }} flexWrap="wrap" gap={1}>
              {phone && (
                <Button variant="outlined" size="small" component="a" href={`tel:${phone}`} startIcon={<MdPhone size={16} />} sx={{ borderRadius: '8px', color: '#15803D', borderColor: '#BBF7D0', bgcolor: '#F0FDF4', fontWeight: 700 }}>
                  Call
                </Button>
              )}
              {email && (
                <Button variant="outlined" size="small" component="a" href={`mailto:${email}`} startIcon={<MdEmail size={16} />} sx={{ borderRadius: '8px', color: '#1D4ED8', borderColor: '#BFDBFE', bgcolor: '#EFF6FF', fontWeight: 700 }}>
                  Email
                </Button>
              )}
              {phone && (
                <Button variant="outlined" size="small" component="a" href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" startIcon={<MdChat size={16} />} sx={{ borderRadius: '8px', color: '#15803D', borderColor: '#BBF7D0', bgcolor: '#F0FDF4', fontWeight: 700 }}>
                  WhatsApp
                </Button>
              )}
              <Button variant="outlined" size="small" onClick={() => openEditModal(lead)} startIcon={<MdEdit size={16} />} sx={{ borderRadius: '8px', color: '#475569', borderColor: '#CBD5E1', fontWeight: 700 }}>
                Quick Edit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* Main Studio Navigation Tabs */}
      <Card elevation={0} sx={{ p: 1.25, mb: 3, borderRadius: '12px', bgcolor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {[
            { id: 'overview', label: 'Full Lead Record & Profile' },
            { id: 'create-package', label: '1 Create Package' },
            { id: 'itinerary', label: '2 Itinerary Studio' },
            { id: 'optional', label: '3 Optional Extras' },
            { id: 'tnc', label: '4 Terms & Conditions' },
            { id: 'cost-sheet', label: '5 Cost Sheet' },
            { id: 'history', label: '6 Audit History' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={isActive ? 'contained' : 'outlined'}
                disableElevation={isActive}
                size="small"
                sx={{
                  bgcolor: isActive ? '#2563EB' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  borderColor: isActive ? '#2563EB' : '#CBD5E1',
                  borderRadius: '8px',
                  fontWeight: isActive ? 800 : 600,
                  textTransform: 'none',
                  px: 2,
                  py: 0.75,
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Stack>
      </Card>

      {/* TAB: Full Lead Record & Profile (Structured Sections) */}
      {activeTab === 'overview' && (
        <Stack spacing={3}>
          {/* SECTION 1: Lead & Customer Information */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: 16 }}>
              1. Lead & Customer Information
            </Typography>

            <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', display: 'block', mb: 1.5, fontSize: 11 }}>
              LEAD MANAGEMENT DETAILS
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Lead Source</Typography>
                <TextField select fullWidth size="small" value={leadSource} onChange={(e) => setLeadSource(e.target.value)} sx={{ mt: 0.5 }}>
                  {['Website', 'WhatsApp', 'Instagram', 'Meta Ads', 'B2B Partner', 'Repeat', 'Manual'].map((src) => (
                    <MenuItem key={src} value={src}>{src}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Campaign Name</Typography>
                <TextField fullWidth size="small" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} sx={{ mt: 0.5 }} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Lead Stage</Typography>
                <TextField select fullWidth size="small" value={stage} onChange={(e) => setStage(e.target.value)} sx={{ mt: 0.5 }}>
                  {STAGE_OPTIONS.map((stg) => (
                    <MenuItem key={stg} value={stg}>{stg}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Priority</Typography>
                <TextField select fullWidth size="small" value={priority} onChange={(e) => setPriority(e.target.value)} sx={{ mt: 0.5 }}>
                  {PRIORITY_OPTIONS.map((p) => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Assigned Sales Exec</Typography>
                <TextField select fullWidth size="small" value={assignedSales} onChange={(e) => setAssignedSales(e.target.value)} sx={{ mt: 0.5 }}>
                  {SALES_USERS.map((usr) => (
                    <MenuItem key={usr} value={usr}>{usr}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Assigned Ops Exec</Typography>
                <TextField select fullWidth size="small" value={assignedOps} onChange={(e) => setAssignedOps(e.target.value)} sx={{ mt: 0.5 }}>
                  {OPS_USERS.map((usr) => (
                    <MenuItem key={usr} value={usr}>{usr}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Lead Tags</Typography>
                <TextField fullWidth size="small" value={leadTags} onChange={(e) => setLeadTags(e.target.value)} sx={{ mt: 0.5 }} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', display: 'block', mb: 1.5, fontSize: 11 }}>
              CUSTOMER PERSONAL DETAILS
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Customer Name*</Typography>
                <TextField fullWidth size="small" value={customerName} onChange={(e) => setCustomerName(e.target.value)} sx={{ mt: 0.5 }} />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Mobile Number*</Typography>
                <TextField fullWidth size="small" value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mt: 0.5 }} />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Email Address</Typography>
                <TextField fullWidth size="small" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mt: 0.5 }} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Customer Type</Typography>
                <TextField select fullWidth size="small" value={customerType} onChange={(e) => setCustomerType(e.target.value)} sx={{ mt: 0.5 }}>
                  {['Individual', 'Corporate', 'B2B'].map((t) => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Customer Category</Typography>
                <TextField select fullWidth size="small" value={customerCategory} onChange={(e) => setCustomerCategory(e.target.value)} sx={{ mt: 0.5 }}>
                  {['New', 'Existing', 'Repeat', 'VIP'].map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Preferred Contact Method</Typography>
                <TextField select fullWidth size="small" value={preferredContactMode} onChange={(e) => setPreferredContactMode(e.target.value)} sx={{ mt: 0.5 }}>
                  {['Call', 'WhatsApp', 'Email'].map((m) => (
                    <MenuItem key={m} value={m}>{m}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Preferred Contact Time</Typography>
                <TextField fullWidth size="small" value={preferredContactTime} onChange={(e) => setPreferredContactTime(e.target.value)} sx={{ mt: 0.5 }} />
              </Grid>
            </Grid>
          </Card>

          {/* SECTION 2: 2. TRAVEL REQUIREMENT & DESTINATIONS */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2.5, fontSize: 17 }}>
              2. TRAVEL REQUIREMENT & DESTINATIONS
            </Typography>

            <Stack spacing={3}>
              {/* A. TRAVEL ROUTE */}
              <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', display: 'block', mb: 2, fontSize: 11, letterSpacing: 0.5 }}>
                  A. TRAVEL ROUTE
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2.5 }}>
                  {/* Origin / Departure City * */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Origin / Departure City *
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      placeholder="e.g. Gwalior, Delhi, Mumbai..."
                      sx={{ bgcolor: '#FFFFFF' }}
                    />
                  </Grid>

                  {/* Return / Final Arrival City (Optional) */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Return / Final Arrival City
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          value={returnCityOption}
                          onChange={(e) => setReturnCityOption(e.target.value)}
                          sx={{ bgcolor: '#FFFFFF' }}
                        >
                          <MenuItem value="Same as Origin">Same as Origin</MenuItem>
                          <MenuItem value="Different City">Different City</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={6}>
                        {returnCityOption === 'Different City' ? (
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Return City (e.g. Mumbai)"
                            value={returnCity}
                            onChange={(e) => setReturnCity(e.target.value)}
                            sx={{ bgcolor: '#FFFFFF' }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            size="small"
                            value={departureCity}
                            disabled
                            sx={{ bgcolor: '#F1F5F9' }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Destinations List */}
                <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 1, display: 'block', fontSize: 11 }}>
                  Destinations *
                </Typography>

                <Stack spacing={1} sx={{ mb: 2 }}>
                  {destinationsList.map((d, index) => (
                    <Paper
                      key={d.id}
                      elevation={0}
                      sx={{
                        p: 1.25,
                        px: 2,
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        bgcolor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Chip
                          label={`①②③④⑤⑥⑦⑧⑨⑩`[index] || index + 1}
                          size="small"
                          sx={{ bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 800, height: 22, width: 22, fontSize: 11 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                          {d.name}
                        </Typography>
                      </Stack>
                      <IconButton
                        size="small"
                        onClick={() => setDestinationsList(destinationsList.filter((item) => item.id !== d.id))}
                        sx={{ color: '#EF4444' }}
                      >
                        <MdClose size={18} />
                      </IconButton>
                    </Paper>
                  ))}
                </Stack>

                {/* Add Destination Form */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    placeholder="Search / Add destination (e.g. Dubai, Goa, Abu Dhabi)..."
                    value={newDestInput}
                    onChange={(e) => setNewDestInput(e.target.value)}
                    sx={{ width: { xs: '100%', sm: 340 }, bgcolor: '#FFFFFF' }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddDestination}
                    disableElevation
                    startIcon={<MdAdd />}
                    sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' }, fontWeight: 700, textTransform: 'none', px: 2, py: 0.75 }}
                  >
                    Add
                  </Button>
                </Stack>

                {/* Dynamic Route Preview Banner */}
                <Box sx={{ mt: 2, p: 1.5, bgcolor: '#EFF6FF', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8', display: 'block', mb: 0.25 }}>
                    Calculated System Route Preview:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#1E40AF', fontFamily: 'monospace' }}>
                    {computedRouteString}
                  </Typography>
                </Box>
              </Box>

              {/* B. TRIP DATES */}
              <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', display: 'block', mb: 2, fontSize: 11, letterSpacing: 0.5 }}>
                  B. TRIP DATES
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Departure Date *
                    </Typography>
                    <TextField
                      type="date"
                      fullWidth
                      size="small"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Return Date
                    </Typography>
                    <TextField
                      type="date"
                      fullWidth
                      size="small"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Number of Nights (Auto)
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={`${durationNights} Nights`}
                      disabled
                      sx={{ bgcolor: '#F1F5F9' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Date Flexibility
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={dateFlexibility}
                      onChange={(e) => setDateFlexibility(e.target.value)}
                    >
                      <MenuItem value="Fixed">Fixed</MenuItem>
                      <MenuItem value="Flexible ±1 Day">Flexible ±1 Day</MenuItem>
                      <MenuItem value="Flexible ±2 Days">Flexible ±2 Days</MenuItem>
                      <MenuItem value="Flexible ±3 Days">Flexible ±3 Days</MenuItem>
                      <MenuItem value="Flexible ±7 Days">Flexible ±7 Days</MenuItem>
                      <MenuItem value="Completely Flexible">Completely Flexible</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              {/* C. TRIP DETAILS */}
              <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', display: 'block', mb: 2, fontSize: 11, letterSpacing: 0.5 }}>
                  C. TRIP DETAILS
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Trip Scope *
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                    >
                      <MenuItem value="Domestic">Domestic</MenuItem>
                      <MenuItem value="International">International</MenuItem>
                      <MenuItem value="Domestic + International">Domestic + International</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Travel Purpose
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={travelPurpose}
                      onChange={(e) => setTravelPurpose(e.target.value)}
                    >
                      {['Leisure', 'Family', 'Honeymoon', 'Group', 'Corporate', 'Business', 'Adventure', 'Religious', 'Medical', 'Educational', 'Wedding', 'Anniversary', 'Birthday', 'Other'].map((p) => (
                        <MenuItem key={p} value={p}>{p}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              {/* D. TRAVELLERS */}
              <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', display: 'block', mb: 2, fontSize: 11, letterSpacing: 0.5 }}>
                  D. TRAVELLERS
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Adults *
                    </Typography>
                    <TextField
                      type="number"
                      fullWidth
                      size="small"
                      value={adultsCount}
                      onChange={(e) => setAdultsCount(Number(e.target.value) || 1)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Children
                    </Typography>
                    <TextField
                      type="number"
                      fullWidth
                      size="small"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(Number(e.target.value) || 0)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700, mb: 0.5, display: 'block', fontSize: 11 }}>
                      Infants
                    </Typography>
                    <TextField
                      type="number"
                      fullWidth
                      size="small"
                      value={infantsCount}
                      onChange={(e) => setInfantsCount(Number(e.target.value) || 0)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Card>

          {/* SECTION 3: Traveller / Passenger Details (+ Add Traveller) */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 16 }}>
                3. Traveller & Passenger Roster ({travellersList.length} Pax)
              </Typography>
            </Stack>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '10px', mb: 2.5 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>FULL NAME</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>AGE</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>TYPE</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>PASSPORT</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: 11 }}>SPECIAL REQUIREMENT</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, fontSize: 11 }}>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {travellersList.map((t, idx) => (
                    <TableRow key={t.id}>
                      <TableCell sx={{ fontWeight: 700 }}>{idx + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#0F172A' }}>{t.fullName}</TableCell>
                      <TableCell>{t.age} yrs</TableCell>
                      <TableCell><Chip label={t.type} size="small" sx={{ height: 20, fontSize: 10, fontWeight: 700, bgcolor: '#EFF6FF', color: '#2563EB' }} /></TableCell>
                      <TableCell><Chip label={t.passportStatus} size="small" sx={{ height: 20, fontSize: 10, fontWeight: 700, bgcolor: '#DCFCE7', color: '#15803D' }} /></TableCell>
                      <TableCell sx={{ fontStyle: 'italic', fontSize: 12 }}>{t.specialReq || 'None'}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleDeleteTraveller(t.id)} sx={{ color: '#EF4444' }}>
                          <MdDeleteOutline size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Quick Add Traveller Row */}
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
              <TextField size="small" placeholder="Passenger Full Name..." value={newTravellerName} onChange={(e) => setNewTravellerName(e.target.value)} sx={{ width: 240 }} />
              <TextField size="small" placeholder="Age" type="number" value={newTravellerAge} onChange={(e) => setNewTravellerAge(e.target.value)} sx={{ width: 90 }} />
              <TextField select size="small" value={newTravellerType} onChange={(e) => setNewTravellerType(e.target.value)} sx={{ width: 120 }}>
                {['Adult', 'Child', 'Infant'].map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
              <Button variant="contained" size="small" disableElevation onClick={handleAddTraveller} startIcon={<MdPersonAdd />} sx={{ bgcolor: '#2563EB', fontWeight: 700, textTransform: 'none' }}>
                + Add Traveller
              </Button>
            </Stack>
          </Card>

          {/* SECTION 4 & 5: Accommodation & Flight Grid */}
          <Grid container spacing={3}>
            {/* 4. Accommodation Preferences */}
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: 16 }}>
                  4. Accommodation Preferences
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Hotel Category</Typography>
                    <TextField select fullWidth size="small" value={hotelCategory} onChange={(e) => setHotelCategory(e.target.value)} sx={{ mt: 0.5 }}>
                      {['3-Star', '4-Star', '5-Star', 'Luxury Resort'].map((h) => (
                        <MenuItem key={h} value={h}>{h}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Meal Plan</Typography>
                    <TextField select fullWidth size="small" value={mealPlan} onChange={(e) => setMealPlan(e.target.value)} sx={{ mt: 0.5 }}>
                      {['Room Only', 'Breakfast', 'Half Board', 'Full Board', 'All Inclusive'].map((m) => (
                        <MenuItem key={m} value={m}>{m}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Preferred Hotel / Resort</Typography>
                    <TextField fullWidth size="small" value={preferredHotel} onChange={(e) => setPreferredHotel(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Room Category</Typography>
                    <TextField fullWidth size="small" value={roomCategory} onChange={(e) => setRoomCategory(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Bed Preference</Typography>
                    <TextField fullWidth size="small" value={bedPreference} onChange={(e) => setBedPreference(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* 5. Transportation & Flight Preferences */}
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: 16 }}>
                  5. Transportation & Flight Preferences
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Flight Required</Typography>
                    <TextField select fullWidth size="small" value={flightRequired} onChange={(e) => setFlightRequired(e.target.value)} sx={{ mt: 0.5 }}>
                      {['Yes', 'No'].map((f) => (
                        <MenuItem key={f} value={f}>{f}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Cabin Class</Typography>
                    <TextField select fullWidth size="small" value={cabinClass} onChange={(e) => setCabinClass(e.target.value)} sx={{ mt: 0.5 }}>
                      {['Economy', 'Premium Economy', 'Business Class', 'First Class'].map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Preferred Airline</Typography>
                    <TextField fullWidth size="small" value={preferredAirline} onChange={(e) => setPreferredAirline(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Airport Pickup & Drop</Typography>
                    <TextField fullWidth size="small" value={airportPickup} onChange={(e) => setAirportPickup(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          {/* SECTION 6 & 7: Documents & Commercial Qualification */}
          <Grid container spacing={3}>
            {/* 6. Visa & Passport */}
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: 16 }}>
                  6. Visa, Passport & Travel Documents
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Passport Status</Typography>
                    <TextField select fullWidth size="small" value={passportAvailable} onChange={(e) => setPassportAvailable(e.target.value)} sx={{ mt: 0.5 }}>
                      {['Available', 'Not Available', 'Expired'].map((p) => (
                        <MenuItem key={p} value={p}>{p}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Visa Requirement</Typography>
                    <TextField fullWidth size="small" value={visaRequired} onChange={(e) => setVisaRequired(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Visa Status</Typography>
                    <TextField fullWidth size="small" value={visaStatus} onChange={(e) => setVisaStatus(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* 7. Commercial Qualification */}
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: 16 }}>
                  7. Budget & Commercial Qualification
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Customer Budget</Typography>
                    <TextField fullWidth size="small" value={customerBudget} onChange={(e) => setCustomerBudget(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Estimated Deal Value (₹)</Typography>
                    <TextField fullWidth size="small" value={estimatedDealValue} onChange={(e) => setEstimatedDealValue(e.target.value)} sx={{ mt: 0.5 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Probability (%)</Typography>
                    <TextField type="number" fullWidth size="small" value={probabilityPct} onChange={(e) => setProbabilityPct(Number(e.target.value))} sx={{ mt: 0.5 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Price Sensitivity</Typography>
                    <TextField select fullWidth size="small" value={priceSensitivity} onChange={(e) => setPriceSensitivity(e.target.value)} sx={{ mt: 0.5 }}>
                      {['Low', 'Medium', 'High'].map((ps) => (
                        <MenuItem key={ps} value={ps}>{ps}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          {/* SECTION 8: Customer Requirements & Staff Notes */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, fontSize: 16 }}>
              8. Customer Preferences & Staff Notes
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Customer Requirements Description</Typography>
                <TextField fullWidth multiline rows={4} value={customerRequirements} onChange={(e) => setCustomerRequirements(e.target.value)} sx={{ mt: 0.5 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: '#D97706', fontWeight: 800 }}>Internal Staff Notes (Private)</Typography>
                <TextField fullWidth multiline rows={4} value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} sx={{ mt: 0.5, bgcolor: '#FFFBEB' }} />
              </Grid>
            </Grid>
          </Card>

          {/* SECTION 9: Activity Timeline Log */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <MdHistory size={20} color="#2563EB" />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 16 }}>
                Activity Timeline Log
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              {[
                { date: 'Today, 11:30 AM', title: '📞 Follow-up Call Completed', desc: 'Discussed revised overwater villa quotes. Client is positive.', user: 'Priya Nair' },
                { date: '10 Aug 2026', title: '✉ Email Sent', desc: `Sent initial customized itinerary PDF to ${email}`, user: 'Priya Nair' },
                { date: '08 Aug 2026', title: '👤 Lead Assigned', desc: 'Lead assigned to Executive Priya Nair', user: 'System' },
                { date: '08 Aug 2026', title: '🟢 Lead Created', desc: `Captured automatically from ${leadSource}`, user: 'System' },
              ].map((act, i) => (
                <Box key={i} sx={{ p: 1.5, borderLeft: '3px solid #2563EB', bgcolor: '#F8FAFC', borderRadius: '0 8px 8px 0' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>
                      {act.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                      {act.date}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#334155', fontSize: 12.5, mt: 0.25 }}>
                    {act.desc}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 700, mt: 0.5, display: 'block' }}>
                    By {act.user}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Card>
        </Stack>
      )}

      {/* TAB 2: 1 Create Package */}
      {activeTab === 'create-package' && (
        <Stack spacing={3}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
              Create Package Studio
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Configure readymade package, hotel inclusions, and destination parameters for {customerName}.
            </Typography>
          </Card>
        </Stack>
      )}

      {/* TAB 3: 2 Itinerary Studio */}
      {activeTab === 'itinerary' && (
        <Stack spacing={3}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Itinerary Studio — {destinationsList.map((d) => d.name).join(' -> ')}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Configure day-by-day program, hotel options, and meal plans.
            </Typography>
          </Card>
        </Stack>
      )}

      {/* TABS 4, 5, 6, 7 */}
      {['optional', 'tnc', 'cost-sheet', 'history'].includes(activeTab) && (
        <Card elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', textAlign: 'center', borderStyle: 'dashed' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1, textTransform: 'capitalize' }}>
            {activeTab.replace('-', ' ')} Section
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Managed here for {customerName}.
          </Typography>
        </Card>
      )}
    </Box>
  );
}
