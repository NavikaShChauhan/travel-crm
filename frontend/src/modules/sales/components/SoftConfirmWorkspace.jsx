import { useState } from 'react';
import {
  Alert,
  Box,
  Card,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlineVisibility,
  MdOutlineNoteAdd,
  MdOutlineSend,
  MdOutlineFileUpload,
} from 'react-icons/md';
import { formatCurrency } from '@utils/formatters';
import { tokens } from '@styles/theme';
import { useSalesConfirmation } from '../context/SalesConfirmationContext';
import {
  RelationalDetailsDrawer,
  MarkConfirmedModal,
  RejectDealModal,
  AddNoteModal,
} from './ConfirmationDialogs';
import SalesTable from './SalesTable';
import SalesStatusChip from './SalesStatusChip';

export function SoftConfirmWorkspace() {
  const {
    softConfirmRecords,
    markConfirmed,
    markRejected,
    addNote,
    updateDocumentStatus,
  } = useSalesConfirmation();

  // Modals & Menu State
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Action Handlers
  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsDetailsOpen(true);
  };

  const handleMarkConfirmedClick = (record) => {
    setSelectedRecord(record);
    setIsConfirmOpen(true);
  };

  const handleRejectClick = (record) => {
    setSelectedRecord(record);
    setIsRejectOpen(true);
  };

  const handleAddNoteClick = (record) => {
    setSelectedRecord(record);
    setIsNoteOpen(true);
  };

  const handleSendPaymentReminder = (record) => {
    setToastMessage(`Payment reminder sent to ${record.customer} (${record.email})`);
  };

  const handleToggleDocuments = (record) => {
    const nextStatus = record.documentStatus === '2 of 2' ? '1 of 2' : '2 of 2';
    updateDocumentStatus(record.confirmationId, nextStatus);
    setToastMessage(`Updated document status for ${record.customer} to ${nextStatus}`);
  };

  const handleActionClick = (actionId, record) => {
    if (actionId === 'view_details') handleViewDetails(record);
    else if (actionId === 'add_note') handleAddNoteClick(record);
    else if (actionId === 'send_reminder') handleSendPaymentReminder(record);
    else if (actionId === 'toggle_docs') handleToggleDocuments(record);
    else if (actionId === 'mark_confirmed') handleMarkConfirmedClick(record);
    else if (actionId === 'reject_deal') handleRejectClick(record);
  };

  const columns = [
    { id: 'confirmationId', label: 'ID' },
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
    { id: 'proposalId', label: 'Proposal' },
    { id: 'destination', label: 'Destination' },
    {
      id: 'amount',
      label: 'Amount',
      align: 'right',
      renderCell: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.color.navy700 }}>
          {formatCurrency(row.amount)}
        </Typography>
      ),
    },
    { id: 'date', label: 'Date' },
    {
      id: 'paymentStatus',
      label: 'Payment',
      renderCell: (row) => <SalesStatusChip status={row.paymentStatus} label={row.paymentStatus} variant="outlined" />,
    },
    {
      id: 'status',
      label: 'Status',
      renderCell: () => <SalesStatusChip status="soft_confirm" label="Soft Confirm" />,
    },
    { id: 'executive', label: 'Executive' },
    {
      id: 'quickActions',
      label: 'Quick Actions',
      align: 'center',
      renderCell: (row) => (
        <Stack direction="row" spacing={0.5} justifyContent="center" onClick={(e) => e.stopPropagation()}>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary" onClick={() => handleViewDetails(row)}>
              <MdOutlineVisibility size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark Confirmed">
            <IconButton size="small" color="success" onClick={() => handleMarkConfirmedClick(row)}>
              <MdOutlineCheckCircle size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reject Deal">
            <IconButton size="small" color="error" onClick={() => handleRejectClick(row)}>
              <MdOutlineCancel size={18} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const actionMenuItems = [
    { id: 'view_details', label: 'View Details & Relational Chain', icon: <MdOutlineVisibility /> },
    { id: 'add_note', label: 'Add Note', icon: <MdOutlineNoteAdd /> },
    { id: 'send_reminder', label: 'Send Payment Reminder', icon: <MdOutlineSend /> },
    { id: 'toggle_docs', label: 'Toggle Document Status', icon: <MdOutlineFileUpload /> },
    { id: 'mark_confirmed', label: 'Mark Confirmed', icon: <MdOutlineCheckCircle style={{ color: 'green' }} /> },
    { id: 'reject_deal', label: 'Reject Deal', icon: <MdOutlineCancel style={{ color: 'red' }} /> },
  ];

  // KPIs
  const totalCount = softConfirmRecords.length;
  const totalAmount = softConfirmRecords.reduce((sum, r) => sum + r.amount, 0);
  const awaitingPayment = softConfirmRecords.filter((r) => r.paymentStatus !== 'Received').length;
  const awaitingDocs = softConfirmRecords.filter((r) => r.documentStatus !== '2 of 2').length;

  const kpis = [
    { label: 'Total Soft Confirms', value: totalCount, subtext: formatCurrency(totalAmount), accent: tokens.color.navy700 },
    { label: 'Awaiting Payment', value: awaitingPayment, subtext: 'Pending customer deposit', accent: tokens.color.gold600 },
    { label: 'Awaiting Documents', value: awaitingDocs, subtext: 'Passport / ID pending', accent: tokens.color.gold600 },
    { label: 'Expiring Soon', value: softConfirmRecords.length > 0 ? 1 : 0, subtext: 'Within 48 hours', accent: tokens.color.coral500 },
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
        rows={softConfirmRecords}
        actionMenuItems={actionMenuItems}
        onActionClick={handleActionClick}
        onRowClick={handleViewDetails}
        emptyMessage="No deals currently in Soft Confirm stage."
      />

      {/* Drawers & Modals */}
      <RelationalDetailsDrawer
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        record={selectedRecord}
        onMarkConfirmed={(rec) => {
          setIsDetailsOpen(false);
          handleMarkConfirmedClick(rec);
        }}
        onReject={(rec) => {
          setIsDetailsOpen(false);
          handleRejectClick(rec);
        }}
        onAddNote={(rec) => {
          setIsDetailsOpen(false);
          handleAddNoteClick(rec);
        }}
      />

      <MarkConfirmedModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        record={selectedRecord}
        onConfirm={(confId, data) => {
          markConfirmed(confId, data);
          setToastMessage(`Deal confirmed! Booking & Itinerary IDs generated and sent to Operations.`);
        }}
      />

      <RejectDealModal
        open={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        record={selectedRecord}
        onReject={(confId, rejData) => {
          const res = markRejected(confId, rejData);
          if (res?.success) {
            setToastMessage(`Deal marked as Rejected and kept for Analytics.`);
          } else if (res?.message) {
            setToastMessage(`Error: ${res.message}`);
          }
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

      {/* Snackbar Toast */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={4000}
        onClose={() => setToastMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="info" variant="filled" onClose={() => setToastMessage('')}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SoftConfirmWorkspace;
