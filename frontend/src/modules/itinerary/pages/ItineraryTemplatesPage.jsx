import React from 'react';
import { Box, Card, Typography, Grid, Button, CardContent, CardMedia } from '@mui/material';
import { MdOutlineDescription, MdContentCopy } from 'react-icons/md';

const TEMPLATES = [
  {
    title: 'Bali Honeymoon Getaway',
    dest: 'Bali, Indonesia',
    days: '7 Days / 6 Nights',
    desc: 'Romantic tour covering private villa stays, Uluwatu sunset temple visit, Ubud swings, and Seminyak beach club dining.',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Kashmir Luxury Explorer',
    dest: 'Srinagar, Gulmarg, Pahalgam',
    days: '6 Days / 5 Nights',
    desc: 'Premium mountain holiday featuring houseboat stays on Dal Lake, Gondola rides in Gulmarg, and scenic valley excursions in Pahalgam.',
    img: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Switzerland Alpine Magic',
    dest: 'Interlaken, Lucerne, Zurich',
    days: '8 Days / 7 Nights',
    desc: 'Scenic Swiss rail journey with Jungfraujoch excursions, Lucerne lake cruises, and old town tours.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  }
];

export default function ItineraryTemplatesPage() {
  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.025em', mb: 1 }}>
          Saved Itinerary Templates
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Select and duplicate preset templates to speed up your sales workflow.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {TEMPLATES.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.title}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {item.dest} • {item.days}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flexGrow: 1 }}>
                  {item.desc}
                </Typography>
                <Button variant="outlined" startIcon={<MdContentCopy />} fullWidth sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}>
                  Duplicate as Draft
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
