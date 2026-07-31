import { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItemButton, Tooltip, Typography, Stack, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';

import { NAV_ITEMS } from '@constants/navigation';
import { useSidebar } from '@contexts/SidebarContext';
import { tokens } from '@styles/theme';

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_WIDTH_COLLAPSED = 64;

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

const SIDEBAR_ITEM_HEIGHT = 44;
const SIDEBAR_ITEM_RADIUS = 10;
const SIDEBAR_TOGGLE_SIZE = 40;
const SIDEBAR_TOGGLE_FLOAT_OFFSET = 20;
const SIDEBAR_TOGGLE_FLOAT_RIGHT = `calc(100vw - ${SIDEBAR_WIDTH_COLLAPSED + SIDEBAR_TOGGLE_FLOAT_OFFSET}px)`;

const SIDEBAR_ITEM_SX = {
  borderRadius: SIDEBAR_ITEM_RADIUS,
  minHeight: SIDEBAR_ITEM_HEIGHT,
  width: '100%',
  px: 1.25,
  py: 0.75,
  display: 'flex',
  alignItems: 'center',
  color: 'rgba(255,255,255,0.72)',
  transition: 'background-color 180ms ease, color 180ms ease',
  '&:hover': {
    bgcolor: tokens.color.navy700,
    color: '#fff',
  },
  '&.active': {
    bgcolor: tokens.color.navy700,
    color: '#fff',
  },
};

function SidebarItem({
  label,
  icon: Icon,
  collapsed,
  isActive,
  onClick,
  to,
  isParent,
  children,
  chevron,
}) {
  const sharedProps = {
    onClick,
    sx: {
      ...SIDEBAR_ITEM_SX,
      justifyContent: collapsed ? 'center' : 'space-between',
      px: collapsed ? 1 : 1.75,
      ...(children && { width: '100%' }),
    },
  };

  if (to) {
    return (
      <ListItemButton
        component={NavLink}
        to={to}
        end
        {...sharedProps}
      >
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ width: '100%', minWidth: 0 }}>
          <Box sx={{ minWidth: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={19} style={{ flexShrink: 0 }} />
          </Box>
          {!collapsed && (
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 13, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              {label}
            </Typography>
          )}
          {!collapsed && isParent && chevron}
        </Stack>
      </ListItemButton>
    );
  }

  return (
    <ListItemButton
      {...sharedProps}
    >
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ width: '100%', minWidth: 0 }}>
        <Box sx={{ minWidth: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={19} style={{ flexShrink: 0 }} />
        </Box>
        {!collapsed && (
          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 13, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
            {label}
          </Typography>
        )}
      </Stack>
    </ListItemButton>
  );
}

function SidebarToggleButton({ collapsed, onClick, ariaLabel }) {
  const isFloating = collapsed;

  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        width: SIDEBAR_TOGGLE_SIZE,
        height: SIDEBAR_TOGGLE_SIZE,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.12)',
        bgcolor: tokens.color.navy900,
        color: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        cursor: 'pointer',
        transition: 'all 250ms ease',
        position: isFloating ? 'fixed' : 'absolute',
        top: isFloating ? '50%' : '50%',
        transform: isFloating ? 'translateY(-50%)' : 'translateY(-50%)',
        right: isFloating ? SIDEBAR_TOGGLE_FLOAT_RIGHT : 16,
        zIndex: 1000,
        '&:hover': {
          bgcolor: tokens.color.navy800,
          transform: isFloating ? 'translateY(-50%) scale(1.05)' : 'translateY(-50%) scale(1.05)',
        },
      }}
    >
      {collapsed ? <MdOutlineChevronRight size={18} /> : <MdOutlineChevronLeft size={18} />}
    </IconButton>
  );
}

function NavList({ collapsed, onNavigate }) {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    NAV_ITEMS.forEach((item) => {
      if (item.children) {
        init[item.path] = pathname.startsWith(item.path);
      }
    });
    return init;
  });

  useEffect(() => {
    setExpanded((prev) => {
      const next = { ...prev };
      NAV_ITEMS.forEach((item) => {
        if (item.children && !(item.path in prev)) {
          next[item.path] = pathname.startsWith(item.path);
        }
      });
      return next;
    });
  }, [pathname]);

  return (
    <List sx={{ px: collapsed ? 1 : 1.5, py: 1 }}>
      {NAV_ITEMS.map(({ label, path, icon: Icon, children }) => {
        const isActiveParent = pathname === path;
        const isExpanded = Boolean(expanded[path]);

        const parentItem = (
          <SidebarItem
            key={path}
            label={label}
            icon={Icon}
            collapsed={collapsed}
            isActive={isActiveParent}
            onClick={(event) => {
              if (children) {
                event.preventDefault();
                setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
                if (onNavigate) onNavigate();
              } else if (onNavigate) {
                onNavigate();
              }
            }}
            to={children ? undefined : path}
            isParent={Boolean(children)}
            chevron={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 1 }}>
                <MdOutlineChevronRight
                  size={18}
                  style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                />
              </Box>
            }
          />
        );

        return (
          <Box key={path}>
            {collapsed ? (
              <Tooltip title={label} placement="right">
                {parentItem}
              </Tooltip>
            ) : (
              parentItem
            )}
            {!collapsed && isExpanded && children && (
              <List disablePadding sx={{ pl: 2.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {children.map(({ label: childLabel, path: childPath, icon: ChildIcon }) => (
                  <SidebarItem
                    key={childPath}
                    label={childLabel}
                    icon={ChildIcon}
                    collapsed={collapsed}
                    isActive={pathname === childPath}
                    onClick={onNavigate}
                    to={childPath}
                  />
                ))}
              </List>
            )}
          </Box>
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
        overflow: 'visible',
      }}
    >
      <Box sx={{ position: 'relative', minHeight: 72, display: 'flex', alignItems: 'center' }}>
        <BrandMark collapsed={isCollapsed} />

        {!isCollapsed ? (
          <SidebarToggleButton
            collapsed={false}
            onClick={toggleCollapsed}
            ariaLabel="Collapse sidebar"
          />
        ) : null}
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <NavList collapsed={isCollapsed} />
      </Box>

      {isCollapsed ? (
        <SidebarToggleButton
          collapsed
          onClick={toggleCollapsed}
          ariaLabel="Expand sidebar"
        />
      ) : null}
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
