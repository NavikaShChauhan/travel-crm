import {
  Box,
  Card,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { MdCall, MdWhatsapp, MdEmail, MdSms } from 'react-icons/md';
import { tokens } from '@styles/theme';

const CHANNEL_PERFORMANCE = [
  { channel: 'WhatsApp', icon: <MdWhatsapp color="#25D366" size={18} />, count: 42, responseRate: '76%', color: 'success' },
  { channel: 'Call', icon: <MdCall color="#2563EB" size={18} />, count: 28, responseRate: '71%', color: 'primary' },
  { channel: 'Email', icon: <MdEmail color="#E11D48" size={18} />, count: 19, responseRate: '52%', color: 'error' },
  { channel: 'SMS', icon: <MdSms color="#D97706" size={18} />, count: 11, responseRate: '45%', color: 'warning' },
];

export default function FollowUpPerformance() {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Follow-up Performance
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Execution efficiency and channel response rates
      </Typography>

      <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Scheduled</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>86</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ p: 1.5, bgcolor: 'rgba(16,185,129,0.08)', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Completed</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>64</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ p: 1.5, bgcolor: 'rgba(217,119,6,0.08)', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Pending</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.color.gold600 }}>14</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ p: 1.5, bgcolor: 'rgba(225,29,72,0.08)', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">Overdue</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>8</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Progress Bars */}
      <Stack spacing={1.5} sx={{ mb: 3 }}>
        {[
          ['Completed (74%)', 74, tokens.color.teal500],
          ['Pending (16%)', 16, tokens.color.gold600],
          ['Overdue (10%)', 10, tokens.color.coral500],
        ].map(([label, pct, color]) => (
          <Box key={label}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">{label}</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(27,42,74,0.06)',
                '& .MuiLinearProgress-bar': { bgcolor: color },
              }}
            />
          </Box>
        ))}
      </Stack>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        Communication Performance by Channel
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead sx={{ bgcolor: 'rgba(27,42,74,0.04)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Channel</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Follow-ups</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Response Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CHANNEL_PERFORMANCE.map((row) => (
              <TableRow key={row.channel}>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {row.icon}
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.channel}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">
                  <Chip
                    size="small"
                    label={row.responseRate}
                    color={row.color}
                    sx={{ fontWeight: 700, height: 20 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
