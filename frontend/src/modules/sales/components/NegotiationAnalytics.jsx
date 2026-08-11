import { Box, Card, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { tokens } from '@styles/theme';

const REQUEST_CATEGORIES = [
  { category: 'Hotel Upgrade', pct: 32, count: 24, color: tokens.color.navy700 },
  { category: 'Price Reduction', pct: 28, count: 21, color: tokens.color.teal500 },
  { category: 'Room Change', pct: 18, count: 14, color: '#2563EB' },
  { category: 'Flight Change', pct: 12, count: 9, color: tokens.color.gold600 },
  { category: 'Activity Change', pct: 7, count: 5, color: tokens.color.coral500 },
  { category: 'Other', pct: 3, count: 2, color: tokens.color.ink400 },
];

export default function NegotiationAnalytics() {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Negotiation Analytics
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Deal revisions, conversion velocity, and customer request distribution
      </Typography>

      <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
        <Grid item xs={6} sm={4}>
          <Box sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Active Deals</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>18</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Revised Proposals</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>27</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Avg. Revisions</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.color.navy700 }}>1.8</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Box sx={{ p: 1.5, bgcolor: 'rgba(16,185,129,0.08)', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Soft Confirmed</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>9 Deals</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Box sx={{ p: 1.5, bgcolor: 'rgba(225,29,72,0.08)', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Lost in Negotiation</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>6 Deals</Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        Customer Change Request Categories
      </Typography>

      <Stack spacing={1.5}>
        {REQUEST_CATEGORIES.map((item) => (
          <Box key={item.category}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.category}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700 }}>{item.pct}% ({item.count} requests)</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={item.pct}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(27,42,74,0.06)',
                '& .MuiLinearProgress-bar': { bgcolor: item.color },
              }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
