import { Box, Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { MdOutlineClose } from 'react-icons/md';

import { formatCurrency, formatDate } from '@utils/formatters';
import { tokens } from '@styles/theme';

const FALLBACK_VALUE = '—';

function DetailSection({ title, fields }) {
  return (
    <Box component="section">
      <Typography variant="subtitle2" sx={{ color: tokens.color.navy900, fontWeight: 700, mb: 1.25 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25 }}>
        {fields.map(([label, value]) => (
          <Box key={label} sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
              {label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>
              {value || FALLBACK_VALUE}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function LeadSummaryDrawer({ lead, open, onClose }) {
  if (!lead) return null;

  const isInternational = lead.id === 'LD-1001' || lead.id === 'LD-1005';
  const destination = lead.id === 'LD-1001' ? 'Bali, Indonesia' : lead.id === 'LD-1005' ? 'Switzerland' : 'Kerala, India';
  const estimatedCost = lead.id === 'LD-1005' ? 485000 : lead.id === 'LD-1001' ? 240000 : 120000;
  const fields = [
    ['Customer', [['Lead ID', lead.id], ['Customer Name', lead.name], ['Age', '32'], ['Assigned Sales Executive', lead.salesExecutive]]],
    ['Contact', [['Mobile', lead.contactPhone], ['Alternate Mobile', '+91 98765 40000'], ['Email', lead.contactEmail], ['City', 'Mumbai'], ['State', 'Maharashtra'], ['Country', 'India']]],
    ['Trip Summary', [['Destination', destination], ['Departure City', 'Mumbai'], ['Travel Dates', '15 Aug 2026 – 22 Aug 2026'], ['Duration', '7 Nights / 8 Days'], ['Package Type', lead.id === 'LD-1001' ? 'Honeymoon' : 'FIT'], ['Domestic/International', isInternational ? 'International' : 'Domestic'], ['Budget', formatCurrency(estimatedCost)], ['Currency', 'INR']]],
    ['PAX Details', [['Total PAX', '2'], ['Adults', '2'], ['Children', '0'], ['Infants', '0'], ['Rooms Required', '1'], ['Room Sharing', 'Double sharing'], ['Child Ages', '—']]],
    ['Travel Preferences', [['Hotel Category', '4 Star'], ['Meal Plan', 'Breakfast included'], ['Flight Required', 'Yes'], ['Visa Required', isInternational ? 'Yes' : 'No'], ['Passport Available', isInternational ? 'Yes' : 'Not required'], ['Transport', 'Private transfers'], ['Sightseeing', 'Included'], ['Special Requests', 'Prefer early check-in where available']]],
    ['Lead Information', [['Lead Source', lead.source], ['Registration Date', formatDate(lead.registrationDate)], ['Last Updated', formatDate(lead.lastUpdated)], ['Next Follow-up', '01 Aug 2026, 11:00 am'], ['Last Follow-up', '30 Jul 2026, 09:30 am'], ['Proposal Status', 'Draft'], ['Booking Status', 'Not booked']]],
    ['Financial', [['Estimated Cost', formatCurrency(estimatedCost)], ['Advance Paid', formatCurrency(0)], ['Balance', formatCurrency(estimatedCost)], ['Payment Status', 'Pending']]],
    ['Notes', [['Customer Notes', 'Looking for a well-paced itinerary with flexible dates.'], ['Internal Notes', `Priority: ${lead.temperature}. Follow up with a tailored proposal.`]]],
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 'min(45vw, 680px)' },
          minWidth: { sm: 420 },
          maxWidth: '100%',
          display: 'flex',
          bgcolor: 'background.paper',
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: { xs: 2, sm: 3 }, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Lead Summary</Typography>
          <Typography variant="body2" color="text.secondary">{lead.name} · {lead.id}</Typography>
        </Box>
        <IconButton aria-label="Close lead summary" onClick={onClose}><MdOutlineClose /></IconButton>
      </Stack>

      <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, sm: 3 }, py: 2.5 }}>
        <Stack spacing={2.5} divider={<Divider flexItem />}>
          {fields.map(([title, sectionFields]) => <DetailSection key={title} title={title} fields={sectionFields} />)}
        </Stack>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 2.5 }, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="flex-end">
          <Button size="small" variant="outlined">Edit</Button>
          <Button size="small" variant="outlined">Add Note</Button>
          <Button size="small" variant="outlined">Schedule Follow-up</Button>
          <Button size="small" variant="outlined">Send Proposal</Button>
          <Button size="small" variant="contained">Convert to Booking</Button>
          <Button size="small" onClick={onClose}>Close</Button>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default LeadSummaryDrawer;
