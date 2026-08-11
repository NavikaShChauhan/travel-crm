import { Card, Stack, Typography } from '@mui/material';

export default function CompactMetricsCard({ title, items = [] }) {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      <Stack spacing={1} sx={{ mt: 1.5 }}>
        {items.map(([label, value, color]) => (
          <Stack key={label} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: color || 'text.primary' }}>
              {value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
