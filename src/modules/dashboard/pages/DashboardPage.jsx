import { Grid } from '@mui/material';
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

/**
 * DashboardPage
 * -----------------------------------------------------------------------
 * The one page in this scaffold built out beyond a bare placeholder —
 * intentionally, to prove the full architecture works end to end:
 * page renders module components, which render on data imported from
 * this module's own `data/` folder (never inline in a component).
 *
 * TODO (backend integration): once `dashboard.service.js` is implemented,
 * replace the static MOCK_* imports below with a `useAsync(() =>
 * dashboardService.getSummary())` call — no other file in this module
 * needs to change.
 */
function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of inquiries, sales pipeline, and recent activity."
      />

      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        {MOCK_DASHBOARD_STATS.map((stat) => (
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

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={7}>
          <PipelineTrendChart data={MOCK_PIPELINE_TREND} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <RecentActivityList items={MOCK_RECENT_ACTIVITY} />
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;
