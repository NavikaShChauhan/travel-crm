import { Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

import InquiryDashboardPage from './pages/InquiryDashboardPage';
import InquiryManualPage from './pages/InquiryManualPage';
import InquiryLeadDetailPage from './pages/InquiryLeadDetailPage';
import InquiryWebsitePage from './pages/InquiryWebsitePage';
import InquiryWhatsappPage from './pages/InquiryWhatsappPage';
import InquiryInstagramPage from './pages/InquiryInstagramPage';
import InquiryB2BPage from './pages/InquiryB2BPage';
import InquiryRepeatPage from './pages/InquiryRepeatPage';

/**
 * Route registry for the "inquiry" module.
 */
export const inquiryRoutes = [
  {
    path: ROUTES.INQUIRY,
    element: <Navigate to={ROUTES.INQUIRY_DASHBOARD} replace />,
  },
  {
    path: ROUTES.INQUIRY_DASHBOARD,
    element: <InquiryDashboardPage />,
  },
  {
    path: ROUTES.INQUIRY_MANUAL,
    element: <InquiryManualPage />,
  },
  {
    path: ROUTES.INQUIRY_MANUAL_DETAIL,
    element: <InquiryLeadDetailPage />,
  },
  {
    path: ROUTES.INQUIRY_WEBSITE,
    element: <InquiryWebsitePage />,
  },
  {
    path: ROUTES.INQUIRY_WHATSAPP,
    element: <InquiryWhatsappPage />,
  },
  {
    path: ROUTES.INQUIRY_INSTAGRAM,
    element: <InquiryInstagramPage />,
  },
  {
    path: ROUTES.INQUIRY_B2B,
    element: <InquiryB2BPage />,
  },
  {
    path: ROUTES.INQUIRY_REPEAT,
    element: <InquiryRepeatPage />,
  },
];
