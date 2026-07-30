import InquiryPage from './pages/InquiryPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "inquiry" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const inquiryRoutes = [{ path: ROUTES.INQUIRY, element: <InquiryPage /> }];
