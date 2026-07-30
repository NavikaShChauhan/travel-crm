import {
  MdSpaceDashboard,
  MdOutlineForum,
  MdOutlineTrendingUp,
  MdOutlineMap,
  MdOutlineSettingsSuggest,
  MdOutlineAccountBalanceWallet,
  MdOutlineLocalShipping,
  MdOutlinePeopleAlt,
  MdOutlineHandshake,
  MdOutlineAssessment,
  MdOutlineAutoMode,
  MdOutlineSettings,
} from 'react-icons/md';
import { ROUTES } from '@constants/routes';

/**
 * Single source of truth for sidebar navigation AND breadcrumb labels.
 * Each module route reads its label from here so the two never drift
 * apart. `icon` is a component reference (react-icons), rendered by Sidebar.
 */
export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: MdSpaceDashboard },
  { label: 'Inquiry Engine', path: ROUTES.INQUIRY, icon: MdOutlineForum },
  { label: 'Sales Engine', path: ROUTES.SALES, icon: MdOutlineTrendingUp },
  { label: 'Itinerary Builder', path: ROUTES.ITINERARY, icon: MdOutlineMap },
  { label: 'Operations', path: ROUTES.OPERATIONS, icon: MdOutlineSettingsSuggest },
  { label: 'Finance', path: ROUTES.FINANCE, icon: MdOutlineAccountBalanceWallet },
  { label: 'Supplier Management', path: ROUTES.SUPPLIERS, icon: MdOutlineLocalShipping },
  { label: 'Customer Management', path: ROUTES.CUSTOMERS, icon: MdOutlinePeopleAlt },
  { label: 'Partner Management', path: ROUTES.PARTNERS, icon: MdOutlineHandshake },
  { label: 'Reports', path: ROUTES.REPORTS, icon: MdOutlineAssessment },
  { label: 'Workflow Automation', path: ROUTES.WORKFLOW, icon: MdOutlineAutoMode },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: MdOutlineSettings },
];

/** Flat path -> label map, used by Breadcrumbs and <title> updates. */
export const ROUTE_LABELS = NAV_ITEMS.reduce((acc, item) => {
  acc[item.path] = item.label;
  return acc;
}, {
  [ROUTES.NOTIFICATIONS]: 'Notifications',
});
