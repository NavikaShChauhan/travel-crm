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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  MdLanguage,
  MdSearch,
  MdCode,
  MdAddLink,
  MdClose,
  MdContentCopy,
  MdCheckCircle,
} from 'react-icons/md';

import { useInquiry } from '../contexts/InquiryContext';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

export default function InquiryWebsitePage() {
  const { leads, addLead, openDrawer } = useInquiry();
  const [searchQuery, setSearchQuery] = useState('');
  const [formFilter, setFormFilter] = useState('All');
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Web leads filter
  const webLeads = useMemo(() => {
    return leads.filter((l) => l.source === 'Website' || l.leadSource === 'Website');
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return webLeads.filter((lead) => {
      const matchesForm = formFilter === 'All' || lead.webFormName === formFilter;
      const query = searchQuery.toLowerCase();
      const clientName = (lead.clientName || lead.name || '').toLowerCase();
      const phone = (lead.phone || lead.contactPhone || '').toLowerCase();
      const dest = (lead.destination || '').toLowerCase();

      return (
        matchesForm &&
        (!searchQuery ||
          lead.id.toLowerCase().includes(query) ||
          clientName.includes(query) ||
          phone.includes(query) ||
          dest.includes(query))
      );
    });
  }, [webLeads, formFilter, searchQuery]);

  const handleSimulateWebForm = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    addLead({
      clientName: `Web Lead #${randomId} (Sneha Kapur)`,
      phone: '+91 98765 99112',
      email: `web.lead${randomId}@example.com`,
      destination: 'Switzerland & Paris',
      adults: 2,
      children: 1,
      childAges: ['6 years'],
      budget: 'INR 4.5L - 5.5L',
      source: 'Website',
      leadSource: 'Website',
      webFormName: 'Honeymoon Special Landing Page Form',
      travelPurpose: 'Honeymoon',
      customerRequirements: 'Submitted via website landing page. Requested 5★ hotel quotes & Swiss Rail Pass options.',
      priority: 'Hot',
    });
  };

  const sampleEmbedCode = `<script src="https://crm.voyagetravel.com/embed/form.js" data-form-id="v-form-9982"></script>\n<div id="voyage-travel-form"></div>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleEmbedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
      <LeadDetailDrawer />

      {/* Header Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
            Website Inquiries & Web Form Submissions
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13, mt: 0.25 }}>
            Automated website landing page leads, form webhooks, and embedded trip request widgets.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<MdCode size={18} />}
            onClick={() => setIsEmbedModalOpen(true)}
            sx={{
              borderColor: '#CBD5E1',
              color: '#475569',
              bgcolor: '#FFFFFF',
              borderRadius: '10px',
              px: 2,
              py: 0.75,
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            Get Form Embed Code
          </Button>
          <Button
            variant="contained"
            disableElevation
            startIcon={<MdAddLink size={18} />}
            onClick={handleSimulateWebForm}
            sx={{
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              borderRadius: '10px',
              px: 2.5,
              py: 0.75,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: 14,
              boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
            }}
          >
            + Simulate Web Lead
          </Button>
        </Stack>
      </Stack>

      {/* KPI Metric Strip */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              TOTAL WEB LEADS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
              {webLeads.length}
            </Typography>
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700 }}>
              ● Live webhook connected
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              TOP WEB FORM
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#6366F1', my: 0.5, fontSize: 16 }}>
              Honeymoon Special
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              62% of website inquiries
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              AVG RESPONSE TIME
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
              14m
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Instant auto-responder active
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', bgcolor: '#FFFFFF' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, letterSpacing: '0.05em' }}>
              FORM CONVERSION
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#8B5CF6', my: 0.5 }}>
              4.8%
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              +1.2% from last week
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Strip */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2.5 }}>
        <TextField
          select
          size="small"
          label="Filter by Web Form"
          value={formFilter}
          onChange={(e) => setFormFilter(e.target.value)}
          sx={{ width: 260, bgcolor: '#FFFFFF', borderRadius: '10px' }}
        >
          <MenuItem value="All">All Website Forms</MenuItem>
          <MenuItem value="Honeymoon Special Landing Page Form">Honeymoon Special Form</MenuItem>
          <MenuItem value="Custom Package Inquiry Form">Custom Package Form</MenuItem>
          <MenuItem value="Footer Contact Form">Footer Quick Form</MenuItem>
        </TextField>

        <TextField
          placeholder="Search web leads by name, phone, destination..."
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

      {/* Web Leads Table */}
      <TableContainer component={Card} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #F1F5F9' }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>CLIENT NAME</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>WEB FORM ORIGIN</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>DESTINATION</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>PAX</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>PRIORITY</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>SUBMITTED AT</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 12 }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4, color: '#94A3B8' }}>
                  No website enquiries found matching criteria. Click "+ Simulate Web Lead" to test!
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
                  <TableCell sx={{ fontWeight: 800, color: '#6366F1' }}>{lead.id}</TableCell>
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
                      icon={<MdLanguage size={14} color="#6366F1" />}
                      label={lead.webFormName || 'Main Website Form'}
                      size="small"
                      sx={{ fontWeight: 700, fontSize: 11, bgcolor: '#EEF2FF', color: '#6366F1' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{lead.destination}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{lead.pax || lead.totalPax || 1}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.priority || 'Warm'}
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

      {/* Embed Modal */}
      <Dialog open={isEmbedModalOpen} onClose={() => setIsEmbedModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Website Form Embed Code
          </Typography>
          <IconButton onClick={() => setIsEmbedModalOpen(false)}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
            Copy and paste this script snippet into your WordPress, Next.js, or HTML website landing page to sync leads instantly into Voyage CRM.
          </Typography>

          <Box
            sx={{
              p: 2,
              bgcolor: '#0F172A',
              color: '#38BDF8',
              borderRadius: '10px',
              fontFamily: 'monospace',
              fontSize: 12,
              whiteSpace: 'pre-wrap',
            }}
          >
            {sampleEmbedCode}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            startIcon={copied ? <MdCheckCircle color="#10B981" /> : <MdContentCopy />}
            onClick={handleCopyCode}
            sx={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', borderRadius: '8px', textTransform: 'none' }}
          >
            {copied ? 'Copied to Clipboard!' : 'Copy Code Snippet'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
