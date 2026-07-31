/**
 * sales.mock.js
 * -----------------------------------------------------------------------
 * Mock data for the Sales Dashboard module.
 * Shaped like what GET /api/sales/dashboard will eventually return.
 * All data is consumed via `hooks/useSalesDashboard.js` — never
 * imported directly inside a component.
 *
 * Until the Express + MongoDB backend exists, module pages/components
 * read from here via the hook. When the backend is ready, swap
 * `services/sales.service.js` in the hook — no component code changes.
 *
 * Data reflects a realistic Indian travel agency context.
 */

// ─── KPI Cards ──────────────────────────────────────────────────────────────

export const MOCK_SALES_KPIS = [
  {
    id: 'total_leads',
    label: 'Total Leads',
    value: 284,
    trend: { direction: 'up', value: '+14%' },
    accentKey: 'navy',
  },
  {
    id: 'hot_leads',
    label: 'Hot Leads',
    value: 47,
    trend: { direction: 'up', value: '+8%' },
    accentKey: 'coral',
  },
  {
    id: 'warm_leads',
    label: 'Warm Leads',
    value: 93,
    trend: { direction: 'up', value: '+11%' },
    accentKey: 'gold',
  },
  {
    id: 'cold_leads',
    label: 'Cold Leads',
    value: 144,
    trend: { direction: 'down', value: '-3%' },
    accentKey: 'slate',
  },
  {
    id: 'pending_followups',
    label: 'Pending Follow Ups',
    value: 38,
    trend: { direction: 'up', value: '+5%' },
    accentKey: 'gold',
  },
  {
    id: 'proposals_sent',
    label: 'Proposals Sent',
    value: 62,
    trend: { direction: 'up', value: '+18%' },
    accentKey: 'navy',
  },
  {
    id: 'negotiation',
    label: 'Negotiation',
    value: 21,
    trend: { direction: 'up', value: '+7%' },
    accentKey: 'teal',
  },
  {
    id: 'confirmed_bookings',
    label: 'Confirmed Bookings',
    value: 34,
    trend: { direction: 'up', value: '+22%' },
    accentKey: 'teal',
  },
  {
    id: 'lost_leads',
    label: 'Lost Leads',
    value: 19,
    trend: { direction: 'down', value: '-6%' },
    accentKey: 'coral',
  },
];

// ─── Sales Pipeline Stages ───────────────────────────────────────────────────

export const MOCK_PIPELINE_STAGES = [
  {
    id: 'new',
    label: 'New',
    count: 72,
    value: 8640000,
    colorKey: 'slate',
  },
  {
    id: 'contacted',
    label: 'Contacted',
    count: 58,
    value: 9280000,
    colorKey: 'navy',
  },
  {
    id: 'proposal_sent',
    label: 'Proposal Sent',
    count: 45,
    value: 12375000,
    colorKey: 'blue',
  },
  {
    id: 'follow_up',
    label: 'Follow Up',
    count: 38,
    value: 7980000,
    colorKey: 'gold',
  },
  {
    id: 'negotiation',
    label: 'Negotiation',
    count: 21,
    value: 9135000,
    colorKey: 'amber',
  },
  {
    id: 'soft_confirm',
    label: 'Soft Confirm',
    count: 14,
    value: 7280000,
    colorKey: 'teal',
  },
  {
    id: 'confirmed',
    label: 'Confirmed',
    count: 34,
    value: 20740000,
    colorKey: 'green',
  },
  {
    id: 'lost',
    label: 'Lost',
    count: 19,
    value: 3610000,
    colorKey: 'coral',
  },
];

// ─── Recent Activities ────────────────────────────────────────────────────────

export const MOCK_RECENT_ACTIVITIES = [
  {
    id: 'act_001',
    type: 'new_lead',
    description: 'New inquiry — Bali Honeymoon Package (7N/8D)',
    executive: 'Priya Sharma',
    client: 'Rohan & Anjali Mehta',
    status: 'new',
    timestamp: '2026-07-30T09:15:00+05:30',
  },
  {
    id: 'act_002',
    type: 'proposal_sent',
    description: 'Proposal sent for Kerala Backwaters & Munnar Circuit',
    executive: 'Arjun Nair',
    client: 'Siddharth Verma',
    status: 'in_progress',
    timestamp: '2026-07-30T08:40:00+05:30',
  },
  {
    id: 'act_003',
    type: 'confirmed',
    description: 'Booking confirmed — Rajasthan Heritage Tour (10N/11D)',
    executive: 'Meera Pillai',
    client: 'The Khanna Family',
    status: 'confirmed',
    timestamp: '2026-07-29T17:20:00+05:30',
  },
  {
    id: 'act_004',
    type: 'followup',
    description: 'Follow-up call completed — Andaman Island Escape',
    executive: 'Karan Malhotra',
    client: 'Deepika Reddy',
    status: 'pending',
    timestamp: '2026-07-29T14:05:00+05:30',
  },
  {
    id: 'act_005',
    type: 'negotiation',
    description: 'Price negotiation in progress — Switzerland Honeymoon (12N)',
    executive: 'Priya Sharma',
    client: 'Vikram & Nisha Patel',
    status: 'in_progress',
    timestamp: '2026-07-29T11:30:00+05:30',
  },
  {
    id: 'act_006',
    type: 'confirmed',
    description: 'Booking confirmed — Ladakh Adventure Expedition (8N/9D)',
    executive: 'Arjun Nair',
    client: 'Adventure Club Mumbai',
    status: 'confirmed',
    timestamp: '2026-07-28T16:45:00+05:30',
  },
  {
    id: 'act_007',
    type: 'lost',
    description: 'Lead lost — Dubai Shopping Festival Tour (budget mismatch)',
    executive: 'Karan Malhotra',
    client: 'Ramesh Gupta',
    status: 'cancelled',
    timestamp: '2026-07-28T10:15:00+05:30',
  },
  {
    id: 'act_008',
    type: 'new_lead',
    description: 'New inquiry — European Capitals Grand Tour (15N/16D)',
    executive: 'Meera Pillai',
    client: 'Sunita & Arvind Kapoor',
    status: 'new',
    timestamp: '2026-07-27T15:55:00+05:30',
  },
];

// ─── Upcoming Follow Ups ──────────────────────────────────────────────────────

export const MOCK_UPCOMING_FOLLOWUPS = [
  {
    id: 'fu_001',
    client: 'Vikram & Nisha Patel',
    destination: 'Switzerland Honeymoon',
    executive: 'Priya Sharma',
    dueDate: '2026-07-30T11:00:00+05:30',
    priority: 'high',
    stage: 'negotiation',
    estimatedValue: 485000,
  },
  {
    id: 'fu_002',
    client: 'Deepika Reddy',
    destination: 'Andaman Island Escape',
    executive: 'Karan Malhotra',
    dueDate: '2026-07-30T14:30:00+05:30',
    priority: 'medium',
    stage: 'proposal_sent',
    estimatedValue: 120000,
  },
  {
    id: 'fu_003',
    client: 'Ravi & Lakshmi Iyer',
    destination: 'Japan Cherry Blossom Tour',
    executive: 'Arjun Nair',
    dueDate: '2026-07-31T10:00:00+05:30',
    priority: 'high',
    stage: 'soft_confirm',
    estimatedValue: 320000,
  },
  {
    id: 'fu_004',
    client: 'Saurabh Tiwari',
    destination: 'Goa Corporate Retreat',
    executive: 'Meera Pillai',
    dueDate: '2026-07-31T15:00:00+05:30',
    priority: 'medium',
    stage: 'contacted',
    estimatedValue: 750000,
  },
  {
    id: 'fu_005',
    client: 'The Agarwal Family',
    destination: 'Singapore & Malaysia Discovery',
    executive: 'Priya Sharma',
    dueDate: '2026-08-01T11:00:00+05:30',
    priority: 'low',
    stage: 'follow_up',
    estimatedValue: 195000,
  },
  {
    id: 'fu_006',
    client: 'Ananya Krishnamurthy',
    destination: 'Bali Solo Adventure',
    executive: 'Karan Malhotra',
    dueDate: '2026-08-01T16:00:00+05:30',
    priority: 'low',
    stage: 'new',
    estimatedValue: 85000,
  },
];

// ─── Top Sales Executives ────────────────────────────────────────────────────

export const MOCK_TOP_EXECUTIVES = [
  {
    id: 'exec_001',
    name: 'Priya Sharma',
    role: 'Senior Sales Executive',
    dealsClosedMtd: 12,
    revenueMtd: 2840000,
    conversionRate: 68,
    leadsAssigned: 58,
  },
  {
    id: 'exec_002',
    name: 'Arjun Nair',
    role: 'Sales Executive',
    dealsClosedMtd: 9,
    revenueMtd: 2150000,
    conversionRate: 60,
    leadsAssigned: 46,
  },
  {
    id: 'exec_003',
    name: 'Meera Pillai',
    role: 'Sales Executive',
    dealsClosedMtd: 8,
    revenueMtd: 1920000,
    conversionRate: 57,
    leadsAssigned: 42,
  },
  {
    id: 'exec_004',
    name: 'Karan Malhotra',
    role: 'Junior Sales Executive',
    dealsClosedMtd: 5,
    revenueMtd: 1180000,
    conversionRate: 45,
    leadsAssigned: 38,
  },
  {
    id: 'exec_005',
    name: 'Sneha Joshi',
    role: 'Junior Sales Executive',
    dealsClosedMtd: 4,
    revenueMtd: 870000,
    conversionRate: 40,
    leadsAssigned: 30,
  },
];

// ─── Lead Source Distribution ────────────────────────────────────────────────

export const MOCK_LEAD_SOURCES = [
  { id: 'online_search', label: 'Online Search', count: 84, percentage: 29.6 },
  { id: 'referral', label: 'Referral', count: 71, percentage: 25.0 },
  { id: 'social_media', label: 'Social Media', count: 52, percentage: 18.3 },
  { id: 'walk_in', label: 'Walk-In', count: 38, percentage: 13.4 },
  { id: 'corporate', label: 'Corporate', count: 24, percentage: 8.5 },
  { id: 'travel_expo', label: 'Travel Expo', count: 11, percentage: 3.9 },
  { id: 'other', label: 'Other', count: 4, percentage: 1.4 },
];

// ─── Monthly Revenue Summary ─────────────────────────────────────────────────

export const MOCK_MONTHLY_REVENUE = [
  { month: 'Aug', revenue: 3240000, target: 3500000 },
  { month: 'Sep', revenue: 2980000, target: 3200000 },
  { month: 'Oct', revenue: 4120000, target: 3800000 },
  { month: 'Nov', revenue: 4580000, target: 4200000 },
  { month: 'Dec', revenue: 6250000, target: 5500000 },
  { month: 'Jan', revenue: 5120000, target: 5000000 },
  { month: 'Feb', revenue: 3840000, target: 4000000 },
  { month: 'Mar', revenue: 4620000, target: 4500000 },
  { month: 'Apr', revenue: 5280000, target: 5000000 },
  { month: 'May', revenue: 4950000, target: 5000000 },
  { month: 'Jun', revenue: 5840000, target: 5500000 },
  { month: 'Jul', revenue: 4820000, target: 5200000 },
];
