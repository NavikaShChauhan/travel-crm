/**
 * KpiCard.jsx
 * -----------------------------------------------------------------------
 * A single KPI tile for the Sales Dashboard header row.
 * Extends the shared StatCard visual language with per-temperature
 * accent colouring (hot = coral, warm = gold, cold = slate, etc.).
 *
 * Props are sourced from useSalesDashboard → never hardcoded here.
 */

import { Card, Box, Typography, Stack } from '@mui/material';
import { KPI_ICONS, KPI_ACCENT_COLORS } from '../constants/sales.constants';

function KpiCard({ id, label, value, accentKey = 'navy' }) {
  const Icon = KPI_ICONS[id];
  const accent = KPI_ACCENT_COLORS[accentKey] ?? KPI_ACCENT_COLORS.navy;

  return (
    <Card
      sx={{
        p: 1.75,
        height: 124,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(11,21,38,0.10)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack spacing={0.75} alignItems="center" sx={{ width: '100%' }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: accent.bg,
            color: accent.icon,
          }}
        >
          {Icon ? <Icon size={18} /> : null}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: 20, lineHeight: 1.2 }}>
          {value}
        </Typography>
      </Stack>
    </Card>
  );
}

export default KpiCard;
