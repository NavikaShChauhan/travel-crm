import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Alert } from '@mui/material';
import { getAll, remove } from '@/services/itinerary.service';
import ItineraryCard from '../components/ItineraryCard';
import ItineraryHeader from '../components/ItineraryHeader';
import '../styles/itinerary.css';

export default function ItineraryPage() {
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Header state
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

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
  }, [itineraries, search, sort]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this itinerary? This action cannot be undone.')) {
      try {
        await remove(id);
        fetchItineraries();
      } catch (error) {
        console.error('Failed to delete itinerary:', error);
        alert('Failed to delete itinerary.');
      }
    }
  };

  return (
    <div className="itinerary-module-wrapper">
      <ItineraryHeader
        searchVal={search}
        onSearchChange={setSearch}
        sortVal={sort}
        onSortChange={setSort}
        onCreateClick={() => navigate('/itinerary/build')}
      />

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
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
          <p style={{ margin: 0, color: '#6B7280' }}>Try adjusting your search filters or create a new itinerary.</p>
        </div>
      ) : (
        <div className="itinerary-grid">
          {filteredItineraries.map((itin) => (
            <ItineraryCard
              key={itin.id}
              itinerary={itin}
              onDelete={handleDelete}
              onEditBasic={() => navigate(`/itinerary/build/${itin.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
