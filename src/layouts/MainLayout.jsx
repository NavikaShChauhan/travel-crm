import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { DesktopSidebar, MobileSidebar } from '@layouts/Sidebar';
import Navbar from '@layouts/Navbar';

/**
 * MainLayout
 * Single clean workspace panel with zero redundant double-margins or blank gap boxes.
 */
function MainLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F5FB' }}>
      <DesktopSidebar />
      <MobileSidebar />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          bgcolor: '#F4F5FB',
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 2.5, md: 3 },
            bgcolor: '#F4F5FB',
          }}
        >
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: { xs: '16px', md: '24px' },
              borderTopLeftRadius: { xs: '16px', md: '30px' },
              p: { xs: 2, sm: 3, md: 3.5 },
              minHeight: 'calc(100vh - 110px)',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
