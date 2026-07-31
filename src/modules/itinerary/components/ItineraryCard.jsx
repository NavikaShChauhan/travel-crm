import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdMoreVert, MdModeEdit, MdMap, MdDeleteOutline } from 'react-icons/md';
import { formatCurrency } from '@utils/formatters';

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';

export default function ItineraryCard({ itinerary, onDelete, onEditBasic }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    id,
    name,
    destination,
    coverImage,
    durationNights,
    durationDays,
    adults = 2,
    children = 0,
    infants = 0,
    amount = 0
  } = itinerary;

  // Split destinations by comma or render single destination
  const destinations = destination
    ? destination.split(',').map((d) => d.trim()).filter(Boolean)
    : [];

  const handleTitleClick = () => {
    navigate(`/itinerary/build/${id}`);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (action, e) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (action === 'build') {
      navigate(`/itinerary/build/${id}`);
    } else if (action === 'edit') {
      if (onEditBasic) onEditBasic(itinerary);
    } else if (action === 'delete') {
      if (onDelete) onDelete(id);
    }
  };

  // Close menu on click outside
  React.useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = () => setMenuOpen(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  return (
    <div className="itin-card">
      <div className="itin-card-cover-container" onClick={handleTitleClick}>
        <img
          src={coverImage || DEFAULT_COVER}
          alt={name}
          className="itin-card-cover"
          onError={(e) => {
            e.target.src = DEFAULT_COVER;
          }}
        />
      </div>

      <div className="itin-card-content">
        <div className="itin-card-header-row">
          <h3 className="itin-card-title" onClick={handleTitleClick}>
            {name}
          </h3>
          <div style={{ position: 'relative' }}>
            <button className="itin-card-menu-btn" onClick={toggleMenu} title="Actions">
              <MdMoreVert size={20} />
            </button>
            {menuOpen && (
              <div className="itin-service-dropdown-actions" style={{ right: 0, top: '100%', minWidth: 160 }}>
                <button className="itin-action-menu-item" onClick={(e) => handleMenuClick('build', e)}>
                  Edit Day-by-Day Plan
                </button>
                <button className="itin-action-menu-item" onClick={(e) => handleMenuClick('edit', e)}>
                  Edit Basic Info
                </button>
                <button className="itin-action-menu-item delete" onClick={(e) => handleMenuClick('delete', e)}>
                  Delete Itinerary
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Destination Tag Pills */}
        <div className="itin-card-tags">
          {destinations.length > 0 ? (
            destinations.map((dest, idx) => (
              <span key={idx} className="itin-tag">
                {dest}
              </span>
            ))
          ) : (
            <span className="itin-tag" style={{ background: '#F3F4F6', color: '#6B7280' }}>
              No Destination
            </span>
          )}
        </div>

        {/* 3-column Detail Box */}
        <div className="itin-card-details-box">
          <div className="itin-card-detail-col">
            <span className="itin-card-detail-label">Duration</span>
            <span className="itin-card-detail-value">{durationNights} Nights</span>
            <span className="itin-card-detail-sub">{durationDays} Days</span>
          </div>

          <div className="itin-card-detail-col">
            <span className="itin-card-detail-label">Pax</span>
            <span className="itin-card-detail-value">
              {adults}A {children}C {infants}I
            </span>
          </div>

          <div className="itin-card-detail-col">
            <span className="itin-card-detail-label">Total Price</span>
            <span className="itin-card-detail-value price">
              {formatCurrency(amount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
