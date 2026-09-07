import React, { useState, useEffect, useCallback } from 'react';
import './GalleryMain.css';
import API, { IMG_URL } from "../../api/axios";

const ITEMS_PER_PAGE = 6;

const GalleryMain = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [activeIndex, setActiveIndex] = useState(null);

  // Fetch Gallery Data from Backend API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await API.get('/gallery');
        if (response.data && response.data.success) {
          // Map backend schema keys to match frontend expected structure
          const formattedGallery = response.data.data.map((item) => ({
            id: item._id,
            title: item.imageName,
            // Handle image path correctly, falling back to uploads path if not an absolute URL
            src: item.image && item.image.startsWith('http')
              ? item.image
              : `${IMG_URL || 'http://localhost:5000'}/uploads/gallery/${item.image}`,
            alt: item.imageName
          }));
          setItems(formattedGallery);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const displayedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const showNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % displayedItems.length);
  }, [displayedItems.length]);

  const showPrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + displayedItems.length) % displayedItems.length);
  }, [displayedItems.length]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, items.length));
  };

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, showNext, showPrev]);

  if (loading) {
    return <div className="gallery-main"><p style={{ textAlign: 'center', padding: '40px' }}>Loading gallery...</p></div>;
  }

  if (error) {
    return <div className="gallery-main"><p style={{ textAlign: 'center', color: 'red', padding: '40px' }}>{error}</p></div>;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="gallery-main">
      <div className="gallery-main__grid">
        {displayedItems.map((item, index) => (
          <article
            key={item.id}
            className="gallery-main__item"
            onClick={() => openLightbox(index)}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="gallery-main__image"
              loading="lazy"
            />
            <div className="gallery-main__overlay">
              <svg
                className="gallery-main__overlay-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
              <h3 className="gallery-main__overlay-title">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="gallery-main__action">
          <button
            className="gallery-main__load-btn"
            type="button"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}

      {activeIndex !== null && (
        <div
          className="gallery-main__lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          <div
            className="gallery-main__lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-main__lightbox-close"
              onClick={closeLightbox}
              aria-label="Close modal"
            >
              &times;
            </button>

            <button
              className="gallery-main__lightbox-nav gallery-main__lightbox-nav--prev"
              onClick={showPrev}
              aria-label="Previous image"
            >
              &#10094;
            </button>

            <div className="gallery-main__lightbox-img-wrapper">
              <img
                src={displayedItems[activeIndex].src}
                alt={displayedItems[activeIndex].alt}
                className="gallery-main__lightbox-image"
              />
            </div>

            <button
              className="gallery-main__lightbox-nav gallery-main__lightbox-nav--next"
              onClick={showNext}
              aria-label="Next image"
            >
              &#10095;
            </button>

            <div className="gallery-main__lightbox-info">
              <h4 className="gallery-main__lightbox-title">
                {displayedItems[activeIndex].title}
              </h4>
              <span className="gallery-main__lightbox-counter">
                {activeIndex + 1} / {displayedItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryMain;