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
  MdRefresh,
  MdCampaign,
} from 'react-icons/md';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

import { useInquiry } from '../contexts/InquiryContext';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

export default function InquiryInstagramPage() {
  const { leads, addLead, openDrawer } = useInquiry();
  const [searchQuery, setSearchQuery] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All');

  const metaLeads = useMemo(() => {
    return leads.filter((l) => l.source === 'Instagram / Meta Ads' || l.leadSource === 'Instagram / Meta Ads');
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return metaLeads.filter((lead) => {
      const matchesCampaign = campaignFilter === 'All' || lead.adCampaignName === campaignFilter;
      const query = searchQuery.toLowerCase();
      const clientName = (lead.clientName || lead.name || '').toLowerCase();
      const phone = (lead.phone || lead.contactPhone || '').toLowerCase();
      const dest = (lead.destination || '').toLowerCase();

      return (
        matchesCampaign &&
        (!searchQuery ||
          lead.id.toLowerCase().includes(query) ||
          clientName.includes(query) ||
          phone.includes(query) ||
          dest.includes(query))
      );
    });
  }, [metaLeads, campaignFilter, searchQuery]);

  const handleSyncMetaLeads = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    addLead({
      clientName: `Meta Lead #${randomId} (Ananya Roy)`,
      phone: '+91 98112 44332',
      email: `meta.lead${randomId}@example.com`,
      destination: 'Vietnam & Bali Group',
      adults: 2,
      budget: 'INR 2.5L - 3.2L',
      source: 'Instagram / Meta Ads',
      leadSource: 'Instagram / Meta Ads',
      adCampaignName: 'Dubai Summer Luxury Deals 2026',
      adPlatform: 'Instagram Lead Form',
      travelPurpose: 'Leisure',
      customerRequirements: 'Fetched automatically via Meta Lead Ads Webhook. Requested 5★ hotel quotes.',
      priority: 'Hot',
    });
  };

  return (
    <Box>
      <LeadDetailDrawer />

      {/* Header Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)', color: '#FFFFFF', display: 'flex' }}>
              <FaInstagram size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
                Instagram & Meta Ads Lead Engine
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13 }}>
                Real-time Instagram DMs, Facebook Lead Ads, and Meta Campaign Analytics.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Button
          variant="contained"
          startIcon={<MdRefresh size={20} />}
          onClick={handleSyncMetaLeads}
          sx={{
            background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
            borderRadius: '10px',
            px: 2.5,
            py: 1,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: 14,
            boxShadow: '0 4px 14px rgba(236, 72, 153, 0.3)',
          }}
        >
          + Sync Meta Leads
        </Button>
      </Stack>

      {/* Campaign KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              TOTAL META LEADS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
              {metaLeads.length}
            </Typography>
            <Typography variant="caption" sx={{ color: '#EC4899', fontWeight: 700 }}>
              ● Meta Webhook Active
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              AVG COST PER LEAD (CPL)
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#8B5CF6', my: 0.5 }}>
              ₹142
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Optimized ad set target
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              ACTIVE CAMPAIGNS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
              4
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Dubai, Maldives & Europe Ads
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              CONVERSION RATE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#10B981', my: 0.5 }}>
              8.2%
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              High-intent lead quality
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2.5 }}>
        <TextField
          select
          size="small"
          label="Filter by Ad Campaign"
          value={campaignFilter}
          onChange={(e) => setCampaignFilter(e.target.value)}
          sx={{ width: 280, bgcolor: '#FFFFFF', borderRadius: '10px' }}
        >
          <MenuItem value="All">All Meta Ad Campaigns</MenuItem>
          <MenuItem value="Dubai Summer Luxury Deals 2026">Dubai Summer Luxury Deals</MenuItem>
          <MenuItem value="Maldives Honeymoon Campaign">Maldives Honeymoon Campaign</MenuItem>
          <MenuItem value="Europe Group Tour Ads">Europe Group Tour Ads</MenuItem>
        </TextField>

        <TextField
          placeholder="Search Meta leads by name, phone, destination..."
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
          sx={{ width: { xs: '100%', sm: 300 }, bgcolor: '#FFFFFF', borderRadius: '10px' }}
        />
      </Stack>

      {/* Meta Leads Table */}
      <TableContainer component={Card} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #F1F5F9' }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>CLIENT NAME</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>META AD CAMPAIGN</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>PLATFORM</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>DESTINATION</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>PRIORITY</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>RECEIVED AT</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4, color: '#94A3B8' }}>
                  No Meta Ad leads found. Click "+ Sync Meta Leads" to simulate instant ad leads!
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
                  <TableCell sx={{ fontWeight: 800, color: '#EC4899' }}>{lead.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                      {lead.clientName || lead.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      {lead.phone || lead.contactPhone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#6366F1' }}>
                      {lead.adCampaignName || 'Dubai Summer Special'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={lead.adPlatform?.includes('Facebook') ? <FaFacebookF size={12} color="#1877F2" /> : <FaInstagram size={12} color="#E4405F" />}
                      label={lead.adPlatform || 'Instagram DM'}
                      size="small"
                      sx={{ fontWeight: 700, fontSize: 11, bgcolor: '#FCE7F3', color: '#EC4899' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{lead.destination}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.priority || 'Hot'}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: 11,
                        bgcolor: lead.priority === 'Hot' ? '#FCE7F3' : '#F3E8FF',
                        color: lead.priority === 'Hot' ? '#EC4899' : '#8B5CF6',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#64748B', fontSize: 12 }}>{lead.date || lead.lastUpdated}</TableCell>
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
