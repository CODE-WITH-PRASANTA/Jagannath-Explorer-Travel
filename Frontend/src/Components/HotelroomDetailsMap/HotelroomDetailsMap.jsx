import React from 'react';
import './HotelroomDetailsMap.css';

// React Icons
import { FaDirections, FaExpand } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const HotelroomDetailsMap = ({ hotel }) => {
  const city = hotel?.city || "Puri";
  const address = hotel?.address || (hotel ? `${hotel.city}, Odisha, India` : "Grand Road, Puri, Odisha, India");
  const encodedQuery = encodeURIComponent(`${city}, ${address}`);

  // Direct Google Maps View URL
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;

  return (
    <div className="HotelroomDetailsMap" id="see-map">
      <div className="HotelroomDetailsMap-container">
        
        {/* Section Heading */}
        <h2 className="HotelroomDetailsMap-heading">Location Map</h2>

        {/* Map Wrapper Card */}
        <div className="HotelroomDetailsMap-card">
          
          {/* Embedded Google Map Canvas */}
          <iframe
            title="Location Map"
            className="HotelroomDetailsMap-iframe"
            src={`https://maps.google.com/maps?q=${encodedQuery}&t=m&z=12&output=embed&iwloc=near`}
            loading="lazy"
            allowFullScreen
          ></iframe>

          {/* Top Left Location Info Card Overlay */}
          <div className="HotelroomDetailsMap-infoCard">
            <div className="HotelroomDetailsMap-infoText">
              <h3 className="HotelroomDetailsMap-locationTitle">{city}</h3>
              <p className="HotelroomDetailsMap-locationSub">{address}</p>
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