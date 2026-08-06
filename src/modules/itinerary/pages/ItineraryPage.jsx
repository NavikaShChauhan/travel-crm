import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import { getAll, remove } from '@/services/itinerary.service';
import { DESTINATIONS_DATABASE, getCountries, getCitiesByCountry } from '@/constants/destinations.data';
import ItineraryCard from '../components/ItineraryCard';
import ItineraryHeader from '../components/ItineraryHeader';
import '../styles/itinerary.css';

export default function ItineraryPage() {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Header state
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [countryFilter, setCountryFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');

  const fetchItineraries = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await getAll();
      setItineraries(data);
    } catch (error) {
      console.error('Failed to load itineraries:', error);
      setErrorMsg('Failed to load itineraries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  // Compute available countries dynamically
  const availableCountries = useMemo(() => {
    const staticCountries = getCountries();
    const itinCountries = itineraries.map((item) => item.country).filter(Boolean);
    return Array.from(new Set([...staticCountries, ...itinCountries])).sort();
  }, [itineraries]);

  // Compute available cities dynamically based on country selection
  const availableCities = useMemo(() => {
    if (countryFilter && countryFilter !== 'All') {
      const staticCities = getCitiesByCountry(countryFilter);
      const cLower = countryFilter.toLowerCase();
      const itinCities = itineraries
        .filter(
          (item) =>
            (item.country && item.country.toLowerCase() === cLower) ||
            (item.destination && item.destination.toLowerCase().includes(cLower))
        )
        .map((item) => item.city)
        .filter(Boolean);
      return Array.from(new Set([...staticCities, ...itinCities])).sort();
    }
    const allStaticCities = Array.from(new Set(DESTINATIONS_DATABASE.map((d) => d.city)));
    const allItinCities = itineraries.map((item) => item.city).filter(Boolean);
    return Array.from(new Set([...allStaticCities, ...allItinCities])).sort();
  }, [countryFilter, itineraries]);

  // Country Change handler
  const handleCountryChange = (country) => {
    setCountryFilter(country);
    if (country !== 'All' && cityFilter !== 'All') {
      const validCities = getCitiesByCountry(country);
      if (!validCities.map((c) => c.toLowerCase()).includes(cityFilter.toLowerCase())) {
        setCityFilter('All');
      }
    }
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setSearch('');
    setCountryFilter('All');
    setCityFilter('All');
    setSort('newest');
  };

  const hasActiveFilters = search !== '' || countryFilter !== 'All' || cityFilter !== 'All';

  // Filter and sort client-side
  useEffect(() => {
    let result = [...itineraries];

    // Filter by search
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          (item.destination && item.destination.toLowerCase().includes(query)) ||
          (item.customerName && item.customerName.toLowerCase().includes(query))
      );
    }

    // Filter by Country
    if (countryFilter && countryFilter !== 'All') {
      const cLower = countryFilter.toLowerCase();
      result = result.filter((item) => {
        if (item.country && item.country.toLowerCase() === cLower) return true;
        if (item.destination && item.destination.toLowerCase().includes(cLower)) return true;
        const citiesInCountry = getCitiesByCountry(countryFilter);
        return citiesInCountry.some(
          (city) => item.destination && item.destination.toLowerCase().includes(city.toLowerCase())
        );
      });
    }

    // Filter by City
    if (cityFilter && cityFilter !== 'All') {
      const cityLower = cityFilter.toLowerCase();
      result = result.filter((item) => {
        if (item.city && item.city.toLowerCase() === cityLower) return true;
        return item.destination && item.destination.toLowerCase().includes(cityLower);
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sort === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sort === 'amount-desc') {
        return (b.amount || 0) - (a.amount || 0);
      }
      if (sort === 'amount-asc') {
        return (a.amount || 0) - (b.amount || 0);
      }
      if (sort === 'duration-desc') {
        return (b.durationNights || 0) - (a.durationNights || 0);
      }
      if (sort === 'duration-asc') {
        return (a.durationNights || 0) - (b.durationNights || 0);
      }
      return 0;
    });

    setFilteredItineraries(result);
  }, [itineraries, search, sort, countryFilter, cityFilter]);

  // Open delete confirmation dialog
  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Execute delete after confirmation
  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    setDeleting(true);
    try {
      await remove(pendingDeleteId);
      setDeleteDialogOpen(false);
      setPendingDeleteId(null);
      fetchItineraries();
    } catch (error) {
      console.error('Failed to delete itinerary:', error);
      setErrorMsg('Failed to delete itinerary. Please try again.');
      setDeleteDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
  };

  // Get name of pending delete item for display
  const pendingDeleteName = pendingDeleteId
    ? (itineraries.find((i) => i.id === pendingDeleteId)?.name || 'this itinerary')
    : '';

  return (
    <div className="itinerary-module-wrapper">
      <ItineraryHeader
        searchVal={search}
        onSearchChange={setSearch}
        sortVal={sort}
        onSortChange={setSort}
        countryVal={countryFilter}
        onCountryChange={handleCountryChange}
        cityVal={cityFilter}
        onCityChange={setCityFilter}
        countriesList={availableCountries}
        citiesList={availableCities}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
        onCreateClick={() => navigate('/itinerary/build')}
      />

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setErrorMsg('')}>
          {errorMsg}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : filteredItineraries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px', background: '#fff', borderRadius: '16px', border: '1px solid #E6E9F0' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>No itineraries found</h3>
          <p style={{ margin: 0, color: '#6B7280' }}>Try adjusting your search or country/city filters.</p>
        </div>
      ) : (
        <div className="itinerary-grid">
          {filteredItineraries.map((itin, idx) => (
            <ItineraryCard
              key={itin.id}
              itinerary={itin}
              index={idx}
              onDelete={handleDelete}
              onEditBasic={() => navigate(`/itinerary/build/${itin.id}`)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
        PaperProps={{ style: { borderRadius: '14px', padding: '8px 4px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E293B', pb: 0.5 }}>
          Delete Itinerary
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Are you sure you want to delete <strong>"{pendingDeleteName}"</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: '8px' }}>
          <Button
            onClick={handleCancelDelete}
            disabled={deleting}
            sx={{ fontWeight: 700, color: '#64748B', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={deleting}
            variant="contained"
            sx={{
              background: '#DC2626',
              '&:hover': { background: '#B91C1C' },
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              minWidth: '90px'
            }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
