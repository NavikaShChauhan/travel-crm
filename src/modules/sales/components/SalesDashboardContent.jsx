import { useState } from 'react';
import { Box, Grid, Card, Typography, Stack, IconButton } from '@mui/material';
import { MdOutlineLeaderboard, MdOutlineGroup, MdOutlineSchedule, MdOutlineInfo } from 'react-icons/md';

import KpiCard from './KpiCard';
import SalesPipeline from './SalesPipeline';
import RecentActivities from './RecentActivities';
import FollowUpList from './FollowUpList';
import SalesEmptyState from './SalesEmptyState';
import SalesSectionPage from './SalesSectionPage';
import LeadSummaryDrawer from './LeadSummaryDrawer';
import DataTable from '@components/tables/DataTable';
import StatusChip from '@components/ui/StatusChip';
import { formatDate } from '@utils/formatters';
import { useSalesDashboard } from '../hooks/useSalesDashboard';

function SalesDashboardContent() {
  const [selectedLead, setSelectedLead] = useState(null);
  const {
    kpis,
    pipelineStages,
    recentActivities,
    upcomingFollowUps,
    leads,
  } = useSalesDashboard();

  const leadColumns = [
    { key: 'id', label: 'Lead ID' },
    { key: 'name', label: 'Name' },
    {
      key: 'contact',
      label: 'Contact Info',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
            {row.contactEmail}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {row.contactPhone}
          </Typography>
        </Box>
      ),
    },
    { key: 'source', label: 'Lead Source' },
    {
      key: 'registrationDate',
      label: 'Registration Date',
      render: (row) => formatDate(row.registrationDate),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusChip status={row.status} />,
    },
    { key: 'temperature', label: 'Temperature' },
    { key: 'salesExecutive', label: 'Sales Executive' },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      render: (row) => formatDate(row.lastUpdated),
    },
    {
      key: 'details',
      label: 'Details',
      render: (row) => (
        <IconButton
          size="small"
          aria-label={`View summary for ${row.name}`}
          onClick={() => setSelectedLead(row)}
          sx={{ color: 'text.secondary' }}
        >
          <MdOutlineInfo size={18} />
        </IconButton>
      ),
    },
  ];

  return (
    <SalesSectionPage>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
          gap: 1.5,
          mb: 2,
          alignItems: 'stretch',
        }}
      >
        {kpis.map((kpi) => (
          <Box key={kpi.id} sx={{ minWidth: 0 }}>
            <KpiCard
              id={kpi.id}
              label={kpi.label}
              value={kpi.value}
              accentKey={kpi.accentKey}
            />
          </Box>
        ))}
      </Box>

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

      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Leads
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and review incoming opportunities.
            </Typography>
          </Box>
          <DataTable columns={leadColumns} rows={leads} showEmptyState={false} />
        </Stack>
      </Card>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          {recentActivities.length > 0 ? (
            <RecentActivities activities={recentActivities} />
          ) : (
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
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {upcomingFollowUps.length > 0 ? (
            <FollowUpList followUps={upcomingFollowUps} />
          ) : (
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
          )}
        </Grid>
      </Grid>
      <LeadSummaryDrawer lead={selectedLead} open={Boolean(selectedLead)} onClose={() => setSelectedLead(null)} />
    </SalesSectionPage>
  );
}

export default SalesDashboardContent;
