import React from 'react';
import './TourDetailsPhoto.css';

// React Icons
import { FaEye, FaPlus, FaPlayCircle } from 'react-icons/fa';

// WebP image imports from src/assets/
import photo1 from '../../assets/img1.webp';
import photo2 from '../../assets/img4.webp';
import photo3 from '../../assets/img6.webp';
import photo4 from '../../assets/img5.webp';
import photo5 from '../../assets/img3.webp';

const TourDetailsPhoto = () => {
  return (
    <div className="TourDetailsPhoto">
      <div className="TourDetailsPhoto-container">
        
        {/* Left Featured Large Photo */}
        <div className="TourDetailsPhoto-mainCard">
          <img 
            src={photo1} 
            alt="Venice Canal" 
            className="TourDetailsPhoto-image" 
          />
          <div className="TourDetailsPhoto-overlay">
            <div className="TourDetailsPhoto-eyeIconWrapper">
              <FaEye className="TourDetailsPhoto-eyeIcon" />
            </div>
          </div>
        </div>

        {/* Right Side 2x2 Grid */}
        <div className="TourDetailsPhoto-grid">
          
          {/* Top-Left Small Photo */}
          <div className="TourDetailsPhoto-card">
            <img 
              src={photo2} 
              alt="Historic Town" 
              className="TourDetailsPhoto-image" 
            />
            <div className="TourDetailsPhoto-overlay" />
          </div>

          {/* Top-Right Small Photo */}
          <div className="TourDetailsPhoto-card">
            <img 
              src={photo3} 
              alt="Taj Mahal" 
              className="TourDetailsPhoto-image" 
            />
            <div className="TourDetailsPhoto-overlay" />
          </div>

          {/* Bottom-Left Overlay Photo: View More Images */}
          <div className="TourDetailsPhoto-card TourDetailsPhoto-actionCard">
            <img 
              src={photo4} 
              alt="Beach Swing" 
              className="TourDetailsPhoto-image" 
            />
            <div className="TourDetailsPhoto-staticOverlay">
              <FaPlus className="TourDetailsPhoto-actionIcon" />
              <span className="TourDetailsPhoto-actionText">View More Images</span>
            </div>
          </div>

          {/* Bottom-Right Overlay Photo: Watch Video */}
          <div className="TourDetailsPhoto-card TourDetailsPhoto-actionCard">
            <img 
              src={photo5} 
              alt="Resort Sunset" 
              className="TourDetailsPhoto-image" 
            />
            <div className="TourDetailsPhoto-staticOverlay">
              <FaPlayCircle className="TourDetailsPhoto-actionIcon TourDetailsPhoto-playIcon" />
              <span className="TourDetailsPhoto-actionText">Watch Video</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TourDetailsPhoto;