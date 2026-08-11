import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Snackbar,
  Typography,
} from '@mui/material';
import {
  MdOutlineVisibility,
  MdOutlineNoteAdd,
  MdOutlineRestore,
} from 'react-icons/md';
import { formatCurrency } from '@utils/formatters';
import { tokens } from '@styles/theme';
import { useSalesConfirmation } from '../context/SalesConfirmationContext';
import { RelationalDetailsDrawer, AddNoteModal } from './ConfirmationDialogs';
import SalesTable from './SalesTable';
import SalesStatusChip from './SalesStatusChip';
import SalesModal from './SalesModal';

export function RejectedWorkspace() {
  const { rejectedRecords, reopenRecord, addNote } = useSalesConfirmation();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isReopenDialogOpen, setIsReopenDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsDetailsOpen(true);
  };

  const handleAddNoteClick = (record) => {
    setSelectedRecord(record);
    setIsNoteOpen(true);
  };

  const handleReopenClick = (record) => {
    setSelectedRecord(record);
    setIsReopenDialogOpen(true);
  };

  const handleConfirmReopen = () => {
    if (selectedRecord) {
      reopenRecord(selectedRecord.confirmationId);
      setToastMessage(`Deal for ${selectedRecord.customer} reopened and returned to Soft Confirm.`);
    }
    setIsReopenDialogOpen(false);
  };

  const handleActionClick = (actionId, record) => {
    if (actionId === 'view_details') handleViewDetails(record);
    else if (actionId === 'add_note') handleAddNoteClick(record);
    else if (actionId === 'reopen_deal') handleReopenClick(record);
  };

  const columns = [
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
    {
      id: 'amount',
      label: 'Amount',
      align: 'right',
      renderCell: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.color.coral500 }}>
          {formatCurrency(row.amount)}
        </Typography>
      ),
    },
    {
      id: 'rejectionReason',
      label: 'Rejection Reason',
      renderCell: (row) => (
        <SalesStatusChip
          status="rejected"
          label={row.rejectionDetails?.reason || 'Other'}
          variant="outlined"
        />
      ),
    },
    {
      id: 'rejectionDate',
      label: 'Rejection Date',
      renderCell: (row) =>
        row.rejectionDetails?.rejectionDate
          ? new Date(row.rejectionDetails.rejectionDate).toLocaleDateString()
          : row.date,
    },
    {
      id: 'executive',
      label: 'Salesperson',
      renderCell: (row) => row.rejectionDetails?.rejectedBy || row.executive,
    },
  ];

  const actionMenuItems = [
    { id: 'view_details', label: 'View Details & History', icon: <MdOutlineVisibility /> },
    { id: 'add_note', label: 'Add Note', icon: <MdOutlineNoteAdd /> },
    { id: 'reopen_deal', label: 'Reopen Deal', icon: <MdOutlineRestore style={{ color: '#10B981' }} /> },
  ];

  // KPIs calculation
  const totalCount = rejectedRecords.length;
  const totalLostAmount = rejectedRecords.reduce((sum, r) => sum + r.amount, 0);

  const reasonCounts = rejectedRecords.reduce((acc, r) => {
    const reason = r.rejectionDetails?.reason || 'Other';
    acc[reason] = (acc[reason] || 0) + 1;
    return acc;
  }, {});

  let topReason = 'N/A';
  let maxCount = 0;
  Object.entries(reasonCounts).forEach(([r, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topReason = r;
    }
  });

  const kpis = [
    { label: 'Total Rejected Sales', value: totalCount, subtext: 'Preserved for Analytics', accent: tokens.color.coral500 },
    { label: 'Total Lost Revenue', value: formatCurrency(totalLostAmount), subtext: 'Unconverted pipeline value', accent: tokens.color.coral500 },
    { label: 'Top Rejection Reason', value: topReason, subtext: `${maxCount} deal(s)`, accent: tokens.color.gold600 },
    { label: 'Rejection Rate', value: '28.5%', subtext: 'Based on soft confirmed deals', accent: tokens.color.slate600 },
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
        rows={rejectedRecords}
        actionMenuItems={actionMenuItems}
        onActionClick={handleActionClick}
        onRowClick={handleViewDetails}
        emptyMessage="No rejected deals recorded."
      />

      {/* Relational Details Drawer */}
      <RelationalDetailsDrawer
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        record={selectedRecord}
        onReopen={(rec) => {
          setIsDetailsOpen(false);
          handleReopenClick(rec);
        }}
        onAddNote={(rec) => {
          setIsDetailsOpen(false);
          handleAddNoteClick(rec);
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

      {/* Reopen Confirmation Dialog consuming SalesModal */}
      <SalesModal
        open={isReopenDialogOpen}
        onClose={() => setIsReopenDialogOpen(false)}
        title="Reopen Rejected Deal?"
        icon={<MdOutlineRestore size={22} />}
        actions={
          <>
            <Button onClick={() => setIsReopenDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleConfirmReopen}>
              Reopen Deal
            </Button>
          </>
        }
      >
        <Typography variant="body2">
          Are you sure you want to reopen the deal for <strong>{selectedRecord?.customer}</strong>?
          This will move the record back to <strong>Soft Confirm</strong> stage.
        </Typography>
      </SalesModal>

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

export default RejectedWorkspace;
