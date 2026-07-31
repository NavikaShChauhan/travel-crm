import { Card, Box, Typography } from '@mui/material';
import { MdOutlineInfo } from 'react-icons/md';
import DataTable from '@components/tables/DataTable';
import StatusChip from '@components/ui/StatusChip';
import SalesSectionPage from '../components/SalesSectionPage';
import { formatDate } from '@utils/formatters';

function LeadsPage() {
  const leads = [];

  const columns = [
    { key: 'id', label: 'Lead ID' },
    { key: 'name', label: 'Name' },
    {
      key: 'contact',
      label: 'Contact Info',
      render: (row) => (
        <Box>
          <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
            {row.contactEmail}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {row.contactPhone}
          </Typography>
        </Box>
      ),
    },
    { key: 'source', label: 'Lead Source' },
    {
      key: 'registrationDate',
      label: 'Registration Date',
      render: (row) => formatDate(row.registrationDate),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusChip status={row.status} />,
    },
    { key: 'temperature', label: 'Temperature' },
    { key: 'salesExecutive', label: 'Sales Executive' },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      render: (row) => formatDate(row.lastUpdated),
    },
    {
      key: 'details',
      label: 'Details',
      render: () => <MdOutlineInfo size={18} color={"#64748B"} />,
    },
  ];

  return (
    <SalesSectionPage title="Leads" subtitle="Manage and review incoming opportunities.">
      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <DataTable columns={columns} rows={leads} showEmptyState={false} />
      </Card>
    </SalesSectionPage>
  );
}

export default LeadsPage;
