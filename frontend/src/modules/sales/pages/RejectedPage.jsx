import SalesSectionPage from '../components/SalesSectionPage';
import SalesWorkspaceHeader from '../components/SalesWorkspaceHeader';
import RejectedWorkspace from '../components/RejectedWorkspace';
import { SalesConfirmationProvider } from '../context/SalesConfirmationContext';

function RejectedPage() {
  return (
    <SalesConfirmationProvider>
      <SalesSectionPage>
        <SalesWorkspaceHeader
          title="Rejected Sales"
          description="Review rejected deals, capture rejection reasons, track lost sales analytics, and analyze win/loss trends."
        />
        <RejectedWorkspace />
      </SalesSectionPage>
    </SalesConfirmationProvider>
  );
}

export default RejectedPage;
