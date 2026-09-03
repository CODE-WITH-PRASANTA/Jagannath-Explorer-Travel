import React, { useState, useRef } from "react";
import "./SmlBus.css";
import busImg1 from "../../assets/Bus1.webp";
import busImg2 from "../../assets/Bus2.webp";
import busImg3 from "../../assets/Bus3.webp";
import busImg4 from "../../assets/Bus4.webp";
import busImg5 from "../../assets/Bus5.webp";

const SML_BUS_LIST = [
  {
    id: 1,
    title: "SML Coach - 13 Seater",
    ac: "Optional (AC / Non-AC)",
    seatingType: "Fixed / Basic Pushback Seats",
    comfortLevel: "Basic",
    bestFor: "Family Trips / Small Groups",
    price: "8000",
    image: busImg1,
    features: ["Compact Design", "City Friendly", "Reliable Performance"]
  },
  {
    id: 2,
    title: "SML Coach - 19 Seater",
    ac: "Available (Roof-mounted AC)",
    seatingType: "Pushback Seats",
    comfortLevel: "Moderate",
    bestFor: "Corporate Travel / Group Trips",
    price: "10000",
    image: busImg2,
    features: ["Spacious Cabin", "Overhead Luggage", "Comfort Ride"]
  },
  {
    id: 3,
    title: "SML Coach - 22 Seater",
    ac: "Available (Full AC Coach)",
    seatingType: "Pushback Seats",
    comfortLevel: "Moderate",
    bestFor: "Tours / School Trips",
    price: "13000",
    image: busImg3,
    features: ["Ample Legroom", "Wide Windows", "Smooth Suspension"]
  },
  {
    id: 4,
    title: "SML Coach - 28 Seater",
    ac: "Full AC Coach",
    seatingType: "Recliner / Pushback Seats",
    comfortLevel: "Good",
    bestFor: "Tour Groups / Events",
    price: "17000",
    image: busImg4,
    features: ["Executive Recliners", "Entertainment System", "Deep Luggage Boot"]
  },
  {
    id: 5,
    title: "SML Coach - 36 Seater",
    ac: "Full AC Coach",
    seatingType: "Pushback Seats",
    comfortLevel: "Standard",
    bestFor: "Long Tours / Large Groups",
    price: "18000",
    image: busImg5,
    features: ["Max Capacity", "High Deck View", "Long Distance Ready"]
  }
];

const ITEMS_PER_DESKTOP_PAGE = 3;

const SmlBus = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [modalBus, setModalBus] = useState(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openModal = (bus) => setModalBus(bus);
  const closeModal = () => setModalBus(null);

  const totalDesktopPages = Math.ceil(SML_BUS_LIST.length / ITEMS_PER_DESKTOP_PAGE);
  const currentDesktopBuses = SML_BUS_LIST.slice(
    desktopPage * ITEMS_PER_DESKTOP_PAGE,
    (desktopPage + 1) * ITEMS_PER_DESKTOP_PAGE
  );

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const SWIPE_THRESHOLD = 45;

    if (distance > SWIPE_THRESHOLD) {
      setMobileIndex((prev) => Math.min(prev + 1, SML_BUS_LIST.length - 1));
    } else if (distance < -SWIPE_THRESHOLD) {
      setMobileIndex((prev) => Math.max(prev - 1, 0));
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="smlbus-section">
      <div className="smlbus-container">

        {/* Header Area */}
        <div className="smlbus-header-area">
          <span className="smlbus-subtitle">✦ SML COACH FLEET ✦</span>
          <h2 className="smlbus-main-title">
            Comfortable SML Coach for <span>Vehicle Rental Near Me</span> in Bhubaneswar
          </h2>
          <div className="smlbus-title-divider">
            <span></span>
            <i>❦</i>
            <span></span>
          </div>
          <p className="smlbus-description">
            <strong>Best cab rental in Bhubaneswar</strong> for local travel, outstation trips, and airport transfers with clean cars and professional drivers. Book <strong>Cab Taxi Service in Bhubaneswar</strong> for quick, safe, and comfortable city travel at any time. Get easy <strong>Taxi and Cab Service in Bhubaneswar</strong> for local trips, airport drop, and outstation travel with smooth rides.
          </p>
        </div>

        {/* Desktop View: Grid (3 Cards per Page) */}
        <div className="smlbus-desktop-grid-wrapper">
          <div className="smlbus-grid smlbus-desktop-grid">
            {currentDesktopBuses.map((bus) => {
              const isFlipped = !!flippedCards[bus.id];
              return (
                <div key={bus.id} className="smlbus-card-wrapper">
                  <div className={`smlbus-card-inner ${isFlipped ? "is-flipped" : ""}`}>

                    {/* FRONT SIDE */}
                    <div className="smlbus-card-face smlbus-card-front">
                      <div
                        className="smlbus-image-wrapper"
                        onClick={() => openModal(bus)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Preview ${bus.title}`}
                      >
                        <img src={bus.image} alt={bus.title} className="smlbus-img" />
                        <div className="smlbus-badge-tag">Verified Fleet</div>
                        <div className="smlbus-zoom-hint">
                          <span>⤢ Tap to Preview</span>
                        </div>
                      </div>

                      <div className="smlbus-front-content">
                        <h3 className="smlbus-card-title">{bus.title}</h3>

                        <div className="smlbus-specs-preview">
                          <div className="smlbus-spec-row">
                            <span>A/C</span>
                            <strong>{bus.ac}</strong>
                          </div>
                          <div className="smlbus-spec-row">
                            <span>Best For</span>
                            <strong>{bus.bestFor}</strong>
                          </div>
                        </div>

                        <div className="smlbus-card-footer">
                          <div className="smlbus-price-box">
                            <strong>₹{bus.price}</strong>
                            <span>/ 8 Hours</span>
                          </div>
                          <button className="smlbus-action-btn" onClick={() => handleFlip(bus.id)}>
                            View Specs ↺
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="smlbus-card-face smlbus-card-back">
                      <div className="smlbus-back-header">
                        <h3 className="smlbus-card-title">{bus.title}</h3>
                        <button className="smlbus-close-btn" onClick={() => handleFlip(bus.id)}>
                          ✕ Back
                        </button>
                      </div>

                      <div className="smlbus-specs-list">
                        <div className="smlbus-spec-row">
                          <span>A/C</span>
                          <strong>{bus.ac}</strong>
                        </div>
                        <div className="smlbus-spec-row">
                          <span>Seating Type</span>
                          <strong>{bus.seatingType}</strong>
                        </div>
                        <div className="smlbus-spec-row">
                          <span>Comfort Level</span>
                          <strong>{bus.comfortLevel}</strong>
                        </div>
                        <div className="smlbus-spec-row">
                          <span>Best For</span>
                          <strong>{bus.bestFor}</strong>
                        </div>
                      </div>

                      <div className="smlbus-features-tags">
                        {bus.features.map((feat, idx) => (
                          <span key={idx} className="smlbus-feat-chip">✓ {feat}</span>
                        ))}
                      </div>

                      <div className="smlbus-card-footer">
                        <div className="smlbus-price-box">
                          <strong>₹{bus.price}</strong>
                          <span>/ 8 Hours</span>
                        </div>
                        <button className="smlbus-book-now-btn">
                          Book Now →
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Pagination */}
          <div className="smlbus-pagination smlbus-desktop-pagination">
            <button
              className={`smlbus-page-btn ${desktopPage === 0 ? "smlbus-page-disabled" : ""}`}
              onClick={() => setDesktopPage((prev) => Math.max(prev - 1, 0))}
              disabled={desktopPage === 0}
            >
              Prev
            </button>
            <span className="smlbus-page-indicator">
              Page {desktopPage + 1} of {totalDesktopPages}
            </span>
            <button
              className={`smlbus-page-btn ${desktopPage === totalDesktopPages - 1 ? "smlbus-page-disabled" : ""}`}
              onClick={() => setDesktopPage((prev) => Math.min(prev + 1, totalDesktopPages - 1))}
              disabled={desktopPage === totalDesktopPages - 1}
            >
              Next
            </button>
          </div>
        </div>

        {/* Mobile View: Premium 1 by 1 Slider */}
        <div className="smlbus-mobile-slider-wrapper">
          <div
            className="smlbus-mobile-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {(() => {
              const bus = SML_BUS_LIST[mobileIndex];
              const isFlipped = !!flippedCards[bus.id];
              return (
                <div key={bus.id} className="smlbus-card-wrapper smlbus-mobile-card-anim">
                  <div className={`smlbus-card-inner ${isFlipped ? "is-flipped" : ""}`}>

                    {/* FRONT SIDE */}
                    <div className="smlbus-card-face smlbus-card-front">
                      <div
                        className="smlbus-image-wrapper"
                        onClick={() => openModal(bus)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Preview ${bus.title}`}
                      >
                        <img src={bus.image} alt={bus.title} className="smlbus-img" />
                        <div className="smlbus-badge-tag">Verified Fleet</div>
                        <div className="smlbus-zoom-hint">
                          <span>⤢ Tap to Preview</span>
                        </div>
                      </div>

                      <div className="smlbus-front-content">
                        <h3 className="smlbus-card-title">{bus.title}</h3>

                        <div className="smlbus-specs-preview">
                          <div className="smlbus-spec-row">
                            <span>A/C</span>
                            <strong>{bus.ac}</strong>
                          </div>
                          <div className="smlbus-spec-row">
                            <span>Best For</span>
                            <strong>{bus.bestFor}</strong>
                          </div>
                        </div>

                        <div className="smlbus-card-footer">
                          <div className="smlbus-price-box">
                            <strong>₹{bus.price}</strong>
                            <span>/ 8 Hours</span>
                          </div>
                          <button className="smlbus-action-btn" onClick={() => handleFlip(bus.id)}>
                            View Specs ↺
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="smlbus-card-face smlbus-card-back">
                      <div className="smlbus-back-header">
                        <h3 className="smlbus-card-title">{bus.title}</h3>
                        <button className="smlbus-close-btn" onClick={() => handleFlip(bus.id)}>
                          ✕ Back
                        </button>
                      </div>

                      <div className="smlbus-specs-list">
                        <div className="smlbus-spec-row">
                          <span>A/C</span>
                          <strong>{bus.ac}</strong>
                        </div>
                        <div className="smlbus-spec-row">
                          <span>Seating Type</span>
                          <strong>{bus.seatingType}</strong>
                        </div>
                        <div className="smlbus-spec-row">
                          <span>Comfort Level</span>
                          <strong>{bus.comfortLevel}</strong>
                        </div>
                        <div className="smlbus-spec-row">
                          <span>Best For</span>
                          <strong>{bus.bestFor}</strong>
                        </div>
                      </div>

                      <div className="smlbus-features-tags">
                        {bus.features.map((feat, idx) => (
                          <span key={idx} className="smlbus-feat-chip">✓ {feat}</span>
                        ))}
                      </div>

                      <div className="smlbus-card-footer">
                        <div className="smlbus-price-box">
                          <strong>₹{bus.price}</strong>
                          <span>/ 8 Hours</span>
                        </div>
                        <button className="smlbus-book-now-btn">
                          Book Now →
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}
          </div>

          {/* Mobile Premium Pagination: Arrows + Dots + Counter */}
          <div className="smlbus-mobile-pagination-premium">
            <button
              className={`smlbus-arrow-btn ${mobileIndex === 0 ? "smlbus-arrow-disabled" : ""}`}
              onClick={() => setMobileIndex((prev) => Math.max(prev - 1, 0))}
              disabled={mobileIndex === 0}
              aria-label="Previous bus"
            >
              ‹
            </button>

            <div className="smlbus-dots-row">
              {SML_BUS_LIST.map((bus, idx) => (
                <button
                  key={bus.id}
                  className={`smlbus-dot ${idx === mobileIndex ? "smlbus-dot-active" : ""}`}
                  onClick={() => setMobileIndex(idx)}
                  aria-label={`Go to ${bus.title}`}
                />
              ))}
            </div>

            <button
              className={`smlbus-arrow-btn ${mobileIndex === SML_BUS_LIST.length - 1 ? "smlbus-arrow-disabled" : ""}`}
              onClick={() => setMobileIndex((prev) => Math.min(prev + 1, SML_BUS_LIST.length - 1))}
              disabled={mobileIndex === SML_BUS_LIST.length - 1}
              aria-label="Next bus"
            >
              ›
            </button>
          </div>

          <span className="smlbus-mobile-counter">
            {mobileIndex + 1} / {SML_BUS_LIST.length}
          </span>
        </div>

      </div>

      {/* Compact, Premium, Elegant Eye-Catching Modal Popup */}
      {modalBus && (
        <div className="smlbus-modal-overlay" onClick={closeModal}>
          <div className="smlbus-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="smlbus-modal-close" onClick={closeModal} aria-label="Close preview">
              ✕
            </button>

            <div className="smlbus-modal-stage">
              <div className="smlbus-modal-glow"></div>
              <div className="smlbus-modal-rotator">
                <img src={modalBus.image} alt={modalBus.title} className="smlbus-modal-img" />
              </div>
              <div className="smlbus-modal-shadow"></div>
            </div>

            <div className="smlbus-modal-info">
              <span className="smlbus-modal-badge">Verified Fleet</span>
              <h3 className="smlbus-modal-title">{modalBus.title}</h3>

              <div className="smlbus-modal-specs-grid">
                <div className="smlbus-modal-spec">
                  <span>A/C</span>
                  <strong>{modalBus.ac}</strong>
                </div>
                <div className="smlbus-modal-spec">
                  <span>Comfort</span>
                  <strong>{modalBus.comfortLevel}</strong>
                </div>
              </div>

              <div className="smlbus-modal-footer">
                <div className="smlbus-price-box">
                  <strong>₹{modalBus.price}</strong>
                  <span>/ 8 Hours</span>
                </div>
                <button className="smlbus-book-now-btn">
                  Book Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SmlBus;