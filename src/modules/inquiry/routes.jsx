import { Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

import { InquiryProvider } from './contexts/InquiryContext';
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
    element: (
      <InquiryProvider>
        <Navigate to={ROUTES.INQUIRY_DASHBOARD} replace />
      </InquiryProvider>
    ),
  },
  {
    path: ROUTES.INQUIRY_DASHBOARD,
    element: (
      <InquiryProvider>
        <InquiryDashboardPage />
      </InquiryProvider>
    ),
  },
  {
    path: ROUTES.INQUIRY_MANUAL,
    element: (
      <InquiryProvider>
        <InquiryManualPage />
      </InquiryProvider>
    ),
  },
  {
    path: ROUTES.INQUIRY_MANUAL_DETAIL,
    element: (
      <InquiryProvider>
        <InquiryLeadDetailPage />
      </InquiryProvider>
    ),
  },
  {
    path: ROUTES.INQUIRY_WEBSITE,
    element: (
      <InquiryProvider>
        <InquiryBlankSubmodulePage
          title="Inquiry Engine / Website"
          subtitle="Manage website enquiry forms, web leads, and automated landing page submissions."
        />
      </InquiryProvider>
    ),
  },
  {
    path: ROUTES.INQUIRY_WHATSAPP,
    element: (
      <InquiryProvider>
        <InquiryBlankSubmodulePage
          title="Inquiry Engine / WhatsApp"
          subtitle="Manage incoming WhatsApp chat enquiries, chatbot triggers, and conversation history."
        />
      </InquiryProvider>
    ),
  },
  {
    path: ROUTES.INQUIRY_INSTAGRAM,
    element: (
      <InquiryProvider>
        <InquiryBlankSubmodulePage
          title="Inquiry Engine / Instagram & Meta Ads"
          subtitle="Track lead ad campaigns, DMs, and social media inquiry conversions."
        />
      </InquiryProvider>
    ),
  },
  {
    path: ROUTES.INQUIRY_B2B,
    element: (
      <InquiryProvider>
        <InquiryBlankSubmodulePage
          title="Inquiry Engine / B2B Partners"
          subtitle="Manage B2B agent enquiries, partner portals, and white-label requests."
        />
      </InquiryProvider>
    ),
  },
  {
    path: ROUTES.INQUIRY_REPEAT,
    element: (
      <InquiryProvider>
        <InquiryBlankSubmodulePage
          title="Inquiry Engine / Repeat Customers"
          subtitle="Track returning client enquiries, loyalty rewards, and automated follow-ups."
        />
      </InquiryProvider>
    ),
  },
];
