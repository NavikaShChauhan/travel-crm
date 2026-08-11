import { Chip } from '@mui/material';
import { tokens } from '@styles/theme';

const STATUS_COLORS = {
  // Lead Temperature
  hot: tokens.color.coral500,
  warm: tokens.color.gold600,
  cold: tokens.color.navy700,

  // Proposal Statuses
  draft: tokens.color.navy700,
  sent: '#2563EB',
  viewed: '#2563EB',
  revised: tokens.color.gold600,
  accepted: tokens.color.teal500,

  // Negotiation & Confirmation
  active: tokens.color.navy700,
  pending: tokens.color.gold600,
  awaiting_response: '#2563EB',
  interested: tokens.color.teal500,
  negotiation: tokens.color.gold600,
  soft_confirm: tokens.color.gold600,
  confirmed: tokens.color.teal500,
  lost: tokens.color.coral500,
  rejected: tokens.color.coral500,

  // Payment
  received: tokens.color.teal500,

  // Communication Modes
  call: '#2563EB',
  whatsapp: '#25D366',
  email: '#E11D48',
  sms: '#D97706',
};

const formatLabel = (value) =>
  String(value)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

function SalesStatusChip({ status, label, variant = 'filled', size = 'small' }) {
  if (!status) return null;
  const key = String(status).toLowerCase().replace(/\s+/g, '_');
  const color = STATUS_COLORS[key] || tokens.color.navy700;

  return (
    <Chip
      size={size}
      label={label || formatLabel(status)}
      variant={variant}
      sx={{
        bgcolor: variant === 'filled' ? `${color}18` : 'transparent',
        color: color,
        borderColor: color,
        fontWeight: 700,
        fontSize: '0.72rem',
      }}
    />
  );
}

export default SalesStatusChip;
