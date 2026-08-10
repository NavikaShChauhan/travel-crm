import { Box, Card, Typography } from '@mui/material';
import { tokens } from '@styles/theme';

/** Shared KPI presentation for Sales workspaces and dashboards. */
export function SalesMetricCard({ label, value, accent = tokens.color.navy700 }) {
  return (
    <Card className="sales-interactive sales-kpi-animate" sx={{ p: 1.5, minWidth: 0, borderTop: `3px solid ${accent}` }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
        {value}
      </Typography>
    </Card>
  );
}

export function SalesMetricGrid({ items }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1.25 }}>
      {items.map(({ label, value, accent }) => (
        <SalesMetricCard key={label} label={label} value={value} accent={accent} />
      ))}
    </Box>
  );
}
