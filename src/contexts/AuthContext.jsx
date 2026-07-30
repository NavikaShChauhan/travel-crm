import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { MOCK_CURRENT_USER } from '@mock-data/currentUser';

/**
 * AuthContext
 * -----------------------------------------------------------------------
 * Holds the authenticated user + session state for the whole app.
 *
 * TODO (backend integration):
 * - Replace `login`/`logout` bodies with calls to `services/auth.service.js`
 * - Persist/restore session token (httpOnly cookie preferred over localStorage)
 * - Hydrate `user` from `GET /api/auth/me` on app load
 * - Wire `hasPermission` to real role/permission data returned by the API
 */
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  // Seeded with mock data so every module can build screens against a
  // "logged in" user before auth endpoints exist.
  const [user, setUser] = useState(MOCK_CURRENT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (_credentials) => {
    // TODO: call authService.login(credentials) and set user from response
    setIsLoading(true);
    setIsLoading(false);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    // TODO: call authService.logout() to invalidate the session server-side
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const hasPermission = useCallback(
    (_permissionKey) => {
      // TODO: replace with real RBAC check against user.permissions
      return Boolean(user);
    },
    [user]
  );

  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, login, logout, hasPermission }),
    [user, isAuthenticated, isLoading, login, logout, hasPermission]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
