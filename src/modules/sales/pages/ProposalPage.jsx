import { Card } from '@mui/material';
import { MdOutlineDescription } from 'react-icons/md';
import SalesEmptyState from '../components/SalesEmptyState';
import SalesSectionPage from '../components/SalesSectionPage';

function ProposalPage() {
  return (
    <SalesSectionPage title="Proposal" subtitle="Draft, review, and send proposals to prospects.">
      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <SalesEmptyState
          title="No Proposals Yet"
          description="Proposal drafts and sent proposals will appear here."
          icon={MdOutlineDescription}
        />
      </Card>
    </SalesSectionPage>
  );
}

export default ProposalPage;
