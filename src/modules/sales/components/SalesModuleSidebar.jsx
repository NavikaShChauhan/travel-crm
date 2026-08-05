import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineDescription,
  MdOutlineSchedule,
  MdOutlineHandshake,
  MdOutlineCheckCircle,
  MdOutlineAssessment,
} from 'react-icons/md';
import { tokens } from '@styles/theme';

const NAV_ITEMS = [
  { label: 'Sales Dashboard', path: '/sales/dashboard', icon: MdOutlineDashboard },
  { label: 'Proposal', path: '/sales/proposal', icon: MdOutlineDescription },
  { label: 'Follow Up', path: '/sales/follow-up', icon: MdOutlineSchedule },
  { label: 'Negotiation', path: '/sales/negotiation', icon: MdOutlineHandshake },
  { label: 'Confirmation', path: '/sales/confirmation', icon: MdOutlineCheckCircle },
  { label: 'Analytics', path: '/sales/analytics', icon: MdOutlineAssessment },
];

function SalesModuleSidebar() {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { lg: 240 },
        p: { xs: 0, lg: 0.5 },
      }}
    >
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          bgcolor: 'background.paper',
          p: 1.5,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.25 }}>
          Sales Navigation
        </Typography>
        <List disablePadding dense>
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const isActive = pathname === path || (path === '/sales/dashboard' && pathname === '/sales');

            return (
              <ListItemButton
                key={path}
                component={NavLink}
                to={path}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  px: 1.25,
                  py: 0.75,
                  color: isActive ? tokens.color.navy700 : 'text.secondary',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(27,42,74,0.08)',
                    color: tokens.color.navy700,
                  },
                  '&:hover': {
                    bgcolor: 'rgba(11,21,38,0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: 'inherit' }}>
                  <Icon size={18} />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default SalesModuleSidebar;
