import { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItemButton, Tooltip, Typography, Stack, IconButton } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';

import { NAV_ITEMS } from '@constants/navigation';
import { useSidebar } from '@contexts/SidebarContext';
import { tokens } from '@styles/theme';

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_WIDTH_COLLAPSED = 72;

/**
 * Modern Brand Mark (panze studio inspired purple aesthetic)
 * Perfectly centered when collapsed without sticking to edges
 */
function BrandMark({ collapsed }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        px: collapsed ? 0 : 3,
        py: 2.5,
        width: '100%',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          flexShrink: 0,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
          mx: collapsed ? 'auto' : 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FFFFFF" />
          <path d="M2 17L12 22L22 17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Box>
      {!collapsed && (
        <Box>
          <Typography sx={{ fontFamily: tokens.font.display, fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            voyage
          </Typography>
          <Typography variant="caption" sx={{ color: '#8B5CF6', fontWeight: 700, letterSpacing: '0.05em', fontSize: 10, textTransform: 'uppercase' }}>
            CRM Studio
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

const SIDEBAR_ITEM_HEIGHT = 46;
const SIDEBAR_ITEM_RADIUS = 24;

function SidebarItem({
  label,
  icon: Icon,
  collapsed,
  isActive,
  onClick,
  to,
  isParent,
  chevron,
}) {
  const itemStyle = {
    borderRadius: `${SIDEBAR_ITEM_RADIUS}px`,
    minHeight: SIDEBAR_ITEM_HEIGHT,
    // Let the selected top-level item extend into the curved sidebar edge.
    // This creates the tab treatment shown in the reference design without
    // changing the usable width of the navigation list.
    width: isActive && !collapsed ? 'calc(100% + 20px)' : '100%',
    px: collapsed ? 1.25 : 2,
    py: 1,
    my: 0.25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    color: isActive ? '#FFFFFF' : '#475569',
    background: isActive ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' : 'transparent',
    boxShadow: isActive ? '0 8px 20px rgba(139, 92, 246, 0.3)' : 'none',
    position: 'relative',
    zIndex: isActive ? 1 : 0,
    transition: 'all 200ms ease',
    '&:hover': {
      borderRadius: `${SIDEBAR_ITEM_RADIUS}px`,
      bgcolor: isActive ? 'none' : '#F1F5F9',
      color: isActive ? '#FFFFFF' : '#0F172A',
    },
  };

  const content = (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ width: '100%', minWidth: 0, justifyContent: collapsed ? 'center' : 'flex-start' }}>
      <Box
        sx={{
          minWidth: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isActive ? '#FFFFFF' : '#64748B',
          mx: collapsed ? 'auto' : 0,
        }}
      >
        <Icon size={20} style={{ flexShrink: 0 }} />
      </Box>
      {!collapsed && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: isActive ? 700 : 600,
            fontSize: 14,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            color: isActive ? '#FFFFFF' : '#334155',
            flex: 1,
          }}
        >
          {label}
        </Typography>
      )}
      {!collapsed && isParent && (
        <Box sx={{ color: isActive ? '#FFFFFF' : '#94A3B8', display: 'flex', alignItems: 'center' }}>
          {chevron || <MdOutlineChevronRight size={18} />}
        </Box>
      )}
    </Stack>
  );

  if (to) {
    return (
      <ListItemButton component={NavLink} to={to} end onClick={onClick} sx={itemStyle}>
        {content}
      </ListItemButton>
    );
  }

  return (
    <ListItemButton onClick={onClick} sx={itemStyle}>
      {content}
    </ListItemButton>
  );
}

function SidebarToggleButton({ collapsed, onClick, ariaLabel }) {
  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '1px solid #E2E8F0',
        bgcolor: '#FFFFFF',
        color: '#475569',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        '&:hover': {
          bgcolor: '#F8FAFC',
          color: '#8B5CF6',
        },
      }}
    >
      {collapsed ? <MdOutlineChevronRight size={18} /> : <MdOutlineChevronLeft size={18} />}
    </IconButton>
  );
}

function NavList({ collapsed, onNavigate }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isCollapsed, expandSidebar } = useSidebar();

  // State maps item.path -> boolean for expanded accordion
  const [expanded, setExpanded] = useState(() => {
    const activeParent = NAV_ITEMS.find(
      (item) => item.children && (pathname === item.path || item.children.some((c) => pathname === c.path))
    );
    return activeParent ? { [activeParent.path]: true } : {};
  });

  // Sync expanded state on route changes - ALWAYS ensure ONLY 1 module accordion is open at a time
  useEffect(() => {
    const activeParent = NAV_ITEMS.find(
      (item) => item.children && (pathname === item.path || item.children.some((c) => pathname === c.path))
    );
    if (activeParent) {
      setExpanded({ [activeParent.path]: true });
    } else {
      setExpanded({});
    }
  }, [pathname]);

  const handleParentClick = (item, event) => {
    // 1. Automatically expand sidebar if collapsed
    if (isCollapsed) {
      expandSidebar();
    }

    // 2. Single Accordion Exclusivity: Close all other module submodules, open ONLY the clicked module
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      setExpanded({ [item.path]: true });
      const firstChildPath = item.children[0].path;
      navigate(firstChildPath);
      if (onNavigate) onNavigate();
    } else {
      // Direct module navigation without children (e.g. Dashboard, Operations, Finance) -> close all submodules
      setExpanded({});
      navigate(item.path);
      if (onNavigate) onNavigate();
    }
  };

  return (
    <List sx={{ px: collapsed ? 1.25 : 2, py: 1, overflow: 'visible' }}>
      {NAV_ITEMS.map((item) => {
        const { label, path, icon: Icon, children } = item;
        const isActiveParent = pathname === path || children?.some(({ path: childPath }) => pathname === childPath);
        const isExpanded = Boolean(expanded[path]);

        const parentItem = (
          <SidebarItem
            key={path}
            label={label}
            icon={Icon}
            collapsed={collapsed}
            isActive={isActiveParent}
            onClick={(e) => handleParentClick(item, e)}
            isParent={Boolean(children)}
            chevron={
              <MdOutlineChevronRight
                size={18}
                style={{
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            }
          />
        );

        return (
          <Box key={path} sx={{ mb: 0.5 }}>
            {collapsed ? (
              <Tooltip title={label} placement="right">
                {parentItem}
              </Tooltip>
            ) : (
              parentItem
            )}
            {!collapsed && isExpanded && children && (
              <List disablePadding sx={{ pl: 2, display: 'flex', flexDirection: 'column', gap: 0.25, mt: 0.25 }}>
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

/** Desktop persistent sidebar (clean white floating studio design) */
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
        bgcolor: '#FFFFFF',
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'width 0.2s ease',
        borderRight: '1px solid #F1F5F9',
        boxShadow: '4px 0 24px rgba(99, 102, 241, 0.03)',
        zIndex: 100,
        overflow: 'visible',
        // A small canvas-coloured cut-out makes the change from the white
        // sidebar to the workspace header feel intentionally curved.
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 70,
          right: -30,
          width: 30,
          height: 30,
          bgcolor: '#F4F5FB',
          borderTopLeftRadius: '30px',
          pointerEvents: 'none',
          zIndex: 2,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          width: '100%',
          pr: isCollapsed ? 0 : 2,
        }}
      >
        <BrandMark collapsed={isCollapsed} />
        {!isCollapsed && (
          <SidebarToggleButton collapsed={false} onClick={toggleCollapsed} ariaLabel="Collapse sidebar" />
        )}
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        <NavList collapsed={isCollapsed} />
      </Box>

      {isCollapsed && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <SidebarToggleButton collapsed onClick={toggleCollapsed} ariaLabel="Expand sidebar" />
        </Box>
      )}
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
      PaperProps={{ sx: { width: SIDEBAR_WIDTH, bgcolor: '#FFFFFF' } }}
    >
      <BrandMark collapsed={false} />
      <NavList collapsed={false} onNavigate={closeMobile} />
    </Drawer>
  );
}
