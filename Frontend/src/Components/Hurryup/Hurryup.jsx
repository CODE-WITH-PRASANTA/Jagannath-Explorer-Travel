import React from 'react';
import './Hurryup.css';

// ================================================================
// Dummy / Online Images
// ================================================================
const dummyImages = {
  hiker:
    'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&auto=format&fit=crop&q=80',

  kayak:
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',

  honeymoon:
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=80',

  familyLake:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
};

const Hurryup = () => {
  // ================================================================
  // Booking Handler
  // ================================================================
  const handleBooking = (dealName) => {
    alert(`Redirecting to booking for: ${dealName}`);
  };

  return (
    <section className="hurryup-section">
      {/* ============================================================
          Background Pine Tree Illustration
      ============================================================ */}
      <div className="bg-trees-art" aria-hidden="true">
        <svg
          viewBox="0 0 100 160"
          fill="none"
          stroke="#e3ece1"
          strokeWidth="1.6"
        >
          <path d="M40 30 L50 15 L60 30 L55 30 L66 45 L58 45 L72 65 L28 65 L42 45 L34 45 L45 30 Z M50 65 L50 80" />

          <path d="M15 70 L22 55 L29 70 L26 70 L34 85 L28 85 L38 105 L2 105 L12 85 L6 85 L14 70 Z M20 105 L20 120" />
        </svg>
      </div>

      <div className="hurryup-container">
        {/* ============================================================
            Header
        ============================================================ */}
        <div className="hurryup-header">
          <div className="hurryup-badge">
            <span className="badge-arrow">➔</span>

            <span>Hurry Up</span>

            <span className="badge-sparkle">✦</span>
          </div>

          <h2 className="hurryup-main-title">
            Phenomenal Deals Offered
          </h2>
        </div>

        {/* ============================================================
            3 Column Deals Grid
        ============================================================ */}
        <div className="deals-grid">

          {/* ==========================================================
              CARD 1 - TALL LEFT CARD
              20% OFF
          ========================================================== */}
          <div className="deal-card card-tall-left">
            <div className="card-img-container">
              <img
                src={dummyImages.hiker}
                alt="Hiker exploring mountain peak"
                className="deal-bg-img"
              />

              <div className="inner-border-line"></div>
            </div>

            {/* Torn Paper Green Bottom Overlay */}
            <div className="torn-overlay green-torn">
              <svg
                className="torn-paper-svg"
                viewBox="0 0 500 40"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,40 L0,18 Q30,5 65,22 T140,12 T210,24 T280,10 T360,25 T440,14 T500,20 L500,40 Z"
                  fill="#5da943"
                />
              </svg>

              <div className="torn-content">
                <span className="script-subtitle">
                  Savings worldwide
                </span>

                <h3 className="discount-title">
                  20% Off
                </h3>

                <p className="deal-action-text">
                  Discover Great Deal
                </p>
              </div>
            </div>
          </div>

          {/* ==========================================================
              MIDDLE COLUMN
              2 STACKED CARDS
          ========================================================== */}
          <div className="middle-stacked-col">

            {/* ========================================================
                CARD 2 - COUPLE TOUR
            ======================================================== */}
            <div className="deal-card card-mid-top">
              <div className="card-img-container">
                <img
                  src={dummyImages.kayak}
                  alt="Couple kayaking in serene lake"
                  className="deal-bg-img"
                />
              </div>

              {/* Brown Torn Paper Overlay */}
              <div className="torn-overlay brown-torn">
                <svg
                  className="torn-paper-svg"
                  viewBox="0 0 500 35"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,35 L0,14 Q40,2 80,18 T170,10 T250,22 T330,8 T410,20 T500,12 L500,35 Z"
                    fill="#bd6a37"
                  />
                </svg>

                <div className="torn-content horizontal-layout">
                  <div className="text-group">
                    <span className="script-subtitle">
                      Couple Tour
                    </span>

                    <h4 className="location-heading">
                      4 Days In Switzerland
                    </h4>
                  </div>

                  <div className="round-badge-disc">
                    <span>50%</span>
                    <small>Off</small>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================
                CARD 3 - HONEYMOON TOUR
            ======================================================== */}
            <div className="deal-card card-mid-bottom">
              <div className="card-img-container curve-right-img">
                <img
                  src={dummyImages.honeymoon}
                  alt="Couple walking in European city square"
                  className="deal-bg-img"
                />
              </div>

              {/* Dark Green Wave Panel */}
              <div className="wave-panel dark-green-panel">
                <span className="script-subtitle">
                  Honeymoon Tour
                </span>

                <h4 className="panel-heading">
                  Enjoy{' '}
                  <span className="yellow-accent">
                    40% Off
                  </span>
                </h4>

                <p className="panel-sub">
                  2 Country & 15 Location
                </p>

                <button
                  type="button"
                  className="btn-pill-orange"
                  onClick={() =>
                    handleBooking('Honeymoon Tour 40% Off')
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* ==========================================================
              CARD 4 - TALL RIGHT CARD
              50% OFF
          ========================================================== */}
          <div className="deal-card card-tall-right">

            {/* ========================================================
                Top Yellow Banner
            ======================================================== */}
            <div className="yellow-top-banner">
              <div className="banner-text-left">
                <span className="script-subtitle dark-script">
                  ➔ Savings worldwide
                </span>

                <h3 className="banner-heading">
                  50% Off
                </h3>

                <p className="banner-sub">
                  For Your First Book
                </p>
              </div>

              <button
                type="button"
                className="btn-green-book"
                onClick={() =>
                  handleBooking('First Book 50% Off')
                }
              >
                Book Now
              </button>

              {/* Bottom Torn Wave */}
              <svg
                className="torn-paper-bottom-svg"
                viewBox="0 0 500 30"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 L500,0 L500,12 Q420,26 350,15 T200,24 T70,12 T0,18 Z"
                  fill="#fca834"
                />
              </svg>
            </div>

            {/* ========================================================
                Bottom Image
            ======================================================== */}
            <div className="card-img-container bottom-img-half">
              <img
                src={dummyImages.familyLake}
                alt="Family sitting near lakeside with dog"
                className="deal-bg-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hurryup;