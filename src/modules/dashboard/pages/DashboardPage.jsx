import { Grid, Card, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Chip } from '@mui/material';
import {
  MdOutlineForum,
  MdOutlineTrendingUp,
  MdOutlineAccountBalanceWallet,
  MdOutlineReceiptLong,
} from 'react-icons/md';

import PageHeader from '@components/common/PageHeader';
import StatCard from '@components/cards/StatCard';
import PipelineTrendChart from '../components/PipelineTrendChart';
import RecentActivityList from '../components/RecentActivityList';

import { formatCurrency } from '@utils/formatters';
import { useInquiry } from '@modules/inquiry/contexts/InquiryContext';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_PIPELINE_TREND,
  MOCK_RECENT_ACTIVITY,
} from '../data/dashboard.mock';

const STAT_ICONS = {
  open_inquiries: MdOutlineForum,
  active_deals: MdOutlineTrendingUp,
  revenue_mtd: MdOutlineAccountBalanceWallet,
  overdue_invoices: MdOutlineReceiptLong,
};

function DashboardPage() {
  const { leads, openDrawer } = useInquiry();

  // Dynamic stats calculated from live Inquiry Context
  const totalInquiries = leads.length;
  const activeDeals = leads.filter((l) => (l.stage || l.status) !== 'Denied' && (l.stage || l.status) !== 'Cancelled').length;

  const dynamicStats = MOCK_DASHBOARD_STATS.map((stat) => {
    if (stat.id === 'open_inquiries') {
      return { ...stat, value: totalInquiries };
    }
    if (stat.id === 'active_deals') {
      return { ...stat, value: activeDeals };
    }
    return stat;
  });

  return (
    <Box>
      <PageHeader
        title="Overview"
        subtitle="Overview of inquiries, sales pipeline, and recent activity."
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {dynamicStats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.id}>
            <StatCard
              icon={STAT_ICONS[stat.id]}
              label={stat.label}
              value={stat.isCurrency ? formatCurrency(stat.value) : stat.value}
              trend={stat.trend}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={7}>
          <PipelineTrendChart data={MOCK_PIPELINE_TREND} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <RecentActivityList items={MOCK_RECENT_ACTIVITY} />
        </Grid>
      </Grid>

      {/* Live Recent Inquiries Table */}
      <Card sx={{ p: 3, borderRadius: '20px', border: '1px solid #F1F5F9', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, fontSize: 18, color: '#0F172A' }}>
          Recent Inquiries ({leads.length})
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5, fontSize: 13 }}>
          Latest lead inquiries synced live from Inquiry Engine. Click any row to preview lead details.
        </Typography>

        <TableContainer sx={{ borderRadius: '14px', border: '1px solid #F1F5F9' }}>
          <Table size="medium">
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12, textTransform: 'uppercase' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12, textTransform: 'uppercase' }}>CLIENT NAME</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12, textTransform: 'uppercase' }}>DESTINATION</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12, textTransform: 'uppercase' }}>PAX</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12, textTransform: 'uppercase' }}>SOURCE</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12, textTransform: 'uppercase' }}>PRIORITY</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12, textTransform: 'uppercase' }}>SALES EXEC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.slice(0, 5).map((lead) => (
                <TableRow
                  key={lead.id}
                  hover
                  onClick={() => openDrawer(lead.id)}
                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#F8FAFC' } }}
                >
                  <TableCell sx={{ fontWeight: 800, color: '#6366F1' }}>{lead.id}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#0F172A' }}>{lead.clientName || lead.name}</TableCell>
                  <TableCell sx={{ color: '#1E293B', fontWeight: 600 }}>{lead.destination}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{lead.pax || lead.totalPax || 1}</TableCell>
                  <TableCell sx={{ color: '#64748B' }}>{lead.source}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.priority || lead.temperature || 'Warm'}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: 11,
                        bgcolor: (lead.priority || lead.temperature) === 'Hot' ? '#FCE7F3' : (lead.priority || lead.temperature) === 'Warm' ? '#F3E8FF' : '#E0F2FE',
                        color: (lead.priority || lead.temperature) === 'Hot' ? '#EC4899' : (lead.priority || lead.temperature) === 'Warm' ? '#8B5CF6' : '#0284C7',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#475569', fontWeight: 600 }}>{lead.assignedSalesUser || lead.salesExecutive || 'Priya Nair'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default DashboardPage;
