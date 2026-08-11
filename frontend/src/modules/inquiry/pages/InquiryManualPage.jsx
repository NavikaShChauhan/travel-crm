import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  MenuItem,
  Stack,
  Alert,
  IconButton,
  Tooltip,
  Popover,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  MdAdd,
  MdSearch,
  MdOutlineAssignmentInd,
  MdOutlineCloudDownload,
  MdCheckCircle,
  MdCall,
  MdChat,
  MdOutlineVisibility,
  MdFilterList,
  MdSort,
} from 'react-icons/md';

import { useInquiry } from '../contexts/InquiryContext';
import AddLeadModal from '../components/AddLeadModal';
import EditLeadModal from '../components/EditLeadModal';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

const SALES_USERS = ['Priya Nair', 'Neha Gupta', 'Rahul Sharma', 'Ananya Roy', 'Priya Sharma', 'Arjun Nair'];
const OPS_USERS = ['Amit Kumar', 'Vikram Singh', 'Sonia Verma'];

const CURRENT_LOGGED_IN_USER = 'Priya Nair'; // Simulated active logged in executive

export default function InquiryManualPage() {
  const {
    leads,
    openAddModal,
    openDrawer,
    assignUsers,
    isEditModalOpen,
    closeEditModal,
    editingLead,
  } = useInquiry();

  // State Management
  const [activeTab, setActiveTab] = useState('All Leads'); // 'All Leads', 'My Leads', 'New', 'Follow-up', 'Quotation', '🔥 Hot', 'Overdue'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Next Follow-up'); // 'Next Follow-up', 'Newest', 'Recently Updated', 'Priority', 'Travel Date', 'Estimated Value'

  // Filter Popover state
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterStage, setFilterStage] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterSource, setFilterSource] = useState('All');
  const [filterExecutive, setFilterExecutive] = useState('All');

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkSalesUser, setBulkSalesUser] = useState('');
  const [bulkOpsUser, setBulkOpsUser] = useState('');
  const [assignmentSuccessMessage, setAssignmentSuccessMessage] = useState('');

  // Top KPI Summary Cards
  const kpiData = useMemo(() => {
    const total = leads.length;
    const hot = leads.filter((l) => (l.priority || l.temperature) === 'Hot').length;
    const followups = leads.filter((l) => l.nextFollowupDate || l.lastContactDate).length || 3;
    const unassigned = leads.filter((l) => !l.assignedSalesUser && !l.salesExecutive).length;

    return { total, hot, followups, unassigned };
  }, [leads]);

  // Tab Filtering & Search Logic
  const filteredLeads = useMemo(() => {
    let list = leads.filter((lead) => {
      // Main Tab Filter
      if (activeTab === 'My Leads') {
        const exec = lead.assignedSalesUser || lead.salesExecutive;
        if (exec !== CURRENT_LOGGED_IN_USER) return false;
      } else if (activeTab === 'New') {
        const stage = lead.leadStage || lead.stage || lead.status;
        if (stage !== 'New' && stage !== 'New Lead') return false;
      } else if (activeTab === 'Follow-up') {
        const stage = lead.leadStage || lead.stage || lead.status;
        if (stage !== 'Follow-up' && stage !== 'Contacted') return false;
      } else if (activeTab === 'Quotation') {
        const stage = lead.leadStage || lead.stage || lead.status;
        if (stage !== 'Quotation Sent' && stage !== 'Proposal Sent') return false;
      } else if (activeTab === '🔥 Hot') {
        const priority = lead.priority || lead.temperature;
        if (priority !== 'Hot') return false;
      } else if (activeTab === 'Overdue') {
        if (!lead.nextFollowupDate || new Date(lead.nextFollowupDate) >= new Date()) return false;
      }

      // Advanced Filters Popover
      if (filterStage !== 'All' && (lead.leadStage || lead.stage || lead.status) !== filterStage) {
        return false;
      }
      if (filterPriority !== 'All' && (lead.priority || lead.temperature) !== filterPriority) {
        return false;
      }
      if (filterSource !== 'All' && (lead.source || lead.leadSource) !== filterSource) {
        return false;
      }
      if (filterExecutive !== 'All' && (lead.assignedSalesUser || lead.salesExecutive) !== filterExecutive) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const clientName = (lead.clientName || lead.name || '').toLowerCase();
        const phone = (lead.phone || lead.contactPhone || '').toLowerCase();
        const dest = (lead.destination || '').toLowerCase();
        const purpose = (lead.travelPurpose || lead.inquiryType || lead.requirement || '').toLowerCase();
        const id = (lead.id || '').toLowerCase();

        return (
          id.includes(q) ||
          clientName.includes(q) ||
          phone.includes(q) ||
          dest.includes(q) ||
          purpose.includes(q)
        );
      }

      return true;
    });

    // Sorting Logic
    list.sort((a, b) => {
      if (sortBy === 'Next Follow-up') {
        const dateA = a.nextFollowupDate ? new Date(a.nextFollowupDate).getTime() : 9999999999999;
        const dateB = b.nextFollowupDate ? new Date(b.nextFollowupDate).getTime() : 9999999999999;
        return dateA - dateB;
      } else if (sortBy === 'Newest') {
        const dateA = a.registrationDate ? new Date(a.registrationDate).getTime() : 0;
        const dateB = b.registrationDate ? new Date(b.registrationDate).getTime() : 0;
        return dateB - dateA;
      } else if (sortBy === 'Priority') {
        const prioMap = { Hot: 3, Warm: 2, Cold: 1 };
        const prioA = prioMap[a.priority || a.temperature] || 0;
        const prioB = prioMap[b.priority || b.temperature] || 0;
        return prioB - prioA;
      } else if (sortBy === 'Travel Date') {
        const dateA = a.travelStart ? new Date(a.travelStart).getTime() : 9999999999999;
        const dateB = b.travelStart ? new Date(b.travelStart).getTime() : 9999999999999;
        return dateA - dateB;
      } else if (sortBy === 'Estimated Value') {
        const valA = Number(a.estimatedDealValue) || 0;
        const valB = Number(b.estimatedDealValue) || 0;
        return valB - valA;
      }
      return 0;
    });

    return list;
  }, [leads, activeTab, searchQuery, sortBy, filterStage, filterPriority, filterSource, filterExecutive]);

  // Checkbox Selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredLeads.map((l) => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk User Assignment Handler
  const handleAssignBulk = () => {
    if (selectedIds.length === 0) return;
    if (!bulkSalesUser && !bulkOpsUser) return;

    assignUsers(selectedIds, { salesUser: bulkSalesUser, opsUser: bulkOpsUser });

    const text = [bulkSalesUser && `Sales: ${bulkSalesUser}`, bulkOpsUser && `Ops: ${bulkOpsUser}`]
      .filter(Boolean)
      .join(', ');

    setAssignmentSuccessMessage(`Successfully assigned ${selectedIds.length} lead(s) -> ${text}`);
    setSelectedIds([]);
    setBulkSalesUser('');
    setBulkOpsUser('');

    setTimeout(() => {
      setAssignmentSuccessMessage('');
    }, 4000);
  };

  // Export CSV Handler
  const handleExportEnquiries = () => {
    const headers = [
      'Lead ID',
      'Customer Name',
      'Mobile Number',
      'Email',
      'Destination',
      'Departure City',
      'Departure Date',
      'Pax',
      'Budget',
      'Assigned Sales Executive',
      'Lead Status',
      'Lead Stage',
      'Priority',
      'Lead Source',
      'Next Follow-up Date',
    ];

    const rows = filteredLeads.map((l) => [
      l.id || '',
      `"${(l.clientName || l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || l.contactPhone || '').replace(/"/g, '""')}"`,
      `"${(l.email || l.contactEmail || '').replace(/"/g, '""')}"`,
      `"${(l.destination || '').replace(/"/g, '""')}"`,
      `"${(l.departureCity || '').replace(/"/g, '""')}"`,
      `"${(l.travelStart || l.departureDate || '').replace(/"/g, '""')}"`,
      l.pax || l.totalPax || 1,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.assignedSalesUser || l.salesExecutive || '').replace(/"/g, '""')}"`,
      `"${(l.leadStatus || l.status || '').replace(/"/g, '""')}"`,
      `"${(l.leadStage || l.stage || '').replace(/"/g, '""')}"`,
      `"${(l.priority || l.temperature || '').replace(/"/g, '""')}"`,
      `"${(l.source || l.leadSource || '').replace(/"/g, '""')}"`,
      `"${(l.nextFollowupDate || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_workspace_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ pb: 5 }}>
      <AddLeadModal />
      <EditLeadModal open={isEditModalOpen} onClose={closeEditModal} lead={editingLead} />
      <LeadDetailDrawer />

      {/* Success Notification Alert */}
      {assignmentSuccessMessage && (
        <Alert
          icon={<MdCheckCircle size={20} />}
          severity="success"
          onClose={() => setAssignmentSuccessMessage('')}
          sx={{ mb: 2.5, borderRadius: '10px', fontWeight: 700 }}
        >
          {assignmentSuccessMessage}
        </Alert>
      )}

      {/* 1. Header Title & Actions */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
            Lead Workspace
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13, mt: 0.25 }}>
            Manage leads, follow-ups, assignments and customer requirements.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={handleExportEnquiries}
            startIcon={<MdOutlineCloudDownload size={18} />}
            sx={{
              borderColor: '#CBD5E1',
              color: '#334155',
              bgcolor: '#FFFFFF',
              borderRadius: '8px',
              px: 2,
              py: 0.75,
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#F8FAFC', borderColor: '#94A3B8' },
            }}
          >
            Export
          </Button>

          <Button
            variant="contained"
            disableElevation
            startIcon={<MdAdd size={18} />}
            onClick={openAddModal}
            sx={{
              background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' },
              borderRadius: '8px',
              px: 2.5,
              py: 0.75,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: 14,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
            }}
          >
            + Add Lead
          </Button>
        </Stack>
      </Stack>

      {/* 2. Simplified Top KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.25, borderRadius: '14px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>
              TOTAL LEADS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5, fontSize: 28 }}>
              {kpiData.total}
            </Typography>
            <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700, fontSize: 12 }}>
              Active in pipeline
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.25, borderRadius: '14px', border: '1px solid #FBCFE8', bgcolor: '#FFF5F8' }}>
            <Typography variant="caption" sx={{ color: '#BE185D', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>
              🔥 HOT LEADS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#9D174D', my: 0.5, fontSize: 28 }}>
              {kpiData.hot}
            </Typography>
            <Typography variant="caption" sx={{ color: '#BE185D', fontWeight: 700, fontSize: 12 }}>
              Need urgent action
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.25, borderRadius: '14px', border: '1px solid #FED7AA', bgcolor: '#FFFBEB' }}>
            <Typography variant="caption" sx={{ color: '#C2410C', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>
              📞 FOLLOW-UPS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#9A3412', my: 0.5, fontSize: 28 }}>
              {kpiData.followups}
            </Typography>
            <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 700, fontSize: 12 }}>
              Due today / scheduled
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.25, borderRadius: '14px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>
              UNASSIGNED
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#2563EB', my: 0.5, fontSize: 28 }}>
              {kpiData.unassigned}
            </Typography>
            <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 700, fontSize: 12 }}>
              Need allocation
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* 3. Streamlined Bulk User Assignment Bar */}
      <Card elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: '14px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ p: 0.75, borderRadius: '6px', bgcolor: '#EFF6FF', color: '#2563EB' }}>
                <MdOutlineAssignmentInd size={20} />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                Bulk Assignment
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
              Select lead checkboxes below to assign executives.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Select Sales Executive"
              value={bulkSalesUser}
              onChange={(e) => setBulkSalesUser(e.target.value)}
              sx={{ bgcolor: '#FFFFFF' }}
            >
              {SALES_USERS.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Select Ops Executive"
              value={bulkOpsUser}
              onChange={(e) => setBulkOpsUser(e.target.value)}
              sx={{ bgcolor: '#FFFFFF' }}
            >
              {OPS_USERS.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleAssignBulk}
              disabled={selectedIds.length === 0 || (!bulkSalesUser && !bulkOpsUser)}
              sx={{
                bgcolor: selectedIds.length > 0 && (bulkSalesUser || bulkOpsUser) ? '#2563EB !important' : '#F8FAFC !important',
                color: selectedIds.length > 0 && (bulkSalesUser || bulkOpsUser) ? '#FFFFFF !important' : '#475569 !important',
                borderColor: selectedIds.length > 0 && (bulkSalesUser || bulkOpsUser) ? '#2563EB !important' : '#CBD5E1 !important',
                '&:hover': {
                  bgcolor: selectedIds.length > 0 && (bulkSalesUser || bulkOpsUser) ? '#1D4ED8 !important' : '#F1F5F9 !important',
                },
                '&.Mui-disabled': {
                  bgcolor: '#F8FAFC !important',
                  color: '#475569 !important',
                  borderColor: '#CBD5E1 !important',
                },
                borderRadius: '8px',
                py: 1,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: 14,
              }}
            >
              Apply Assignment ({selectedIds.length})
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* 4. Search, Filter & Sorting Bar */}
      <Card elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: '14px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
          {/* Search Box */}
          <TextField
            placeholder="Search leads by name, phone, ID or destination..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={20} color="#64748B" />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: '100%', md: 360 },
              bgcolor: '#F8FAFC',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': { borderRadius: '8px' },
            }}
          />

          {/* Right Action Controls: Filters & Sorting */}
          <Stack direction="row" spacing={1.5} alignItems="center" width={{ xs: '100%', md: 'auto' }}>
            {/* Filters Button */}
            <Button
              variant="outlined"
              size="small"
              startIcon={<MdFilterList size={18} />}
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
              sx={{
                borderColor: filterStage !== 'All' || filterPriority !== 'All' || filterSource !== 'All' ? '#2563EB' : '#CBD5E1',
                color: filterStage !== 'All' || filterPriority !== 'All' || filterSource !== 'All' ? '#2563EB' : '#475569',
                bgcolor: '#FFFFFF',
                borderRadius: '8px',
                px: 2,
                py: 0.75,
                fontWeight: 700,
                textTransform: 'none',
              }}
            >
              Filters {filterStage !== 'All' || filterPriority !== 'All' || filterSource !== 'All' ? '• Active' : ''} ▾
            </Button>

            {/* Advanced Filters Popover Menu */}
            <Popover
              open={Boolean(filterAnchorEl)}
              anchorEl={filterAnchorEl}
              onClose={() => setFilterAnchorEl(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              PaperProps={{ sx: { p: 2.5, width: 280, borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' } }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, color: '#0F172A' }}>
                Filter Leads
              </Typography>
              <Stack spacing={2}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Stage</InputLabel>
                  <Select value={filterStage} label="Stage" onChange={(e) => setFilterStage(e.target.value)}>
                    <MenuItem value="All">All Stages</MenuItem>
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Contacted">Contacted</MenuItem>
                    <MenuItem value="Quotation Sent">Quotation Sent</MenuItem>
                    <MenuItem value="Negotiation">Negotiation</MenuItem>
                    <MenuItem value="Won">Won</MenuItem>
                    <MenuItem value="Lost">Lost</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select value={filterPriority} label="Priority" onChange={(e) => setFilterPriority(e.target.value)}>
                    <MenuItem value="All">All Priorities</MenuItem>
                    <MenuItem value="Hot">🔥 Hot</MenuItem>
                    <MenuItem value="Warm">🟠 Warm</MenuItem>
                    <MenuItem value="Cold">🔵 Cold</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" fullWidth>
                  <InputLabel>Executive</InputLabel>
                  <Select value={filterExecutive} label="Executive" onChange={(e) => setFilterExecutive(e.target.value)}>
                    <MenuItem value="All">All Executives</MenuItem>
                    {SALES_USERS.map((usr) => (
                      <MenuItem key={usr} value={usr}>{usr}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  size="small"
                  variant="text"
                  onClick={() => {
                    setFilterStage('All');
                    setFilterPriority('All');
                    setFilterSource('All');
                    setFilterExecutive('All');
                    setFilterAnchorEl(null);
                  }}
                  sx={{ color: '#EF4444', fontWeight: 700, textTransform: 'none' }}
                >
                  Reset All Filters
                </Button>
              </Stack>
            </Popover>

            {/* Sorting Dropdown */}
            <FormControl size="small" sx={{ minWidth: 170 }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<MdSort style={{ marginRight: 6, color: '#2563EB' }} />}
                sx={{
                  borderRadius: '8px',
                  bgcolor: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#1E293B',
                  '& .MuiSelect-select': { py: 0.75 },
                }}
              >
                <MenuItem value="Next Follow-up">Sort: Next Follow-up</MenuItem>
                <MenuItem value="Newest">Sort: Newest</MenuItem>
                <MenuItem value="Priority">Sort: Priority</MenuItem>
                <MenuItem value="Travel Date">Sort: Travel Date</MenuItem>
                <MenuItem value="Estimated Value">Sort: Deal Value</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Card>

      {/* 5. Main Filter Tabs Bar */}
      <Stack direction="row" spacing={1} sx={{ mb: 2.5, overflowX: 'auto', pb: 0.5 }}>
        {['All Leads', 'My Leads', 'New', 'Follow-up', 'Quotation', '🔥 Hot', 'Overdue'].map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <Chip
              key={tab}
              label={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                fontWeight: isSelected ? 800 : 600,
                bgcolor: isSelected ? '#2563EB' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: isSelected ? '#2563EB' : '#E2E8F0',
                px: 1.5,
                py: 2,
                cursor: 'pointer',
                fontSize: 13,
                boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none',
                '&:hover': {
                  bgcolor: isSelected ? '#1D4ED8' : '#F1F5F9',
                },
              }}
            />
          );
        })}
      </Stack>

      {/* 6. Scannable Lead Workspace Table */}
      <TableContainer
        component={Card}
        elevation={0}
        sx={{
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        }}
      >
        <Table sx={{ minWidth: 1000 }}>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedIds.length > 0 && selectedIds.length < filteredLeads.length}
                  checked={filteredLeads.length > 0 && selectedIds.length === filteredLeads.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>LEAD</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>CUSTOMER</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>TRIP & PURPOSE</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>TRAVEL DATE</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>PRIORITY</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>STAGE</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>EXECUTIVE</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>NEXT FOLLOW-UP</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: '#475569', fontSize: 11 }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 5, color: '#94A3B8' }}>
                  No leads found matching criteria. Try resetting filters or search query.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = selectedIds.includes(lead.id);
                const priority = lead.priority || lead.temperature || 'Warm';
                const stage = lead.leadStage || lead.stage || lead.status || 'New';
                const purpose = lead.travelPurpose || lead.inquiryType || lead.requirement || 'Leisure';
                const phone = lead.phone || lead.contactPhone || '';

                return (
                  <TableRow
                    key={lead.id}
                    hover
                    selected={isSelected}
                    onClick={() => openDrawer(lead.id)}
                    sx={{
                      cursor: 'pointer',
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { bgcolor: '#F8FAFC' },
                    }}
                  >
                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={isSelected} onChange={() => handleSelectRow(lead.id)} />
                    </TableCell>

                    {/* Clickable Lead ID */}
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 800,
                          color: '#2563EB',
                          fontFamily: 'monospace',
                          fontSize: 13,
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {lead.id}
                      </Typography>
                    </TableCell>

                    {/* Customer Name & Phone */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 13.5 }}>
                        {lead.clientName || lead.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontSize: 11.5 }}>
                        {phone}
                      </Typography>
                    </TableCell>

                    {/* Trip & Purpose */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155', fontSize: 13 }}>
                        {lead.destination} • {lead.pax || lead.totalPax || 1} Pax
                      </Typography>
                      <Chip
                        label={purpose}
                        size="small"
                        sx={{ height: 18, fontSize: 10, fontWeight: 700, bgcolor: '#EFF6FF', color: '#2563EB', mt: 0.25 }}
                      />
                    </TableCell>

                    {/* Travel Date */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: 12.5 }}>
                        {lead.travelStart || lead.departureDate || 'TBD'}
                      </Typography>
                    </TableCell>

                    {/* Priority Badge */}
                    <TableCell>
                      <Chip
                        label={priority === 'Hot' ? '🔥 Hot' : priority === 'Warm' ? '🟠 Warm' : '🔵 Cold'}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: 11,
                          fontWeight: 800,
                          bgcolor: priority === 'Hot' ? '#FCE7F3' : priority === 'Warm' ? '#FEF3C7' : '#EFF6FF',
                          color: priority === 'Hot' ? '#BE185D' : priority === 'Warm' ? '#D97706' : '#2563EB',
                        }}
                      />
                    </TableCell>

                    {/* Stage Badge */}
                    <TableCell>
                      <Chip
                        label={stage}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: 11,
                          fontWeight: 700,
                          bgcolor: stage === 'Won' ? '#DCFCE7' : '#F1F5F9',
                          color: stage === 'Won' ? '#15803D' : '#334155',
                        }}
                      />
                    </TableCell>

                    {/* Executive */}
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#334155', fontSize: 12.5, fontWeight: 600 }}>
                        {lead.assignedSalesUser || lead.salesExecutive || 'Unassigned'}
                      </Typography>
                    </TableCell>

                    {/* Next Follow-up */}
                    <TableCell>
                      <Box>
                        <Chip
                          label={lead.nextFollowupDate ? 'Today 4:00 PM' : 'Scheduled'}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: 10.5,
                            fontWeight: 800,
                            bgcolor: priority === 'Hot' ? '#FEE2E2' : '#FEF3C7',
                            color: priority === 'Hot' ? '#991B1B' : '#92400E',
                          }}
                        />
                      </Box>
                    </TableCell>

                    {/* Row Quick Actions */}
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end" alignItems="center">
                        {phone && (
                          <Tooltip title={`Call ${phone}`}>
                            <IconButton
                              size="small"
                              component="a"
                              href={`tel:${phone}`}
                              sx={{ bgcolor: '#DCFCE7', color: '#15803D', '&:hover': { bgcolor: '#BBF7D0' } }}
                            >
                              <MdCall size={16} />
                            </IconButton>
                          </Tooltip>
                        )}

                        {phone && (
                          <Tooltip title="Send WhatsApp">
                            <IconButton
                              size="small"
                              component="a"
                              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              sx={{ bgcolor: '#DCFCE7', color: '#15803D', '&:hover': { bgcolor: '#BBF7D0' } }}
                            >
                              <MdChat size={16} />
                            </IconButton>
                          </Tooltip>
                        )}

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
                            py: 0.5,
                          }}
                        >
                          View
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
