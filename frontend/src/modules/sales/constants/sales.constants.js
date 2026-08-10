/**
 * sales.constants.js
 * -----------------------------------------------------------------------
 * All constants for the Sales module: icon maps, color mappings, labels.
 * Centralised here so components never hardcode values.
 */

import {
  MdOutlineLeaderboard,
  MdOutlineLocalFireDepartment,
  MdOutlineWhatshot,
  MdOutlineAcUnit,
  MdOutlineSchedule,
  MdOutlineDescription,
  MdOutlineHandshake,
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlinePhone,
  MdOutlineSend,
  MdOutlineRefresh,
  MdOutlinePriceChange,
  MdOutlineFlightTakeoff,
  MdOutlineBlock,
  MdOutlinePersonAdd,
  MdOutlineAssignment,
} from 'react-icons/md';
import { tokens } from '@styles/theme';

// ─── KPI Card Icon Map ────────────────────────────────────────────────────────

/** Maps KPI `id` → react-icon component */
export const KPI_ICONS = {
  total_leads: MdOutlineLeaderboard,
  hot_leads: MdOutlineLocalFireDepartment,
  warm_leads: MdOutlineWhatshot,
  cold_leads: MdOutlineAcUnit,
  pending_followups: MdOutlineSchedule,
  proposals_sent: MdOutlineDescription,
  negotiation: MdOutlineHandshake,
  confirmed_bookings: MdOutlineCheckCircle,
  lost_leads: MdOutlineCancel,
};

// ─── KPI Accent Colors ────────────────────────────────────────────────────────

/** Maps accent key → { bg, icon } colors for KPI tiles */
export const KPI_ACCENT_COLORS = {
  navy: { bg: 'rgba(27,42,74,0.10)', icon: tokens.color.navy700 },
  coral: { bg: 'rgba(214,96,79,0.12)', icon: tokens.color.coral500 },
  gold: { bg: 'rgba(217,164,65,0.12)', icon: tokens.color.gold500 },
  teal: { bg: 'rgba(47,143,134,0.12)', icon: tokens.color.teal500 },
  slate: { bg: 'rgba(91,100,121,0.10)', icon: tokens.color.ink600 },
};

// ─── Pipeline Stage Colors ────────────────────────────────────────────────────

/** Maps pipeline stage `colorKey` → hex color for the progress bar */
export const PIPELINE_STAGE_COLORS = {
  slate: tokens.color.ink400,
  navy: tokens.color.navy700,
  blue: '#3B82F6',
  gold: tokens.color.gold500,
  amber: '#F59E0B',
  teal: tokens.color.teal500,
  green: '#22C55E',
  coral: tokens.color.coral500,
};

// ─── Activity Type Icons ──────────────────────────────────────────────────────

/** Maps activity `type` → react-icon component */
export const ACTIVITY_TYPE_ICONS = {
  new_lead: MdOutlinePersonAdd,
  proposal_sent: MdOutlineSend,
  confirmed: MdOutlineFlightTakeoff,
  followup: MdOutlineRefresh,
  negotiation: MdOutlinePriceChange,
  lost: MdOutlineBlock,
  contacted: MdOutlinePhone,
  assignment: MdOutlineAssignment,
};

/** Maps activity `type` → background / icon color */
export const ACTIVITY_TYPE_COLORS = {
  new_lead: { bg: 'rgba(34, 53, 89, 0.10)', icon: tokens.color.navy700 },
  proposal_sent: { bg: 'rgba(27,42,74,0.10)', icon: tokens.color.navy700 },
  confirmed: { bg: 'rgba(47, 143, 134, 0.12)', icon: tokens.color.teal500 },
  followup: { bg: 'rgba(217,164,65,0.12)', icon: tokens.color.gold500 },
  negotiation: { bg: 'rgba(217,164,65,0.12)', icon: tokens.color.gold500 },
  lost: { bg: 'rgba(214,96,79,0.12)', icon: tokens.color.coral500 },
  contacted: { bg: 'rgba(71, 85, 105, 0.10)', icon: tokens.color.ink600 },
  assignment: { bg: 'rgba(71, 85, 105, 0.10)', icon: tokens.color.ink600 },
};

// ─── Priority Styles ──────────────────────────────────────────────────────────

export const PRIORITY_STYLES = {
  high: { bg: 'rgba(214,96,79,0.12)', color: tokens.color.coral500, label: 'High' },
  medium: { bg: 'rgba(217,164,65,0.14)', color: tokens.color.gold600, label: 'Medium' },
  low: { bg: 'rgba(47, 143, 134, 0.12)', color: tokens.color.teal500, label: 'Low' },
};

// ─── Lead Source Chart Colors ─────────────────────────────────────────────────

export const LEAD_SOURCE_COLORS = [
  tokens.color.navy700,
  tokens.color.gold500,
  tokens.color.teal500,
  '#3B82F6',
  '#8B5CF6',
  '#F59E0B',
  tokens.color.ink400,
];

// ─── Revenue Chart Colors ─────────────────────────────────────────────────────

export const REVENUE_BAR_COLOR = tokens.color.navy700;
export const TARGET_BAR_COLOR = tokens.color.gold500;

// ─── Trend Arrow Colors ───────────────────────────────────────────────────────

export const TREND_COLORS = {
  up: tokens.color.teal500,
  down: tokens.color.coral500,
};

// ─── Welcome Messages ─────────────────────────────────────────────────────────

export const WELCOME_MESSAGES = [
  'Track your pipeline and hit your numbers.',
  'Every great journey starts with a single lead.',
  'Your deals, your destinations, your wins.',
];

// ─── Page Header ──────────────────────────────────────────────────────────────

export const SALES_PAGE_TITLE = 'Sales Engine';
export const SALES_PAGE_SUBTITLE = 'Pipeline tracking, lead management & revenue insights.';
