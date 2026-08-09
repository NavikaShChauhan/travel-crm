import { Card, Typography, Stack, Box, Chip } from '@mui/material';
import { formatRelativeTime } from '@utils/formatters';

function RecentActivityList({ items }) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        borderRadius: '20px',
        border: '1px solid #F1F5F9',
        bgcolor: '#FFFFFF',
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, fontSize: 17, color: '#0F172A' }}>
        Recent Activity
      </Typography>
      <Typography variant="body2" sx={{ color: '#64748B', mb: 2, fontSize: 13 }}>
        Live updates across inquiries & sales
      </Typography>

      <Stack divider={<Box sx={{ borderBottom: '1px solid', borderColor: '#F1F5F9' }} />} spacing={1.5}>
        {items.map((item) => (
          <Stack
            key={item.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ py: 1 }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 13.5 }}>
                {item.label}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: 12 }}>
                {formatRelativeTime(item.timestamp)}
              </Typography>
            </Box>
            <Chip
              label={item.status || 'Active'}
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: 11,
                bgcolor: '#F3E8FF',
                color: '#8B5CF6',
                borderRadius: '12px',
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default RecentActivityList;
