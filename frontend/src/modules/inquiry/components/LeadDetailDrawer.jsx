import { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
  Divider,
  Button,
  Grid,
  Card,
  Collapse,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  MdClose,
  MdPhone,
  MdChat,
  MdEmail,
  MdEditNote,
  MdOpenInNew,
  MdCalendarToday,
  MdExpandMore,
  MdExpandLess,
  MdWarning,
  MdCheckCircle,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from '../contexts/InquiryContext';

// Format display ID e.g. Q/26/1961923 -> LD-1961923 or LD-1923
function formatDisplayLeadId(idStr) {
  if (!idStr) return 'LD-0000';
  if (idStr.startsWith('Q/26/')) {
    return `LD-${idStr.replace('Q/26/', '')}`;
  }
  if (!idStr.startsWith('LD-')) {
    return `LD-${idStr}`;
  }
  return idStr;
}

export default function LeadDetailDrawer() {
  const { drawerLead, closeDrawer, openEditModal, updateLead } = useInquiry();
  const navigate = useNavigate();

  const [showFullRequirements, setShowFullRequirements] = useState(false);
  const [isSchedulingFollowup, setIsSchedulingFollowup] = useState(false);

  // Follow-up Schedule Form State
  const [schedDate, setSchedDate] = useState('');
  const [schedTime, setSchedTime] = useState('16:00');
  const [schedMode, setSchedMode] = useState('Call');
  const [schedNotes, setSchedNotes] = useState('');
  const [scheduleSuccessMsg, setScheduleSuccessMsg] = useState('');

  // Synchronize scheduling state when drawer lead changes
  useEffect(() => {
    if (drawerLead) {
      setSchedDate(drawerLead.nextFollowupDate || new Date().toISOString().slice(0, 10));
      setSchedMode(drawerLead.followupMode || 'Call');
      setSchedNotes(drawerLead.followupNotes || '');
      setIsSchedulingFollowup(false);
      setScheduleSuccessMsg('');
    }
  }, [drawerLead]);

  if (!drawerLead) return null;

  const displayId = formatDisplayLeadId(drawerLead.id);
  const clientName = drawerLead.clientName || drawerLead.name || 'Valued Customer';
  const phone = drawerLead.phone || drawerLead.contactPhone || '';
  const email = drawerLead.email || drawerLead.contactEmail || '';
  const priority = drawerLead.priority || drawerLead.temperature || 'Warm';
  const stage = drawerLead.leadStage || drawerLead.stage || drawerLead.status || 'New';
  const source = drawerLead.source || drawerLead.leadSource || 'Website';
  const executive = drawerLead.assignedSalesUser || drawerLead.salesExecutive || 'Priya Nair';

  const destination = drawerLead.destination || 'Selected Destination';
  const departureCity = drawerLead.departureCity || 'Origin';
  const travelStart = drawerLead.travelStart || drawerLead.departureDate || '';
  const travelEnd = drawerLead.travelEnd || drawerLead.returnDate || '';
  const durationNights = drawerLead.durationNights || 5;

  const paxDisplay =
    drawerLead.adults !== undefined
      ? `${drawerLead.adults} Adults${drawerLead.children ? `, ${drawerLead.children} Children` : ''}${drawerLead.infants ? `, ${drawerLead.infants} Infants` : ''}`
      : `${drawerLead.pax || drawerLead.totalPax || 2} Travelers`;

  const travelType = drawerLead.travelType || 'International';
  const travelPurpose = drawerLead.travelPurpose || drawerLead.inquiryType || drawerLead.requirement || 'Honeymoon';

  const budget = drawerLead.budget || '';
  const estimatedValue = drawerLead.estimatedDealValue
    ? `₹${Number(drawerLead.estimatedDealValue).toLocaleString('en-IN')}`
    : drawerLead.budget || '';

  const requirementsText = drawerLead.customerRequirements || drawerLead.description || '';
  const internalNotesText = drawerLead.internalNotes || '';

  const handleEditModal = () => {
    closeDrawer();
    openEditModal(drawerLead);
  };

  const handleEditFullPage = () => {
    closeDrawer();
    const safeId = encodeURIComponent(String(drawerLead.id).replace(/\//g, '__'));
    navigate(`/inquiry/manual/${safeId}`);
  };

  // Save Schedule Handler
  const handleSaveSchedule = (e) => {
    e.preventDefault();
    if (!drawerLead || !drawerLead.id) return;

    const formattedFollowupDate = schedDate || new Date().toISOString().slice(0, 10);
    const now = new Date();
    const formattedLastContact = `${now.getDate().toString().padStart(2, '0')}-${now.toLocaleString('en-US', { month: 'short' })}-${now.getFullYear().toString().slice(-2)}`;

    updateLead(drawerLead.id, {
      nextFollowupDate: formattedFollowupDate,
      followupMode: schedMode,
      followupNotes: schedNotes || 'Follow-up scheduled.',
      lastContactDate: formattedLastContact,
    });

    setScheduleSuccessMsg('Follow-up scheduled & updated successfully!');
    setIsSchedulingFollowup(false);

    setTimeout(() => {
      setScheduleSuccessMsg('');
    }, 4000);
  };

  return (
    <Drawer
      anchor="right"
      open={Boolean(drawerLead)}
      onClose={closeDrawer}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 460 },
          p: 0,
          bgcolor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* 1. Header — Clean & Actionable */}
      <Box sx={{ p: 2.5, pb: 2, bgcolor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 20, leading: 1.2 }}>
              {clientName}
            </Typography>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, fontFamily: 'monospace', fontSize: 12 }}>
              {displayId}
            </Typography>
          </Box>
          <IconButton onClick={closeDrawer} size="small" sx={{ color: '#64748B' }}>
            <MdClose size={22} />
          </IconButton>
        </Stack>

        {/* Priority, Stage & Classification Badges */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
          <Chip
            label={priority === 'Hot' ? '🔥 Hot' : priority === 'Warm' ? '🟠 Warm' : '🔵 Cold'}
            size="small"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 800,
              bgcolor: priority === 'Hot' ? '#FCE7F3' : priority === 'Warm' ? '#FEF3C7' : '#EFF6FF',
              color: priority === 'Hot' ? '#BE185D' : priority === 'Warm' ? '#D97706' : '#2563EB',
            }}
          />
          <Chip
            label={stage}
            size="small"
            sx={{ height: 22, fontSize: 11, fontWeight: 700, bgcolor: '#F1F5F9', color: '#334155' }}
          />
          <Chip
            label={`${drawerLead.customerType || 'Individual'} • ${drawerLead.customerCategory || 'New'}`}
            size="small"
            sx={{ height: 22, fontSize: 10.5, fontWeight: 600, bgcolor: '#F8FAFC', color: '#64748B', border: '1px solid #E2E8F0' }}
          />
        </Stack>

        {/* Contact Info (Only non-empty) */}
        <Stack spacing={0.5} sx={{ mt: 1.5 }}>
          {phone && (
            <Typography variant="body2" sx={{ color: '#334155', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <MdPhone size={15} color="#2563EB" /> {phone}
            </Typography>
          )}
          {email && (
            <Typography variant="body2" sx={{ color: '#334155', fontWeight: 500, fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <MdEmail size={15} color="#2563EB" /> {email}
            </Typography>
          )}
        </Stack>

        {/* Quick Contact Action Bar */}
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {phone && (
            <Button
              fullWidth
              size="small"
              variant="outlined"
              component="a"
              href={`tel:${phone}`}
              startIcon={<MdPhone size={16} />}
              sx={{
                borderRadius: '8px',
                borderColor: '#BBF7D0',
                bgcolor: '#F0FDF4',
                color: '#15803D',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: 12,
                py: 0.75,
                '&:hover': { bgcolor: '#DCFCE7', borderColor: '#86EFAC' },
              }}
            >
              Call
            </Button>
          )}

          {email && (
            <Button
              fullWidth
              size="small"
              variant="outlined"
              component="a"
              href={`mailto:${email}`}
              startIcon={<MdEmail size={16} />}
              sx={{
                borderRadius: '8px',
                borderColor: '#BFDBFE',
                bgcolor: '#EFF6FF',
                color: '#1D4ED8',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: 12,
                py: 0.75,
                '&:hover': { bgcolor: '#DBEAFE', borderColor: '#93C5FD' },
              }}
            >
              Email
            </Button>
          )}

          {phone && (
            <Button
              fullWidth
              size="small"
              variant="outlined"
              component="a"
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              startIcon={<MdChat size={16} />}
              sx={{
                borderRadius: '8px',
                borderColor: '#BBF7D0',
                bgcolor: '#F0FDF4',
                color: '#15803D',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: 12,
                py: 0.75,
                '&:hover': { bgcolor: '#DCFCE7', borderColor: '#86EFAC' },
              }}
            >
              WhatsApp
            </Button>
          )}
        </Stack>
      </Box>

      {/* Scrollable Content Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
        <Stack spacing={2.5}>
          {scheduleSuccessMsg && (
            <Alert icon={<MdCheckCircle size={18} />} severity="success" sx={{ borderRadius: '8px', fontWeight: 700, fontSize: 12.5 }}>
              {scheduleSuccessMsg}
            </Alert>
          )}

          {/* Section 1 — 🌴 TRIP SUMMARY */}
          <Card
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '12px',
              border: '1px solid #BFDBFE',
              bgcolor: '#EFF6FF',
            }}
          >
            <Typography variant="caption" sx={{ color: '#1D4ED8', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>
              1. TRIP
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E3A8A', mt: 0.5, fontSize: 17 }}>
              🌴 {destination}
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E40AF', fontSize: 13, mt: 0.25 }}>
              {departureCity} → {destination}
            </Typography>

            <Typography variant="body2" sx={{ color: '#3B82F6', fontWeight: 600, fontSize: 12.5, mt: 0.5 }}>
              {travelStart ? `${travelStart} ${travelEnd ? `– ${travelEnd}` : ''}` : 'Dates TBD'}
            </Typography>

            <Typography variant="caption" sx={{ color: '#1E40AF', fontWeight: 700, display: 'block', mt: 0.5, fontSize: 12 }}>
              {durationNights} Nights • {paxDisplay}
            </Typography>

            <Typography variant="caption" sx={{ color: '#4B5563', fontWeight: 600, display: 'block', mt: 0.25, fontSize: 11.5 }}>
              {travelType} • {travelPurpose}
            </Typography>
          </Card>

          {/* Section 2 — 🎯 PREFERENCES (Only Non-Empty Fields!) */}
          {(budget || drawerLead.hotelCategory || drawerLead.mealPreference || drawerLead.transportationRequired || drawerLead.flightRequired || drawerLead.visaRequired) && (
            <Card elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11, display: 'block', mb: 1 }}>
                2. PREFERENCES
              </Typography>

              <Grid container spacing={1}>
                {budget && (
                  <>
                    <Grid item xs={5}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Budget</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#059669' }}>{budget}</Typography>
                    </Grid>
                  </>
                )}

                {drawerLead.hotelCategory && (
                  <>
                    <Grid item xs={5}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Hotel</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.hotelCategory}</Typography>
                    </Grid>
                  </>
                )}

                {drawerLead.mealPreference && (
                  <>
                    <Grid item xs={5}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Meal Plan</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.mealPreference}</Typography>
                    </Grid>
                  </>
                )}

                {drawerLead.transportationRequired && (
                  <>
                    <Grid item xs={5}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Transport</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.transportationRequired}</Typography>
                    </Grid>
                  </>
                )}

                {(drawerLead.flightRequired === true || drawerLead.flightRequired === 'Yes') && (
                  <>
                    <Grid item xs={5}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Flight</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#2563EB' }}>Required</Typography>
                    </Grid>
                  </>
                )}

                {(drawerLead.visaRequired === true || drawerLead.visaRequired === 'Yes') && (
                  <>
                    <Grid item xs={5}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Visa</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#D97706' }}>Required</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Card>
          )}

          {/* Section 3 — 📊 SALES */}
          <Card elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11, display: 'block', mb: 1 }}>
              3. SALES
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Stage</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{stage}</Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Priority</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: priority === 'Hot' ? '#DC2626' : '#D97706' }}>
                  {priority === 'Hot' ? '🔥 Hot' : priority === 'Warm' ? '🟠 Warm' : '🔵 Cold'}
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Executive</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B' }}>{executive}</Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Source</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>{source}</Typography>
              </Grid>

              {estimatedValue && (
                <>
                  <Grid item xs={5}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Deal Value</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#059669' }}>{estimatedValue}</Typography>
                  </Grid>
                </>
              )}

              {drawerLead.probabilityPct !== undefined && (
                <>
                  <Grid item xs={5}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Probability</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#2563EB' }}>{drawerLead.probabilityPct}%</Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Card>

          {/* Section 4 — ⏰ NEXT ACTION (Interactive Schedule Form) */}
          <Card
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '12px',
              border: '1px solid #FDE68A',
              bgcolor: '#FFFBEB',
            }}
          >
            <Typography variant="caption" sx={{ color: '#B45309', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>
              4. NEXT ACTION
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.75 }}>
              <Chip
                label={`🔴 Scheduled: ${drawerLead.nextFollowupDate || 'Today, 4:00 PM'}`}
                size="small"
                sx={{ height: 22, fontSize: 11, fontWeight: 800, bgcolor: '#FEF2F2', color: '#991B1B', border: '1px solid #FCA5A5' }}
              />
            </Stack>

            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={5}>
                <Typography variant="caption" sx={{ color: '#92400E', fontWeight: 600 }}>Last Contact</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#78350F' }}>
                  {drawerLead.lastContactDate || drawerLead.date || 'Today'}
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="caption" sx={{ color: '#92400E', fontWeight: 600 }}>Mode</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#78350F' }}>
                  📞 {drawerLead.followupMode || 'Call'}
                </Typography>
              </Grid>
            </Grid>

            {drawerLead.followupNotes && (
              <Box sx={{ mt: 1, p: 1, bgcolor: '#FFFFFF', borderRadius: '6px', border: '1px solid #FEF3C7' }}>
                <Typography variant="caption" sx={{ color: '#78350F', fontStyle: 'italic', fontSize: 12 }}>
                  "{drawerLead.followupNotes}"
                </Typography>
              </Box>
            )}

            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => setIsSchedulingFollowup(!isSchedulingFollowup)}
              startIcon={<MdCalendarToday size={14} />}
              sx={{
                mt: 1.5,
                borderRadius: '8px',
                borderColor: '#F59E0B',
                color: '#B45309',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: 12,
                '&:hover': { bgcolor: '#FEF3C7', borderColor: '#D97706' },
              }}
            >
              {isSchedulingFollowup ? 'Cancel Scheduling' : '+ Schedule Follow-up'}
            </Button>

            {/* Interactive Schedule Follow-up Form */}
            <Collapse in={isSchedulingFollowup}>
              <Box component="form" onSubmit={handleSaveSchedule} sx={{ mt: 1.5, pt: 1.5, borderTop: '1px dashed #FDE68A' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#92400E', display: 'block', mb: 1, textTransform: 'uppercase', fontSize: 11 }}>
                  Schedule Next Follow-up
                </Typography>

                <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#78350F', fontSize: 11, display: 'block', mb: 0.5 }}>Date</Typography>
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      value={schedDate}
                      onChange={(e) => setSchedDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                      sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#78350F', fontSize: 11, display: 'block', mb: 0.5 }}>Time</Typography>
                    <TextField
                      fullWidth
                      type="time"
                      size="small"
                      value={schedTime}
                      onChange={(e) => setSchedTime(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#78350F', fontSize: 11, display: 'block', mb: 0.5 }}>Follow-up Mode</Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={schedMode}
                      onChange={(e) => setSchedMode(e.target.value)}
                      sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}
                    >
                      {['Call', 'WhatsApp', 'Email', 'Meeting', 'Video Call'].map((m) => (
                        <MenuItem key={m} value={m}>{m}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#78350F', fontSize: 11, display: 'block', mb: 0.5 }}>Follow-up Remarks / Agenda</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      size="small"
                      placeholder="e.g. Call customer to discuss revised quote..."
                      value={schedNotes}
                      onChange={(e) => setSchedNotes(e.target.value)}
                      sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}
                    />
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setIsSchedulingFollowup(false)}
                    sx={{ color: '#78350F', fontWeight: 600, textTransform: 'none', fontSize: 12 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    disableElevation
                    sx={{ bgcolor: '#D97706', '&:hover': { bgcolor: '#B45309' }, fontSize: 12, textTransform: 'none', fontWeight: 700, px: 2 }}
                  >
                    Save Schedule
                  </Button>
                </Stack>
              </Box>
            </Collapse>
          </Card>

          {/* Section 5 — 📝 REQUIREMENTS */}
          {requirementsText && (
            <Card elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11, display: 'block', mb: 0.5 }}>
                5. CUSTOMER REQUIREMENTS
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#334155',
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: showFullRequirements ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {requirementsText}
              </Typography>

              {requirementsText.length > 100 && (
                <Button
                  size="small"
                  onClick={() => setShowFullRequirements(!showFullRequirements)}
                  endIcon={showFullRequirements ? <MdExpandLess /> : <MdExpandMore />}
                  sx={{ p: 0, mt: 0.5, textTransform: 'none', fontSize: 11.5, fontWeight: 700, color: '#2563EB' }}
                >
                  {showFullRequirements ? 'Show Less' : 'View More'}
                </Button>
              )}
            </Card>
          )}

          {/* Staff Private Notes Callout */}
          {internalNotesText && (
            <Box sx={{ p: 1.75, borderRadius: '10px', bgcolor: '#FFFBEB', border: '1px solid #FDE68A' }}>
              <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.5 }}>
                <MdWarning size={16} color="#D97706" />
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#B45309', fontSize: 11 }}>
                  INTERNAL NOTE (Staff Only)
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: '#92400E', fontSize: 12, fontStyle: 'italic' }}>
                "{internalNotesText}"
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Fixed Bottom Actions Bar */}
      <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <Grid container spacing={1.5}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleEditModal}
              startIcon={<MdEditNote size={18} />}
              sx={{
                borderRadius: '8px',
                borderColor: '#CBD5E1',
                color: '#334155',
                fontWeight: 700,
                textTransform: 'none',
                py: 1,
                fontSize: 13,
                '&:hover': { bgcolor: '#F8FAFC', borderColor: '#94A3B8' },
              }}
            >
              Edit Lead
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              onClick={handleEditFullPage}
              endIcon={<MdOpenInNew size={16} />}
              sx={{
                borderRadius: '8px',
                bgcolor: '#2563EB',
                '&:hover': { bgcolor: '#1D4ED8' },
                color: '#FFFFFF',
                fontWeight: 700,
                textTransform: 'none',
                py: 1,
                fontSize: 13,
              }}
            >
              Open Full Lead
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
}
