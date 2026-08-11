import CustomersPage from './pages/CustomersPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "customers" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const customersRoutes = [{ path: ROUTES.CUSTOMERS, element: <CustomersPage /> }];
