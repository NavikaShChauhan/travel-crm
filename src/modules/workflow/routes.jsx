import WorkflowPage from './pages/WorkflowPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "workflow" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const workflowRoutes = [{ path: ROUTES.WORKFLOW, element: <WorkflowPage /> }];
