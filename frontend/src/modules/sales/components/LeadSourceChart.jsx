/**
 * LeadSourceChart.jsx
 * -----------------------------------------------------------------------
 * Donut / Pie chart showing lead source distribution.
 * Uses Recharts PieChart — consistent with PipelineTrendChart in the
 * dashboard module.
 *
 * All data and colours come from props / constants.
 */

import { Card, Box, Typography, Stack } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { tokens } from '@styles/theme';
import { LEAD_SOURCE_COLORS } from '../constants/sales.constants';

/** Custom tooltip for the pie chart */
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: data } = payload[0];
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 1.5,
        boxShadow: '0 4px 16px rgba(11,21,38,0.12)',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value} leads · {data.percentage}%
      </Typography>
    </Box>
  );
}

/**
 * LeadSourceChart
 *
 * @param {{ sources: Array<{ id, label, count, percentage }> }} props
 */
function LeadSourceChart({ sources }) {
  // Recharts needs `name` and `value` keys for the default legend/tooltip
  const chartData = sources.map((s) => ({
    name: s.label,
    value: s.count,
    percentage: s.percentage,
  }));

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Lead Source Distribution
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Where your leads are coming from
      </Typography>

      <Box sx={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="52%"
              outerRadius="75%"
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={LEAD_SOURCE_COLORS[index % LEAD_SOURCE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Quick stats row below chart */}
      <Stack
        direction="row"
        justifyContent="space-around"
        sx={{
          mt: 1,
          pt: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {sources.reduce((s, r) => s + r.count, 0)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total Leads
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {sources.length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Sources
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: tokens.color.navy700 }}
          >
            {sources[0]?.label}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Top Source
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

export default LeadSourceChart;
