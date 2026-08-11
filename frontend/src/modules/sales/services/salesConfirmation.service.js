/**
 * salesConfirmation.service.js
 * -----------------------------------------------------------------------
 * Service layer for the Confirmation workflow (Soft Confirm, Confirmed, Rejected).
 * Keeps UI components decoupled from state logic and backend APIs.
 */

import * as itineraryService from '@services/itinerary.service';
import * as operationsService from '@services/operations.service';

export const INITIAL_CONFIRMATION_RECORDS = [
  {
    confirmationId: 'CNF-501',
    leadId: 'LD-1005',
    customerId: 'CUST-1005',
    proposalId: 'PR-2605',
    negotiationId: 'NEG-402',
    bookingId: null,
    itineraryId: null,
    customer: 'Vikram & Nisha Patel',
    email: 'vikram.patel@example.com',
    phone: '+91 99333 88122',
    destination: 'Switzerland',
    travelDates: '04 Dec 2026 - 15 Dec 2026',
    amount: 485000,
    paymentStatus: 'Awaiting Payment',
    documentStatus: '1 of 2',
    executive: 'Priya Sharma',
    status: 'soft_confirm',
    date: '2026-08-01',
    softConfirmDate: '2026-08-01T11:30:00+05:30',
    notes: [
      'Customer agreed conditionally on Glacier Express option',
      'Awaiting initial deposit token',
    ],
    history: [
      { timestamp: '2026-08-01T11:30:00+05:30', action: 'Moved to Soft Confirm', user: 'Priya Sharma' },
    ],
  },
  {
    confirmationId: 'CNF-502',
    leadId: 'LD-1003',
    customerId: 'CUST-1003',
    proposalId: 'PR-2603',
    negotiationId: 'NEG-401',
    bookingId: 'BK-702',
    itineraryId: 'ITIN-302',
    customer: 'The Khanna Family',
    email: 'khanna.family@example.com',
    phone: '+91 98200 11451',
    destination: 'Rajasthan',
    travelDates: '11 Oct 2026 - 21 Oct 2026',
    amount: 385000,
    paymentStatus: 'Received',
    documentStatus: '2 of 2',
    executive: 'Meera Pillai',
    status: 'confirmed',
    date: '2026-07-29',
    softConfirmDate: '2026-07-27T14:20:00+05:30',
    confirmationDate: '2026-07-29T17:20:00+05:30',
    notes: [
      'Deposit received ₹1,00,000',
      'Identity documents verified',
    ],
    history: [
      { timestamp: '2026-07-27T14:20:00+05:30', action: 'Moved to Soft Confirm', user: 'Meera Pillai' },
      { timestamp: '2026-07-29T17:20:00+05:30', action: 'Marked Confirmed → Booking BK-702 & Itinerary ITIN-302 created', user: 'Meera Pillai' },
    ],
  },
  {
    confirmationId: 'CNF-503',
    leadId: 'LD-1002',
    customerId: 'CUST-1002',
    proposalId: 'PR-2602',
    negotiationId: 'NEG-404',
    bookingId: null,
    itineraryId: null,
    customer: 'Siddharth Verma',
    email: 'siddharth.verma@example.com',
    phone: '+91 98111 48333',
    destination: 'Kerala',
    travelDates: '05 Sep 2026 - 10 Sep 2026',
    amount: 120000,
    paymentStatus: 'Awaiting Payment',
    documentStatus: '0 of 2',
    executive: 'Arjun Nair',
    status: 'soft_confirm',
    date: '2026-08-04',
    softConfirmDate: '2026-08-04T10:00:00+05:30',
    notes: [
      'Needs advance payment confirmation before voucher generation',
    ],
    history: [
      { timestamp: '2026-08-04T10:00:00+05:30', action: 'Moved to Soft Confirm', user: 'Arjun Nair' },
    ],
  },
  {
    confirmationId: 'CNF-504',
    leadId: 'LD-1006',
    customerId: 'CUST-1006',
    proposalId: 'PR-2606',
    negotiationId: 'NEG-405',
    bookingId: null,
    itineraryId: null,
    customer: 'Adventure Club Mumbai',
    email: 'adventure.club@example.com',
    phone: '+91 98888 32154',
    destination: 'Ladakh',
    travelDates: '18 Aug 2026 - 26 Aug 2026',
    amount: 720000,
    paymentStatus: 'Unpaid',
    documentStatus: '0 of 2',
    executive: 'Arjun Nair',
    status: 'rejected',
    date: '2026-07-28',
    softConfirmDate: '2026-07-22T09:00:00+05:30',
    rejectionDetails: {
      reason: 'Chose Competitor',
      rejectionDate: '2026-07-28T16:45:00+05:30',
      rejectedBy: 'Arjun Nair',
      internalNote: 'Customer opted for another vendor offering direct flight inclusions.',
    },
    notes: [
      'Attempted counter-offer with complimentary travel insurance, but customer finalized elsewhere.',
    ],
    history: [
      { timestamp: '2026-07-28T16:45:00+05:30', action: 'Rejected deal: Chose Competitor', user: 'Arjun Nair' },
    ],
  },
  {
    confirmationId: 'CNF-505',
    leadId: 'LD-1004',
    customerId: 'CUST-1004',
    proposalId: 'PR-2604',
    negotiationId: 'NEG-406',
    bookingId: null,
    itineraryId: null,
    customer: 'Deepika Reddy',
    email: 'deepika.reddy@example.com',
    phone: '+91 97654 11009',
    destination: 'Andaman',
    travelDates: '22 Aug 2026 - 26 Aug 2026',
    amount: 85000,
    paymentStatus: 'Pending',
    documentStatus: '0 of 2',
    executive: 'Karan Malhotra',
    status: 'rejected',
    date: '2026-07-30',
    softConfirmDate: '2026-07-25T11:00:00+05:30',
    rejectionDetails: {
      reason: 'Customer Changed Plans',
      rejectionDate: '2026-07-30T14:05:00+05:30',
      rejectedBy: 'Karan Malhotra',
      internalNote: 'Personal leave request rejected by employer, deferred trip to next year.',
    },
    notes: [
      'Follow up in Jan 2027 for revised dates.',
    ],
    history: [
      { timestamp: '2026-07-30T14:05:00+05:30', action: 'Rejected deal: Customer Changed Plans', user: 'Karan Malhotra' },
    ],
  },
];

export const REJECTION_REASONS = [
  'Price Too High',
  'Customer Changed Plans',
  'Chose Competitor',
  'Budget Issue',
  'Dates Not Suitable',
  'Package Not Suitable',
  'No Response',
  'Other',
];

/** Hand over confirmed booking data to Itinerary Builder & Operations services */
export function notifyConnectedModules(confirmedRecord) {
  try {
    if (itineraryService && typeof itineraryService.registerConfirmedBooking === 'function') {
      itineraryService.registerConfirmedBooking(confirmedRecord);
    }
    if (operationsService && typeof operationsService.registerConfirmedBooking === 'function') {
      operationsService.registerConfirmedBooking(confirmedRecord);
    }
  } catch (err) {
    console.warn('Cross-module notification warning:', err);
  }
}
