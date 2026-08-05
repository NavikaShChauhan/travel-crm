import { Box, Stack, Typography } from '@mui/material';

/** Consistent workspace header with an optional contextual action area. */
function SalesWorkspaceHeader({ title, description, actions }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ sm: 'center' }}
      spacing={1.5}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
      </Box>
      {actions}
    </Stack>
  );
}

export default SalesWorkspaceHeader;
