import { Breadcrumbs as MuiBreadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';

import { ROUTE_LABELS } from '@constants/navigation';
import { ROUTES } from '@constants/routes';

/**
 * Breadcrumbs
 * Derives its trail from the current URL + the shared ROUTE_LABELS map
 * (see constants/navigation.js), so every module gets breadcrumbs for
 * free just by registering a route there — no per-page wiring needed.
 */
function Breadcrumbs() {
  const { pathname } = useLocation();
  const currentLabel = ROUTE_LABELS[pathname] || 'Overview';

  return (
    <MuiBreadcrumbs
      separator={<MdChevronRight size={14} />}
      sx={{ fontSize: 13, color: 'text.secondary' }}
    >
      <MuiLink component={Link} to={ROUTES.DASHBOARD} underline="hover" color="inherit">
        Home
      </MuiLink>
      <Typography variant="caption" color="text.primary" sx={{ fontWeight: 600 }}>
        {currentLabel}
      </Typography>
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
