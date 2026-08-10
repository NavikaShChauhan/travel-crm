import { Box, Typography, Stack } from '@mui/material';

/**
 * PageHeader
 * Standard title block for module pages: a title, optional subtitle,
 * and an optional actions slot (buttons) aligned to the right.
 *
 * Usage:
 *   <PageHeader title="Sales Engine" subtitle="Pipeline and deal tracking" />
 */
function PageHeader({ title, subtitle, actions }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontSize: { xs: 22, sm: 26 } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && (
        <Stack direction="row" spacing={1.5}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
}

export default PageHeader;
