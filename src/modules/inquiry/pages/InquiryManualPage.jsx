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
} from '@mui/material';
import {
  MdAdd,
  MdSearch,
  MdOutlineAssignmentInd,
  MdOutlineCloudDownload,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useInquiry } from '../contexts/InquiryContext';
import AddLeadModal from '../components/AddLeadModal';
import EditLeadModal from '../components/EditLeadModal';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

const SALES_USERS = ['Priya Nair', 'Neha Gupta', 'Rahul Sharma', 'Ananya Roy', 'Priya Sharma', 'Arjun Nair'];
const OPS_USERS = ['Amit Kumar', 'Vikram Singh', 'Sonia Verma'];

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
  const navigate = useNavigate();

  const [selectedPriorityTab, setSelectedPriorityTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkSalesUser, setBulkSalesUser] = useState('');
  const [bulkOpsUser, setBulkOpsUser] = useState('');

  // Tab counters
  const priorityCounts = useMemo(() => {
    return {
      All: leads.length,
      Hot: leads.filter((l) => (l.priority || l.temperature) === 'Hot').length,
      Warm: leads.filter((l) => (l.priority || l.temperature) === 'Warm').length,
      Cold: leads.filter((l) => (l.priority || l.temperature) === 'Cold').length,
    };
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const priority = lead.priority || lead.temperature || 'Warm';
      const matchesTab = selectedPriorityTab === 'All' || priority === selectedPriorityTab;
      const query = searchQuery.toLowerCase();
      const clientName = (lead.clientName || lead.name || '').toLowerCase();
      const phone = (lead.phone || lead.contactPhone || '').toLowerCase();
      const email = (lead.email || lead.contactEmail || '').toLowerCase();
      const dest = (lead.destination || '').toLowerCase();
      const purpose = (lead.travelPurpose || lead.inquiryType || lead.requirement || '').toLowerCase();
      const matchesSearch =
        !searchQuery ||
        lead.id.toLowerCase().includes(query) ||
        clientName.includes(query) ||
        phone.includes(query) ||
        email.includes(query) ||
        dest.includes(query) ||
        purpose.includes(query);

      return matchesTab && matchesSearch;
    });
  }, [leads, selectedPriorityTab, searchQuery]);

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

  const handleAssignBulk = () => {
    if (selectedIds.length === 0) return;
    assignUsers(selectedIds, { salesUser: bulkSalesUser, opsUser: bulkOpsUser });
    setSelectedIds([]);
    setBulkSalesUser('');
    setBulkOpsUser('');
  };

  return (
    <Box>
      <AddLeadModal />
      <EditLeadModal open={isEditModalOpen} onClose={closeEditModal} lead={editingLead} />
      <LeadDetailDrawer />

      {/* Header Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
            Inquiry Engine Manual Workspace
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13, mt: 0.25 }}>
            Manage full 7-section travel enquiries, travel purpose, and sales assignments.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<MdOutlineCloudDownload size={18} />}
            sx={{
              borderColor: '#CBD5E1',
              color: '#475569',
              bgcolor: '#FFFFFF',
              borderRadius: '8px',
              px: 2,
              py: 0.75,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Export Enquiries
          </Button>
          <Button
            variant="contained"
            disableElevation
            startIcon={<MdAdd size={18} />}
            onClick={openAddModal}
            sx={{
              bgcolor: '#3B82F6',
              '&:hover': { bgcolor: '#2563EB' },
              borderRadius: '8px',
              px: 2.5,
              py: 0.75,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: 14,
            }}
          >
            + Add Lead
          </Button>
        </Stack>
      </Stack>

      {/* Quick Summary Strip */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5 }}>
              ACTIVE ENQUIRIES
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
              {leads.length}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Showing {filteredLeads.length} filtered
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5 }}>
              HOT PRIORITY
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#EF4444', my: 0.5 }}>
              {priorityCounts.Hot}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Requires immediate action
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5 }}>
              WARM PRIORITY
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#D97706', my: 0.5 }}>
              {priorityCounts.Warm}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Follow-up scheduled
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2, borderRadius: '12px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: 0.5 }}>
              UNASSIGNED SALES
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#2563EB', my: 0.5 }}>
              {leads.filter((l) => !l.assignedSalesUser && !l.salesExecutive).length}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Ready for executive allocation
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Bulk Action & Assign Bar */}
      <Card elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: '12px', border: '1px solid #E2E8F0', bgcolor: '#FFFFFF' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ p: 0.75, borderRadius: '6px', bgcolor: '#EFF6FF', color: '#2563EB' }}>
                <MdOutlineAssignmentInd size={20} />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                Bulk User Assignment
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.25 }}>
              Select rows using checkboxes to reassign users.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Select Sales User"
              value={bulkSalesUser}
              onChange={(e) => setBulkSalesUser(e.target.value)}
              disabled={selectedIds.length === 0}
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
              label="Select Ops User"
              value={bulkOpsUser}
              onChange={(e) => setBulkOpsUser(e.target.value)}
              disabled={selectedIds.length === 0}
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
              variant="contained"
              disableElevation
              onClick={handleAssignBulk}
              disabled={selectedIds.length === 0 || (!bulkSalesUser && !bulkOpsUser)}
              sx={{
                bgcolor: '#3B82F6',
                '&:hover': { bgcolor: '#2563EB' },
                borderRadius: '8px',
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Assign to Selected ({selectedIds.length})
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Priority Tabs & Search Bar */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2 }}
      >
        {/* Tabs */}
        <Stack direction="row" spacing={1}>
          {['All', 'Hot', 'Warm', 'Cold'].map((tab) => {
            const isSelected = selectedPriorityTab === tab;
            const count = priorityCounts[tab];
            return (
              <Chip
                key={tab}
                label={`${tab} (${count})`}
                onClick={() => setSelectedPriorityTab(tab)}
                sx={{
                  fontWeight: isSelected ? 700 : 600,
                  bgcolor: isSelected ? '#3B82F6' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#475569',
                  border: '1px solid',
                  borderColor: isSelected ? '#3B82F6' : '#E2E8F0',
                  px: 1,
                  py: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: isSelected ? '#2563EB' : '#F1F5F9',
                  },
                }}
              />
            );
          })}
        </Stack>

        {/* Search */}
        <TextField
          placeholder="Search by ID, client name, phone, email, purpose..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch size={18} color="#64748B" />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: '100%', sm: 320 },
            bgcolor: '#FFFFFF',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
          }}
        />
      </Stack>

      {/* Leads Table */}
      <TableContainer
        component={Card}
        elevation={0}
        sx={{
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          bgcolor: '#FFFFFF',
        }}
      >
        <Table sx={{ minWidth: 950 }}>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedIds.length > 0 && selectedIds.length < leads.length}
                  checked={leads.length > 0 && selectedIds.length === leads.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>DATE/TIME</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>NAME/NUMBER/EMAIL</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>TYPE OF INQUIRY</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>PAX</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>TRAVEL DATE</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>DESTINATION</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>SALES EXEC</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>LAST UPDATED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4, color: '#94A3B8' }}>
                  No enquiries found matching criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = selectedIds.includes(lead.id);
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
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectRow(lead.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: '#2563EB',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {lead.id}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#0EA5E9',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'block',
                            mt: 0.25,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/inquiry/manual/${encodeURIComponent(lead.id)}`);
                          }}
                        >
                          Open Profile Page
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#475569', fontSize: 12.5 }}>
                        {lead.date || lead.registrationDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>
                          {lead.clientName || lead.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                          {lead.phone || lead.contactPhone}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                          {lead.email || lead.contactEmail}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={lead.travelPurpose || lead.inquiryType || lead.requirement || 'Leisure'}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: 11,
                          bgcolor: '#EFF6FF',
                          color: '#2563EB',
                          borderRadius: '6px',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {lead.pax || lead.totalPax || 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#475569', fontSize: 12 }}>
                        {lead.travelStart || lead.departureDate}
                      </Typography>
                      {lead.travelEnd && (
                        <Typography variant="body2" sx={{ color: '#64748B', fontSize: 11 }}>
                          to {lead.travelEnd || lead.returnDate}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {lead.destination}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#475569', fontSize: 12, fontWeight: 600 }}>
                        {lead.assignedSalesUser || lead.salesExecutive || 'Priya Nair'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748B', fontSize: 12 }}>
                        {lead.lastUpdated}
                      </Typography>
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
