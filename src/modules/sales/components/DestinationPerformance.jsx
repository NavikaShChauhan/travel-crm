import {
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { tokens } from '@styles/theme';

const DESTINATION_DATA = [
  { destination: 'Bali', leads: 52, proposals: 28, confirmed: 18, rate: '34.6%', color: 'success' },
  { destination: 'Switzerland', leads: 38, proposals: 21, confirmed: 12, rate: '31.6%', color: 'success' },
  { destination: 'Kerala', leads: 32, proposals: 15, confirmed: 9, rate: '28.1%', color: 'primary' },
  { destination: 'Andaman', leads: 25, proposals: 12, confirmed: 7, rate: '28.0%', color: 'primary' },
  { destination: 'Rajasthan', leads: 44, proposals: 19, confirmed: 10, rate: '22.7%', color: 'warning' },
  { destination: 'Dubai', leads: 36, proposals: 16, confirmed: 8, rate: '22.2%', color: 'warning' },
  { destination: 'Singapore', leads: 29, proposals: 13, confirmed: 6, rate: '20.7%', color: 'warning' },
  { destination: 'Thailand', leads: 41, proposals: 17, confirmed: 8, rate: '19.5%', color: 'error' },
  { destination: 'Kashmir', leads: 29, proposals: 14, confirmed: 8, rate: '27.6%', color: 'primary' },
  { destination: 'Maldives', leads: 35, proposals: 18, confirmed: 10, rate: '28.5%', color: 'primary' },
];

export default function DestinationPerformance() {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
        Destination & Package Sales Performance
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Lead-to-booking conversion efficiency by destination
      </Typography>

      {/* Internal Vertical Scroll Container - Aligned to Full Column Height */}
      <TableContainer sx={{ maxHeight: 310, overflowY: 'auto', flex: 1 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, bgcolor: 'background.paper', py: 1 }}>Destination</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, bgcolor: 'background.paper', py: 1 }}>Leads</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, bgcolor: 'background.paper', py: 1 }}>Proposals</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, bgcolor: 'background.paper', py: 1 }}>Confirmed</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, bgcolor: 'background.paper', py: 1 }}>Conversion %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DESTINATION_DATA.map((row) => (
              <TableRow key={row.destination} hover>
                <TableCell sx={{ fontWeight: 700, color: tokens.color.navy900, py: 1 }}>
                  {row.destination}
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>{row.leads}</TableCell>
                <TableCell align="right" sx={{ py: 1 }}>{row.proposals}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: 'success.main', py: 1 }}>
                  {row.confirmed}
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Chip
                    size="small"
                    label={row.rate}
                    color={row.color}
                    sx={{ fontWeight: 700, height: 20 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
