/**
 * TopSalesExecutives.jsx
 * -----------------------------------------------------------------------
 * Ranked leaderboard card for the Sales Dashboard.
 * Each row: rank badge, avatar initials, name + role, deals closed,
 * conversion rate, and a revenue progress bar relative to the top earner.
 *
 * All data comes from props — no logic inside this component.
 */

import { Card, Box, Typography, Stack, Avatar } from '@mui/material';
import { initialsFromName } from '@utils/formatters';
import { tokens } from '@styles/theme';

/**
 * @param {{ executive: object, rank: number }} props
 */
function ExecutiveRow({ executive, rank }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{
        py: 1.25,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: rank === 1 ? tokens.color.gold500 : tokens.color.navy700,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {rank}
          </Typography>
        </Box>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: tokens.color.navy700,
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {initialsFromName(executive.name)}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
            {executive.name}
          </Typography>
        </Box>
      </Stack>

      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
        {executive.dealsClosedMtd ?? 0} sales
      </Typography>
    </Stack>
  );
}

/**
 * TopSalesExecutives
 *
 * @param {{ executives: Array }} props
 */
function TopSalesExecutives({ executives }) {
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Top Sales Executives
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Sales count by executive
      </Typography>

      {executives.length > 0 ? (
        executives.map((exec, idx) => (
          <ExecutiveRow key={exec.id} executive={exec} rank={idx + 1} />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No executives available.
        </Typography>
      )}
    </Card>
  );
}

export default TopSalesExecutives;
