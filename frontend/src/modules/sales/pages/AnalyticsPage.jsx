import { Box, Grid } from '@mui/material';
import SalesSectionPage from '../components/SalesSectionPage';
import LeadSourceChart from '../components/LeadSourceChart';
import SalesPipelineFunnel from '../components/SalesPipelineFunnel';
import FollowUpPerformance from '../components/FollowUpPerformance';
import NegotiationAnalytics from '../components/NegotiationAnalytics';
import DestinationPerformance from '../components/DestinationPerformance';
import CompactMetricsCard from '../components/CompactMetricsCard';
import { SalesMetricGrid } from '../components/SalesMetricGrid';
import SalesWorkspaceHeader from '../components/SalesWorkspaceHeader';
import { useSalesDashboard } from '../hooks/useSalesDashboard';
import { tokens } from '@styles/theme';

function AnalyticsPage() {
  const { leadSources } = useSalesDashboard();

  return (
    <SalesSectionPage>
      {/* Centralized Container: Equal 16px Outer Padding on All 4 Sides */}
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SalesWorkspaceHeader
          title="Sales Engine Analytics"
          description="Track lead conversion velocity, pipeline movement, follow-up response rates, negotiation insights, and destination performance."
        />

        {/* KPI Cards Header */}
        <SalesMetricGrid
          items={[
            { label: 'Total Leads', value: '284', accent: tokens.color.navy700 },
            { label: 'Working Proposals', value: '119', accent: '#2563EB' },
            { label: 'Active Negotiations', value: '40', accent: tokens.color.gold600 },
            { label: 'Soft Confirmed', value: '26', accent: tokens.color.teal500 },
            { label: 'Confirmed Bookings', value: '19', accent: 'success.main' },
            { label: 'Overall Conversion', value: '6.7%', accent: tokens.color.teal500 },
          ]}
        />

        {/* 2-Column Responsive Layout */}
        <Grid container spacing={2}>
          {/* ROW 1: Pipeline Conversion Funnel & Lead Source Distribution */}
          <Grid item xs={12} md={6}>
            <SalesPipelineFunnel />
          </Grid>
          <Grid item xs={12} md={6}>
            <LeadSourceChart sources={leadSources} />
          </Grid>

          {/* ROW 2: Follow-up Performance & Negotiation Analytics */}
          <Grid item xs={12} md={6}>
            <FollowUpPerformance />
          </Grid>
          <Grid item xs={12} md={6}>
            <NegotiationAnalytics />
          </Grid>

          {/* ROW 3: Exact Hand-Drawn Bottom Section Grid Layout */}
          {/* Left Side: Destination Performance occupying full left column height */}
          <Grid item xs={12} md={6}>
            <DestinationPerformance />
          </Grid>

          {/* Right Side: Top-left Proposal, Top-right Confirmation, Bottom Rejection Reason */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* Top-Left: Proposal Analytics */}
              <Grid item xs={12} sm={6}>
                <CompactMetricsCard
                  title="Proposal Analytics"
                  items={[
                    ['Sent', 62, tokens.color.navy700],
                    ['Viewed', 48, '#2563EB'],
                    ['Accepted', 34, tokens.color.teal500],
                    ['Rejected', 8, tokens.color.coral500],
                    ['Expired', 6, tokens.color.gold600],
                  ]}
                />
              </Grid>

              {/* Top-Right: Confirmation Analytics */}
              <Grid item xs={12} sm={6}>
                <CompactMetricsCard
                  title="Confirmation Analytics"
                  items={[
                    ['Soft Confirm', 26, tokens.color.gold600],
                    ['Confirmed Bookings', 19, tokens.color.teal500],
                    ['Rejected Deals', 7, tokens.color.coral500],
                    ['Confirmation Win Rate', '73.1%', 'success.main'],
                  ]}
                />
              </Grid>

              {/* Bottom: Rejection Reason Breakdown spanning full width of right column */}
              <Grid item xs={12}>
                <CompactMetricsCard
                  title="Rejection Reason Breakdown"
                  items={[
                    ['Price Too High', '38% (18 deals)', tokens.color.coral500],
                    ['Chose Competitor', '27% (13 deals)', tokens.color.coral500],
                    ['Customer Cancelled Trip', '19% (9 deals)', tokens.color.coral500],
                    ['Budget Issue', '10% (5 deals)', tokens.color.gold600],
                    ['Dates Unavailable', '6% (3 deals)', tokens.color.slate600],
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </SalesSectionPage>
  );
}

export default AnalyticsPage;
