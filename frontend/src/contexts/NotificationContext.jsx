import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { MOCK_NOTIFICATIONS } from '@mock-data/notifications';

/**
 * NotificationContext
 * -----------------------------------------------------------------------
 * Two related-but-distinct concerns live here:
 *  1. Ephemeral toast messages (`notify`) — success/error/info snackbars
 *     triggered by any module after a service call resolves/rejects.
 *  2. The persistent notification feed shown under the navbar bell icon.
 *
 * TODO (backend integration):
 * - Replace MOCK_NOTIFICATIONS with notificationService.getAll()
 * - Wire `markAsRead` / `markAllAsRead` to PATCH /api/notifications
 * - Consider a WebSocket/SSE subscription for real-time push
 */
const NotificationContext = createContext(undefined);

export function NotificationProvider({ children }) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
  const [feed, setFeed] = useState(MOCK_NOTIFICATIONS);

  const notify = useCallback((message, severity = 'info') => {
    setToast({ open: true, message, severity });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const markAsRead = useCallback((id) => {
    // TODO: call notificationService.markAsRead(id)
    setFeed((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    // TODO: call notificationService.markAllAsRead()
    setFeed((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = useMemo(() => feed.filter((n) => !n.read).length, [feed]);

  const value = useMemo(
    () => ({ notify, feed, unreadCount, markAsRead, markAllAsRead }),
    [notify, feed, unreadCount, markAsRead, markAllAsRead]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeToast} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (ctx === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return ctx;
}
