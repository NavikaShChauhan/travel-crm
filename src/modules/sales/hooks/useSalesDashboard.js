import { useMemo } from 'react';
import {
  MOCK_SALES_KPIS,
  MOCK_PIPELINE_STAGES,
  MOCK_RECENT_ACTIVITIES,
  MOCK_UPCOMING_FOLLOWUPS,
  MOCK_TOP_EXECUTIVES,
  MOCK_LEAD_SOURCES,
  MOCK_LEADS,
  MOCK_MONTHLY_REVENUE,
} from '../data/sales.mock';

export function useSalesDashboard() {
  const kpis = useMemo(() => MOCK_SALES_KPIS, []);
  const pipelineStages = useMemo(() => MOCK_PIPELINE_STAGES, []);
  const recentActivities = useMemo(() => MOCK_RECENT_ACTIVITIES, []);
  const upcomingFollowUps = useMemo(() => MOCK_UPCOMING_FOLLOWUPS, []);
  const topExecutives = useMemo(() => MOCK_TOP_EXECUTIVES, []);
  const leadSources = useMemo(() => MOCK_LEAD_SOURCES, []);
  const leads = useMemo(() => MOCK_LEADS, []);
  const monthlyRevenue = useMemo(() => MOCK_MONTHLY_REVENUE, []);

  const revenueSummary = useMemo(() => {
    const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
    const totalTarget = monthlyRevenue.reduce((sum, item) => sum + item.target, 0);
    const achievementPct = Math.round((totalRevenue / totalTarget) * 100);

    return {
      totalRevenue: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      totalTarget: `₹${(totalTarget / 100000).toFixed(1)}L`,
      achievementPct,
    };
  }, [monthlyRevenue]);

  return {
    kpis,
    pipelineStages,
    recentActivities,
    upcomingFollowUps,
    topExecutives,
    leadSources,
    leads,
    monthlyRevenue,
    revenueSummary,
  };
}
