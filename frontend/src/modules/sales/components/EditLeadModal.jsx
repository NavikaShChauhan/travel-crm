import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Stack,
  IconButton,
  Switch,
  FormControlLabel,
  InputAdornment,
  Autocomplete,
  Divider,
  Paper,
} from '@mui/material';
import { MdClose, MdKeyboardArrowUp, MdKeyboardArrowDown, MdEditNote, MdDelete } from 'react-icons/md';
import { tokens } from '@styles/theme';

// --- Constants & Options ---
export const NATIONALITY_OPTIONS = [
  'Indian',
  'American',
  'British',
  'Canadian',
  'Australian',
  'Emirati',
  'Singaporean',
  'German',
  'French',
  'Japanese',
  'Other',
];

export const STATE_OPTIONS = [
  'Maharashtra',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'Gujarat',
  'Telangana',
  'West Bengal',
  'Kerala',
  'Punjab',
  'Rajasthan',
  'Goa',
  'Haryana',
  'Other',
];

export const COUNTRY_OPTIONS = [
  'India',
  'United Arab Emirates',
  'Singapore',
  'Thailand',
  'Indonesia',
  'Switzerland',
  'Maldives',
  'United Kingdom',
  'United States',
  'Malaysia',
  'France',
  'Japan',
  'Other',
];

export const DESTINATION_OPTIONS = [
  'Bali, Indonesia',
  'Switzerland',
  'Kerala, India',
  'Maldives',
  'Dubai, UAE',
  'Singapore',
  'Phuket, Thailand',
  'Goa, India',
  'Paris, France',
  'Tokyo, Japan',
  'Ladakh, India',
  'Andaman Islands',
  'Kashmir, India',
  'Rajasthan, India',
];

export const DEPARTURE_CITY_OPTIONS = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Pune',
  'Jaipur',
  'Cochin',
];

export const EXECUTIVE_OPTIONS = [
  'Priya Sharma',
  'Arjun Nair',
  'Meera Pillai',
  'Karan Malhotra',
  'Rahul Jain',
  'Unassigned',
];

export const PACKAGE_TYPE_OPTIONS = [
  'Honeymoon',
  'Family',
  'Group',
  'Corporate',
  'Solo',
  'Friends',
];

export const TRAVEL_TYPE_OPTIONS = ['Domestic', 'International'];

export const HOTEL_CATEGORY_OPTIONS = ['3★', '4★', '5★', 'Luxury Resort', 'Boutique Hotel', 'Any'];

export const MEAL_PREFERENCE_OPTIONS = [
  'Breakfast Only',
  'Half Board',
  'Full Board',
  'All Inclusive',
];

export const FLIGHT_PREFERENCE_OPTIONS = [
  'Economy',
  'Premium Economy',
  'Business',
  'First Class',
  'No Preference',
];

export const LEAD_SOURCE_OPTIONS = [
  'Website',
  'Walk-in',
  'Referral',
  'Facebook',
  'Instagram',
  'Google Ads',
  'WhatsApp',
  'Email',
  'Corporate',
  'Travel Agent',
  'Repeat Customer',
  'Other',
];

export const LEAD_PRIORITY_OPTIONS = ['Hot', 'Warm', 'Cold'];

export const LEAD_STATUS_OPTIONS = [
  'New',
  'Qualified',
  'Proposal Created',
  'Proposal Sent',
  'Follow-up',
  'Negotiation',
  'Soft Confirm',
  'Confirmed',
  'Lost',
  'Cancelled',
];

export const CONTACT_METHOD_OPTIONS = ['Call', 'WhatsApp', 'Email', 'SMS'];

export const CONTACT_TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Anytime'];

export const LANGUAGE_OPTIONS = ['English', 'Hindi'];

// --- Custom Number Spinner Component ---
function NumberSpinner({ label, value, onChange, min = 0, max = 99, disabled = false }) {
  const handleIncrement = () => {
    const num = parseInt(value, 10) || 0;
    if (num < max && !disabled) {
      onChange(num + 1);
    }
  };

  const handleDecrement = () => {
    const num = parseInt(value, 10) || 0;
    if (num > min && !disabled) {
      onChange(num - 1);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      onChange(0);
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      if (parsed >= min && parsed <= max) {
        onChange(parsed);
      }
    }
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      inputProps={{ style: { textAlign: 'center' } }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Stack direction="column" sx={{ mr: -0.5 }}>
              <IconButton
                size="small"
                onClick={handleIncrement}
                disabled={disabled || value >= max}
                sx={{ p: 0.1, height: 16, width: 18 }}
                aria-label={`Increase ${label}`}
              >
                <MdKeyboardArrowUp size={16} />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDecrement}
                disabled={disabled || value <= min}
                sx={{ p: 0.1, height: 16, width: 18 }}
                aria-label={`Decrease ${label}`}
              >
                <MdKeyboardArrowDown size={16} />
              </IconButton>
            </Stack>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
}

// --- Section Header Helper ---
function SectionHeader({ title }) {
  return (
    <Box sx={{ mb: 1.5, mt: 1 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.color.navy900, fontSize: '0.95rem' }}>
        {title}
      </Typography>
      <Divider sx={{ mt: 0.75 }} />
    </Box>
  );
}

export default function EditLeadModal({ open, onClose, lead, onSave, onDelete }) {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  // Helper to extract default state from passed lead
  const buildInitialState = (l) => {
    if (!l) return {};

    const rawDest = l.destination || (l.id === 'LD-1001' ? ['Bali, Indonesia'] : l.id === 'LD-1005' ? ['Switzerland'] : ['Kerala, India']);
    const destinations = Array.isArray(rawDest) ? rawDest : [rawDest];

    return {
      // 1. Customer Info
      name: l.name || '',
      contactPhone: l.contactPhone || '',
      alternatePhone: l.alternatePhone || '+91 98765 40000',
      contactEmail: l.contactEmail || '',
      nationality: l.nationality || 'Indian',
      city: l.city || 'Mumbai',
      state: l.state || 'Maharashtra',
      country: l.country || 'India',

      // 2. Trip Info
      destinations: destinations,
      departureCity: l.departureCity || 'Mumbai',
      departureDate: l.departureDate || '2026-08-15',
      returnDate: l.returnDate || '2026-08-22',
      durationNights: l.durationNights !== undefined ? l.durationNights : 7,
      adults: l.adults !== undefined ? l.adults : 2,
      children: l.children !== undefined ? l.children : 0,
      infants: l.infants !== undefined ? l.infants : 0,
      packageType: l.packageType || (l.id === 'LD-1001' ? 'Honeymoon' : 'Family'),
      travelType: l.travelType || (l.id === 'LD-1001' || l.id === 'LD-1005' ? 'International' : 'Domestic'),
      budget: l.budget !== undefined ? l.budget : (l.id === 'LD-1005' ? 485000 : l.id === 'LD-1001' ? 240000 : 120000),
      hotelCategory: l.hotelCategory || '4★',
      mealPreference: l.mealPreference || 'Breakfast Only',
      flightPreference: l.flightPreference || 'Economy',
      visaRequired: l.visaRequired !== undefined ? l.visaRequired : (l.id === 'LD-1001' || l.id === 'LD-1005'),
      passportRequired: l.passportRequired !== undefined ? l.passportRequired : (l.id === 'LD-1001' || l.id === 'LD-1005'),

      // 3. Sales Info
      salesExecutive: l.salesExecutive || 'Priya Sharma',
      source: l.source || 'Referral',
      temperature: l.temperature || 'Hot',
      status: l.status || 'new',
      expectedBookingDate: l.expectedBookingDate || '2026-08-10',
      estimatedDealValue: l.estimatedDealValue !== undefined ? l.estimatedDealValue : (l.id === 'LD-1005' ? 485000 : l.id === 'LD-1001' ? 240000 : 120000),

      // 4. Preferences
      preferredContactMethod: l.preferredContactMethod || 'WhatsApp',
      preferredContactTime: l.preferredContactTime || 'Morning',
      preferredLanguage: l.preferredLanguage || 'English',
      specialRequests: l.specialRequests || 'Prefer early check-in where available. Morning flight preference.',
    };
  };

  const [formData, setFormData] = useState(() => buildInitialState(lead));

  // Sync state whenever lead changes or dialog opens
  useEffect(() => {
    if (lead) {
      setFormData(buildInitialState(lead));
    }
  }, [lead, open]);

  // Auto-calculate Duration whenever departureDate or returnDate changes
  useEffect(() => {
    if (formData.departureDate && formData.returnDate) {
      const start = new Date(formData.departureDate);
      const end = new Date(formData.returnDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays !== formData.durationNights) {
          setFormData((prev) => ({ ...prev, durationNights: diffDays }));
        }
      }
    }
  }, [formData.departureDate, formData.returnDate]);

  // Total PAX auto-calculated
  const totalPax = (parseInt(formData.adults, 10) || 0) + (parseInt(formData.children, 10) || 0) + (parseInt(formData.infants, 10) || 0);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(buildInitialState(lead));
  };

  const handleSave = () => {
    const updatedLead = {
      ...lead,

      // Core fields
      name: formData.name,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
      source: formData.source,
      status: formData.status,
      temperature: formData.temperature,
      salesExecutive: formData.salesExecutive,

      // Extended fields
      alternatePhone: formData.alternatePhone,
      nationality: formData.nationality,
      city: formData.city,
      state: formData.state,
      country: formData.country,

      destination: formData.destinations,
      departureCity: formData.departureCity,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      durationNights: formData.durationNights,
      adults: formData.adults,
      children: formData.children,
      infants: formData.infants,
      totalPax: totalPax,
      packageType: formData.packageType,
      travelType: formData.travelType,
      budget: formData.budget,
      hotelCategory: formData.hotelCategory,
      mealPreference: formData.mealPreference,
      flightPreference: formData.flightPreference,
      visaRequired: formData.visaRequired,
      passportRequired: formData.passportRequired,

      expectedBookingDate: formData.expectedBookingDate,
      estimatedDealValue: formData.estimatedDealValue,

      preferredContactMethod: formData.preferredContactMethod,
      preferredContactTime: formData.preferredContactTime,
      preferredLanguage: formData.preferredLanguage,
      specialRequests: formData.specialRequests,

      lastUpdated: new Date().toISOString(),
    };

    if (onSave) {
      onSave(updatedLead);
    }
    onClose();
  };

  if (!lead) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2.5,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          m: 0,
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${tokens.color.line200}`,
          bgcolor: tokens.color.surface1,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              p: 1,
              borderRadius: 1.5,
              bgcolor: 'rgba(27,42,74,0.08)',
              color: tokens.color.navy900,
              display: 'flex',
            }}
          >
            <MdEditNote size={24} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Edit Lead Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lead.name} · {lead.id}
            </Typography>
          </Box>
        </Stack>
        <IconButton aria-label="Close edit popup" onClick={onClose} size="small">
          <MdClose size={22} />
        </IconButton>
      </DialogTitle>

      {/* Form Content */}
      <DialogContent dividers sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
        <Stack spacing={3}>
          {/* ================= 1. Customer Information ================= */}
          <Box component="section">
            <SectionHeader title="1. Customer Information" />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Customer Name"
                  value={formData.name || ''}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Mobile Number"
                  type="tel"
                  value={formData.contactPhone || ''}
                  onChange={(e) => handleFieldChange('contactPhone', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Alternate Mobile"
                  type="tel"
                  value={formData.alternatePhone || ''}
                  onChange={(e) => handleFieldChange('alternatePhone', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Email"
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  options={NATIONALITY_OPTIONS}
                  value={formData.nationality || null}
                  onChange={(_, newValue) => handleFieldChange('nationality', newValue || '')}
                  renderInput={(params) => <TextField {...params} label="Nationality" fullWidth />}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="City"
                  value={formData.city || ''}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  options={STATE_OPTIONS}
                  value={formData.state || null}
                  onChange={(_, newValue) => handleFieldChange('state', newValue || '')}
                  renderInput={(params) => <TextField {...params} label="State" fullWidth />}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  options={COUNTRY_OPTIONS}
                  value={formData.country || null}
                  onChange={(_, newValue) => handleFieldChange('country', newValue || '')}
                  renderInput={(params) => <TextField {...params} label="Country" fullWidth />}
                  freeSolo
                />
              </Grid>
            </Grid>
          </Box>

          {/* ================= 2. Trip Information ================= */}
          <Box component="section">
            <SectionHeader title="2. Trip Information" />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Autocomplete
                  multiple
                  options={DESTINATION_OPTIONS}
                  value={formData.destinations || []}
                  onChange={(_, newValue) => handleFieldChange('destinations', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Destination" placeholder="Search & select destinations" fullWidth />
                  )}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  options={DEPARTURE_CITY_OPTIONS}
                  value={formData.departureCity || null}
                  onChange={(_, newValue) => handleFieldChange('departureCity', newValue || '')}
                  renderInput={(params) => <TextField {...params} label="Departure City" fullWidth />}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Departure Date"
                  type="date"
                  value={formData.departureDate || ''}
                  onChange={(e) => handleFieldChange('departureDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Return Date"
                  type="date"
                  value={formData.returnDate || ''}
                  onChange={(e) => handleFieldChange('returnDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <NumberSpinner
                  label="Duration (Nights)"
                  value={formData.durationNights}
                  onChange={(val) => handleFieldChange('durationNights', val)}
                  min={1}
                  max={90}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.25,
                    px: 2,
                    height: '56px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor: 'action.hover',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Total PAX (Auto)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                    {totalPax} Passenger{totalPax !== 1 ? 's' : ''}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <NumberSpinner
                  label="Adults"
                  value={formData.adults}
                  onChange={(val) => handleFieldChange('adults', val)}
                  min={1}
                  max={50}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberSpinner
                  label="Children"
                  value={formData.children}
                  onChange={(val) => handleFieldChange('children', val)}
                  min={0}
                  max={20}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <NumberSpinner
                  label="Infants"
                  value={formData.infants}
                  onChange={(val) => handleFieldChange('infants', val)}
                  min={0}
                  max={10}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Package Type"
                  value={formData.packageType || ''}
                  onChange={(e) => handleFieldChange('packageType', e.target.value)}
                  fullWidth
                >
                  {PACKAGE_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Travel Type"
                  value={formData.travelType || ''}
                  onChange={(e) => handleFieldChange('travelType', e.target.value)}
                  fullWidth
                >
                  {TRAVEL_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Budget"
                  type="number"
                  value={formData.budget || ''}
                  onChange={(e) => handleFieldChange('budget', e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Preferred Hotel Category"
                  value={formData.hotelCategory || ''}
                  onChange={(e) => handleFieldChange('hotelCategory', e.target.value)}
                  fullWidth
                >
                  {HOTEL_CATEGORY_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Meal Preference"
                  value={formData.mealPreference || ''}
                  onChange={(e) => handleFieldChange('mealPreference', e.target.value)}
                  fullWidth
                >
                  {MEAL_PREFERENCE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Flight Preference"
                  value={formData.flightPreference || ''}
                  onChange={(e) => handleFieldChange('flightPreference', e.target.value)}
                  fullWidth
                >
                  {FLIGHT_PREFERENCE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    px: 2,
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Visa Required
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={Boolean(formData.visaRequired)}
                        onChange={(e) => handleFieldChange('visaRequired', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={formData.visaRequired ? 'Yes' : 'No'}
                    sx={{ mr: 0 }}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    px: 2,
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Passport Required
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={Boolean(formData.passportRequired)}
                        onChange={(e) => handleFieldChange('passportRequired', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={formData.passportRequired ? 'Yes' : 'No'}
                    sx={{ mr: 0 }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* ================= 3. Sales Information ================= */}
          <Box component="section">
            <SectionHeader title="3. Sales Information" />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  options={EXECUTIVE_OPTIONS}
                  value={formData.salesExecutive || null}
                  onChange={(_, newValue) => handleFieldChange('salesExecutive', newValue || '')}
                  renderInput={(params) => <TextField {...params} label="Assigned Executive" fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Lead Source"
                  value={formData.source || ''}
                  onChange={(e) => handleFieldChange('source', e.target.value)}
                  fullWidth
                >
                  {LEAD_SOURCE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Lead Priority"
                  value={formData.temperature || ''}
                  onChange={(e) => handleFieldChange('temperature', e.target.value)}
                  fullWidth
                >
                  {LEAD_PRIORITY_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Lead Status"
                  value={formData.status || ''}
                  onChange={(e) => handleFieldChange('status', e.target.value)}
                  fullWidth
                >
                  {LEAD_STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Expected Booking Date"
                  type="date"
                  value={formData.expectedBookingDate || ''}
                  onChange={(e) => handleFieldChange('expectedBookingDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Estimated Deal Value"
                  type="number"
                  value={formData.estimatedDealValue || ''}
                  onChange={(e) => handleFieldChange('estimatedDealValue', e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          {/* ================= 4. Preferences ================= */}
          <Box component="section">
            <SectionHeader title="4. Preferences" />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Preferred Contact Method"
                  value={formData.preferredContactMethod || ''}
                  onChange={(e) => handleFieldChange('preferredContactMethod', e.target.value)}
                  fullWidth
                >
                  {CONTACT_METHOD_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Preferred Contact Time"
                  value={formData.preferredContactTime || ''}
                  onChange={(e) => handleFieldChange('preferredContactTime', e.target.value)}
                  fullWidth
                >
                  {CONTACT_TIME_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Preferred Language"
                  value={formData.preferredLanguage || ''}
                  onChange={(e) => handleFieldChange('preferredLanguage', e.target.value)}
                  fullWidth
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Special Requests"
                  multiline
                  minRows={3}
                  value={formData.specialRequests || ''}
                  onChange={(e) => handleFieldChange('specialRequests', e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>

      {/* Footer Buttons */}
      <DialogActions sx={{ p: 2.5, px: 3, borderTop: `1px solid ${tokens.color.line200}`, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<MdDelete />}
          onClick={() => setIsConfirmDelete(true)}
        >
          Delete Lead
        </Button>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset Changes
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Stack>
      </DialogActions>

      {/* Delete Lead Confirmation Dialog */}
      <Dialog open={isConfirmDelete} onClose={() => setIsConfirmDelete(false)}>
        <DialogTitle>Confirm Delete Lead</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete lead <strong>{formData.name}</strong> ({lead?.id})? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDelete(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setIsConfirmDelete(false);
              if (onDelete) onDelete(lead?.id);
              onClose();
            }}
          >
            Delete Lead
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
