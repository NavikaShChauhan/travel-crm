import { useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
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
  PieChart,
  Pie,
  Cell,
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
  Hot: '#EF4444',
  Warm: '#F59E0B',
  Cold: '#3B82F6',
};

export default function InquiryDashboardPage() {
  const { leads, openAddModal } = useInquiry();

  // Calculate metrics
  const totalEnquiries = leads.length;
  const hotLeadsCount = leads.filter((l) => l.priority === 'Hot').length;
  const warmLeadsCount = leads.filter((l) => l.priority === 'Warm').length;
  const coldLeadsCount = leads.filter((l) => l.priority === 'Cold').length;

  const avgGroupSize = totalEnquiries > 0
    ? (leads.reduce((acc, l) => acc + (Number(l.pax) || 0), 0) / totalEnquiries).toFixed(1)
    : '0.0';

  // Funnel Data
  const funnelData = useMemo(() => {
    return STAGES.map((stage) => {
      const count = leads.filter((l) => l.stage === stage).length;
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

  // Priority Split Data
  const priorityData = useMemo(() => {
    return [
      { name: 'Hot', value: hotLeadsCount, color: PRIORITY_COLORS.Hot },
      { name: 'Warm', value: warmLeadsCount, color: PRIORITY_COLORS.Warm },
      { name: 'Cold', value: coldLeadsCount, color: PRIORITY_COLORS.Cold },
    ].filter((item) => item.value > 0);
  }, [hotLeadsCount, warmLeadsCount, coldLeadsCount]);

  // Daily Trend Mock
  const trendData = [
    { date: '01 May', count: 1 },
    { date: '02 May', count: 1 },
    { date: '03 May', count: 1 },
    { date: '04 May', count: 0 },
  ];

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

      {/* 4 Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Total Enquiries */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '14px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', letterSpacing: 0.5 }}>
                  TOTAL ENQUIRIES
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
                  {totalEnquiries}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {totalEnquiries} active in pipeline
                </Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: '10px', bgcolor: '#EFF6FF', color: '#3B82F6' }}>
                <MdOutlineGroup size={22} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Hot Leads */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '14px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', letterSpacing: 0.5 }}>
                  HOT LEADS
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
                  {hotLeadsCount}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  {hotLeadsCount} follow-up due today
                </Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: '10px', bgcolor: '#FEF2F2', color: '#EF4444' }}>
                <MdOutlineWhatshot size={22} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Conversion */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '14px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', letterSpacing: 0.5 }}>
                  CONVERSION
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
                  0
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  0% converted
                </Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: '10px', bgcolor: '#F0FDF4', color: '#10B981' }}>
                <MdOutlineCheckCircle size={22} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Avg Group Size */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '14px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', letterSpacing: 0.5 }}>
                  AVG GROUP SIZE
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
                  {avgGroupSize}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  travellers per enquiry
                </Typography>
              </Box>
              <Box sx={{ p: 1.25, borderRadius: '10px', bgcolor: '#F5F3FF', color: '#8B5CF6' }}>
                <MdOutlineTrendingUp size={22} />
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Main Grid Row 1 */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Lead Stage Funnel */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 16 }}>
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
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} allowDecimals={false} />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#4B6BFB" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Source Mix */}
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 16 }}>
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
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>
                        {item.count}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: '#F1F5F9',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: item.count > 0 ? '#3B82F6' : '#CBD5E1',
                          borderRadius: 3,
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

      {/* Main Grid Row 2 */}
      <Grid container spacing={2.5}>
        {/* Priority Split */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 16 }}>
              Priority Split
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 2, fontSize: 13 }}>
              Hot, warm, and cold lead ratio.
            </Typography>

            <Grid container alignItems="center">
              <Grid item xs={7}>
                <Box sx={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: PRIORITY_COLORS.Hot }} />
                    <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600, fontSize: 13 }}>
                      Hot
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', ml: 'auto' }}>
                      {hotLeadsCount}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: PRIORITY_COLORS.Warm }} />
                    <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600, fontSize: 13 }}>
                      Warm
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', ml: 'auto' }}>
                      {warmLeadsCount}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: PRIORITY_COLORS.Cold }} />
                    <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600, fontSize: 13 }}>
                      Cold
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', ml: 'auto' }}>
                      {coldLeadsCount}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Daily Inquiry Trend */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 16 }}>
              Daily Inquiry Trend
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 2, fontSize: 13 }}>
              Inflow by query date.
            </Typography>

            <Box sx={{ width: '100%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} allowDecimals={false} />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#0284C7" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
