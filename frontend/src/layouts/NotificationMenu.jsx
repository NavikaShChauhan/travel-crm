import { useState } from 'react';
import { Box, IconButton, Badge, Menu, Typography, Stack, Divider, Button } from '@mui/material';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@contexts/NotificationContext';
import { formatRelativeTime } from '@utils/formatters';
import { ROUTES } from '@constants/routes';

/**
 * NotificationMenu
 * Bell icon in the navbar with an unread badge and a short preview of
 * the notification feed. "View all" routes to the full Notifications
 * module page.
 */
function NotificationMenu() {
  const { feed, unreadCount, markAllAsRead } = useNotification();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const preview = feed.slice(0, 4);

  return (
    <Box>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
        <Badge badgeContent={unreadCount} color="error">
          <MdOutlineNotificationsNone size={22} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 340 } } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.25 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </Stack>
        <Divider />
        {preview.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 3, textAlign: 'center' }}>
            You're all caught up.
          </Typography>
        )}
        {preview.map((n) => (
          <Box
            key={n.id}
            sx={{
              px: 2,
              py: 1.25,
              borderLeft: '3px solid',
              borderColor: n.read ? 'transparent' : 'secondary.main',
              bgcolor: n.read ? 'transparent' : 'rgba(217,164,65,0.06)',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {n.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {n.message}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {formatRelativeTime(n.createdAt)}
            </Typography>
          </Box>
        ))}
        <Divider />
        <Button
          fullWidth
          size="small"
          onClick={() => {
            setAnchorEl(null);
            navigate(ROUTES.NOTIFICATIONS);
          }}
          sx={{ borderRadius: 0, py: 1 }}
        >
          View all notifications
        </Button>
      </Menu>
    </Box>
  );
}

export default NotificationMenu;
