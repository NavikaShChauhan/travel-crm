import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';

/**
 * SidebarContext
 * -----------------------------------------------------------------------
 * Pure UI state — desktop collapse and mobile drawer open/close.
 * Kept separate from AuthContext/NotificationContext so layout re-renders
 * never cascade into unrelated parts of the app.
 */
const SidebarContext = createContext(undefined);

export function SidebarProvider({ children }) {
  const STORAGE_KEY = 'voyage_sidebar_collapsed_v1';
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : false;
    } catch (e) {
      return false;
    }
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapsed = useCallback(() => setIsCollapsed((prev) => !prev), []);
  const openMobile = useCallback(() => setIsMobileOpen(true), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const value = useMemo(
    () => ({ isCollapsed, toggleCollapsed, isMobileOpen, openMobile, closeMobile }),
    [isCollapsed, toggleCollapsed, isMobileOpen, openMobile, closeMobile]
  );

  // Persist collapsed state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isCollapsed));
    } catch (e) {
      // ignore
    }
  }, [isCollapsed]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (ctx === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return ctx;
}
