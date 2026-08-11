import { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  IconButton,
  Divider,
  Slider,
  Stack,
  Chip,
  InputAdornment,
} from '@mui/material';
import { MdClose, MdPersonAdd, MdContentCopy } from 'react-icons/md';
import { useInquiry } from '../contexts/InquiryContext';

const TRAVEL_PURPOSE_OPTIONS = [
  'Leisure',
  'Honeymoon',
  'Family',
  'Corporate',
  'Group',
  'Adventure',
  'Pilgrimage',
  'Other',
];

const SOURCE_OPTIONS = [
  'Manual',
  'Website',
  'whatsapp',
  'Instagram / Meta Ads',
  'B2B Partners',
  'Repeat Customers',
  'Walk-In',
  'Referral',
  'Google Ads',
];

const LEAD_STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Interested',
  'Follow-up',
  'Quotation Sent',
  'Negotiation',
  'Won',
  'Lost',
  'Closed',
];

const LEAD_STAGE_OPTIONS = [
  'New Lead',
  'Qualification',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
  'Closed Lost',
];

const PRIORITY_OPTIONS = ['Hot', 'Warm', 'Cold'];

const SALES_USERS = [
  'Priya Nair',
  'Neha Gupta',
  'Rahul Sharma',
  'Ananya Roy',
  'Priya Sharma',
  'Arjun Nair',
];

const HOTEL_CATEGORY_OPTIONS = [
  '3★',
  '4★',
  '5★',
  'Luxury Resort',
  'Boutique Hotel',
  'Budget / Homestay',
];

const MEAL_OPTIONS = [
  'Breakfast Only (CP)',
  'Half Board (MAP)',
  'Full Board (AP)',
  'All Inclusive',
  'Room Only (EP)',
];

const TRANSPORTATION_OPTIONS = [
  'Private Cab',
  'Shared Transfers',
  'Train',
  'Bus',
  'Self-Drive',
  'Flight Only',
  'Not Required',
];

const FOLLOWUP_MODES = ['Call', 'WhatsApp', 'Email', 'Meeting', 'Video Call'];

const CUSTOMER_TYPE_OPTIONS = ['Individual', 'Corporate', 'B2B'];

const CUSTOMER_CATEGORY_OPTIONS = ['New', 'Existing', 'Repeat', 'VIP'];

// Helper label component with red asterisk for mandatory fields
function FieldLabel({ label, required = false }) {
  return (
    <Typography
      variant="caption"
      sx={{
        fontWeight: 700,
        color: '#475569',
        mb: 0.5,
        display: 'block',
        textTransform: 'uppercase',
        fontSize: 11,
      }}
    >
      {label}
      {required && <span style={{ color: '#EF4444', marginLeft: '4px', fontSize: '13px' }}>*</span>}
    </Typography>
  );
}

export default function AddLeadModal() {
  const { isAddModalOpen, closeAddModal, addLead, leads } = useInquiry();

  // Calculate next Auto Lead ID preview
  const nextLeadIdPreview = `Q/26/${1961925 + (leads ? leads.length : 0)}`;

  const [formData, setFormData] = useState({
    // Section 1: Basic Information
    clientName: '',
    phone: '',
    alternatePhone: '',
    email: '',
    whatsappNumber: '',

    // Section 2: Travel Information
    destination: '',
    departureCity: '',
    travelStart: '',
    travelEnd: '',
    adults: 2,
    children: 0,
    infants: 0,
    childAges: [],
    infantAges: [],
    travelType: 'Domestic',
    travelPurpose: 'Leisure',

    // Section 3: Travel Preferences
    budget: '',
    hotelCategory: '4★',
    mealPreference: 'Breakfast Only (CP)',
    transportationRequired: 'Private Cab',
    flightRequired: 'No',
    visaRequired: 'No',
    travelInsuranceRequired: 'No',

    // Section 4: Lead Management
    leadStatus: 'New',
    leadStage: 'New Lead',
    priority: 'Warm',
    assignedSalesUser: 'Priya Nair',
    source: 'Manual',
    expectedBookingDate: '',
    probabilityPct: 50,
    estimatedDealValue: '',

    // Section 5: Follow-up
    lastContactDate: '',
    nextFollowupDate: '',
    followupMode: 'WhatsApp',
    followupNotes: '',

    // Section 6: Requirements
    customerRequirements: '',
    internalNotes: '',

    // Section 7: Customer Classification
    customerType: 'Individual',
    customerCategory: 'New',
  });

  // Calculate Number of Nights automatically
  const numberOfNights = useMemo(() => {
    if (!formData.travelStart || !formData.travelEnd) return 0;
    const dStart = new Date(formData.travelStart);
    const dEnd = new Date(formData.travelEnd);
    if (isNaN(dStart.getTime()) || isNaN(dEnd.getTime())) return 0;
    const diffTime = dEnd.getTime() - dStart.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [formData.travelStart, formData.travelEnd]);

  // Dynamically update childAges array length when children count changes
  useEffect(() => {
    const numChildren = parseInt(formData.children, 10) || 0;
    setFormData((prev) => {
      const currentAges = [...prev.childAges];
      if (currentAges.length < numChildren) {
        while (currentAges.length < numChildren) {
          currentAges.push('5 years');
        }
      } else if (currentAges.length > numChildren) {
        currentAges.splice(numChildren);
      }
      return { ...prev, childAges: currentAges };
    });
  }, [formData.children]);

  // Dynamically update infantAges array length when infants count changes
  useEffect(() => {
    const numInfants = parseInt(formData.infants, 10) || 0;
    setFormData((prev) => {
      const currentAges = [...prev.infantAges];
      if (currentAges.length < numInfants) {
        while (currentAges.length < numInfants) {
          currentAges.push('10 months');
        }
      } else if (currentAges.length > numInfants) {
        currentAges.splice(numInfants);
      }
      return { ...prev, infantAges: currentAges };
    });
  }, [formData.infants]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCopyMobileToWhatsapp = () => {
    if (formData.phone) {
      setFormData((prev) => ({ ...prev, whatsappNumber: prev.phone }));
    }
  };

  const handleChildAgeChange = (index, val) => {
    setFormData((prev) => {
      const updated = [...prev.childAges];
      updated[index] = val;
      return { ...prev, childAges: updated };
    });
  };

  const handleInfantAgeChange = (index, val) => {
    setFormData((prev) => {
      const updated = [...prev.infantAges];
      updated[index] = val;
      return { ...prev, infantAges: updated };
    });
  };

  const totalPax =
    (parseInt(formData.adults, 10) || 0) +
    (parseInt(formData.children, 10) || 0) +
    (parseInt(formData.infants, 10) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verify 8 mandatory fields explicitly before submitting
    if (
      !formData.clientName.trim() ||
      !formData.phone.trim() ||
      !formData.destination.trim() ||
      !formData.departureCity.trim() ||
      !formData.travelStart ||
      !formData.adults ||
      !formData.source ||
      !formData.assignedSalesUser
    ) {
      return;
    }

    addLead({
      ...formData,
      durationNights: numberOfNights,
      flightRequired: formData.flightRequired === 'Yes',
      visaRequired: formData.visaRequired === 'Yes',
      travelInsuranceRequired: formData.travelInsuranceRequired === 'Yes',
      pax: totalPax,
      totalPax: totalPax,
    });
    closeAddModal();
  };

  return (
    <Dialog
      open={isAddModalOpen}
      onClose={closeAddModal}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1,
          bgcolor: '#FFFFFF',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: '#EEF2FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MdPersonAdd size={22} />
          </Box>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: 18, color: '#0F172A' }}>
                Create New Lead Form
              </Typography>
              <Chip
                label="7 Sections"
                size="small"
                sx={{ bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: 11 }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Fill enquiry details. Fields marked with <span style={{ color: '#EF4444' }}>*</span> are mandatory.
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={closeAddModal} sx={{ color: '#64748B' }}>
          <MdClose size={20} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 2.5, maxHeight: '72vh', overflowY: 'auto' }}>
          <Grid container spacing={2.5}>
            {/* Section 1: Basic Information */}
            <Grid item xs={12}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: '#2563EB',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  display: 'block',
                  mb: 0.5,
                  fontSize: 12,
                }}
              >
                1. Basic Information
              </Typography>
              <Divider />
            </Grid>

            {/* Change #1: Remove duplicate "Auto" */}
            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="Lead ID — Auto-generated" />
              <TextField
                fullWidth
                size="small"
                value={nextLeadIdPreview}
                disabled
                InputProps={{
                  sx: { bgcolor: '#F8FAFC', fontWeight: 700, color: '#2563EB' },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="Customer Name" required />
              <TextField
                fullWidth
                name="clientName"
                placeholder="Full name of customer"
                value={formData.clientName}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="Mobile Number" required />
              <TextField
                fullWidth
                name="phone"
                placeholder="+91 98765 00000"
                value={formData.phone}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="Alternate Mobile" />
              <TextField
                fullWidth
                name="alternatePhone"
                placeholder="Secondary phone"
                value={formData.alternatePhone}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="Email" />
              <TextField
                fullWidth
                type="email"
                name="email"
                placeholder="customer@example.com"
                value={formData.email}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="WhatsApp Number" />
              <TextField
                fullWidth
                name="whatsappNumber"
                placeholder="+91 WhatsApp"
                value={formData.whatsappNumber}
                onChange={handleChange}
                size="small"
                InputProps={{
                  endAdornment: formData.phone && formData.phone !== formData.whatsappNumber && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        title="Copy Mobile Number"
                        onClick={handleCopyMobileToWhatsapp}
                        sx={{ color: '#2563EB' }}
                      >
                        <MdContentCopy size={16} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Section 2: Travel Information */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: '#2563EB',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  display: 'block',
                  mb: 0.5,
                  fontSize: 12,
                }}
              >
                2. Travel Information
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Destination" required />
              <TextField
                fullWidth
                name="destination"
                placeholder="e.g. Bali, Switzerland, Goa"
                value={formData.destination}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Departure City" required />
              <TextField
                fullWidth
                name="departureCity"
                placeholder="e.g. Delhi, Mumbai"
                value={formData.departureCity}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Departure Date" required />
              <TextField
                fullWidth
                type="date"
                name="travelStart"
                value={formData.travelStart}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Return Date" />
              <TextField
                fullWidth
                type="date"
                name="travelEnd"
                value={formData.travelEnd}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Change #4: Number of Nights — Auto */}
            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Number of Nights — Auto" />
              <TextField
                fullWidth
                size="small"
                value={formData.travelStart && formData.travelEnd ? `${numberOfNights} Nights` : 'Auto Calculated'}
                disabled
                InputProps={{
                  sx: { bgcolor: '#F8FAFC', fontWeight: 700, color: '#0EA5E9' },
                }}
              />
            </Grid>

            <Grid item xs={4} sm={3} md={3}>
              <FieldLabel label="Adults" required />
              <TextField
                fullWidth
                type="number"
                name="adults"
                inputProps={{ min: 1 }}
                value={formData.adults}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={4} sm={3} md={3}>
              <FieldLabel label="Children" />
              <TextField
                fullWidth
                type="number"
                name="children"
                inputProps={{ min: 0 }}
                value={formData.children}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={4} sm={3} md={3}>
              <FieldLabel label="Infants" />
              <TextField
                fullWidth
                type="number"
                name="infants"
                inputProps={{ min: 0 }}
                value={formData.infants}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Trip Type" />
              <TextField
                select
                fullWidth
                name="travelType"
                value={formData.travelType}
                onChange={handleChange}
                size="small"
              >
                {['Domestic', 'International'].map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Travel Purpose" />
              <TextField
                select
                fullWidth
                name="travelPurpose"
                value={formData.travelPurpose}
                onChange={handleChange}
                size="small"
              >
                {TRAVEL_PURPOSE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Dynamic Child Ages Inputs */}
            {formData.childAges.map((age, idx) => (
              <Grid item xs={6} sm={3} key={`child-age-${idx}`}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: '#2563EB', mb: 0.5, display: 'block', fontSize: 11 }}
                >
                  Child {idx + 1} Age
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. 5 years"
                  value={age}
                  onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                />
              </Grid>
            ))}

            {/* Dynamic Infant Ages Inputs */}
            {formData.infantAges.map((age, idx) => (
              <Grid item xs={6} sm={3} key={`infant-age-${idx}`}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: '#D97706', mb: 0.5, display: 'block', fontSize: 11 }}
                >
                  Infant {idx + 1} Age / Months
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. 8 months"
                  value={age}
                  onChange={(e) => handleInfantAgeChange(idx, e.target.value)}
                />
              </Grid>
            ))}

            {/* Section 3: Travel Preferences */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: '#2563EB',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  display: 'block',
                  mb: 0.5,
                  fontSize: 12,
                }}
              >
                3. Travel Preferences
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Budget ₹" />
              <TextField
                fullWidth
                name="budget"
                placeholder="e.g. ₹1,50,000"
                value={formData.budget}
                onChange={handleChange}
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Hotel Category" />
              <TextField
                select
                fullWidth
                name="hotelCategory"
                value={formData.hotelCategory}
                onChange={handleChange}
                size="small"
              >
                {HOTEL_CATEGORY_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Meal Plan" />
              <TextField
                select
                fullWidth
                name="mealPreference"
                value={formData.mealPreference}
                onChange={handleChange}
                size="small"
              >
                {MEAL_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Transportation Required" />
              <TextField
                select
                fullWidth
                name="transportationRequired"
                value={formData.transportationRequired}
                onChange={handleChange}
                size="small"
              >
                {TRANSPORTATION_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Change #3: Flight Required, Visa Required, Travel Insurance -> Yes/No Dropdowns */}
            <Grid item xs={12} sm={4} md={4}>
              <FieldLabel label="Flight Required — Yes/No" />
              <TextField
                select
                fullWidth
                name="flightRequired"
                value={formData.flightRequired}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <FieldLabel label="Visa Required — Yes/No" />
              <TextField
                select
                fullWidth
                name="visaRequired"
                value={formData.visaRequired}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <FieldLabel label="Travel Insurance — Yes/No" />
              <TextField
                select
                fullWidth
                name="travelInsuranceRequired"
                value={formData.travelInsuranceRequired}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>

            {/* Section 4: Lead Management */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: '#2563EB',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  display: 'block',
                  mb: 0.5,
                  fontSize: 12,
                }}
              >
                4. Lead Management
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Lead Status" />
              <TextField
                select
                fullWidth
                name="leadStatus"
                value={formData.leadStatus}
                onChange={handleChange}
                size="small"
              >
                {LEAD_STATUS_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Lead Stage" />
              <TextField
                select
                fullWidth
                name="leadStage"
                value={formData.leadStage}
                onChange={handleChange}
                size="small"
              >
                {LEAD_STAGE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Priority" />
              <TextField
                select
                fullWidth
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                size="small"
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Assigned Executive" required />
              <TextField
                select
                fullWidth
                name="assignedSalesUser"
                value={formData.assignedSalesUser}
                onChange={handleChange}
                size="small"
                required
              >
                {SALES_USERS.map((usr) => (
                  <MenuItem key={usr} value={usr}>
                    {usr}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Lead Source" required />
              <TextField
                select
                fullWidth
                name="source"
                value={formData.source}
                onChange={handleChange}
                size="small"
                required
              >
                {SOURCE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Expected Booking Date" />
              <TextField
                fullWidth
                type="date"
                name="expectedBookingDate"
                value={formData.expectedBookingDate}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FieldLabel label="Estimated Deal Value ₹" />
              <TextField
                fullWidth
                type="number"
                name="estimatedDealValue"
                placeholder="e.g. 150000"
                value={formData.estimatedDealValue}
                onChange={handleChange}
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>

            {/* Change #2: Probability (%) — Default: 50% */}
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                <FieldLabel label="Probability (%)" />
                <Chip
                  label={`${formData.probabilityPct}%`}
                  size="small"
                  sx={{ height: 20, fontSize: 11, fontWeight: 700, bgcolor: '#EFF6FF', color: '#2563EB' }}
                />
              </Stack>
              <Slider
                value={formData.probabilityPct}
                onChange={(e, val) => setFormData((prev) => ({ ...prev, probabilityPct: val }))}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
                sx={{ color: '#3B82F6', mt: 0.5 }}
              />
            </Grid>

            {/* Section 5: Follow-up */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: '#2563EB',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  display: 'block',
                  mb: 0.5,
                  fontSize: 12,
                }}
              >
                5. Follow-up
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="Last Contact Date" />
              <TextField
                fullWidth
                type="date"
                name="lastContactDate"
                value={formData.lastContactDate}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="Next Follow-up Date" />
              <TextField
                fullWidth
                type="date"
                name="nextFollowupDate"
                value={formData.nextFollowupDate}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FieldLabel label="Follow-up Mode" />
              <TextField
                select
                fullWidth
                name="followupMode"
                value={formData.followupMode}
                onChange={handleChange}
                size="small"
              >
                {FOLLOWUP_MODES.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FieldLabel label="Follow-up Notes" />
              <TextField
                fullWidth
                multiline
                rows={2}
                name="followupNotes"
                placeholder="Enter notes about recent interactions or client responses..."
                value={formData.followupNotes}
                onChange={handleChange}
              />
            </Grid>

            {/* Section 6: Requirements */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: '#2563EB',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  display: 'block',
                  mb: 0.5,
                  fontSize: 12,
                }}
              >
                6. Requirements
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <FieldLabel label="Customer Requirements" />
              <TextField
                fullWidth
                multiline
                rows={3}
                name="customerRequirements"
                placeholder="e.g. 5N/6D Package required. Prefers beach villa, flight included from Delhi."
                value={formData.customerRequirements}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FieldLabel label="Internal Notes" />
              <TextField
                fullWidth
                multiline
                rows={2}
                name="internalNotes"
                placeholder="e.g. VIP client reference. Price sensitive. Prefers calls after 6 PM."
                value={formData.internalNotes}
                onChange={handleChange}
                sx={{ bgcolor: '#FFFBEB' }}
              />
            </Grid>

            {/* Section 7: Customer Classification */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: '#2563EB',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  display: 'block',
                  mb: 0.5,
                  fontSize: 12,
                }}
              >
                7. Customer Classification
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldLabel label="Customer Type (Individual / Corporate / B2B)" />
              <TextField
                select
                fullWidth
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
                size="small"
              >
                {CUSTOMER_TYPE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldLabel label="Customer Category (New / Existing / Repeat / VIP)" />
              <TextField
                select
                fullWidth
                name="customerCategory"
                value={formData.customerCategory}
                onChange={handleChange}
                size="small"
              >
                {CUSTOMER_CATEGORY_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1, borderTop: '1px solid #E2E8F0' }}>
          <Button
            onClick={closeAddModal}
            variant="text"
            sx={{ color: '#64748B', fontWeight: 600, textTransform: 'none', px: 2 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              bgcolor: '#3B82F6',
              '&:hover': { bgcolor: '#2563EB' },
              borderRadius: '8px',
              px: 3,
              py: 1,
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            + Save New Lead
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}


