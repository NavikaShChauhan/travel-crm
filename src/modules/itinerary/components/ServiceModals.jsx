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
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  Chip,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { MdClose, MdAdd, MdDeleteOutline } from 'react-icons/md';

// Static lists for room categories and views (POV wise)
const ROOM_CATEGORIES = [
  'Standard',
  'Deluxe',
  'Super Deluxe',
  'Executive Suite',
  'Suite',
  'Villa',
  'Ocean Front Villa',
  'Overwater Villa',
  'Penthouse'
];

const ROOM_VIEWS = [
  'Pool View',
  'Ocean View',
  'Sea View',
  'Sunset View',
  'Mountain View',
  'Garden View',
  'City View',
  'Valley View',
  'Lake View'
];

const HOTEL_DATABASE = [
  {
    name: 'Snow Valley Resort',
    location: 'Old Manali, Manali',
    confirmationNo: 'CNF-88213',
    roomTypes: ['Standard', 'Deluxe', 'Super Deluxe', 'Executive Suite'],
    roomViews: ['Garden View', 'Mountain View', 'Pool View', 'Valley View'],
    rates: {
      'Standard': 4500,
      'Deluxe': 5500,
      'Super Deluxe': 6300,
      'Executive Suite': 8500
    },
    extraBedRates: {
      'Standard': 1000,
      'Deluxe': 1200,
      'Super Deluxe': 1200,
      'Executive Suite': 1500
    }
  },
  {
    name: 'Shimla Luxury Resort & Spa',
    location: 'Mall Road, Shimla',
    confirmationNo: 'CNF-77491',
    roomTypes: ['Deluxe', 'Super Deluxe', 'Suite'],
    roomViews: ['Mountain View', 'Valley View', 'Panoromic View'],
    rates: {
      'Deluxe': 7000,
      'Super Deluxe': 8500,
      'Suite': 12000
    },
    extraBedRates: {
      'Deluxe': 1500,
      'Super Deluxe': 1800,
      'Suite': 2500
    }
  },
  {
    name: 'Alpine Chalet Manali',
    location: 'Aleo, Manali',
    confirmationNo: 'CNF-45109',
    roomTypes: ['Standard', 'Deluxe', 'Super Deluxe'],
    roomViews: ['Mountain View', 'Garden View', 'River View'],
    rates: {
      'Standard': 4000,
      'Deluxe': 5000,
      'Super Deluxe': 6000
    },
    extraBedRates: {
      'Standard': 1000,
      'Deluxe': 1200,
      'Super Deluxe': 1500
    }
  },
  {
    name: 'Centara Ras Fushi Resort & Spa',
    location: 'North Male Atoll, Maldives',
    confirmationNo: 'CNF-90342',
    roomTypes: ['Ocean Front Villa', 'Overwater Villa', 'Beach Villa'],
    roomViews: ['Sea View', 'Sunset View', 'Ocean View'],
    rates: {
      'Ocean Front Villa': 22000,
      'Overwater Villa': 32000,
      'Beach Villa': 25000
    },
    extraBedRates: {
      'Ocean Front Villa': 4500,
      'Overwater Villa': 6000,
      'Beach Villa': 5000
    }
  },
  {
    name: 'Grand Mirage Resort & Thalasso',
    location: 'Nusa Dua, Bali',
    confirmationNo: 'CNF-61284',
    roomTypes: ['Deluxe', 'Premier Room', 'Suite'],
    roomViews: ['Garden View', 'Pool View', 'Ocean View'],
    rates: {
      'Deluxe': 8000,
      'Premier Room': 9500,
      'Suite': 14500
    },
    extraBedRates: {
      'Deluxe': 1800,
      'Premier Room': 2000,
      'Suite': 3000
    }
  },
  {
    name: 'The Khyber Himalayan Resort & Spa',
    location: 'Gulmarg, Kashmir',
    confirmationNo: 'CNF-33821',
    roomTypes: ['Premier Room', 'Luxury Balcony Room', 'Executive Suite'],
    roomViews: ['Pine Forest View', 'Snow Mountain View'],
    rates: {
      'Premier Room': 13500,
      'Luxury Balcony Room': 18000,
      'Executive Suite': 25000
    },
    extraBedRates: {
      'Premier Room': 2500,
      'Luxury Balcony Room': 3500,
      'Executive Suite': 5000
    }
  }
];

const MEAL_PLAN_RATES = {
  EP: 0,
  CP: 500,
  MAP: 1200,
  AP: 1800,
  AI: 2500
};

const MEAL_PLAN_SUBTEXTS = {
  EP: 'Room Only (No extra meal cost)',
  CP: 'Adds ₹500 per person, per night',
  MAP: 'Adds ₹1,200 per person, per night',
  AP: 'Adds ₹1,800 per person, per night',
  AI: 'Adds ₹2,500 per person, per night'
};

const CABIN_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First'];

// Vehicle types with explicit passenger capacity and default daily rates
const VEHICLE_OPTIONS = [
  { type: 'Sedan', capacity: 4, rate: 2800, label: 'Sedan (Max 4 Pax)' },
  { type: 'SUV', capacity: 6, rate: 3500, label: 'SUV (Max 6 Pax)' },
  { type: 'Mini Van', capacity: 8, rate: 5000, label: 'Mini Van (Max 8 Pax)' },
  { type: 'Tempo Traveller', capacity: 12, rate: 7500, label: 'Tempo Traveller (Max 12 Pax)' },
  { type: 'Luxury Coach', capacity: 35, rate: 15000, label: 'Luxury Coach (Max 35 Pax)' }
];

// Helper to auto-distribute rooms based on total traveler count
const autoDistributeRooms = (totalPax, defaultCategory = 'Super Deluxe', defaultView = 'Pool View', defaultRate = 6300, defaultExtraRate = 1200) => {
  const pax = Math.max(1, parseInt(totalPax || 2, 10));
  const neededRooms = Math.ceil(pax / 2);

  const rooms = [];
  for (let i = 0; i < neededRooms; i++) {
    rooms.push({
      id: `room-${Date.now()}-${i}`,
      roomType: defaultCategory,
      roomView: defaultView,
      noOfRooms: 1,
      adultsPerRoom: 2,
      childrenPerRoom: 1,
      ratePerNight: defaultRate,
      extraBedRequired: true,
      noOfExtraBeds: 1,
      ratePerExtraBed: defaultExtraRate
    });
  }
  return rooms;
};

// Helper to select vehicle based on pax count
const selectVehicleForPax = (totalPax) => {
  const pax = Math.max(1, parseInt(totalPax || 2, 10));
  const matched = VEHICLE_OPTIONS.find((v) => pax <= v.capacity) || VEHICLE_OPTIONS[VEHICLE_OPTIONS.length - 1];
  const requiredCount = Math.ceil(pax / matched.capacity);
  return {
    vehicleType: matched.type,
    vehicleCount: requiredCount,
    dailyRate: matched.rate,
    capacity: matched.capacity
  };
};

export default function ServiceModal({ open, onClose, onSave, type, initialData, travelers }) {
  const [formData, setFormData] = useState({});

  const totalPax = (travelers?.adults || 1) + (travelers?.children || 0);

  // Initialize form state when type or initialData changes
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      const seeded = { ...initialData };

      // Migrate existing hotel format if needed
      if (type === 'Hotel') {
        if (!seeded.allocatedRooms || seeded.allocatedRooms.length === 0) {
          const cat = seeded.roomType || 'Super Deluxe';
          const view = seeded.roomView || 'Pool View';
          const rate = seeded.ratePerNight || 6300;
          seeded.allocatedRooms = autoDistributeRooms(totalPax, cat, view, rate);
        }
      }
      setFormData(seeded);
    } else {
      const defaultState = {
        type,
        title: '',
        description: '',
        totalCost: 0,
        imageUrl: ''
      };

      if (type === 'Hotel') {
        const defaultHotel = HOTEL_DATABASE[0];
        defaultState.title = defaultHotel.name;
        defaultState.location = defaultHotel.location;
        defaultState.confirmationNo = 'CNF-88213';
        defaultState.checkInDate = '';
        defaultState.checkOutDate = '';
        defaultState.mealPlan = 'CP';
        defaultState.nights = 1;
        defaultState.allocatedRooms = [
          {
            id: `room-${Date.now()}-0`,
            roomType: 'Super Deluxe',
            roomView: 'Pool View',
            noOfRooms: 1,
            adultsPerRoom: 2,
            childrenPerRoom: 1,
            ratePerNight: 6300,
            extraBedRequired: true,
            noOfExtraBeds: 1,
            ratePerExtraBed: 1200
          }
        ];
        defaultState.specialRequests = '';
        defaultState.internalNotes = '';
      } else if (type === 'Flight') {
        defaultState.fromPort = '';
        defaultState.toPort = '';
        defaultState.cabinClass = 'Economy';
        defaultState.departureDate = '';
        defaultState.arrivalDate = '';
        defaultState.adultCost = 0;
        defaultState.childCost = 0;
        defaultState.infantCost = 0;
      } else if (type === 'Transport') {
        const rec = selectVehicleForPax(totalPax);
        defaultState.vehicleType = rec.vehicleType;
        defaultState.vehicleCount = rec.vehicleCount;
        defaultState.days = 1;
        defaultState.dailyRate = rec.dailyRate;
        defaultState.fromLocation = '';
        defaultState.toLocation = '';
        defaultState.pickupTime = '';
        defaultState.dropTime = '';
      } else if (type === 'Sightseeing' || type === 'Activity') {
        defaultState.location = '';
        defaultState.adultCost = 0;
        defaultState.childCost = 0;
      } else if (['Ferry', 'Bus', 'Train'].includes(type)) {
        defaultState.fromPort = '';
        defaultState.toPort = '';
        defaultState.cabinShip = '';
        defaultState.adultCost = 0;
      } else if (type === 'Cruise') {
        defaultState.fromPort = '';
        defaultState.toPort = '';
        defaultState.day = 'Day 1';
        defaultState.returnDay = 'Day 2';
        defaultState.cabinShip = '';
        defaultState.adultCost = 0;
      }

      setFormData(defaultState);
    }
  }, [open, type, initialData, totalPax]);

  // Static total cost calculation whenever fields change
  useEffect(() => {
    if (!open) return;

    let total = 0;
    let calcDuration = '';

    if (type === 'Hotel') {
      const nights = parseInt(formData.nights || 1, 10);
      const mealAddon = MEAL_PLAN_RATES[formData.mealPlan || 'CP'] || 0;
      const totalTravelers = (travelers?.adults || 1) + (travelers?.children || 0);

      const roomsSum = (formData.allocatedRooms || []).reduce((acc, r) => {
        const rCount = parseInt(r.noOfRooms || r.roomCount || 1, 10);
        const rRate = parseFloat(r.ratePerNight || 6300);
        const extraBeds = r.extraBedRequired ? parseInt(r.noOfExtraBeds || 1, 10) : 0;
        const extraRate = parseFloat(r.ratePerExtraBed || 1200);
        return acc + rCount * rRate + extraBeds * extraRate;
      }, 0);

      total = (roomsSum + mealAddon * totalTravelers) * nights;
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
    } else if (type === 'Transport') {
      const days = parseInt(formData.days || 1, 10);
      const count = parseInt(formData.vehicleCount || 1, 10);
      const rate = parseFloat(formData.dailyRate || 0);
      total = days * count * rate;

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
    } else if (['Ferry', 'Bus', 'Train', 'Cruise'].includes(type)) {
      const passengers = parseInt(travelers?.total || 1, 10);
      total = passengers * parseFloat(formData.adultCost || 0);
    } else if (type === 'Complementary') {
      total = parseFloat(formData.totalCost || 0);
    }

    setFormData((prev) => {
      if (prev.totalCost === total && prev.durationText === calcDuration) return prev;
      return { ...prev, totalCost: total, durationText: calcDuration };
    });
  }, [
    formData.nights,
    formData.mealPlan,
    formData.allocatedRooms,
    formData.adultCost,
    formData.childCost,
    formData.infantCost,
    formData.days,
    formData.vehicleCount,
    formData.dailyRate,
    formData.departureDate,
    formData.arrivalDate,
    formData.pickupTime,
    formData.dropTime,
    travelers,
    type,
    open
  ]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleHotelNameChange = (hotelName) => {
    const matched = HOTEL_DATABASE.find((h) => h.name === hotelName);
    if (!matched) {
      handleFieldChange('title', hotelName);
      return;
    }

    setFormData((prev) => {
      const defaultRoomType = matched.roomTypes[0] || 'Super Deluxe';
      const defaultRoomView = matched.roomViews[0] || 'Pool View';
      const defaultRate = matched.rates[defaultRoomType] || 6300;
      const defaultExtraRate = matched.extraBedRates[defaultRoomType] || 1200;

      const rooms =
        prev.allocatedRooms && prev.allocatedRooms.length > 0
          ? prev.allocatedRooms.map((r) => ({
              ...r,
              roomType: defaultRoomType,
              roomView: defaultRoomView,
              ratePerNight: defaultRate,
              ratePerExtraBed: defaultExtraRate
            }))
          : [
              {
                id: `room-${Date.now()}-0`,
                roomType: defaultRoomType,
                roomView: defaultRoomView,
                noOfRooms: 1,
                adultsPerRoom: 2,
                childrenPerRoom: 1,
                ratePerNight: defaultRate,
                extraBedRequired: true,
                noOfExtraBeds: 1,
                ratePerExtraBed: defaultExtraRate
              }
            ];

      return {
        ...prev,
        title: matched.name,
        location: matched.location,
        confirmationNo: matched.confirmationNo || 'CNF-88213',
        allocatedRooms: rooms
      };
    });
  };

  const handleCheckInChange = (dateVal) => {
    setFormData((prev) => {
      let nights = prev.nights || 1;
      if (dateVal && prev.checkOutDate) {
        const d1 = new Date(dateVal);
        const d2 = new Date(prev.checkOutDate);
        const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        if (diff > 0) nights = diff;
      }
      return { ...prev, checkInDate: dateVal, nights };
    });
  };

  const handleCheckOutChange = (dateVal) => {
    setFormData((prev) => {
      let nights = prev.nights || 1;
      if (prev.checkInDate && dateVal) {
        const d1 = new Date(prev.checkInDate);
        const d2 = new Date(dateVal);
        const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        if (diff > 0) nights = diff;
      }
      return { ...prev, checkOutDate: dateVal, nights };
    });
  };

  const handleAddRoom = () => {
    setFormData((prev) => {
      const current = prev.allocatedRooms || [];
      const hotelObj = HOTEL_DATABASE.find((h) => h.name === prev.title);
      const defaultType = hotelObj?.roomTypes[0] || 'Super Deluxe';
      const defaultView = hotelObj?.roomViews[0] || 'Pool View';
      const defaultRate = hotelObj?.rates[defaultType] || 6300;
      const defaultExtraRate = hotelObj?.extraBedRates[defaultType] || 1200;

      const newRoom = {
        id: `room-${Date.now()}-${current.length}`,
        roomType: defaultType,
        roomView: defaultView,
        noOfRooms: 1,
        adultsPerRoom: 2,
        childrenPerRoom: 1,
        ratePerNight: defaultRate,
        extraBedRequired: true,
        noOfExtraBeds: 1,
        ratePerExtraBed: defaultExtraRate
      };
      return { ...prev, allocatedRooms: [...current, newRoom] };
    });
  };

  const handleRemoveRoom = (index) => {
    setFormData((prev) => {
      const current = prev.allocatedRooms || [];
      if (current.length <= 1) return prev;
      const updated = current.filter((_, i) => i !== index);
      return { ...prev, allocatedRooms: updated };
    });
  };

  const handleRoomChange = (index, field, value) => {
    setFormData((prev) => {
      const current = [...(prev.allocatedRooms || [])];
      current[index] = { ...current[index], [field]: value };
      return { ...prev, allocatedRooms: current };
    });
  };

  const handleRoomTypeChange = (index, newType) => {
    setFormData((prev) => {
      const current = [...(prev.allocatedRooms || [])];
      const hotelObj = HOTEL_DATABASE.find((h) => h.name === prev.title);
      const newRate =
        hotelObj?.rates[newType] ||
        (newType === 'Standard' ? 4500 : newType === 'Deluxe' ? 5500 : newType === 'Super Deluxe' ? 6300 : 8500);
      const newExtraRate = hotelObj?.extraBedRates[newType] || 1200;

      current[index] = {
        ...current[index],
        roomType: newType,
        ratePerNight: newRate,
        ratePerExtraBed: newExtraRate
      };
      return { ...prev, allocatedRooms: current };
    });
  };

  const handleSave = () => {
    const finalData = {
      ...formData,
      id: formData.id || `srv-${Date.now()}`
    };
    onSave(finalData);
    onClose();
  };

  const renderHotelForm = () => {
    const rooms = formData.allocatedRooms || [];
    const checkInDate = formData.checkInDate || '';
    const checkOutDate = formData.checkOutDate || '';
    const mealPlan = formData.mealPlan || 'CP';

    const availableHotelNames = HOTEL_DATABASE.map((h) => h.name);
    const availableLocations = Array.from(new Set(HOTEL_DATABASE.map((h) => h.location)));

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', mb: 1.5 }}>
            Hotel Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Hotel Name *</InputLabel>
                <Select
                  value={formData.title || ''}
                  label="Hotel Name *"
                  onChange={(e) => handleHotelNameChange(e.target.value)}
                >
                  {availableHotelNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Location / Area</InputLabel>
                <Select
                  value={formData.location || ''}
                  label="Location / Area"
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                >
                  {availableLocations.map((loc) => (
                    <MenuItem key={loc} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            Stay Dates
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Check-in *"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={checkInDate}
                onChange={(e) => handleCheckInChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Check-out *"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={checkOutDate}
                onChange={(e) => handleCheckOutChange(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            Meal Plan
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
            {[
              { code: 'EP', label: 'Room Only (EP)' },
              { code: 'CP', label: 'Breakfast Only (CP)' },
              { code: 'MAP', label: 'Half Board (MAP)' },
              { code: 'AP', label: 'Full Board (AP)' },
              { code: 'AI', label: 'All Inclusive' }
            ].map((plan) => {
              const isSelected = mealPlan === plan.code;
              return (
                <Button
                  key={plan.code}
                  variant={isSelected ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => handleFieldChange('mealPlan', plan.code)}
                  sx={{
                    borderRadius: '20px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    px: 2.5,
                    py: 0.8,
                    borderColor: isSelected ? '#059669' : '#CBD5E1',
                    bgcolor: isSelected ? '#059669' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#334155',
                    '&:hover': {
                      bgcolor: isSelected ? '#047857' : '#F8FAFC',
                      borderColor: '#059669'
                    }
                  }}
                >
                  {plan.label}
                </Button>
              );
            })}
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.5 }}>
            {MEAL_PLAN_SUBTEXTS[mealPlan] || 'Adds extra meal allowance per person'}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 1 }}>
              Room Configuration
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<MdAdd />}
              onClick={handleAddRoom}
              sx={{ fontWeight: 700, color: '#059669', textTransform: 'none' }}
            >
              + Add Room Type
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {rooms.map((room, idx) => (
              <Paper
                key={room.id || idx}
                variant="outlined"
                sx={{
                  p: 2.5,
                  bgcolor: '#F8FAFC',
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  position: 'relative'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#475569' }}>
                    Room {idx + 1}
                  </Typography>
                  {rooms.length > 1 && (
                    <IconButton size="small" color="error" onClick={() => handleRemoveRoom(idx)} title="Remove Room">
                      <MdDeleteOutline size={18} />
                    </IconButton>
                  )}
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Room Type</InputLabel>
                      <Select
                        value={room.roomType || room.category || 'Super Deluxe'}
                        label="Room Type"
                        onChange={(e) => handleRoomTypeChange(idx, e.target.value)}
                      >
                        {ROOM_CATEGORIES.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Room View</InputLabel>
                      <Select
                        value={room.roomView || 'Pool View'}
                        label="Room View"
                        onChange={(e) => handleRoomChange(idx, 'roomView', e.target.value)}
                      >
                        {ROOM_VIEWS.map((view) => (
                          <MenuItem key={view} value={view}>
                            {view}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="No. of Rooms"
                      type="number"
                      size="small"
                      fullWidth
                      value={room.noOfRooms || room.roomCount || 1}
                      onChange={(e) => handleRoomChange(idx, 'noOfRooms', Math.max(1, parseInt(e.target.value || 1, 10)))}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Adults / room"
                      type="number"
                      size="small"
                      fullWidth
                      value={room.adultsPerRoom ?? 2}
                      onChange={(e) => handleRoomChange(idx, 'adultsPerRoom', Math.max(1, parseInt(e.target.value || 1, 10)))}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Children / room"
                      type="number"
                      size="small"
                      fullWidth
                      value={room.childrenPerRoom ?? 1}
                      onChange={(e) => handleRoomChange(idx, 'childrenPerRoom', Math.max(0, parseInt(e.target.value || 0, 10)))}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 1.5,
                        px: 2,
                        bgcolor: '#F1F5F9',
                        borderRadius: 2,
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Rate / night (from database)
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.2 }}>
                          ₹ {(room.ratePerNight || 6300).toLocaleString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${room.roomType || room.category || 'Super Deluxe'} · ${room.roomView || 'Pool View'}`}
                        size="small"
                        sx={{ bgcolor: '#E2E8F0', color: '#475569', fontWeight: 600 }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!room.extraBedRequired}
                          onChange={(e) => handleRoomChange(idx, 'extraBedRequired', e.target.checked)}
                          color="primary"
                        />
                      }
                      label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>Extra bed required</Typography>}
                    />
                  </Grid>

                  {room.extraBedRequired && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="No. of extra beds"
                          type="number"
                          size="small"
                          fullWidth
                          value={room.noOfExtraBeds || 1}
                          onChange={(e) => handleRoomChange(idx, 'noOfExtraBeds', Math.max(1, parseInt(e.target.value || 1, 10)))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            p: 1.2,
                            px: 2,
                            bgcolor: '#F1F5F9',
                            borderRadius: 2,
                            border: '1px solid #E2E8F0',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                          }}
                        >
                          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Rate / bed / night
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A' }}>
                            ₹ {(room.ratePerExtraBed || 1200).toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', mb: 1.5 }}>
            Additional Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Special Requests"
                multiline
                rows={3}
                fullWidth
                value={formData.specialRequests || ''}
                onChange={(e) => handleFieldChange('specialRequests', e.target.value)}
                placeholder="e.g. Early check-in, high floor, honeymoon setup..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Internal Notes"
                multiline
                rows={2}
                fullWidth
                value={formData.internalNotes || ''}
                onChange={(e) => handleFieldChange('internalNotes', e.target.value)}
                placeholder="Notes visible only to your team"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
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
            placeholder="e.g. Private Airport Pickup & Sightseeing Cab"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="From (Pickup Location)"
            fullWidth
            required
            value={formData.fromLocation || ''}
            onChange={(e) => handleFieldChange('fromLocation', e.target.value)}
            placeholder="e.g. Airport / Hotel / Station"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="To (Drop Location)"
            fullWidth
            required
            value={formData.toLocation || ''}
            onChange={(e) => handleFieldChange('toLocation', e.target.value)}
            placeholder="e.g. Resort / Tourist Landmark"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Vehicle Type & Occupancy</InputLabel>
            <Select
              value={formData.vehicleType || 'SUV'}
              label="Vehicle Type & Occupancy"
              onChange={(e) => {
                const selectedType = e.target.value;
                const match = VEHICLE_OPTIONS.find((v) => v.type === selectedType);
                if (match) {
                  const reqCount = Math.ceil(totalPax / match.capacity);
                  setFormData((prev) => ({
                    ...prev,
                    vehicleType: match.type,
                    dailyRate: match.rate,
                    vehicleCount: reqCount
                  }));
                }
              }}
            >
              {VEHICLE_OPTIONS.map((v) => (
                <MenuItem key={v.type} value={v.type}>
                  {v.label} — ₹{v.rate.toLocaleString()}/day
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="No. of Vehicles"
            type="number"
            fullWidth
            required
            value={formData.vehicleCount || 1}
            onChange={(e) => handleFieldChange('vehicleCount', Math.max(1, parseInt(e.target.value || 1, 10)))}
            helperText={`Auto-calculated for ${totalPax} Pax`}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Days / Rides"
            type="number"
            fullWidth
            required
            value={formData.days || 1}
            onChange={(e) => handleFieldChange('days', Math.max(1, parseInt(e.target.value || 1, 10)))}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Rate per Vehicle / Day (₹)"
            type="number"
            fullWidth
            required
            value={formData.dailyRate || 0}
            onChange={(e) => handleFieldChange('dailyRate', Math.max(0, parseFloat(e.target.value || 0)))}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Pickup Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.pickupTime || ''}
            onChange={(e) => handleFieldChange('pickupTime', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
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

  const renderFlightForm = () => (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TextField
          label="Flight Details / Airline"
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
      <Grid item xs={12} sm={6}>
        <TextField
          label="Departure Date / Time"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.departureDate || ''}
          onChange={(e) => handleFieldChange('departureDate', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
          label={`Adult Rate (x ${travelers?.adults || 1})`}
          type="number"
          fullWidth
          value={formData.adultCost || 0}
          onChange={(e) => handleFieldChange('adultCost', Math.max(0, parseFloat(e.target.value || 0)))}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label={`Child Rate (x ${travelers?.children || 0})`}
          type="number"
          fullWidth
          value={formData.childCost || 0}
          onChange={(e) => handleFieldChange('childCost', Math.max(0, parseFloat(e.target.value || 0)))}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label={`Infant Rate (x ${travelers?.infants || 0})`}
          type="number"
          fullWidth
          value={formData.infantCost || 0}
          onChange={(e) => handleFieldChange('infantCost', Math.max(0, parseFloat(e.target.value || 0)))}
        />
      </Grid>
    </Grid>
  );

  const renderGenericServiceForm = () => {
    const isSightseeingOrActivity = ['Adventurous Activity', 'Activity', 'Sightseeing'].includes(type);

    return (
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            label={`${type} Title`}
            fullWidth
            required
            value={formData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g. Paragliding at Solang Valley / Scuba Diving at Grand Island"
          />
        </Grid>

        {isSightseeingOrActivity ? (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
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
                value={formData.adultCost || 0}
                onChange={(e) => handleFieldChange('adultCost', Math.max(0, parseFloat(e.target.value || 0)))}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label={`Child Rate (x ${travelers?.children || 0})`}
                type="number"
                fullWidth
                value={formData.childCost || 0}
                onChange={(e) => handleFieldChange('childCost', Math.max(0, parseFloat(e.target.value || 0)))}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="From"
                fullWidth
                value={formData.fromPort || ''}
                onChange={(e) => handleFieldChange('fromPort', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="To"
                fullWidth
                value={formData.toPort || ''}
                onChange={(e) => handleFieldChange('toPort', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={`Cost per Person (x ${travelers?.total || 1})`}
                type="number"
                fullWidth
                value={formData.adultCost || 0}
                onChange={(e) => handleFieldChange('adultCost', Math.max(0, parseFloat(e.target.value || 0)))}
              />
            </Grid>
          </>
        )}
      </Grid>
    );
  };

  const renderComplementaryForm = () => (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TextField
          label="Inclusion Title"
          fullWidth
          required
          value={formData.title || ''}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          placeholder="e.g. Welcome Drinks & Special Honeymoon Cake"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Value (₹)"
          type="number"
          fullWidth
          value={formData.totalCost || 0}
          onChange={(e) => handleFieldChange('totalCost', Math.max(0, parseFloat(e.target.value || 0)))}
        />
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
          {initialData ? 'Edit' : 'Add'} {type} Service
        </Typography>
        <IconButton onClick={onClose} size="small">
          <MdClose />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ py: 1 }}>
          {type === 'Hotel' && renderHotelForm()}
          {type === 'Flight' && renderFlightForm()}
          {type === 'Transport' && renderTransportForm()}
          {['Adventurous Activity', 'Activity', 'Sightseeing', 'Ferry', 'Bus', 'Train', 'Cruise'].includes(type) && renderGenericServiceForm()}
          {type === 'Complementary' && renderComplementaryForm()}

          {/* Non-Hotel Total Cost summary banner */}
          {type !== 'Hotel' && (
            <Grid container spacing={2.5} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#065F46' }}>
                    Total Selling Price: ₹{(formData.totalCost || 0).toLocaleString()}
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
                  label="Description / Special Notes"
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

          {/* Image URL — available for every service type */}
          <Box sx={{ mt: 2.5, p: 2, background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155', mb: 1 }}>
              Service Image (Optional)
            </Typography>
            <TextField
              label="Image URL"
              fullWidth
              size="small"
              value={formData.imageUrl || ''}
              onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
              placeholder="Paste image URL here (e.g. https://...)"
            />
            {formData.imageUrl && (
              <Box sx={{ mt: 1.5 }}>
                <img
                  src={formData.imageUrl}
                  alt="Service preview"
                  style={{ width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #E2E8F0' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, px: 3, justifyContent: 'space-between', borderTop: '1px solid #E2E8F0' }}>
        {type === 'Hotel' ? (
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A' }}>
            Total ({formData.nights || 1} nights):{' '}
            <span style={{ color: '#059669', fontWeight: 800 }}>
              ₹ {(formData.totalCost || 0).toLocaleString()}
            </span>
          </Typography>
        ) : (
          <Box />
        )}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ borderRadius: '20px', textTransform: 'none', px: 3, fontWeight: 700, color: '#475569', borderColor: '#CBD5E1' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              px: 3,
              fontWeight: 700,
              bgcolor: '#059669',
              '&:hover': { bgcolor: '#047857' }
            }}
            disabled={!formData.title && type !== 'Complementary'}
          >
            {initialData ? 'Save Changes' : `Add ${type} Service`}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
