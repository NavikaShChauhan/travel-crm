import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { DesktopSidebar, MobileSidebar } from '@layouts/Sidebar';
import Navbar from '@layouts/Navbar';

/**
 * MainLayout
 * The authenticated app shell: sidebar + navbar + routed page content.
 * Rendered once by AppRoutes and wraps every module route via <Outlet />,
 * so individual pages never re-implement navigation chrome.
 */
function MainLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DesktopSidebar />
      <MobileSidebar />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
