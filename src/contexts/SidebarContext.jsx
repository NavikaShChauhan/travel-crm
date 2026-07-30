import { createContext, useContext, useMemo, useState, useCallback } from 'react';

/**
 * SidebarContext
 * -----------------------------------------------------------------------
 * Pure UI state — desktop collapse and mobile drawer open/close.
 * Kept separate from AuthContext/NotificationContext so layout re-renders
 * never cascade into unrelated parts of the app.
 */
const SidebarContext = createContext(undefined);

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapsed = useCallback(() => setIsCollapsed((prev) => !prev), []);
  const openMobile = useCallback(() => setIsMobileOpen(true), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const value = useMemo(
    () => ({ isCollapsed, toggleCollapsed, isMobileOpen, openMobile, closeMobile }),
    [isCollapsed, toggleCollapsed, isMobileOpen, openMobile, closeMobile]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (ctx === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return ctx;
}
