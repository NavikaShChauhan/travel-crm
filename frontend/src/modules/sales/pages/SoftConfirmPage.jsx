import SalesSectionPage from '../components/SalesSectionPage';
import SalesWorkspaceHeader from '../components/SalesWorkspaceHeader';
import SoftConfirmWorkspace from '../components/SoftConfirmWorkspace';
import { SalesConfirmationProvider } from '../context/SalesConfirmationContext';

function SoftConfirmPage() {
  return (
    <SalesConfirmationProvider>
      <SalesSectionPage>
        <SalesWorkspaceHeader
          title="Soft Confirm"
          description="Manage conditionally agreed travel deals awaiting final deposit, payment verification, or document collection."
        />
        <SoftConfirmWorkspace />
      </SalesSectionPage>
    </SalesConfirmationProvider>
  );
}

export default SoftConfirmPage;
