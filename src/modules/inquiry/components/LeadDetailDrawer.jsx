import { Drawer, Box, Typography, IconButton, Chip, Stack, Divider, Button } from '@mui/material';
import { MdClose, MdPhone, MdChat, MdEmail, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from '../contexts/InquiryContext';

export default function LeadDetailDrawer() {
  const { drawerLead, closeDrawer, openEditModal } = useInquiry();
  const navigate = useNavigate();

  if (!drawerLead) return null;

  const priorityColor =
    drawerLead.priority === 'Hot'
      ? { bg: '#FEE2E2', color: '#EF4444' }
      : drawerLead.priority === 'Warm'
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

  return (
    <Drawer
      anchor="right"
      open={Boolean(drawerLead)}
      onClose={closeDrawer}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 420 },
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
              label="Inquiry Action"
              size="small"
              sx={{ bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 600, fontSize: 11 }}
            />
            <Chip
              label={drawerLead.priority}
              size="small"
              sx={{ bgcolor: priorityColor.bg, color: priorityColor.color, fontWeight: 700, fontSize: 11 }}
            />
            <Chip
              label={drawerLead.status || 'Active'}
              size="small"
              sx={{ bgcolor: '#F1F5F9', color: '#475569', fontWeight: 600, fontSize: 11 }}
            />
          </Stack>
          <IconButton onClick={closeDrawer} size="small" sx={{ color: '#64748B' }}>
            <MdClose size={20} />
          </IconButton>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5, fontSize: 20 }}>
          Lead Details
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5, lineHeight: 1.4, fontSize: 13 }}>
          Manage pipeline, owner, follow-up, and communication actions for this enquiry.
        </Typography>

        <Divider sx={{ mb: 2.5 }} />

        {/* Detail items list */}
        <Stack spacing={1.75}>
          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              LEAD ID
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
              {drawerLead.id}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              DATE
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {drawerLead.date}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              NAME
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
              {drawerLead.clientName}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              NUMBER OF TRAVELLERS
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {drawerLead.pax}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              CONTACT
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {drawerLead.phone} / {drawerLead.email}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              DESTINATION
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {drawerLead.destination}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              REQUIREMENT
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {drawerLead.requirement}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              BUDGET
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {drawerLead.budget}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              TRAVEL DATES
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {drawerLead.travelStart} - {drawerLead.travelEnd}
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 1.5, borderRadius: '8px', border: '1px solid #F1F5F9' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', mb: 0.25, fontSize: 10.5 }}>
              LAST ACTIVITY
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {drawerLead.lastUpdated}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Sticky Bottom Action Buttons Bar */}
      <Box sx={{ pt: 2.5, mt: 2, borderTop: '1px solid #E2E8F0' }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<MdPhone size={16} />}
            sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#334155', py: 0.75 }}
          >
            Call
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<MdChat size={16} />}
            sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#2563EB', borderColor: '#BFDBFE', bgcolor: '#EFF6FF', py: 0.75 }}
          >
            WhatsApp
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<MdEmail size={16} />}
            sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, color: '#334155', py: 0.75 }}
          >
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
