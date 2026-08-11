/**
 * Mock data for the "itinerary" module.
 * -----------------------------------------------------------------------
 * Pre-populated itineraries for high-quality representation.
 * Aligned with the dashboard and planner designs provided.
 */
export const MOCK_ITINERARY = [
  {
    id: 'ITIN-2026-0001',
    name: 'Himancghal trip',
    customerName: 'Aarav Mehta',
    phone: '+91 98765 43210',
    destination: 'Shimla, Manali, Dharamshala',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-08-01',
    endDate: '2026-08-05',
    durationDays: 5,
    durationNights: 4,
    travelers: 2,
    adults: 2,
    children: 0,
    infants: 0,
    type: 'Family',
    amount: 21357.25,
    description: 'An scenic 4-night tour package across Himachal Pradesh including Shimla, Manali, and Dharamshala. Includes flight bookings, transport by SUV, and luxury resort stays.',
    status: 'Draft',
    createdAt: '2026-07-30T10:00:00.000Z',
    days: [
      { dayNumber: 1, title: 'Shimla', description: 'Arrival in shimla airport', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 2, title: 'Manali', description: 'Explore Mall Road and local landmarks', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 3, title: 'Manali', description: 'Excursion to Solang Valley and activities', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 4, title: 'Dharamshala', description: 'Scenic drive and temple visits', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 5, title: 'Dharamshala', description: 'Departure and return flight', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      {
        id: 'srv-101',
        dayNumber: 1,
        type: 'Flight',
        supplier: 'AllianceAir',
        title: 'Flight - DEL to IXC - AllianceAir',
        fromPort: 'Delhi (DEL)',
        toPort: 'Chandigarh (IXC)',
        cabinClass: 'Economy',
        departureDate: '2026-08-01T10:30',
        adultCost: 2298.00,
        totalCost: 4596.00,
        supplierCost: 4200.00,
        autoSupplierCost: true,
        description: 'Created from Live Flight Search. Journey duration: 1h 15m. Seat reservations included.',
        images: []
      },
      {
        id: 'srv-102',
        dayNumber: 1,
        type: 'Transport',
        supplier: 'Himachal Cab Services',
        title: 'Airport Transfer Shimla',
        vehicleType: 'SUV',
        days: 1,
        dailyRate: 3500.00,
        totalCost: 3500.00,
        supplierCost: 3000.00,
        autoSupplierCost: true,
        description: 'Private SUV pickup from Chandigarh Airport to Shimla Hotel.',
        images: []
      },
      {
        id: 'srv-103',
        dayNumber: 2,
        type: 'Hotel',
        supplier: 'Shimla Heights Resort',
        title: 'Shimla Luxury Resort & Spa - Double Room',
        packageOption: '5 Star',
        location: 'Shimla',
        starCategory: '5 Star',
        roomType: 'Double',
        mealPlan: 'CP',
        nights: 1,
        rooms: {
          Double: { count: 1, costPerNight: 8000.00, total: 8000.00 }
        },
        totalCost: 8000.00,
        supplierCost: 7500.00,
        autoSupplierCost: true,
        description: 'Stunning valley view, breakfast buffet included.',
        images: []
      },
      {
        id: 'srv-104',
        dayNumber: 3,
        type: 'Adventurous Activity',
        title: 'Solang Valley Adventure Passes',
        location: 'Manali',
        adultCost: 2630.62,
        totalCost: 5261.25,
        supplierCost: 5000.00,
        autoSupplierCost: true,
        description: 'Includes ropeway ride and paragliding coupons.'
      }
    ]
  },
  {
    id: 'ITIN-2026-0002',
    name: 'Chardham Yatra',
    customerName: 'Ramesh Sharma',
    phone: '+91 99112 23344',
    destination: 'Haridwar, guptakashi, Kedarnath',
    coverImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-09-10',
    endDate: '2026-09-14',
    durationDays: 4,
    durationNights: 3,
    travelers: 2,
    adults: 2,
    children: 0,
    infants: 0,
    type: 'Solo',
    amount: 0.00,
    description: 'Chardham Yatra packages with stops at Haridwar, Guptakashi, and Kedarnath temple.',
    status: 'Draft',
    createdAt: '2026-07-29T14:30:00.000Z',
    days: [
      { dayNumber: 1, title: 'Haridwar', description: 'Ganga Aarti and check-in', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 2, title: 'guptakashi', description: 'Drive to Guptakashi', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 3, title: 'Kedarnath', description: 'Kedarnath Temple Darshan', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 4, title: 'Kedarnath', description: 'Return and departure', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80' }
    ],
    services: []
  },
  {
    id: 'ITIN-2026-0003',
    name: 'arif farooqui - Full Package - Manali',
    customerName: 'Arif Farooqui',
    phone: '+91 97776 65544',
    destination: 'Manali Town, Solang Valley, Atal Tunnel & Sissu, Naggar',
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-08-05',
    endDate: '2026-08-09',
    durationDays: 5,
    durationNights: 4,
    travelers: 3,
    adults: 3,
    children: 0,
    infants: 0,
    type: 'Friends',
    amount: 52500.00,
    description: 'A complete 5-day Manali package for 3 friends featuring local Manali sightseeing, adrenaline-filled Solang Valley activities, a scenic excursion through the world-famous Atal Tunnel to Sissu, and a heritage day at Naggar Castle. Includes 4-night stay at Alpine Chalet Manali, private SUV transfers, MAP meal plan, adventure passes, and all major sightseeing entries.',
    status: 'Confirmed',
    createdAt: '2026-07-30T09:15:00.000Z',
    days: [
      {
        dayNumber: 1,
        title: 'Manali Town',
        description: 'Morning arrival in Manali from Delhi/Chandigarh by private SUV/Volvo transfer. Check-in at Alpine Chalet Manali. After freshening up, visit Hadimba Devi Temple set amidst the cedar forest, followed by Club House for indoor activities and photography. Evening walk along the iconic Mall Road, visit the Manu Temple, and explore the local market for Himachali shawls and souvenirs. Dinner and overnight stay in Manali.',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80'
      },
      {
        dayNumber: 2,
        title: 'Solang Valley',
        description: 'Early breakfast and depart for Solang Valley (14 km from Manali). Experience adventure activities such as paragliding, zorbing, and ropeway ride to the snow point. Enjoy snow scooter rides or skiing depending on weather conditions. Packed lunch or hot lunch at a local cafe in Solang. Return to Manali by late afternoon. Evening free for leisure or optional visit to Old Manali cafes and Manu Temple. Dinner and overnight stay.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
      },
      {
        dayNumber: 3,
        title: 'Atal Tunnel & Sissu',
        description: 'After breakfast, proceed on one of the most scenic drives through the Atal Tunnel (9.02 km), the world\'s longest highway tunnel above 10,000 feet. Reach Sissu in Lahaul Valley, visit the stunning Sissu Lake and Sissu Waterfall surrounded by snow-capped mountains. Optional river rafting or riverside walk at Tandi. Hot lunch at a local dhaba. En route back, stop at Keylong viewpoints for panoramic photography. Return to Manali for dinner and overnight stay.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      },
      {
        dayNumber: 4,
        title: 'Naggar & Manali Local',
        description: 'Post breakfast, drive to Naggar (22 km), the former capital of Kullu. Visit the historic Naggar Castle, now a heritage hotel offering panoramic Kullu Valley views. Explore the Roerich Art Gallery and Museum, showcasing paintings and artifacts of Russian artist Nicholas Roerich. Visit the Tripura Sundari Temple and ancient Gauri Shankar Temple. Return to Manali by evening for last-minute shopping at Mall Road and Tibetan Market. Dinner and overnight stay.',
        image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80'
      },
      {
        dayNumber: 5,
        title: 'Departure',
        description: 'After breakfast, check-out from the hotel. Enjoy a brief stop at Vashisht Village for the hot sulphur springs and Vashisht Temple if time permits. Later proceed for your return journey to Delhi/Chandigarh by private SUV or Volvo bus. Tour concludes with wonderful memories of Manali.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
      }
    ],
    services: [
      {
        id: 'srv-301',
        dayNumber: 1,
        type: 'Hotel',
        supplier: 'Alpine Chalet Manali',
        title: 'Alpine Chalet Manali - Deluxe Rooms',
        location: 'Manali',
        starCategory: '4 Star',
        roomType: 'Double',
        mealPlan: 'MAP',
        nights: 4,
        rooms: {
          Double: { count: 1, costPerNight: 5000, total: 20000 }
        },
        totalCost: 20000,
        supplierCost: 18500.00,
        autoSupplierCost: true,
        description: 'Valley-facing deluxe rooms for 3 guests (1 extra bed), includes breakfast and dinner daily.'
      },
      {
        id: 'srv-302',
        dayNumber: 1,
        type: 'Transport',
        supplier: 'Himachal Car Rentals',
        title: 'Arrival Transfer - Delhi to Manali',
        vehicleType: 'SUV',
        days: 1,
        dailyRate: 5500.00,
        totalCost: 5500.00,
        supplierCost: 5000.00,
        autoSupplierCost: true,
        description: 'Private SUV pick-up from Delhi/Chandigarh to Manali hotel. Includes driver allowance, tolls, and fuel.'
      },
      {
        id: 'srv-303',
        dayNumber: 2,
        type: 'Transport',
        supplier: 'Himachal Car Rentals',
        title: 'Manali to Solang Valley & Local Sightseeing',
        vehicleType: 'SUV',
        days: 1,
        dailyRate: 3500.00,
        totalCost: 3500.00,
        supplierCost: 3200.00,
        autoSupplierCost: true,
        description: 'Private SUV at disposal for Solang Valley and local sightseeing. Driver allowance included.'
      },
      {
        id: 'srv-304',
        dayNumber: 2,
        type: 'Adventurous Activity',
        supplier: 'Solang Adventure Hub',
        title: 'Solang Valley Adventure Pass',
        location: 'Solang Valley',
        adultCost: 2000.00,
        totalCost: 6000.00,
        supplierCost: 5100.00,
        autoSupplierCost: true,
        description: 'Includes ropeway ride, paragliding short fly, and zorbing coupons for 3 adults.'
      },
      {
        id: 'srv-305',
        dayNumber: 3,
        type: 'Transport',
        supplier: 'Himachal Car Rentals',
        title: 'Full Day Private SUV - Atal Tunnel & Sissu',
        vehicleType: 'SUV',
        days: 1,
        dailyRate: 5000.00,
        totalCost: 5000.00,
        supplierCost: 4500.00,
        autoSupplierCost: true,
        description: 'Guided full-day tour to Sissu Lake, Sissu Waterfall, and Atal Tunnel viewpoints.'
      },
      {
        id: 'srv-306',
        dayNumber: 3,
        type: 'Adventurous Activity',
        supplier: 'Sissu River Camps',
        title: 'Sissu Riverside Activities',
        location: 'Sissu',
        adultCost: 1000.00,
        totalCost: 3000.00,
        supplierCost: 2400.00,
        autoSupplierCost: true,
        description: 'Includes riverside walk and guided river rafting experience in the Chandra River for 3 adults.'
      },
      {
        id: 'srv-307',
        dayNumber: 4,
        type: 'Transport',
        supplier: 'Himachal Car Rentals',
        title: 'Manali to Naggar Heritage Sightseeing',
        vehicleType: 'SUV',
        days: 1,
        dailyRate: 3500.00,
        totalCost: 3500.00,
        supplierCost: 3200.00,
        autoSupplierCost: true,
        description: 'Private SUV for Naggar Castle, Roerich Art Gallery, and nearby temple visits.'
      },
      {
        id: 'srv-308',
        dayNumber: 4,
        type: 'Sightseeing',
        supplier: 'Naggar Tourism',
        title: 'Naggar Castle & Roerich Art Gallery Entry',
        location: 'Naggar',
        adultCost: 833.33,
        totalCost: 2500.00,
        supplierCost: 2100.00,
        autoSupplierCost: true,
        description: 'Entry tickets for Naggar Castle, Roerich Art Gallery, and Tripura Sundari Temple for 3 adults.'
      },
      {
        id: 'srv-309',
        dayNumber: 5,
        type: 'Transport',
        supplier: 'Himachal Car Rentals',
        title: 'Departure Transfer - Manali to Delhi',
        vehicleType: 'SUV',
        days: 1,
        dailyRate: 3500.00,
        totalCost: 3500.00,
        supplierCost: 3200.00,
        autoSupplierCost: true,
        description: 'Private SUV drop from Manali hotel to Delhi/Chandigarh. Includes driver allowance and tolls.'
      }
    ],
    termsAndPolicies: [
      {
        id: 'block-inclusions',
        title: 'Inclusions',
        items: [
          'Accommodation for 4 nights in a 4-star hotel at Manali on MAP plan (breakfast and dinner).',
          'All transfers and sightseeing by private SUV as per the itinerary.',
          'Adventure activity passes for Solang Valley including ropeway and paragliding.',
          'Sissu river activity charges and entry tickets for Naggar Castle & Roerich Gallery.',
          'Driver allowance, toll tax, parking, and fuel charges for included transport.'
        ]
      },
      {
        id: 'block-exclusions',
        title: 'Exclusions',
        items: [
          'Airfare or train fare to and from Delhi/Chandigarh.',
          'Personal expenses such as tips, laundry, telephone calls, and mini bar.',
          'Meals other than those mentioned in the package (lunches are not included).',
          'Travel insurance, medical expenses, and any optional activities not mentioned.',
          'Anything not specifically mentioned under inclusions.'
        ]
      },
      {
        id: 'block-payment',
        title: 'Payment Policy',
        items: [
          '50% advance payment required at the time of confirmation.',
          'Balance 50% to be paid 7 days before the travel date.',
          'Rates are subject to hotel and transport availability until booking is confirmed.'
        ]
      },
      {
        id: 'block-cancellation',
        title: 'Cancellation Policy',
        items: [
          'Cancellation requests must be submitted in writing or email.',
          'Retention charges will apply as per hotel, transport supplier, and company policy.',
          'No refund for unutilized services or no-shows.'
        ]
      }
    ]
  },
  {
    id: 'ITIN-2026-0004',
    name: 'KASHMIR PACKAGE',
    customerName: 'Ananya Sen',
    phone: '+91 91234 56789',
    destination: 'Srinagar, Gulmarg, Pahalgam, Sonmarg',
    coverImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-09-15',
    endDate: '2026-09-22',
    durationDays: 8,
    durationNights: 7,
    travelers: 4,
    adults: 4,
    children: 0,
    infants: 0,
    type: 'Family',
    amount: 50000.00,
    description: 'Beautiful 7-night exploration of Paradise on Earth. Enjoy Dal Lake houseboats, Gondola rides in Gulmarg, and valleys of Pahalgam.',
    status: 'Confirmed',
    createdAt: '2026-07-28T09:00:00.000Z',
    days: [
      { dayNumber: 1, title: 'Srinagar', description: 'Houseboat Check-in & Shikara Ride', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 2, title: 'Srinagar', description: 'Mughal Gardens Sightseeing', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 3, title: 'Gulmarg', description: 'Travel to Gulmarg & Gondola Ride', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 4, title: 'Gulmarg', description: 'Skiing & Winter Sports activity', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 5, title: 'Pahalgam', description: 'Drive to Pahalgam & Betaab Valley', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 6, title: 'Pahalgam', description: 'Aru Valley & Pony Rides', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 7, title: 'Sonmarg', description: 'Day trip to Golden Meadow', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 8, title: 'Srinagar', description: 'Departure', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      {
        id: 'srv-401',
        dayNumber: 1,
        type: 'Hotel',
        supplier: 'Royal Houseboats Srinagar',
        title: 'Premium Houseboat Stay - Dal Lake',
        location: 'Srinagar',
        starCategory: '5 Star',
        roomType: 'Double',
        mealPlan: 'MAP',
        nights: 2,
        rooms: { Double: { count: 2, costPerNight: 5000, total: 20000 } },
        totalCost: 20000,
        description: 'Includes traditional Kashmiri dinner and breakfast.'
      },
      {
        id: 'srv-402',
        dayNumber: 3,
        type: 'Hotel',
        supplier: 'The Grand Gulmarg',
        title: 'Grand Gulmarg Resort - Twin Rooms',
        location: 'Gulmarg',
        starCategory: '4 Star',
        roomType: 'Double',
        mealPlan: 'CP',
        nights: 2,
        rooms: { Double: { count: 2, costPerNight: 6000, total: 24000 } },
        totalCost: 24000,
        description: 'Heated rooms with views of Afarwat peak.'
      },
      {
        id: 'srv-403',
        dayNumber: 1,
        type: 'Cruise',
        title: 'Private Shikara Ride on Dal Lake',
        fromPort: 'Ghat 14',
        toPort: 'Floating Gardens',
        day: 'Day 1',
        returnDay: 'Day 1',
        cabinShip: 'Traditional Shikara boat',
        adultCost: 1500.00,
        totalCost: 6000.00,
        description: '2-hour sunset cruise.'
      }
    ]
  },
  {
    id: 'ITIN-2026-0005',
    name: 'LUXURY KASHMIR',
    customerName: 'Kabir Oberoi',
    phone: '+91 98888 77777',
    destination: 'Srinagar, Gulmarg, Pahalgam',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-10-01',
    endDate: '2026-10-06',
    durationDays: 6,
    durationNights: 5,
    travelers: 2,
    adults: 2,
    children: 0,
    infants: 0,
    type: 'Honeymoon',
    amount: 75000.00,
    description: 'An absolute luxury honeymoon package featuring stays at Khyber Resort Gulmarg, Taj Vivanta Srinagar, and private heli-charter options.',
    status: 'Quoted',
    createdAt: '2026-07-29T10:15:00.000Z',
    days: [
      { dayNumber: 1, title: 'Srinagar', description: 'Airport pick-up and Vivanta Taj check-in', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 2, title: 'Srinagar', description: 'Private Shikara boat and Shankaracharya tour', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 3, title: 'Gulmarg', description: 'Drive to Gulmarg, stay at The Khyber', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 4, title: 'Gulmarg', description: 'Gondola Stage 2 and golf course walking', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 5, title: 'Pahalgam', description: 'Transfer to Pahalgam and riverside walk', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 6, title: 'Srinagar', description: 'Transfer back and return flight', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      {
        id: 'srv-501',
        dayNumber: 3,
        type: 'Hotel',
        supplier: 'The Khyber Resort Gulmarg',
        title: 'The Khyber Himalayan Resort - Luxury Room',
        location: 'Gulmarg',
        starCategory: 'Luxury',
        roomType: 'Suite',
        mealPlan: 'MAP',
        nights: 2,
        rooms: { Double: { count: 1, costPerNight: 25000, total: 50000 } },
        totalCost: 50000,
        description: 'World class wellness spa resort in Gulmarg.'
      },
      {
        id: 'srv-502',
        dayNumber: 1,
        type: 'Hotel',
        supplier: 'Taj Vivanta Srinagar',
        title: 'Vivanta Dal View Srinagar - Deluxe Room',
        location: 'Srinagar',
        starCategory: 'Luxury',
        roomType: 'Double',
        mealPlan: 'CP',
        nights: 2,
        rooms: { Double: { count: 1, costPerNight: 12500, total: 25000 } },
        totalCost: 25000,
        description: 'Stunning panoramic views of Dal lake from the hilltop.'
      }
    ]
  },
  {
    id: 'ITIN-2026-0006',
    name: 'Manali Getaway',
    customerName: 'Neha Kapoor',
    phone: '+91 99988 88899',
    destination: 'Manali',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-08-10',
    endDate: '2026-08-14',
    durationDays: 4,
    durationNights: 3,
    travelers: 2,
    adults: 2,
    children: 0,
    infants: 0,
    type: 'Honeymoon',
    amount: 18500.00,
    description: 'Perfect budget-friendly weekend getaway to Himachal Pradesh hills.',
    status: 'Draft',
    createdAt: '2026-07-30T11:00:00.000Z',
    days: [
      { dayNumber: 1, title: 'Manali', description: 'Arrival and local exploring', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 2, title: 'Manali', description: 'Hadimba Temple and Club House', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 3, title: 'Manali', description: 'Solang Valley sightseeing', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 4, title: 'Manali', description: 'Shopping and departure', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      {
        id: 'srv-601',
        dayNumber: 1,
        type: 'Hotel',
        supplier: 'Snow Valley Resorts',
        title: 'Snow Valley Resort - Standard Double',
        location: 'Manali',
        starCategory: '3 Star',
        roomType: 'Double',
        mealPlan: 'CP',
        nights: 3,
        rooms: { Double: { count: 1, costPerNight: 3500, total: 10500 } },
        totalCost: 10500,
        description: 'Comfortable family budget rooms.'
      },
      {
        id: 'srv-602',
        dayNumber: 1,
        type: 'Transport',
        title: 'Private Sedan Airport Pick-up & Tour',
        vehicleType: 'Sedan',
        days: 4,
        dailyRate: 2000,
        totalCost: 8000,
        description: 'Toyota Etios at disposal for local sightseeing.'
      }
    ]
  },
  {
    id: 'ITIN-2026-0007',
    name: 'Luxury Kashmir Package',
    customerName: 'Priya Patel',
    phone: '+91 97766 55443',
    destination: 'kashmir',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-09-01',
    endDate: '2026-09-08',
    durationDays: 7,
    durationNights: 6,
    travelers: 2,
    adults: 2,
    children: 0,
    infants: 0,
    type: 'Honeymoon',
    amount: 65000.00,
    description: 'An elegant premium holiday across Srinagar, Gulmarg, and Betaab Valley.',
    status: 'Draft',
    createdAt: '2026-07-29T15:00:00.000Z',
    days: [
      { dayNumber: 1, title: 'kashmir', description: 'Arrival and luxury stay', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 2, title: 'kashmir', description: 'Private boat tour & Srinagar parks', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 3, title: 'kashmir', description: 'Gulmarg Gondola tour', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 4, title: 'kashmir', description: 'Excursion and golf walk', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 5, title: 'kashmir', description: 'Transfer to Pahalgam', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 6, title: 'kashmir', description: 'Aru and Betaab sightseeing', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 7, title: 'kashmir', description: 'Departure', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      {
        id: 'srv-701',
        dayNumber: 1,
        type: 'Hotel',
        supplier: 'Premium Hotel Group',
        title: 'Premium Mountain Chalet stay - Kashmir',
        location: 'Kashmir',
        starCategory: '5 Star',
        roomType: 'Suite',
        mealPlan: 'MAP',
        nights: 6,
        rooms: { Double: { count: 1, costPerNight: 9000, total: 54000 } },
        totalCost: 54000,
        description: 'Super deluxe cottage room with snow peak views.'
      },
      {
        id: 'srv-702',
        dayNumber: 3,
        type: 'Adventurous Activity',
        title: 'Gulmarg Gondola Ride Level 1 & 2 tickets',
        location: 'Gulmarg',
        adultCost: 5500,
        totalCost: 11000,
        description: 'Skip the line tickets for Gondola phase 1 and 2.'
      }
    ]
  },
  {
    id: 'ITIN-2026-0008',
    name: '03 NIGHT 04 DAYS MANALI',
    customerName: 'Rahul Verma',
    phone: '+91 98888 11122',
    destination: 'Manali',
    coverImage: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-08-20',
    endDate: '2026-08-24',
    durationDays: 4,
    durationNights: 3,
    travelers: 2,
    adults: 2,
    children: 0,
    infants: 0,
    type: 'Friends',
    amount: 15000.00,
    description: 'Short sweet Manali adventure including Solang Valley and Mall Road shopping.',
    status: 'Quoted',
    createdAt: '2026-07-30T12:00:00.000Z',
    days: [
      { dayNumber: 1, title: 'Manali', description: 'Arrival and check-in to Riverside Cottages', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 2, title: 'Manali', description: 'Excursion to Solang Valley', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 3, title: 'Manali', description: 'Old Manali and market walking', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80' },
      { dayNumber: 4, title: 'Manali', description: 'Departure', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      {
        id: 'srv-801',
        dayNumber: 1,
        type: 'Hotel',
        supplier: 'Manali View Hotel',
        title: 'Manali View Cottages - Double Bed',
        location: 'Manali',
        starCategory: '3 Star',
        roomType: 'Double',
        mealPlan: 'CP',
        nights: 3,
        rooms: { Double: { count: 1, costPerNight: 3000, total: 9000 } },
        totalCost: 9000,
        description: 'Standard breakfast buffet included.'
      },
      {
        id: 'srv-802',
        dayNumber: 2,
        type: 'Transport',
        title: 'Private Hatchback Rental',
        vehicleType: 'Sedan',
        days: 3,
        dailyRate: 2000,
        totalCost: 6000,
        description: 'Hatchback cab with local driver for transfer and tour.'
      }
    ]
  }
];
