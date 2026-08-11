import { Box, Typography, Stack } from '@mui/material';

function SalesEmptyState({ title, description, icon: Icon }) {
  return (
    <Box
      sx={{
        py: 4,
        px: 2.5,
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 3,
        bgcolor: 'rgba(11,21,38,0.02)',
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center" spacing={1.2}>
        {Icon && (
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(27,42,74,0.08)',
              color: 'text.secondary',
            }}
          >
            <Icon size={20} />
          </Box>
        )}
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </Box>
  );
}

export default SalesEmptyState;
