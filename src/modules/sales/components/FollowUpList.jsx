/**
 * FollowUpList.jsx
 * -----------------------------------------------------------------------
 * Upcoming follow-up reminders for the Sales Dashboard.
 * Shows: client name, destination, assigned executive, due date/time,
 * stage badge, priority chip, and estimated value.
 *
 * Sorted by due date (soonest first) — sorting happens in the hook.
 */

import { Card, Box, Typography, Stack, Chip } from '@mui/material';
import { MdOutlineSchedule, MdOutlinePerson, MdOutlineFlightTakeoff } from 'react-icons/md';
import { formatDate, formatCurrency } from '@utils/formatters';
import { PRIORITY_STYLES } from '../constants/sales.constants';
import { tokens } from '@styles/theme';

/**
 * @param {{ followUp: object }} props
 */
function FollowUpRow({ followUp }) {
  const priority = PRIORITY_STYLES[followUp.priority] ?? PRIORITY_STYLES.low;

  // Highlight overdue or due today
  const dueMs = new Date(followUp.dueDate).getTime();
  const nowMs = Date.now();
  const isOverdue = dueMs < nowMs;
  const isTodayDue = !isOverdue && dueMs - nowMs < 24 * 60 * 60 * 1000;

  return (
    <Box
      sx={{
        p: 1.75,
        borderRadius: 2,
        border: '1px solid',
        borderColor: isOverdue
          ? 'rgba(214,96,79,0.30)'
          : isTodayDue
          ? 'rgba(217,164,65,0.35)'
          : 'divider',
        bgcolor: isOverdue
          ? 'rgba(214,96,79,0.04)'
          : isTodayDue
          ? 'rgba(217,164,65,0.04)'
          : 'background.paper',
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: '0 2px 12px rgba(11,21,38,0.08)' },
      }}
    >
      {/* Top row: client + priority */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
          {followUp.client}
        </Typography>
        <Chip
          size="small"
          label={priority.label}
          sx={{
            bgcolor: priority.bg,
            color: priority.color,
            fontWeight: 700,
            fontSize: 11,
            flexShrink: 0,
          }}
        />
      </Stack>

      {/* Destination */}
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.75 }}>
        <MdOutlineFlightTakeoff size={13} color={tokens.color.ink400} />
        <Typography variant="caption" color="text.secondary" noWrap>
          {followUp.destination}
        </Typography>
      </Stack>

      {/* Bottom meta: executive, due date, value */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        spacing={0.5}
        sx={{ mt: 1 }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <MdOutlinePerson size={13} color={tokens.color.ink400} />
          <Typography variant="caption" color="text.secondary">
            {followUp.executive}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <MdOutlineSchedule
            size={13}
            color={isOverdue ? tokens.color.coral500 : tokens.color.ink400}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: isOverdue
                ? tokens.color.coral500
                : isTodayDue
                ? tokens.color.gold600
                : 'text.secondary',
            }}
          >
            {formatDate(followUp.dueDate, {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </Stack>

        <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.color.navy700 }}>
          {formatCurrency(followUp.estimatedValue)}
        </Typography>
      </Stack>
    </Box>
  );
}

/**
 * FollowUpList
 *
 * @param {{ followUps: Array }} props
 */
function FollowUpList({ followUps }) {
  return (
    <Card
      sx={{
        p: 3,
        height: 420,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Upcoming Follow Ups
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {followUps.length} scheduled · sorted by due date
      </Typography>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          pr: 0.5,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Stack spacing={1.5}>
          {followUps.map((fu) => (
            <FollowUpRow key={fu.id} followUp={fu} />
          ))}
        </Stack>
      </Box>
    </Card>
  );
}

export default FollowUpList;
