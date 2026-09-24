import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiTripadvisor } from 'react-icons/si';
import './Facility.css';

// =====================================================
// Local Assets
// =====================================================
import facilityImg1 from '../../assets/ShriJaganath.webp';
import facilityImg2 from '../../assets/Konar.webp';

const facilitySlides = [
  {
    id: 1,
    title: 'Finest Safety Systems',
    description:
      'Curabitur convallis enim at orci ullamcorper sagittis. Morbi porand gon nullalacu scelerisque in aliquam vitae, aliquam ut lectus. Nam utte mink Phasellus magna, efficitur finibus dictum auctor, volutpat gonet torrend accumsan purusDon luctus nunc non dapibus volutpat.',
    features: [
      'Travel Alerts and Registration',
      'Health and Medical Security',
      'Travel Documentation',
      'Money and Payment',
      'Transportation Security',
      'Local Knowledge Guide',
    ],
    image: facilityImg1,
  },
  {
    id: 2,
    title: 'Our Premises Services',
    description:
      'Curabitur convallis enim at orci ullamcorper sagittis. Morbi porand gon nullalacu scelerisque in aliquam vitae, aliquam ut lectus. Nam utte mink Phasellus magna, efficitur finibus dictum auctor, volutpat gonet torrend accumsan purusDon luctus nunc non dapibus volutpat.',
    features: [
      'Travel Alerts and Registration',
      'Health and Medical Security',
      'Travel Documentation',
      'Money and Payment',
      'Transportation Security',
      'Local Knowledge Guide',
    ],
    image: facilityImg2,
  },
];

const Facility = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = (newIndex) => {
    if (newIndex === currentSlide || isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide(newIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 450);
  };

  const handlePrev = () => {
    const prev =
      currentSlide === 0
        ? facilitySlides.length - 1
        : currentSlide - 1;

    handleSlideChange(prev);
  };

  const handleNext = () => {
    const next =
      currentSlide === facilitySlides.length - 1
        ? 0
        : currentSlide + 1;

    handleSlideChange(next);
  };

  const current = facilitySlides[currentSlide];

  return (
    <section className="facility-section">
      <div className="facility-container">

        {/* =====================================================
            LEFT CONTENT COLUMN
        ===================================================== */}
        <div
          className="facility-left-col"
          style={{
            '--bg-image': `url(${facilityImg1})`,
          }}
        >
          {/* Badge */}
          <div className="facility-badge">
            <span className="badge-arrow">➔</span>
            <span className="badge-text">Our Facility</span>
            <span className="badge-wave">✦</span>
          </div>

          {/* Slide Content */}
          <div
            className={`slide-content-wrapper ${
              isAnimating
                ? 'slide-fade-out'
                : 'slide-fade-in'
            }`}
          >
            <h2 className="facility-title">
              {current.title}
            </h2>

            <p className="facility-desc">
              {current.description}
            </p>

            {/* Features */}
            <div className="facility-features-grid">
              {current.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="feature-item"
                >
                  <span className="bullet-dot"></span>

                  <span className="feature-name">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================
              PAGINATION CONTROLS
          ===================================================== */}
          <div className="facility-pagination">

            {/* Previous */}
            <button
              type="button"
              className="page-arrow"
              onClick={handlePrev}
              aria-label="Previous Page"
            >
              <FaArrowLeft />
            </button>

            {/* Page Numbers */}
            <div className="page-numbers">

              <button
                type="button"
                className={`num-btn ${
                  currentSlide === 0 ? 'active' : ''
                }`}
                onClick={() => handleSlideChange(0)}
              >
                1
              </button>

              <span className="num-slash">/</span>

              <button
                type="button"
                className={`num-btn ${
                  currentSlide === 1 ? 'active' : ''
                }`}
                onClick={() => handleSlideChange(1)}
              >
                2
              </button>

            </div>

            {/* Next */}
            <button
              type="button"
              className="page-arrow"
              onClick={handleNext}
              aria-label="Next Page"
            >
              <FaArrowRight />
            </button>

          </div>
        </div>

        {/* =====================================================
            RIGHT IMAGE COLUMN
        ===================================================== */}
        <div className="facility-right-col">

          <div className="facility-img-wrapper">

            {/* Images */}
            {facilitySlides.map((slide, idx) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                className={`facility-main-img ${
                  idx === currentSlide ? 'active' : ''
                }`}
              />
            ))}

            {/* =====================================================
                Tripadvisor Badge
            ===================================================== */}
            <div className="tripadvisor-badge">
              <div className="ta-inner">

                <span className="ta-label-top">
                  Travellers'
                </span>

                <span className="ta-label-mid">
                  Choice
                </span>

                <SiTripadvisor className="ta-icon" />

                <span className="ta-label-bot">
                  Tripadvisor
                </span>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Facility;