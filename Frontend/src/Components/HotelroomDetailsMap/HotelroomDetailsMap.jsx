import React from 'react';
import './HotelroomDetailsMap.css';

// React Icons
import { FaDirections, FaExpand } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const HotelroomDetailsMap = () => {
  // Direct Google Maps View URL for New York, NY
  const mapsUrl = "https://www.google.com/maps/place/New+York,+NY,+USA";
  const directionsUrl = "https://www.google.com/maps/dir//New+York,+NY,+USA";

  return (
    <div className="HotelroomDetailsMap">
      <div className="HotelroomDetailsMap-container">
        
        {/* Section Heading */}
        <h2 className="HotelroomDetailsMap-heading">Location Map</h2>

        {/* Map Wrapper Card */}
        <div className="HotelroomDetailsMap-card">
          
          {/* Embedded Google Map Canvas */}
          <iframe
            title="Location Map"
            className="HotelroomDetailsMap-iframe"
            src="https://maps.google.com/maps?q=New%20York%2C%20NY%2C%20USA&t=m&z=11&output=embed&iwloc=near"
            loading="lazy"
            allowFullScreen
          ></iframe>

          {/* Top Left Location Info Card Overlay */}
          <div className="HotelroomDetailsMap-infoCard">
            <div className="HotelroomDetailsMap-infoText">
              <h3 className="HotelroomDetailsMap-locationTitle">New York</h3>
              <p className="HotelroomDetailsMap-locationSub">New York, NY, USA</p>
            </div>
            <div className="HotelroomDetailsMap-infoActions">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="HotelroomDetailsMap-actionBtn"
                title="View larger map"
              >
                <FiExternalLink className="HotelroomDetailsMap-icon" />
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="HotelroomDetailsMap-actionBtn"
                title="Get directions"
              >
                <FaDirections className="HotelroomDetailsMap-icon" />
              </a>
            </div>
          </div>

          {/* Bottom Left Satellite / Terrain Thumbnail */}
          <div className="HotelroomDetailsMap-thumbnail">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80" 
              alt="Map View" 
              className="HotelroomDetailsMap-thumbImg"
            />
          </div>

          {/* Google Logo Watermark */}
          <div className="HotelroomDetailsMap-watermark">
            <span className="HotelroomDetailsMap-googleLogo">Google</span>
          </div>

          {/* Bottom Right Fullscreen Toggle Button */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="HotelroomDetailsMap-fullscreenBtn"
            title="Toggle full screen"
          >
            <FaExpand className="HotelroomDetailsMap-expandIcon" />
          </a>

          {/* Bottom Bar Footer Controls */}
          <div className="HotelroomDetailsMap-footer">
            <span className="HotelroomDetailsMap-footerLink">Keyboard shortcuts</span>
            <span className="HotelroomDetailsMap-footerLink">Map data ©2026 Google</span>
            <span className="HotelroomDetailsMap-footerLink">Terms</span>
            <span className="HotelroomDetailsMap-footerLink">Report a map error</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelroomDetailsMap;