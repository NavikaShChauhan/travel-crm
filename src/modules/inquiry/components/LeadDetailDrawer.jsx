import { Drawer, Box, Typography, IconButton, Chip, Stack, Divider, Button, Grid } from '@mui/material';
import { MdClose, MdPhone, MdChat, MdEmail, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from '../contexts/InquiryContext';

export default function LeadDetailDrawer() {
  const { drawerLead, closeDrawer, openEditModal } = useInquiry();
  const navigate = useNavigate();

  if (!drawerLead) return null;

  const priorityColor =
    (drawerLead.priority || drawerLead.temperature) === 'Hot'
      ? { bg: '#FEE2E2', color: '#EF4444' }
      : (drawerLead.priority || drawerLead.temperature) === 'Warm'
      ? { bg: '#FEF3C7', color: '#D97706' }
      : { bg: '#DBEAFE', color: '#2563EB' };

  const handleEditModal = () => {
    closeDrawer();
    openEditModal(drawerLead);
  };

  const handleEditFullPage = () => {
    closeDrawer();
    navigate(`/inquiry/manual/${encodeURIComponent(drawerLead.id)}`);
  };

  const paxDisplay =
    drawerLead.adults !== undefined
      ? `${drawerLead.adults} Adults${drawerLead.children ? `, ${drawerLead.children} Children` : ''}${drawerLead.infants ? `, ${drawerLead.infants} Infants` : ''}`
      : drawerLead.pax || drawerLead.totalPax || 1;

  return (
    <Drawer
      anchor="right"
      open={Boolean(drawerLead)}
      onClose={closeDrawer}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 480 },
          p: 3,
          bgcolor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Scrollable content area */}
      <Box sx={{ flex: 1, overflowY: 'auto', pr: 0.5 }}>
        {/* Header Badges & Close Button */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Chip
              label="7-Section Lead"
              size="small"
              sx={{ bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 700, fontSize: 11 }}
            />
            <Chip
              label={drawerLead.priority || drawerLead.temperature || 'Warm'}
              size="small"
              sx={{ bgcolor: priorityColor.bg, color: priorityColor.color, fontWeight: 700, fontSize: 11 }}
            />
            <Chip
              label={drawerLead.leadStatus || drawerLead.stage || drawerLead.status || 'New'}
              size="small"
              sx={{ bgcolor: '#F1F5F9', color: '#475569', fontWeight: 600, fontSize: 11 }}
            />
          </Stack>
          <IconButton onClick={closeDrawer} size="small" sx={{ color: '#64748B' }}>
            <MdClose size={20} />
          </IconButton>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5, fontSize: 20 }}>
          Lead Summary ({drawerLead.id})
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 2, lineHeight: 1.4, fontSize: 13 }}>
          Detailed contact info, travel specs, preferences, follow-ups, and notes.
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Detail Sections */}
        <Stack spacing={2}>
          {/* Section 1: Basic Information */}
          <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: '10px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 1, fontSize: 11 }}>
              1. Basic Information
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>CUSTOMER NAME</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{drawerLead.clientName || drawerLead.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>MOBILE NUMBER</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{drawerLead.phone || drawerLead.contactPhone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>EMAIL</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.email || drawerLead.contactEmail || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>COMPANY / ALT MOBILE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.companyName || drawerLead.alternatePhone || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 2: Travel Information */}
          <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: '10px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 1, fontSize: 11 }}>
              2. Travel Information
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>DESTINATION</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{drawerLead.destination}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>DEPARTURE CITY</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{drawerLead.departureCity || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>TRAVEL DATES</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.travelStart || drawerLead.departureDate} {drawerLead.travelEnd ? `to ${drawerLead.travelEnd}` : ''}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>PAX BREAKDOWN</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{paxDisplay}</Typography>
              </Grid>

              {/* Child & Infant Ages Display */}
              {drawerLead.childAges && drawerLead.childAges.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 700, display: 'block', fontSize: 10.5 }}>CHILD AGES:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.childAges.join(', ')}</Typography>
                </Grid>
              )}

              {drawerLead.infantAges && drawerLead.infantAges.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#D97706', fontWeight: 700, display: 'block', fontSize: 10.5 }}>INFANT AGES:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.infantAges.join(', ')}</Typography>
                </Grid>
              )}

              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>TRIP TYPE & PURPOSE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.travelType} · {drawerLead.travelPurpose || drawerLead.inquiryType || 'Leisure'}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 3: Customer Preferences & Transport */}
          <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: '10px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 1, fontSize: 11 }}>
              3. Preferences & Logistics
            </Typography>
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>BUDGET</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#059669' }}>{drawerLead.budget || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>HOTEL & MEAL PLAN</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.hotelCategory} · {drawerLead.mealPreference}</Typography>
              </Grid>
            </Grid>

            {/* Transport & Requirement Badges */}
            <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
              {drawerLead.flightRequired && <Chip label="Flight Required" size="small" sx={{ bgcolor: '#EFF6FF', color: '#2563EB', fontSize: 10.5, fontWeight: 700 }} />}
              {drawerLead.trainRequired && <Chip label="Train Required" size="small" sx={{ bgcolor: '#F5F3FF', color: '#7C3AED', fontSize: 10.5, fontWeight: 700 }} />}
              {drawerLead.cabRequired && <Chip label="Cab Required" size="small" sx={{ bgcolor: '#ECFDF5', color: '#059669', fontSize: 10.5, fontWeight: 700 }} />}
              {drawerLead.visaRequired && <Chip label="Visa Required" size="small" sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontSize: 10.5, fontWeight: 700 }} />}
              {drawerLead.passportAvailable && <Chip label="Passport Available" size="small" sx={{ bgcolor: '#F1F5F9', color: '#334155', fontSize: 10.5, fontWeight: 700 }} />}
              {drawerLead.travelInsuranceRequired && <Chip label="Insurance Needed" size="small" sx={{ bgcolor: '#FDF2F8', color: '#DB2777', fontSize: 10.5, fontWeight: 700 }} />}
            </Stack>
          </Box>

          {/* Section 4: Lead Management */}
          <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: '10px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 1, fontSize: 11 }}>
              4. Management & Probability
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>EXECUTIVE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{drawerLead.assignedSalesUser || drawerLead.salesExecutive}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>LEAD SOURCE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.source}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>EXPECTED BOOKING</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.expectedBookingDate || 'Not specified'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>PROBABILITY (%)</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#2563EB' }}>{drawerLead.probabilityPct || 50}%</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 5: Follow-up Information */}
          <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: '10px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 1, fontSize: 11 }}>
              5. Follow-up Information
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>LAST CONTACT</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{drawerLead.lastContactDate || drawerLead.date}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>NEXT FOLLOW-UP</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#EF4444' }}>{drawerLead.nextFollowupDate || 'Scheduled'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 10.5 }}>NOTES ({drawerLead.followupMode || 'WhatsApp'})</Typography>
                <Typography variant="body2" sx={{ color: '#334155', fontSize: 12 }}>{drawerLead.followupNotes || 'No recent notes.'}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 6: Customer Requirements */}
          <Box sx={{ bgcolor: '#F8FAFC', p: 2, borderRadius: '10px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 0.5, fontSize: 11 }}>
              6. Customer Requirements
            </Typography>
            <Typography variant="body2" sx={{ color: '#334155', fontSize: 12.5, whiteSpace: 'pre-line' }}>
              {drawerLead.customerRequirements || drawerLead.description || 'No requirements stated.'}
            </Typography>
          </Box>

          {/* Section 7: Internal Staff Notes */}
          <Box sx={{ bgcolor: '#FFFBEB', p: 2, borderRadius: '10px', border: '1px solid #FDE68A' }}>
            <Typography variant="caption" sx={{ color: '#D97706', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 0.5, fontSize: 11 }}>
              7. Staff Internal Notes (Private)
            </Typography>
            <Typography variant="body2" sx={{ color: '#92400E', fontSize: 12.5, fontStyle: 'italic' }}>
              {drawerLead.internalNotes || 'No internal notes added.'}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Sticky Bottom Action Buttons Bar */}
      <Box sx={{ pt: 2.5, mt: 2, borderTop: '1px solid #E2E8F0' }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Button fullWidth variant="outlined" size="small" startIcon={<MdPhone size={16} />} sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#334155', py: 0.75 }}>
            Call
          </Button>
          <Button fullWidth variant="outlined" size="small" startIcon={<MdChat size={16} />} sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#2563EB', borderColor: '#BFDBFE', bgcolor: '#EFF6FF', py: 0.75 }}>
            WhatsApp
          </Button>
          <Button fullWidth variant="outlined" size="small" startIcon={<MdEmail size={16} />} sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#334155', py: 0.75 }}>
            Mail
          </Button>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            variant="outlined"
            disableElevation
            startIcon={<MdEdit size={16} />}
            onClick={handleEditModal}
            sx={{
              borderColor: '#3B82F6',
              color: '#2563EB',
              borderRadius: '8px',
              py: 1,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: 13,
            }}
          >
            Edit Form
          </Button>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            startIcon={<MdEdit size={16} />}
            onClick={handleEditFullPage}
            sx={{
              bgcolor: '#3B82F6',
              '&:hover': { bgcolor: '#2563EB' },
              borderRadius: '8px',
              py: 1,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: 13,
            }}
          >
            Full Inquiry
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
