import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdMoreVert,
  MdModeEdit,
  MdRemoveRedEye,
  MdContentCopy,
  MdShare,
  MdBarChart,
  MdArrowForward,
  MdLandscape,
  MdWbSunny,
  MdPark,
  MdWaves
} from 'react-icons/md';
import { formatCurrency } from '@utils/formatters';

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';

const CARD_THEMES = [
  {
    themeClass: 'theme-purple',
    accentColor: '#6366F1',
    iconBg: '#EEF2FF',
    iconColor: '#4338CA',
    priceBg: '#EEF2FF',
    priceColor: '#3730A3',
    btnColor: '#6366F1',
    Icon: MdLandscape
  },
  {
    themeClass: 'theme-amber',
    accentColor: '#F59E0B',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    priceBg: '#FFFBEB',
    priceColor: '#78350F',
    btnColor: '#D97706',
    Icon: MdWbSunny
  },
  {
    themeClass: 'theme-emerald',
    accentColor: '#10B981',
    iconBg: '#D1FAE5',
    iconColor: '#047857',
    priceBg: '#ECFDF5',
    priceColor: '#065F46',
    btnColor: '#059669',
    Icon: MdPark
  },
  {
    themeClass: 'theme-cyan',
    accentColor: '#06B6D4',
    iconBg: '#CFFAFE',
    iconColor: '#0891B2',
    priceBg: '#F0F9FF',
    priceColor: '#075985',
    btnColor: '#0891B2',
    Icon: MdWaves
  }
];

export default function ItineraryCard({ itinerary, onDelete, onEditBasic, index = 0 }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const IconComponent = theme.Icon;

  const {
    id,
    name,
    destination,
    coverImage,
    durationNights = 3,
    durationDays = 4,
    adults = 2,
    children = 1,
    infants = 0,
    amount = 18500,
    travelDates = '15 - 18 Aug 2026',
    includedServices = 'Hotel • Cab • Flight'
  } = itinerary;

  const destinations = destination
    ? destination.split(',').map((d) => d.trim()).filter(Boolean)
    : [];
  const destinationText = destinations.length > 0 ? destinations.join(' • ') : 'Multiple Destinations';

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

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = () => setMenuOpen(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  const paxText = `${adults} ${adults === 1 ? 'Adult' : 'Adults'}${children > 0 ? ` • ${children} ${children === 1 ? 'Child' : 'Children'}` : ''}`;

  return (
    <div className={`itin-colorful-card ${theme.themeClass}`}>
      {/* Left Accent Bar */}
      <div className="itin-card-accent-bar" style={{ backgroundColor: theme.accentColor }} />

      {/* Left Image Section */}
      <div className="itin-card-left-image-box" onClick={handleTitleClick}>
        <img
          src={coverImage || DEFAULT_COVER}
          alt={name}
          className="itin-card-split-cover"
          onError={(e) => {
            e.target.src = DEFAULT_COVER;
          }}
        />

        {/* Duration Badge Layered on Image */}
        <div className="itin-card-image-overlays">
          <div className="itin-card-duration-badge">
            {durationNights} Nights • {durationDays} Days
          </div>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="itin-card-right-body">
        {/* Header Row: Theme Icon Avatar + Title + Menu */}
        <div className="itin-card-header-line">
          <div className="itin-card-avatar-title-group" onClick={handleTitleClick}>
            <div className="itin-card-avatar" style={{ backgroundColor: theme.iconBg, color: theme.iconColor }}>
              <IconComponent size={20} />
            </div>
            <h3 className="itin-card-split-title">{name}</h3>
          </div>

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

        {/* Location Row */}
        <div className="itin-card-location-row">
          <span className="location-pin-icon">📍</span>
          <span className="location-text">{destinationText}</span>
        </div>

        {/* Pax & Services Info Pill */}
        <div className="itin-card-meta-pill">
          <span className="meta-item">
            <span className="meta-icon">👥</span> {paxText}
          </span>
          <span className="meta-divider">|</span>
          <span className="meta-item">
            <span className="meta-icon">🏨</span> {includedServices}
          </span>
        </div>

        {/* Price Row Banner */}
        <div
          className="itin-card-price-banner"
          style={{ backgroundColor: theme.priceBg, color: theme.priceColor }}
          onClick={handleTitleClick}
        >
          <span className="price-val">{formatCurrency(amount)}</span>
          <div className="price-arrow-circle" style={{ color: theme.priceColor }}>
            <MdArrowForward size={16} />
          </div>
        </div>

        {/* Action Icon Row */}
        <div className="itin-card-action-bar">
          <button
            className="itin-icon-action-btn"
            title="Preview"
            onClick={handleTitleClick}
            style={{ color: theme.btnColor }}
          >
            <MdRemoveRedEye size={17} />
          </button>
          <button
            className="itin-icon-action-btn"
            title="Edit"
            onClick={(e) => handleMenuClick('build', e)}
            style={{ color: theme.btnColor }}
          >
            <MdModeEdit size={17} />
          </button>
          <button
            className="itin-icon-action-btn"
            title="Duplicate"
            onClick={(e) => handleMenuClick('edit', e)}
            style={{ color: theme.btnColor }}
          >
            <MdContentCopy size={17} />
          </button>
          <button
            className="itin-icon-action-btn"
            title="Share"
            onClick={(e) => handleMenuClick('build', e)}
            style={{ color: theme.btnColor }}
          >
            <MdShare size={17} />
          </button>
          <button
            className="itin-icon-action-btn"
            title="Analytics"
            onClick={(e) => handleMenuClick('build', e)}
            style={{ color: theme.btnColor }}
          >
            <MdBarChart size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
