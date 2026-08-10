import { Card, Box, Typography, Stack, Chip } from '@mui/material';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

function StatCard({ icon: Icon, label, value, trend }) {
  const isUp = trend?.direction !== 'down';

  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        borderRadius: '20px',
        bgcolor: '#FFFFFF',
        border: '1px solid #F1F5F9',
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.08)',
        },
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748B', fontSize: 13 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800, color: '#0F172A', fontSize: 30, letterSpacing: '-0.02em' }}>
            {value}
          </Typography>
        </Box>
        {Icon && (
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#F3E8FF',
              color: '#8B5CF6',
              flexShrink: 0,
            }}
          >
            <Icon size={22} />
          </Box>
        )}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: 12, fontWeight: 500 }}>
          Last 30 days
        </Typography>
        {trend && (
          <Chip
            size="small"
            icon={isUp ? <MdArrowUpward size={12} color="#16A34A" /> : <MdArrowDownward size={12} color="#EF4444" />}
            label={trend.value || '+32.54%'}
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 700,
              bgcolor: isUp ? '#DCFCE7' : '#FEE2E2',
              color: isUp ? '#16A34A' : '#EF4444',
              borderRadius: '12px',
              '& .MuiChip-icon': { ml: 0.75, mr: -0.25 },
            }}
          />
        )}
      </Stack>
    </Card>
  );
}

export default StatCard;
