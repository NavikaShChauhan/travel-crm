import { Card, Typography, Box } from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { tokens } from '@styles/theme';

/**
 * PipelineTrendChart
 * Reads pre-shaped trend data (see modules/dashboard/data/dashboard.mock.js)
 * — no data fetching or transformation happens in this component.
 */
function PipelineTrendChart({ data }) {
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Inquiries vs bookings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Last 6 months
      </Typography>
      <Box sx={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={tokens.color.line200} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: tokens.color.ink600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: tokens.color.ink600 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: `1px solid ${tokens.color.line200}`, fontSize: 13 }}
            />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Line
              type="monotone"
              dataKey="inquiries"
              name="Inquiries"
              stroke={tokens.color.navy700}
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="bookings"
              name="Bookings"
              stroke={tokens.color.gold500}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}

export default PipelineTrendChart;
