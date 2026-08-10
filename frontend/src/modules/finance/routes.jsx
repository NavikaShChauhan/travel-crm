import FinancePage from './pages/FinancePage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "finance" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const financeRoutes = [{ path: ROUTES.FINANCE, element: <FinancePage /> }];
