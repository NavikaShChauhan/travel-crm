import React from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';

export default function ItineraryHeader({
  searchVal,
  onSearchChange,
  sortVal,
  onSortChange,
  onCreateClick,
  onFilterClick
}) {
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
