import ReportsPage from './pages/ReportsPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "reports" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const reportsRoutes = [{ path: ROUTES.REPORTS, element: <ReportsPage /> }];
