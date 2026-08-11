import { Box, Stack, Typography } from '@mui/material';

function SalesSectionPage({ title, subtitle, actions, children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {(title || subtitle || actions) && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Box>
            {title && (
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions}
        </Stack>
      )}
      {children}
    </Box>
  );
}

export default SalesSectionPage;
