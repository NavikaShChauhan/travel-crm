import { useAuth } from '@contexts/AuthContext';

/**
 * ProtectedRoute
 * -----------------------------------------------------------------------
 * Gates the authenticated app shell. Currently a pass-through because
 * AuthContext seeds a mock logged-in user — this is where a redirect to
 * /login will go once real auth exists.
 *
 * TODO (backend integration):
 * - If (!isAuthenticated) redirect to ROUTES.LOGIN, preserving the
 *   attempted location so we can return the user after login.
 * - Optionally show a full-page loader while `isLoading` (session
 *   hydration) is true.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // TODO: return <Navigate to={ROUTES.LOGIN} replace />
  }

  return children;
}

export default ProtectedRoute;
