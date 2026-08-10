import OperationsPage from './pages/OperationsPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "operations" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const operationsRoutes = [{ path: ROUTES.OPERATIONS, element: <OperationsPage /> }];
