/**
 * Central route path registry.
 * Import these instead of hardcoding path strings anywhere in the app —
 * that's what keeps <Link>/navigate() calls safe when a path changes.
 */
export const ROUTES = {
  DASHBOARD: '/dashboard',
  INQUIRY: '/inquiry',
  INQUIRY_DASHBOARD: '/inquiry/dashboard',
  INQUIRY_MANUAL: '/inquiry/manual',
  INQUIRY_MANUAL_DETAIL: '/inquiry/manual/:id',
  INQUIRY_WEBSITE: '/inquiry/website',
  INQUIRY_WHATSAPP: '/inquiry/whatsapp',
  INQUIRY_INSTAGRAM: '/inquiry/instagram-meta',
  INQUIRY_B2B: '/inquiry/b2b-partners',
  INQUIRY_REPEAT: '/inquiry/repeat-customers',
  SALES: '/sales',
  ITINERARY: '/itinerary',
  OPERATIONS: '/operations',
  FINANCE: '/finance',
  SUPPLIERS: '/suppliers',
  CUSTOMERS: '/customers',
  PARTNERS: '/partners',
  REPORTS: '/reports',
  WORKFLOW: '/workflow',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  LOGIN: '/login',
};
