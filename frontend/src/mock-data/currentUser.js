/**
 * Mock authenticated user, shaped like what GET /api/auth/me will
 * eventually return. Remove once real auth is wired up.
 */
export const MOCK_CURRENT_USER = {
  id: 'usr_001',
  name: 'Ananya Rao',
  email: 'ananya.rao@voyagecrm.com',
  role: 'Sales Manager',
  avatarUrl: null,
  permissions: ['dashboard:view', 'sales:manage', 'itinerary:manage'],
};
