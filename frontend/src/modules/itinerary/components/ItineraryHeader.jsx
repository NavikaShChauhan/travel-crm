import React, { useState, useEffect, useRef } from 'react';
import { MdSearch, MdAdd, MdFilterList, MdExpandMore } from 'react-icons/md';

export default function ItineraryHeader({
  searchVal,
  onSearchChange,
  sortVal,
  onSortChange,
  onCreateClick,
  countryVal = 'All',
  onCountryChange,
  cityVal = 'All',
  onCityChange,
  countriesList = [],
  citiesList = [],
  onClearFilters,
  hasActiveFilters = false
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Close filter popover on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeFilterCount = (countryVal !== 'All' ? 1 : 0) + (cityVal !== 'All' ? 1 : 0);

  return (
    <div className="itinerary-page-header">
      <div className="itin-header-top-row">
        <div className="itin-header-titles">
          <h1>Itineraries</h1>
          <p>All itineraries created across your team</p>
        </div>
        <button className="btn-coral" onClick={onCreateClick}>
          <MdAdd size={20} />
          Create itinerary
        </button>
      </div>

      <div className="itin-search-filter-panel">
        <div className="itin-search-input-wrapper">
          <MdSearch className="itin-search-icon" />
          <input
            type="text"
            className="itin-search-input"
            placeholder="Search by name, ID or destination..."
            value={searchVal}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* SINGLE FILTER BUTTON */}
        <div className="itin-single-filter-wrapper" ref={filterRef} style={{ position: 'relative' }}>
          <button
            className={`itin-filter-main-btn ${activeFilterCount > 0 ? 'active' : ''}`}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <MdFilterList size={18} />
            <span>Filter</span>
            {activeFilterCount > 0 && <span className="itin-filter-badge">{activeFilterCount}</span>}
            <MdExpandMore size={18} />
          </button>

          {/* Filter Popover Content */}
          {filterOpen && (
            <div className="itin-filter-popover">
              <div className="itin-filter-popover-header">
                <span>Filter Itineraries</span>
                {activeFilterCount > 0 && (
                  <button className="btn-reset-text" onClick={onClearFilters}>
                    Clear all
                  </button>
                )}
              </div>

              <div className="itin-filter-field-group">
                <label className="itin-filter-label">Country</label>
                <select
                  className="itin-filter-select"
                  value={countryVal}
                  onChange={(e) => onCountryChange && onCountryChange(e.target.value)}
                >
                  <option value="All">All Countries</option>
                  {countriesList.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="itin-filter-field-group">
                <label className="itin-filter-label">City</label>
                <select
                  className="itin-filter-select"
                  value={cityVal}
                  onChange={(e) => onCityChange && onCityChange(e.target.value)}
                >
                  <option value="All">All Cities</option>
                  {citiesList.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Sort Select */}
        <select
          className="itin-sort-select"
          value={sortVal}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Sort: Newest created</option>
          <option value="oldest">Sort: Oldest created</option>
          <option value="amount-desc">Sort: Price (High to Low)</option>
          <option value="amount-asc">Sort: Price (Low to High)</option>
          <option value="duration-desc">Sort: Duration (Longest)</option>
          <option value="duration-asc">Sort: Duration (Shortest)</option>
        </select>
      </div>
    </div>
  );
}
