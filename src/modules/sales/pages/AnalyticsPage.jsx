import { Card } from '@mui/material';
import { MdOutlineAssessment } from 'react-icons/md';
import SalesEmptyState from '../components/SalesEmptyState';
import SalesSectionPage from '../components/SalesSectionPage';

function AnalyticsPage() {
  return (
    <SalesSectionPage title="Analytics" subtitle="Review performance and trend insights.">
      <Card sx={{ p: { xs: 2.5, md: 3 } }}>
        <SalesEmptyState
          title="No Analytics Available"
          description="Performance charts and insights will appear here soon."
          icon={MdOutlineAssessment}
        />
      </Card>
    </SalesSectionPage>
  );
}

export default AnalyticsPage;
