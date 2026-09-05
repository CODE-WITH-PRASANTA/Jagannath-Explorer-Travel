import React, { useState, useEffect, useCallback } from 'react';
import './GalleryMain.css';

import img1 from '../../assets/gallery-01.webp';
import img2 from '../../assets/gallery-02.webp';
import img3 from '../../assets/gallery-03.webp';
import img4 from '../../assets/gallery-04.webp';
import img5 from '../../assets/gallery-05.webp';
import img6 from '../../assets/gallery-06.webp';
import img7 from '../../assets/gallery-07.webp';
import img8 from '../../assets/gallery-08.webp';
import img9 from '../../assets/gallery-09.webp';

const initialGalleryData = [
  { id: 1, title: 'Discover Island', src: img1, alt: 'Colosseum Rome' },
  { id: 2, title: 'Tropical Emerald', src: img2, alt: 'Khao Sok Lake Thailand' },
  { id: 3, title: 'Venice Canal', src: img3, alt: 'Rialto Bridge Venice' },
  { id: 4, title: 'Ocean Fortress', src: img4, alt: 'Fortress Bridge Path' },
  { id: 5, title: 'Village Retreat', src: img5, alt: 'Couple Vacation Village' },
  { id: 6, title: 'Alpine Peak', src: img6, alt: 'Mountain Hiker' },
  { id: 7, title: 'Seaside Breakfast', src: img7, alt: 'Balcony Breakfast Ocean View' },
  { id: 8, title: 'Mediterranean Street', src: img8, alt: 'Decorated Mediterranean Alley' },
  { id: 9, title: 'Jungle River', src: img9, alt: 'Boat on Palm River' }
];

const ITEMS_PER_PAGE = 6;

const GalleryMain = () => {
  const [items, setItems] = useState(initialGalleryData);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [activeIndex, setActiveIndex] = useState(null);

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

          <div
            className="gallery-main__lightbox-body"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayedItems[activeIndex].src}
              alt={displayedItems[activeIndex].alt}
              className="gallery-main__lightbox-image"
            />
            <h4 className="gallery-main__lightbox-title">
              {displayedItems[activeIndex].title}
            </h4>
            <span className="gallery-main__lightbox-counter">
              {activeIndex + 1} / {displayedItems.length}
            </span>
          </div>

          <button
            className="gallery-main__lightbox-nav gallery-main__lightbox-nav--next"
            onClick={showNext}
            aria-label="Next image"
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
};

export default GalleryMain;