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
  Checkbox,
  Autocomplete
} from '@mui/material';
import { MdClose, MdAdd, MdDeleteOutline } from 'react-icons/md';
import { DESTINATIONS_DATABASE } from '@/constants/destinations.data';

// Helper: get dynamic Pickup & Drop location options based on trip destination
const getTripLocationOptions = (destination = '', hotelName = '') => {
  const options = new Set();

  // 1. Major Airport Hubs
  options.add('Chandigarh International Airport (IXC)');
  options.add('Indira Gandhi International Airport, Delhi (DEL)');
  options.add('Shimla Airport, Jubbarhatti (SLV)');
  options.add('Kullu Manali Airport, Bhuntar (KUU)');
  options.add('Dharamshala Kangra Airport (DHM)');
  options.add('Srinagar International Airport (SXR)');
  options.add('Jaipur International Airport (JAI)');
  options.add('Goa Dabolim Airport (GOI)');
  options.add('Velana International Airport, Male (MLE)');
  options.add('Ngurah Rai International Airport, Bali (DPS)');

  // 2. Railway Stations
  options.add('Chandigarh Railway Station');
  options.add('Kalka Railway Station');
  options.add('Shimla Railway Station');
  options.add('New Delhi Railway Station');
  options.add('Haridwar Railway Station');
  options.add('Jaipur Junction');

  // 3. Landmarks & Hotel Hubs
  options.add('Mall Road, Shimla');
  options.add('Mall Road, Manali');
  options.add('Solang Valley, Manali');
  options.add('Old Manali');
  options.add('Hadimba Temple, Manali');
  options.add('McLeod Ganj, Dharamshala');
  options.add('Bhagsunag Temple, Dharamshala');
  options.add('Dal Lake, Srinagar');
  options.add('Gulmarg Gondola Base');

  if (hotelName) {
    options.add(hotelName);
  }

  // 4. Cities from DESTINATIONS_DATABASE
  if (Array.isArray(DESTINATIONS_DATABASE)) {
    DESTINATIONS_DATABASE.forEach((d) => {
      options.add(`${d.city}, ${d.country}`);
    });
  }

  const all = Array.from(options);
  if (!destination) return all;

  const destParts = destination.toLowerCase().split(',').map((d) => d.trim()).filter(Boolean);
  const prioritized = all.filter((loc) => {
    const lLower = loc.toLowerCase();
    return destParts.some((part) => lLower.includes(part));
  });

  const rest = all.filter((loc) => !prioritized.includes(loc));
  return [...prioritized, ...rest];
};

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
    },
    mealPlans: {
      'Standard': ['EP', 'CP'],
      'Deluxe': ['EP', 'CP', 'MAP'],
      'Super Deluxe': ['EP', 'CP', 'MAP', 'AP'],
      'Executive Suite': ['EP', 'CP', 'MAP', 'AP', 'AI']
    },
    occupancy: {
      'Standard': { maxAdults: 2, maxChildren: 1 },
      'Deluxe': { maxAdults: 2, maxChildren: 2 },
      'Super Deluxe': { maxAdults: 3, maxChildren: 2 },
      'Executive Suite': { maxAdults: 3, maxChildren: 2 }
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
    },
    mealPlans: {
      'Deluxe': ['EP', 'CP', 'MAP'],
      'Super Deluxe': ['EP', 'CP', 'MAP', 'AP'],
      'Suite': ['EP', 'CP', 'MAP', 'AP', 'AI']
    },
    occupancy: {
      'Deluxe': { maxAdults: 2, maxChildren: 1 },
      'Super Deluxe': { maxAdults: 3, maxChildren: 2 },
      'Suite': { maxAdults: 4, maxChildren: 2 }
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
    },
    mealPlans: {
      'Standard': ['EP', 'CP'],
      'Deluxe': ['EP', 'CP', 'MAP'],
      'Super Deluxe': ['EP', 'CP', 'MAP', 'AP']
    },
    occupancy: {
      'Standard': { maxAdults: 2, maxChildren: 1 },
      'Deluxe': { maxAdults: 2, maxChildren: 2 },
      'Super Deluxe': { maxAdults: 3, maxChildren: 2 }
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
    },
    mealPlans: {
      'Ocean Front Villa': ['EP', 'CP', 'MAP', 'AP', 'AI'],
      'Overwater Villa': ['CP', 'MAP', 'AP', 'AI'],
      'Beach Villa': ['EP', 'CP', 'MAP', 'AP', 'AI']
    },
    occupancy: {
      'Ocean Front Villa': { maxAdults: 2, maxChildren: 1 },
      'Overwater Villa': { maxAdults: 2, maxChildren: 0 },
      'Beach Villa': { maxAdults: 3, maxChildren: 2 }
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
    },
    mealPlans: {
      'Deluxe': ['EP', 'CP', 'MAP'],
      'Premier Room': ['EP', 'CP', 'MAP', 'AP'],
      'Suite': ['EP', 'CP', 'MAP', 'AP', 'AI']
    },
    occupancy: {
      'Deluxe': { maxAdults: 2, maxChildren: 1 },
      'Premier Room': { maxAdults: 2, maxChildren: 2 },
      'Suite': { maxAdults: 4, maxChildren: 2 }
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
    },
    mealPlans: {
      'Premier Room': ['CP', 'MAP', 'AP'],
      'Luxury Balcony Room': ['CP', 'MAP', 'AP', 'AI'],
      'Executive Suite': ['CP', 'MAP', 'AP', 'AI']
    },
    occupancy: {
      'Premier Room': { maxAdults: 2, maxChildren: 1 },
      'Luxury Balcony Room': { maxAdults: 2, maxChildren: 2 },
      'Executive Suite': { maxAdults: 3, maxChildren: 2 }
    }
  }
];

// Meal plan labels — rate is 0 because meals are included in the room rate
const MEAL_PLAN_LABELS = {
  EP: 'Room Only (EP)',
  CP: 'Breakfast Only (CP)',
  MAP: 'Half Board (MAP)',
  AP: 'Full Board (AP)',
  AI: 'All Inclusive'
};

const MEAL_PLAN_DESCRIPTIONS = {
  EP: 'Room only — no meals included',
  CP: 'Breakfast included in room rate',
  MAP: 'Breakfast + Lunch or Dinner included in room rate',
  AP: 'Breakfast + Lunch + Dinner included in room rate',
  AI: 'All meals, snacks & beverages included in room rate'
};

// Helper: get available meal plans for a given hotel and room type
const getAvailableMealPlans = (hotelName, roomType) => {
  const hotel = HOTEL_DATABASE.find((h) => h.name === hotelName);
  if (hotel && hotel.mealPlans && hotel.mealPlans[roomType]) {
    return hotel.mealPlans[roomType];
  }
  // Fallback: all plans
  return ['EP', 'CP', 'MAP', 'AP', 'AI'];
};

const DEFAULT_ROOM_MEALS = {
  'Standard': 'CP',
  'Deluxe': 'CP',
  'Super Deluxe': 'MAP',
  'Executive Suite': 'AP',
  'Suite': 'AP',
  'Villa': 'AI',
  'Ocean Front Villa': 'AI',
  'Overwater Villa': 'AI',
  'Beach Villa': 'MAP',
  'Premier Room': 'MAP',
  'Luxury Balcony Room': 'MAP',
  'Penthouse': 'AI'
};

// Helper: get fixed included meal plan for a given hotel and room type
const getRoomIncludedMealPlan = (hotelName, roomType) => {
  const hotel = HOTEL_DATABASE.find((h) => h.name === hotelName);
  if (hotel && hotel.mealPlans && hotel.mealPlans[roomType]) {
    const plans = hotel.mealPlans[roomType];
    const rType = roomType || '';
    if (rType.includes('Super') || rType.includes('Premier') || rType.includes('Luxury')) {
      return plans.includes('MAP') ? 'MAP' : (plans[0] || 'CP');
    }
    if (rType.includes('Suite') || rType.includes('Villa') || rType.includes('Penthouse')) {
      return plans.includes('AP') ? 'AP' : plans.includes('AI') ? 'AI' : (plans[0] || 'MAP');
    }
    if (rType.includes('Deluxe')) {
      return plans.includes('CP') ? 'CP' : (plans[0] || 'EP');
    }
    return plans[0] || 'CP';
  }
  return DEFAULT_ROOM_MEALS[roomType] || 'CP';
};

// Helper: get occupancy for a given hotel and room type
const getRoomOccupancy = (hotelName, roomType) => {
  const hotel = HOTEL_DATABASE.find((h) => h.name === hotelName);
  if (hotel && hotel.occupancy && hotel.occupancy[roomType]) {
    return hotel.occupancy[roomType];
  }
  return { maxAdults: 2, maxChildren: 1 };
};

const CABIN_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First'];

// Vehicle types with explicit passenger capacity and default daily rates
const VEHICLE_OPTIONS = [
  { type: 'Sedan', capacity: 4, rate: 2800, label: 'Sedan (Max 4 Pax)' },
  { type: 'SUV', capacity: 6, rate: 3500, label: 'SUV (Max 6 Pax)' },
  { type: 'Mini Van', capacity: 8, rate: 5000, label: 'Mini Van (Max 8 Pax)' },
  { type: 'Tempo Traveller', capacity: 12, rate: 7500, label: 'Tempo Traveller (Max 12 Pax)' },
  { type: 'Luxury Coach', capacity: 35, rate: 15000, label: 'Luxury Coach (Max 35 Pax)' },
  { type: 'Innova Crysta', capacity: 7, rate: 4000, label: 'Innova Crysta (Max 7 Pax)' },
  { type: 'Ertiga', capacity: 6, rate: 3200, label: 'Ertiga (Max 6 Pax)' },
  { type: 'Bike', capacity: 2, rate: 800, label: 'Bike (Max 2 Pax)' },
  { type: 'Auto Rickshaw', capacity: 3, rate: 500, label: 'Auto Rickshaw (Max 3 Pax)' }
];

// Preset transport service titles for quick selection
const TRANSPORT_TITLE_PRESETS = [
  'Private Airport Pickup & Drop',
  'Airport Transfer',
  'Railway Station Transfer',
  'Full Day Sightseeing Cab',
  'Half Day Sightseeing Cab',
  'Inter-city Transfer',
  'Hotel to Airport Drop',
  'Hotel to Railway Station Drop',
  'Private Car at Disposal',
  'Point to Point Transfer',
  'Bus Station Transfer',
  'Cruise Port Transfer',
  'Local Sightseeing Tour',
  'Night Safari Transfer',
  'Adventure Activity Transfer'
];

// Helper to auto-distribute rooms based on total traveler count
const autoDistributeRooms = (totalPax, defaultCategory = 'Super Deluxe', defaultView = 'Pool View', defaultRate = 6300, defaultExtraRate = 1200, hotelName = '', defaultMealPlan = 'CP') => {
  const pax = Math.max(1, parseInt(totalPax || 2, 10));
  const occupancy = getRoomOccupancy(hotelName, defaultCategory);
  const maxPerRoom = occupancy.maxAdults || 2;
  const neededRooms = Math.ceil(pax / maxPerRoom);

  // Pick first valid meal plan for this room type
  const availablePlans = getAvailableMealPlans(hotelName, defaultCategory);
  const mealPlan = availablePlans.includes(defaultMealPlan) ? defaultMealPlan : (availablePlans[0] || 'CP');

  const rooms = [];
  for (let i = 0; i < neededRooms; i++) {
    rooms.push({
      id: `room-${Date.now()}-${i}`,
      roomType: defaultCategory,
      roomView: defaultView,
      noOfRooms: 1,
      adultsPerRoom: Math.min(2, occupancy.maxAdults),
      childrenPerRoom: Math.min(1, occupancy.maxChildren),
      mealPlan: mealPlan,
      ratePerNight: defaultRate,
      extraBedRequired: false,
      noOfExtraBeds: 0,
      ratePerExtraBed: defaultExtraRate,
      maxAdults: occupancy.maxAdults,
      maxChildren: occupancy.maxChildren
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

export default function ServiceModal({ open, onClose, onSave, type, initialData, travelers, destination }) {
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
      } else if (type === 'Transport') {
        const rec = selectVehicleForPax(totalPax);
        if (!seeded.allocatedVehicles || seeded.allocatedVehicles.length === 0) {
          seeded.allocatedVehicles = [
            {
              id: `veh-${Date.now()}-0`,
              vehicleType: seeded.vehicleType || rec.vehicleType,
              vehicleCount: seeded.vehicleCount || rec.vehicleCount,
              dailyRate: seeded.dailyRate || rec.dailyRate,
              capacity: rec.capacity
            }
          ];
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
        const defaultRoomType = defaultHotel.roomTypes[0] || 'Super Deluxe';
        const defaultOccupancy = getRoomOccupancy(defaultHotel.name, defaultRoomType);
        const defaultMealPlans = getAvailableMealPlans(defaultHotel.name, defaultRoomType);
        const defaultMealPlan = defaultMealPlans.includes('CP') ? 'CP' : (defaultMealPlans[0] || 'CP');
        defaultState.title = defaultHotel.name;
        defaultState.location = defaultHotel.location;
        defaultState.confirmationNo = 'CNF-88213';
        defaultState.checkInDate = '';
        defaultState.checkOutDate = '';
        defaultState.nights = 1;
        defaultState.allocatedRooms = [
          {
            id: `room-${Date.now()}-0`,
            roomType: defaultRoomType,
            roomView: defaultHotel.roomViews[0] || 'Pool View',
            noOfRooms: 1,
            adultsPerRoom: Math.min(2, defaultOccupancy.maxAdults),
            childrenPerRoom: Math.min(1, defaultOccupancy.maxChildren),
            mealPlan: defaultMealPlan,
            ratePerNight: defaultHotel.rates[defaultRoomType] || 6300,
            extraBedRequired: false,
            noOfExtraBeds: 0,
            ratePerExtraBed: defaultHotel.extraBedRates[defaultRoomType] || 1200,
            maxAdults: defaultOccupancy.maxAdults,
            maxChildren: defaultOccupancy.maxChildren
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
        defaultState.days = 1;
        defaultState.fromLocation = '';
        defaultState.toLocation = '';
        defaultState.pickupTime = '';
        defaultState.dropTime = '';
        defaultState.allocatedVehicles = [
          {
            id: `veh-${Date.now()}-0`,
            vehicleType: rec.vehicleType,
            vehicleCount: rec.vehicleCount,
            dailyRate: rec.dailyRate,
            capacity: rec.capacity
          }
        ];
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
      // Meals are included in the room rate — no extra meal charges

      const roomsSum = (formData.allocatedRooms || []).reduce((acc, r) => {
        const rCount = parseInt(r.noOfRooms || r.roomCount || 1, 10);
        const rRate = parseFloat(r.ratePerNight || 6300);
        const extraBeds = r.extraBedRequired ? parseInt(r.noOfExtraBeds || 1, 10) : 0;
        const extraRate = parseFloat(r.ratePerExtraBed || 1200);
        return acc + rCount * rRate + extraBeds * extraRate;
      }, 0);

      total = roomsSum * nights;
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
      const vehicles = formData.allocatedVehicles || [];
      if (vehicles.length > 0) {
        const vehiclesSum = vehicles.reduce((acc, v) => {
          const vCount = parseInt(v.vehicleCount || 1, 10);
          const vRate = parseFloat(v.dailyRate || 0);
          return acc + (vCount * vRate);
        }, 0);
        total = days * vehiclesSum;
      } else {
        const count = parseInt(formData.vehicleCount || 1, 10);
        const rate = parseFloat(formData.dailyRate || 0);
        total = days * count * rate;
      }

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
      const occupancy = getRoomOccupancy(matched.name, defaultRoomType);
      const availablePlans = getAvailableMealPlans(matched.name, defaultRoomType);
      const defaultMealPlan = availablePlans.includes('CP') ? 'CP' : (availablePlans[0] || 'CP');

      const rooms =
        prev.allocatedRooms && prev.allocatedRooms.length > 0
          ? prev.allocatedRooms.map((r) => {
              const roomOcc = getRoomOccupancy(matched.name, defaultRoomType);
              const roomPlans = getAvailableMealPlans(matched.name, defaultRoomType);
              const roomMeal = roomPlans.includes(r.mealPlan) ? r.mealPlan : (roomPlans[0] || 'CP');
              return {
                ...r,
                roomType: defaultRoomType,
                roomView: defaultRoomView,
                ratePerNight: defaultRate,
                ratePerExtraBed: defaultExtraRate,
                mealPlan: roomMeal,
                adultsPerRoom: Math.min(r.adultsPerRoom || 2, roomOcc.maxAdults),
                childrenPerRoom: Math.min(r.childrenPerRoom || 1, roomOcc.maxChildren),
                maxAdults: roomOcc.maxAdults,
                maxChildren: roomOcc.maxChildren
              };
            })
          : [
              {
                id: `room-${Date.now()}-0`,
                roomType: defaultRoomType,
                roomView: defaultRoomView,
                noOfRooms: 1,
                adultsPerRoom: Math.min(2, occupancy.maxAdults),
                childrenPerRoom: Math.min(1, occupancy.maxChildren),
                mealPlan: defaultMealPlan,
                ratePerNight: defaultRate,
                extraBedRequired: false,
                noOfExtraBeds: 0,
                ratePerExtraBed: defaultExtraRate,
                maxAdults: occupancy.maxAdults,
                maxChildren: occupancy.maxChildren
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
      const occupancy = getRoomOccupancy(prev.title, defaultType);
      const availablePlans = getAvailableMealPlans(prev.title, defaultType);
      const defaultMealPlan = availablePlans.includes('CP') ? 'CP' : (availablePlans[0] || 'CP');

      const newRoom = {
        id: `room-${Date.now()}-${current.length}`,
        roomType: defaultType,
        roomView: defaultView,
        noOfRooms: 1,
        adultsPerRoom: Math.min(2, occupancy.maxAdults),
        childrenPerRoom: Math.min(1, occupancy.maxChildren),
        mealPlan: defaultMealPlan,
        ratePerNight: defaultRate,
        extraBedRequired: false,
        noOfExtraBeds: 0,
        ratePerExtraBed: defaultExtraRate,
        maxAdults: occupancy.maxAdults,
        maxChildren: occupancy.maxChildren
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
      const occupancy = getRoomOccupancy(prev.title, newType);
      const includedMealPlan = getRoomIncludedMealPlan(prev.title, newType);

      current[index] = {
        ...current[index],
        roomType: newType,
        ratePerNight: newRate,
        ratePerExtraBed: newExtraRate,
        mealPlan: includedMealPlan,
        adultsPerRoom: Math.min(current[index]?.adultsPerRoom || 2, occupancy.maxAdults),
        childrenPerRoom: Math.min(current[index]?.childrenPerRoom || 1, occupancy.maxChildren),
        maxAdults: occupancy.maxAdults,
        maxChildren: occupancy.maxChildren
      };
      return { ...prev, allocatedRooms: current };
    });
  };

  const handleRoomMealPlanChange = (index, newMealPlan) => {
    setFormData((prev) => {
      const current = [...(prev.allocatedRooms || [])];
      current[index] = { ...current[index], mealPlan: newMealPlan };
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
              <Autocomplete
                freeSolo
                options={availableHotelNames}
                value={formData.title || ''}
                onChange={(e, newValue) => {
                  if (newValue) handleHotelNameChange(newValue);
                }}
                onInputChange={(e, newInputValue, reason) => {
                  if (reason === 'input') {
                    handleFieldChange('title', newInputValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Hotel Name *" size="small" required placeholder="Select or type hotel name" />
                )}
              />
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
                    {(() => {
                      const hotelObj = HOTEL_DATABASE.find((h) => h.name === formData.title);
                      const roomTypeOptions = hotelObj ? hotelObj.roomTypes : ROOM_CATEGORIES;
                      return (
                        <FormControl fullWidth size="small">
                          <InputLabel>Room Type</InputLabel>
                          <Select
                            value={room.roomType || room.category || 'Super Deluxe'}
                            label="Room Type"
                            onChange={(e) => handleRoomTypeChange(idx, e.target.value)}
                          >
                            {roomTypeOptions.map((cat) => (
                              <MenuItem key={cat} value={cat}>
                                {cat}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      );
                    })()}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    {(() => {
                      const hotelObj = HOTEL_DATABASE.find((h) => h.name === formData.title);
                      const viewOptions = hotelObj ? hotelObj.roomViews : ROOM_VIEWS;
                      return (
                        <FormControl fullWidth size="small">
                          <InputLabel>Room View</InputLabel>
                          <Select
                            value={room.roomView || 'Pool View'}
                            label="Room View"
                            onChange={(e) => handleRoomChange(idx, 'roomView', e.target.value)}
                          >
                            {viewOptions.map((view) => (
                              <MenuItem key={view} value={view}>
                                {view}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      );
                    })()}
                  </Grid>

                  {/* Read-Only Included Meal Display — Non-selectable as per Room Type */}
                  <Grid item xs={12}>
                    {(() => {
                      const roomType = room.roomType || room.category || 'Super Deluxe';
                      const mealCode = getRoomIncludedMealPlan(formData.title, roomType);
                      const mealLabel = MEAL_PLAN_LABELS[mealCode] || mealCode;
                      const mealDesc = MEAL_PLAN_DESCRIPTIONS[mealCode] || 'Meals included in room rate';

                      return (
                        <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: 2.5, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                            Meal Plan Included for {roomType} (From Database — Non-selectable)
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Chip
                              label={mealLabel}
                              size="medium"
                              sx={{
                                bgcolor: '#059669',
                                color: '#FFFFFF',
                                fontWeight: 800,
                                fontSize: '0.825rem',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '8px'
                              }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, bgcolor: '#FFFFFF', px: 1.5, py: 0.8, borderRadius: 1.5, border: '1px solid #CBD5E1', flex: 1 }}>
                              <Typography variant="caption" sx={{ fontWeight: 800, color: '#059669', bgcolor: '#ECFDF5', px: 1, py: 0.3, borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                Included Meals:
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#1E293B', fontWeight: 600, fontSize: '0.85rem' }}>
                                {mealDesc}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })()}
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
                      label={`Adults / room (max ${room.maxAdults || getRoomOccupancy(formData.title, room.roomType).maxAdults})`}
                      type="number"
                      size="small"
                      fullWidth
                      value={room.adultsPerRoom ?? 2}
                      onChange={(e) => {
                        const maxA = room.maxAdults || getRoomOccupancy(formData.title, room.roomType).maxAdults;
                        handleRoomChange(idx, 'adultsPerRoom', Math.max(1, Math.min(maxA, parseInt(e.target.value || 1, 10))));
                      }}
                      helperText={`Max occupancy: ${room.maxAdults || getRoomOccupancy(formData.title, room.roomType).maxAdults} adults`}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label={`Children / room (max ${room.maxChildren ?? getRoomOccupancy(formData.title, room.roomType).maxChildren})`}
                      type="number"
                      size="small"
                      fullWidth
                      value={room.childrenPerRoom ?? 1}
                      onChange={(e) => {
                        const maxC = room.maxChildren ?? getRoomOccupancy(formData.title, room.roomType).maxChildren;
                        handleRoomChange(idx, 'childrenPerRoom', Math.max(0, Math.min(maxC, parseInt(e.target.value || 0, 10))));
                      }}
                      helperText={`Max occupancy: ${room.maxChildren ?? getRoomOccupancy(formData.title, room.roomType).maxChildren} children`}
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

  const handleAddVehicle = () => {
    setFormData((prev) => {
      const current = prev.allocatedVehicles || [];
      const newVehicle = {
        id: `veh-${Date.now()}-${current.length}`,
        vehicleType: 'Sedan',
        vehicleCount: 1,
        dailyRate: 2800,
        capacity: 4
      };
      return { ...prev, allocatedVehicles: [...current, newVehicle] };
    });
  };

  const handleRemoveVehicle = (index) => {
    setFormData((prev) => {
      const current = prev.allocatedVehicles || [];
      if (current.length <= 1) return prev;
      const updated = current.filter((_, i) => i !== index);
      return { ...prev, allocatedVehicles: updated };
    });
  };

  const handleVehicleChange = (index, field, value) => {
    setFormData((prev) => {
      const current = [...(prev.allocatedVehicles || [])];
      current[index] = { ...current[index], [field]: value };
      return { ...prev, allocatedVehicles: current };
    });
  };

  const handleVehicleTypeChange = (index, newType) => {
    setFormData((prev) => {
      const current = [...(prev.allocatedVehicles || [])];
      const match = VEHICLE_OPTIONS.find((v) => v.type === newType);
      const rate = match ? match.rate : (current[index]?.dailyRate || 3500);
      const capacity = match ? match.capacity : 4;
      current[index] = {
        ...current[index],
        vehicleType: newType,
        dailyRate: rate,
        capacity
      };
      return { ...prev, allocatedVehicles: current };
    });
  };

  const renderTransportForm = () => {
    const locationOptions = getTripLocationOptions(destination, formData.title);
    const vehicles = formData.allocatedVehicles && formData.allocatedVehicles.length > 0
      ? formData.allocatedVehicles
      : [{
          id: 'veh-0',
          vehicleType: formData.vehicleType || 'SUV',
          vehicleCount: formData.vehicleCount || 1,
          dailyRate: formData.dailyRate || 3500
        }];

    return (
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={TRANSPORT_TITLE_PRESETS}
            value={formData.title || ''}
            onChange={(e, newValue) => {
              handleFieldChange('title', newValue || '');
            }}
            onInputChange={(e, newInputValue, reason) => {
              if (reason === 'input') {
                handleFieldChange('title', newInputValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Service Title *"
                fullWidth
                required
                placeholder="Select or type e.g. Private Airport Pickup & Sightseeing Cab"
              />
            )}
          />
        </Grid>

        {/* Pickup Location Dropdown (Dynamic based on trip destination & locations) */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            options={locationOptions}
            value={formData.fromLocation || ''}
            onChange={(e, newValue) => handleFieldChange('fromLocation', newValue || '')}
            onInputChange={(e, newInputValue, reason) => {
              if (reason === 'input') handleFieldChange('fromLocation', newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From (Pickup Location) *"
                fullWidth
                required
                placeholder="Select pickup location or type custom"
              />
            )}
          />
        </Grid>

        {/* Drop Location Dropdown (Dynamic based on trip destination & locations) */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            options={locationOptions}
            value={formData.toLocation || ''}
            onChange={(e, newValue) => handleFieldChange('toLocation', newValue || '')}
            onInputChange={(e, newInputValue, reason) => {
              if (reason === 'input') handleFieldChange('toLocation', newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To (Drop Location) *"
                fullWidth
                required
                placeholder="Select drop location or type custom"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Days / Rides *"
            type="number"
            fullWidth
            required
            value={formData.days || 1}
            onChange={(e) => handleFieldChange('days', Math.max(1, parseInt(e.target.value || 1, 10)))}
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

        {/* Multi-Vehicle Configuration */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, mt: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B' }}>
              Vehicle Fleet Allocation ({vehicles.length} Type{vehicles.length > 1 ? 's' : ''})
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<MdAdd />}
              onClick={handleAddVehicle}
              sx={{ fontWeight: 700, color: '#059669', textTransform: 'none' }}
            >
              + Add Another Vehicle
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {vehicles.map((veh, idx) => (
              <Paper
                key={veh.id || idx}
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
                    Vehicle {idx + 1}
                  </Typography>
                  {vehicles.length > 1 && (
                    <IconButton size="small" color="error" onClick={() => handleRemoveVehicle(idx)} title="Remove Vehicle">
                      <MdDeleteOutline size={18} />
                    </IconButton>
                  )}
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      freeSolo
                      options={VEHICLE_OPTIONS.map((v) => v.type)}
                      value={veh.vehicleType || ''}
                      onChange={(e, newValue) => handleVehicleTypeChange(idx, newValue || '')}
                      onInputChange={(e, newInputValue, reason) => {
                        if (reason === 'input') handleVehicleChange(idx, 'vehicleType', newInputValue);
                      }}
                      renderOption={(props, option) => {
                        const match = VEHICLE_OPTIONS.find((v) => v.type === option);
                        return (
                          <li {...props} key={option}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <span>{match ? match.label : option}</span>
                              {match && <span style={{ color: '#64748B', fontSize: '0.85rem' }}>— ₹{match.rate.toLocaleString()}/day</span>}
                            </Box>
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Vehicle Type *"
                          size="small"
                          fullWidth
                          required
                          placeholder="Select vehicle type"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="No. of Vehicles *"
                      type="number"
                      size="small"
                      fullWidth
                      required
                      value={veh.vehicleCount || 1}
                      onChange={(e) => handleVehicleChange(idx, 'vehicleCount', Math.max(1, parseInt(e.target.value || 1, 10)))}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Rate / Vehicle / Day (₹) *"
                      type="number"
                      size="small"
                      fullWidth
                      required
                      value={veh.dailyRate || 0}
                      onChange={(e) => handleVehicleChange(idx, 'dailyRate', Math.max(0, parseFloat(e.target.value || 0)))}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
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
