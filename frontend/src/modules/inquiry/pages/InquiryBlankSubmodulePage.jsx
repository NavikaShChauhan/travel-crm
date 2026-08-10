import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { MdOutlineExplore, MdAdd } from 'react-icons/md';
import { useInquiry } from '../contexts/InquiryContext';
import AddLeadModal from '../components/AddLeadModal';

export default function InquiryBlankSubmodulePage({ title, subtitle }) {
  const { openAddModal } = useInquiry();

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <AddLeadModal />

      {/* Header Banner */}
      <Card
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: '16px',
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                bgcolor: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
              }}
            >
              <MdOutlineExplore size={28} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
                {title || 'Inquiry Engine Submodule'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13, mt: 0.25 }}>
                {subtitle || 'Submodule workspace and incoming enquiry channel settings.'}
              </Typography>
            </Box>
          </Stack>
          <Button
            variant="contained"
            disableElevation
            startIcon={<MdAdd size={18} />}
            onClick={openAddModal}
            sx={{
              bgcolor: '#3B82F6',
              '&:hover': { bgcolor: '#2563EB' },
              borderRadius: '8px',
              px: 2.5,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: 14,
            }}
          >
            Add Lead
          </Button>
        </Stack>
      </Card>

      {/* Blank Workspace Placeholder Card */}
      <Card
        elevation={0}
        sx={{
          p: 6,
          borderRadius: '16px',
          border: '1px border #E2E8F0',
          bgcolor: '#FFFFFF',
          textAlign: 'center',
          borderStyle: 'dashed',
          borderColor: '#CBD5E1',
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: '#EFF6FF',
            color: '#3B82F6',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <MdOutlineExplore size={32} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
          {title} Workspace
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 460, mx: 'auto', mb: 3 }}>
          Information and live integration for this submodule will be configured here. Work in progress.
        </Typography>
      </Card>
    </Box>
  );
}
