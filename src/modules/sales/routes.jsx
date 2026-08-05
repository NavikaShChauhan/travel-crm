import { ROUTES } from '@constants/routes';
import SalesPage from './pages/SalesPage';
import SalesDashboard from './pages/SalesDashboard';
import ProposalPage from './pages/ProposalPage';
import FollowUpPage from './pages/FollowUpPage';
import NegotiationPage from './pages/NegotiationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SalesExperience from './components/SalesExperience';

/**
 * Route registry for the "sales" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const salesRoutes = [
  { path: ROUTES.SALES, element: <SalesExperience><SalesPage /></SalesExperience> },
  { path: `${ROUTES.SALES}/dashboard`, element: <SalesExperience><SalesDashboard /></SalesExperience> },
  { path: `${ROUTES.SALES}/proposal`, element: <SalesExperience><ProposalPage /></SalesExperience> },
  { path: `${ROUTES.SALES}/follow-up`, element: <SalesExperience><FollowUpPage /></SalesExperience> },
  { path: `${ROUTES.SALES}/negotiation`, element: <SalesExperience><NegotiationPage /></SalesExperience> },
  { path: `${ROUTES.SALES}/confirmation`, element: <SalesExperience><ConfirmationPage /></SalesExperience> },
  { path: `${ROUTES.SALES}/analytics`, element: <SalesExperience><AnalyticsPage /></SalesExperience> },
];
