import { Box } from '@mui/material';
import '../styles/sales.css';

/** Applies Sales-only interaction styling without changing the app shell. */
function SalesExperience({ children }) {
  return <Box className="sales-workspace">{children}</Box>;
}

export default SalesExperience;
