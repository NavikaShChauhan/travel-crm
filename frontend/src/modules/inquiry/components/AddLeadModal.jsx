import { useState, useEffect } from 'react';
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
  FormControlLabel,
  Switch,
  Slider,
} from '@mui/material';
import { MdClose, MdPersonAdd } from 'react-icons/md';
import { useInquiry } from '../contexts/InquiryContext';

const TRAVEL_PURPOSE_OPTIONS = ['Leisure', 'Honeymoon', 'Family', 'Corporate', 'Group'];
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
const PRIORITY_OPTIONS = ['Hot', 'Warm', 'Cold'];
const SALES_USERS = ['Priya Nair', 'Neha Gupta', 'Rahul Sharma', 'Ananya Roy', 'Priya Sharma', 'Arjun Nair'];
const HOTEL_CATEGORY_OPTIONS = ['3★', '4★', '5★', 'Luxury Resort', 'Boutique Hotel'];
const MEAL_OPTIONS = ['Breakfast Only', 'Half Board', 'Full Board', 'All Inclusive'];
const FOLLOWUP_MODES = ['Call', 'WhatsApp', 'Email', 'Meeting'];

export default function AddLeadModal() {
  const { isAddModalOpen, closeAddModal, addLead } = useInquiry();

  const [formData, setFormData] = useState({
    // Section 1: Basic Information
    clientName: '',
    phone: '',
    alternatePhone: '',
    email: '',
    whatsappNumber: '',
    companyName: '',

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

    // Section 3: Customer Preferences
    budget: '',
    hotelCategory: '4★',
    mealPreference: 'Breakfast Only',
    flightRequired: false,
    trainRequired: false,
    cabRequired: false,
    visaRequired: false,
    passportAvailable: false,
    travelInsuranceRequired: false,

    // Section 4: Lead Management
    leadStatus: 'New',
    priority: 'Warm',
    assignedSalesUser: 'Priya Nair',
    source: 'Manual',
    expectedBookingDate: '',
    probabilityPct: 50,

    // Section 5: Follow-up Information
    lastContactDate: '',
    nextFollowupDate: '',
    followupMode: 'WhatsApp',
    followupNotes: '',

    // Section 6: Customer Requirements
    customerRequirements: '',

    // Section 7: Internal Notes
    internalNotes: '',
  });

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

  const totalPax = (parseInt(formData.adults, 10) || 0) + (parseInt(formData.children, 10) || 0) + (parseInt(formData.infants, 10) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead({
      ...formData,
      pax: totalPax,
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
          p: 1.5,
          bgcolor: '#FFFFFF',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              bgcolor: '#EEF2FF',
              color: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MdPersonAdd size={22} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: '#1E293B' }}>
              Add New Lead Form
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              7-Section Detailed Enquiry Entry Form
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
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                1. Basic Information (Contact Details)
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Customer Name*
              </Typography>
              <TextField fullWidth name="clientName" placeholder="Enter customer name" value={formData.clientName} onChange={handleChange} size="small" required />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Mobile Number*
              </Typography>
              <TextField fullWidth name="phone" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange} size="small" required />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Alternate Mobile
              </Typography>
              <TextField fullWidth name="alternatePhone" placeholder="Alternate phone" value={formData.alternatePhone} onChange={handleChange} size="small" />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Email
              </Typography>
              <TextField fullWidth name="email" placeholder="customer@example.com" value={formData.email} onChange={handleChange} size="small" />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                WhatsApp Number
              </Typography>
              <TextField fullWidth name="whatsappNumber" placeholder="+91 WhatsApp" value={formData.whatsappNumber} onChange={handleChange} size="small" />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Company Name
              </Typography>
              <TextField fullWidth name="companyName" placeholder="Corporate / Business name" value={formData.companyName} onChange={handleChange} size="small" />
            </Grid>

            {/* Section 2: Travel Information */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                2. Travel Information
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Destination*
              </Typography>
              <TextField fullWidth name="destination" placeholder="e.g. Goa, Bali, Switzerland" value={formData.destination} onChange={handleChange} size="small" required />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Departure City*
              </Typography>
              <TextField fullWidth name="departureCity" placeholder="e.g. Delhi, Mumbai" value={formData.departureCity} onChange={handleChange} size="small" required />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Departure Date*
              </Typography>
              <TextField fullWidth type="date" name="travelStart" value={formData.travelStart} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} required />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Return Date
              </Typography>
              <TextField fullWidth type="date" name="travelEnd" value={formData.travelEnd} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item xs={4} sm={2}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Adults*
              </Typography>
              <TextField fullWidth type="number" name="adults" value={formData.adults} onChange={handleChange} size="small" />
            </Grid>

            <Grid item xs={4} sm={2}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Children
              </Typography>
              <TextField fullWidth type="number" name="children" value={formData.children} onChange={handleChange} size="small" />
            </Grid>

            <Grid item xs={4} sm={2}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Infants
              </Typography>
              <TextField fullWidth type="number" name="infants" value={formData.infants} onChange={handleChange} size="small" />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Trip Type
              </Typography>
              <TextField select fullWidth name="travelType" value={formData.travelType} onChange={handleChange} size="small">
                {['Domestic', 'International'].map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Travel Purpose (Inquiry Type)
              </Typography>
              <TextField select fullWidth name="travelPurpose" value={formData.travelPurpose} onChange={handleChange} size="small">
                {TRAVEL_PURPOSE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Dynamic Child Ages Inputs */}
            {formData.childAges.map((age, idx) => (
              <Grid item xs={6} sm={3} key={`child-age-${idx}`}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#2563EB', mb: 0.5, display: 'block', fontSize: 11 }}>
                  Child {idx + 1} Age
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. 6 years"
                  value={age}
                  onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                />
              </Grid>
            ))}

            {/* Dynamic Infant Ages Inputs */}
            {formData.infantAges.map((age, idx) => (
              <Grid item xs={6} sm={3} key={`infant-age-${idx}`}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706', mb: 0.5, display: 'block', fontSize: 11 }}>
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

            {/* Section 3: Customer Preferences */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                3. Customer Preferences & Transport
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Budget
              </Typography>
              <TextField fullWidth name="budget" placeholder="e.g. ₹45,000 or INR 2.0L" value={formData.budget} onChange={handleChange} size="small" />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Hotel Category
              </Typography>
              <TextField select fullWidth name="hotelCategory" value={formData.hotelCategory} onChange={handleChange} size="small">
                {HOTEL_CATEGORY_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Meal Plan
              </Typography>
              <TextField select fullWidth name="mealPreference" value={formData.mealPreference} onChange={handleChange} size="small">
                {MEAL_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Transport & Documentation Requirements Checkboxes */}
            <Grid item xs={6} sm={4} md={2}>
              <FormControlLabel
                control={<Switch checked={formData.flightRequired} name="flightRequired" onChange={handleChange} color="primary" />}
                label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>Flight Required</Typography>}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <FormControlLabel
                control={<Switch checked={formData.trainRequired} name="trainRequired" onChange={handleChange} color="primary" />}
                label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>Train Required</Typography>}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <FormControlLabel
                control={<Switch checked={formData.cabRequired} name="cabRequired" onChange={handleChange} color="primary" />}
                label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>Cab Required</Typography>}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <FormControlLabel
                control={<Switch checked={formData.visaRequired} name="visaRequired" onChange={handleChange} color="primary" />}
                label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>Visa Required</Typography>}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <FormControlLabel
                control={<Switch checked={formData.passportAvailable} name="passportAvailable" onChange={handleChange} color="primary" />}
                label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>Passport Available</Typography>}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={2}>
              <FormControlLabel
                control={<Switch checked={formData.travelInsuranceRequired} name="travelInsuranceRequired" onChange={handleChange} color="primary" />}
                label={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>Travel Insurance</Typography>}
              />
            </Grid>

            {/* Section 4: Lead Management */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                4. Lead Management & Assignment
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Lead Status
              </Typography>
              <TextField select fullWidth name="leadStatus" value={formData.leadStatus} onChange={handleChange} size="small">
                {LEAD_STATUS_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Priority
              </Typography>
              <TextField select fullWidth name="priority" value={formData.priority} onChange={handleChange} size="small">
                {PRIORITY_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Assigned Executive
              </Typography>
              <TextField select fullWidth name="assignedSalesUser" value={formData.assignedSalesUser} onChange={handleChange} size="small">
                {SALES_USERS.map((usr) => (
                  <MenuItem key={usr} value={usr}>{usr}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Lead Source
              </Typography>
              <TextField select fullWidth name="source" value={formData.source} onChange={handleChange} size="small">
                {SOURCE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Expected Booking Date
              </Typography>
              <TextField fullWidth type="date" name="expectedBookingDate" value={formData.expectedBookingDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item xs={12} sm={6} md={8}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Probability ({formData.probabilityPct}%)
              </Typography>
              <Slider
                value={formData.probabilityPct}
                onChange={(e, val) => setFormData((prev) => ({ ...prev, probabilityPct: val }))}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
                sx={{ color: '#3B82F6' }}
              />
            </Grid>

            {/* Section 5: Follow-up Information */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                5. Follow-up Information
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Last Contact Date
              </Typography>
              <TextField fullWidth type="date" name="lastContactDate" value={formData.lastContactDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Next Follow-up Date
              </Typography>
              <TextField fullWidth type="date" name="nextFollowupDate" value={formData.nextFollowupDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Follow-up Mode
              </Typography>
              <TextField select fullWidth name="followupMode" value={formData.followupMode} onChange={handleChange} size="small">
                {FOLLOWUP_MODES.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.5, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Follow-up Notes
              </Typography>
              <TextField fullWidth multiline rows={2} name="followupNotes" placeholder="Enter follow-up conversation notes..." value={formData.followupNotes} onChange={handleChange} />
            </Grid>

            {/* Section 6: Customer Requirements */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                6. Customer Requirements
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="customerRequirements"
                placeholder="e.g. Customer wants a 5N/6D Goa package. Budget around ₹45,000. Needs beach-facing hotel. Flight required from Delhi."
                value={formData.customerRequirements}
                onChange={handleChange}
              />
            </Grid>

            {/* Section 7: Internal Notes */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                7. Internal Notes (Staff Only)
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                name="internalNotes"
                placeholder="e.g. Customer prefers evening calls. Price-sensitive. Interested in offers."
                value={formData.internalNotes}
                onChange={handleChange}
                sx={{ bgcolor: '#FFFBEB' }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
          <Button onClick={closeAddModal} variant="text" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'none', px: 2 }}>
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
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            + Save Complete Lead
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
