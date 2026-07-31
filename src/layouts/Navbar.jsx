import { AppBar, Toolbar, IconButton, Box, Tooltip } from '@mui/material';
import { MdMenu, MdOutlineSearch, MdOutlineHelpOutline, MdOutlineSettings, MdOutlineCalendarToday } from 'react-icons/md';

import Breadcrumbs from '@layouts/Breadcrumbs';
import UserMenu from '@layouts/UserMenu';
import NotificationMenu from '@layouts/NotificationMenu';
import { ROUTES } from '@constants/routes';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '@contexts/SidebarContext';

/**
 * Navbar
 * Top app bar: mobile sidebar toggle, breadcrumb trail, notification
 * bell, and the user menu. Stays a thin shell — each piece is its own
 * component so they can be tested/reused independently.
 */
function Navbar() {
  const { openMobile } = useSidebar();
  const navigate = useNavigate();

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

        <Tooltip title="Global search">
          <IconButton size="small" aria-label="Global search">
            <MdOutlineSearch size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Help center">
          <IconButton size="small" aria-label="Help center">
            <MdOutlineHelpOutline size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Settings">
          <IconButton size="small" aria-label="Settings" onClick={() => navigate(ROUTES.SETTINGS)}>
            <MdOutlineSettings size={18} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Calendar">
          <IconButton size="small" aria-label="Calendar">
            <MdOutlineCalendarToday size={18} />
          </IconButton>
        </Tooltip>

        <NotificationMenu />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
