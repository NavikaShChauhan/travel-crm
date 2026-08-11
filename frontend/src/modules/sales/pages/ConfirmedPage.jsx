import SalesSectionPage from '../components/SalesSectionPage';
import SalesWorkspaceHeader from '../components/SalesWorkspaceHeader';
import ConfirmedWorkspace from '../components/ConfirmedWorkspace';
import { SalesConfirmationProvider } from '../context/SalesConfirmationContext';

function ConfirmedPage() {
  return (
    <SalesConfirmationProvider>
      <SalesSectionPage>
        <SalesWorkspaceHeader
          title="Confirmed Bookings"
          description="View confirmed bookings with auto-generated Booking IDs, linked Itinerary IDs, and seamless Operations handover."
        />
        <ConfirmedWorkspace />
      </SalesSectionPage>
    </SalesConfirmationProvider>
  );
}

export default ConfirmedPage;
