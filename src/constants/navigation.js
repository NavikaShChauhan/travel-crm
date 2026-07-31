import {
  MdSpaceDashboard,
  MdOutlineForum,
  MdOutlineTrendingUp,
  MdOutlineDashboard,
  MdOutlineGroup,
  MdOutlineDescription,
  MdOutlineSchedule,
  MdOutlineHandshake,
  MdOutlineCheckCircle,
  MdOutlineAssessment,
  MdOutlineMap,
  MdOutlineSettingsSuggest,
  MdOutlineAccountBalanceWallet,
  MdOutlineLocalShipping,
  MdOutlinePeopleAlt,
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
  {
    label: 'Sales',
    path: ROUTES.SALES,
    icon: MdOutlineTrendingUp,
    children: [
      { label: 'Dashboard', path: `${ROUTES.SALES}/dashboard`, icon: MdOutlineDashboard },
      { label: 'Leads', path: `${ROUTES.SALES}/leads`, icon: MdOutlineGroup },
      { label: 'Proposal', path: `${ROUTES.SALES}/proposal`, icon: MdOutlineDescription },
      { label: 'Follow Up', path: `${ROUTES.SALES}/follow-up`, icon: MdOutlineSchedule },
      { label: 'Negotiation', path: `${ROUTES.SALES}/negotiation`, icon: MdOutlineHandshake },
      { label: 'Confirmation', path: `${ROUTES.SALES}/confirmation`, icon: MdOutlineCheckCircle },
      { label: 'Analytics', path: `${ROUTES.SALES}/analytics`, icon: MdOutlineAssessment },
    ],
  },
  {
    label: 'Itinerary Builder',
    path: ROUTES.ITINERARY,
    icon: MdOutlineMap,
    children: [
      { label: 'Dashboard', path: `${ROUTES.ITINERARY}/dashboard`, icon: MdOutlineDashboard },
      { label: 'Create Itinerary', path: `${ROUTES.ITINERARY}/build`, icon: MdOutlineMap },
      { label: 'Saved Templates', path: `${ROUTES.ITINERARY}/templates`, icon: MdOutlineDescription },
      { label: 'Settings', path: `${ROUTES.ITINERARY}/settings`, icon: MdOutlineSettings },
      { label: 'Analytics', path: `${ROUTES.ITINERARY}/analytics`, icon: MdOutlineAssessment },
    ],
  },
  { label: 'Operations', path: ROUTES.OPERATIONS, icon: MdOutlineSettingsSuggest },
  { label: 'Finance', path: ROUTES.FINANCE, icon: MdOutlineAccountBalanceWallet },
  { label: 'Supplier Management', path: ROUTES.SUPPLIERS, icon: MdOutlineLocalShipping },
  { label: 'Customer Management', path: ROUTES.CUSTOMERS, icon: MdOutlinePeopleAlt },
  { label: 'Partner Management', path: ROUTES.PARTNERS, icon: MdOutlineHandshake },
  { label: 'Insights and Reports', path: ROUTES.REPORTS, icon: MdOutlineAssessment },
  { label: 'Workflow Automation', path: ROUTES.WORKFLOW, icon: MdOutlineAutoMode },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: MdOutlineSettings },
];

/** Flat path -> label map, used by Breadcrumbs and <title> updates. */
export const ROUTE_LABELS = NAV_ITEMS.reduce((acc, item) => {
  acc[item.path] = item.label;
  if (item.children) {
    item.children.forEach((child) => {
      acc[child.path] = child.label;
    });
  }
  return acc;
}, {
  [ROUTES.NOTIFICATIONS]: 'Notifications',
});
