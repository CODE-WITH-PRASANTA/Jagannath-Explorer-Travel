import React from 'react';
import './HotelRoomImages.css';

// React Icons
import { FaEye, FaPlus, FaPlayCircle } from 'react-icons/fa';

// WebP image imports from src/assets/
import photo1 from '../../assets/bed6.webp';
import photo2 from '../../assets/bed5.webp';
import photo3 from '../../assets/bed3.webp';
import photo4 from '../../assets/bed2.webp';
import photo5 from '../../assets/bed1.webp';

const HotelRoomImages = () => {
  return (
    <div className="HotelRoomImages">
      <div className="HotelRoomImages-container">
        
        {/* Left Featured Large Photo */}
        <div className="HotelRoomImages-mainCard">
          <img 
            src={photo1} 
            alt="Venice Canal" 
            className="HotelRoomImages-image" 
          />
          <div className="HotelRoomImages-overlay">
            <div className="HotelRoomImages-eyeIconWrapper">
              <FaEye className="HotelRoomImages-eyeIcon" />
            </div>
          </div>
        </div>

        {/* Right Side 2x2 Grid */}
        <div className="HotelRoomImages-grid">
          
          {/* Top-Left Small Photo */}
          <div className="HotelRoomImages-card">
            <img 
              src={photo2} 
              alt="Historic Town" 
              className="HotelRoomImages-image" 
            />
            <div className="HotelRoomImages-overlay" />
          </div>

          {/* Top-Right Small Photo */}
          <div className="HotelRoomImages-card">
            <img 
              src={photo3} 
              alt="Taj Mahal" 
              className="HotelRoomImages-image" 
            />
            <div className="HotelRoomImages-overlay" />
          </div>

          {/* Bottom-Left Overlay Photo: View More Images */}
          <div className="HotelRoomImages-card HotelRoomImages-actionCard">
            <img 
              src={photo4} 
              alt="Beach Swing" 
              className="HotelRoomImages-image" 
            />
            <div className="HotelRoomImages-staticOverlay">
              <FaPlus className="HotelRoomImages-actionIcon" />
              <span className="HotelRoomImages-actionText">View More Images</span>
            </div>
          </div>

          {/* Bottom-Right Overlay Photo: Watch Video */}
          <div className="HotelRoomImages-card HotelRoomImages-actionCard">
            <img 
              src={photo5} 
              alt="Resort Sunset" 
              className="HotelRoomImages-image" 
            />
            <div className="HotelRoomImages-staticOverlay">
              <FaPlayCircle className="HotelRoomImages-actionIcon HotelRoomImages-playIcon" />
              <span className="HotelRoomImages-actionText">Watch Video</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HotelRoomImages;