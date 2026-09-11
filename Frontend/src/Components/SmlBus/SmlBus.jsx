import React, { useRef, useState } from "react";
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
    features: ["Compact Design", "City Friendly", "Reliable Performance"],
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
    features: ["Spacious Cabin", "Overhead Luggage", "Comfort Ride"],
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
    features: ["Ample Legroom", "Wide Windows", "Smooth Suspension"],
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
    features: ["Executive Recliners", "Entertainment System", "Deep Luggage Boot"],
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
    features: ["Max Capacity", "High Deck View", "Long Distance Ready"],
  },
];

const ITEMS_PER_DESKTOP_PAGE = 3;

const INITIAL_FORM_DATA = {
  pickupLocation: "",
  dropLocation: "",
  pickupDateTime: "",
  dropDateTime: "",
  fullName: "",
  mobileNumber: "",
  message: "",
  agreedToTerms: false,
};

const SmlBus = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedBus, setSelectedBus] = useState(null);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenModal = (bus) => {
    setSelectedBus(bus);
    setModalStep(1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBus(null);
    setModalStep(1);
    setFormData(INITIAL_FORM_DATA);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    if (
      !formData.pickupLocation.trim() ||
      !formData.dropLocation.trim() ||
      !formData.pickupDateTime
    ) {
      alert("Please fill in the required pickup, drop and pickup date details.");
      return;
    }

    setModalStep(2);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      alert("Please enter your Full Name and Mobile Number.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (!formData.agreedToTerms) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    alert(
      `Booking request received for ${selectedBus?.title}. We will get in touch with you shortly.`
    );

    handleCloseModal();
  };

  const totalDesktopPages = Math.ceil(
    SML_BUS_LIST.length / ITEMS_PER_DESKTOP_PAGE
  );

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
      setMobileIndex((prev) =>
        Math.min(prev + 1, SML_BUS_LIST.length - 1)
      );
    } else if (distance < -SWIPE_THRESHOLD) {
      setMobileIndex((prev) => Math.max(prev - 1, 0));
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const renderBusCard = (bus) => {
    const isFlipped = !!flippedCards[bus.id];

    return (
      <div key={bus.id} className="smlbus-card-wrapper">
        <div
          className={`smlbus-card-inner ${
            isFlipped ? "is-flipped" : ""
          }`}
        >
          {/* FRONT */}
          <div className="smlbus-card-face smlbus-card-front">
            <div className="smlbus-image-wrapper">
              <img
                src={bus.image}
                alt={`${bus.title} rental service in Bhubaneswar`}
                className="smlbus-img"
                loading="lazy"
              />

              <div className="smlbus-badge-tag">
                Verified Fleet
              </div>
            </div>

            <div className="smlbus-front-content">
              <h3 className="smlbus-card-title">
                {bus.title}
              </h3>

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

                <button
                  type="button"
                  className="smlbus-action-btn"
                  onClick={() => handleFlip(bus.id)}
                >
                  View Specs ↺
                </button>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="smlbus-card-face smlbus-card-back">
            <div className="smlbus-back-header">
              <h3 className="smlbus-card-title">
                {bus.title}
              </h3>

              <button
                type="button"
                className="smlbus-close-btn"
                onClick={() => handleFlip(bus.id)}
              >
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
              {bus.features.map((feature) => (
                <span
                  key={feature}
                  className="smlbus-feat-chip"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>

            <div className="smlbus-card-footer">
              <div className="smlbus-price-box">
                <strong>₹{bus.price}</strong>
                <span>/ 8 Hours</span>
              </div>

              <button
                type="button"
                className="smlbus-book-now-btn"
                onClick={() => handleOpenModal(bus)}
              >
                Book Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="smlbus-section">
      <div className="smlbus-container">

        {/* =========================
            SEO HEADER
        ========================= */}

        <header className="smlbus-header-area">
          <span className="smlbus-subtitle">
            ✦ SML COACH FLEET ✦
          </span>

          <h1 className="smlbus-main-title">
            Best tour and travel agency in bhubaneswar
          </h1>

          <div className="smlbus-title-divider">
            <span></span>
            <i>❦</i>
            <span></span>
          </div>

          <p className="smlbus-description">
            Looking for a comfortable vehicle for a family holiday,
            group outing or an outstation journey? Jagannath Explorer
            Travels provides SML coaches in different seating
            capacities for travel from Bhubaneswar to destinations
            across Odisha. Choose a vehicle according to your group
            size, travel distance and itinerary.
          </p>
        </header>

        {/* =========================
            SEO INTRO CONTENT
        ========================= */}

        <div className="smlbus-seo-content">
          <span className="smlbus-seo-label">
            Group Travel Made Simple
          </span>

          <h2>
            Best Tour &amp; Travel Agency in Bhubaneswar Odisha
          </h2>

          <p>
            Jagannath Explorer Travels offers practical transport
            solutions for families, companies, schools, tour groups
            and large gatherings. Our SML coach range includes 13,
            19, 22, 28 and 36 seater options, making it easier to
            select a vehicle that fits your group without compromising
            on travel comfort.
          </p>

          <p>
            As a{" "}
            <strong>
              Tour &amp; Travel Agency in Bhubaneswar, Odisha
            </strong>
            , we provide vehicles for local sightseeing, airport
            transfers, weddings, corporate travel, pilgrimages and
            outstation tours. Our team can help you choose between
            different vehicle sizes depending on the number of
            passengers and the type of journey you have planned.
          </p>

          <p>
            If you are comparing{" "}
            <strong>
              odisha tourism packages with price
            </strong>
            , remember that the final trip cost can change according
            to the destination, number of travel days, vehicle,
            sightseeing route and group size. Contact us with your
            travel details for a suitable vehicle and trip estimate.
          </p>
        </div>

        {/* =========================
            DESKTOP BUS GRID
        ========================= */}

        <div className="smlbus-desktop-grid-wrapper">
          <div className="smlbus-grid smlbus-desktop-grid">
            {currentDesktopBuses.map(renderBusCard)}
          </div>

          <div className="smlbus-pagination smlbus-desktop-pagination">
            <button
              type="button"
              className={`smlbus-page-btn ${
                desktopPage === 0
                  ? "smlbus-page-disabled"
                  : ""
              }`}
              onClick={() =>
                setDesktopPage((prev) =>
                  Math.max(prev - 1, 0)
                )
              }
              disabled={desktopPage === 0}
            >
              Prev
            </button>

            <span className="smlbus-page-indicator">
              Page {desktopPage + 1} of {totalDesktopPages}
            </span>

            <button
              type="button"
              className={`smlbus-page-btn ${
                desktopPage === totalDesktopPages - 1
                  ? "smlbus-page-disabled"
                  : ""
              }`}
              onClick={() =>
                setDesktopPage((prev) =>
                  Math.min(
                    prev + 1,
                    totalDesktopPages - 1
                  )
                )
              }
              disabled={
                desktopPage === totalDesktopPages - 1
              }
            >
              Next
            </button>
          </div>
        </div>

        {/* =========================
            MOBILE SLIDER
        ========================= */}

        <div className="smlbus-mobile-slider-wrapper">
          <div
            className="smlbus-mobile-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {renderBusCard(SML_BUS_LIST[mobileIndex])}
          </div>

          <div className="smlbus-mobile-pagination-premium">
            <button
              type="button"
              className={`smlbus-arrow-btn ${
                mobileIndex === 0
                  ? "smlbus-arrow-disabled"
                  : ""
              }`}
              onClick={() =>
                setMobileIndex((prev) =>
                  Math.max(prev - 1, 0)
                )
              }
              disabled={mobileIndex === 0}
              aria-label="Previous SML coach"
            >
              ‹
            </button>

            <div className="smlbus-dots-row">
              {SML_BUS_LIST.map((bus, index) => (
                <button
                  type="button"
                  key={bus.id}
                  className={`smlbus-dot ${
                    index === mobileIndex
                      ? "smlbus-dot-active"
                      : ""
                  }`}
                  onClick={() => setMobileIndex(index)}
                  aria-label={`View ${bus.title}`}
                />
              ))}
            </div>

            <button
              type="button"
              className={`smlbus-arrow-btn ${
                mobileIndex === SML_BUS_LIST.length - 1
                  ? "smlbus-arrow-disabled"
                  : ""
              }`}
              onClick={() =>
                setMobileIndex((prev) =>
                  Math.min(
                    prev + 1,
                    SML_BUS_LIST.length - 1
                  )
                )
              }
              disabled={
                mobileIndex === SML_BUS_LIST.length - 1
              }
              aria-label="Next SML coach"
            >
              ›
            </button>
          </div>

          <span className="smlbus-mobile-counter">
            {mobileIndex + 1} / {SML_BUS_LIST.length}
          </span>
        </div>

        {/* =========================
            BOTTOM SEO CONTENT
        ========================= */}

        <div className="smlbus-bottom-content">
          <span className="smlbus-bottom-label">
            Explore Odisha Comfortably
          </span>

          <h2>
            SML Coach Rental for Tours and Group Travel
          </h2>

          <p>
            Planning a group journey from Bhubaneswar? An SML coach
            can be a convenient choice when several passengers are
            travelling together. Whether your plan includes
            sightseeing, a family function, corporate travel or a
            longer Odisha tour, you can choose a seating capacity
            that suits your group.
          </p>

          <p>
            Popular routes and travel plans can include Bhubaneswar,
            Puri, Konark, Chilika, Cuttack and other destinations
            across Odisha. Share your route, travel date and number
            of passengers with Jagannath Explorer Travels to discuss
            vehicle availability and booking options.
          </p>

          <div className="smlbus-contact-buttons">
            <a href="tel:9668892441">
              Call 9668892441
            </a>

            <a href="tel:9556355446">
              Call 9556355446
            </a>
          </div>
        </div>
      </div>

      {/* =========================
          BOOKING MODAL
      ========================= */}

      {isModalOpen && selectedBus && (
        <div
          className="smlbus-modal-overlay"
          onClick={handleCloseModal}
          role="presentation"
        >
          <div
            className="smlbus-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="smlbus-modal-title"
          >
            <button
              type="button"
              className="smlbus-modal-close"
              onClick={handleCloseModal}
              aria-label="Close booking form"
            >
              ✕
            </button>

            {modalStep === 1 ? (
              <form onSubmit={handleNextStep}>
                <h2
                  id="smlbus-modal-title"
                  className="smlbus-modal-heading"
                >
                  Start Your Booking
                </h2>

                <div className="smlbus-selected-vehicle-banner">
                  <img
                    src={selectedBus.image}
                    alt={selectedBus.title}
                  />

                  <span>{selectedBus.title}</span>
                </div>

                <div className="smlbus-form-grid">
                  <div className="smlbus-form-group">
                    <label htmlFor="pickupLocation">
                      Pick Up Location
                    </label>

                    <input
                      id="pickupLocation"
                      type="text"
                      name="pickupLocation"
                      placeholder="Pick Up Location"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="smlbus-form-group">
                    <label htmlFor="dropLocation">
                      Drop Off Location
                    </label>

                    <input
                      id="dropLocation"
                      type="text"
                      name="dropLocation"
                      placeholder="Drop Off Location"
                      value={formData.dropLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="smlbus-form-group">
                    <label htmlFor="pickupDateTime">
                      Pick Up Date &amp; Time
                    </label>

                    <input
                      id="pickupDateTime"
                      type="datetime-local"
                      name="pickupDateTime"
                      value={formData.pickupDateTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="smlbus-form-group">
                    <label htmlFor="dropDateTime">
                      Drop Date &amp; Time
                    </label>

                    <input
                      id="dropDateTime"
                      type="datetime-local"
                      name="dropDateTime"
                      value={formData.dropDateTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="smlbus-modal-actions">
                  <button
                    type="submit"
                    className="smlbus-action-submit-btn"
                  >
                    Next <span>→</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h2
                  id="smlbus-modal-title"
                  className="smlbus-modal-heading"
                >
                  Confirm Your Booking Details
                </h2>

                <div className="smlbus-form-group">
                  <div className="smlbus-input-icon-box">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="* Enter Your Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />

                    <span className="smlbus-field-icon">
                      👤
                    </span>
                  </div>
                </div>

                <div className="smlbus-form-group">
                  <div className="smlbus-input-icon-box">
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="* Enter 10 Digit Mobile Number"
                      maxLength={10}
                      inputMode="numeric"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                    />

                    <span className="smlbus-field-icon">
                      📞
                    </span>
                  </div>
                </div>

                <div className="smlbus-form-group">
                  <textarea
                    name="message"
                    rows="4"
                    maxLength="150"
                    placeholder="Your Message (max 150 characters)"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="smlbus-checkbox-row">
                  <label>
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleInputChange}
                      required
                    />

                    <span>
                      I agree to the{" "}
                      <span className="smlbus-link-text">
                        Terms &amp; Conditions
                      </span>{" "}
                      from{" "}
                      <strong>
                        Jagannath Explorer Travels
                      </strong>
                      .
                    </span>
                  </label>
                </div>

                <div className="smlbus-modal-actions smlbus-step2-btns">
                  <button
                    type="button"
                    className="smlbus-prev-btn"
                    onClick={() => setModalStep(1)}
                  >
                    ← Previous
                  </button>

                  <button
                    type="submit"
                    className="smlbus-submit-btn"
                  >
                    Submit →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SmlBus;