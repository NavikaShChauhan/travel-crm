/**
 * RecentActivities.jsx
 * -----------------------------------------------------------------------
 * Scrollable activity feed for the Sales Dashboard.
 * Each row shows: coloured type icon, activity description, executive
 * name, client name, status chip, and relative timestamp.
 *
 * Reads pre-shaped data from the hook — no data fetching here.
 */

import { Card, Box, Typography, Stack, Avatar } from '@mui/material';
import StatusChip from '@components/ui/StatusChip';
import { formatRelativeTime } from '@utils/formatters';
import {
  ACTIVITY_TYPE_ICONS,
  ACTIVITY_TYPE_COLORS,
} from '../constants/sales.constants';

/**
 * @param {{ activity: object }} props
 */
function ActivityRow({ activity }) {
  const Icon = ACTIVITY_TYPE_ICONS[activity.type] ?? ACTIVITY_TYPE_ICONS.assignment;
  const colors =
    ACTIVITY_TYPE_COLORS[activity.type] ?? ACTIVITY_TYPE_COLORS.assignment;

  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="flex-start"
      sx={{
        py: 1.25,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      {/* Type icon bubble */}
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: colors.bg,
          color: colors.icon,
          flexShrink: 0,
        }}
      >
        <Icon size={18} />
      </Avatar>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, lineHeight: 1.4 }}
          noWrap
          title={activity.description}
        >
          {activity.description}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.4 }}>
          <Typography variant="caption" color="text.secondary" noWrap>
            {activity.executive}
          </Typography>
          <Typography variant="caption" color="divider">
            ·
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {activity.client}
          </Typography>
        </Stack>
      </Box>

      {/* Right: status + time */}
      <Stack alignItems="flex-end" spacing={0.5} sx={{ flexShrink: 0 }}>
        <StatusChip status={activity.status} />
        <Typography variant="caption" color="text.disabled">
          {formatRelativeTime(activity.timestamp)}
        </Typography>
      </Stack>
    </Stack>
  );
}

/**
 * RecentActivities
 *
 * @param {{ activities: Array }} props
 */
function RecentActivities({ activities }) {
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Recent Activities
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Latest actions across all leads & deals
      </Typography>

      <Box
        sx={{
          maxHeight: 420,
          overflowY: 'auto',
          pr: 0.5,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': { borderRadius: 4, bgcolor: '#c7cce0' },
        }}
      >
        {activities.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </Box>
    </Card>
  );
}

export default RecentActivities;
