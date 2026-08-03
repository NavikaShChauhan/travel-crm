import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import { MdClose, MdEditNote } from 'react-icons/md';
import { useInquiry } from '../contexts/InquiryContext';

const REQUIREMENT_OPTIONS = ['Family', 'Honeymoon', 'Solo', 'Group', 'Corporate'];
const SOURCE_OPTIONS = [
  'Manual',
  'Website',
  'whatsapp',
  'Instagram / Meta Ads',
  'B2B Partners',
  'Repeat Customers',
];
const STAGE_OPTIONS = [
  'New',
  'Contacted',
  'Follow-up',
  'Proposal Sent',
  'Viewed',
  'Negotiation',
  'Revised Proposal',
  'Soft Confirm',
  'Confirmed',
  'Denied',
];
const PRIORITY_OPTIONS = ['Hot', 'Warm', 'Cold'];
const SALES_USERS = ['Priya Nair', 'Neha Gupta', 'Rahul Sharma', 'Ananya Roy'];
const OPS_USERS = ['Amit Kumar', 'Vikram Singh', 'Sonia Verma'];

export default function EditLeadModal({ open, onClose, lead }) {
  const { updateLead } = useInquiry();

  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    email: '',
    pax: '2',
    destination: '',
    requirement: 'Family',
    source: 'Manual',
    budget: '',
    travelStart: '',
    travelEnd: '',
    description: '',
    stage: 'New',
    priority: 'Warm',
    assignedSalesUser: 'Priya Nair',
    assignedOpsUser: 'Amit Kumar',
    operationsFocus: 'Pending',
    customerFocus: 'Customer Profiles',
    contactChannel: 'Email',
    financeFocus: 'Invoice',
    itineraryState: 'Inventory',
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        clientName: lead.clientName || '',
        phone: lead.phone || '',
        email: lead.email || '',
        pax: lead.pax || '2',
        destination: lead.destination || '',
        requirement: lead.requirement || 'Family',
        source: lead.source || 'Manual',
        budget: lead.budget || '',
        travelStart: lead.travelStart || '',
        travelEnd: lead.travelEnd || '',
        description: lead.description || '',
        stage: lead.stage || 'New',
        priority: lead.priority || 'Warm',
        assignedSalesUser: lead.assignedSalesUser || 'Priya Nair',
        assignedOpsUser: lead.assignedOpsUser || 'Amit Kumar',
        operationsFocus: lead.operationsFocus || 'Pending',
        customerFocus: lead.customerFocus || 'Customer Profiles',
        contactChannel: lead.contactChannel || 'Email',
        financeFocus: lead.financeFocus || 'Invoice',
        itineraryState: lead.itineraryState || 'Inventory',
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lead && lead.id) {
      updateLead(lead.id, formData);
    }
    onClose();
  };

  if (!lead) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1.5,
          bgcolor: '#FFFFFF',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              bgcolor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MdEditNote size={24} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: '#1E293B' }}>
              Edit Full Inquiry Form ({lead.id})
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Update client details, requirement, lead source, stage & ownership assignments.
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#64748B' }}>
          <MdClose size={20} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 2.5 }}>
          <Grid container spacing={2.5}>
            {/* Section 1: Client Information */}
            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                1. Client & Contact Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Client Name
              </Typography>
              <TextField
                fullWidth
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Phone
              </Typography>
              <TextField
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Pax (Travellers)
              </Typography>
              <TextField
                fullWidth
                name="pax"
                type="number"
                value={formData.pax}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Section 2: Requirement & Trip Specs */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                2. Travel Requirements & Budget
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Destination
              </Typography>
              <TextField
                fullWidth
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Requirement
              </Typography>
              <TextField
                select
                fullWidth
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                size="small"
              >
                {REQUIREMENT_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Lead Source
              </Typography>
              <TextField
                select
                fullWidth
                name="source"
                value={formData.source}
                onChange={handleChange}
                size="small"
              >
                {SOURCE_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Budget Range
              </Typography>
              <TextField
                fullWidth
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Travel Start Date
              </Typography>
              <TextField
                fullWidth
                name="travelStart"
                value={formData.travelStart}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Travel End Date
              </Typography>
              <TextField
                fullWidth
                name="travelEnd"
                value={formData.travelEnd}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Section 3: Pipeline & Ownership */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                3. Pipeline & Assignment
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Stage
              </Typography>
              <TextField
                select
                fullWidth
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                size="small"
              >
                {STAGE_OPTIONS.map((st) => (
                  <MenuItem key={st} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Priority
              </Typography>
              <TextField
                select
                fullWidth
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                size="small"
              >
                {PRIORITY_OPTIONS.map((pr) => (
                  <MenuItem key={pr} value={pr}>
                    {pr}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Assigned Sales User
              </Typography>
              <TextField
                select
                fullWidth
                name="assignedSalesUser"
                value={formData.assignedSalesUser}
                onChange={handleChange}
                size="small"
              >
                {SALES_USERS.map((usr) => (
                  <MenuItem key={usr} value={usr}>
                    {usr}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Assigned Ops User
              </Typography>
              <TextField
                select
                fullWidth
                name="assignedOpsUser"
                value={formData.assignedOpsUser}
                onChange={handleChange}
                size="small"
              >
                {OPS_USERS.map((usr) => (
                  <MenuItem key={usr} value={usr}>
                    {usr}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Operations Focus
              </Typography>
              <TextField
                fullWidth
                name="operationsFocus"
                value={formData.operationsFocus}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Section 4: Description */}
            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11 }}>
                Description & Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
          <Button onClick={onClose} variant="text" sx={{ color: '#64748B', fontWeight: 600, textTransform: 'none', px: 2 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              bgcolor: '#3B82F6',
              '&:hover': { bgcolor: '#2563EB' },
              borderRadius: '8px',
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
