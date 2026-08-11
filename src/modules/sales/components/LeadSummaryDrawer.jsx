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
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  MdOutlineClose,
  MdAdd,
  MdMoreHoriz,
  MdEdit,
  MdDelete,
  MdOutlineDelete,
  MdCall,
  MdWhatsapp,
  MdEmail,
  MdSms,
  MdSend,
  MdOutlineSchedule,
  MdHistory,
} from 'react-icons/md';
import { formatCurrency, formatDate } from '@utils/formatters';
import { tokens } from '@styles/theme';
import EditLeadModal from './EditLeadModal';
import CreateProposalWizard from './CreateProposalWizard';
import { MODE_TEMPLATES, generateTemplateContent } from '../data/followUpTemplates';

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

// Activity Pipeline Timeline with exact Timestamps + Current Pointer (Task 2 & 3)
const initialTimeline = [
  { event: 'Inquiry Created', timestamp: '01 Aug · 10:15 AM', status: 'Completed', completed: true },
  { event: 'Lead Assigned', timestamp: '01 Aug · 10:30 AM', status: 'Completed', completed: true },
  { event: 'Proposal Created', timestamp: '02 Aug · 11:45 AM', status: 'Completed', completed: true },
  { event: 'Proposal Sent', timestamp: '02 Aug · 02:15 PM', status: 'Completed', completed: true },
  { event: 'Proposal Viewed', timestamp: '02 Aug · 04:10 PM', status: 'Completed', completed: true },
  { event: 'Follow-up Planner', timestamp: '03 Aug · 02:15 PM', status: 'Current Stage', completed: true, isCurrent: true },
  { event: 'Negotiation', timestamp: 'Upcoming', status: 'Upcoming', completed: false },
  { event: 'Soft Confirm', timestamp: 'Upcoming', status: 'Upcoming', completed: false },
  { event: 'Confirmed Booking', timestamp: 'Upcoming', status: 'Upcoming', completed: false },
];

const initialNotes = [
  { date: '03 Aug 2026', author: 'Priya Sharma', text: 'Customer prefers morning flights.' },
  { date: '02 Aug 2026', author: 'Priya Sharma', text: 'Interested in 4-star or 5-star hotels.' },
  { date: '01 Aug 2026', author: 'Rahul Jain', text: 'Requested honeymoon room decoration.' },
];

const initialCommunications = [
  {
    id: 'ACT-901',
    activityId: 'ACT-901',
    followUpId: 'FLP-301',
    customerId: 'CUST-1001',
    leadId: 'LD-1001',
    proposalId: 'PR-2601',
    type: 'Call',
    template: 'Proposal Follow-up',
    title: 'Call logged with Rohan & Anjali Mehta',
    details: 'Discussed connecting rooms requirement and initial flight pricing.',
    timestamp: '03 Aug · 10:15 AM',
    status: 'Completed',
    createdBy: 'Priya Sharma',
  },
  {
    id: 'ACT-902',
    activityId: 'ACT-902',
    followUpId: 'FLP-302',
    customerId: 'CUST-1001',
    leadId: 'LD-1001',
    proposalId: 'PR-2601',
    type: 'WhatsApp',
    template: 'Proposal Sent',
    title: 'WhatsApp message sent to Rohan & Anjali Mehta',
    details: 'Shared Bali luxury villa proposal PDF link.',
    timestamp: '02 Aug · 04:30 PM',
    status: 'Completed',
    createdBy: 'Priya Sharma',
  },
];

function LeadSummaryDrawer({ lead, open, onClose, onUpdateLead, onDeleteLead }) {
  const [activeLead, setActiveLead] = useState(lead);
  const [mode, setMode] = useState('overview'); // 'overview' | 'activity' | 'communication' | 'note'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isConfirmDeleteLeadOpen, setIsConfirmDeleteLeadOpen] = useState(false);

  const [notes, setNotes] = useState(initialNotes);
  const [note, setNote] = useState({ title: '', text: '', category: 'General' });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');

  // Schedule Communication States (Task 5 & 8)
  const [commMode, setCommMode] = useState('Call');
  const [commTemplate, setCommTemplate] = useState('');
  const [commSubject, setCommSubject] = useState('');
  const [commMessage, setCommMessage] = useState('');
  const [commDate, setCommDate] = useState('2026-08-05');
  const [commTime, setCommTime] = useState('11:00');
  const [leadCommunications, setLeadCommunications] = useState(initialCommunications);

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

  // Handle Communication Template Change
  const handleCommTemplateChange = (tmpl) => {
    setCommTemplate(tmpl);
    if (!tmpl || tmpl === 'Custom') {
      setCommSubject('');
      setCommMessage('');
      return;
    }
    const content = generateTemplateContent(commMode, tmpl, {
      customer: currentLead.name,
      destination: destinationText,
      proposalId: currentLead.proposalId || 'PR-2601',
      amount: formatCurrency(budgetVal),
      executive: currentLead.salesExecutive || 'Priya Sharma',
    });
    setCommSubject(content.subject || '');
    setCommMessage(content.message || '');
  };

  // Handle Communication Mode Change
  const handleCommModeChange = (newMode) => {
    if (!newMode) return;
    setCommMode(newMode);
    setCommTemplate('');
    setCommSubject('');
    setCommMessage('');
  };

  // Dispatch Communication Activity (Send Now or Schedule) - Unified Service Call
  const dispatchCommunicationRecord = (isSendNow) => {
    const actId = `ACT-${Math.floor(100 + Math.random() * 900)}`;
    const flpId = `FLP-${Math.floor(100 + Math.random() * 900)}`;
    const custId = currentLead.customerId || `CUST-${currentLead.id.replace('LD-', '')}`;
    const propId = currentLead.proposalId || 'PR-2601';

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestamp = isSendNow ? `Today · ${nowStr}` : `${commDate} · ${commTime}`;

    const newRecord = {
      id: actId,
      activityId: actId,
      followUpId: flpId,
      customerId: custId,
      leadId: currentLead.id,
      proposalId: propId,
      type: commMode,
      mode: commMode,
      template: commTemplate || 'Custom',
      title: `${commMode} ${isSendNow ? 'sent to' : 'scheduled for'} ${currentLead.name}`,
      details: commSubject ? `Subject: ${commSubject} | ${commMessage}` : commMessage || `Logged ${commMode} communication`,
      timestamp,
      status: isSendNow ? 'Completed' : 'Scheduled',
      createdBy: currentLead.salesExecutive || 'Priya Sharma',
    };

    // Add locally to lead communications
    setLeadCommunications((prev) => [newRecord, ...prev]);

    // Add to activity notes
    setNotes((prev) => [
      {
        date: 'Today',
        author: currentLead.salesExecutive || 'Priya Sharma',
        text: `[${commMode} ${isSendNow ? 'Sent' : 'Scheduled'}] ${commSubject ? commSubject + ' - ' : ''}${commMessage || 'Communication logged'}`,
      },
      ...prev,
    ]);

    // Dispatch global custom event to sync with Follow Up module
    try {
      window.dispatchEvent(new CustomEvent('communication_activity_created', { detail: newRecord }));
    } catch {
      // safe fallback
    }

    setSavedMessage(isSendNow ? `${commMode} sent and logged successfully!` : `${commMode} follow-up scheduled for ${commDate}.`);
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

          {/* Activity Mode with Timestamps & Current Pointer (Task 2 & 3) */}
          {mode === 'activity' && (
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Activity Pipeline Timeline
                </Typography>
                <Stack spacing={1.5}>
                  {initialTimeline.map((item) => (
                    <Stack
                      key={item.event}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        p: item.isCurrent ? 1.25 : 0.75,
                        borderRadius: 2,
                        bgcolor: item.isCurrent ? 'rgba(47,143,134,0.08)' : 'transparent',
                        border: item.isCurrent ? `1px solid ${tokens.color.teal500}` : 'none',
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: item.isCurrent
                            ? tokens.color.teal500
                            : item.completed
                              ? tokens.color.navy700
                              : tokens.color.ink400,
                          boxShadow: item.isCurrent ? `0 0 0 4px ${tokens.color.teal500}33` : 'none',
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" sx={{ fontWeight: item.isCurrent ? 700 : 600 }}>
                            {item.isCurrent ? `◉ ${item.event}` : `● ${item.event}`}
                          </Typography>
                          {item.isCurrent && (
                            <Chip
                              size="small"
                              label="Current Stage"
                              color="primary"
                              sx={{ height: 18, fontSize: '0.68rem', fontWeight: 700 }}
                            />
                          )}
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {item.status}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 700, color: item.isCurrent ? tokens.color.teal500 : 'text.secondary' }}
                      >
                        {item.timestamp}
                      </Typography>
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

          {/* Communication Mode (Task 5 & 8) */}
          {mode === 'communication' && (
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Schedule Communication for {currentLead.name}
                </Typography>

                {/* Mode Selector Toggles */}
                <ToggleButtonGroup
                  value={commMode}
                  exclusive
                  onChange={(_, val) => handleCommModeChange(val)}
                  size="small"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <ToggleButton value="Call" sx={{ fontWeight: 700 }}>
                    <MdCall style={{ marginRight: 6 }} size={16} /> Call
                  </ToggleButton>
                  <ToggleButton value="WhatsApp" sx={{ fontWeight: 700 }}>
                    <MdWhatsapp style={{ marginRight: 6 }} size={16} /> WhatsApp
                  </ToggleButton>
                  <ToggleButton value="Email" sx={{ fontWeight: 700 }}>
                    <MdEmail style={{ marginRight: 6 }} size={16} /> Email
                  </ToggleButton>
                  <ToggleButton value="SMS" sx={{ fontWeight: 700 }}>
                    <MdSms style={{ marginRight: 6 }} size={16} /> SMS
                  </ToggleButton>
                </ToggleButtonGroup>

                {/* Mode-Specific Template Dropdown */}
                <TextField
                  select
                  label="Select Template"
                  value={commTemplate}
                  onChange={(e) => handleCommTemplateChange(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="">
                    <em>Select Template ▼</em>
                  </MenuItem>
                  {(MODE_TEMPLATES[commMode] || []).map((tmpl) => (
                    <MenuItem key={tmpl} value={tmpl}>
                      {tmpl}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Email Subject Field */}
                {commMode === 'Email' && (
                  <TextField
                    label="Subject"
                    size="small"
                    value={commSubject}
                    onChange={(e) => setCommSubject(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}

                {/* Message / Talking Points Field */}
                <TextField
                  label={commMode === 'Call' ? 'Talking Points / Call Notes' : 'Editable Message'}
                  multiline
                  minRows={3}
                  value={commMessage}
                  onChange={(e) => setCommMessage(e.target.value)}
                  fullWidth
                  size="small"
                  placeholder={
                    commMode === 'Call'
                      ? 'e.g. 1. Discuss budget constraints. 2. Present villa upgrade options...'
                      : 'Enter message text to send or schedule...'
                  }
                  sx={{ mb: 2 }}
                />

                {/* Schedule Date & Time Pickers */}
                <Grid container spacing={1.5} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="Schedule Date"
                      type="date"
                      size="small"
                      value={commDate}
                      onChange={(e) => setCommDate(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Schedule Time"
                      type="time"
                      size="small"
                      value={commTime}
                      onChange={(e) => setCommTime(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                {/* Action Buttons: Send Now & Schedule */}
                <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MdSend />}
                    onClick={() => dispatchCommunicationRecord(true)}
                  >
                    Send Now
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<MdOutlineSchedule />}
                    onClick={() => dispatchCommunicationRecord(false)}
                  >
                    Schedule
                  </Button>
                </Stack>
              </Box>

              <Divider />

              {/* Communication History Section */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <MdHistory size={18} color={tokens.color.navy700} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Communication History ({currentLead.name})
                  </Typography>
                </Stack>

                <Stack spacing={1.25}>
                  {leadCommunications.map((comm) => (
                    <Box
                      key={comm.id}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'background.default',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            size="small"
                            label={comm.type}
                            color={
                              comm.type === 'Call'
                                ? 'primary'
                                : comm.type === 'WhatsApp'
                                  ? 'success'
                                  : comm.type === 'Email'
                                    ? 'info'
                                    : 'warning'
                            }
                            sx={{ fontWeight: 700, height: 20 }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {comm.title}
                          </Typography>
                        </Stack>
                        <Chip
                          size="small"
                          label={comm.status}
                          variant="outlined"
                          color={comm.status === 'Completed' ? 'success' : 'secondary'}
                          sx={{ height: 18, fontSize: '0.7rem' }}
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, fontSize: '0.85rem' }}>
                        {comm.details}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {comm.timestamp} · {comm.createdBy}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {comm.activityId} · {comm.followUpId} · {comm.proposalId}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
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
              Schedule Communication
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
