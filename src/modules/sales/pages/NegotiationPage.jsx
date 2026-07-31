import { Card } from '@mui/material';
import { MdOutlineHandshake } from 'react-icons/md';
import SalesEmptyState from '../components/SalesEmptyState';
import SalesSectionPage from '../components/SalesSectionPage';

function NegotiationPage() {
  return (
    <SalesSectionPage title="Negotiation" subtitle="Review live negotiations and commercial terms.">
      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <SalesEmptyState
          title="No Negotiations Active"
          description="Negotiation details will appear here once they begin."
          icon={MdOutlineHandshake}
        />
      </Card>
    </SalesSectionPage>
  );
}

export default NegotiationPage;
