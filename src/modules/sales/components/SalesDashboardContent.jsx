import { Box, Grid, Card, Typography, Stack } from '@mui/material';
import { MdOutlineLeaderboard, MdOutlineGroup, MdOutlineSchedule } from 'react-icons/md';

import KpiCard from './KpiCard';
import SalesPipeline from './SalesPipeline';
import TopSalesExecutives from './TopSalesExecutives';
import LeadSourceChart from './LeadSourceChart';
import SalesEmptyState from './SalesEmptyState';
import SalesSectionPage from './SalesSectionPage';
import { useSalesDashboard } from '../hooks/useSalesDashboard';

const dashboardKpis = [
  { id: 'total_leads', label: 'Total Leads', value: 0, accentKey: 'navy' },
  { id: 'hot_leads', label: 'Hot Leads', value: 0, accentKey: 'coral' },
  { id: 'warm_leads', label: 'Warm Leads', value: 0, accentKey: 'gold' },
  { id: 'cold_leads', label: 'Cold Leads', value: 0, accentKey: 'slate' },
  { id: 'pending_followups', label: 'Pending Follow Ups', value: 0, accentKey: 'gold' },
  { id: 'proposals_sent', label: 'Proposals Sent', value: 0, accentKey: 'navy' },
  { id: 'negotiation', label: 'Negotiation', value: 0, accentKey: 'teal' },
  { id: 'confirmed_bookings', label: 'Confirmed Bookings', value: 0, accentKey: 'teal' },
  { id: 'lost_leads', label: 'Lost Leads', value: 0, accentKey: 'coral' },
];

function SalesDashboardContent() {
  const { pipelineStages, topExecutives, leadSources } = useSalesDashboard();

  return (
    <SalesSectionPage>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {dashboardKpis.map((kpi) => (
          <Grid item xs={12} sm={6} md={4} key={kpi.id}>
            <KpiCard
              id={kpi.id}
              label={kpi.label}
              value={kpi.value}
              accentKey={kpi.accentKey}
            />
          </Grid>
        ))}
      </Grid>

      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Sales Pipeline
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor the health of your pipeline at a glance.
            </Typography>
          </Box>
          {pipelineStages.length > 0 ? (
            <SalesPipeline stages={pipelineStages} />
          ) : (
            <SalesEmptyState
              title="No pipeline stages yet"
              description="Add pipeline stages to start tracking opportunities."
              icon={MdOutlineLeaderboard}
            />
          )}
        </Stack>
      </Card>

      <Grid container spacing={2.5} sx={{ mt: 0 }}>
        <Grid item xs={12} lg={5}>
          <TopSalesExecutives executives={topExecutives} />
        </Grid>
        <Grid item xs={12} lg={7}>
          {leadSources.length > 0 ? (
            <LeadSourceChart sources={leadSources} />
          ) : (
            <Card sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
              <SalesEmptyState
                title="No Lead Source Data"
                description="Lead source performance will be available once data is added."
                icon={MdOutlineGroup}
              />
            </Card>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Recent Activities
            </Typography>
            <SalesEmptyState
              title="No Recent Activities"
              description="Your latest lead and deal activity will appear here."
              icon={MdOutlineGroup}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: { xs: 2.5, md: 3 }, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Upcoming Follow Ups
            </Typography>
            <SalesEmptyState
              title="No Follow Ups Scheduled"
              description="Upcoming follow-ups will be listed here."
              icon={MdOutlineSchedule}
            />
          </Card>
        </Grid>
      </Grid>
    </SalesSectionPage>
  );
}

export default SalesDashboardContent;
