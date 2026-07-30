import { Card, Typography, Stack, Box } from '@mui/material';
import StatusChip from '@components/ui/StatusChip';
import { formatRelativeTime } from '@utils/formatters';

/**
 * RecentActivityList
 * Reads pre-shaped activity data (see modules/dashboard/data/dashboard.mock.js).
 */
function RecentActivityList({ items }) {
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Recent activity
      </Typography>
      <Stack divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />} spacing={1.5}>
        {items.map((item) => (
          <Stack
            key={item.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ py: 0.5 }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatRelativeTime(item.timestamp)}
              </Typography>
            </Box>
            <StatusChip status={item.status} />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default RecentActivityList;
