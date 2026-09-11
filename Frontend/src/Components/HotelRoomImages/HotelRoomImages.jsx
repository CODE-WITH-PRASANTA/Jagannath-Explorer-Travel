import React, { useState, useEffect, useCallback } from 'react';
import './HotelRoomImages.css';
import { IMG_URL } from '../../api/axios';

// React Icons
import { FaEye, FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HotelRoomImages = ({ hotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const images = (hotel?.images || []).map((img) =>
    img.startsWith('http') || img.startsWith('blob:') ? img : `${IMG_URL}${img}`
  );

  const hotelName = hotel?.name || "Hotel Room";

  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = useCallback(() => {
    if (images.length > 0) {
      setModalIndex((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length > 0) {
      setModalIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  // Keyboard Navigation & Body Scroll Lock
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, nextImage, prevImage]);

  // If no image is available, do not show
  if (images.length === 0) {
    return null;
  }

  // If only 1 image available, show one image
  if (images.length === 1) {
    return (
      <>
        <div className="HotelRoomImages">
          <div className="HotelRoomImages-container HotelRoomImages-single">
            <div 
              className="HotelRoomImages-mainCard"
              onClick={() => openModal(0)}
            >
              <img 
                src={images[0]} 
                alt={`${hotelName} Main View`} 
                className="HotelRoomImages-image" 
              />
              <div className="HotelRoomImages-overlay">
                <div className="HotelRoomImages-eyeIconWrapper">
                  <FaEye className="HotelRoomImages-eyeIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Lightbox */}
        {isModalOpen && (
          <div className="HotelRoomImages-modal" onClick={closeModal}>
            <div className="HotelRoomImages-modalContent" onClick={(e) => e.stopPropagation()}>
              <button className="HotelRoomImages-modalCloseBtn" onClick={closeModal} aria-label="Close modal">
                <FaTimes />
              </button>
              <div className="HotelRoomImages-modalHeader">
                <span className="HotelRoomImages-modalTitle">{hotelName}</span>
                <span className="HotelRoomImages-modalCounter">1 / 1</span>
              </div>
              <div className="HotelRoomImages-modalSlide">
                <img src={images[0]} alt={hotelName} className="HotelRoomImages-modalImg" />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const mainImage = images[0];
  const sideImages = images.slice(1, 5); // Show up to 4 side images

  return (
    <>
      <div className="HotelRoomImages">
        <div className="HotelRoomImages-container">
          
          {/* Left Featured Large Photo */}
          <div 
            className="HotelRoomImages-mainCard"
            onClick={() => openModal(0)}
          >
            <img 
              src={mainImage} 
              alt={`${hotelName} Main View`} 
              className="HotelRoomImages-image" 
            />
            <div className="HotelRoomImages-overlay">
              <div className="HotelRoomImages-eyeIconWrapper">
                <FaEye className="HotelRoomImages-eyeIcon" />
              </div>
            </div>
          </div>

          {/* Right Side Grid */}
          <div 
            className="HotelRoomImages-grid"
            style={{
              gridTemplateColumns: sideImages.length <= 2 ? '1fr' : 'repeat(2, 1fr)',
              gridTemplateRows: sideImages.length === 1 ? '1fr' : 'repeat(2, 1fr)',
              height: '100%'
            }}
          >
            {sideImages.map((imgUrl, index) => {
              const actualIndex = index + 1;
              const isLastWithMore = actualIndex === 4 && images.length > 5;

              return (
                <div 
                  key={actualIndex}
                  className={`HotelRoomImages-card ${isLastWithMore ? 'HotelRoomImages-actionCard' : ''}`}
                  onClick={() => openModal(actualIndex)}
                >
                  <img 
                    src={imgUrl} 
                    alt={`${hotelName} Photo ${actualIndex + 1}`} 
                    className="HotelRoomImages-image" 
                  />

                  {isLastWithMore ? (
                    <div className="HotelRoomImages-staticOverlay">
                      <FaPlus className="HotelRoomImages-actionIcon" />
                      <span className="HotelRoomImages-actionText">+{images.length - 4} More</span>
                    </div>
                  ) : (
                    <div className="HotelRoomImages-overlay">
                      <div className="HotelRoomImages-eyeIconWrapper">
                        <FaEye className="HotelRoomImages-eyeIcon" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Modal Slideshow Lightbox */}
      {isModalOpen && (
        <div className="HotelRoomImages-modal" onClick={closeModal}>
          <div className="HotelRoomImages-modalContent" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Top Bar */}
            <div className="HotelRoomImages-modalHeader">
              <span className="HotelRoomImages-modalTitle">{hotelName}</span>
              <span className="HotelRoomImages-modalCounter">
                {modalIndex + 1} / {images.length}
              </span>
              <button 
                className="HotelRoomImages-modalCloseBtn" 
                onClick={closeModal} 
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* Main Slide Area with Arrows */}
            <div className="HotelRoomImages-modalSlide">
              <button 
                className="HotelRoomImages-modalNavBtn HotelRoomImages-modalPrev"
                onClick={prevImage}
                aria-label="Previous Image"
              >
                <FaChevronLeft />
              </button>

              <div className="HotelRoomImages-modalImgWrapper">
                <img 
                  src={images[modalIndex]} 
                  alt={`${hotelName} ${modalIndex + 1}`} 
                  className="HotelRoomImages-modalImg" 
                />
              </div>

              <button 
                className="HotelRoomImages-modalNavBtn HotelRoomImages-modalNext"
                onClick={nextImage}
                aria-label="Next Image"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Bottom Thumbnails Strip */}
            {images.length > 1 && (
              <div className="HotelRoomImages-modalThumbs">
                {images.map((thumbUrl, idx) => (
                  <button
                    key={idx}
                    className={`HotelRoomImages-thumbBtn ${idx === modalIndex ? 'HotelRoomImages-thumbActive' : ''}`}
                    onClick={() => setModalIndex(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    <img src={thumbUrl} alt="" className="HotelRoomImages-thumbImg" />
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default HotelRoomImages;