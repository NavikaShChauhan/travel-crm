import { Box, Typography, Stack } from '@mui/material';
import {
  MdOutlineDescription,
  MdOutlineHandshake,
  MdOutlineCheckCircle,
  MdOutlineEventAvailable,
  MdOutlineSend,
  MdOutlineLocalAtm,
} from 'react-icons/md';
import { PIPELINE_STAGE_COLORS } from '../constants/sales.constants';

const STAGE_ICONS = {
  proposal: MdOutlineDescription,
  negotiation: MdOutlineHandshake,
  confirmation: MdOutlineCheckCircle,
  follow_up: MdOutlineEventAvailable,
  sent: MdOutlineSend,
  closed: MdOutlineLocalAtm,
};

function PipelineStageCard({ stage }) {
  const color = PIPELINE_STAGE_COLORS[stage.colorKey] ?? '#8B93A7';
  const Icon = stage.icon ?? STAGE_ICONS[stage.id] ?? MdOutlineDescription;

  return (
    <Box
      sx={{
        flex: '1 1 160px',
        minWidth: 160,
        borderRadius: 2.5,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        p: 2,
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(11,21,38,0.10)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 1.25 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${color}14`,
            color,
          }}
        >
          <Icon size={18} />
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {stage.label}
        </Typography>
      </Stack>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25 }}>
        {stage.count}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
        {stage.count === 1 ? 'Lead' : 'Leads'}
      </Typography>
    </Box>
  );
}

function SalesPipeline({ stages }) {
  if (!stages.length) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        overflowX: 'auto',
        pb: 0.5,
        '&::-webkit-scrollbar': { height: 4 },
        '&::-webkit-scrollbar-thumb': { borderRadius: 4, bgcolor: '#c7cce0' },
      }}
    >
      {stages.map((stage) => (
        <PipelineStageCard key={stage.id} stage={stage} />
      ))}
    </Box>
  );
}

export default SalesPipeline;
