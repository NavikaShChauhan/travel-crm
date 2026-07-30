import { Box, Drawer, List, ListItemButton, Tooltip, Typography, Stack, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';

import { NAV_ITEMS } from '@constants/navigation';
import { useSidebar } from '@contexts/SidebarContext';
import { tokens } from '@styles/theme';

export const SIDEBAR_WIDTH = 248;
export const SIDEBAR_WIDTH_COLLAPSED = 76;

/**
 * The route/compass mark: two crossed lines meeting at a gold point —
 * this is the app's signature motif, echoed at small scale as the
 * active-nav indicator below.
 */
function BrandMark({ collapsed }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: collapsed ? 0 : 2.5, py: 2.5, justifyContent: collapsed ? 'center' : 'flex-start' }}>
      <Box
        sx={{
          width: 30,
          height: 30,
          flexShrink: 0,
          borderRadius: '8px',
          bgcolor: tokens.color.gold500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 12 L8 2 L14 12 L10.5 12 L8 7.5 L5.5 12 Z" fill={tokens.color.navy900} />
        </svg>
      </Box>
      {!collapsed && (
        <Typography sx={{ fontFamily: tokens.font.display, fontWeight: 700, fontSize: 18, color: '#fff' }}>
          Voyage
        </Typography>
      )}
    </Stack>
  );
}

function NavList({ collapsed, onNavigate }) {
  return (
    <List sx={{ px: collapsed ? 1 : 1.5, py: 1 }}>
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
        const item = (
          <ListItemButton
            key={path}
            component={NavLink}
            to={path}
            onClick={onNavigate}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              px: collapsed ? 1.25 : 1.75,
              py: 1,
              justifyContent: collapsed ? 'center' : 'flex-start',
              color: 'rgba(255,255,255,0.72)',
              position: 'relative',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', color: '#fff' },
              '&.active': {
                bgcolor: tokens.color.navy700,
                color: '#fff',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  height: '60%',
                  width: 3,
                  borderRadius: 4,
                  bgcolor: tokens.color.gold500,
                },
              },
            }}
          >
            <Icon size={19} style={{ flexShrink: 0 }} />
            {!collapsed && (
              <Typography variant="body2" sx={{ ml: 1.5, fontWeight: 500 }}>
                {label}
              </Typography>
            )}
          </ListItemButton>
        );

        return collapsed ? (
          <Tooltip key={path} title={label} placement="right">
            {item}
          </Tooltip>
        ) : (
          item
        );
      })}
    </List>
  );
}

/** Desktop persistent sidebar (collapsible) */
export function DesktopSidebar() {
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const width = isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;

  return (
    <Box
      component="nav"
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        width,
        flexShrink: 0,
        bgcolor: tokens.color.navy900,
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'width 0.2s ease',
        borderRight: `1px solid ${tokens.color.navy700}`,
      }}
    >
      <BrandMark collapsed={isCollapsed} />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <NavList collapsed={isCollapsed} />
      </Box>
      <Box sx={{ p: 1.5, display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-end' }}>
        <IconButton onClick={toggleCollapsed} size="small" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          {isCollapsed ? <MdOutlineChevronRight /> : <MdOutlineChevronLeft />}
        </IconButton>
      </Box>
    </Box>
  );
}

/** Mobile temporary drawer sidebar */
export function MobileSidebar() {
  const { isMobileOpen, closeMobile } = useSidebar();

  return (
    <Drawer
      anchor="left"
      open={isMobileOpen}
      onClose={closeMobile}
      ModalProps={{ keepMounted: true }}
      sx={{ display: { xs: 'block', md: 'none' } }}
      PaperProps={{ sx: { width: SIDEBAR_WIDTH, bgcolor: tokens.color.navy900 } }}
    >
      <BrandMark collapsed={false} />
      <NavList collapsed={false} onNavigate={closeMobile} />
    </Drawer>
  );
}
