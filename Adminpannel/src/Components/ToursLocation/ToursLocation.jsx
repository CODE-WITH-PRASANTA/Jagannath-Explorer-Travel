import React, { useState } from 'react';
import './ToursLocation.css';

const ToursLocation = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [address, setAddress] = useState('New York, USA');
  const [coordinates, setCoordinates] = useState('40.7128, -74.0060');

  const encodedAddress = encodeURIComponent(address.trim() || 'New York, USA');
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="ToursLocation-wrapper">
      <div className="ToursLocation-card">
        {/* Accordion Header */}
        <div 
          className="ToursLocation-header" 
          onClick={() => setIsOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsOpen((prev) => !prev)}
        >
          <div className="ToursLocation-header-left">
            <h2 className="ToursLocation-header-title">4. Location</h2>
          </div>
          <button 
            type="button" 
            className="ToursLocation-toggle-button" 
            aria-label={isOpen ? "Collapse section" : "Expand section"}
          >
            <svg
              className={`ToursLocation-chevron ${isOpen ? 'ToursLocation-open' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="ToursLocation-body">
            <h3 className="ToursLocation-section-label">Location Map</h3>

            {/* Dark Map Canvas */}
            <div className="ToursLocation-map-container">
              <iframe
                title="Location Preview Map"
                className="ToursLocation-map-frame"
                src={mapEmbedUrl}
                loading="lazy"
              />

              {/* Floating Location Card Overlay */}
              <div className="ToursLocation-map-badge-card">
                <div className="ToursLocation-badge-details">
                  <span className="ToursLocation-badge-name">
                    {address.split(',')[0] || 'New York'}
                  </span>
                  <span className="ToursLocation-badge-sub">
                    {address || 'New York, NY, USA'}
                  </span>
                </div>
                <div className="ToursLocation-badge-icons">
                  <a
                    href={`https://maps.google.com/?q=${encodedAddress}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ToursLocation-badge-btn"
                    title="Open in Google Maps"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                  <button type="button" className="ToursLocation-badge-btn" title="Navigation">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom-Left Thumbnail Tile */}
              <div className="ToursLocation-map-tile-preview">
                <div className="ToursLocation-tile-inner" />
              </div>

              {/* Bottom-Right Zoom Controls */}
              <div className="ToursLocation-map-zoom-controls">
                <button type="button" className="ToursLocation-zoom-btn" title="Zoom in">+</button>
                <div className="ToursLocation-zoom-divider" />
                <button type="button" className="ToursLocation-zoom-btn" title="Zoom out">−</button>
              </div>

              {/* Map Footer Bar */}
              <div className="ToursLocation-map-attribution">
                <span>Keyboard shortcuts</span>
                <span>Map data ©2024 Google</span>
                <span>Terms</span>
                <span>Report a map error</span>
              </div>
            </div>

            {/* Input Form Fields */}
            <div className="ToursLocation-fields-grid">
              <div className="ToursLocation-field-group">
                <label htmlFor="address-input" className="ToursLocation-field-title">
                  Address
                </label>
                <input
                  id="address-input"
                  type="text"
                  className="ToursLocation-input-control"
                  placeholder="e.g. New York, USA"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="ToursLocation-field-group">
                <label htmlFor="coordinates-input" className="ToursLocation-field-title">
                  Coordinates <span className="ToursLocation-field-optional">(Optional)</span>
                </label>
                <input
                  id="coordinates-input"
                  type="text"
                  className="ToursLocation-input-control"
                  placeholder="40.7128, -74.0060"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursLocation;