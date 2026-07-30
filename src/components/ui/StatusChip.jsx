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
  new: { bg: '#EAF0FF', color: '#2A4FBF', label: 'New' },
  in_progress: { bg: '#FFF3E0', color: '#B96A00', label: 'In Progress' },
  pending: { bg: '#FFF3E0', color: '#B96A00', label: 'Pending' },
  confirmed: { bg: '#E6F5F3', color: '#1E6F66', label: 'Confirmed' },
  paid: { bg: '#E6F5F3', color: '#1E6F66', label: 'Paid' },
  completed: { bg: '#E6F5F3', color: '#1E6F66', label: 'Completed' },
  cancelled: { bg: '#FBEAE8', color: '#B23A2C', label: 'Cancelled' },
  overdue: { bg: '#FBEAE8', color: '#B23A2C', label: 'Overdue' },
  draft: { bg: '#EEF0F5', color: '#5B6479', label: 'Draft' },
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
        fontWeight: 600,
        fontSize: 12,
      }}
    />
  );
}

export default StatusChip;
