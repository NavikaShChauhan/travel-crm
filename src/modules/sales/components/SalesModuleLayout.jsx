import { Box, Grid } from '@mui/material';
import SalesModuleSidebar from './SalesModuleSidebar';

function SalesModuleLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Grid container spacing={2.5} alignItems="flex-start">
        <Grid item xs={12} lg={3}>
          <SalesModuleSidebar />
        </Grid>
        <Grid item xs={12} lg={9}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SalesModuleLayout;
