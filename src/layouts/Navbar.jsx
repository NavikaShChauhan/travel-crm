import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { MdMenu } from 'react-icons/md';

import Breadcrumbs from '@layouts/Breadcrumbs';
import UserMenu from '@layouts/UserMenu';
import NotificationMenu from '@layouts/NotificationMenu';
import { useSidebar } from '@contexts/SidebarContext';

/**
 * Navbar
 * Top app bar: mobile sidebar toggle, breadcrumb trail, notification
 * bell, and the user menu. Stays a thin shell — each piece is its own
 * component so they can be tested/reused independently.
 */
function Navbar() {
  const { openMobile } = useSidebar();

  return (
    <AppBar position="sticky" color="inherit" sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ gap: 1.5 }}>
        <IconButton
          onClick={openMobile}
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          edge="start"
        >
          <MdMenu />
        </IconButton>

        <Box sx={{ flex: 1 }}>
          <Breadcrumbs />
        </Box>

        <NotificationMenu />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
