/**
 * Mock notification feed, shaped like what GET /api/notifications will
 * eventually return. Remove once the notifications module is wired up.
 */
export const MOCK_NOTIFICATIONS = [
  {
    id: 'ntf_001',
    title: 'New inquiry assigned',
    message: 'A Bali honeymoon inquiry was assigned to you.',
    read: false,
    createdAt: '2026-07-28T09:12:00Z',
  },
  {
    id: 'ntf_002',
    title: 'Payment received',
    message: 'Invoice #INV-2291 was marked as paid.',
    read: false,
    createdAt: '2026-07-27T15:40:00Z',
  },
  {
    id: 'ntf_003',
    title: 'Itinerary approval needed',
    message: 'Kerala Backwaters itinerary is awaiting your sign-off.',
    read: true,
    createdAt: '2026-07-25T11:05:00Z',
  },
];
