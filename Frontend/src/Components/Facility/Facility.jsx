import React, { useState } from 'react';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiTripadvisor } from 'react-icons/si';
import './Facility.css';

// =====================================================
// Local Assets
// =====================================================
import facilityImg1 from '../../assets/koraput coffee (1).webp';
import facilityImg2 from '../../assets/eco retreat.webp';

// If you have a separate background image, import it like:
// import bgPattern from '../../assets/bg-pattern.webp';


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
            // Temporary: using first facility image as background
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

          {/* =====================================================
              UNIFIED RATING CARD
          ===================================================== */}
          <div className="floating-rating-panel">

            <div className="unified-rating-card">

              {/* =================================================
                  PART 1 — OVERALL RATING
              ================================================= */}
              <div className="rating-part">

                <h4 className="card-box-title">
                  Overall Rating
                </h4>

                <div className="rating-score-block">

                  <span className="big-score">
                    4.5
                  </span>

                  <span className="out-of-text">
                    out of 5
                  </span>

                </div>

                {/* Stars */}
                <div className="stars-row">

                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="yellow-star"
                    />
                  ))}

                  <span className="star-score-val">
                    4.5
                  </span>

                </div>

                {/* Review */}
                <div className="review-meta">

                  <span>
                    Based on 15171 independent review
                  </span>

                  <div className="mini-ta-dots">

                    <span className="ta-dot"></span>
                    <span className="ta-dot"></span>
                    <span className="ta-dot"></span>
                    <span className="ta-dot"></span>
                    <span className="ta-dot half"></span>

                  </div>

                </div>

              </div>

              {/* Divider */}
              <div className="card-inner-divider"></div>

              {/* =================================================
                  PART 2 — CUSTOMER EXPERIENCE
              ================================================= */}
              <div className="rating-part">

                <h4 className="card-box-title">
                  Customer Experience
                </h4>

                <p className="card-box-subtitle">
                  Curabitur convallis enim at orci
                  ullamcorper sagittis. Morbi nullalacu.
                </p>

                <div className="experience-breakdown">

                  {/* Experience Score */}
                  <div className="exp-score-box">

                    <span className="exp-big-score">
                      4.5
                    </span>

                    <span className="exp-out-of">
                      out of 5
                    </span>

                    <div className="exp-mini-stars">

                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}

                    </div>

                  </div>

                  {/* Progress Bars */}
                  <div className="progress-bars-list">

                    {/* 5 Star */}
                    <div className="bar-row">

                      <span className="star-num">
                        5 ★
                      </span>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: '85%' }}
                        ></div>
                      </div>

                      <span className="count-val">
                        9655
                      </span>

                    </div>

                    {/* 4 Star */}
                    <div className="bar-row">

                      <span className="star-num">
                        4 ★
                      </span>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: '45%' }}
                        ></div>
                      </div>

                      <span className="count-val">
                        3635
                      </span>

                    </div>

                    {/* 3 Star */}
                    <div className="bar-row">

                      <span className="star-num">
                        3 ★
                      </span>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: '20%' }}
                        ></div>
                      </div>

                      <span className="count-val">
                        907
                      </span>

                    </div>

                    {/* 2 Star */}
                    <div className="bar-row">

                      <span className="star-num">
                        2 ★
                      </span>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: '12%' }}
                        ></div>
                      </div>

                      <span className="count-val">
                        373
                      </span>

                    </div>

                    {/* 1 Star */}
                    <div className="bar-row">

                      <span className="star-num">
                        1 ★
                      </span>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: '5%' }}
                        ></div>
                      </div>

                      <span className="count-val">
                        198
                      </span>

                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Facility;