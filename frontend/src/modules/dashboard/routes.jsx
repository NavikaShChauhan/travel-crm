import DashboardPage from './pages/DashboardPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "dashboard" module. Aggregated by
 * `src/routes/AppRoutes.jsx`.
 */
export const dashboardRoutes = [{ path: ROUTES.DASHBOARD, element: <DashboardPage /> }];
