import { Chip } from '@mui/material';

/**
 * StatusChip
 * Color-coded status pill. Pass any status string — unmapped values
 * fall back to a neutral style so this never throws on new statuses
 * added by the backend later.
 *
 * Usage: <StatusChip status="confirmed" />
 */
const STATUS_STYLES = {
  new: { bg: '#FFFFFF', color: '#223559', border: '#223559', label: 'New' },
  in_progress: { bg: '#F3F4F6', color: '#475569', border: '#D1D5DB', label: 'In Progress' },
  pending: { bg: '#F3F4F6', color: '#475569', border: '#D1D5DB', label: 'Pending' },
  confirmed: { bg: '#FFFFFF', color: '#223559', border: '#223559', label: 'Confirmed' },
  paid: { bg: '#FFFFFF', color: '#223559', border: '#223559', label: 'Paid' },
  completed: { bg: '#FFFFFF', color: '#223559', border: '#223559', label: 'Completed' },
  cancelled: { bg: '#F3F4F6', color: '#475569', border: '#D1D5DB', label: 'Cancelled' },
  overdue: { bg: '#F3F4F6', color: '#475569', border: '#D1D5DB', label: 'Overdue' },
  draft: { bg: '#FFFFFF', color: '#223559', border: '#D1D5DB', label: 'Draft' },
};

function StatusChip({ status = 'draft', label }) {
  const key = String(status).toLowerCase().replace(/\s+/g, '_');
  const style = STATUS_STYLES[key] || STATUS_STYLES.draft;

  return (
    <Chip
      size="small"
      label={label || style.label}
      sx={{
        bgcolor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        fontWeight: 600,
        fontSize: 12,
      }}
    />
  );
}

export default StatusChip;
