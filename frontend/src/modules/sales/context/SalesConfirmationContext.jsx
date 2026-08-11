import { createContext, useContext, useState } from 'react';
import {
  INITIAL_CONFIRMATION_RECORDS,
  notifyConnectedModules,
} from '../services/salesConfirmation.service';

const SalesConfirmationContext = createContext(null);

export function SalesConfirmationProvider({ children }) {
  const [records, setRecords] = useState(INITIAL_CONFIRMATION_RECORDS);

  const softConfirmRecords = records.filter((r) => r.status === 'soft_confirm');
  const confirmedRecords = records.filter((r) => r.status === 'confirmed');
  const rejectedRecords = records.filter((r) => r.status === 'rejected');

  const markConfirmed = (confirmationId, customData = {}) => {
    let updatedRecord = null;

    setRecords((prevRecords) =>
      prevRecords.map((r) => {
        if (r.confirmationId === confirmationId) {
          if (r.status === 'confirmed') return r; // already confirmed

          const bookingId = customData.bookingId || `BK-${Math.floor(700 + Math.random() * 200)}`;
          const itineraryId = customData.itineraryId || `ITIN-${Math.floor(300 + Math.random() * 200)}`;
          const now = new Date().toISOString();

          updatedRecord = {
            ...r,
            status: 'confirmed',
            bookingId,
            itineraryId,
            confirmationDate: now,
            travelDates: customData.travelDates || r.travelDates,
            paymentStatus: customData.paymentStatus || r.paymentStatus || 'Received',
            documentStatus: customData.documentStatus || '2 of 2',
            history: [
              ...(r.history || []),
              {
                timestamp: now,
                action: `Marked Confirmed → Booking ${bookingId} & Itinerary ${itineraryId} created`,
                user: customData.executive || r.executive || 'Current User',
              },
            ],
          };
          return updatedRecord;
        }
        return r;
      })
    );

    if (updatedRecord) {
      notifyConnectedModules(updatedRecord);
    }
  };

  const markRejected = (confirmationId, rejectionData = {}) => {
    const existing = records.find((r) => r.confirmationId === confirmationId);
    if (!existing) return { success: false, message: 'Record not found' };

    if (existing.status === 'confirmed') {
      return {
        success: false,
        message: 'Confirmed bookings cannot be marked as Rejected. Handle cancellations in Operations.',
      };
    }

    const now = new Date().toISOString();

    setRecords((prevRecords) =>
      prevRecords.map((r) => {
        if (r.confirmationId === confirmationId) {
          return {
            ...r,
            status: 'rejected',
            rejectionDetails: {
              reason: rejectionData.reason || 'Other',
              rejectionDate: now,
              rejectedBy: rejectionData.rejectedBy || r.executive || 'Sales Representative',
              internalNote: rejectionData.internalNote || '',
            },
            history: [
              ...(r.history || []),
              {
                timestamp: now,
                action: `Rejected deal: ${rejectionData.reason || 'Other'}`,
                user: rejectionData.rejectedBy || r.executive || 'Sales Representative',
              },
            ],
          };
        }
        return r;
      })
    );

    return { success: true };
  };

  const reopenRecord = (confirmationId) => {
    const now = new Date().toISOString();
    setRecords((prevRecords) =>
      prevRecords.map((r) => {
        if (r.confirmationId === confirmationId) {
          return {
            ...r,
            status: 'soft_confirm',
            rejectionDetails: null,
            history: [
              ...(r.history || []),
              {
                timestamp: now,
                action: 'Reopened rejected deal to Soft Confirm',
                user: r.executive || 'Sales Representative',
              },
            ],
          };
        }
        return r;
      })
    );
  };

  const addNote = (confirmationId, noteText) => {
    if (!noteText.trim()) return;
    setRecords((prevRecords) =>
      prevRecords.map((r) => {
        if (r.confirmationId === confirmationId) {
          return {
            ...r,
            notes: [...(r.notes || []), noteText],
          };
        }
        return r;
      })
    );
  };

  const updatePaymentStatus = (confirmationId, newStatus) => {
    setRecords((prevRecords) =>
      prevRecords.map((r) => (r.confirmationId === confirmationId ? { ...r, paymentStatus: newStatus } : r))
    );
  };

  const updateDocumentStatus = (confirmationId, newStatus) => {
    setRecords((prevRecords) =>
      prevRecords.map((r) => (r.confirmationId === confirmationId ? { ...r, documentStatus: newStatus } : r))
    );
  };

  const value = {
    records,
    softConfirmRecords,
    confirmedRecords,
    rejectedRecords,
    markConfirmed,
    markRejected,
    reopenRecord,
    addNote,
    updatePaymentStatus,
    updateDocumentStatus,
  };

  return (
    <SalesConfirmationContext.Provider value={value}>
      {children}
    </SalesConfirmationContext.Provider>
  );
}

export function useSalesConfirmation() {
  const context = useContext(SalesConfirmationContext);
  if (!context) {
    throw new Error('useSalesConfirmation must be used within a SalesConfirmationProvider');
  }
  return context;
}
