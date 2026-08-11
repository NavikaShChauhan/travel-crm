import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { MdClose } from 'react-icons/md';
import { tokens } from '@styles/theme';

export default function SalesModal({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2.5,
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      {title && (
        <DialogTitle
          sx={{
            p: 2.5,
            m: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: tokens.color.surface1,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            {icon && (
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(47,143,134,0.1)',
                  color: tokens.color.teal500,
                  display: 'flex',
                }}
              >
                {icon}
              </Box>
            )}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Stack>
          <IconButton aria-label="Close dialog" onClick={onClose} size="small">
            <MdClose size={20} />
          </IconButton>
        </DialogTitle>
      )}

      {/* Content */}
      <DialogContent dividers sx={{ p: 3 }}>
        {children}
      </DialogContent>

      {/* Optional Actions Footer */}
      {actions && <DialogActions sx={{ p: 2, px: 3, bgcolor: 'background.paper' }}>{actions}</DialogActions>}
    </Dialog>
  );
}
