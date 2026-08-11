import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  MdSearch,
  MdRepeat,
  MdStar,
  MdAdd,
  MdCardGiftcard,
} from 'react-icons/md';

import { useInquiry } from '../contexts/InquiryContext';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

export default function InquiryRepeatPage() {
  const { leads, addLead, openDrawer } = useInquiry();
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');

  const repeatLeads = useMemo(() => {
    return leads.filter((l) => l.source === 'Repeat Customers' || l.leadSource === 'Repeat Customers' || l.pastTripsCount);
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return repeatLeads.filter((lead) => {
      const matchesTier = tierFilter === 'All' || lead.loyaltyTier === tierFilter;
      const query = searchQuery.toLowerCase();
      const clientName = (lead.clientName || lead.name || '').toLowerCase();
      const phone = (lead.phone || lead.contactPhone || '').toLowerCase();
      const dest = (lead.destination || '').toLowerCase();

      return (
        matchesTier &&
        (!searchQuery ||
          lead.id.toLowerCase().includes(query) ||
          clientName.includes(query) ||
          phone.includes(query) ||
          dest.includes(query))
      );
    });
  }, [repeatLeads, tierFilter, searchQuery]);

  const handleAddRepeatClient = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    addLead({
      clientName: `Repeat Client #${randomId} (Meera Deshmukh)`,
      phone: '+91 98220 99887',
      email: `meera.d${randomId}@example.com`,
      destination: 'London & Scotland Highlands',
      adults: 2,
      budget: 'INR 6.0L - 7.5L',
      source: 'Repeat Customers',
      leadSource: 'Repeat Customers',
      pastTripsCount: 4,
      loyaltyTier: 'VIP Platinum',
      lifetimeSpend: '₹18,20,000',
      travelPurpose: 'Family',
      customerRequirements: 'Repeat VIP client requested London 5★ hotel suite + private chauffeur for Scotland Highlands tour.',
      priority: 'Hot',
      internalNotes: 'VIP Repeat Client. Eligible for 5% loyalty discount and complimentary airport lounge access.',
    });
  };

  return (
    <Box>
      <LeadDetailDrawer />

      {/* Header Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)', color: '#FFFFFF', display: 'flex' }}>
              <MdRepeat size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
                Repeat & Returning Customer Engine
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13 }}>
                Track returning client travel history, VIP loyalty tiers, lifetime value (LTV), and re-engagement campaigns.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Button
          variant="contained"
          startIcon={<MdAdd size={20} />}
          onClick={handleAddRepeatClient}
          sx={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
            borderRadius: '10px',
            px: 2.5,
            py: 1,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: 14,
            boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
          }}
        >
          + Re-engage Returning Client
        </Button>
      </Stack>

      {/* Loyalty KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              TOTAL REPEAT CLIENTS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
              {repeatLeads.length}
            </Typography>
            <Typography variant="caption" sx={{ color: '#8B5CF6', fontWeight: 700 }}>
              ● High retention rate
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              AVG LIFETIME VALUE (LTV)
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#10B981', my: 0.5 }}>
              ₹8.4L
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Per returning customer
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              VIP PLATINUM MEMBERS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#6366F1', my: 0.5 }}>
              12
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              3+ completed trips
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              RE-BOOKING RATE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#EC4899', my: 0.5 }}>
              42%
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Annual client return rate
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2.5 }}>
        <TextField
          select
          size="small"
          label="Filter by Loyalty Tier"
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          sx={{ width: 260, bgcolor: '#FFFFFF', borderRadius: '10px' }}
        >
          <MenuItem value="All">All Loyalty Tiers</MenuItem>
          <MenuItem value="VIP Platinum">VIP Platinum</MenuItem>
          <MenuItem value="Gold Customer">Gold Customer</MenuItem>
          <MenuItem value="Silver Customer">Silver Customer</MenuItem>
        </TextField>

        <TextField
          placeholder="Search repeat clients by name, phone, destination..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch size={18} color="#64748B" />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', sm: 320 }, bgcolor: '#FFFFFF', borderRadius: '10px' }}
        />
      </Stack>

      {/* Repeat Clients Table */}
      <TableContainer component={Card} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #F1F5F9' }}>
        <Table sx={{ minWidth: 950 }}>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>CLIENT NAME</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>LOYALTY TIER</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>PAST TRIPS</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>LIFETIME SPEND</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>NEW DESTINATION REQUEST</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4, color: '#94A3B8' }}>
                  No returning customer inquiries found. Click "+ Re-engage Returning Client" to add repeat leads!
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow
                  key={lead.id}
                  hover
                  onClick={() => openDrawer(lead.id)}
                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#F8FAFC' } }}
                >
                  <TableCell sx={{ fontWeight: 800, color: '#8B5CF6' }}>{lead.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {lead.clientName || lead.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      {lead.phone || lead.contactPhone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<MdStar size={14} color="#8B5CF6" />}
                      label={lead.loyaltyTier || 'VIP Platinum'}
                      size="small"
                      sx={{ fontWeight: 700, fontSize: 11, bgcolor: '#F3E8FF', color: '#8B5CF6' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${lead.pastTripsCount || 3} Trips Completed`}
                      size="small"
                      sx={{ fontWeight: 700, fontSize: 11, bgcolor: '#DCFCE7', color: '#15803D' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#10B981' }}>
                    {lead.lifetimeSpend || '₹12,40,000'}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{lead.destination}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.status || 'Interested'}
                      size="small"
                      sx={{ fontWeight: 700, fontSize: 11, bgcolor: '#FEF3C7', color: '#D97706' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDrawer(lead.id);
                      }}
                      sx={{ borderRadius: '8px', fontSize: 12, fontWeight: 700, textTransform: 'none' }}
                    >
                      View 7-Sec Form
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
