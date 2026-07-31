import { Card } from '@mui/material';
import { MdOutlineSchedule } from 'react-icons/md';
import SalesEmptyState from '../components/SalesEmptyState';
import SalesSectionPage from '../components/SalesSectionPage';

function FollowUpPage() {
  return (
    <SalesSectionPage title="Follow Up" subtitle="Track next actions and follow-up commitments.">
      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <SalesEmptyState
          title="No Follow Ups Scheduled"
          description="Planned follow-ups will be listed here."
          icon={MdOutlineSchedule}
        />
      </Card>
    </SalesSectionPage>
  );
}

export default FollowUpPage;
