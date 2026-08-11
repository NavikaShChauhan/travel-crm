import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  MdClose,
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlineHourglassEmpty,
  MdOutlineArrowForward,
  MdOutlineContentCopy,
  MdOutlineEvent,
  MdOutlineAttachMoney,
  MdOutlineInsertDriveFile,
} from 'react-icons/md';
import { formatCurrency } from '@utils/formatters';
import { tokens } from '@styles/theme';
import { REJECTION_REASONS } from '../services/salesConfirmation.service';

/** Relational details drawer showing linked IDs flow */
export function RelationalDetailsDrawer({ open, onClose, record, onMarkConfirmed, onReject, onReopen, onAddNote }) {
  if (!record) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 'min(45vw, 600px)' },
          minWidth: { sm: 420 },
          p: 3,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {record.customer}
            </Typography>
            <Chip
              size="small"
              label={record.status === 'soft_confirm' ? 'Soft Confirm' : record.status === 'confirmed' ? 'Confirmed' : 'Rejected'}
              color={record.status === 'confirmed' ? 'success' : record.status === 'rejected' ? 'error' : 'warning'}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {record.confirmationId} · {record.destination} · {record.executive}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <MdClose size={20} />
        </IconButton>
      </Stack>

      {/* Relational IDs Chain Banner */}
      <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(27,42,74,0.05)', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: tokens.color.navy900 }}>
          Relational Sales Chain
        </Typography>
        <Stack spacing={0.75}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">Customer ID:</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{record.customerId}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">Lead ID:</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{record.leadId}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">Proposal ID:</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{record.proposalId}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">Negotiation ID:</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{record.negotiationId}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">Confirmation ID:</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{record.confirmationId}</Typography>
          </Stack>

          {record.status === 'confirmed' && (
            <>
              <Divider sx={{ my: 0.5 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="success.main" sx={{ fontWeight: 700 }}>Booking ID:</Typography>
                <Chip size="small" label={record.bookingId || 'BK-NEW'} color="success" variant="outlined" />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="success.main" sx={{ fontWeight: 700 }}>Itinerary ID:</Typography>
                <Chip size="small" label={record.itineraryId || 'ITIN-NEW'} color="success" variant="outlined" />
              </Stack>
            </>
          )}
        </Stack>
      </Box>

      {/* Summary Specs */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 2.5 }}>
        <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: 'background.default' }}>
          <Typography variant="caption" color="text.secondary">Amount</Typography>
          <Typography variant="body1" sx={{ fontWeight: 700, color: tokens.color.navy700 }}>
            {formatCurrency(record.amount)}
          </Typography>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: 'background.default' }}>
          <Typography variant="caption" color="text.secondary">Travel Dates</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {record.travelDates}
          </Typography>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: 'background.default' }}>
          <Typography variant="caption" color="text.secondary">Payment Status</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {record.paymentStatus}
          </Typography>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: 'background.default' }}>
          <Typography variant="caption" color="text.secondary">Document Status</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {record.documentStatus}
          </Typography>
        </Box>
      </Box>

      {/* Rejection Details if rejected */}
      {record.status === 'rejected' && record.rejectionDetails && (
        <Alert severity="error" sx={{ mt: 2.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Rejection Reason: {record.rejectionDetails.reason}
          </Typography>
          <Typography variant="caption" display="block">
            Rejected By: {record.rejectionDetails.rejectedBy} on{' '}
            {new Date(record.rejectionDetails.rejectionDate).toLocaleDateString()}
          </Typography>
          {record.rejectionDetails.internalNote && (
            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
              "{record.rejectionDetails.internalNote}"
            </Typography>
          )}
        </Alert>
      )}

      {/* Internal Notes */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Internal Notes
        </Typography>
        <Stack spacing={1}>
          {record.notes?.map((n, i) => (
            <Box key={i} sx={{ p: 1.25, borderRadius: 1.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2">{n}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Timeline */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Workflow Timeline
        </Typography>
        <Stack spacing={1}>
          {record.history?.map((h, i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 70 }}>
                {new Date(h.timestamp).toLocaleDateString()}
              </Typography>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{h.action}</Typography>
                <Typography variant="caption" color="text.secondary">By {h.user}</Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Action Buttons */}
      <Stack spacing={1.25}>
        {onAddNote && (
          <Button variant="outlined" fullWidth onClick={() => onAddNote(record)}>
            Add Note
          </Button>
        )}
        {record.status === 'soft_confirm' && (
          <>
            <Button
              variant="contained"
              color="success"
              fullWidth
              startIcon={<MdOutlineCheckCircle />}
              onClick={() => onMarkConfirmed(record)}
            >
              Mark Confirmed
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<MdOutlineCancel />}
              onClick={() => onReject(record)}
            >
              Reject Deal
            </Button>
          </>
        )}
        {record.status === 'rejected' && onReopen && (
          <Button variant="outlined" color="primary" fullWidth onClick={() => onReopen(record)}>
            Reopen Deal (Return to Soft Confirm)
          </Button>
        )}
      </Stack>
    </Drawer>
  );
}

/** Modal to Mark Confirmed */
export function MarkConfirmedModal({ open, onClose, record, onConfirm }) {
  const [travelDates, setTravelDates] = useState(record?.travelDates || '');
  const [paymentStatus, setPaymentStatus] = useState('Received');

  if (!record) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(record.confirmationId, {
      travelDates,
      paymentStatus,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Confirm Booking · {record.customer}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing= {2}>
            <Alert severity="info">
              Marking this deal as <strong>Confirmed</strong> will automatically create a <strong>Booking ID</strong> and <strong>Itinerary ID</strong>, transfer the record to Operations, and update your Sales Dashboard.
            </Alert>

            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.default' }}>
              <Typography variant="caption" color="text.secondary">Proposal Amount</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.color.navy700 }}>
                {formatCurrency(record.amount)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Destination: {record.destination} · Executive: {record.executive}
              </Typography>
            </Box>

            <TextField
              label="Travel Dates"
              value={travelDates}
              onChange={(e) => setTravelDates(e.target.value)}
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel>Payment Status</InputLabel>
              <Select
                value={paymentStatus}
                label="Payment Status"
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <MenuItem value="Received">Received (Full)</MenuItem>
                <MenuItem value="Partial Deposit">Partial Deposit Received</MenuItem>
                <MenuItem value="Awaiting Payment">Awaiting Payment</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="success" startIcon={<MdOutlineCheckCircle />}>
            Confirm Booking & Generate IDs
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

/** Modal to Reject Deal */
export function RejectDealModal({ open, onClose, record, onReject }) {
  const [reason, setReason] = useState('Price Too High');
  const [internalNote, setInternalNote] = useState('');
  const [rejectedBy, setRejectedBy] = useState(record?.executive || 'Sales Representative');

  if (!record) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onReject(record.confirmationId, {
      reason,
      rejectedBy,
      internalNote,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>
          Reject Deal · {record.customer}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Alert severity="warning">
              This will move the deal to the <strong>Rejected</strong> section. The record will be kept for Analytics and history and will NOT be deleted.
            </Alert>

            <FormControl fullWidth required>
              <InputLabel>Rejection Reason</InputLabel>
              <Select
                value={reason}
                label="Rejection Reason"
                onChange={(e) => setReason(e.target.value)}
              >
                {REJECTION_REASONS.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Rejected By"
              value={rejectedBy}
              onChange={(e) => setRejectedBy(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Internal Note / Reason Details"
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              multiline
              rows={3}
              placeholder="Enter detailed feedback or reasons from customer..."
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="error" startIcon={<MdOutlineCancel />}>
            Reject Deal
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

/** Modal to Add Note */
export function AddNoteModal({ open, onClose, record, onSaveNote }) {
  const [noteText, setNoteText] = useState('');

  if (!record) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      onSaveNote(record.confirmationId, noteText.trim());
      setNoteText('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700 }}>Add Note · {record.customer}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            label="Internal Note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            multiline
            rows={3}
            fullWidth
            required
            placeholder="Type note details..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save Note</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
