import { Card, Grid, Stack, Typography } from '@mui/material';
import SalesSectionPage from '../components/SalesSectionPage';
import TopSalesExecutives from '../components/TopSalesExecutives';
import LeadSourceChart from '../components/LeadSourceChart';
import RevenueSummary from '../components/RevenueSummary';
import SalesPipeline from '../components/SalesPipeline';
import { SalesMetricGrid } from '../components/SalesMetricGrid';
import SalesWorkspaceHeader from '../components/SalesWorkspaceHeader';
import { useSalesDashboard } from '../hooks/useSalesDashboard';
import { formatCurrency } from '@utils/formatters';
import { tokens } from '@styles/theme';

function CompactMetrics({ title, items }) {
  return (
    <Card sx={{ p: 2.5, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{title}</Typography>
      <Stack spacing={1.25} sx={{ mt: 2 }}>
        {items.map(([label, value, color]) => (
          <Stack key={label} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: color || 'text.primary' }}>{value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

function AnalyticsPage() {
  const { topExecutives, leadSources, monthlyRevenue, revenueSummary, pipelineStages } = useSalesDashboard();
  const totalSales = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
  const activePipeline = pipelineStages.filter((stage) => !['confirmed', 'lost'].includes(stage.id)).reduce((sum, stage) => sum + stage.value, 0);

  return (
    <SalesSectionPage>
      <SalesWorkspaceHeader title="Analytics" description="Monitor sales performance, conversion metrics, revenue trends, and team productivity through interactive dashboards." />
      <SalesMetricGrid items={[
        { label: 'Total Sales', value: formatCurrency(totalSales) },
        { label: 'Revenue', value: revenueSummary.totalRevenue, accent: tokens.color.teal500 },
        { label: 'Conversion Rate', value: '18.4%', accent: tokens.color.gold500 },
        { label: 'Average Deal Size', value: formatCurrency(352000) },
        { label: 'Active Pipeline', value: formatCurrency(activePipeline), accent: tokens.color.gold500 },
        { label: 'Win Rate', value: '64%', accent: tokens.color.teal500 },
      ]} />

      <Card sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Sales Funnel</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Qualified leads through Operations</Typography>
        <SalesPipeline stages={pipelineStages} />
      </Card>

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={5}>
          <TopSalesExecutives executives={topExecutives} />
        </Grid>
        <Grid item xs={12} lg={7}>
          <LeadSourceChart sources={leadSources} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <CompactMetrics title="Proposal Analytics" items={[["Sent", 62, tokens.color.navy700], ["Viewed", 48, '#2563EB'], ["Accepted", 34, tokens.color.teal500], ["Rejected", 8, tokens.color.coral500], ["Expired", 6, tokens.color.gold600]]} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CompactMetrics title="Follow-up Analytics" items={[["Due", 38, tokens.color.gold600], ["Completed", 24, tokens.color.teal500], ["Overdue", 6, tokens.color.coral500]]} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CompactMetrics title="Negotiation Analytics" items={[["Active", 21, tokens.color.navy700], ["Won", 14, tokens.color.teal500], ["Lost", 4, tokens.color.coral500]]} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <CompactMetrics title="Top Destinations" items={[["Bali", "18 bookings · ₹42.6L"], ["Switzerland", "12 bookings · ₹38.8L"], ["Rajasthan", "10 bookings · ₹25.4L"]]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CompactMetrics title="Sales by Source" items={[["Website", "29.6%"], ["Referral", "25.0%"], ["Social Media", "18.3%"], ["Walk-in", "13.4%"], ["Corporate", "8.5%"], ["Travel Agent", "5.2%"]]} />
        </Grid>
      </Grid>

      <RevenueSummary data={monthlyRevenue} summary={revenueSummary} />
    </SalesSectionPage>
  );
}

export default AnalyticsPage;
