import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { MdOutlineClose, MdAdd, MdMoreHoriz, MdEdit, MdDelete, MdOutlineDelete } from 'react-icons/md';
import { formatCurrency, formatDate } from '@utils/formatters';
import { tokens } from '@styles/theme';
import EditLeadModal from './EditLeadModal';
import CreateProposalWizard from './CreateProposalWizard';

const FALLBACK_VALUE = '—';

function DetailSection({ title, fields }) {
  return (
    <Box component="section">
      <Typography variant="subtitle2" sx={{ color: tokens.color.navy900, fontWeight: 700, mb: 1.25 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
        {fields.map(([label, value]) => (
          <Box key={label} sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
              {label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>
              {value !== undefined && value !== null && value !== '' ? value : FALLBACK_VALUE}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const initialTimeline = [
  'Inquiry Created',
  'Lead Assigned',
  'Proposal Created',
  'Proposal Sent',
  'Proposal Viewed',
  'Call Completed',
  'Negotiation Started',
  'Revised Proposal Sent',
  'Soft Confirm',
];

const initialNotes = [
  { date: '03 Aug 2026', author: 'Priya Sharma', text: 'Customer prefers morning flights.' },
  { date: '02 Aug 2026', author: 'Priya Sharma', text: 'Interested in 4-star or 5-star hotels.' },
  { date: '01 Aug 2026', author: 'Rahul Jain', text: 'Requested honeymoon room decoration.' },
];

function LeadSummaryDrawer({ lead, open, onClose, onUpdateLead, onDeleteLead }) {
  const [activeLead, setActiveLead] = useState(lead);
  const [mode, setMode] = useState('overview'); // 'overview' | 'activity' | 'communication' | 'note'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isConfirmDeleteLeadOpen, setIsConfirmDeleteLeadOpen] = useState(false);

  const [notes, setNotes] = useState(initialNotes);
  const [note, setNote] = useState({ title: '', text: '', category: 'General' });
  const [schedule, setSchedule] = useState({ type: 'Call', date: '', time: '', message: '', priority: 'Medium' });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    if (lead) {
      setActiveLead(lead);
    }
  }, [lead]);

  if (!lead || !activeLead) return null;

  const currentLead = activeLead;

  // Derived values from currentLead state
  const isInternational =
    currentLead.travelType === 'International' ||
    currentLead.id === 'LD-1001' ||
    currentLead.id === 'LD-1005';

  const destinationText = Array.isArray(currentLead.destination)
    ? currentLead.destination.join(', ')
    : currentLead.destination || (currentLead.id === 'LD-1001' ? 'Bali, Indonesia' : currentLead.id === 'LD-1005' ? 'Switzerland' : 'Kerala, India');

  const budgetVal = currentLead.budget || (currentLead.id === 'LD-1005' ? 485000 : currentLead.id === 'LD-1001' ? 240000 : 120000);
  const dealVal = currentLead.estimatedDealValue || budgetVal;

  const adultsNum = currentLead.adults !== undefined ? currentLead.adults : 2;
  const childrenNum = currentLead.children !== undefined ? currentLead.children : 0;
  const infantsNum = currentLead.infants !== undefined ? currentLead.infants : 0;
  const totalPaxNum = currentLead.totalPax !== undefined ? currentLead.totalPax : (parseInt(adultsNum, 10) + parseInt(childrenNum, 10) + parseInt(infantsNum, 10));

  const durationText = currentLead.durationNights
    ? `${currentLead.durationNights} Nights / ${parseInt(currentLead.durationNights, 10) + 1} Days`
    : '7 Nights / 8 Days';

  const travelDatesText =
    currentLead.departureDate && currentLead.returnDate
      ? `${formatDate(currentLead.departureDate)} – ${formatDate(currentLead.returnDate)}`
      : '15 Aug 2026 – 22 Aug 2026';

  const sectionFields = [
    [
      'Customer Information',
      [
        ['Lead ID', currentLead.id],
        ['Customer Name', currentLead.name],
        ['Mobile Number', currentLead.contactPhone],
        ['Alternate Mobile', currentLead.alternatePhone || '+91 98765 40000'],
        ['Email', currentLead.contactEmail],
        ['Nationality', currentLead.nationality || 'Indian'],
        ['City', currentLead.city || 'Mumbai'],
        ['State', currentLead.state || 'Maharashtra'],
        ['Country', currentLead.country || 'India'],
      ],
    ],
    [
      'Trip Information',
      [
        ['Destination', destinationText],
        ['Departure City', currentLead.departureCity || 'Mumbai'],
        ['Travel Dates', travelDatesText],
        ['Duration', durationText],
        ['Total PAX', `${totalPaxNum}`],
        ['Adults', `${adultsNum}`],
        ['Children', `${childrenNum}`],
        ['Infants', `${infantsNum}`],
        ['Package Type', currentLead.packageType || 'Honeymoon'],
        ['Travel Type', currentLead.travelType || (isInternational ? 'International' : 'Domestic')],
        ['Budget', formatCurrency(budgetVal)],
        ['Hotel Category', currentLead.hotelCategory || '4★'],
        ['Meal Preference', currentLead.mealPreference || 'Breakfast Only'],
        ['Flight Preference', currentLead.flightPreference || 'Economy'],
        ['Visa Required', currentLead.visaRequired ? 'Yes' : (isInternational ? 'Yes' : 'No')],
        ['Passport Required', currentLead.passportRequired ? 'Yes' : (isInternational ? 'Yes' : 'Not required')],
      ],
    ],
    [
      'Sales Information',
      [
        ['Assigned Executive', currentLead.salesExecutive],
        ['Lead Source', currentLead.source],
        ['Lead Priority', currentLead.temperature || 'Hot'],
        ['Lead Status', currentLead.status || 'New'],
        ['Expected Booking Date', currentLead.expectedBookingDate ? formatDate(currentLead.expectedBookingDate) : '10 Aug 2026'],
        ['Estimated Deal Value', formatCurrency(dealVal)],
      ],
    ],
    [
      'Preferences',
      [
        ['Preferred Contact Method', currentLead.preferredContactMethod || 'WhatsApp'],
        ['Preferred Contact Time', currentLead.preferredContactTime || 'Morning'],
        ['Preferred Language', currentLead.preferredLanguage || 'English'],
        ['Special Requests', currentLead.specialRequests || 'Prefer early check-in where available.'],
      ],
    ],
  ];

  const handleSaveLeadFromModal = (updatedLead) => {
    setActiveLead(updatedLead);
    if (onUpdateLead) {
      onUpdateLead(updatedLead);
    }
    setSavedMessage('Lead details updated successfully!');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  const handleSaveNote = () => {
    if (!note.text.trim()) return;
    setNotes((prev) => [
      {
        date: 'Today',
        author: currentLead.salesExecutive || 'Priya Sharma',
        text: `${note.title ? note.title + ': ' : ''}${note.text}`,
      },
      ...prev,
    ]);
    setNote({ title: '', text: '', category: 'General' });
    setMode('activity');
    setSavedMessage('Note saved to activity timeline.');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  const handleSaveSchedule = (sendNow = false) => {
    setSchedule((prev) => ({ ...prev, date: sendNow ? 'Today' : prev.date }));
    setMode('activity');
    setSavedMessage(sendNow ? 'Follow-up sent successfully!' : 'Follow-up scheduled.');
    setTimeout(() => setSavedMessage(''), 4000);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 'min(48vw, 720px)' },
            minWidth: { sm: 440 },
            maxWidth: '100%',
            display: 'flex',
            bgcolor: 'background.paper',
          },
        }}
      >
        {/* Drawer Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: { xs: 2, sm: 3 }, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {currentLead.name}
              </Typography>
              <Chip
                label={currentLead.temperature || 'Hot'}
                size="small"
                color={
                  currentLead.temperature === 'Hot'
                    ? 'error'
                    : currentLead.temperature === 'Warm'
                      ? 'warning'
                      : 'info'
                }
                sx={{ height: 20, fontSize: '0.72rem', fontWeight: 700 }}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {currentLead.id} · {currentLead.salesExecutive}
            </Typography>
          </Box>
          <IconButton aria-label="Close lead summary" onClick={onClose}>
            <MdOutlineClose />
          </IconButton>
        </Stack>

        {/* View Chips / Navigation */}
        <Stack
          direction="row"
          gap={0.75}
          sx={{ px: { xs: 2, sm: 2.5 }, py: 1.25, overflowX: 'auto', borderBottom: '1px solid', borderColor: 'divider' }}
        >
          {[
            ['overview', 'Overview Summary'],
            ['activity', 'Activity & Notes'],
            ['communication', 'Schedule Communication'],
            ['note', 'Add Note'],
          ].map(([val, label]) => (
            <Chip
              key={val}
              label={label}
              clickable
              color={mode === val ? 'primary' : 'default'}
              variant={mode === val ? 'filled' : 'outlined'}
              onClick={() => setMode(val)}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Stack>

        {/* Saved Toast Feedback */}
        {savedMessage && (
          <Box sx={{ px: 3, py: 1, bgcolor: 'success.light', color: 'success.contrastText' }}>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {savedMessage}
            </Typography>
          </Box>
        )}

        {/* Drawer Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, sm: 3 } }}>
          {/* Overview Mode */}
          {mode === 'overview' && (
            <Stack spacing={2.5} divider={<Divider flexItem />}>
              {sectionFields.map(([title, fields]) => (
                <DetailSection key={title} title={title} fields={fields} />
              ))}

              {/* Preferences Quick Badges */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: tokens.color.navy900 }}>
                  Contact Preferences & Communication
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={0.75}>
                  <Chip label={`Method: ${currentLead.preferredContactMethod || 'WhatsApp'}`} size="small" variant="outlined" />
                  <Chip label={`Time: ${currentLead.preferredContactTime || 'Morning'}`} size="small" variant="outlined" />
                  <Chip label={`Language: ${currentLead.preferredLanguage || 'English'}`} size="small" variant="outlined" />
                </Stack>
              </Box>

              {/* Related Proposals */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: tokens.color.navy900 }}>
                  Related Proposals
                </Typography>
                <Stack spacing={1}>
                  {[
                    ['PR-2601', 'V1', 'Viewed', '30 Jul 2026'],
                    ['PR-2602', 'V2', 'Sent', '02 Aug 2026'],
                  ].map((item) => (
                    <Stack
                      key={item[0]}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ p: 1.25, borderRadius: 1.5, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider' }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                        {item[0]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.slice(1).join(' · ')}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          )}

          {/* Activity Mode */}
          {mode === 'activity' && (
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.25 }}>
                  Lead Progress Timeline
                </Typography>
                <Stack spacing={1.25}>
                  {initialTimeline.map((event, index) => (
                    <Stack key={event} direction="row" spacing={1.25} alignItems="center">
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: index < 5 ? tokens.color.teal500 : tokens.color.ink400,
                        }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {event}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {index < 5 ? 'Completed' : 'Upcoming workflow step'}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.25 }}>
                  Internal Notes & Logs
                </Typography>
                <Stack spacing={1.25}>
                  {notes.map((item, idx) => (
                    <Box key={idx} sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          {item.date} · {item.author}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setNotes((prev) => prev.filter((_, i) => i !== idx))}
                          sx={{ p: 0.2 }}
                          title="Delete note"
                        >
                          <MdOutlineDelete size={16} />
                        </IconButton>
                      </Stack>
                      <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 500 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          )}

          {/* Communication Mode */}
          {mode === 'communication' && (
            <Stack spacing={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Schedule a Communication
              </Typography>
              <TextField
                select
                label="Communication Type"
                value={schedule.type}
                onChange={(e) => setSchedule((item) => ({ ...item, type: e.target.value }))}
                fullWidth
              >
                {['Call', 'WhatsApp', 'Email', 'SMS'].map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </TextField>
              {schedule.type === 'Email' && <TextField label="Subject" fullWidth />}
              <TextField
                label="Message / Follow-up Notes"
                multiline
                minRows={3}
                value={schedule.message}
                onChange={(e) => setSchedule((item) => ({ ...item, message: e.target.value }))}
                helperText="Templates: Proposal Reminder · Follow-up Reminder · Payment Reminder"
                fullWidth
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <TextField
                  label="Date"
                  type="date"
                  value={schedule.date}
                  onChange={(e) => setSchedule((item) => ({ ...item, date: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Time"
                  type="time"
                  value={schedule.time}
                  onChange={(e) => setSchedule((item) => ({ ...item, time: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <TextField
                select
                label="Priority"
                value={schedule.priority}
                onChange={(e) => setSchedule((item) => ({ ...item, priority: e.target.value }))}
                fullWidth
              >
                {['Low', 'Medium', 'High'].map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </TextField>
              <Button size="small" variant="contained" onClick={() => handleSaveSchedule(false)}>
                Schedule Follow-up
              </Button>
            </Stack>
          )}

          {/* Add Note Mode */}
          {mode === 'note' && (
            <Stack spacing={1.5}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Add New Internal Note
              </Typography>
              <TextField
                label="Title / Summary"
                value={note.title}
                onChange={(e) => setNote((item) => ({ ...item, title: e.target.value }))}
                fullWidth
              />
              <TextField
                label="Note Details"
                multiline
                minRows={4}
                value={note.text}
                onChange={(e) => setNote((item) => ({ ...item, text: e.target.value }))}
                fullWidth
              />
              <TextField
                select
                label="Category"
                value={note.category}
                onChange={(e) => setNote((item) => ({ ...item, category: e.target.value }))}
                fullWidth
              >
                {['General', 'Customer Preference', 'Pricing', 'Documents', 'Important', 'Escalation'].map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="contained" onClick={handleSaveNote}>
                Save Note
              </Button>
            </Stack>
          )}
        </Box>

        {/* Drawer Footer Action Buttons */}
        <Box sx={{ p: { xs: 2, sm: 2.5 }, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="flex-end">
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<MdEdit />}
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Lead
            </Button>
            <Button size="small" variant="outlined" onClick={() => setMode('note')}>
              Add Note
            </Button>
            <Button size="small" variant="outlined" onClick={() => setMode('communication')}>
              Schedule Follow-up
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<MdAdd />}
              onClick={() => setIsWizardOpen(true)}
            >
              Create Proposal
            </Button>
            <Button size="small" endIcon={<MdMoreHoriz />} onClick={(e) => setMenuAnchor(e.currentTarget)}>
              More
            </Button>

            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
              {['Duplicate Lead', 'Reassign Executive', 'Mark Lost', 'Archive Lead', 'Export PDF'].map((item) => (
                <MenuItem key={item} onClick={() => setMenuAnchor(null)}>
                  {item}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem
                onClick={() => {
                  setMenuAnchor(null);
                  setIsConfirmDeleteLeadOpen(true);
                }}
                sx={{ color: 'error.main', fontWeight: 600 }}
              >
                <MdDelete style={{ marginRight: 8 }} size={18} /> Delete Lead
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Drawer>

      {/* Spec-Compliant Edit Lead Popup Dialog */}
      <EditLeadModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        lead={currentLead}
        onSave={handleSaveLeadFromModal}
      />

      {/* Entry Point 1: Create Proposal Wizard directly pre-filled from Lead */}
      <CreateProposalWizard
        open={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        lead={currentLead}
        onSaveProposal={(newProposal) => {
          setSavedMessage(`Proposal ${newProposal.id} created successfully!`);
          setTimeout(() => setSavedMessage(''), 4000);
        }}
      />

      {/* Delete Lead Confirmation Dialog */}
      <Dialog open={isConfirmDeleteLeadOpen} onClose={() => setIsConfirmDeleteLeadOpen(false)}>
        <DialogTitle>Confirm Delete Lead</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete lead <strong>{currentLead.name}</strong> ({currentLead.id})? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDeleteLeadOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setIsConfirmDeleteLeadOpen(false);
              if (onDeleteLead) {
                onDeleteLead(currentLead.id);
              }
              onClose();
            }}
          >
            Delete Lead
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LeadSummaryDrawer;
