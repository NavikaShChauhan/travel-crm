import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '@layouts/MainLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';
import NotFoundPage from '@/routes/NotFoundPage';
import { ROUTES } from '@constants/routes';

import { dashboardRoutes } from '@modules/dashboard/routes';
import { inquiryRoutes } from '@modules/inquiry/routes';
import { salesRoutes } from '@modules/sales/routes';
import { itineraryRoutes } from '@modules/itinerary/routes';
import { operationsRoutes } from '@modules/operations/routes';
import { financeRoutes } from '@modules/finance/routes';
import { suppliersRoutes } from '@modules/suppliers/routes';
import { customersRoutes } from '@modules/customers/routes';
import { partnersRoutes } from '@modules/partners/routes';
import { reportsRoutes } from '@modules/reports/routes';
import { workflowRoutes } from '@modules/workflow/routes';
import { notificationsRoutes } from '@modules/notifications/routes';
import { settingsRoutes } from '@modules/settings/routes';

/**
 * AppRoutes
 * -----------------------------------------------------------------------
 * Each module owns and exports its own route list (see
 * `modules/<name>/routes.jsx`) so different developers can work on
 * different modules without touching a shared giant switch statement —
 * this file only *aggregates* them under the authenticated MainLayout.
 *
 * Add a new module by: (1) creating modules/<name>/routes.jsx,
 * (2) importing + spreading it into MODULE_ROUTES below.
 */
const MODULE_ROUTES = [
  ...dashboardRoutes,
  ...inquiryRoutes,
  ...salesRoutes,
  ...itineraryRoutes,
  ...operationsRoutes,
  ...financeRoutes,
  ...suppliersRoutes,
  ...customersRoutes,
  ...partnersRoutes,
  ...reportsRoutes,
  ...workflowRoutes,
  ...notificationsRoutes,
  ...settingsRoutes,
];

import { InquiryProvider } from '@modules/inquiry/contexts/InquiryContext';

function AppRoutes() {
  return (
    <InquiryProvider>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          {MODULE_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </InquiryProvider>
  );
}

export default AppRoutes;
