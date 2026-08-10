import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

function NotFoundPage() {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        textAlign: 'center',
      }}
    >
      <Typography variant="overline" color="secondary.dark">
        404
      </Typography>
      <Typography variant="h4">This page hasn't been mapped yet</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
        The route you followed doesn't match anything in the CRM. Head back to the
        dashboard to keep going.
      </Typography>
      <Button component={Link} to={ROUTES.DASHBOARD} variant="contained" sx={{ mt: 1 }}>
        Back to dashboard
      </Button>
    </Box>
  );
}

export default NotFoundPage;
