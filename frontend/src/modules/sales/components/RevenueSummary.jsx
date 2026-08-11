/**
 * RevenueSummary.jsx
 * -----------------------------------------------------------------------
 * 12-month Revenue vs Target bar chart for the Sales Dashboard.
 * Uses Recharts BarChart — consistent with existing dashboard charting.
 *
 * Includes a summary header row showing total revenue, total target,
 * and overall achievement percentage.
 */

import { Card, Box, Typography, Stack, Chip } from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { tokens } from '@styles/theme';
import { REVENUE_BAR_COLOR, TARGET_BAR_COLOR } from '../constants/sales.constants';
import { formatCurrency } from '@utils/formatters';

/** Custom tooltip formatter */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 1.5,
        boxShadow: '0 4px 16px rgba(11,21,38,0.12)',
        minWidth: 170,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
        {label}
      </Typography>
      {payload.map((p) => (
        <Stack key={p.dataKey} direction="row" justifyContent="space-between" spacing={2}>
          <Typography variant="caption" sx={{ color: p.color }}>
            {p.name}
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {formatCurrency(p.value)}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}

/**
 * RevenueSummary
 *
 * @param {{
 *   data: Array<{ month: string, revenue: number, target: number }>,
 *   summary: { totalRevenue: string, totalTarget: string, achievementPct: number }
 * }} props
 */
function RevenueSummary({ data, summary }) {
  const achieved = summary.achievementPct >= 100;

  return (
    <Card sx={{ p: 3 }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 2.5 }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Monthly Revenue Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Revenue vs target · last 12 months
          </Typography>
        </Box>

        {/* Achievement KPI chips */}
        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Total Revenue
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: REVENUE_BAR_COLOR }}>
              {summary.totalRevenue}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Target
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: TARGET_BAR_COLOR }}>
              {summary.totalTarget}
            </Typography>
          </Box>
          <Chip
            size="small"
            label={`${summary.achievementPct}% achieved`}
            sx={{
              fontWeight: 700,
              bgcolor: achieved
                ? 'rgba(47,143,134,0.12)'
                : 'rgba(217,164,65,0.14)',
              color: achieved ? tokens.color.teal500 : tokens.color.gold600,
            }}
          />
        </Stack>
      </Stack>

      {/* Bar Chart */}
      <Box sx={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: -8, bottom: 0 }}
            barSize={16}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={tokens.color.line200} vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: tokens.color.ink600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              tick={{ fontSize: 12, fill: tokens.color.ink600 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(11,21,38,0.04)' }} />
            <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill={REVENUE_BAR_COLOR}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="target"
              name="Target"
              fill={TARGET_BAR_COLOR}
              radius={[4, 4, 0, 0]}
              opacity={0.7}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}

export default RevenueSummary;
