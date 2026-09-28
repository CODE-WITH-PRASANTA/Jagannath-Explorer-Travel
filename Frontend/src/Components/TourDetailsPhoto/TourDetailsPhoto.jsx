
import React from 'react';
import './TourDetailsPhoto.css';
import { IMG_URL } from '../../api/axios';

// React Icons
import { FaEye, FaPlus, FaPlayCircle } from 'react-icons/fa';

const TourDetailsPhoto = ({
  mainImage,
  galleryImages = [],
  videoUrl,
  title = 'Tour Package',
}) => {
  // Convert API image path into complete image URL
  const getFullImg = (img) => {
    if (!img || typeof img !== 'string') return null;

    if (
      img.startsWith('http://') ||
      img.startsWith('https://') ||
      img.startsWith('blob:') ||
      img.startsWith('data:')
    ) {
      return img;
    }

    return img.startsWith('/')
      ? `${IMG_URL}${img}`
      : `${IMG_URL}/${img}`;
  };

  // Main image from Admin Panel
  const mainPhoto = getFullImg(mainImage);

  // Gallery images from Admin Panel
  const gImages = Array.isArray(galleryImages)
    ? galleryImages
        .map(getFullImg)
        .filter(Boolean)
    : [];

  // Only use actual gallery images
  const photoSlot1 = gImages[0];
  const photoSlot2 = gImages[1];
  const photoSlot3 = gImages[2];
  const photoSlot4 = gImages[3];

  // Watch video
  const handleWatchVideo = () => {
    if (videoUrl) {
      const fullVideoUrl = getFullImg(videoUrl);

      window.open(
        fullVideoUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <div className="TourDetailsPhoto">
      <div className="TourDetailsPhoto-container">

        {/* =========================
            MAIN IMAGE
        ========================== */}
        {mainPhoto && (
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
        )}

        {/* =========================
            GALLERY IMAGES
        ========================== */}
        {gImages.length > 0 && (
          <div className="TourDetailsPhoto-grid">

            {/* Gallery Image 1 */}
            {photoSlot1 && (
              <div className="TourDetailsPhoto-card">
                <img
                  src={photoSlot1}
                  alt={`${title} view 1`}
                  className="TourDetailsPhoto-image"
                />

                <div className="TourDetailsPhoto-overlay" />
              </div>
            )}

            {/* Gallery Image 2 */}
            {photoSlot2 && (
              <div className="TourDetailsPhoto-card">
                <img
                  src={photoSlot2}
                  alt={`${title} view 2`}
                  className="TourDetailsPhoto-image"
                />

                <div className="TourDetailsPhoto-overlay" />
              </div>
            )}

            {/* Gallery Image 3 */}
            {photoSlot3 && (
              <div className="TourDetailsPhoto-card TourDetailsPhoto-actionCard">
                <img
                  src={photoSlot3}
                  alt={`${title} view 3`}
                  className="TourDetailsPhoto-image"
                />

                <div className="TourDetailsPhoto-staticOverlay">
                  <FaPlus className="TourDetailsPhoto-actionIcon" />

                  <span className="TourDetailsPhoto-actionText">
                    View More Images
                  </span>
                </div>
              </div>
            )}

            {/* Gallery Image 4 / Video */}
            {photoSlot4 && (
              <div
                className="TourDetailsPhoto-card TourDetailsPhoto-actionCard"
                onClick={videoUrl ? handleWatchVideo : undefined}
                style={{
                  cursor: videoUrl ? 'pointer' : 'default',
                }}
              >
                <img
                  src={photoSlot4}
                  alt={`${title} view 4`}
                  className="TourDetailsPhoto-image"
                />

                {videoUrl && (
                  <div className="TourDetailsPhoto-staticOverlay">
                    <FaPlayCircle
                      className="TourDetailsPhoto-actionIcon TourDetailsPhoto-playIcon"
                    />

                    <span className="TourDetailsPhoto-actionText">
                      Watch Video
                    </span>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default TourDetailsPhoto;

