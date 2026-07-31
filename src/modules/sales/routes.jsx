import { ROUTES } from '@constants/routes';
import SalesPage from './pages/SalesPage';
import SalesDashboard from './pages/SalesDashboard';
import LeadsPage from './pages/LeadsPage';
import ProposalPage from './pages/ProposalPage';
import FollowUpPage from './pages/FollowUpPage';
import NegotiationPage from './pages/NegotiationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AnalyticsPage from './pages/AnalyticsPage';

/**
 * Route registry for the "sales" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const salesRoutes = [
  { path: ROUTES.SALES, element: <SalesPage /> },
  { path: `${ROUTES.SALES}/dashboard`, element: <SalesDashboard /> },
  { path: `${ROUTES.SALES}/leads`, element: <LeadsPage /> },
  { path: `${ROUTES.SALES}/proposal`, element: <ProposalPage /> },
  { path: `${ROUTES.SALES}/follow-up`, element: <FollowUpPage /> },
  { path: `${ROUTES.SALES}/negotiation`, element: <NegotiationPage /> },
  { path: `${ROUTES.SALES}/confirmation`, element: <ConfirmationPage /> },
  { path: `${ROUTES.SALES}/analytics`, element: <AnalyticsPage /> },
];
