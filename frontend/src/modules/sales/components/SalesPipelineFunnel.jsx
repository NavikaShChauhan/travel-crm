import { Box, Card, Chip, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { MdTrendingUp, MdCancel, MdAccessTime } from 'react-icons/md';
import { tokens } from '@styles/theme';

const FUNNEL_STAGES = [
  { stage: 'Leads', count: 284, conversionFromPrev: null, color: tokens.color.navy700 },
  { stage: 'Proposals', count: 119, conversionFromPrev: '41.9%', color: '#2563EB' },
  { stage: 'Proposal Viewed', count: 73, conversionFromPrev: '61.3%', color: tokens.color.gold600 },
  { stage: 'Negotiation', count: 40, conversionFromPrev: '54.8%', color: tokens.color.teal500 },
  { stage: 'Soft Confirm', count: 26, conversionFromPrev: '65.0%', color: tokens.color.teal500 },
  { stage: 'Confirmed', count: 19, conversionFromPrev: '73.1%', color: 'success.main' },
];

export default function SalesPipelineFunnel() {
  const maxCount = FUNNEL_STAGES[0].count;

  return (
    <Card sx={{ p: 2, borderRadius: 2.5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Sales Pipeline Conversion Funnel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stage-by-stage deal velocity and drop-off analysis
            </Typography>
          </Box>
          <Chip
            icon={<MdTrendingUp />}
            label="Overall: 6.7%"
            color="success"
            sx={{ fontWeight: 700, height: 24 }}
          />
        </Stack>

        {/* Stage-by-Stage Funnel */}
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {FUNNEL_STAGES.map((stg) => {
            const pctOfMax = Math.round((stg.count / maxCount) * 100);

            return (
              <Box key={stg.stage}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={5} sm={4}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {stg.stage}
                      </Typography>
                      {stg.conversionFromPrev ? (
                        <Typography variant="caption" color="text.secondary">
                          {stg.conversionFromPrev} conversion
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Initial volume
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={5} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={pctOfMax}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(27,42,74,0.06)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: stg.color,
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 28, textAlign: 'right' }}>
                        {stg.count}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={2} sm={2} sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      {pctOfMax}%
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Explicit Footer Section in Normal Flow */}
      <Box sx={{ mt: 2 }}>
        <Divider sx={{ mb: 1.5 }} />
        <Grid container spacing={1.5} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MdTrendingUp size={18} color={tokens.color.teal500} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.1 }}>
                  Overall Lead → Confirmed
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: tokens.color.teal500 }}>
                  6.7% Win Rate
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MdCancel size={18} color={tokens.color.coral500} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.1 }}>
                  Total Lost / Rejected
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'error.main' }}>
                  48 Deals
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MdAccessTime size={18} color={tokens.color.navy700} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.1 }}>
                  Avg. Conversion
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  4.2 Days
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
