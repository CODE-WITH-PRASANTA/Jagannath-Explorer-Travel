import React from 'react';
import './TourDetailsPhoto.css';
import { IMG_URL } from '../../api/axios';

// React Icons
import { FaEye, FaPlus, FaPlayCircle } from 'react-icons/fa';

// WebP image imports from src/assets/
import photo1 from '../../assets/img1.webp';
import photo2 from '../../assets/img4.webp';
import photo3 from '../../assets/img6.webp';
import photo4 from '../../assets/img5.webp';
import photo5 from '../../assets/img3.webp';

const TourDetailsPhoto = ({ mainImage, galleryImages = [], videoUrl, title = 'Tour Package' }) => {
  const getFullImg = (img) => {
    if (!img || typeof img !== 'string') return null;
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('blob:') || img.startsWith('data:')) return img;
    return img.startsWith('/') ? `${IMG_URL}${img}` : `${IMG_URL}/${img}`;
  };

  const mainPhoto = getFullImg(mainImage) || (galleryImages.length > 0 ? getFullImg(galleryImages[0]) : photo1);
  const gImages = Array.isArray(galleryImages) ? galleryImages.map(getFullImg).filter(Boolean) : [];

  const photoSlot1 = gImages[0] || photo2;
  const photoSlot2 = gImages[1] || photo3;
  const photoSlot3 = gImages[2] || photo4;
  const photoSlot4 = gImages[3] || photo5;

  const handleWatchVideo = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="TourDetailsPhoto">
      <div className="TourDetailsPhoto-container">
        
        {/* Left Featured Large Photo */}
        <div className="TourDetailsPhoto-mainCard">
          <img 
            src={mainPhoto} 
            alt={title} 
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
              src={photoSlot1} 
              alt={`${title} view 1`} 
              className="TourDetailsPhoto-image" 
            />
            <div className="TourDetailsPhoto-overlay" />
          </div>

          {/* Top-Right Small Photo */}
          <div className="TourDetailsPhoto-card">
            <img 
              src={photoSlot2} 
              alt={`${title} view 2`} 
              className="TourDetailsPhoto-image" 
            />
            <div className="TourDetailsPhoto-overlay" />
          </div>

          {/* Bottom-Left Overlay Photo: View More Images */}
          <div className="TourDetailsPhoto-card TourDetailsPhoto-actionCard">
            <img 
              src={photoSlot3} 
              alt={`${title} view 3`} 
              className="TourDetailsPhoto-image" 
            />
            <div className="TourDetailsPhoto-staticOverlay">
              <FaPlus className="TourDetailsPhoto-actionIcon" />
              <span className="TourDetailsPhoto-actionText">View More Images</span>
            </div>
          </div>

          {/* Bottom-Right Overlay Photo: Watch Video */}
          <div 
            className="TourDetailsPhoto-card TourDetailsPhoto-actionCard"
            onClick={videoUrl ? handleWatchVideo : undefined}
            style={{ cursor: videoUrl ? 'pointer' : 'default' }}
          >
            <img 
              src={photoSlot4} 
              alt={`${title} view 4`} 
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