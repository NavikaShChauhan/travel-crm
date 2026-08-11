import { useMemo } from 'react';
import {
  MOCK_SALES_KPIS,
  MOCK_PIPELINE_STAGES,
  MOCK_RECENT_ACTIVITIES,
  MOCK_UPCOMING_FOLLOWUPS,
  MOCK_TOP_EXECUTIVES,
  MOCK_LEAD_SOURCES,
  MOCK_MONTHLY_REVENUE,
} from '../data/sales.mock';
import { useInquiry } from '@modules/inquiry/contexts/InquiryContext';

export function useSalesDashboard() {
  const inquiryContext = useInquiry();
  const liveLeads = inquiryContext ? inquiryContext.leads : [];
  const updateLead = inquiryContext ? inquiryContext.updateLead : () => {};

  const kpis = useMemo(() => {
    const totalLeads = liveLeads.length;
    const hotLeads = liveLeads.filter((l) => (l.priority || l.temperature) === 'Hot').length;
    const warmLeads = liveLeads.filter((l) => (l.priority || l.temperature) === 'Warm').length;
    const coldLeads = liveLeads.filter((l) => (l.priority || l.temperature) === 'Cold').length;

    return MOCK_SALES_KPIS.map((kpi) => {
      if (kpi.id === 'total_leads') return { ...kpi, value: totalLeads };
      if (kpi.id === 'hot_leads') return { ...kpi, value: hotLeads };
      if (kpi.id === 'warm_leads') return { ...kpi, value: warmLeads };
      if (kpi.id === 'cold_leads') return { ...kpi, value: coldLeads };
      return kpi;
    });
  }, [liveLeads]);

  const pipelineStages = useMemo(() => MOCK_PIPELINE_STAGES, []);
  const recentActivities = useMemo(() => MOCK_RECENT_ACTIVITIES, []);
  const upcomingFollowUps = useMemo(() => MOCK_UPCOMING_FOLLOWUPS, []);
  const topExecutives = useMemo(() => MOCK_TOP_EXECUTIVES, []);
  const leadSources = useMemo(() => MOCK_LEAD_SOURCES, []);
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
    leads: liveLeads,
    updateLead,
    deleteLead: () => {},
    monthlyRevenue,
    revenueSummary,
  };
}
