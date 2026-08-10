import { Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

import InquiryDashboardPage from './pages/InquiryDashboardPage';
import InquiryManualPage from './pages/InquiryManualPage';
import InquiryLeadDetailPage from './pages/InquiryLeadDetailPage';
import InquiryBlankSubmodulePage from './pages/InquiryBlankSubmodulePage';

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
    element: (
      <InquiryBlankSubmodulePage
        title="Inquiry Engine / Website"
        subtitle="Manage website enquiry forms, web leads, and automated landing page submissions."
      />
    ),
  },
  {
    path: ROUTES.INQUIRY_WHATSAPP,
    element: (
      <InquiryBlankSubmodulePage
        title="Inquiry Engine / WhatsApp"
        subtitle="Manage incoming WhatsApp chat enquiries, chatbot triggers, and conversation history."
      />
    ),
  },
  {
    path: ROUTES.INQUIRY_INSTAGRAM,
    element: (
      <InquiryBlankSubmodulePage
        title="Inquiry Engine / Instagram & Meta Ads"
        subtitle="Track lead ad campaigns, DMs, and social media inquiry conversions."
      />
    ),
  },
  {
    path: ROUTES.INQUIRY_B2B,
    element: (
      <InquiryBlankSubmodulePage
        title="Inquiry Engine / B2B Partners"
        subtitle="Manage B2B agent enquiries, partner portals, and white-label requests."
      />
    ),
  },
  {
    path: ROUTES.INQUIRY_REPEAT,
    element: (
      <InquiryBlankSubmodulePage
        title="Inquiry Engine / Repeat Customers"
        subtitle="Track returning client enquiries, loyalty rewards, and automated follow-ups."
      />
    ),
  },
];
