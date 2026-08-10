import { useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';
import {
  MdAdd,
  MdOutlineExplore,
  MdOutlineGroup,
  MdOutlineWhatshot,
  MdOutlineCheckCircle,
  MdOutlineTrendingUp,
} from 'react-icons/md';

import { useInquiry } from '../contexts/InquiryContext';
import AddLeadModal from '../components/AddLeadModal';

const STAGES = [
  'New',
  'Contacted',
  'Follow-up',
  'Proposal Sent',
  'Viewed',
  'Negotiation',
  'Revised Proposal',
  'Soft Confirm',
];

const SOURCES = [
  'Manual',
  'Website',
  'whatsapp',
  'Instagram / Meta Ads',
  'B2B Partners',
  'Repeat Customers',
];

const PRIORITY_COLORS = {
  Hot: '#EC4899',
  Warm: '#8B5CF6',
  Cold: '#3B82F6',
};

export default function InquiryDashboardPage() {
  const { leads, openAddModal } = useInquiry();

  // Calculate metrics
  const totalEnquiries = leads.length;
  const hotLeadsCount = leads.filter((l) => (l.priority || l.temperature) === 'Hot').length;
  const warmLeadsCount = leads.filter((l) => (l.priority || l.temperature) === 'Warm').length;
  const coldLeadsCount = leads.filter((l) => (l.priority || l.temperature) === 'Cold').length;

  const avgGroupSize =
    totalEnquiries > 0
      ? (leads.reduce((acc, l) => acc + (Number(l.pax || l.totalPax) || 0), 0) / totalEnquiries).toFixed(1)
      : '0.0';

  // Funnel Data
  const funnelData = useMemo(() => {
    return STAGES.map((stage) => {
      const count = leads.filter((l) => (l.stage || l.status) === stage).length;
      return { stage, count };
    });
  }, [leads]);

  // Source Mix Data
  const sourceMix = useMemo(() => {
    return SOURCES.map((src) => {
      const count = leads.filter((l) => l.source === src).length;
      return { source: src, count };
    });
  }, [leads]);

  return (
    <Box>
      <AddLeadModal />

      {/* Header Banner */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '20px',
          bgcolor: '#FFFFFF',
          border: '1px solid #F1F5F9',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6366F1',
              }}
            >
              <MdOutlineExplore size={30} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22, letterSpacing: '-0.01em' }}>
                Inquiry Engine Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13, mt: 0.25 }}>
                Overview of enquiry funnel, trendlines, and lead source distribution.
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            disableElevation
            startIcon={<MdAdd size={20} />}
            onClick={openAddModal}
            sx={{
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' },
              borderRadius: '12px',
              px: 3,
              py: 1.25,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: 14,
              boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)',
            }}
          >
            + Add Lead
          </Button>
        </Stack>
      </Card>

      {/* 4 Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Total Enquiries */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '20px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                  TOTAL ENQUIRIES
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5, fontSize: 32 }}>
                  {totalEnquiries}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontSize: 12 }}>
                  {totalEnquiries} active in pipeline
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '14px', bgcolor: '#F3E8FF', color: '#8B5CF6' }}>
                <MdOutlineGroup size={24} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Hot Leads */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '20px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                  HOT LEADS
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5, fontSize: 32 }}>
                  {hotLeadsCount}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontSize: 12 }}>
                  {hotLeadsCount} follow-up due today
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '14px', bgcolor: '#FCE7F3', color: '#EC4899' }}>
                <MdOutlineWhatshot size={24} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Conversion */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '20px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                  CONVERSION
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5, fontSize: 32 }}>
                  0
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontSize: 12 }}>
                  0% converted
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '14px', bgcolor: '#DCFCE7', color: '#10B981' }}>
                <MdOutlineCheckCircle size={24} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Avg Group Size */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '20px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                  AVG GROUP SIZE
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5, fontSize: 32 }}>
                  {avgGroupSize}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontSize: 12 }}>
                  travellers per enquiry
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '14px', bgcolor: '#E0F2FE', color: '#0284C7' }}>
                <MdOutlineTrendingUp size={24} />
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Main Grid Row 1 */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Lead Stage Funnel */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF', height: '100%', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 17 }}>
              Lead Stage Funnel
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 3, fontSize: 13 }}>
              Current distribution by sales stage.
            </Typography>

            <Box sx={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis
                    dataKey="stage"
                    tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} allowDecimals={false} />
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Source Mix */}
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF', height: '100%', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 17 }}>
              Source Mix
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5, fontSize: 13 }}>
              Lead acquisition channels this cycle.
            </Typography>

            <Stack spacing={2}>
              {sourceMix.map((item) => {
                const percentage = totalEnquiries > 0 ? (item.count / totalEnquiries) * 100 : 0;
                return (
                  <Box key={item.source}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>
                        {item.source}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>
                        {item.count}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#F1F5F9',
                        '& .MuiLinearProgress-bar': {
                          background: item.count > 0 ? 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)' : '#CBD5E1',
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
