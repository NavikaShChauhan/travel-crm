import ItineraryPage from './pages/ItineraryPage';
import ItineraryBuilderPage from './pages/ItineraryBuilderPage';
import ItineraryAnalyticsPage from './pages/ItineraryAnalyticsPage';
import ItinerarySettingsPage from './pages/ItinerarySettingsPage';
import { ROUTES } from '@constants/routes';

/**
 * Route registry for the "itinerary" module.
 * Aggregated by `src/routes/AppRoutes.jsx`.
 */
export const itineraryRoutes = [
  { path: ROUTES.ITINERARY, element: <ItineraryPage /> },
  { path: `${ROUTES.ITINERARY}/dashboard`, element: <ItineraryPage /> },
  { path: `${ROUTES.ITINERARY}/build`, element: <ItineraryBuilderPage /> },
  { path: `${ROUTES.ITINERARY}/build/:id`, element: <ItineraryBuilderPage /> },
  { path: `${ROUTES.ITINERARY}/settings`, element: <ItinerarySettingsPage /> },
  { path: `${ROUTES.ITINERARY}/analytics`, element: <ItineraryAnalyticsPage /> }
];
