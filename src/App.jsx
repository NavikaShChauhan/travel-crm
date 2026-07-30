import AppRoutes from '@/routes/AppRoutes';

/**
 * App
 * Root component. Kept intentionally thin — layout lives in
 * `layouts/MainLayout`, routing lives in `routes/AppRoutes`, and
 * cross-cutting state lives in `contexts/`. This file should not grow.
 */
function App() {
  return <AppRoutes />;
}

export default App;
