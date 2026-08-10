/**
 * Mock data for the dashboard module.
 * -----------------------------------------------------------------------
 * Shaped like what GET /api/dashboard/summary will eventually return.
 * The dashboard page reads from this file (never inline in the
 * component) so swapping to `dashboard.service.js` later is a
 * one-line change in DashboardPage.jsx.
 */

export const MOCK_DASHBOARD_STATS = [
  { id: 'open_inquiries', label: 'Open inquiries', value: 42, trend: { direction: 'up', value: '+8%' } },
  { id: 'active_deals', label: 'Active deals', value: 128, trend: { direction: 'up', value: '+12%' } },
  { id: 'revenue_mtd', label: 'Revenue (MTD)', value: 4820000, isCurrency: true, trend: { direction: 'up', value: '+5%' } },
  { id: 'overdue_invoices', label: 'Overdue invoices', value: 6, trend: { direction: 'down', value: '-2%' } },
];

export const MOCK_PIPELINE_TREND = [
  { month: 'Feb', inquiries: 38, bookings: 21 },
  { month: 'Mar', inquiries: 45, bookings: 26 },
  { month: 'Apr', inquiries: 40, bookings: 24 },
  { month: 'May', inquiries: 52, bookings: 31 },
  { month: 'Jun', inquiries: 61, bookings: 35 },
  { month: 'Jul', inquiries: 58, bookings: 40 },
];

export const MOCK_RECENT_ACTIVITY = [
  { id: 'act_1', label: 'New inquiry — Bali Honeymoon Package', status: 'new', timestamp: '2026-07-28T09:12:00Z' },
  { id: 'act_2', label: 'Invoice #INV-2291 paid', status: 'paid', timestamp: '2026-07-27T15:40:00Z' },
  { id: 'act_3', label: 'Kerala Backwaters itinerary awaiting approval', status: 'pending', timestamp: '2026-07-25T11:05:00Z' },
  { id: 'act_4', label: 'Deal closed — Rajasthan Heritage Tour', status: 'confirmed', timestamp: '2026-07-24T08:30:00Z' },
  { id: 'act_5', label: 'Booking cancelled — Goa Weekend Getaway', status: 'cancelled', timestamp: '2026-07-22T18:00:00Z' },
];
