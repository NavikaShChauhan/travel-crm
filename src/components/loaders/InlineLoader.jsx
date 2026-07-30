import { CircularProgress } from '@mui/material';

/**
 * InlineLoader
 * Small spinner for inline use — inside a button, a table cell, a card.
 * For a whole page/panel, use PageLoader instead.
 */
function InlineLoader({ size = 16 }) {
  return <CircularProgress size={size} thickness={5} color="inherit" />;
}

export default InlineLoader;
