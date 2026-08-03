import { Chip } from '@mui/material';
import { tokens } from '@styles/theme';

const STATUS_COLORS = {
  active: tokens.color.navy700,
  pending: tokens.color.gold600,
  awaiting_response: '#2563EB',
  interested: tokens.color.teal500,
  negotiation: tokens.color.gold500,
  soft_confirm: tokens.color.teal500,
  confirmed: tokens.color.teal500,
  lost: tokens.color.coral500,
  rejected: tokens.color.coral500,
};

const formatLabel = (value) => String(value).replace(/_/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase());

function SalesStatusChip({ status, label }) {
  const color = STATUS_COLORS[status] || tokens.color.ink400;
  return <Chip size="small" label={label || formatLabel(status)} sx={{ bgcolor: `${color}18`, color, fontWeight: 700, fontSize: 11 }} />;
}

export default SalesStatusChip;
