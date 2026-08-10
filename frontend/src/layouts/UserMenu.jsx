import { useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { MdOutlinePerson, MdOutlineSettings, MdOutlineLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';
import { ROUTES } from '@constants/routes';
import { initialsFromName } from '@utils/formatters';
import { tokens } from '@styles/theme';

/**
 * UserMenu
 * Avatar + dropdown in the top navbar. Reads the current user from
 * AuthContext; `logout` already routes through the context so the
 * TODO for the real session-invalidation call lives in one place.
 */
function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    setAnchorEl(null);
    await logout();
    // TODO: navigate(ROUTES.LOGIN) once a login route/page exists
  };

  if (!user) return null;

  return (
    <Box>
      <Avatar
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          width: 34,
          height: 34,
          fontSize: 13,
          fontWeight: 700,
          bgcolor: tokens.color.navy800,
          color: tokens.color.gold500,
          cursor: 'pointer',
        }}
      >
        {initialsFromName(user.name)}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ px: 2, py: 1.25, minWidth: 200 }}>
          <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.role}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><MdOutlinePerson size={18} /></ListItemIcon>
          <ListItemText>My profile</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate(ROUTES.SETTINGS);
          }}
        >
          <ListItemIcon><MdOutlineSettings size={18} /></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><MdOutlineLogout size={18} /></ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
