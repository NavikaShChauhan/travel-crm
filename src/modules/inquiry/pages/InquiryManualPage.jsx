import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import {
  MdAdd,
  MdOutlineExplore,
  MdOutlineVisibility,
  MdSearch,
  MdRefresh,
  MdOutlineFileDownload,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useInquiry } from '../contexts/InquiryContext';
import AddLeadModal from '../components/AddLeadModal';
import EditLeadModal from '../components/EditLeadModal';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

const SALES_USERS = ['Priya Nair', 'Neha Gupta', 'Rahul Sharma', 'Ananya Roy'];
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

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedSalesUser, setSelectedSalesUser] = useState('');
  const [selectedOpsUser, setSelectedOpsUser] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(leads.map((l) => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Handle select single row
  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Assign user actions
  const handleAssignSales = () => {
    if (selectedIds.length === 0 || !selectedSalesUser) return;
    assignUsers(selectedIds, { salesUser: selectedSalesUser });
    setSelectedSalesUser('');
  };

  const handleAssignOps = () => {
    if (selectedIds.length === 0 || !selectedOpsUser) return;
    assignUsers(selectedIds, { opsUser: selectedOpsUser });
    setSelectedOpsUser('');
  };

  // Filter leads by priority & search query
  const filteredLeads = leads.filter((lead) => {
    // Only manual or all leads in manual workspace
    const matchesPriority =
      priorityFilter === 'All' ||
      (priorityFilter === 'No Status' ? !lead.priority : lead.priority === priorityFilter);

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      lead.clientName.toLowerCase().includes(query) ||
      lead.id.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.destination.toLowerCase().includes(query);

    return matchesPriority && matchesSearch;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <AddLeadModal />
      <EditLeadModal open={isEditModalOpen} onClose={closeEditModal} lead={editingLead} />
      <LeadDetailDrawer />

      {/* Header Banner */}
      <Card
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: '16px',
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                bgcolor: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
              }}
            >
              <MdOutlineExplore size={28} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
                Inquiry Engine / Manual
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13, mt: 0.25 }}>
                Manual enquiries workspace with actionable pipeline controls.
              </Typography>
            </Box>
          </Stack>
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
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: 14,
            }}
          >
            Add Lead
          </Button>
        </Stack>
      </Card>

      {/* Control Bar: Assign Sales & Ops Users */}
      <Card
        elevation={0}
        sx={{
          p: 2,
          mb: 2.5,
          borderRadius: '12px',
          bgcolor: '#FFFFFF',
          border: '1px solid #E2E8F0',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2} sx={{ flex: 1, width: '100%' }}>
            {/* Assign Sales Users Box */}
            <Box
              sx={{
                border: '1px solid #E0F2FE',
                borderRadius: '8px',
                p: 1.25,
                bgcolor: '#F0F9FF',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: { xs: '100%', sm: 280 },
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#0284C7', fontSize: 11 }}>
                Assign Sales Users
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedSalesUser}
                  onChange={(e) => setSelectedSalesUser(e.target.value)}
                  displayEmpty
                  sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}
                >
                  <MenuItem value="" disabled>
                    Select Sales Users
                  </MenuItem>
                  {SALES_USERS.map((user) => (
                    <MenuItem key={user} value={user}>
                      {user}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleAssignSales}
                  disabled={selectedIds.length === 0 || !selectedSalesUser}
                  sx={{ bgcolor: '#FFFFFF', textTransform: 'none', fontWeight: 600, px: 2 }}
                >
                  Assign
                </Button>
              </Stack>
            </Box>

            {/* Assign Ops Users Box */}
            <Box
              sx={{
                border: '1px solid #E0F2FE',
                borderRadius: '8px',
                p: 1.25,
                bgcolor: '#F0F9FF',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: { xs: '100%', sm: 280 },
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#0284C7', fontSize: 11 }}>
                Assign Ops Users
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedOpsUser}
                  onChange={(e) => setSelectedOpsUser(e.target.value)}
                  displayEmpty
                  sx={{ bgcolor: '#FFFFFF', borderRadius: '6px' }}
                >
                  <MenuItem value="" disabled>
                    Select Ops Users
                  </MenuItem>
                  {OPS_USERS.map((user) => (
                    <MenuItem key={user} value={user}>
                      {user}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleAssignOps}
                  disabled={selectedIds.length === 0 || !selectedOpsUser}
                  sx={{ bgcolor: '#FFFFFF', textTransform: 'none', fontWeight: 600, px: 2 }}
                >
                  Assign
                </Button>
              </Stack>
            </Box>
          </Stack>

          {/* Archive & Export buttons */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: '8px',
                borderColor: '#CBD5E1',
                color: '#475569',
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                py: 0.75,
              }}
            >
              Archive (0)
            </Button>
            <IconButton sx={{ border: '1px solid #CBD5E1', borderRadius: '8px', color: '#475569', p: 0.75 }}>
              <MdRefresh size={20} />
            </IconButton>
            <IconButton sx={{ border: '1px solid #CBD5E1', borderRadius: '8px', color: '#475569', p: 0.75 }}>
              <MdOutlineFileDownload size={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Card>

      {/* Priority Filter Bar & Search */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2.5 }}
      >
        {/* Priority Tabs */}
        <Stack direction="row" spacing={2} sx={{ borderBottom: '2px solid #E2E8F0', pb: 0.5 }}>
          {[
            { label: 'All', color: '#64748B' },
            { label: 'Hot', color: '#EF4444' },
            { label: 'Warm', color: '#F59E0B' },
            { label: 'Cold', color: '#3B82F6' },
            { label: 'No Status', color: '#0F172A' },
          ].map((tab) => {
            const isSelected = priorityFilter === tab.label;
            return (
              <Box
                key={tab.label}
                onClick={() => setPriorityFilter(tab.label)}
                sx={{
                  cursor: 'pointer',
                  pb: 1,
                  borderBottom: isSelected ? `3px solid ${tab.color}` : '3px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? tab.color : '#64748B',
                    fontSize: 13,
                  }}
                >
                  {tab.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Search Bar */}
        <TextField
          placeholder="Search by name, lead id, contact"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch size={20} style={{ color: '#94A3B8' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: '100%', sm: 300 },
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
        <Table sx={{ minWidth: 900 }}>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedIds.length > 0 && selectedIds.length < leads.length
                  }
                  checked={leads.length > 0 && selectedIds.length === leads.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>VIEW</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>DATE/TIME</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>NAME/NUMBER/EMAIL</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>PAX</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>DESCRIPTION</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>TRAVEL DATE</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>DESTINATION</TableCell>
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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectRow(lead.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => openDrawer(lead.id)}
                        sx={{ color: '#64748B' }}
                      >
                        <MdOutlineVisibility size={18} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: '#1E293B',
                            cursor: 'pointer',
                            '&:hover': { color: '#2563EB' },
                          }}
                          onClick={() => navigate(`/inquiry/manual/${encodeURIComponent(lead.id)}`)}
                        >
                          {lead.id}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#2563EB',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            display: 'block',
                            mt: 0.25,
                          }}
                          onClick={() => navigate(`/inquiry/manual/${encodeURIComponent(lead.id)}`)}
                        >
                          Open Profile Page
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#475569', fontSize: 12.5 }}>
                        {lead.date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>
                          {lead.clientName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                          {lead.phone}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                          {lead.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {lead.pax}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 220 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#475569',
                          fontSize: 12,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {lead.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#475569', fontSize: 12 }}>
                        {lead.travelStart}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#475569', fontSize: 12 }}>
                        {lead.travelEnd}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                        {lead.destination}
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
