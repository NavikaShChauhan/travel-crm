import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';

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
  const expandSidebar = useCallback(() => setIsCollapsed(false), []);
  const collapseSidebar = useCallback(() => setIsCollapsed(true), []);
  const openMobile = useCallback(() => setIsMobileOpen(true), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const value = useMemo(
    () => ({ isCollapsed, toggleCollapsed, expandSidebar, collapseSidebar, isMobileOpen, openMobile, closeMobile }),
    [isCollapsed, toggleCollapsed, expandSidebar, collapseSidebar, isMobileOpen, openMobile, closeMobile]
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
