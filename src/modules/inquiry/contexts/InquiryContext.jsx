import { createContext, useContext, useState } from 'react';

const InquiryContext = createContext(null);

const INITIAL_LEADS = [
  {
    id: 'Q/26/1961922',
    clientName: 'Ritika Sharma',
    phone: '+91-98710 77224',
    email: 'ritika.sharma@example.com',
    pax: 4,
    destination: 'Bali',
    requirement: 'Family',
    source: 'Manual',
    budget: 'INR 3.2L - 4.0L',
    travelStart: '10-Jun-26',
    travelEnd: '16-Jun-26',
    description: 'Family vacation request with villa + activities preference.',
    date: '04-May-26 09:40',
    lastUpdated: '04-May-26 14:10',
    stage: 'Contacted',
    priority: 'Warm',
    assignedSalesUser: 'Priya Nair',
    assignedOpsUser: 'Amit Kumar',
    operationsFocus: 'Confirmed',
    customerFocus: 'Customer Profiles',
    contactChannel: 'Email',
    financeFocus: 'Invoice',
    itineraryState: 'Inventory',
    status: 'Active',
  },
  {
    id: 'Q/26/1961923',
    clientName: 'Aarav Patel',
    phone: '+91-98201 12345',
    email: 'aarav.patel@example.com',
    pax: 2,
    destination: 'Maldives',
    requirement: 'Honeymoon',
    source: 'Website',
    budget: 'INR 2.0L - 2.8L',
    travelStart: '15-Jul-26',
    travelEnd: '20-Jul-26',
    description: 'Overwater bungalow request with all-inclusive meal plan.',
    date: '03-May-26 11:15',
    lastUpdated: '04-May-26 10:30',
    stage: 'New',
    priority: 'Hot',
    assignedSalesUser: 'Priya Nair',
    assignedOpsUser: 'Vikram Singh',
    operationsFocus: 'Pending',
    customerFocus: 'New Lead',
    contactChannel: 'WhatsApp',
    financeFocus: 'Draft Quote',
    itineraryState: 'Customized',
    status: 'Active',
  },
  {
    id: 'Q/26/1961924',
    clientName: 'Sameer Malhotra',
    phone: '+91-99100 55432',
    email: 'sameer.m@example.com',
    pax: 3,
    destination: 'Europe',
    requirement: 'Group',
    source: 'Repeat Customers',
    budget: 'INR 5.0L - 6.5L',
    travelStart: '01-Aug-26',
    travelEnd: '12-Aug-26',
    description: 'Multi-city tour: Switzerland & Paris for repeat family client.',
    date: '02-May-26 16:20',
    lastUpdated: '03-May-26 15:45',
    stage: 'Contacted',
    priority: 'Cold',
    assignedSalesUser: 'Neha Gupta',
    assignedOpsUser: 'Amit Kumar',
    operationsFocus: 'In Progress',
    customerFocus: 'VIP Profile',
    contactChannel: 'Call',
    financeFocus: 'Advance Received',
    itineraryState: 'Locked',
    status: 'Active',
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

    const newLead = {
      id: `Q/26/${newIdNumber}`,
      clientName: leadData.clientName || 'New Client',
      phone: leadData.phone || '',
      email: leadData.email || '',
      pax: parseInt(leadData.pax, 10) || 1,
      destination: leadData.destination || '',
      requirement: leadData.requirement || 'Family',
      source: leadData.source || 'Manual',
      budget: leadData.budget || 'INR 1.5L - 2.5L',
      travelStart: leadData.travelStart || '',
      travelEnd: leadData.travelEnd || '',
      description: leadData.description || '',
      date: formattedDate,
      lastUpdated: formattedDate,
      stage: 'New',
      priority: 'Warm',
      assignedSalesUser: 'Priya Nair',
      assignedOpsUser: 'Amit Kumar',
      operationsFocus: 'Pending',
      customerFocus: 'New Enquiry',
      contactChannel: 'Email',
      financeFocus: 'Pending',
      itineraryState: 'Draft',
      status: 'Active',
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
      prev.map((lead) =>
        lead.id === id ? { ...lead, ...updatedFields, lastUpdated: formattedDate } : lead
      )
    );
  };

  const assignUsers = (ids, { salesUser, opsUser }) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (ids.includes(lead.id)) {
          return {
            ...lead,
            ...(salesUser ? { assignedSalesUser: salesUser } : {}),
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
