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
  MdHandshake,
  MdAdd,
  MdDomain,
  MdOutlineStore,
} from 'react-icons/md';

import { useInquiry } from '../contexts/InquiryContext';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

export default function InquiryB2BPage() {
  const { leads, addLead, openDrawer } = useInquiry();
  const [searchQuery, setSearchQuery] = useState('');
  const [agencyFilter, setAgencyFilter] = useState('All');

  const b2bLeads = useMemo(() => {
    return leads.filter((l) => l.source === 'B2B Partners' || l.leadSource === 'B2B Partners' || l.partnerAgencyName);
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return b2bLeads.filter((lead) => {
      const matchesAgency = agencyFilter === 'All' || lead.partnerAgencyName === agencyFilter;
      const query = searchQuery.toLowerCase();
      const clientName = (lead.clientName || lead.name || '').toLowerCase();
      const agencyName = (lead.partnerAgencyName || '').toLowerCase();
      const dest = (lead.destination || '').toLowerCase();

      return (
        matchesAgency &&
        (!searchQuery ||
          lead.id.toLowerCase().includes(query) ||
          clientName.includes(query) ||
          agencyName.includes(query) ||
          dest.includes(query))
      );
    });
  }, [b2bLeads, agencyFilter, searchQuery]);

  const handleAddB2BInquiry = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    addLead({
      clientName: `B2B Group Lead #${randomId} (Sun & Sand Tours)`,
      phone: '+91 98991 77665',
      email: `b2b.agent${randomId}@sunsandtours.com`,
      destination: 'Kerala Backwaters & Munnar',
      adults: 6,
      children: 2,
      budget: 'INR 4.8L Net Rate',
      source: 'B2B Partners',
      leadSource: 'B2B Partners',
      partnerAgencyName: 'Sun & Sand Travels Mumbai (B2B)',
      agentRefCode: `B2B-SUN-${randomId}`,
      commissionPct: '10%',
      travelPurpose: 'Group',
      customerRequirements: 'B2B agent request for 8 pax family group. Houseboat reservation + 4★ hill resort.',
      priority: 'Warm',
    });
  };

  return (
    <Box>
      <LeadDetailDrawer />

      {/* Header Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)', color: '#FFFFFF', display: 'flex' }}>
              <MdHandshake size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
                B2B Partner & Sub-Agency Inquiry Portal
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13 }}>
                Manage B2B travel agent inquiries, commission rates, net pricing, and partner agency bookings.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Button
          variant="contained"
          startIcon={<MdAdd size={20} />}
          onClick={handleAddB2BInquiry}
          sx={{
            background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
            borderRadius: '10px',
            px: 2.5,
            py: 1,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: 14,
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
          }}
        >
          + Add B2B Inquiry
        </Button>
      </Stack>

      {/* Partner Overview KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              TOTAL B2B PARTNERS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
              18 Agencies
            </Typography>
            <Typography variant="caption" sx={{ color: '#0284C7', fontWeight: 700 }}>
              Active agent network
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              ACTIVE B2B LEADS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0284C7', my: 0.5 }}>
              {b2bLeads.length}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              {b2bLeads.length} pending quotations
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              AVG B2B COMMISSION
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#10B981', my: 0.5 }}>
              11.5%
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Standard agent split
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              TOP PARTNER AGENCY
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0369A1', my: 0.5, fontSize: 15 }}>
              Royal Travels Delhi
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              ₹18.4L volume MTD
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2.5 }}>
        <TextField
          select
          size="small"
          label="Filter by Partner Agency"
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
          sx={{ width: 300, bgcolor: '#FFFFFF', borderRadius: '10px' }}
        >
          <MenuItem value="All">All B2B Partner Agencies</MenuItem>
          <MenuItem value="Royal Travels Delhi (B2B)">Royal Travels Delhi</MenuItem>
          <MenuItem value="Sun & Sand Travels Mumbai (B2B)">Sun & Sand Travels Mumbai</MenuItem>
          <MenuItem value="Global Vacations Kolkata (B2B)">Global Vacations Kolkata</MenuItem>
        </TextField>

        <TextField
          placeholder="Search B2B leads by agency, agent code, client..."
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

      {/* B2B Leads Table */}
      <TableContainer component={Card} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #F1F5F9' }}>
        <Table sx={{ minWidth: 950 }}>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>B2B PARTNER AGENCY</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>AGENT REF CODE</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>CLIENT NAME</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>DESTINATION</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>PAX</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>COMMISSION</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4, color: '#94A3B8' }}>
                  No B2B partner inquiries found. Click "+ Add B2B Inquiry" to add agency bookings!
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
                  <TableCell sx={{ fontWeight: 800, color: '#0284C7' }}>{lead.id}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MdDomain size={16} color="#0284C7" />
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                        {lead.partnerAgencyName || 'Royal Travels (B2B)'}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={lead.agentRefCode || 'B2B-REF-101'}
                      size="small"
                      sx={{ fontWeight: 700, fontSize: 11, bgcolor: '#E0F2FE', color: '#0284C7' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#334155' }}>{lead.clientName || lead.name}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{lead.destination}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{lead.pax || lead.totalPax || 1}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#10B981' }}>{lead.commissionPct || '10%'}</TableCell>
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
