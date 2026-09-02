import React from 'react';
import './TourDetailsMap.css';

// React Icons
import { FaDirections, FaExpand } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const TourDetailsMap = () => {
  // Direct Google Maps View URL for New York, NY
  const mapsUrl = "https://www.google.com/maps/place/New+York,+NY,+USA";
  const directionsUrl = "https://www.google.com/maps/dir//New+York,+NY,+USA";

  return (
    <div className="TourDetailsMap">
      <div className="TourDetailsMap-container">
        
        {/* Section Heading */}
        <h2 className="TourDetailsMap-heading">Location Map</h2>

        {/* Map Wrapper Card */}
        <div className="TourDetailsMap-card">
          
          {/* Embedded Google Map Canvas */}
          <iframe
            title="Location Map"
            className="TourDetailsMap-iframe"
            src="https://maps.google.com/maps?q=New%20York%2C%20NY%2C%20USA&t=m&z=11&output=embed&iwloc=near"
            loading="lazy"
            allowFullScreen
          ></iframe>

          {/* Top Left Location Info Card Overlay */}
          <div className="TourDetailsMap-infoCard">
            <div className="TourDetailsMap-infoText">
              <h3 className="TourDetailsMap-locationTitle">New York</h3>
              <p className="TourDetailsMap-locationSub">New York, NY, USA</p>
            </div>
            <div className="TourDetailsMap-infoActions">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="TourDetailsMap-actionBtn"
                title="View larger map"
              >
                <FiExternalLink className="TourDetailsMap-icon" />
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="TourDetailsMap-actionBtn"
                title="Get directions"
              >
                <FaDirections className="TourDetailsMap-icon" />
              </a>
            </div>
          </div>

          {/* Bottom Left Satellite / Terrain Thumbnail */}
          <div className="TourDetailsMap-thumbnail">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80" 
              alt="Map View" 
              className="TourDetailsMap-thumbImg"
            />
          </div>

          {/* Google Logo Watermark */}
          <div className="TourDetailsMap-watermark">
            <span className="TourDetailsMap-googleLogo">Google</span>
          </div>

          {/* Bottom Right Fullscreen Toggle Button */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="TourDetailsMap-fullscreenBtn"
            title="Toggle full screen"
          >
            <FaExpand className="TourDetailsMap-expandIcon" />
          </a>

          {/* Bottom Bar Footer Controls */}
          <div className="TourDetailsMap-footer">
            <span className="TourDetailsMap-footerLink">Keyboard shortcuts</span>
            <span className="TourDetailsMap-footerLink">Map data ©2026 Google</span>
            <span className="TourDetailsMap-footerLink">Terms</span>
            <span className="TourDetailsMap-footerLink">Report a map error</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourDetailsMap;