import SettingsPage from './pages/SettingsPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "settings" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const settingsRoutes = [{ path: ROUTES.SETTINGS, element: <SettingsPage /> }];
