import NotificationsPage from './pages/NotificationsPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "notifications" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const notificationsRoutes = [{ path: ROUTES.NOTIFICATIONS, element: <NotificationsPage /> }];
