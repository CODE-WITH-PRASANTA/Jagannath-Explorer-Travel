import React, { useState, useEffect } from 'react';
import './Gallery.css';

import img1 from '../assets/images/gallery-1.jpg';
import img2 from '../assets/images/gallery-2.jpg';
import img3 from '../assets/images/gallery-3.jpg';
import img4 from '../assets/images/gallery-4.jpg';
import img5 from '../assets/images/gallery-5.jpg';
import img6 from '../assets/images/gallery-6.jpg';
import img7 from '../assets/images/gallery-7.jpg';
import img8 from '../assets/images/gallery-8.jpg';
import img9 from '../assets/images/gallery-9.jpg';

const galleryItems = [
  {
    id: 1,
    title: 'Discover Island',
    src: img1,
    alt: 'Colosseum Rome'
  },
  {
    id: 2,
    title: 'Tropical Emerald',
    src: img2,
    alt: 'Khao Sok Lake Thailand'
  },
  {
    id: 3,
    title: 'Venice Canal',
    src: img3,
    alt: 'Rialto Bridge Venice'
  },
  {
    id: 4,
    title: 'Ocean Fortress',
    src: img4,
    alt: 'Fortress Bridge Path'
  },
  {
    id: 5,
    title: 'Village Retreat',
    src: img5,
    alt: 'Couple Vacation Village'
  },
  {
    id: 6,
    title: 'Alpine Peak',
    src: img6,
    alt: 'Mountain Hiker'
  },
  {
    id: 7,
    title: 'Seaside Breakfast',
    src: img7,
    alt: 'Balcony Breakfast Ocean View'
  },
  {
    id: 8,
    title: 'Mediterranean Street',
    src: img8,
    alt: 'Decorated Mediterranean Alley'
  },
  {
    id: 9,
    title: 'Jungle River',
    src: img9,
    alt: 'Boat on Palm River'
  }
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const showNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext(e);
      if (e.key === 'ArrowLeft') showPrev(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section className="gallery">
      <div className="gallery__grid">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className="gallery__item"
            onClick={() => openLightbox(index)}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="gallery__image"
              loading="lazy"
            />
            <div className="gallery__overlay">
              <svg
                className="gallery__overlay-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
              <h3 className="gallery__overlay-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery__action">
        <button className="gallery__load-btn" type="button">
          Load More
        </button>
      </div>

      {activeIndex !== null && (
        <div className="gallery__lightbox" onClick={closeLightbox}>
          <button
            className="gallery__lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            &times;
          </button>

          <button
            className="gallery__lightbox-nav gallery__lightbox-nav--prev"
            onClick={showPrev}
            aria-label="Previous image"
          >
            &#10094;
          </button>

          <div
            className="gallery__lightbox-body"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[activeIndex].src}
              alt={galleryItems[activeIndex].alt}
              className="gallery__lightbox-image"
            />
            <h4 className="gallery__lightbox-title">
              {galleryItems[activeIndex].title}
            </h4>
          </div>

          <button
            className="gallery__lightbox-nav gallery__lightbox-nav--next"
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

export default Gallery;