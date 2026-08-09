import { createContext, useContext, useState } from 'react';

const InquiryContext = createContext(null);

export const INITIAL_LEADS = [
  {
    id: 'Q/26/1961922',

    // Section 1: Basic Information
    name: 'Ritika Sharma',
    clientName: 'Ritika Sharma',
    contactPhone: '+91 98710 77224',
    phone: '+91 98710 77224',
    alternatePhone: '+91 98765 40000',
    contactEmail: 'ritika.sharma@example.com',
    email: 'ritika.sharma@example.com',
    whatsappNumber: '+91 98710 77224',
    companyName: 'Sharma & Sons Consultancy',

    // Section 2: Travel Information
    destination: 'Bali',
    destinations: ['Bali, Indonesia'],
    departureCity: 'Delhi',
    travelStart: '10-Jun-26',
    travelEnd: '16-Jun-26',
    departureDate: '2026-06-10',
    returnDate: '2026-06-16',
    pax: 4,
    totalPax: 4,
    adults: 2,
    children: 2,
    infants: 0,
    childAges: ['5 years', '8 years'],
    infantAges: [],
    durationNights: 6,
    durationDays: 7,
    travelType: 'International',
    requirement: 'Family',
    packageType: 'Family',
    inquiryType: 'Family',
    travelPurpose: 'Family',

    // Section 3: Customer Preferences
    budget: 'INR 3.2L - 4.0L',
    estimatedDealValue: 350000,
    hotelCategory: '4★',
    mealPreference: 'Breakfast Only',
    flightRequired: true,
    trainRequired: false,
    cabRequired: true,
    visaRequired: true,
    passportAvailable: true,
    travelInsuranceRequired: true,

    // Section 4: Lead Management
    status: 'Contacted',
    leadStatus: 'Contacted',
    stage: 'Contacted',
    priority: 'Warm',
    temperature: 'Warm',
    assignedSalesUser: 'Priya Nair',
    salesExecutive: 'Priya Nair',
    assignedOpsUser: 'Amit Kumar',
    source: 'Manual',
    leadSource: 'Manual',
    expectedBookingDate: '2026-05-20',
    probabilityPct: 75,

    // Section 5: Follow-up Information
    lastContactDate: '2026-05-04',
    nextFollowupDate: '2026-05-08',
    followupMode: 'WhatsApp',
    followupNotes: 'Client discussed beach villa options. Scheduled call for Friday afternoon.',

    // Section 6: Customer Requirements
    description: 'Family vacation request for 4 pax (2 adults + 2 kids aged 5 & 8). Prefers 4★ resort with pool + private speedboat transfers.',
    customerRequirements: 'Family vacation request for 4 pax (2 adults + 2 kids aged 5 & 8). Prefers 4★ resort with pool + private speedboat transfers.',

    // Section 7: Internal Notes
    internalNotes: 'Customer prefers evening calls after 6 PM. Price-sensitive regarding flight upgrades.',

    // Operational state metadata
    date: '04-May-26 09:40',
    registrationDate: '2026-05-04T09:40:00+05:30',
    lastUpdated: '04-May-26 14:10',
    operationsFocus: 'Confirmed',
    customerFocus: 'Customer Profiles',
    contactChannel: 'WhatsApp',
    financeFocus: 'Invoice',
    itineraryState: 'Inventory',
    activeStatus: 'Active',
  },
  {
    id: 'Q/26/1961923',

    // Section 1: Basic Information
    name: 'Aarav Patel',
    clientName: 'Aarav Patel',
    contactPhone: '+91 98201 12345',
    phone: '+91 98201 12345',
    alternatePhone: '',
    contactEmail: 'aarav.patel@example.com',
    email: 'aarav.patel@example.com',
    whatsappNumber: '+91 98201 12345',
    companyName: '',

    // Section 2: Travel Information
    destination: 'Maldives',
    destinations: ['Maldives'],
    departureCity: 'Mumbai',
    travelStart: '15-Jul-26',
    travelEnd: '20-Jul-26',
    departureDate: '2026-07-15',
    returnDate: '2026-07-20',
    pax: 2,
    totalPax: 2,
    adults: 2,
    children: 0,
    infants: 0,
    childAges: [],
    infantAges: [],
    durationNights: 5,
    durationDays: 6,
    travelType: 'International',
    requirement: 'Honeymoon',
    packageType: 'Honeymoon',
    inquiryType: 'Honeymoon',
    travelPurpose: 'Honeymoon',

    // Section 3: Customer Preferences
    budget: 'INR 2.0L - 2.8L',
    estimatedDealValue: 240000,
    hotelCategory: 'Luxury Resort',
    mealPreference: 'All Inclusive',
    flightRequired: true,
    trainRequired: false,
    cabRequired: false,
    visaRequired: false,
    passportAvailable: true,
    travelInsuranceRequired: false,

    // Section 4: Lead Management
    status: 'New',
    leadStatus: 'New',
    stage: 'New',
    priority: 'Hot',
    temperature: 'Hot',
    assignedSalesUser: 'Priya Nair',
    salesExecutive: 'Priya Nair',
    assignedOpsUser: 'Vikram Singh',
    source: 'Website',
    leadSource: 'Website',
    expectedBookingDate: '2026-05-15',
    probabilityPct: 90,

    // Section 5: Follow-up Information
    lastContactDate: '2026-05-03',
    nextFollowupDate: '2026-05-05',
    followupMode: 'Call',
    followupNotes: 'Send overwater bungalow options with all-inclusive meal plan details.',

    // Section 6: Customer Requirements
    description: 'Honeymoon trip to Maldives. Wants overwater villa with private plunge pool and sunset view.',
    customerRequirements: 'Honeymoon trip to Maldives. Wants overwater villa with private plunge pool and sunset view.',

    // Section 7: Internal Notes
    internalNotes: 'High intent customer. Wants quote within 24 hours.',

    // Operational state metadata
    date: '03-May-26 11:15',
    registrationDate: '2026-05-03T11:15:00+05:30',
    lastUpdated: '04-May-26 10:30',
    operationsFocus: 'Pending',
    customerFocus: 'New Lead',
    contactChannel: 'Call',
    financeFocus: 'Draft Quote',
    itineraryState: 'Customized',
    activeStatus: 'Active',
  },
  {
    id: 'Q/26/1961924',

    // Section 1: Basic Information
    name: 'Sameer Malhotra',
    clientName: 'Sameer Malhotra',
    contactPhone: '+91 99100 55432',
    phone: '+91 99100 55432',
    alternatePhone: '+91 99100 11111',
    contactEmail: 'sameer.m@example.com',
    email: 'sameer.m@example.com',
    whatsappNumber: '+91 99100 55432',
    companyName: 'Malhotra Tech Solutions',

    // Section 2: Travel Information
    destination: 'Europe',
    destinations: ['Switzerland', 'Paris, France'],
    departureCity: 'Bengaluru',
    travelStart: '01-Aug-26',
    travelEnd: '12-Aug-26',
    departureDate: '2026-08-01',
    returnDate: '2026-08-12',
    pax: 3,
    totalPax: 3,
    adults: 2,
    children: 1,
    infants: 0,
    childAges: ['12 years'],
    infantAges: [],
    durationNights: 11,
    durationDays: 12,
    travelType: 'International',
    requirement: 'Group',
    packageType: 'Group',
    inquiryType: 'Group',
    travelPurpose: 'Group',

    // Section 3: Customer Preferences
    budget: 'INR 5.0L - 6.5L',
    estimatedDealValue: 580000,
    hotelCategory: '5★',
    mealPreference: 'Half Board',
    flightRequired: true,
    trainRequired: true,
    cabRequired: true,
    visaRequired: true,
    passportAvailable: true,
    travelInsuranceRequired: true,

    // Section 4: Lead Management
    status: 'Interested',
    leadStatus: 'Interested',
    stage: 'Contacted',
    priority: 'Cold',
    temperature: 'Cold',
    assignedSalesUser: 'Neha Gupta',
    salesExecutive: 'Neha Gupta',
    assignedOpsUser: 'Amit Kumar',
    source: 'Repeat Customers',
    leadSource: 'Repeat Customers',
    expectedBookingDate: '2026-06-01',
    probabilityPct: 50,

    // Section 5: Follow-up Information
    lastContactDate: '2026-05-02',
    nextFollowupDate: '2026-05-10',
    followupMode: 'Email',
    followupNotes: 'Repeat client. Sent tentative itinerary for Swiss Alps + Paris train route.',

    // Section 6: Customer Requirements
    description: 'Multi-city Europe package for repeat family client. Swiss Travel Pass & Disneyland Paris tickets required.',
    customerRequirements: 'Multi-city Europe package for repeat family client. Swiss Travel Pass & Disneyland Paris tickets required.',

    // Section 7: Internal Notes
    internalNotes: 'VIP Repeat Client. Eligible for 5% loyalty discount.',

    // Operational state metadata
    date: '02-May-26 16:20',
    registrationDate: '2026-05-02T16:20:00+05:30',
    lastUpdated: '03-May-26 15:45',
    operationsFocus: 'In Progress',
    customerFocus: 'VIP Profile',
    contactChannel: 'Email',
    financeFocus: 'Advance Received',
    itineraryState: 'Locked',
    activeStatus: 'Active',
  },
];

export function InquiryProvider({ children }) {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [drawerLeadId, setDrawerLeadId] = useState(null);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (leadToEdit) => {
    setEditingLead(leadToEdit);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingLead(null);
  };

  const openDrawer = (id) => setDrawerLeadId(id);
  const closeDrawer = () => setDrawerLeadId(null);

  const addLead = (leadData) => {
    const newIdNumber = 1961925 + leads.length;
    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) +
      ' ' +
      now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const totalPax =
      (parseInt(leadData.adults, 10) || 0) +
      (parseInt(leadData.children, 10) || 0) +
      (parseInt(leadData.infants, 10) || 0) ||
      parseInt(leadData.pax, 10) || 1;

    const clientName = leadData.clientName || leadData.name || 'New Client';
    const phone = leadData.phone || leadData.contactPhone || '';
    const email = leadData.email || leadData.contactEmail || '';
    const destination = Array.isArray(leadData.destination)
      ? leadData.destination.join(', ')
      : leadData.destination || leadData.destinations?.[0] || '';
    const travelPurpose = leadData.travelPurpose || leadData.inquiryType || leadData.requirement || 'Leisure';

    const newLead = {
      id: `Q/26/${newIdNumber}`,

      // Section 1: Basic Information
      name: clientName,
      clientName: clientName,
      phone: phone,
      contactPhone: phone,
      alternatePhone: leadData.alternatePhone || '',
      email: email,
      contactEmail: email,
      whatsappNumber: leadData.whatsappNumber || phone,
      companyName: leadData.companyName || '',

      // Section 2: Travel Information
      destination: destination,
      destinations: Array.isArray(leadData.destination) ? leadData.destination : [destination],
      departureCity: leadData.departureCity || '',
      travelStart: leadData.travelStart || leadData.departureDate || '',
      travelEnd: leadData.travelEnd || leadData.returnDate || '',
      departureDate: leadData.departureDate || leadData.travelStart || '',
      returnDate: leadData.returnDate || leadData.travelEnd || '',
      pax: totalPax,
      totalPax: totalPax,
      adults: parseInt(leadData.adults, 10) || totalPax,
      children: parseInt(leadData.children, 10) || 0,
      infants: parseInt(leadData.infants, 10) || 0,
      childAges: Array.isArray(leadData.childAges) ? leadData.childAges : [],
      infantAges: Array.isArray(leadData.infantAges) ? leadData.infantAges : [],
      durationNights: leadData.durationNights || 5,
      durationDays: (leadData.durationNights || 5) + 1,
      travelType: leadData.travelType || 'Domestic',
      requirement: travelPurpose,
      packageType: travelPurpose,
      inquiryType: travelPurpose,
      travelPurpose: travelPurpose,

      // Section 3: Customer Preferences
      budget: leadData.budget || 'INR 1.5L - 2.5L',
      estimatedDealValue: leadData.estimatedDealValue || 150000,
      hotelCategory: leadData.hotelCategory || '4★',
      mealPreference: leadData.mealPreference || 'Breakfast Only',
      flightRequired: Boolean(leadData.flightRequired),
      trainRequired: Boolean(leadData.trainRequired),
      cabRequired: Boolean(leadData.cabRequired),
      visaRequired: Boolean(leadData.visaRequired),
      passportAvailable: Boolean(leadData.passportAvailable),
      travelInsuranceRequired: Boolean(leadData.travelInsuranceRequired),

      // Section 4: Lead Management
      status: leadData.leadStatus || leadData.status || 'New',
      leadStatus: leadData.leadStatus || leadData.status || 'New',
      stage: leadData.stage || 'New',
      priority: leadData.priority || leadData.temperature || 'Warm',
      temperature: leadData.temperature || leadData.priority || 'Warm',
      assignedSalesUser: leadData.assignedSalesUser || leadData.salesExecutive || 'Priya Nair',
      salesExecutive: leadData.salesExecutive || leadData.assignedSalesUser || 'Priya Nair',
      assignedOpsUser: leadData.assignedOpsUser || 'Amit Kumar',
      source: leadData.source || leadData.leadSource || 'Manual',
      leadSource: leadData.leadSource || leadData.source || 'Manual',
      expectedBookingDate: leadData.expectedBookingDate || '',
      probabilityPct: leadData.probabilityPct !== undefined ? leadData.probabilityPct : 50,

      // Section 5: Follow-up Information
      lastContactDate: leadData.lastContactDate || formattedDate,
      nextFollowupDate: leadData.nextFollowupDate || '',
      followupMode: leadData.followupMode || 'WhatsApp',
      followupNotes: leadData.followupNotes || '',

      // Section 6: Customer Requirements
      description: leadData.customerRequirements || leadData.description || '',
      customerRequirements: leadData.customerRequirements || leadData.description || '',

      // Section 7: Internal Notes
      internalNotes: leadData.internalNotes || '',

      // Operational state metadata
      date: formattedDate,
      registrationDate: now.toISOString(),
      lastUpdated: formattedDate,
      operationsFocus: 'Pending',
      customerFocus: 'New Enquiry',
      contactChannel: leadData.followupMode || 'WhatsApp',
      financeFocus: 'Pending',
      itineraryState: 'Draft',
      activeStatus: 'Active',
    };

    setLeads((prev) => [newLead, ...prev]);
    closeAddModal();
  };

  const updateLead = (id, updatedFields) => {
    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) +
      ' ' +
      now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const clientName = updatedFields.clientName || updatedFields.name || lead.clientName;
          const phone = updatedFields.phone || updatedFields.contactPhone || lead.phone;
          const email = updatedFields.email || updatedFields.contactEmail || lead.email;
          const destination =
            updatedFields.destination ||
            (Array.isArray(updatedFields.destinations) ? updatedFields.destinations.join(', ') : lead.destination);
          const priority = updatedFields.priority || updatedFields.temperature || lead.priority;
          const salesExec =
            updatedFields.assignedSalesUser || updatedFields.salesExecutive || lead.assignedSalesUser;
          const travelPurpose =
            updatedFields.travelPurpose || updatedFields.inquiryType || updatedFields.requirement || lead.travelPurpose;

          return {
            ...lead,
            ...updatedFields,
            clientName,
            name: clientName,
            phone,
            contactPhone: phone,
            email,
            contactEmail: email,
            destination,
            priority,
            temperature: priority,
            assignedSalesUser: salesExec,
            salesExecutive: salesExec,
            travelPurpose,
            inquiryType: travelPurpose,
            requirement: travelPurpose,
            packageType: travelPurpose,
            lastUpdated: formattedDate,
          };
        }
        return lead;
      })
    );
  };

  const assignUsers = (ids, { salesUser, opsUser }) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (ids.includes(lead.id)) {
          return {
            ...lead,
            ...(salesUser ? { assignedSalesUser: salesUser, salesExecutive: salesUser } : {}),
            ...(opsUser ? { assignedOpsUser: opsUser } : {}),
          };
        }
        return lead;
      })
    );
  };

  const drawerLead = leads.find((l) => l.id === drawerLeadId) || null;

  return (
    <InquiryContext.Provider
      value={{
        leads,
        isAddModalOpen,
        openAddModal,
        closeAddModal,
        isEditModalOpen,
        editingLead,
        openEditModal,
        closeEditModal,
        addLead,
        updateLead,
        assignUsers,
        selectedLeadId,
        setSelectedLeadId,
        drawerLead,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
