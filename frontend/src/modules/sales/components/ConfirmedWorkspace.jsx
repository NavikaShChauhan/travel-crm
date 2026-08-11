import { useState } from 'react';
import {
  Alert,
  Box,
  Card,
  Chip,
  Snackbar,
  Typography,
} from '@mui/material';
import {
  MdOutlineVisibility,
  MdOutlineMap,
  MdOutlineDescription,
  MdOutlinePayment,
  MdOutlinePerson,
} from 'react-icons/md';
import { formatCurrency } from '@utils/formatters';
import { tokens } from '@styles/theme';
import { useSalesConfirmation } from '../context/SalesConfirmationContext';
import { RelationalDetailsDrawer, AddNoteModal } from './ConfirmationDialogs';
import SalesTable from './SalesTable';
import SalesStatusChip from './SalesStatusChip';

export function ConfirmedWorkspace() {
  const { confirmedRecords, addNote } = useSalesConfirmation();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleViewBooking = (record) => {
    setSelectedRecord(record);
    setIsDetailsOpen(true);
  };

  const handleViewItinerary = (record) => {
    setToastMessage(`Navigating to Itinerary Builder for ${record.itineraryId || 'Linked Itinerary'} (${record.customer})`);
  };

  const handleViewProposal = (record) => {
    setToastMessage(`Viewing Proposal ${record.proposalId} for ${record.customer}`);
  };

  const handlePaymentDetails = (record) => {
    setToastMessage(`Payment status: ${record.paymentStatus} for total ${formatCurrency(record.amount)}`);
  };

  const handleCustomerDetails = (record) => {
    setToastMessage(`Customer ${record.customer} (Email: ${record.email}, Phone: ${record.phone})`);
  };

  const handleActionClick = (actionId, record) => {
    if (actionId === 'view_booking') handleViewBooking(record);
    else if (actionId === 'view_itinerary') handleViewItinerary(record);
    else if (actionId === 'view_proposal') handleViewProposal(record);
    else if (actionId === 'payment_details') handlePaymentDetails(record);
    else if (actionId === 'customer_details') handleCustomerDetails(record);
  };

  const columns = [
    {
      id: 'bookingId',
      label: 'Booking ID',
      renderCell: (row) => (
        <Chip
          size="small"
          label={row.bookingId || 'BK-701'}
          color="success"
          sx={{ fontWeight: 700, fontFamily: 'monospace' }}
        />
      ),
    },
    {
      id: 'customer',
      label: 'Customer',
      renderCell: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {row.customer}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.email}
          </Typography>
        </Box>
      ),
    },
    { id: 'proposalId', label: 'Proposal ID' },
    { id: 'destination', label: 'Destination' },
    { id: 'travelDates', label: 'Travel Dates' },
    {
      id: 'amount',
      label: 'Total Amount',
      align: 'right',
      renderCell: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.color.navy700 }}>
          {formatCurrency(row.amount)}
        </Typography>
      ),
    },
    {
      id: 'paymentStatus',
      label: 'Payment Status',
      renderCell: (row) => <SalesStatusChip status={row.paymentStatus} label={row.paymentStatus} variant="outlined" />,
    },
    {
      id: 'confirmationDate',
      label: 'Confirmation Date',
      renderCell: (row) => (row.confirmationDate ? new Date(row.confirmationDate).toLocaleDateString() : row.date),
    },
    { id: 'executive', label: 'Executive' },
  ];

  const actionMenuItems = [
    { id: 'view_booking', label: 'View Booking Details', icon: <MdOutlineVisibility /> },
    { id: 'view_itinerary', label: 'View Linked Itinerary', icon: <MdOutlineMap /> },
    { id: 'view_proposal', label: 'View Proposal', icon: <MdOutlineDescription /> },
    { id: 'payment_details', label: 'Payment Details', icon: <MdOutlinePayment /> },
    { id: 'customer_details', label: 'Customer Details', icon: <MdOutlinePerson /> },
  ];

  // KPIs
  const totalCount = confirmedRecords.length;
  const totalAmount = confirmedRecords.reduce((sum, r) => sum + r.amount, 0);

  const kpis = [
    { label: 'Total Confirmed Bookings', value: totalCount, subtext: formatCurrency(totalAmount), accent: tokens.color.teal500 },
    { label: 'Confirmed Revenue', value: formatCurrency(totalAmount), subtext: 'Transferred to Operations', accent: tokens.color.teal500 },
    { label: 'Ready for Operations', value: totalCount, subtext: 'Bookings handed over', accent: tokens.color.navy700 },
    { label: 'Ready for Itinerary', value: totalCount, subtext: 'Itineraries linked', accent: tokens.color.navy700 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* KPI Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1.5 }}>
        {kpis.map((kpi) => (
          <Card key={kpi.label} sx={{ p: 2, borderTop: `3px solid ${kpi.accent}` }}>
            <Typography variant="caption" color="text.secondary">
              {kpi.label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
              {kpi.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
              {kpi.subtext}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Main Table Card consuming shared SalesTable component */}
      <SalesTable
        columns={columns}
        rows={confirmedRecords}
        actionMenuItems={actionMenuItems}
        onActionClick={handleActionClick}
        onRowClick={handleViewBooking}
        emptyMessage="No confirmed bookings yet. Confirm deals from Soft Confirm to see them here."
      />

      {/* Relational Details Drawer */}
      <RelationalDetailsDrawer
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        record={selectedRecord}
        onAddNote={(rec) => {
          setIsDetailsOpen(false);
          setSelectedRecord(rec);
          setIsNoteOpen(true);
        }}
      />

      <AddNoteModal
        open={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
        record={selectedRecord}
        onSaveNote={(confId, text) => {
          addNote(confId, text);
          setToastMessage('Internal note added.');
        }}
      />

      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={4000}
        onClose={() => setToastMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToastMessage('')}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ConfirmedWorkspace;
