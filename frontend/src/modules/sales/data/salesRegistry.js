/**
 * salesRegistry.js
 * -----------------------------------------------------------------------
 * Centralized relational mock data registry for the Sales Engine module.
 * Establishes end-to-end data relationships between:
 * Customer (CUST-x) -> Lead (LD-x) -> Proposal (PR-x) -> Follow-up (FLP-x) -> Negotiation (NEG-x) -> Soft Confirm (CONF-x) -> Confirmed Booking (BOOK-x)
 */

export const SALES_CUSTOMERS = [
  {
    id: 'CUST-1001',
    name: 'Rohan & Anjali Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 98201 12345',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    nationality: 'Indian',
  },
  {
    id: 'CUST-1002',
    name: 'Siddharth Verma',
    email: 'siddharth.verma@example.com',
    phone: '+91 98111 48333',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    nationality: 'Indian',
  },
  {
    id: 'CUST-1003',
    name: 'The Khanna Family',
    email: 'khanna.family@example.com',
    phone: '+91 98200 11451',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    nationality: 'Indian',
  },
  {
    id: 'CUST-1004',
    name: 'Kabir & Aditi Rao',
    email: 'kabir.rao@example.com',
    phone: '+91 97444 22100',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    nationality: 'Indian',
  },
  {
    id: 'CUST-1005',
    name: 'Vikram & Nisha Patel',
    email: 'vikram.patel@example.com',
    phone: '+91 99333 88122',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    nationality: 'Indian',
  },
];

export const SALES_RELATIONSHIPS = [
  {
    customerId: 'CUST-1001',
    leadId: 'LD-1001',
    proposalId: 'PR-2601',
    followUpId: 'FLP-301',
    negotiationId: 'NEG-201',
    softConfirmId: 'CONF-101',
    bookingId: 'BOOK-101',
    itineraryId: 'ITIN-401',
    customerName: 'Rohan & Anjali Mehta',
    destination: 'Bali, Indonesia',
    departureCity: 'Mumbai',
    travelDate: '2026-08-15',
    returnDate: '2026-08-22',
    pax: '2 Adults',
    packageType: 'Honeymoon',
    amount: 240000,
    executive: 'Priya Sharma',
    currentStage: 'Follow Up',
  },
  {
    customerId: 'CUST-1002',
    leadId: 'LD-1002',
    proposalId: 'PR-2602',
    followUpId: 'FLP-302',
    negotiationId: 'NEG-202',
    softConfirmId: 'CONF-102',
    bookingId: 'BOOK-102',
    itineraryId: 'ITIN-402',
    customerName: 'Siddharth Verma',
    destination: 'Kerala, India',
    departureCity: 'Delhi',
    travelDate: '2026-09-05',
    returnDate: '2026-09-10',
    pax: '2 Adults',
    packageType: 'FIT',
    amount: 120000,
    executive: 'Arjun Nair',
    currentStage: 'Proposal Viewed',
  },
  {
    customerId: 'CUST-1003',
    leadId: 'LD-1003',
    proposalId: 'PR-2603',
    followUpId: 'FLP-303',
    negotiationId: 'NEG-203',
    softConfirmId: 'CONF-103',
    bookingId: 'BOOK-103',
    itineraryId: 'ITIN-403',
    customerName: 'The Khanna Family',
    destination: 'Rajasthan, India',
    departureCity: 'Mumbai',
    travelDate: '2026-10-11',
    returnDate: '2026-10-21',
    pax: '5 (3A, 2C)',
    packageType: 'Family',
    amount: 385000,
    executive: 'Meera Pillai',
    currentStage: 'Negotiation',
  },
  {
    customerId: 'CUST-1004',
    leadId: 'LD-1004',
    proposalId: 'PR-2604',
    followUpId: 'FLP-304',
    negotiationId: 'NEG-204',
    softConfirmId: 'CONF-104',
    bookingId: 'BOOK-104',
    itineraryId: 'ITIN-404',
    customerName: 'Kabir & Aditi Rao',
    destination: 'Andaman Islands',
    departureCity: 'Bengaluru',
    travelDate: '2026-11-01',
    returnDate: '2026-11-07',
    pax: '2 Adults',
    packageType: 'Honeymoon',
    amount: 195000,
    executive: 'Karan Malhotra',
    currentStage: 'Draft Proposal',
  },
  {
    customerId: 'CUST-1005',
    leadId: 'LD-1005',
    proposalId: 'PR-2605',
    followUpId: 'FLP-305',
    negotiationId: 'NEG-205',
    softConfirmId: 'CONF-105',
    bookingId: 'BOOK-105',
    itineraryId: 'ITIN-405',
    customerName: 'Vikram & Nisha Patel',
    destination: 'Switzerland',
    departureCity: 'Mumbai',
    travelDate: '2026-12-04',
    returnDate: '2026-12-15',
    pax: '2 Adults',
    packageType: 'Honeymoon',
    amount: 485000,
    executive: 'Priya Sharma',
    currentStage: 'Soft Confirm',
  },
];

/** Lookup helper by any record ID */
export const findRelationalRecord = (id) => {
  if (!id) return null;
  return SALES_RELATIONSHIPS.find(
    (rel) =>
      rel.customerId === id ||
      rel.leadId === id ||
      rel.proposalId === id ||
      rel.followUpId === id ||
      rel.negotiationId === id ||
      rel.softConfirmId === id ||
      rel.bookingId === id
  );
};
