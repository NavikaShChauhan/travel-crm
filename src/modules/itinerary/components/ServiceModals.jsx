import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Stack,
  IconButton,
  Paper,
  Divider
} from '@mui/material';
import { MdClose } from 'react-icons/md';

// Static lists for dropdown selections to enhance the UX
const STAR_CATEGORIES = ['3 Star', '4 Star', '5 Star', 'Luxury'];
const ROOM_TYPES = ['Single', 'Double', 'Triple', 'Quad', 'Suite', 'Villa'];
const MEAL_PLANS = [
  { value: 'EP', label: 'EP - Room Only' },
  { value: 'CP', label: 'CP - Room & Breakfast' },
  { value: 'MAP', label: 'MAP - Room, Breakfast & Dinner' },
  { value: 'AP', label: 'AP - All Meals Included' }
];
const CABIN_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First'];
const VEHICLE_TYPES = ['Sedan', 'SUV', 'Van', 'Mini Bus', 'Luxury Coach'];

// PRESET MOCK DATABASES FOR DROPDOWN AUTO-FILLS
const PRESET_HOTELS = [
  { title: 'Shimla Luxury Resort & Spa', location: 'Shimla', bedOption: 'Double Bed', bedCount: 1, costPerBedNight: 8000, roomType: 'Double', mealPlan: 'CP' },
  { title: 'Alpine Chalet Manali', location: 'Manali', bedOption: 'Double Bed', bedCount: 1, costPerBedNight: 5000, roomType: 'Double', mealPlan: 'MAP' },
  { title: 'Centara Ras Fushi Resort & Spa', location: 'Maldives', bedOption: 'Double Bed', bedCount: 1, costPerBedNight: 25000, roomType: 'Suite', mealPlan: 'AP' },
  { title: 'Grand Mirage Resort & Thalasso Bali', location: 'Bali', bedOption: 'Double Bed', bedCount: 1, costPerBedNight: 12500, roomType: 'Villa', mealPlan: 'CP' },
  { title: 'The Victoria Interlaken', location: 'Interlaken, Switzerland', bedOption: 'Double Bed', bedCount: 1, costPerBedNight: 35000, roomType: 'Suite', mealPlan: 'EP' },
  { title: 'The Lalit Grand Palace', location: 'Srinagar', bedOption: 'Double Bed', bedCount: 1, costPerBedNight: 9000, roomType: 'Double', mealPlan: 'MAP' },
  { title: 'The Khyber Himalayan Resort & Spa', location: 'Gulmarg', bedOption: 'Double Bed', bedCount: 1, costPerBedNight: 12000, roomType: 'Double', mealPlan: 'CP' },
];

const PRESET_FLIGHTS = [
  { title: 'DEL to IXC - AllianceAir', fromPort: 'Delhi (DEL)', toPort: 'Chandigarh (IXC)', cabinClass: 'Economy', adultCost: 2300, childCost: 1800, infantCost: 900 },
  { title: 'BOM to DXB - Emirates', fromPort: 'BOM (Mumbai)', toPort: 'DXB (Dubai)', cabinClass: 'Economy', adultCost: 15000, childCost: 12000, infantCost: 4000 },
  { title: 'DEL to DPS - Air India', fromPort: 'DEL (Delhi)', toPort: 'DPS (Bali)', cabinClass: 'Economy', adultCost: 22000, childCost: 17000, infantCost: 5000 },
  { title: 'BOM to MLE - IndiGo', fromPort: 'BOM (Mumbai)', toPort: 'MLE (Maldives)', cabinClass: 'Economy', adultCost: 11000, childCost: 9000, infantCost: 3000 },
  { title: 'BLR to SIN - Singapore Airlines', fromPort: 'BLR (Bangalore)', toPort: 'SIN (Singapore)', cabinClass: 'Economy', adultCost: 18000, childCost: 14000, infantCost: 4000 }
];

const PRESET_TRANSPORTS = [
  { title: 'Airport Private SUV Transfer', vehicleType: 'SUV', days: 1, dailyRate: 3500, pickupTime: '10:00', dropTime: '13:00' },
  { title: 'Manali Local Sightseeing Cab', vehicleType: 'SUV', days: 3, dailyRate: 4000, pickupTime: '09:00', dropTime: '18:00' },
  { title: 'Kashmir Tour Private Sedan', vehicleType: 'Sedan', days: 5, dailyRate: 2800, pickupTime: '09:00', dropTime: '17:00' },
  { title: 'Private Speedboat Airport Transfer', vehicleType: 'Van', days: 1, dailyRate: 15000, pickupTime: '14:30', dropTime: '15:15' }
];

const PRESET_SIGHTSEEING = [
  { title: 'Solang Valley Adventure Passes', location: 'Manali', adultCost: 2600, childCost: 1800, description: 'Includes ropeway ride and paragliding coupons.' },
  { title: 'Ubud Private Guided Day Tour', location: 'Bali, Indonesia', adultCost: 1500, childCost: 1000, description: 'Tegenungan Waterfall, Sacred Monkey Forest Sanctuary, Ubud Palace, and Traditional Art Market.' },
  { title: 'Gulmarg Gondola Ride Phase 1 & 2', location: 'Gulmarg', adultCost: 2000, childCost: 2000, description: 'Excursion cable car ride to high mountain ridges.' },
  { title: 'Sunset Catamaran Cruise', location: 'Maldives', adultCost: 5000, childCost: 3000, description: '2-hour sunset cruise with drinks and snacks.' }
];

export default function ServiceModal({ open, onClose, onSave, type, initialData, travelers }) {
  const [formData, setFormData] = useState({});

  // Initialize form state when type or initialData changes
  useEffect(() => {
    if (open) {
      if (initialData) {
        const seeded = { ...initialData };
        if (type === 'Hotel') {
          if (!seeded.bedOption && seeded.rooms) {
            const firstActiveRoom = Object.keys(seeded.rooms).find(k => seeded.rooms[k].count > 0);
            if (firstActiveRoom) {
              seeded.bedOption = firstActiveRoom + ' Bed';
              seeded.bedCount = seeded.rooms[firstActiveRoom].count;
              seeded.costPerBedNight = seeded.rooms[firstActiveRoom].costPerNight;
            } else {
              seeded.bedOption = 'Double Bed';
              seeded.bedCount = 1;
              seeded.costPerBedNight = 0;
            }
          }
        }
        setFormData(seeded);
      } else {
        // Seed default values based on service type
        const defaultState = {
          type,
          title: '',
          description: '',
          totalCost: 0
        };

        if (type === 'Hotel') {
          defaultState.packageOption = '4 Star';
          defaultState.location = '';
          defaultState.starCategory = '4 Star';
          defaultState.roomType = 'Double';
          defaultState.mealPlan = 'CP';
          defaultState.nights = 1;
          defaultState.bedOption = 'Double Bed';
          defaultState.bedCount = 1;
          defaultState.costPerBedNight = 0;
        } else if (type === 'Flight') {
          defaultState.fromPort = '';
          defaultState.toPort = '';
          defaultState.cabinClass = 'Economy';
          defaultState.departureDate = '';
          defaultState.arrivalDate = '';
          defaultState.returnDate = '';
          defaultState.adultCost = 0;
          defaultState.childCost = 0;
          defaultState.infantCost = 0;
        } else if (type === 'Cruise') {
          defaultState.fromPort = '';
          defaultState.toPort = '';
          defaultState.day = 'Day 1';
          defaultState.returnDay = 'Day 2';
          defaultState.cabinShip = '';
          defaultState.adultCost = 0;
        } else if (type === 'Transport') {
          defaultState.vehicleType = 'SUV';
          defaultState.days = 1;
          defaultState.dailyRate = 0;
          defaultState.pickupTime = '';
          defaultState.dropTime = '';
        } else if (type === 'Sightseeing' || type === 'Activity') {
          defaultState.location = '';
          defaultState.adultCost = 0;
          defaultState.childCost = 0;
        } else if (['Ferry', 'Bus', 'Train'].includes(type)) {
          defaultState.fromPort = '';
          defaultState.toPort = '';
          defaultState.cabinShip = ''; // Used as Route details
          defaultState.adultCost = 0;
          defaultState.departureTime = '';
          defaultState.arrivalTime = '';
        }

        setFormData(defaultState);
      }
    }
  }, [open, type, initialData]);

  // Dynamic calculations based on form value edits
  useEffect(() => {
    if (!open) return;

    let total = 0;
    let calcDuration = '';

    if (type === 'Hotel' && formData.nights) {
      const nights = parseInt(formData.nights || 0, 10);
      const bedCount = parseInt(formData.bedCount || 0, 10);
      const costPerBedNight = parseFloat(formData.costPerBedNight || 0);
      total = bedCount * costPerBedNight * nights;
    } else if (type === 'Flight') {
      const adults = parseInt(travelers?.adults || 1, 10);
      const children = parseInt(travelers?.children || 0, 10);
      const infants = parseInt(travelers?.infants || 0, 10);
      total = 
        adults * parseFloat(formData.adultCost || 0) +
        children * parseFloat(formData.childCost || 0) +
        infants * parseFloat(formData.infantCost || 0);

      if (formData.departureDate && formData.arrivalDate) {
        const diff = new Date(formData.arrivalDate) - new Date(formData.departureDate);
        if (!isNaN(diff) && diff > 0) {
          const mins = Math.floor(diff / 60000);
          const hrs = Math.floor(mins / 60);
          const remMins = mins % 60;
          calcDuration = `${hrs}h ${remMins}m`;
        }
      }
    } else if (type === 'Cruise') {
      const passengers = parseInt(travelers?.total || 1, 10);
      total = passengers * parseFloat(formData.adultCost || 0);
    } else if (type === 'Transport') {
      const days = parseInt(formData.days || 0, 10);
      const rate = parseFloat(formData.dailyRate || 0);
      total = days * rate;

      if (formData.pickupTime && formData.dropTime) {
        const [sH, sM] = formData.pickupTime.split(':').map(Number);
        const [eH, eM] = formData.dropTime.split(':').map(Number);
        let diff = (eH * 60 + eM) - (sH * 60 + sM);
        if (diff < 0) diff += 24 * 60;
        const hrs = Math.floor(diff / 60);
        const remMins = diff % 60;
        calcDuration = `${hrs}h ${remMins}m`;
      }
    } else if (type === 'Sightseeing' || type === 'Activity') {
      const adults = parseInt(travelers?.adults || 1, 10);
      const children = parseInt(travelers?.children || 0, 10);
      total = 
        adults * parseFloat(formData.adultCost || 0) +
        children * parseFloat(formData.childCost || 0);
    } else if (['Ferry', 'Bus', 'Train'].includes(type)) {
      const passengers = parseInt(travelers?.total || 1, 10);
      total = passengers * parseFloat(formData.adultCost || 0);

      if (formData.departureTime && formData.arrivalTime) {
        const [sH, sM] = formData.departureTime.split(':').map(Number);
        const [eH, eM] = formData.arrivalTime.split(':').map(Number);
        let diff = (eH * 60 + eM) - (sH * 60 + sM);
        if (diff < 0) diff += 24 * 60;
        const hrs = Math.floor(diff / 60);
        const remMins = diff % 60;
        calcDuration = `${hrs}h ${remMins}m`;
      }
    } else if (type === 'Complementary') {
      total = parseFloat(formData.totalCost || 0);
    }

    setFormData((prev) => {
      if (prev.totalCost === total && prev.durationText === calcDuration) return prev;
      return { ...prev, totalCost: total, durationText: calcDuration };
    });
  }, [
    formData.bedCount,
    formData.costPerBedNight,
    formData.nights,
    formData.adultCost,
    formData.childCost,
    formData.infantCost,
    formData.days,
    formData.dailyRate,
    formData.departureDate,
    formData.arrivalDate,
    formData.pickupTime,
    formData.dropTime,
    formData.departureTime,
    formData.arrivalTime,
    travelers,
    type,
    open
  ]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  const handleSave = () => {
    // Generate an ID if new
    const finalData = {
      ...formData,
      id: formData.id || `srv-${Date.now()}`
    };
    onSave(finalData);
    onClose();
  };

  const renderTemplatePrefiller = () => {
    let presets = [];
    if (type === 'Hotel') presets = PRESET_HOTELS;
    else if (type === 'Flight') presets = PRESET_FLIGHTS;
    else if (type === 'Transport') presets = PRESET_TRANSPORTS;
    else if (type === 'Sightseeing' || type === 'Activity') presets = PRESET_SIGHTSEEING;

    if (presets.length === 0) return null;

    const handlePrefill = (index) => {
      if (index === '') return;
      const selected = presets[index];
      setFormData((prev) => ({
        ...prev,
        ...selected,
        title: selected.title
      }));
    };

    return (
      <Box sx={{ mb: 3, p: 2, border: '1px dashed #B2DFDB', borderRadius: 2, bgcolor: '#E0F2F1' }}>
        <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#00796B' }}>
          ✨ Quick Prefill Details from Dropdown:
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Choose from template...</InputLabel>
          <Select
            value=""
            label="Choose from template..."
            onChange={(e) => handlePrefill(e.target.value)}
          >
            <MenuItem value="">-- Select a preset --</MenuItem>
            {presets.map((p, idx) => (
              <MenuItem key={idx} value={idx}>{p.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const renderHotelForm = () => {
    return (
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Hotel Name / Item Title"
            fullWidth
            required
            value={formData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g. Taj Exotica Resort & Spa"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            fullWidth
            value={formData.location || ''}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="e.g. Maldives"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Meal Plan</InputLabel>
            <Select
              value={formData.mealPlan || ''}
              label="Meal Plan"
              onChange={(e) => handleFieldChange('mealPlan', e.target.value)}
            >
              {MEAL_PLANS.map((plan) => (
                <MenuItem key={plan.value} value={plan.value}>{plan.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Bed Option (Bed Occupation)</InputLabel>
            <Select
              value={formData.bedOption || 'Double Bed'}
              label="Bed Option (Bed Occupation)"
              onChange={(e) => handleFieldChange('bedOption', e.target.value)}
            >
              {['Single Bed', 'Double Bed', 'Triple Bed', 'Extra Bed'].map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Bed/Room Count"
            type="number"
            fullWidth
            required
            value={formData.bedCount ?? 1}
            onChange={(e) => handleFieldChange('bedCount', Math.max(0, parseInt(e.target.value || 0, 10)))}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Nights"
            type="number"
            fullWidth
            required
            value={formData.nights || 1}
            onChange={(e) => handleFieldChange('nights', Math.max(1, parseInt(e.target.value || 0, 10)))}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Cost per Bed/Night (INR)"
            type="number"
            fullWidth
            required
            value={formData.costPerBedNight ?? 0}
            onChange={(e) => handleFieldChange('costPerBedNight', Math.max(0, parseFloat(e.target.value || 0)))}
          />
        </Grid>
      </Grid>
    );
  };

  const renderFlightForm = () => {
    return (
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Flight Number / Details"
            fullWidth
            required
            value={formData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g. EK-501 (Mumbai to Dubai)"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="From Port"
            fullWidth
            value={formData.fromPort || ''}
            onChange={(e) => handleFieldChange('fromPort', e.target.value)}
            placeholder="e.g. BOM (Mumbai)"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="To Port"
            fullWidth
            value={formData.toPort || ''}
            onChange={(e) => handleFieldChange('toPort', e.target.value)}
            placeholder="e.g. DXB (Dubai)"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Departure Date / Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.departureDate || ''}
            onChange={(e) => handleFieldChange('departureDate', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Arrival Date / Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.arrivalDate || ''}
            onChange={(e) => handleFieldChange('arrivalDate', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Return Date / Time (Optional)"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.returnDate || ''}
            onChange={(e) => handleFieldChange('returnDate', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel>Cabin Class</InputLabel>
            <Select
              value={formData.cabinClass || ''}
              label="Cabin Class"
              onChange={(e) => handleFieldChange('cabinClass', e.target.value)}
            >
              {CABIN_CLASSES.map((cls) => (
                <MenuItem key={cls} value={cls}>{cls}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
              Flight Rates & Passenger Counts
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Adult Cost (x ${travelers?.adults || 1})`}
                  type="number"
                  fullWidth
                  value={formData.adultCost || ''}
                  onChange={(e) => handleFieldChange('adultCost', Math.max(0, parseFloat(e.target.value || 0)))}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Child Cost (x ${travelers?.children || 0})`}
                  type="number"
                  fullWidth
                  value={formData.childCost || ''}
                  onChange={(e) => handleFieldChange('childCost', Math.max(0, parseFloat(e.target.value || 0)))}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Infant Cost (x ${travelers?.infants || 0})`}
                  type="number"
                  fullWidth
                  value={formData.infantCost || ''}
                  onChange={(e) => handleFieldChange('infantCost', Math.max(0, parseFloat(e.target.value || 0)))}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  const renderCruiseForm = () => {
    return (
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Cruise Name / Item Title"
            fullWidth
            required
            value={formData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g. Symphony of the Seas 3-Night Cruise"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="From Port"
            fullWidth
            value={formData.fromPort || ''}
            onChange={(e) => handleFieldChange('fromPort', e.target.value)}
            placeholder="e.g. Singapore Port"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="To Port"
            fullWidth
            value={formData.toPort || ''}
            onChange={(e) => handleFieldChange('toPort', e.target.value)}
            placeholder="e.g. Phuket, Thailand"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Departure Day / Date"
            fullWidth
            value={formData.day || ''}
            onChange={(e) => handleFieldChange('day', e.target.value)}
            placeholder="e.g. Day 3 or 2026-08-17"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Return Day / Date"
            fullWidth
            value={formData.returnDay || ''}
            onChange={(e) => handleFieldChange('returnDay', e.target.value)}
            placeholder="e.g. Day 6 or 2026-08-20"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cabin Type / Ship Name"
            fullWidth
            value={formData.cabinShip || ''}
            onChange={(e) => handleFieldChange('cabinShip', e.target.value)}
            placeholder="e.g. Balcony Oceanview Suite"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={`Cost per Person (x ${travelers?.total || 1} travelers)`}
            type="number"
            fullWidth
            value={formData.adultCost || ''}
            onChange={(e) => handleFieldChange('adultCost', Math.max(0, parseFloat(e.target.value || 0)))}
          />
        </Grid>
      </Grid>
    );
  };

  const renderTransportForm = () => {
    return (
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Service Title"
            fullWidth
            required
            value={formData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g. Airport Private SUV Drop"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              value={formData.vehicleType || ''}
              label="Vehicle Type"
              onChange={(e) => handleFieldChange('vehicleType', e.target.value)}
            >
              {VEHICLE_TYPES.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Days / Rides"
            type="number"
            fullWidth
            value={formData.days || ''}
            onChange={(e) => handleFieldChange('days', Math.max(1, parseInt(e.target.value || 0, 10)))}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Rate per Day / Ride"
            type="number"
            fullWidth
            value={formData.dailyRate || ''}
            onChange={(e) => handleFieldChange('dailyRate', Math.max(0, parseFloat(e.target.value || 0)))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Pickup Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.pickupTime || ''}
            onChange={(e) => handleFieldChange('pickupTime', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Drop Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dropTime || ''}
            onChange={(e) => handleFieldChange('dropTime', e.target.value)}
          />
        </Grid>
      </Grid>
    );
  };

  const renderGenericServiceForm = () => {
    const isSightseeing = type === 'Sightseeing' || type === 'Activity';
    return (
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Service / Excursion Title"
            fullWidth
            required
            value={formData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder={isSightseeing ? 'e.g. Ubud Private Guided Day Tour' : 'e.g. Express Train Ticket'}
          />
        </Grid>
        {isSightseeing ? (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location / Attraction"
                fullWidth
                value={formData.location || ''}
                onChange={(e) => handleFieldChange('location', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label={`Adult Rate (x ${travelers?.adults || 1})`}
                type="number"
                fullWidth
                value={formData.adultCost || ''}
                onChange={(e) => handleFieldChange('adultCost', Math.max(0, parseFloat(e.target.value || 0)))}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label={`Child Rate (x ${travelers?.children || 0})`}
                type="number"
                fullWidth
                value={formData.childCost || ''}
                onChange={(e) => handleFieldChange('childCost', Math.max(0, parseFloat(e.target.value || 0)))}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Route / Station Details"
                fullWidth
                value={formData.cabinShip || ''}
                onChange={(e) => handleFieldChange('cabinShip', e.target.value)}
                placeholder="e.g. Athens to Santorini"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Seat Class / Details"
                fullWidth
                value={formData.fromPort || ''}
                onChange={(e) => handleFieldChange('fromPort', e.target.value)}
                placeholder="e.g. VIP Lounge Seat / Second Class"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Departure Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.departureTime || ''}
                onChange={(e) => handleFieldChange('departureTime', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Arrival Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.arrivalTime || ''}
                onChange={(e) => handleFieldChange('arrivalTime', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label={`Cost per Person (x ${travelers?.total || 1})`}
                type="number"
                fullWidth
                value={formData.adultCost || ''}
                onChange={(e) => handleFieldChange('adultCost', Math.max(0, parseFloat(e.target.value || 0)))}
              />
            </Grid>
          </>
        )}
      </Grid>
    );
  };

  const renderComplementaryForm = () => {
    return (
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            label="Service Title"
            fullWidth
            required
            value={formData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g. Welcome Drinks & Special Cake on arrival"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Estimated Value / Cost (Selling)"
            type="number"
            fullWidth
            value={formData.totalCost || 0}
            onChange={(e) => handleFieldChange('totalCost', Math.max(0, parseFloat(e.target.value || 0)))}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {initialData ? 'Edit' : 'Add'} {type} Service
        </Typography>
        <IconButton onClick={onClose} size="small">
          <MdClose />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ py: 1 }}>
          {renderTemplatePrefiller()}

          {type === 'Hotel' && renderHotelForm()}
          {type === 'Flight' && renderFlightForm()}
          {type === 'Cruise' && renderCruiseForm()}
          {type === 'Transport' && renderTransportForm()}
          {['Sightseeing', 'Activity'].includes(type) && renderGenericServiceForm()}
          {['Ferry', 'Bus', 'Train'].includes(type) && renderGenericServiceForm()}
          {type === 'Complementary' && renderComplementaryForm()}

          {/* Standard bottom area for costs, descriptions */}
          {type !== 'Complementary' && (
            <Grid container spacing={2.5} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#E8F5E9', border: '1px solid #C8E6C9' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                    Calculated Selling Cost: ₹{(formData.totalCost || 0).toLocaleString()}
                    {formData.durationText && (
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569', marginLeft: '12px' }}>
                        (Calculated Duration: {formData.durationText})
                      </span>
                    )}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description / Quotation Details"
                  multiline
                  rows={3}
                  fullWidth
                  value={formData.description || ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Enter specific notes, inclusions, or fine print details here..."
                />
              </Grid>
            </Grid>
          )}

          {type === 'Complementary' && (
            <Grid container spacing={2.5} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Description / Details"
                  multiline
                  rows={3}
                  fullWidth
                  value={formData.description || ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Enter complementary inclusion details..."
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!formData.title && type !== 'Complementary'}
        >
          Save Service
        </Button>
      </DialogActions>
    </Dialog>
  );
}
