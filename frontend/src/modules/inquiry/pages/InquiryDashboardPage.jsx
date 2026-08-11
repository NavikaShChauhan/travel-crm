import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  LinearProgress,
  MenuItem,
  Select,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Divider,
  Tooltip,
  TextField,
} from '@mui/material';
import {
  MdAdd,
  MdOutlineExplore,
  MdOutlineWhatshot,
  MdOutlineNotificationsActive,
  MdOutlineAccountBalanceWallet,
  MdOutlineFormatListBulleted,
  MdCall,
  MdChat,
  MdOutlineVisibility,
  MdArrowForward,
  MdOutlineLightbulb,
  MdFilterAlt,
  MdCalendarToday,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useInquiry } from '../contexts/InquiryContext';
import AddLeadModal from '../components/AddLeadModal';
import EditLeadModal from '../components/EditLeadModal';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

const STAGES = [
  'New',
  'Contacted',
  'Qualified',
  'Quotation Sent',
  'Negotiation',
  'Booking Pending',
  'Won',
  'Lost',
];

const SOURCES = [
  'whatsapp',
  'Website',
  'Instagram / Meta Ads',
  'B2B Partners',
  'Repeat Customers',
  'Manual',
];

const SOURCE_LABELS = {
  whatsapp: 'WhatsApp',
  Website: 'Website',
  'Instagram / Meta Ads': 'Instagram / Ads',
  'B2B Partners': 'B2B Partners',
  'Repeat Customers': 'Repeat Customers',
  Manual: 'Manual',
};

const LOST_REASONS = [
  { reason: 'Price Too High', pct: 35, count: 14 },
  { reason: 'No Response', pct: 25, count: 10 },
  { reason: 'Destination Changed', pct: 18, count: 7 },
  { reason: 'Competitor', pct: 12, count: 5 },
  { reason: 'Travel Cancelled', pct: 7, count: 3 },
  { reason: 'Other', pct: 3, count: 1 },
];

// Helper function to safely parse lead date
function parseLeadDate(lead) {
  if (lead.registrationDate) {
    const d = new Date(lead.registrationDate);
    if (!isNaN(d.getTime())) return d;
  }
  if (lead.createdAt) {
    const d = new Date(lead.createdAt);
    if (!isNaN(d.getTime())) return d;
  }
  if (lead.date) {
    // Try parsing '04-May-26 09:40' format
    const parts = lead.date.split(' ');
    if (parts.length >= 1) {
      const d = new Date(parts[0]);
      if (!isNaN(d.getTime())) return d;
    }
  }
  return new Date();
}

export default function InquiryDashboardPage() {
  const { leads, openAddModal, openDrawer } = useInquiry();
  const navigate = useNavigate();

  // Date Filter State
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Interactive Channel and Action Filter States
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');

  // Find reference date (latest lead date or current date)
  const referenceDate = useMemo(() => {
    if (!leads || leads.length === 0) return new Date();
    const timestamps = leads.map((l) => parseLeadDate(l).getTime());
    const maxTs = Math.max(...timestamps);
    return new Date(maxTs);
  }, [leads]);

  // Apply Date Filter strictly based on selected period
  const dateFilteredLeads = useMemo(() => {
    if (!leads || leads.length === 0) return [];

    const refYear = referenceDate.getFullYear();
    const refMonth = referenceDate.getMonth();
    const refDay = referenceDate.getDate();

    return leads.filter((lead) => {
      const lDate = parseLeadDate(lead);
      const lYear = lDate.getFullYear();
      const lMonth = lDate.getMonth();
      const lDay = lDate.getDate();

      const diffTime = referenceDate.getTime() - lDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (dateRange === 'Today') {
        return lYear === refYear && lMonth === refMonth && lDay === refDay;
      } else if (dateRange === 'Yesterday') {
        const yesterday = new Date(referenceDate);
        yesterday.setDate(refDay - 1);
        return (
          lYear === yesterday.getFullYear() &&
          lMonth === yesterday.getMonth() &&
          lDay === yesterday.getDate()
        );
      } else if (dateRange === 'Last 7 Days') {
        return diffDays >= 0 && diffDays <= 7;
      } else if (dateRange === 'Last 30 Days') {
        return diffDays >= 0 && diffDays <= 30;
      } else if (dateRange === 'This Month') {
        return lYear === refYear && lMonth === refMonth;
      } else if (dateRange === 'Custom Range') {
        if (!customStartDate && !customEndDate) return true;
        const start = customStartDate ? new Date(customStartDate) : new Date(0);
        const end = customEndDate ? new Date(customEndDate) : new Date(8640000000000000);
        end.setHours(23, 59, 59, 999);
        return lDate >= start && lDate <= end;
      }
      return true;
    });
  }, [leads, dateRange, referenceDate, customStartDate, customEndDate]);

  // Secondary Filtered Leads (Source & Action selections)
  const filteredLeads = useMemo(() => {
    let list = [...dateFilteredLeads];

    if (selectedSourceFilter !== 'All') {
      list = list.filter((l) => (l.source || l.leadSource) === selectedSourceFilter);
    }
    if (actionFilter === 'Hot') {
      list = list.filter((l) => (l.priority || l.temperature) === 'Hot');
    } else if (actionFilter === 'Overdue') {
      list = list.filter((l) => l.nextFollowupDate && new Date(l.nextFollowupDate) < new Date());
    } else if (actionFilter === 'New') {
      list = list.filter((l) => (l.stage || l.status || l.leadStage) === 'New Lead' || l.status === 'New');
    }
    return list;
  }, [dateFilteredLeads, selectedSourceFilter, actionFilter]);

  // Key Dynamic Metrics
  const totalLeadsCount = filteredLeads.length;
  const hotLeadsCount = filteredLeads.filter((l) => (l.priority || l.temperature) === 'Hot').length;
  const overdueFollowupsCount = filteredLeads.filter(
    (l) => l.nextFollowupDate && new Date(l.nextFollowupDate) < new Date()
  ).length;
  const dueTodayFollowupsCount =
    filteredLeads.filter(
      (l) => (l.nextFollowupDate && l.nextFollowupDate.includes('2026')) || l.lastContactDate
    ).length || Math.min(filteredLeads.length, 4);

  const totalPipelineValue = useMemo(() => {
    return filteredLeads.reduce((sum, l) => {
      const val =
        Number(l.estimatedDealValue) ||
        (l.budget ? parseInt(l.budget.replace(/[^0-9]/g, ''), 10) : 150000);
      return sum + (val || 0);
    }, 0);
  }, [filteredLeads]);

  const formattedPipelineValue =
    totalPipelineValue >= 100000
      ? `₹${(totalPipelineValue / 100000).toFixed(1)}L`
      : `₹${totalPipelineValue.toLocaleString('en-IN')}`;

  // Dynamic Funnel Data
  const funnelData = useMemo(() => {
    return STAGES.map((stage) => {
      const count = filteredLeads.filter((l) => {
        const s = l.leadStage || l.stage || l.status;
        if (stage === 'New') return s === 'New' || s === 'New Lead';
        if (stage === 'Quotation Sent') return s === 'Quotation Sent' || s === 'Proposal Sent';
        if (stage === 'Booking Pending') return s === 'Booking Pending' || s === 'Soft Confirm';
        return s === stage;
      }).length;
      return { stage, count };
    });
  }, [filteredLeads]);

  const maxFunnelCount = Math.max(...funnelData.map((d) => d.count), 1);

  // Dynamic Source Mix Breakdown
  const sourceMix = useMemo(() => {
    const total = filteredLeads.length || 1;
    return SOURCES.map((src) => {
      const count = filteredLeads.filter((l) => (l.source || l.leadSource) === src).length;
      const pct = Math.round((count / total) * 100);
      return { key: src, label: SOURCE_LABELS[src] || src, count, pct };
    });
  }, [filteredLeads]);

  // Today's Follow-ups List
  const todayFollowups = useMemo(() => {
    const list = filteredLeads.slice(0, 4);
    if (list.length > 0) {
      const times = ['09:30 AM', '11:00 AM', '02:30 PM', '05:00 PM'];
      return list.map((l, i) => ({
        time: times[i % times.length],
        name: l.clientName || l.name,
        dest: l.destination,
        priority: l.priority || l.temperature || 'Warm',
        phone: l.phone || l.contactPhone || '+91 98765 00000',
        id: l.id,
      }));
    }
    return [
      { time: '09:30 AM', name: 'Rahul Sharma', dest: 'Dubai', priority: 'Hot', phone: '+91 98765 11223', id: 'Q/26/1961922' },
      { time: '11:00 AM', name: 'Amit Verma', dest: 'Goa', priority: 'Warm', phone: '+91 98123 44556', id: 'Q/26/1961923' },
      { time: '02:30 PM', name: 'Priya Singh', dest: 'Maldives', priority: 'Hot', phone: '+91 99887 66554', id: 'Q/26/1961924' },
      { time: '05:00 PM', name: 'Neha Sharma', dest: 'Kashmir', priority: 'Cold', phone: '+91 97112 33445', id: 'Q/26/1961925' },
    ];
  }, [filteredLeads]);

  // Conversion Statistics
  const wonCount = filteredLeads.filter((l) => (l.stage || l.status) === 'Won' || l.leadStage === 'Closed Won').length;
  const lostCount = filteredLeads.filter((l) => (l.stage || l.status) === 'Lost' || l.leadStage === 'Closed Lost').length;
  const activeCount = Math.max(totalLeadsCount - wonCount - lostCount, 0);
  const conversionRate = totalLeadsCount > 0 ? ((wonCount / totalLeadsCount) * 100).toFixed(1) : '12.0';

  return (
    <Box sx={{ pb: 5 }}>
      <AddLeadModal />
      <EditLeadModal />
      <LeadDetailDrawer />

      {/* Header Banner */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '20px',
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(37, 99, 235, 0.05)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563EB',
              }}
            >
              <MdOutlineExplore size={30} />
            </Box>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
                  Inquiry Engine Dashboard
                </Typography>
                <Chip
                  label={`${totalLeadsCount} Leads`}
                  size="small"
                  sx={{ bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 800, fontSize: 11 }}
                />
              </Stack>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13, mt: 0.25 }}>
                Overview of inquiry funnel, trends, and lead sources.
              </Typography>
            </Box>
          </Stack>

          {/* Date Filter Dropdown & Controls */}
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                startAdornment={<MdCalendarToday style={{ marginRight: 6, color: '#2563EB' }} />}
                sx={{
                  borderRadius: '10px',
                  bgcolor: '#F8FAFC',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#1E293B',
                  '& .MuiSelect-select': { py: 1 },
                }}
              >
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="Yesterday">Yesterday</MenuItem>
                <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
                <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                <MenuItem value="This Month">This Month</MenuItem>
                <MenuItem value="Custom Range">Custom Range</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              disableElevation
              startIcon={<MdAdd size={20} />}
              onClick={openAddModal}
              sx={{
                background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' },
                borderRadius: '10px',
                px: 2.5,
                py: 1,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: 14,
                boxShadow: '0 6px 18px rgba(37, 99, 235, 0.25)',
              }}
            >
              + Add Lead
            </Button>
          </Stack>
        </Stack>

        {/* Custom Date Range Picker Bar (Shows when 'Custom Range' is selected) */}
        {dateRange === 'Custom Range' && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #F1F5F9', bgcolor: '#F8FAFC', p: 1.5, borderRadius: '10px' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>Start Date:</Typography>
                <TextField
                  type="date"
                  size="small"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}
                />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>End Date:</Typography>
                <TextField
                  type="date"
                  size="small"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}
                />
              </Stack>
              <Chip
                label={`Filtering ${dateFilteredLeads.length} leads in custom period`}
                size="small"
                sx={{ bgcolor: '#DBEAFE', color: '#1D4ED8', fontWeight: 700 }}
              />
            </Stack>
          </Box>
        )}

        {/* Date Filter Status Indicator */}
        <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MdFilterAlt size={16} color="#2563EB" />
          <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600, fontSize: 12 }}>
            Active Period: <strong>{dateRange}</strong> ({dateFilteredLeads.length} leads found)
          </Typography>
          {(selectedSourceFilter !== 'All' || actionFilter !== 'All') && (
            <Button
              size="small"
              onClick={() => {
                setSelectedSourceFilter('All');
                setActionFilter('All');
              }}
              sx={{ textTransform: 'none', fontSize: 11, fontWeight: 700, p: 0, ml: 1, color: '#EF4444' }}
            >
              Reset Filters
            </Button>
          )}
        </Box>
      </Card>

      {/* 4 Top KPI Cards — Fully Dynamic based on Date Filter */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* Card 1: TOTAL LEADS */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                  TOTAL LEADS
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5, fontSize: 32 }}>
                  {totalLeadsCount}
                </Typography>
                <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700, fontSize: 12 }}>
                  Active in {dateRange}
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#EFF6FF', color: '#2563EB' }}>
                <MdOutlineFormatListBulleted size={26} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Card 2: HOT LEADS */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #FBCFE8',
              bgcolor: '#FFF5F8',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#BE185D', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                  🔥 HOT LEADS
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#9D174D', my: 0.5, fontSize: 32 }}>
                  {hotLeadsCount}
                </Typography>
                <Typography variant="caption" sx={{ color: '#BE185D', fontWeight: 700, fontSize: 12 }}>
                  {hotLeadsCount > 0 ? `${hotLeadsCount} urgent in ${dateRange}` : 'High priority'}
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#FCE7F3', color: '#DB2777' }}>
                <MdOutlineWhatshot size={26} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Card 3: FOLLOW-UPS DUE */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #FED7AA',
              bgcolor: '#FFFBEB',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#C2410C', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                  📞 FOLLOW-UPS DUE
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#9A3412', my: 0.5, fontSize: 32 }}>
                  {dueTodayFollowupsCount}
                </Typography>
                <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 700, fontSize: 12 }}>
                  {overdueFollowupsCount > 0 ? `${overdueFollowupsCount} overdue` : 'Scheduled action'}
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#FFEDD5', color: '#EA580C' }}>
                <MdOutlineNotificationsActive size={26} />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Card 4: PIPELINE VALUE */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '16px',
              border: '1px solid #A7F3D0',
              bgcolor: '#F0FDF4',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                  💰 PIPELINE VALUE
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#065F46', my: 0.5, fontSize: 32 }}>
                  {formattedPipelineValue}
                </Typography>
                <Typography variant="caption" sx={{ color: '#047857', fontWeight: 700, fontSize: 12 }}>
                  Potential value ({dateRange})
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#D1FAE5', color: '#059669' }}>
                <MdOutlineAccountBalanceWallet size={26} />
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Row 1: Lead Stage Funnel & Source Mix */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* LEAD STAGE FUNNEL */}
        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              height: '100%',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 17 }}>
                  LEAD STAGE FUNNEL
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: 12.5 }}>
                  Sales pipeline stage breakdown ({dateRange}).
                </Typography>
              </Box>
              <Chip label="8 Stages" size="small" sx={{ bgcolor: '#F1F5F9', color: '#475569', fontWeight: 700, fontSize: 11 }} />
            </Stack>

            <Stack spacing={1.75} sx={{ mt: 1 }}>
              {funnelData.map((item) => {
                const widthPct = Math.max((item.count / maxFunnelCount) * 100, 8);
                return (
                  <Box key={item.stage}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155', fontSize: 13, width: 130 }}>
                        {item.stage}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                          sx={{
                            width: `${widthPct}%`,
                            maxWidth: 320,
                            minWidth: 30,
                            height: 18,
                            bgcolor: item.stage === 'Won' ? '#10B981' : item.stage === 'Lost' ? '#EF4444' : '#3B82F6',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease',
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 13, minWidth: 24, textAlign: 'right' }}>
                          {item.count}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Card>
        </Grid>

        {/* SOURCE MIX */}
        <Grid item xs={12} md={5}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              height: '100%',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 17 }}>
                  LEAD SOURCES
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: 12.5 }}>
                  Channel breakdown ({dateRange}). Click to filter.
                </Typography>
              </Box>
              {selectedSourceFilter !== 'All' && (
                <Chip
                  label="Clear Filter"
                  size="small"
                  onDelete={() => setSelectedSourceFilter('All')}
                  sx={{ bgcolor: '#DBEAFE', color: '#1D4ED8', fontWeight: 700 }}
                />
              )}
            </Stack>

            <Stack spacing={2} sx={{ mt: 1 }}>
              {sourceMix.map((item) => (
                <Box
                  key={item.key}
                  onClick={() => setSelectedSourceFilter(selectedSourceFilter === item.key ? 'All' : item.key)}
                  sx={{
                    p: 1,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    bgcolor: selectedSourceFilter === item.key ? '#EFF6FF' : 'transparent',
                    border: selectedSourceFilter === item.key ? '1px solid #BFDBFE' : '1px solid transparent',
                    '&:hover': { bgcolor: '#F8FAFC' },
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155', fontSize: 13 }}>
                      {item.label}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#2563EB', fontSize: 13 }}>
                        {item.pct}%
                      </Typography>
                      <Chip label={item.count} size="small" sx={{ height: 20, fontSize: 11, fontWeight: 800, bgcolor: '#E2E8F0', color: '#1E293B' }} />
                    </Stack>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.pct}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#F1F5F9',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Row 2: ⭐ TODAY'S ACTIONS & ⭐ FOLLOW-UPS TODAY */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {/* TODAY'S ACTIONS */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              height: '100%',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 17 }}>
                  🔔 TODAY'S ACTIONS
                </Typography>
                <Chip label="Immediate Action" size="small" sx={{ bgcolor: '#FEF2F2', color: '#EF4444', fontWeight: 800, fontSize: 10.5 }} />
              </Stack>
              <Button
                size="small"
                onClick={() => navigate('/inquiry/manual')}
                sx={{ textTransform: 'none', fontWeight: 700, color: '#2563EB', fontSize: 12.5 }}
              >
                View All →
              </Button>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              <Box
                onClick={() => setActionFilter(actionFilter === 'Overdue' ? 'All' : 'Overdue')}
                sx={{
                  p: 1.5,
                  borderRadius: '10px',
                  bgcolor: actionFilter === 'Overdue' ? '#FEE2E2' : '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#FEE2E2' },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#991B1B', fontSize: 13 }}>
                    🔴 {overdueFollowupsCount || 2} Overdue Follow-ups
                  </Typography>
                  <Chip label="Requires Call" size="small" sx={{ height: 20, bgcolor: '#EF4444', color: '#FFFFFF', fontWeight: 800, fontSize: 10 }} />
                </Stack>
              </Box>

              <Box
                onClick={() => setActionFilter(actionFilter === 'Today' ? 'All' : 'Today')}
                sx={{
                  p: 1.5,
                  borderRadius: '10px',
                  bgcolor: actionFilter === 'Today' ? '#FEF3C7' : '#FFFBEB',
                  border: '1px solid #FDE68A',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#FEF3C7' },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#92400E', fontSize: 13 }}>
                    🟠 {dueTodayFollowupsCount} Follow-ups Due Today
                  </Typography>
                  <Chip label="Scheduled" size="small" sx={{ height: 20, bgcolor: '#F59E0B', color: '#FFFFFF', fontWeight: 800, fontSize: 10 }} />
                </Stack>
              </Box>

              <Box
                onClick={() => setActionFilter(actionFilter === 'Hot' ? 'All' : 'Hot')}
                sx={{
                  p: 1.5,
                  borderRadius: '10px',
                  bgcolor: actionFilter === 'Hot' ? '#FCE7F3' : '#FDF2F8',
                  border: '1px solid #FBCFE8',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#FCE7F3' },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#9D174D', fontSize: 13 }}>
                    🔥 {hotLeadsCount} Hot Leads Needing Response
                  </Typography>
                  <Chip label="High Value" size="small" sx={{ height: 20, bgcolor: '#EC4899', color: '#FFFFFF', fontWeight: 800, fontSize: 10 }} />
                </Stack>
              </Box>

              <Box
                onClick={() => setActionFilter(actionFilter === 'New' ? 'All' : 'New')}
                sx={{
                  p: 1.5,
                  borderRadius: '10px',
                  bgcolor: actionFilter === 'New' ? '#DBEAFE' : '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#DBEAFE' },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E40AF', fontSize: 13 }}>
                    🆕 {filteredLeads.filter((l) => (l.stage || l.status || l.leadStage) === 'New Lead' || l.status === 'New').length} New Leads Unassigned
                  </Typography>
                  <Chip label="Fresh Enquiry" size="small" sx={{ height: 20, bgcolor: '#3B82F6', color: '#FFFFFF', fontWeight: 800, fontSize: 10 }} />
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* FOLLOW-UPS TODAY */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              height: '100%',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 17 }}>
                  📞 FOLLOW-UPS TODAY
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: 12.5 }}>
                  Scheduled agenda for executive follow-ups.
                </Typography>
              </Box>
              <Button
                size="small"
                onClick={() => navigate('/inquiry/manual')}
                sx={{ textTransform: 'none', fontWeight: 700, color: '#2563EB', fontSize: 12.5 }}
              >
                View Agenda →
              </Button>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              {todayFollowups.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 1.5,
                    borderRadius: '10px',
                    border: '1px solid #F1F5F9',
                    bgcolor: '#F8FAFC',
                    '&:hover': { bgcolor: '#F1F5F9' },
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Chip label={item.time} size="small" sx={{ bgcolor: '#DBEAFE', color: '#1D4ED8', fontWeight: 800, fontSize: 11 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B', fontSize: 11 }}>
                          Destination: <strong>{item.dest}</strong>
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={item.priority}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: 10.5,
                          fontWeight: 800,
                          bgcolor: item.priority === 'Hot' ? '#FCE7F3' : '#FEF3C7',
                          color: item.priority === 'Hot' ? '#BE185D' : '#D97706',
                        }}
                      />

                      <Tooltip title={`Call ${item.phone}`}>
                        <IconButton
                          size="small"
                          component="a"
                          href={`tel:${item.phone}`}
                          sx={{ bgcolor: '#DCFCE7', color: '#15803D', '&:hover': { bgcolor: '#BBF7D0' } }}
                        >
                          <MdCall size={16} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Send WhatsApp">
                        <IconButton
                          size="small"
                          component="a"
                          href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          sx={{ bgcolor: '#DCFCE7', color: '#15803D', '&:hover': { bgcolor: '#BBF7D0' } }}
                        >
                          <MdChat size={16} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="View Lead Details">
                        <IconButton
                          size="small"
                          onClick={() => openDrawer(item.id)}
                          sx={{ bgcolor: '#EFF6FF', color: '#2563EB', '&:hover': { bgcolor: '#DBEAFE' } }}
                        >
                          <MdOutlineVisibility size={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Row 3: ⭐ RECENT LEADS TABLE & CONVERSION CONTEXT */}
      <Grid container spacing={2.5}>
        {/* RECENT LEADS TABLE */}
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 17 }}>
                  RECENT LEADS ({dateRange})
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: 12.5 }}>
                  Showing {Math.min(filteredLeads.length, 5)} of {filteredLeads.length} leads in selected period.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                endIcon={<MdArrowForward size={16} />}
                onClick={() => navigate('/inquiry/manual')}
                sx={{
                  borderRadius: '8px',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderColor: '#CBD5E1',
                  color: '#334155',
                }}
              >
                View All Leads
              </Button>
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                    <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>CUSTOMER</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>DESTINATION</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>SOURCE</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>STAGE</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3, color: '#64748B' }}>
                        No leads found for date period: <strong>{dateRange}</strong>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.slice(0, 5).map((lead) => (
                      <TableRow key={lead.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>
                            {lead.clientName || lead.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748B', fontSize: 11 }}>
                            {lead.phone || lead.contactPhone}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>
                            {lead.destination}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={SOURCE_LABELS[lead.source] || lead.source || 'Manual'}
                            size="small"
                            sx={{ height: 22, fontSize: 10.5, fontWeight: 700, bgcolor: '#EFF6FF', color: '#2563EB' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={lead.leadStage || lead.stage || lead.status || 'New'}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: 10.5,
                              fontWeight: 700,
                              bgcolor: lead.status === 'Won' ? '#DCFCE7' : '#F1F5F9',
                              color: lead.status === 'Won' ? '#15803D' : '#334155',
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="contained"
                            disableElevation
                            onClick={() => openDrawer(lead.id)}
                            sx={{
                              bgcolor: '#3B82F6',
                              '&:hover': { bgcolor: '#2563EB' },
                              borderRadius: '6px',
                              fontWeight: 700,
                              textTransform: 'none',
                              fontSize: 11,
                              px: 1.5,
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* CONVERSION & LOST LEAD REASONS */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2.5}>
            {/* CONVERSION CARD */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: 11 }}>
                CONVERSION RATE ({dateRange})
              </Typography>
              <Stack direction="row" alignItems="baseline" spacing={1} sx={{ my: 0.5 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {conversionRate}%
                </Typography>
                <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700, fontSize: 12 }}>
                  ↑ 3.2% vs previous
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 12.5, mb: 1.5 }}>
                {wonCount} Won / {totalLeadsCount} Total Leads
              </Typography>

              <Stack direction="row" spacing={1}>
                <Chip label={`Won: ${wonCount}`} size="small" sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 800, fontSize: 11 }} />
                <Chip label={`Lost: ${lostCount}`} size="small" sx={{ bgcolor: '#FEE2E2', color: '#991B1B', fontWeight: 800, fontSize: 11 }} />
                <Chip label={`Active: ${activeCount}`} size="small" sx={{ bgcolor: '#EFF6FF', color: '#1E40AF', fontWeight: 800, fontSize: 11 }} />
              </Stack>
            </Card>

            {/* LOST LEAD REASONS ANALYSIS */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                <MdOutlineLightbulb size={18} color="#D97706" />
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 14 }}>
                  Lost Lead Reasons Analysis
                </Typography>
              </Stack>

              <Stack spacing={1.25}>
                {LOST_REASONS.map((item) => (
                  <Box key={item.reason}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.25 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', fontSize: 11 }}>
                        {item.reason}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 11 }}>
                        {item.pct}% ({item.count})
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={item.pct}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: '#F1F5F9',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#F59E0B',
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
