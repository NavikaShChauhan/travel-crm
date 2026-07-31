import { useMemo } from 'react';

export function useSalesDashboard() {
  const kpis = useMemo(() => [], []);
  const pipelineStages = useMemo(() => [], []);
  const recentActivities = useMemo(() => [], []);
  const upcomingFollowUps = useMemo(() => [], []);
  const topExecutives = useMemo(() => [], []);
  const leadSources = useMemo(() => [], []);
  const monthlyRevenue = useMemo(() => [], []);
  const revenueSummary = useMemo(
    () => ({ totalRevenue: '₹0', totalTarget: '₹0', achievementPct: 0 }),
    []
  );

  return {
    kpis,
    pipelineStages,
    recentActivities,
    upcomingFollowUps,
    topExecutives,
    leadSources,
    monthlyRevenue,
    revenueSummary,
  };
}
