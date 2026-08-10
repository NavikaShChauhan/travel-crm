import { AppBar, Toolbar, IconButton, Box, Tooltip, Stack } from '@mui/material';
import { MdMenu, MdOutlineHelpOutline, MdOutlineSettings, MdOutlineLanguage } from 'react-icons/md';

import Breadcrumbs from '@layouts/Breadcrumbs';
import UserMenu from '@layouts/UserMenu';
import NotificationMenu from '@layouts/NotificationMenu';
import { ROUTES } from '@constants/routes';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '@contexts/SidebarContext';

function Navbar() {
  const { openMobile } = useSidebar();
  const navigate = useNavigate();

  const iconBtnSx = {
    bgcolor: '#F8FAFC',
    color: '#64748B',
    width: 38,
    height: 38,
    borderRadius: '50%',
    border: '1px solid #E2E8F0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    transition: 'all 200ms ease',
    '&:hover': {
      bgcolor: '#EEF2FF',
      color: '#6366F1',
      borderColor: '#C7D2FE',
    },
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: '#FFFFFF', // Pure white matching sidebar background color
        borderBottom: 'none',
        py: 0.75,
      }}
    >
      <Toolbar sx={{ gap: 1.5, px: { xs: 2, sm: 3, md: 3 } }}>
        <IconButton
          onClick={openMobile}
          sx={{ display: { xs: 'inline-flex', md: 'none' }, ...iconBtnSx }}
          edge="start"
        >
          <MdMenu size={20} />
        </IconButton>

        <Box sx={{ flex: 1 }}>
          <Breadcrumbs />
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Language">
            <IconButton size="small" aria-label="Language" sx={iconBtnSx}>
              <MdOutlineLanguage size={19} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Help center">
            <IconButton size="small" aria-label="Help center" sx={iconBtnSx}>
              <MdOutlineHelpOutline size={19} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton size="small" aria-label="Settings" onClick={() => navigate(ROUTES.SETTINGS)} sx={iconBtnSx}>
              <MdOutlineSettings size={19} />
            </IconButton>
          </Tooltip>

          <NotificationMenu />
          <UserMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
