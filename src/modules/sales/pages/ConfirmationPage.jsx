import { Card } from '@mui/material';
import { MdOutlineCheckCircle } from 'react-icons/md';
import SalesEmptyState from '../components/SalesEmptyState';
import SalesSectionPage from '../components/SalesSectionPage';

function ConfirmationPage() {
  return (
    <SalesSectionPage title="Confirmation" subtitle="Track confirmed deals and customer approvals.">
      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <SalesEmptyState
          title="No Confirmations Yet"
          description="Confirmed bookings and approvals will appear here."
          icon={MdOutlineCheckCircle}
        />
      </Card>
    </SalesSectionPage>
  );
}

export default ConfirmationPage;
