import { Box, Typography, Button } from '@mui/material';
import { MdOutlineInbox } from 'react-icons/md';

/**
 * EmptyState
 * Used whenever a list/table has no records — either because no data
 * exists yet, or a filter returned zero results. Keeps the "nothing
 * here" moment actionable instead of a bare blank area.
 */
function EmptyState({
  icon: Icon = MdOutlineInbox,
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 2,
        color: 'text.secondary',
      }}
    >
      <Icon size={36} style={{ opacity: 0.5, marginBottom: 12 }} />
      <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ mt: 0.5, maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button size="small" variant="outlined" onClick={onAction} sx={{ mt: 2 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
