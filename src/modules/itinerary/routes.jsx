import ItineraryPage from './pages/ItineraryPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "itinerary" module. Aggregated by
 * `src/routes/AppRoutes.jsx` — add new routes for this module here,
 * not in the central router.
 */
export const itineraryRoutes = [{ path: ROUTES.ITINERARY, element: <ItineraryPage /> }];
