import { Card, Box, Typography, IconButton, Button, Stack } from '@mui/material';
import { MdOutlineInfo, MdEdit, MdAdd } from 'react-icons/md';
import DataTable from '@components/tables/DataTable';
import StatusChip from '@components/ui/StatusChip';
import SalesSectionPage from '../components/SalesSectionPage';
import { formatDate } from '@utils/formatters';
import { useInquiry } from '@modules/inquiry/contexts/InquiryContext';
import EditLeadModal from '@modules/inquiry/components/EditLeadModal';
import AddLeadModal from '@modules/inquiry/components/AddLeadModal';

function LeadsPage() {
  const {
    leads,
    openAddModal,
    openDrawer,
    openEditModal,
    isEditModalOpen,
    closeEditModal,
    editingLead,
  } = useInquiry();

  const columns = [
    {
      key: 'id',
      label: 'Lead ID',
      render: (row) => (
        <Typography
          variant="body2"
          sx={{ fontWeight: 700, color: '#2563EB', cursor: 'pointer' }}
          onClick={() => openDrawer(row.id)}
        >
          {row.id}
        </Typography>
      ),
    },
    {
      key: 'name',
      label: 'Client Name',
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
          {row.clientName || row.name}
        </Typography>
      ),
    },
    {
      key: 'contact',
      label: 'Contact Info',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {row.contactPhone || row.phone}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {row.contactEmail || row.email}
          </Typography>
        </Box>
      ),
    },
    {
      key: 'destination',
      label: 'Destination',
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
          {row.destination}
        </Typography>
      ),
    },
    { key: 'source', label: 'Lead Source' },
    {
      key: 'pax',
      label: 'PAX',
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {row.pax || row.totalPax || 1}
        </Typography>
      ),
    },
    {
      key: 'status',
      label: 'Status / Stage',
      render: (row) => <StatusChip status={row.stage || row.status} />,
    },
    {
      key: 'temperature',
      label: 'Priority',
      render: (row) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: (row.priority || row.temperature) === 'Hot' ? '#EF4444' : (row.priority || row.temperature) === 'Warm' ? '#D97706' : '#2563EB',
          }}
        >
          {row.priority || row.temperature || 'Warm'}
        </Typography>
      ),
    },
    {
      key: 'salesExecutive',
      label: 'Sales Executive',
      render: (row) => row.assignedSalesUser || row.salesExecutive || 'Priya Nair',
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      render: (row) => (row.lastUpdated ? formatDate(row.lastUpdated) : 'Recently'),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={() => openEditModal(row)} sx={{ color: '#2563EB' }}>
            <MdEdit size={18} />
          </IconButton>
          <IconButton size="small" onClick={() => openDrawer(row.id)} sx={{ color: '#64748B' }}>
            <MdOutlineInfo size={18} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <SalesSectionPage title="Leads" subtitle="Manage and review incoming opportunities synced with Inquiry Engine.">
      <AddLeadModal />
      <EditLeadModal open={isEditModalOpen} onClose={closeEditModal} lead={editingLead} />

      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: 18 }}>
            All Active Sales Leads ({leads.length})
          </Typography>
          <Button
            variant="contained"
            disableElevation
            startIcon={<MdAdd size={18} />}
            onClick={openAddModal}
            sx={{ bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' }, borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
          >
            + Create Sales Lead
          </Button>
        </Stack>
        <DataTable columns={columns} rows={leads} showEmptyState={leads.length === 0} />
      </Card>
    </SalesSectionPage>
  );
}

export default LeadsPage;
