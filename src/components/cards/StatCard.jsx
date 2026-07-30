import { Card, Box, Typography, Stack } from '@mui/material';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

/**
 * StatCard
 * KPI tile used on dashboard/module overview screens: an icon, a big
 * number, a label, and an optional trend delta.
 *
 * Usage:
 *   <StatCard
 *     icon={MdOutlineTrendingUp}
 *     label="Open deals"
 *     value="128"
 *     trend={{ direction: 'up', value: '+12%' }}
 *   />
 */
function StatCard({ icon: Icon, label, value, trend, accent = 'secondary.main' }) {
  return (
    <Card sx={{ p: 2.5, height: '100%' }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>
            {value}
          </Typography>
        </Box>
        {Icon && (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(217,164,65,0.12)',
              color: accent,
              flexShrink: 0,
            }}
          >
            <Icon size={20} />
          </Box>
        )}
      </Stack>
      {trend && (
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1.5 }}>
          {trend.direction === 'up' ? (
            <MdArrowUpward size={14} color="#2F8F86" />
          ) : (
            <MdArrowDownward size={14} color="#D6604F" />
          )}
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: trend.direction === 'up' ? '#2F8F86' : '#D6604F' }}
          >
            {trend.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            vs last month
          </Typography>
        </Stack>
      )}
    </Card>
  );
}

export default StatCard;
