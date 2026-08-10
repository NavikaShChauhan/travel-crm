import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Radio,
} from '@mui/material';
import { MdClose, MdSearch, MdPersonSearch } from 'react-icons/md';
import { tokens } from '@styles/theme';
import { MOCK_LEADS } from '../data/sales.mock';
import { formatDate } from '@utils/formatters';

export default function SelectQualifiedLeadModal({ open, onClose, onSelectLead }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState(MOCK_LEADS[0]?.id || '');

  // Filter qualified leads based on search query
  const filteredLeads = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return MOCK_LEADS;

    return MOCK_LEADS.filter((lead) => {
      const leadId = (lead.id || '').toLowerCase();
      const name = (lead.name || '').toLowerCase();
      const phone = (lead.contactPhone || '').toLowerCase();
      const email = (lead.contactEmail || '').toLowerCase();
      const destination = (lead.destination || '').toString().toLowerCase();

      return (
        leadId.includes(q) ||
        name.includes(q) ||
        phone.includes(q) ||
        email.includes(q) ||
        destination.includes(q)
      );
    });
  }, [searchQuery]);

  const selectedLead = useMemo(
    () => MOCK_LEADS.find((l) => l.id === selectedLeadId) || filteredLeads[0] || null,
    [selectedLeadId, filteredLeads]
  );

  const handleContinue = () => {
    if (selectedLead && onSelectLead) {
      onSelectLead(selectedLead);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2.5,
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          m: 0,
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${tokens.color.line200}`,
          bgcolor: tokens.color.surface1,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              p: 1,
              borderRadius: 1.5,
              bgcolor: 'rgba(27,42,74,0.08)',
              color: tokens.color.navy900,
              display: 'flex',
            }}
          >
            <MdPersonSearch size={24} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Select Qualified Lead
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Search and choose a lead to start building a proposal.
            </Typography>
          </Box>
        </Stack>
        <IconButton aria-label="Close lead selection modal" onClick={onClose} size="small">
          <MdClose size={22} />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent dividers sx={{ p: 2.5, flex: 1, overflowY: 'auto' }}>
        <Stack spacing={2}>
          {/* Search Box */}
          <TextField
            placeholder="Search by Lead ID, Customer Name, Mobile, or Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={20} />
                </InputAdornment>
              ),
            }}
            fullWidth
            size="small"
          />

          {/* Qualified Leads Table */}
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
            <Table size="small" aria-label="Qualified leads selection table">
              <TableHead sx={{ bgcolor: 'action.hover' }}>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell sx={{ fontWeight: 700 }}>Lead ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Destination</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Travel Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Executive</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => {
                    const isSelected = lead.id === selectedLeadId;
                    const destinationDisplay = Array.isArray(lead.destination)
                      ? lead.destination.join(', ')
                      : lead.destination || (lead.id === 'LD-1001' ? 'Bali, Indonesia' : 'Kerala, India');

                    return (
                      <TableRow
                        key={lead.id}
                        hover
                        selected={isSelected}
                        onClick={() => setSelectedLeadId(lead.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Radio
                            checked={isSelected}
                            onChange={() => setSelectedLeadId(lead.id)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                          {lead.id}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {lead.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lead.contactPhone}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{destinationDisplay}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {lead.departureDate ? formatDate(lead.departureDate) : '15 Aug 2026'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={lead.temperature || 'Hot'}
                            size="small"
                            color={
                              lead.temperature === 'Hot'
                                ? 'error'
                                : lead.temperature === 'Warm'
                                  ? 'warning'
                                  : 'info'
                            }
                            sx={{ height: 20, fontSize: '0.72rem', fontWeight: 700 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{lead.salesExecutive}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        No qualified leads found matching "{searchQuery}".
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>

      {/* Footer Buttons */}
      <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${tokens.color.line200}`, gap: 1.5 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          disabled={!selectedLead}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
