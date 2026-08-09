import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Radio,
  Chip
} from '@mui/material';
import { MdClose, MdPictureAsPdf, MdCheckCircle, MdOutlinePalette } from 'react-icons/md';
import { exportItineraryPDF } from '../utils/pdfGenerator';

const TEMPLATES = [
  {
    id: 'detailed',
    name: 'Luxury Detailed Dossier',
    tagline: 'Premium Multi-Page PDF',
    description: 'Beautiful cover page, route map timeline, day-by-day itineraries, hotel gallery, flight times, and minibus details.',
    badge: 'Recommended',
    color: '#D4AF37',
    bgGradient: 'linear-gradient(135deg, #153328 0%, #D4AF37 100%)',
    previewBorder: '#D4AF37'
  },
  {
    id: 'modern',
    name: 'Modern Luxury',
    tagline: 'Sleek & Resort Styled',
    description: 'Hero cover photo banner, emerald accents (#059669), 4-column metadata grid, clean card layout.',
    badge: 'Popular',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #0F172A 0%, #059669 100%)',
    previewBorder: '#059669'
  },
  {
    id: 'executive',
    name: 'Executive Classic',
    tagline: 'Formal & Corporate',
    description: 'Deep navy header bar, gold line accents (#D97706), elegant serif typography, clean data grid.',
    badge: 'Formal',
    color: '#D97706',
    bgGradient: 'linear-gradient(135deg, #0F172A 0%, #D97706 100%)',
    previewBorder: '#D97706'
  },
  {
    id: 'adventure',
    name: 'Vibrant Adventure',
    tagline: 'Colorful & Scenic',
    description: 'Coral to Teal gradient hero (#FF6B6B to #4ECDC4), vibrant pill tags, rounded card layout.',
    badge: 'Vibrant',
    color: '#FF6B6B',
    bgGradient: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
    previewBorder: '#FF6B6B'
  }
];

export default function PdfTemplateModal({ open, onClose, itineraryData }) {
  const [selectedTemplate, setSelectedTemplate] = useState('detailed');

  const handleExport = () => {
    exportItineraryPDF(itineraryData, selectedTemplate);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="body">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              bgcolor: '#ECFDF5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MdOutlinePalette size={22} />
          </Box>
          <div>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              Choose PDF Itinerary Template
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Select from 3 professionally crafted PDF layouts for client presentation
            </Typography>
          </div>
        </Box>
        <IconButton onClick={onClose} size="small">
          <MdClose />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={2.5}>
          {TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <Grid item xs={12} md={4} key={tmpl.id}>
                <Paper
                  variant="outlined"
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease-in-out',
                    border: isSelected ? `2px solid ${tmpl.color}` : '1px solid #E2E8F0',
                    bgcolor: isSelected ? '#F8FAFC' : '#FFFFFF',
                    boxShadow: isSelected ? `0 8px 24px ${tmpl.color}25` : 'none',
                    '&:hover': {
                      borderColor: tmpl.color,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        color: tmpl.color,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <MdCheckCircle size={22} />
                    </Box>
                  )}

                  {/* Header Preview Banner */}
                  <Box
                    sx={{
                      height: 70,
                      borderRadius: 2,
                      background: tmpl.bgGradient,
                      p: 1.5,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      mb: 2,
                      color: '#FFFFFF'
                    }}
                  >
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                      {tmpl.tagline}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.9rem', lineHeight: 1.1 }}>
                      {tmpl.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip
                      label={tmpl.badge}
                      size="small"
                      sx={{
                        bgcolor: `${tmpl.color}15`,
                        color: tmpl.color,
                        fontWeight: 700,
                        fontSize: '0.7rem'
                      }}
                    />
                    <Radio
                      checked={isSelected}
                      value={tmpl.id}
                      onChange={() => setSelectedTemplate(tmpl.id)}
                      size="small"
                      sx={{ color: tmpl.color, '&.Mui-checked': { color: tmpl.color } }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.825rem', lineHeight: 1.5 }}>
                    {tmpl.description}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, px: 3, justifyContent: 'space-between', bgcolor: '#F8FAFC' }}>
        <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
          Template selected: <strong>{TEMPLATES.find((t) => t.id === selectedTemplate)?.name}</strong>
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ borderRadius: '20px', textTransform: 'none', px: 2.5, fontWeight: 700, borderColor: '#CBD5E1', color: '#475569' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            variant="contained"
            startIcon={<MdPictureAsPdf />}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              px: 3,
              fontWeight: 700,
              bgcolor: '#059669',
              '&:hover': { bgcolor: '#047857' }
            }}
          >
            Generate & Export PDF
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
