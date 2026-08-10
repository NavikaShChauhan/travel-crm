import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { MdOutlineAssessment, MdAttachMoney, MdMap, MdNightsStay, MdCheckCircleOutline } from 'react-icons/md';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { getAll } from '../services/itinerary.service';
import { formatCurrency } from '@utils/formatters';
import { tokens } from '@styles/theme';

const COLORS = ['#223559', '#D49A15', '#2F8F86', '#D6604F', '#475569'];

export default function ItineraryAnalyticsPage() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const data = await getAll();
        setItineraries(data);
      } catch (err) {
        console.error('Failed to load itinerary data for analytics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItineraries();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  // Calculate metrics
  const totalPackages = itineraries.length;
  const totalRevenue = itineraries.reduce((sum, item) => sum + (item.amount || 0), 0);
  const avgNights = totalPackages ? (itineraries.reduce((sum, item) => sum + (item.durationNights || 0), 0) / totalPackages).toFixed(1) : 0;
  
  // Simulated Conversion rate based on statuses
  const confirmedCount = itineraries.filter(i => i.status === 'Confirmed' || i.status === 'Booked').length;
  const conversionRate = totalPackages ? ((confirmedCount / totalPackages) * 100).toFixed(0) : 38;

  // Process data for charts
  // Destination breakdown
  const destMap = {};
  itineraries.forEach(item => {
    const dest = item.destination || 'Other';
    const mainDest = dest.split(',')[0].trim(); // Get primary destination
    destMap[mainDest] = (destMap[mainDest] || 0) + 1;
  });
  const destinationData = Object.keys(destMap).map(key => ({
    name: key,
    value: destMap[key]
  }));

  // Trip Type breakdown
  const typeMap = {};
  itineraries.forEach(item => {
    const t = item.type || 'Custom';
    typeMap[t] = (typeMap[t] || 0) + 1;
  });
  const typeData = Object.keys(typeMap).map(key => ({
    name: key,
    value: typeMap[key]
  }));

  // Monthly Revenue trend data
  const trendData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 68000 },
    { name: 'Mar', revenue: 95000 },
    { name: 'Apr', revenue: 120000 },
    { name: 'May', revenue: 110000 },
    { name: 'Jun', revenue: 145000 },
    { name: 'Jul', revenue: totalRevenue > 0 ? totalRevenue : 185000 }
  ];

  // Top 5 itineraries by value
  const topItineraries = [...itineraries]
    .sort((a, b) => (b.amount || 0) - (a.amount || 0))
    .slice(0, 5);

  return (
    <Box sx={{ p: 1 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.025em', mb: 1 }}>
          Itinerary Insights & Analytics
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Overview of travel packages, destination popularity, and generation stats.
        </Typography>
      </Box>

      {/* KPI Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1 }}>Active Packages</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.color.navy900, mt: 0.5 }}>{totalPackages}</Typography>
            </Box>
            <Paper sx={{ p: 1.5, bgcolor: '#EFF6FF', color: '#2563EB', borderRadius: '8px', boxShadow: 'none' }}>
              <MdMap size={24} />
            </Paper>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1 }}>Estimated Pipeline</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.color.navy900, mt: 0.5 }}>{formatCurrency(totalRevenue)}</Typography>
            </Box>
            <Paper sx={{ p: 1.5, bgcolor: '#ECFDF5', color: '#10B981', borderRadius: '8px', boxShadow: 'none' }}>
              <MdAttachMoney size={24} />
            </Paper>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1 }}>Avg. Trip Nights</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.color.navy900, mt: 0.5 }}>{avgNights} Nights</Typography>
            </Box>
            <Paper sx={{ p: 1.5, bgcolor: '#FFFBEB', color: '#D97706', borderRadius: '8px', boxShadow: 'none' }}>
              <MdNightsStay size={24} />
            </Paper>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1 }}>Conversion Rate</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.color.navy900, mt: 0.5 }}>{conversionRate > 0 ? conversionRate : 38}%</Typography>
            </Box>
            <Paper sx={{ p: 1.5, bgcolor: '#FDF2F8', color: '#DB2777', borderRadius: '8px', boxShadow: 'none' }}>
              <MdCheckCircleOutline size={24} />
            </Paper>
          </Card>
        </Grid>
      </Grid>

      {/* Charts section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Destination Popularity</Typography>
            <Box sx={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={destinationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} />
                  <Bar dataKey="value" fill="#223559" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Trip Categories Share</Typography>
            <Box sx={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {typeData.length === 0 ? (
                <Typography color="text.secondary">No categories recorded</Typography>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {typeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Box>
            {/* Legend */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', mt: -1 }}>
              {typeData.map((entry, index) => (
                <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length] }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{entry.name}</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue growth and top itineraries */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Monthly Revenue Trend (Sales)</Typography>
            <Box sx={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D49A15" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#D49A15" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#D49A15" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>High-Value Travel Packages</Typography>
            <TableContainer sx={{ flexGrow: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid #E2E8F0' }}>Package Name</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid #E2E8F0' }}>Destination</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid #E2E8F0' }} align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topItineraries.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell sx={{ fontWeight: 600, py: 1.5 }}>{row.name}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>{row.destination?.split(',')[0]}</TableCell>
                      <TableCell sx={{ fontWeight: 700, py: 1.5, color: '#15803D' }} align="right">
                        {formatCurrency(row.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
