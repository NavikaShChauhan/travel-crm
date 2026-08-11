import SuppliersPage from './pages/SuppliersPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "suppliers" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const suppliersRoutes = [{ path: ROUTES.SUPPLIERS, element: <SuppliersPage /> }];
