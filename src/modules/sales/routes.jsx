import SalesPage from './pages/SalesPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "sales" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const salesRoutes = [{ path: ROUTES.SALES, element: <SalesPage /> }];
