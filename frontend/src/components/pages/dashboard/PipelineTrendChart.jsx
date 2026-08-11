import { Card, Typography, Box, Stack } from '@mui/material';
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

function PipelineTrendChart({ data }) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        borderRadius: '20px',
        border: '1px solid #F1F5F9',
        bgcolor: '#FFFFFF',
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: 17, color: '#0F172A' }}>
            Total Inquiries & Bookings Trend
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13 }}>
            Monthly conversion curve
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: 'none',
                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.15)',
                fontSize: 13,
                fontWeight: 600,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: 10 }} />
            <Line
              type="monotone"
              dataKey="inquiries"
              name="Inquiries"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }}
              activeDot={{ r: 6, fill: '#8B5CF6' }}
            />
            <Line
              type="monotone"
              dataKey="bookings"
              name="Bookings"
              stroke="#14B8A6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }}
              activeDot={{ r: 6, fill: '#14B8A6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}

export default PipelineTrendChart;
