import { useState } from 'react';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineDescription,
  MdOutlineSchedule,
  MdOutlineHandshake,
  MdOutlineCheckCircle,
  MdOutlineHourglassEmpty,
  MdOutlineCancel,
  MdOutlineAssessment,
  MdExpandMore,
  MdChevronRight,
} from 'react-icons/md';
import { tokens } from '@styles/theme';

const NAV_ITEMS = [
  { label: 'Sales Dashboard', path: '/sales/dashboard', icon: MdOutlineDashboard },
  { label: 'Proposal', path: '/sales/proposal', icon: MdOutlineDescription },
  { label: 'Follow Up', path: '/sales/follow-up', icon: MdOutlineSchedule },
  { label: 'Negotiation', path: '/sales/negotiation', icon: MdOutlineHandshake },
  {
    label: 'Confirmation',
    path: '/sales/confirmation',
    icon: MdOutlineCheckCircle,
    children: [
      { label: 'Soft Confirm', path: '/sales/confirmation/soft-confirm', icon: MdOutlineHourglassEmpty },
      { label: 'Confirmed', path: '/sales/confirmation/confirmed', icon: MdOutlineCheckCircle },
      { label: 'Rejected', path: '/sales/confirmation/rejected', icon: MdOutlineCancel },
    ],
  },
  { label: 'Analytics', path: '/sales/analytics', icon: MdOutlineAssessment },
];

function SalesModuleSidebar() {
  const { pathname } = useLocation();
  const [confirmationOpen, setConfirmationOpen] = useState(() => pathname.startsWith('/sales/confirmation'));

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
          {NAV_ITEMS.map(({ label, path, icon: Icon, children }) => {
            if (children) {
              const isChildActive = pathname.startsWith(path);

              return (
                <Box key={path}>
                  <ListItemButton
                    onClick={() => setConfirmationOpen((prev) => !prev)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      px: 1.25,
                      py: 0.75,
                      color: isChildActive ? tokens.color.navy700 : 'text.secondary',
                      bgcolor: isChildActive ? 'rgba(27,42,74,0.06)' : 'transparent',
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
                      primaryTypographyProps={{ fontSize: 13, fontWeight: 700 }}
                    />
                    {confirmationOpen ? <MdExpandMore size={18} /> : <MdChevronRight size={18} />}
                  </ListItemButton>
                  <Collapse in={confirmationOpen} timeout="auto" unmountOnExit>
                    <List disablePadding dense sx={{ pl: 2 }}>
                      {children.map(({ label: subLabel, path: subPath, icon: SubIcon }) => {
                        const isSubActive = pathname === subPath || (subPath === '/sales/confirmation/soft-confirm' && pathname === '/sales/confirmation');

                        return (
                          <ListItemButton
                            key={subPath}
                            component={NavLink}
                            to={subPath}
                            selected={isSubActive}
                            sx={{
                              borderRadius: 2,
                              mb: 0.5,
                              px: 1.25,
                              py: 0.65,
                              color: isSubActive ? tokens.color.navy700 : 'text.secondary',
                              '&.Mui-selected': {
                                bgcolor: 'rgba(27,42,74,0.12)',
                                color: tokens.color.navy700,
                                fontWeight: 700,
                              },
                              '&:hover': {
                                bgcolor: 'rgba(11,21,38,0.04)',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
                              <SubIcon size={16} />
                            </ListItemIcon>
                            <ListItemText
                              primary={subLabel}
                              primaryTypographyProps={{ fontSize: 12.5, fontWeight: isSubActive ? 700 : 500 }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </Box>
              );
            }

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

