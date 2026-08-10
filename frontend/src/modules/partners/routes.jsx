import PartnersPage from './pages/PartnersPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "partners" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const partnersRoutes = [{ path: ROUTES.PARTNERS, element: <PartnersPage /> }];
