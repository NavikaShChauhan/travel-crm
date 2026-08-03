import { useState } from 'react';
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
import { MdClose, MdPersonAdd } from 'react-icons/md';
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

export default function AddLeadModal() {
  const { isAddModalOpen, closeAddModal, addLead } = useInquiry();

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead(formData);
    setFormData({
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
    });
  };

  return (
    <Dialog
      open={isAddModalOpen}
      onClose={closeAddModal}
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
              bgcolor: '#EEF2FF',
              color: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MdPersonAdd size={22} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18, color: '#1E293B' }}>
            Add New Lead
          </Typography>
        </Box>
        <IconButton onClick={closeAddModal} sx={{ color: '#64748B' }}>
          <MdClose size={20} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 2.5 }}>
          <Grid container spacing={2.5}>
            {/* Row 1 */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Client Name
              </Typography>
              <TextField
                fullWidth
                name="clientName"
                placeholder="Enter name"
                value={formData.clientName}
                onChange={handleChange}
                size="small"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Phone
              </Typography>
              <TextField
                fullWidth
                name="phone"
                placeholder="+91 00000 00000"
                value={formData.phone}
                onChange={handleChange}
                size="small"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                size="small"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Pax
              </Typography>
              <TextField
                fullWidth
                name="pax"
                type="number"
                placeholder="2"
                value={formData.pax}
                onChange={handleChange}
                size="small"
                variant="outlined"
              />
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Destination
              </Typography>
              <TextField
                fullWidth
                name="destination"
                placeholder="e.g. Maldives"
                value={formData.destination}
                onChange={handleChange}
                size="small"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Requirement
              </Typography>
              <TextField
                select
                fullWidth
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                size="small"
                variant="outlined"
              >
                {REQUIREMENT_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Source
              </Typography>
              <TextField
                select
                fullWidth
                name="source"
                value={formData.source}
                onChange={handleChange}
                size="small"
                variant="outlined"
              >
                {SOURCE_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Budget Range
              </Typography>
              <TextField
                fullWidth
                name="budget"
                placeholder="INR 2.0L - 2.8L"
                value={formData.budget}
                onChange={handleChange}
                size="small"
                variant="outlined"
              />
            </Grid>

            {/* Row 3 */}
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Travel Start
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="travelStart"
                value={formData.travelStart}
                onChange={handleChange}
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Travel End
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="travelEnd"
                value={formData.travelEnd}
                onChange={handleChange}
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Row 4 */}
            <Grid item xs={12}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 0.75, display: 'block', textTransform: 'uppercase', fontSize: 11, letterSpacing: 0.5 }}>
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="description"
                placeholder="Enter notes..."
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
          <Button
            onClick={closeAddModal}
            variant="text"
            sx={{ color: '#64748B', fontWeight: 600, textTransform: 'none', px: 2 }}
          >
            Discard
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
            + Save Lead
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
