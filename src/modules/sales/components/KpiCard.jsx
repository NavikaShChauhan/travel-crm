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
        p: 2.5,
        height: '100%',
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(11,21,38,0.10)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack spacing={1.25} alignItems="center">
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: accent.bg,
            color: accent.icon,
          }}
        >
          {Icon ? <Icon size={22} /> : null}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: 24, sm: 28 } }}>
          {value}
        </Typography>
      </Stack>
    </Card>
  );
}

export default KpiCard;
