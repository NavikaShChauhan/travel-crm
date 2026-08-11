import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * PageLoader
 * Full-section loading indicator for a page or panel that's waiting
 * on a service call. For inline/small spinners, use InlineLoader instead.
 */
function PageLoader({ label = 'Loading…' }) {
  return (
    <Box
      sx={{
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        color: 'text.secondary',
      }}
    >
      <CircularProgress size={28} thickness={4} color="secondary" />
      <Typography variant="body2">{label}</Typography>
    </Box>
  );
}

export default PageLoader;
