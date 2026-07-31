import { Grid } from '@mui/material';
import SalesSectionPage from '../components/SalesSectionPage';
import TopSalesExecutives from '../components/TopSalesExecutives';
import LeadSourceChart from '../components/LeadSourceChart';
import RevenueSummary from '../components/RevenueSummary';
import { useSalesDashboard } from '../hooks/useSalesDashboard';

function AnalyticsPage() {
  const { topExecutives, leadSources, monthlyRevenue, revenueSummary } = useSalesDashboard();

  return (
    <SalesSectionPage title="Analytics" subtitle="Review performance and trend insights.">
      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={5}>
          <TopSalesExecutives executives={topExecutives} />
        </Grid>
        <Grid item xs={12} lg={7}>
          <LeadSourceChart sources={leadSources} />
        </Grid>
      </Grid>

      <RevenueSummary data={monthlyRevenue} summary={revenueSummary} />
    </SalesSectionPage>
  );
}

export default AnalyticsPage;
