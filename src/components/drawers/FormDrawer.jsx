import { Drawer, Box, Typography, IconButton, Divider, Stack } from '@mui/material';
import { MdClose } from 'react-icons/md';

/**
 * FormDrawer
 * Reusable right-side drawer shell for create/edit forms (e.g. "New
 * Inquiry", "Edit Supplier"). The drawer owns chrome (header, close
 * button, footer slot); the module owns the actual form fields.
 *
 * Usage:
 *   <FormDrawer open={open} title="New Inquiry" onClose={close} footer={<Button .../>}>
 *     <InquiryForm ... />
 *   </FormDrawer>
 */
function FormDrawer({ open, title, onClose, children, footer, width = 440 }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: '100vw', sm: width }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, py: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose} size="small">
            <MdClose />
          </IconButton>
        </Stack>
        <Divider />
        <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2.5 }}>{children}</Box>
        {footer && (
          <>
            <Divider />
            <Box sx={{ px: 3, py: 2 }}>{footer}</Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default FormDrawer;
