import React from 'react';
import { Box, Card, Typography, Grid, FormControlLabel, Switch, Divider, Button, TextField } from '@mui/material';
import { MdOutlineSettings } from 'react-icons/md';

export default function ItinerarySettingsPage() {
  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.025em', mb: 1 }}>
          Itinerary Settings
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Configure client-facing PDF outputs, currency rules, and general builder configurations.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>PDF & Output Settings</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Show pricing details of individual services in PDF export"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Display day-by-day travel time durations badge"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable automatic PDF margins adjustment (page breaks optimization)"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="PDF Footer Text (Disclaimers)"
                  fullWidth
                  defaultValue="Rates are subject to availability. Flights are non-refundable unless specified."
                  placeholder="Company disclaimers..."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Currency Sign"
                  fullWidth
                  defaultValue="₹"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}>
                Save Settings
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
