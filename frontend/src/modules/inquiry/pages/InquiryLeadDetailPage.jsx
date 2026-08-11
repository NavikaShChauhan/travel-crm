import { useState } from 'react';
import { useParams, useNavigate } from 'react';
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
} from '@mui/material';
import {
  MdArrowBack,
  MdPhone,
  MdChat,
  MdEmail,
  MdAdd,
  MdEdit,
  MdDeleteOutline,
} from 'react-icons/md';

import { useInquiry } from '../contexts/InquiryContext';
import EditLeadModal from '../components/EditLeadModal';

const STAGE_OPTIONS = [
  'New',
  'Contacted',
  'Follow-up',
  'Proposal Sent',
  'Viewed',
  'Negotiation',
  'Revised Proposal',
  'Soft Confirm',
  'Confirmed',
  'Denied',
];

const PRIORITY_OPTIONS = ['Hot', 'Warm', 'Cold'];
const SALES_USERS = ['Priya Nair', 'Neha Gupta', 'Rahul Sharma', 'Ananya Roy'];

export default function InquiryLeadDetailPage() {
  const {
    leads,
    updateLead,
    openEditModal,
    isEditModalOpen,
    closeEditModal,
    editingLead,
  } = useInquiry();
  const navigate = useNavigate();

  const decodedId = decodeURIComponent(id || '');
  const lead = leads.find((l) => l.id === decodedId) || leads[0];

  // Tab State: 'overview', 'create-package', 'itinerary', 'optional', 'tnc', 'cost-sheet', 'history'
  const [activeTab, setActiveTab] = useState('create-package');

  // Lead Overview Form State
  const [stage, setStage] = useState(lead ? lead.stage : 'Contacted');
  const [priority, setPriority] = useState(lead ? lead.priority : 'Warm');
  const [assignedTo, setAssignedTo] = useState(lead ? lead.assignedSalesUser : 'Priya Nair');

  // Package Form State (Image 3)
  const [packageKind, setPackageKind] = useState('Readymade Package');
  const [packageFlags, setPackageFlags] = useState({
    isFixedDeparture: false,
    busRoute: false,
    commonFlight: false,
    cruise: false,
  });
  const [packageScope, setPackageScope] = useState('Domestic');
  const [packageName, setPackageName] = useState('Bali Family Holiday');
  const [startingFrom, setStartingFrom] = useState('Dubai (United Arab Emirates)');
  const [endCity, setEndCity] = useState('Dubai (United Arab Emirates)');
  const [destinationsCovered, setDestinationsCovered] = useState('Abu Dhabi (United Arab Emirates)');
  const [supplier, setSupplier] = useState('Naveen Kerala Supplier');
  const [packageTheme, setPackageTheme] = useState('Family');
  const [packageInclusions, setPackageInclusions] = useState('Breakfast & Lunch');
  const [categories, setCategories] = useState({
    budget: true,
    standard: true,
    deluxe: true,
    luxury: true,
    premium: false,
  });
  const [specification, setSpecification] = useState('Daily Itinerary Based');
  const [overviewNotes, setOverviewNotes] = useState('');

  // Itinerary Form State (Image 4 & 5)
  const [citiesList, setCitiesList] = useState([
    { id: 1, city: 'Dubai (United Arab Emirates)', nights: 3, from: 'Day 1', to: 'Day 4' },
    { id: 2, city: 'Abu Dhabi (United Arab Emirates)', nights: 1, from: 'Day 4', to: 'Day 5' },
  ]);
  const [newCityName, setNewCityName] = useState('');
  const [newCityNights, setNewCityNights] = useState('0');

  // Day 1 Itinerary State
  const [day1Title, setDay1Title] = useState('Arrival in Dubai (United Arab Emirates)');
  const [day1Program, setDay1Program] = useState(
    'Pick up from airport in private car.\nCheck-in at hotel.\nWelcome drink and leisure time.'
  );
  const [meals, setMeals] = useState({ breakfast: true, lunch: false, dinner: false });

  if (!lead) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Lead not found</Typography>
        <Button onClick={() => navigate('/inquiry/manual')} sx={{ mt: 2 }}>
          Back to Manual Inquiries
        </Button>
      </Box>
    );
  }

  const handleStageChange = (e) => {
    const val = e.target.value;
    setStage(val);
    updateLead(lead.id, { stage: val });
  };

  const handlePriorityChange = (e) => {
    const val = e.target.value;
    setPriority(val);
    updateLead(lead.id, { priority: val });
  };

  const handleAssignedChange = (e) => {
    const val = e.target.value;
    setAssignedTo(val);
    updateLead(lead.id, { assignedSalesUser: val });
  };

  const handleAddCity = () => {
    if (!newCityName) return;
    const nextId = citiesList.length + 1;
    const n = parseInt(newCityNights, 10) || 1;
    setCitiesList([
      ...citiesList,
      {
        id: nextId,
        city: newCityName,
        nights: n,
        from: `Day ${citiesList.length + 1}`,
        to: `Day ${citiesList.length + 1 + n}`,
      },
    ]);
    setNewCityName('');
    setNewCityNights('0');
  };

  const handleDeleteCity = (cityId) => {
    setCitiesList(citiesList.filter((c) => c.id !== cityId));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <EditLeadModal open={isEditModalOpen} onClose={closeEditModal} lead={editingLead || lead} />

      {/* Top Navigation & Title */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Button
            startIcon={<MdArrowBack size={20} />}
            onClick={() => navigate('/inquiry/manual')}
            sx={{ color: '#475569', fontWeight: 600, textTransform: 'none' }}
          >
            Back
          </Button>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
            Inquiry Engine
          </Typography>
        </Stack>

        <Chip label="Not Sent" size="small" sx={{ bgcolor: '#F1F5F9', color: '#64748B', fontWeight: 600 }} />
      </Stack>

      {/* ITINERARY STUDIO Action Header */}
      <Card
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: '16px',
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748B', letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 13 }}>
            ITINERARY STUDIO
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              disableElevation
              startIcon={<MdAdd size={18} />}
              sx={{ bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' }, textTransform: 'none', borderRadius: '8px', fontWeight: 600, px: 2.5 }}
            >
              Add Custom Inventory
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: '#CBD5E1', color: '#475569', textTransform: 'none', borderRadius: '8px', fontWeight: 600, px: 2.5 }}
            >
              Generate Inventory
            </Button>
          </Stack>
        </Stack>
      </Card>

      {/* Studio Navigation Tabs Bar */}
      <Card
        elevation={0}
        sx={{
          p: 1.25,
          mb: 3,
          borderRadius: '12px',
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {[
              { id: 'overview', label: 'Lead Overview & Pipeline' },
              { id: 'create-package', label: '1 Create Package' },
              { id: 'itinerary', label: '2 Itinerary' },
              { id: 'optional', label: '3 Optional' },
              { id: 'tnc', label: '4 T & C' },
              { id: 'cost-sheet', label: '5 Cost Sheet' },
              { id: 'history', label: '6 Contributors History' },
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
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 13,
                    px: 2,
                    py: 0.75,
                    bgcolor: isActive ? '#3B82F6' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#475569',
                    borderColor: isActive ? '#3B82F6' : '#E2E8F0',
                    '&:hover': {
                      bgcolor: isActive ? '#2563EB' : '#F8FAFC',
                    },
                  }}
                >
                  {tab.label}
                </Button>
              );
            })}
          </Stack>

          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate('/inquiry/manual')}
            sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, color: '#475569', borderColor: '#E2E8F0' }}
          >
            Back to Package Workspace
          </Button>
        </Stack>
      </Card>

      {/* TAB CONTENTS */}

      {/* TAB 0: Lead Overview & Pipeline */}
      {activeTab === 'overview' && (
        <Grid container spacing={3}>
          {/* Left Column: LEAD DETAILS */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748B', letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 12 }}>
                  LEAD DETAILS
                </Typography>
                <Button
                  size="small"
                  startIcon={<MdEdit size={16} />}
                  onClick={() => openEditModal(lead)}
                  sx={{ textTransform: 'none', fontWeight: 600, color: '#2563EB', fontSize: 12 }}
                >
                  Edit Lead Form
                </Button>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    LEAD ID
                  </Typography>
                  <TextField fullWidth size="small" value={lead.id} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    DATE / TIME
                  </Typography>
                  <TextField fullWidth size="small" value={lead.date} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    NAME
                  </Typography>
                  <TextField fullWidth size="small" value={lead.clientName} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    TRAVELLERS
                  </Typography>
                  <TextField fullWidth size="small" value={lead.pax} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    PHONE
                  </Typography>
                  <TextField fullWidth size="small" value={lead.phone} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    EMAIL
                  </Typography>
                  <TextField fullWidth size="small" value={lead.email} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    DESTINATION
                  </Typography>
                  <TextField fullWidth size="small" value={lead.destination} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    BUDGET
                  </Typography>
                  <TextField fullWidth size="small" value={lead.budget} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    DESCRIPTION
                  </Typography>
                  <TextField fullWidth multiline rows={3} value={lead.description} InputProps={{ readOnly: true }} sx={{ bgcolor: '#F8FAFC' }} />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Right Column: PIPELINE AND OWNERSHIP */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748B', letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 2.5, fontSize: 12 }}>
                PIPELINE AND OWNERSHIP
              </Typography>
              <Grid container spacing={2.5} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    STAGE
                  </Typography>
                  <TextField select fullWidth size="small" value={stage} onChange={handleStageChange}>
                    {STAGE_OPTIONS.map((st) => (
                      <MenuItem key={st} value={st}>
                        {st}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    PRIORITY
                  </Typography>
                  <TextField select fullWidth size="small" value={priority} onChange={handlePriorityChange}>
                    {PRIORITY_OPTIONS.map((pr) => (
                      <MenuItem key={pr} value={pr}>
                        {pr}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                    ASSIGNED TO
                  </Typography>
                  <TextField select fullWidth size="small" value={assignedTo} onChange={handleAssignedChange}>
                    {SALES_USERS.map((usr) => (
                      <MenuItem key={usr} value={usr}>
                        {usr}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={1.5}>
                <Grid item xs={4}>
                  <Button fullWidth variant="outlined" startIcon={<MdPhone size={18} />} sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#334155' }}>
                    Call
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant="outlined" startIcon={<MdChat size={18} />} sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#334155' }}>
                    WhatsApp
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant="outlined" startIcon={<MdEmail size={18} />} sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#334155' }}>
                    Email
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* TAB 1: 1 Create Package (Image 3) */}
      {activeTab === 'create-package' && (
        <Stack spacing={3}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            {/* Readymade / Departure checkboxes */}
            <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Radio checked={packageKind === 'Readymade Package'} onChange={() => setPackageKind('Readymade Package')} size="small" />}
                label={<Typography variant="body2" sx={{ fontWeight: 700 }}>Readymade Package</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={packageFlags.isFixedDeparture} onChange={(e) => setPackageFlags({ ...packageFlags, isFixedDeparture: e.target.checked })} size="small" />}
                label={<Typography variant="body2" sx={{ fontSize: 13 }}>Is Fixed Departure Package</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={packageFlags.busRoute} onChange={(e) => setPackageFlags({ ...packageFlags, busRoute: e.target.checked })} size="small" />}
                label={<Typography variant="body2" sx={{ fontSize: 13 }}>Bus Route Package</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={packageFlags.commonFlight} onChange={(e) => setPackageFlags({ ...packageFlags, commonFlight: e.target.checked })} size="small" />}
                label={<Typography variant="body2" sx={{ fontSize: 13 }}>Common Flight</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={packageFlags.cruise} onChange={(e) => setPackageFlags({ ...packageFlags, cruise: e.target.checked })} size="small" />}
                label={<Typography variant="body2" sx={{ fontSize: 13 }}>Cruise</Typography>}
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={3}>
              {/* Left Side Form Fields */}
              <Grid item xs={12} md={8}>
                <Stack spacing={2.5}>
                  {/* Package Type Radio Row */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>
                      Package Type
                    </Typography>
                    <RadioGroup row value={packageScope} onChange={(e) => setPackageScope(e.target.value)}>
                      <FormControlLabel value="Domestic" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontSize: 13 }}>Domestic</Typography>} />
                      <FormControlLabel value="Inbound" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontSize: 13 }}>Inbound</Typography>} />
                      <FormControlLabel value="International" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontSize: 13 }}>International</Typography>} />
                    </RadioGroup>
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                        Enter Package Name*
                      </Typography>
                      <TextField fullWidth size="small" value={packageName} onChange={(e) => setPackageName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                        Starting From*
                      </Typography>
                      <TextField fullWidth size="small" value={startingFrom} onChange={(e) => setStartingFrom(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                        End City*
                      </Typography>
                      <TextField fullWidth size="small" value={endCity} onChange={(e) => setEndCity(e.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                        Destinations Covered
                      </Typography>
                      <TextField fullWidth size="small" value={destinationsCovered} onChange={(e) => setDestinationsCovered(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                        Supplier*
                      </Typography>
                      <TextField fullWidth size="small" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                        Package Theme
                      </Typography>
                      <TextField select fullWidth size="small" value={packageTheme} onChange={(e) => setPackageTheme(e.target.value)}>
                        {['Family', 'Honeymoon', 'Adventure', 'Beach', 'Luxury'].map((thm) => (
                          <MenuItem key={thm} value={thm}>{thm}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                        Package Inclusions
                      </Typography>
                      <TextField select fullWidth size="small" value={packageInclusions} onChange={(e) => setPackageInclusions(e.target.value)}>
                        {['Breakfast & Lunch', 'All Meals', 'Flight + Hotel', 'Hotel Only'].map((inc) => (
                          <MenuItem key={inc} value={inc}>{inc}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>

              {/* Right Side Options Panel */}
              <Grid item xs={12} md={4}>
                <Stack spacing={2.5}>
                  {/* Package Categories */}
                  <Box sx={{ border: '1px solid #E2E8F0', p: 2, borderRadius: '12px', bgcolor: '#F8FAFC' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 1, fontSize: 12 }}>
                      Package Categories*
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {['budget', 'standard', 'deluxe', 'luxury', 'premium'].map((cat) => (
                        <FormControlLabel
                          key={cat}
                          control={<Checkbox size="small" checked={categories[cat]} onChange={(e) => setCategories({ ...categories, [cat]: e.target.checked })} />}
                          label={<Typography variant="caption" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>{cat}</Typography>}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Package Specification */}
                  <Box sx={{ border: '1px solid #E2E8F0', p: 2, borderRadius: '12px', bgcolor: '#F8FAFC' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 1, fontSize: 12 }}>
                      Package Specification
                    </Typography>
                    <RadioGroup value={specification} onChange={(e) => setSpecification(e.target.value)}>
                      <FormControlLabel value="Daily Itinerary Based" control={<Radio size="small" />} label={<Typography variant="caption" sx={{ fontWeight: 600 }}>Daily Itinerary Based</Typography>} />
                      <FormControlLabel value="Only Hotel" control={<Radio size="small" />} label={<Typography variant="caption" sx={{ fontWeight: 600 }}>Only Hotel</Typography>} />
                    </RadioGroup>
                  </Box>

                  {/* Upload Image */}
                  <Box sx={{ border: '1px solid #E2E8F0', p: 2, borderRadius: '12px', bgcolor: '#F8FAFC' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 1, fontSize: 11 }}>
                      Upload Image (Recommend size W:800px & H:600px)
                    </Typography>
                    <Button variant="outlined" component="label" size="small" sx={{ textTransform: 'none', bgcolor: '#FFFFFF' }}>
                      Choose File
                      <input type="file" hidden />
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            </Grid>

            {/* Overview Rich Text Area */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #E2E8F0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 16, mb: 1 }}>
                Overview
              </Typography>
              <Box sx={{ border: '1px solid #CBD5E1', borderRadius: '8px', p: 1.5, bgcolor: '#FFFFFF' }}>
                <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 1 }}>
                  Rich text toolbar placeholder (source, format, align, media, print).
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter detailed package overview, highlights, and itinerary summary..."
                  value={overviewNotes}
                  onChange={(e) => setOverviewNotes(e.target.value)}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />
              </Box>
            </Box>
          </Card>
        </Stack>
      )}

      {/* TAB 2: 2 Itinerary (Image 4 & 5) */}
      {activeTab === 'itinerary' && (
        <Stack spacing={3}>
          {/* Header Banner */}
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 20 }}>
              {packageName.toUpperCase()}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5, fontSize: 13 }}>
              Starting from : {startingFrom} • 4 Nights 5 Days
            </Typography>

            <Divider sx={{ my: 2.5 }} />

            {/* Section: Add Cities, Nights & Itineraries */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 16 }}>
                Add Cities, Nights & Itineraries
              </Typography>
              <Chip label="Required" size="small" sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontWeight: 700, fontSize: 11 }} />
            </Stack>

            {/* Existing Cities Table */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              {citiesList.map((item) => (
                <Card key={item.id} elevation={0} sx={{ p: 2, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC', borderRadius: '10px' }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10, textTransform: 'uppercase' }}>
                        City
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                        {item.city}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10, textTransform: 'uppercase' }}>
                        No. of Night
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {item.nights}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10, textTransform: 'uppercase' }}>
                        From
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {item.from}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={2}>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10, textTransform: 'uppercase' }}>
                        To
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {item.to}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2} align="right">
                      <IconButton size="small" sx={{ color: '#64748B' }}>
                        <MdEdit size={18} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteCity(item.id)} sx={{ color: '#EF4444' }}>
                        <MdDeleteOutline size={18} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>

            {/* Add Hotel City Form Row */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                  Add Hotel City
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type city and country"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                  No. of Night
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={newCityNights}
                  onChange={(e) => setNewCityNights(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} sm={3} sx={{ mt: { sm: 2.5 } }}>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={handleAddCity}
                  sx={{ bgcolor: '#EA580C', '&:hover': { bgcolor: '#C2410C' }, textTransform: 'none', borderRadius: '8px', fontWeight: 700 }}
                >
                  + Add City
                </Button>
              </Grid>
            </Grid>
          </Card>

          {/* Update Itinerary & Accommodation for Day 1 */}
          <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: '#1E3A8A', px: 3, py: 1.5, color: '#FFFFFF' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: 15 }}>
                Day 1
              </Typography>
            </Box>

            <Box sx={{ p: 3, bgcolor: '#FFFFFF' }}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                    Title
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={day1Title}
                    onChange={(e) => setDay1Title(e.target.value)}
                  />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', fontSize: 11 }}>
                    Program
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 0.5 }}>
                    Rich text toolbar placeholder (bold, list, align, links, export).
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={day1Program}
                    onChange={(e) => setDay1Program(e.target.value)}
                  />
                </Box>

                <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between" flexWrap="wrap">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>
                      Meal Plan
                    </Typography>
                    <FormControlLabel
                      control={<Checkbox size="small" checked={meals.breakfast} onChange={(e) => setMeals({ ...meals, breakfast: e.target.checked })} />}
                      label={<Typography variant="caption">Breakfast</Typography>}
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" checked={meals.lunch} onChange={(e) => setMeals({ ...meals, lunch: e.target.checked })} />}
                      label={<Typography variant="caption">Lunch</Typography>}
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" checked={meals.dinner} onChange={(e) => setMeals({ ...meals, dinner: e.target.checked })} />}
                      label={<Typography variant="caption">Dinner</Typography>}
                    />
                  </Stack>

                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={<Typography variant="caption" sx={{ fontWeight: 600, color: '#475569' }}>Save as Itinerary Description Master</Typography>}
                  />
                </Stack>

                <Divider sx={{ my: 1 }} />

                {/* Select Hotel Section */}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>
                  Select Hotel
                </Typography>

                <Grid container spacing={2.5}>
                  {/* Deluxe */}
                  <Grid item xs={12} md={6}>
                    <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                      <Box sx={{ bgcolor: '#1E3A8A', px: 2, py: 1, color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 12 }}>
                          Deluxe
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#93C5FD', cursor: 'pointer', fontWeight: 600 }}>
                          Add Hotel Manually
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, bgcolor: '#FFFFFF' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                          Hotel
                        </Typography>
                        <TextField select fullWidth size="small" defaultValue="" displayEmpty>
                          <MenuItem value="" disabled>Select Hotel</MenuItem>
                          <MenuItem value="grand">Grand Hyatt Dubai</MenuItem>
                          <MenuItem value="marriott">JW Marriott Marquis</MenuItem>
                        </TextField>
                      </Box>
                    </Card>
                  </Grid>

                  {/* Luxury */}
                  <Grid item xs={12} md={6}>
                    <Card elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                      <Box sx={{ bgcolor: '#1E3A8A', px: 2, py: 1, color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 12 }}>
                          Luxury
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#93C5FD', cursor: 'pointer', fontWeight: 600 }}>
                          Add Hotel Manually
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, bgcolor: '#FFFFFF' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 0.5, fontSize: 11 }}>
                          Hotel
                        </Typography>
                        <TextField select fullWidth size="small" defaultValue="" displayEmpty>
                          <MenuItem value="" disabled>Select Hotel</MenuItem>
                          <MenuItem value="burj">Burj Al Arab</MenuItem>
                          <MenuItem value="atlantis">Atlantis The Palm</MenuItem>
                        </TextField>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Card>
        </Stack>
      )}

      {/* TABS 3, 4, 5, 6: Structural Placeholders */}
      {['optional', 'tnc', 'cost-sheet', 'history'].includes(activeTab) && (
        <Card elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px border #E2E8F0', bgcolor: '#FFFFFF', textAlign: 'center', borderStyle: 'dashed' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1, textTransform: 'capitalize' }}>
            {activeTab.replace('-', ' ')} Studio Section
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Configuration options for this section will be managed here.
          </Typography>
        </Card>
      )}
    </Box>
  );
}
