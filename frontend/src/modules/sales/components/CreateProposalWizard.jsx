import { useState, useEffect, useMemo } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  Switch,
  FormControlLabel,
  InputAdornment,
  Paper,
  Divider,
  Chip,
  RadioGroup,
  Radio,
  Alert,
} from '@mui/material';
import {
  MdClose,
  MdOutlineDescription,
  MdCheckCircle,
  MdPictureAsPdf,
  MdSend,
  MdSave,
  MdArrowBack,
  MdArrowForward,
  MdHotel,
  MdFlight,
  MdDirectionsCar,
  MdLocalActivity,
} from 'react-icons/md';
import { tokens } from '@styles/theme';
import { formatCurrency, formatDate } from '@utils/formatters';

const WIZARD_STEPS = [
  'Customer Info',
  'Trip Details',
  'Build Package',
  'Pricing',
  'Itinerary',
  'Proposal Options',
  'Review & Save',
];

// --- Dropdown Options Constants ---
export const EXECUTIVE_OPTIONS = [
  'Priya Sharma',
  'Arjun Nair',
  'Meera Pillai',
  'Karan Malhotra',
  'Rahul Jain',
  'Unassigned',
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

export const PACKAGE_TYPE_OPTIONS = [
  'Honeymoon',
  'Family',
  'Group',
  'Corporate',
  'Solo',
  'Friends',
];

export const TRAVEL_TYPE_OPTIONS = ['Domestic', 'International'];

export const HOTEL_NAME_OPTIONS = [
  'Grand Hyatt Resort & Spa (5★)',
  'Taj Lake Palace & Luxury Suites (5★)',
  'The Oberoi Beach Resort (5★)',
  'Marriott Suites & Villas (4★)',
  'Boutique Heritage Villa (4★)',
  'Radisson Blu Hotel (4★)',
  'Holiday Inn Express (3★)',
];

export const ROOM_TYPE_OPTIONS = [
  'Deluxe Ocean View Suite',
  'Executive Garden Villa',
  'Super Deluxe Room',
  'Standard Double Room',
  'Presidential Suite',
  'Overwater Bungalow',
  'Family Interconnecting Suite',
];

export const MEAL_PLAN_OPTIONS = [
  'Room Only (EP)',
  'Breakfast (CP)',
  'Half Board (MAP)',
  'Full Board (AP)',
  'All Inclusive',
];

export const TRANSPORT_MENU_OPTIONS = [
  'Bus / Shuttle from Airport',
  'Car',
  'Luxury Vehicle',
  'Van',
  'Local Taxi',
];

export const AIRLINE_OPTIONS = [
  'Singapore Airlines',
  'Emirates',
  'Air India',
  'IndiGo',
  'Qatar Airways',
  'Etihad Airways',
  'Vistara',
  'Thai Airways',
  'SriLankan Airlines',
];

export const CABIN_CLASS_OPTIONS = [
  'Economy',
  'Premium Economy',
  'Business',
  'First Class',
];

export const FLIGHT_TIMING_OPTIONS = [
  'Morning Departure (06:00 - 12:00)',
  'Afternoon Departure (12:00 - 18:00)',
  'Evening Departure (18:00 - 00:00)',
  'Red-eye / Overnight Flight',
  'Any Available Flight',
];

export const AIRPORT_TRANSFER_OPTIONS = [
  'Private AC SUV Transfer',
  'Private AC Sedan (Airport to Hotel)',
  'Shared Airport Shuttle Bus',
  'Luxury Limousine Transfer',
  'No Airport Transfer',
];

export const INTERCITY_TRANSFER_OPTIONS = [
  'Private Transfers Included',
  'Private AC Car Intercity Transfer',
  'Express Train Tickets Included',
  'Domestic Flight Connection',
  'No Intercity Transfer Required',
];

export default function CreateProposalWizard({ open, onClose, lead, onSaveProposal }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Initial State initialized from passed Lead
  const buildInitialData = (l) => {
    if (!l) return {};

    const rawDest = l.destination || (l.id === 'LD-1001' ? 'Bali, Indonesia' : 'Kerala, India');
    const destinationStr = Array.isArray(rawDest) ? rawDest.join(', ') : rawDest;
    const baseBudget = l.budget || 240000;

    return {
      // Step 1: Customer Info (Auto-filled)
      leadId: l.id || 'LD-1001',
      customerId: `CUST-${(l.id || '1001').replace(/[^0-9]/g, '')}`,
      customerName: l.name || '',
      mobileNumber: l.contactPhone || '',
      email: l.contactEmail || '',
      assignedExecutive: l.salesExecutive || 'Priya Sharma',

      // Step 2: Trip Details (Auto-filled)
      destination: destinationStr,
      departureCity: l.departureCity || 'Mumbai',
      departureDate: l.departureDate || '2026-08-15',
      returnDate: l.returnDate || '2026-08-22',
      durationNights: l.durationNights || 7,
      adults: l.adults !== undefined ? l.adults : 2,
      children: l.children !== undefined ? l.children : 0,
      infants: l.infants !== undefined ? l.infants : 0,
      packageType: l.packageType || 'Honeymoon',
      travelType: l.travelType || 'International',
      budget: baseBudget,
      specialRequirements: l.specialRequests || 'Morning flight preference & beachfront hotel stay.',

      // Step 3: Build Package
      hotelName: 'Grand Hyatt Resort & Spa (5★)',
      roomType: 'Deluxe Ocean View Suite',
      mealPlan: 'Half Board (Breakfast & Dinner)',
      numberOfRooms: 1,

      airline: 'Singapore Airlines',
      cabinClass: 'Economy',
      preferredTiming: 'Morning Departure (06:00 - 12:00)',

      airportTransfer: 'Private AC SUV Transfer',
      intercityTransfer: 'Private Transfers Included',
      transferType: 'Private',

      sightseeing: 'Full-day Private Island Tour & Sunset Cruise',
      adventureTours: 'Water Sports & Snorkeling Experience',
      cruise: 'Sunset Dinner Cruise',
      optionalTours: 'Spa & Wellness Package',

      visaRequired: true,
      insuranceIncluded: true,

      // Step 4: Pricing
      hotelCost: Math.round(baseBudget * 0.45),
      flightCost: Math.round(baseBudget * 0.3),
      transferCost: 15000,
      activityCost: 25000,
      visaCost: 6500,
      insuranceCost: 3500,
      taxes: Math.round(baseBudget * 0.05),
      serviceCharges: 5000,
      markup: 15000,
      discount: 5000,

      // Step 5: Itinerary
      itineraryOption: 'template', // 'template' | 'existing' | 'new'
      selectedTemplate: '7 Days / 6 Nights Luxury Beach & Cultural Escape',

      // Step 6: Proposal Options
      validUntil: '2026-08-15',
      proposalTemplate: 'Modern Elegant',
      currency: 'INR',
      termsAndConditions: 'Standard cancellation terms apply. 50% deposit required upon confirmation. Rates subject to availability.',
      internalRemarks: 'VIP Client - Expedite quote response.',
    };
  };

  const [formData, setFormData] = useState(() => buildInitialData(lead));

  useEffect(() => {
    if (lead && open) {
      setFormData(buildInitialData(lead));
      setActiveStep(0);
    }
  }, [lead, open]);

  // Grand Total Calculation
  const grandTotal = useMemo(() => {
    const hotel = Number(formData.hotelCost) || 0;
    const flight = Number(formData.flightCost) || 0;
    const transfer = Number(formData.transferCost) || 0;
    const activity = Number(formData.activityCost) || 0;
    const visa = formData.visaRequired ? Number(formData.visaCost) || 0 : 0;
    const insurance = formData.insuranceIncluded ? Number(formData.insuranceCost) || 0 : 0;
    const taxes = Number(formData.taxes) || 0;
    const service = Number(formData.serviceCharges) || 0;
    const markup = Number(formData.markup) || 0;
    const discount = Number(formData.discount) || 0;

    return Math.max(0, hotel + flight + transfer + activity + visa + insurance + taxes + service + markup - discount);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (activeStep < WIZARD_STEPS.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const generateProposalRecord = (status = 'Draft') => {
    const proposalId = `PR-${Math.floor(2600 + Math.random() * 900)}`;
    return {
      id: proposalId,
      customer: formData.customerName,
      destination: formData.destination,
      amount: grandTotal,
      status: status,
      version: 1,
      progress: status === 'Sent' ? 75 : 40,
      next: status === 'Sent' ? 'Awaiting customer review' : 'Complete itinerary & send proposal',
      executive: formData.assignedExecutive,
      versions: ['V1 · Initial proposal created'],
      travelDate: formData.departureDate,
      packageType: formData.packageType,
      leadId: formData.leadId,
      createdDate: new Date().toISOString(),
    };
  };

  const handleSaveDraft = () => {
    const newProposal = generateProposalRecord('Draft');
    if (onSaveProposal) {
      onSaveProposal(newProposal);
    }
    setToastMessage(`Proposal ${newProposal.id} saved as Draft!`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleSendProposal = () => {
    const newProposal = generateProposalRecord('Sent');
    if (onSaveProposal) {
      onSaveProposal(newProposal);
    }
    setToastMessage(`Proposal ${newProposal.id} sent successfully to ${formData.customerName}!`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  if (!lead) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2.5,
            minHeight: '85vh',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Wizard Header */}
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
                bgcolor: 'rgba(47,143,134,0.1)',
                color: tokens.color.teal500,
                display: 'flex',
              }}
            >
              <MdOutlineDescription size={24} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Create Proposal Wizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Auto-filled for {formData.customerName} ({formData.leadId})
              </Typography>
            </Box>
          </Stack>
          <IconButton aria-label="Close proposal wizard" onClick={onClose} size="small">
            <MdClose size={22} />
          </IconButton>
        </DialogTitle>

        {/* Stepper Navigation Bar */}
        <Box sx={{ px: 3, pt: 2, pb: 1, bgcolor: 'background.default', borderBottom: `1px solid ${tokens.color.line200}` }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {WIZARD_STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Toast Alert Feedback */}
        {toastMessage && (
          <Alert severity="success" variant="filled" sx={{ m: 2, mb: 0 }}>
            {toastMessage}
          </Alert>
        )}

        {/* Wizard Content Body */}
        <DialogContent dividers sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
          {/* STEP 1: Customer Information */}
          {activeStep === 0 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                Step 1: Customer Information (Auto-filled from Lead)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField label="Lead ID" value={formData.leadId} disabled fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField label="Customer ID" value={formData.customerId} disabled fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Customer Name"
                    value={formData.customerName}
                    onChange={(e) => handleChange('customerName', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(e) => handleChange('mobileNumber', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    select
                    label="Assigned Sales Executive"
                    value={formData.assignedExecutive || ''}
                    onChange={(e) => handleChange('assignedExecutive', e.target.value)}
                    fullWidth
                  >
                    {EXECUTIVE_OPTIONS.map((exec) => (
                      <MenuItem key={exec} value={exec}>
                        {exec}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* STEP 2: Trip Details */}
          {activeStep === 1 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                Step 2: Trip Details (Auto-filled from Lead)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Destination"
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Departure City"
                    value={formData.departureCity || ''}
                    onChange={(e) => handleChange('departureCity', e.target.value)}
                    fullWidth
                  >
                    {DEPARTURE_CITY_OPTIONS.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Departure Date"
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Return Date"
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleChange('returnDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Duration (Nights)"
                    type="number"
                    value={formData.durationNights}
                    onChange={(e) => handleChange('durationNights', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    select
                    label="Package Type"
                    value={formData.packageType || ''}
                    onChange={(e) => handleChange('packageType', e.target.value)}
                    fullWidth
                  >
                    {PACKAGE_TYPE_OPTIONS.map((pkg) => (
                      <MenuItem key={pkg} value={pkg}>
                        {pkg}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Adults"
                    type="number"
                    value={formData.adults}
                    onChange={(e) => handleChange('adults', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Children"
                    type="number"
                    value={formData.children}
                    onChange={(e) => handleChange('children', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Infants"
                    type="number"
                    value={formData.infants}
                    onChange={(e) => handleChange('infants', e.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Estimated Budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Travel Type"
                    value={formData.travelType || ''}
                    onChange={(e) => handleChange('travelType', e.target.value)}
                    fullWidth
                  >
                    {TRAVEL_TYPE_OPTIONS.map((tt) => (
                      <MenuItem key={tt} value={tt}>
                        {tt}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Special Requirements"
                    multiline
                    minRows={2}
                    value={formData.specialRequirements}
                    onChange={(e) => handleChange('specialRequirements', e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* STEP 3: Build Package */}
          {activeStep === 2 && (
            <Stack spacing={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                Step 3: Build Package Components
              </Typography>

              {/* Hotels */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <MdHotel color={tokens.color.navy900} size={20} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Hotel Accommodation
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Hotel Name"
                      value={formData.hotelName || ''}
                      onChange={(e) => handleChange('hotelName', e.target.value)}
                      fullWidth
                    >
                      {HOTEL_NAME_OPTIONS.map((hotel) => (
                        <MenuItem key={hotel} value={hotel}>
                          {hotel}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Room Type"
                      value={formData.roomType || ''}
                      onChange={(e) => handleChange('roomType', e.target.value)}
                      fullWidth
                    >
                      {ROOM_TYPE_OPTIONS.map((room) => (
                        <MenuItem key={room} value={room}>
                          {room}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Meal Plan"
                      value={formData.mealPlan || ''}
                      onChange={(e) => handleChange('mealPlan', e.target.value)}
                      fullWidth
                    >
                      {MEAL_PLAN_OPTIONS.map((mp) => (
                        <MenuItem key={mp} value={mp}>
                          {mp}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Number of Rooms"
                      type="number"
                      value={formData.numberOfRooms}
                      onChange={(e) => handleChange('numberOfRooms', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Flights */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <MdFlight color={tokens.color.navy900} size={20} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Flight Selection
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Airline"
                      value={formData.airline || ''}
                      onChange={(e) => handleChange('airline', e.target.value)}
                      fullWidth
                    >
                      {AIRLINE_OPTIONS.map((al) => (
                        <MenuItem key={al} value={al}>
                          {al}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Cabin Class"
                      value={formData.cabinClass || ''}
                      onChange={(e) => handleChange('cabinClass', e.target.value)}
                      fullWidth
                    >
                      {CABIN_CLASS_OPTIONS.map((cc) => (
                        <MenuItem key={cc} value={cc}>
                          {cc}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Preferred Timing"
                      value={formData.preferredTiming || ''}
                      onChange={(e) => handleChange('preferredTiming', e.target.value)}
                      fullWidth
                    >
                      {FLIGHT_TIMING_OPTIONS.map((ft) => (
                        <MenuItem key={ft} value={ft}>
                          {ft}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>

              {/* Transfers */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <MdDirectionsCar color={tokens.color.navy900} size={20} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Transfers & Logistics
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Transport Menu"
                      value={formData.transportMenu || ''}
                      onChange={(e) => handleChange('transportMenu', e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>Select Transport ▼</em>
                      </MenuItem>
                      {TRANSPORT_MENU_OPTIONS.map((tm) => (
                        <MenuItem key={tm} value={tm}>
                          {tm}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Airport Transfer"
                      value={formData.airportTransfer || ''}
                      onChange={(e) => handleChange('airportTransfer', e.target.value)}
                      fullWidth
                    >
                      {AIRPORT_TRANSFER_OPTIONS.map((at) => (
                        <MenuItem key={at} value={at}>
                          {at}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Intercity Transfer"
                      value={formData.intercityTransfer || ''}
                      onChange={(e) => handleChange('intercityTransfer', e.target.value)}
                      fullWidth
                    >
                      {INTERCITY_TRANSFER_OPTIONS.map((ict) => (
                        <MenuItem key={ict} value={ict}>
                          {ict}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>

              {/* Activities & Extras */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <MdLocalActivity color={tokens.color.navy900} size={20} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Activities, Visa & Travel Extras
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Sightseeing & Excursions"
                      value={formData.sightseeing}
                      onChange={(e) => handleChange('sightseeing', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Adventure / Optional Tours"
                      value={formData.adventureTours}
                      onChange={(e) => handleChange('adventureTours', e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper
                      variant="outlined"
                      sx={{ px: 2, height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Visa Processing Included
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={Boolean(formData.visaRequired)}
                            onChange={(e) => handleChange('visaRequired', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={formData.visaRequired ? 'Yes' : 'No'}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      variant="outlined"
                      sx={{ px: 2, height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Travel Insurance Included
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={Boolean(formData.insuranceIncluded)}
                            onChange={(e) => handleChange('insuranceIncluded', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={formData.insuranceIncluded ? 'Yes' : 'No'}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          )}

          {/* STEP 4: Pricing */}
          {activeStep === 3 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                Step 4: Itemized Pricing & Grand Total Breakdown
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Hotel Cost"
                    type="number"
                    value={formData.hotelCost}
                    onChange={(e) => handleChange('hotelCost', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Flight Cost"
                    type="number"
                    value={formData.flightCost}
                    onChange={(e) => handleChange('flightCost', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Transfer Cost"
                    type="number"
                    value={formData.transferCost}
                    onChange={(e) => handleChange('transferCost', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Activity Cost"
                    type="number"
                    value={formData.activityCost}
                    onChange={(e) => handleChange('activityCost', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Visa Cost"
                    type="number"
                    value={formData.visaCost}
                    disabled={!formData.visaRequired}
                    onChange={(e) => handleChange('visaCost', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Insurance Cost"
                    type="number"
                    value={formData.insuranceCost}
                    disabled={!formData.insuranceIncluded}
                    onChange={(e) => handleChange('insuranceCost', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Taxes (GST/TCS)"
                    type="number"
                    value={formData.taxes}
                    onChange={(e) => handleChange('taxes', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Service Charges"
                    type="number"
                    value={formData.serviceCharges}
                    onChange={(e) => handleChange('serviceCharges', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Markup Amount"
                    type="number"
                    value={formData.markup}
                    onChange={(e) => handleChange('markup', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => handleChange('discount', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    fullWidth
                  />
                </Grid>

                {/* Grand Total Auto-Calculated Summary Card */}
                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2.5,
                      borderRadius: 2.5,
                      bgcolor: 'rgba(27,42,74,0.04)',
                      borderColor: tokens.color.navy700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Calculated Grand Total
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Sum of all package inclusions + taxes - discounts
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.color.navy900 }}>
                      {formatCurrency(grandTotal)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* STEP 5: Itinerary */}
          {activeStep === 4 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                Step 5: Link or Build Itinerary
              </Typography>
              <RadioGroup
                value={formData.itineraryOption}
                onChange={(e) => handleChange('itineraryOption', e.target.value)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        borderColor: formData.itineraryOption === 'template' ? tokens.color.navy700 : 'divider',
                      }}
                    >
                      <FormControlLabel value="template" control={<Radio />} label="Generate from Template" />
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
                        Use proven destination templates with day-by-day activities.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        borderColor: formData.itineraryOption === 'existing' ? tokens.color.navy700 : 'divider',
                      }}
                    >
                      <FormControlLabel value="existing" control={<Radio />} label="Select Existing Itinerary" />
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
                        Link an existing itinerary created for this customer.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        borderColor: formData.itineraryOption === 'new' ? tokens.color.navy700 : 'divider',
                      }}
                    >
                      <FormControlLabel value="new" control={<Radio />} label="Create Custom Itinerary" />
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
                        Build a completely customized day-by-day plan.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </RadioGroup>

              {formData.itineraryOption === 'template' && (
                <TextField
                  select
                  label="Select Itinerary Template"
                  value={formData.selectedTemplate}
                  onChange={(e) => handleChange('selectedTemplate', e.target.value)}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  {[
                    '7 Days / 6 Nights Luxury Beach & Cultural Escape',
                    '5 Days / 4 Nights Island Hopping & Water Sports',
                    '10 Days Grand Europe Capitals & Alpines',
                    '6 Days Scenic Kerala Houseboat & Tea Gardens',
                  ].map((tpl) => (
                    <MenuItem key={tpl} value={tpl}>
                      {tpl}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Stack>
          )}

          {/* STEP 6: Proposal Options */}
          {activeStep === 5 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                Step 6: Proposal Terms & Options
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Proposal Valid Until"
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => handleChange('validUntil', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    select
                    label="Proposal Template Theme"
                    value={formData.proposalTemplate}
                    onChange={(e) => handleChange('proposalTemplate', e.target.value)}
                    fullWidth
                  >
                    {['Modern Elegant', 'Luxury Travel', 'Minimalist Clean', 'Corporate Standard'].map((theme) => (
                      <MenuItem key={theme} value={theme}>
                        {theme}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    select
                    label="Currency"
                    value={formData.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    fullWidth
                  >
                    {['INR', 'USD', 'EUR', 'AED'].map((cur) => (
                      <MenuItem key={cur} value={cur}>
                        {cur}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Terms & Conditions"
                    multiline
                    minRows={3}
                    value={formData.termsAndConditions}
                    onChange={(e) => handleChange('termsAndConditions', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Internal Remarks & Notes"
                    multiline
                    minRows={2}
                    value={formData.internalRemarks}
                    onChange={(e) => handleChange('internalRemarks', e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* STEP 7: Review & Save */}
          {activeStep === 6 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                Step 7: Final Review & Proposal Summary
              </Typography>
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2.5, bgcolor: 'background.default' }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                        {formData.customerName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formData.leadId} · {formData.destination} · Exec: {formData.assignedExecutive}
                      </Typography>
                    </Box>
                    <Chip label="Version V1 · Draft" color="primary" sx={{ fontWeight: 700 }} />
                  </Stack>

                  <Divider />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="caption" color="text.secondary">
                        Travel Dates
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatDate(formData.departureDate)} – {formatDate(formData.returnDate)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="caption" color="text.secondary">
                        Duration & PAX
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formData.durationNights} Nights · {formData.adults} Adults, {formData.children} Children
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="caption" color="text.secondary">
                        Hotel Accommodation
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formData.hotelName} ({formData.roomType})
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="caption" color="text.secondary">
                        Grand Total Quote
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.color.navy900 }}>
                        {formatCurrency(grandTotal)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Paper>

              <Alert severity="info" icon={<MdCheckCircle size={20} />}>
                All customer and trip details are verified. Choose an action below to save draft, generate PDF, or send proposal directly to customer.
              </Alert>
            </Stack>
          )}
        </DialogContent>

        {/* Wizard Footer Buttons */}
        <DialogActions
          sx={{
            p: 2.5,
            borderTop: `1px solid ${tokens.color.line200}`,
            justifyContent: 'space-between',
          }}
        >
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>

          <Stack direction="row" spacing={1.5}>
            {activeStep > 0 && (
              <Button variant="outlined" startIcon={<MdArrowBack />} onClick={handleBack}>
                Back
              </Button>
            )}

            {activeStep < WIZARD_STEPS.length - 1 ? (
              <Button variant="contained" endIcon={<MdArrowForward />} onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <>
                <Button variant="outlined" startIcon={<MdSave />} onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                <Button variant="outlined" startIcon={<MdOutlineDescription />} onClick={() => setIsPreviewOpen(true)}>
                  Preview Proposal
                </Button>
                <Button variant="contained" color="success" startIcon={<MdSend />} onClick={handleSendProposal}>
                  Send Proposal
                </Button>
              </>
            )}
          </Stack>
        </DialogActions>
      </Dialog>

      {/* Proposal Preview Modal */}
      <Dialog open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2.5, borderBottom: `1px solid ${tokens.color.line200}` }}>
          Proposal Preview · {formData.customerName}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: tokens.color.navy900, mb: 0.5 }}>
              Voyage Travel Proposal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prepared for {formData.customerName} by {formData.assignedExecutive}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Destination</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>{formData.destination}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Proposal Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.color.teal500 }}>
                  {formatCurrency(grandTotal)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1 }}>Inclusions Summary</Typography>
                <Typography variant="body2" color="text.secondary">
                  • Hotel: {formData.hotelName} ({formData.roomType})<br />
                  • Flights: {formData.airline} ({formData.cabinClass})<br />
                  • Transfers: {formData.airportTransfer}<br />
                  • Activities: {formData.sightseeing}<br />
                  • Visa & Insurance: {formData.visaRequired ? 'Visa Included' : 'No Visa'}, {formData.insuranceIncluded ? 'Insurance Included' : 'No Insurance'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setIsPreviewOpen(false)}>Close Preview</Button>
          <Button variant="contained" startIcon={<MdPictureAsPdf />}>Download PDF</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
