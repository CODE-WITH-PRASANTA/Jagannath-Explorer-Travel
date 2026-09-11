import React, { useState } from "react";
import "./Tempovehicle.css";
import API from "../../api/axios";

import image1 from "../../assets/TempoTraveller1 - Copy.webp";
import image2 from "../../assets/tempotraveller2.webp";
import image3 from "../../assets/TempoTraveller3.webp";

const BUSINESS = {
  name: "Jagannath Explorer Travels",
  address:
    "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha, Pin - 751002",
  phone1: "9668892441",
  phone2: "9556355446",
};

const VEHICLE_LIST = [
  {
    id: 1,
    title: "Tempo Traveller 13 Seater",
    seats: "13",
    ac: "Yes (Individual Vents)",
    comfort: "Pushback Seats",
    bestFor: "Family Trips / Small Groups",
    price: "4500",
    image: image1,
    features: [
      "Luxury Interiors",
      "Music System",
      "Charging Ports",
    ],
  },
  {
    id: 2,
    title: "Tempo Traveller 17 Seater",
    seats: "17",
    ac: "Yes (Roof Mounted AC)",
    comfort: "Pushback + Extra Leg Space",
    bestFor: "Corporate / Group Travel",
    price: "5000",
    image: image2,
    features: [
      "Ample Luggage Space",
      "LED TV",
      "Reading Lights",
    ],
  },
  {
    id: 3,
    title: "Tempo Traveller 25 Seater",
    seats: "25",
    ac: "Yes (High Capacity AC)",
    comfort: "Wide Seats + Luggage Space",
    bestFor: "Events / Weddings",
    price: "7000",
    image: image3,
    features: [
      "Grand Coach Build",
      "Microphone System",
      "Recliner Sofas",
    ],
  },
  {
    id: 4,
    title: "10 Seater Urbania Luxury",
    seats: "10",
    ac: "Yes (Climate Control)",
    comfort: "Captain Seats",
    bestFor: "VIP Travel / Luxury Tours",
    price: "11000",
    image: image1,
    features: [
      "Italian Leather",
      "Individual Screens",
      "Premium Sound",
    ],
  },
  {
    id: 5,
    title: "12 Seater Urbania Elite",
    seats: "12",
    ac: "Yes (Dual Zone AC)",
    comfort: "Executive Recliners",
    bestFor: "Corporate Retreats / Weddings",
    price: "12000",
    image: image2,
    features: [
      "Ambient Lighting",
      "Panoramic Windows",
      "Wi-Fi Connectivity",
    ],
  },
  {
    id: 6,
    title: "17 Seater Urbania Grand",
    seats: "17",
    ac: "Yes (High Output AC)",
    comfort: "Luxury Pushback",
    bestFor: "Long Distance & Tours",
    price: "13000",
    image: image3,
    features: [
      "Extra Legroom",
      "Personal Charging",
      "Mini Fridge",
    ],
  },
];

const ITEMS_PER_DESKTOP_PAGE = 3;

const Tempovehicle = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  /* =========================
     MODAL STATE
  ========================= */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropLocation: "",
    pickupDateTime: "",
    dropDateTime: "",
    fullName: "",
    mobileNumber: "",
    message: "",
    agreedToTerms: false,
  });

  /* =========================
     CARD FLIP
  ========================= */
  const handleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* =========================
     OPEN BOOKING MODAL
  ========================= */
  const handleOpenModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalStep(1);
    setIsModalOpen(true);
  };

  /* =========================
     CLOSE MODAL
  ========================= */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
    setModalStep(1);
  };

  /* =========================
     FORM INPUT
  ========================= */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================
     STEP 1
  ========================= */
  const handleNextStep = (e) => {
    e.preventDefault();

    if (
      !formData.pickupLocation ||
      !formData.dropLocation ||
      !formData.pickupDateTime
    ) {
      alert("Please fill in the required trip details.");
      return;
    }

    setModalStep(2);
  };

  /* =========================
     STEP 2
  ========================= */
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobileNumber) {
      alert("Please provide your Name and Mobile Number.");
      return;
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, "");
    if (!/^\d{10}$/.test(cleanMobile)) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (!formData.agreedToTerms) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        vehicleName: selectedVehicle?.title || "Tempo Traveller",
        vehicleType: "Tempo Traveller",
        vehiclePrice: selectedVehicle?.price || "",
        vehicleImage: typeof selectedVehicle?.image === "string" ? selectedVehicle.image : "",
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropLocation,
        pickupDateTime: formData.pickupDateTime,
        dropDateTime: formData.dropDateTime,
        fullName: formData.fullName,
        mobileNumber: cleanMobile,
        message: formData.message,
        agreedToTerms: formData.agreedToTerms,
      };

      const res = await API.post("/car-bookings", payload);

      alert(
        res.data?.message ||
          `Booking request received for ${selectedVehicle?.title}. We will contact you shortly.`
      );

      setIsModalOpen(false);
      setSelectedVehicle(null);
      setFormData({
        pickupLocation: "",
        dropLocation: "",
        pickupDateTime: "",
        dropDateTime: "",
        fullName: "",
        mobileNumber: "",
        message: "",
        agreedToTerms: false,
      });
    } catch (error) {
      console.error("Car booking submission error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit booking. Please check your details or contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const totalDesktopPages = Math.ceil(
    VEHICLE_LIST.length / ITEMS_PER_DESKTOP_PAGE
  );

  const currentDesktopVehicles = VEHICLE_LIST.slice(
    desktopPage * ITEMS_PER_DESKTOP_PAGE,
    (desktopPage + 1) * ITEMS_PER_DESKTOP_PAGE
  );

  const renderVehicleCard = (vehicle) => {
    const isFlipped = !!flippedCards[vehicle.id];

    return (
      <div
        key={vehicle.id}
        className="tempovehicle-card-wrapper"
      >
        <div
          className={`tempovehicle-card-inner ${
            isFlipped ? "is-flipped" : ""
          }`}
        >
          {/* ================= FRONT ================= */}
          <div className="tempovehicle-card-face tempovehicle-card-front">
            <div className="tempovehicle-image-wrapper">
              <img
                src={vehicle.image}
                alt={`${vehicle.title} rental in Bhubaneswar`}
                className="tempovehicle-img"
                loading="lazy"
              />

              <div className="tempovehicle-badge-tag">
                Featured
              </div>
            </div>

            <div className="tempovehicle-front-content">
              <div>
                <h3 className="tempovehicle-card-title">
                  {vehicle.title}
                </h3>

                <div className="tempovehicle-specs-preview">
                  <div className="tempovehicle-spec-row">
                    <span>Seats</span>
                    <strong>{vehicle.seats}</strong>
                  </div>

                  <div className="tempovehicle-spec-row">
                    <span>Best For</span>
                    <strong>{vehicle.bestFor}</strong>
                  </div>
                </div>
              </div>

              <div className="tempovehicle-card-footer">
                <div className="tempovehicle-price-box">
                  <strong>₹{vehicle.price}</strong>
                  <span>/ 8 Hours</span>
                </div>

                <button
                  type="button"
                  className="tempovehicle-action-btn"
                  onClick={() => handleFlip(vehicle.id)}
                >
                  View Specs ↺
                </button>
              </div>
            </div>
          </div>

          {/* ================= BACK ================= */}
          <div className="tempovehicle-card-face tempovehicle-card-back">
            <div className="tempovehicle-back-header">
              <h3 className="tempovehicle-card-title">
                {vehicle.title}
              </h3>

              <button
                type="button"
                className="tempovehicle-close-btn"
                onClick={() => handleFlip(vehicle.id)}
              >
                ✕ Back
              </button>
            </div>

            <div className="tempovehicle-specs-list">
              <div className="tempovehicle-spec-row">
                <span>Seats</span>
                <strong>{vehicle.seats}</strong>
              </div>

              <div className="tempovehicle-spec-row">
                <span>A/C</span>
                <strong>{vehicle.ac}</strong>
              </div>

              <div className="tempovehicle-spec-row">
                <span>Comfort</span>
                <strong>{vehicle.comfort}</strong>
              </div>

              <div className="tempovehicle-spec-row">
                <span>Best For</span>
                <strong>{vehicle.bestFor}</strong>
              </div>
            </div>

            <div className="tempovehicle-features-tags">
              {vehicle.features.map((feature, index) => (
                <span
                  key={index}
                  className="tempovehicle-feat-chip"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>

            <div className="tempovehicle-card-footer">
              <div className="tempovehicle-price-box">
                <strong>₹{vehicle.price}</strong>
                <span>/ 8 Hours</span>
              </div>

              <button
                type="button"
                className="tempovehicle-book-now-btn"
                onClick={() => handleOpenModal(vehicle)}
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
    <section
      className="tempovehicle-section"
      aria-labelledby="tempo-traveller-title"
    >
      <div className="tempovehicle-container">

        {/* =====================================================
            SEO / CONTENT HEADER
        ===================================================== */}
        <header className="tempovehicle-header-area">
          <span className="tempovehicle-subtitle">
            ✦ TEMPO TRAVELLER &amp; URBANIA FLEET ✦
          </span>

          <h1
            id="tempo-traveller-title"
            className="tempovehicle-main-title"
          >
            Best tour and travel agency in bhubaneswar
            <span>
              Comfortable Tempo Travellers &amp; Urbania for Group Travel
            </span>
          </h1>

          <div className="tempovehicle-title-divider">
            <span></span>
            <i>❦</i>
            <span></span>
          </div>

          <p className="tempovehicle-description">
            Planning a family trip, wedding, corporate outing or
            group journey from Bhubaneswar? Jagannath Explorer Travels
            offers comfortable Tempo Travellers and Urbania vehicles
            for local sightseeing, airport transfers, events and
            outstation journeys across Odisha. Choose the right
            vehicle for your group and travel with experienced
            drivers, practical booking options and dependable
            service.
          </p>

          <p className="tempovehicle-seo-text">
            As a trusted <strong>Tour &amp; Travel Agency in Bhubaneswar</strong>,
            we provide flexible vehicle options for families, groups,
            corporate travellers and wedding functions. Whether you
            need a 13-seater Tempo Traveller for a small group or a
            larger Urbania for a long-distance trip, our fleet is
            designed to make group travel more comfortable.
          </p>

          {/* BUSINESS DETAILS */}
          <div className="tempovehicle-business-info">
            <div className="tempovehicle-business-name">
              {BUSINESS.name}
            </div>

            <div className="tempovehicle-business-address">
              {BUSINESS.address}
            </div>

            <div className="tempovehicle-business-contact">
              <span>Call for Booking:</span>

              <a href={`tel:+91${BUSINESS.phone1}`}>
                {BUSINESS.phone1}
              </a>

              <span className="tempovehicle-contact-divider">
                |
              </span>

              <a href={`tel:+91${BUSINESS.phone2}`}>
                {BUSINESS.phone2}
              </a>
            </div>
          </div>
        </header>

        {/* =====================================================
            DESKTOP
        ===================================================== */}
        <div className="tempovehicle-desktop-grid-wrapper">
          <div className="tempovehicle-grid tempovehicle-desktop-grid">
            {currentDesktopVehicles.map(renderVehicleCard)}
          </div>

          <div className="tempovehicle-pagination tempovehicle-desktop-pagination">
            <button
              type="button"
              className="tempovehicle-page-btn"
              onClick={() =>
                setDesktopPage((prev) =>
                  Math.max(prev - 1, 0)
                )
              }
              disabled={desktopPage === 0}
            >
              ← Prev
            </button>

            <span className="tempovehicle-page-indicator">
              Page {desktopPage + 1} of {totalDesktopPages}
            </span>

            <button
              type="button"
              className="tempovehicle-page-btn"
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
              Next →
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE
        ===================================================== */}
        <div className="tempovehicle-mobile-slider-wrapper">
          <div className="tempovehicle-mobile-slider">
            {renderVehicleCard(VEHICLE_LIST[mobileIndex])}
          </div>

          <div className="tempovehicle-pagination tempovehicle-mobile-pagination">
            <button
              type="button"
              className="tempovehicle-page-btn"
              onClick={() =>
                setMobileIndex((prev) =>
                  Math.max(prev - 1, 0)
                )
              }
              disabled={mobileIndex === 0}
            >
              ← Prev
            </button>

            <span className="tempovehicle-page-indicator">
              {mobileIndex + 1} / {VEHICLE_LIST.length}
            </span>

            <button
              type="button"
              className="tempovehicle-page-btn"
              onClick={() =>
                setMobileIndex((prev) =>
                  Math.min(
                    prev + 1,
                    VEHICLE_LIST.length - 1
                  )
                )
              }
              disabled={
                mobileIndex === VEHICLE_LIST.length - 1
              }
            >
              Next →
            </button>
          </div>
        </div>

        {/* =====================================================
            SEO CONTENT
        ===================================================== */}
        <div className="tempovehicle-bottom-content">
          <span className="tempovehicle-bottom-label">
            GROUP TRAVEL MADE COMFORTABLE
          </span>

          <h2>
            Tempo Traveller &amp; Urbania Rental in Bhubaneswar
          </h2>

          <p>
            From short city trips to multi-day Odisha tours,
            Jagannath Explorer Travels makes group transportation
            simple and comfortable. Our Tempo Traveller and Urbania
            options are suitable for family holidays, pilgrimage
            trips, wedding transportation, corporate travel,
            sightseeing and outstation journeys.
          </p>

          <p>
            Looking for reliable <strong>travel agency in
            Bhubaneswar</strong> services for your next group trip?
            Speak with our team about your route, travel dates,
            passenger count and preferred vehicle.
          </p>
        </div>
      </div>

      {/* =====================================================
          BOOKING MODAL
      ===================================================== */}
      {isModalOpen && selectedVehicle && (
        <div
          className="tv-modal-overlay"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <div
            className="tv-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="tv-modal-x-close"
              onClick={handleCloseModal}
              aria-label="Close booking form"
            >
              ✕
            </button>

            {modalStep === 1 ? (
              <form onSubmit={handleNextStep}>
                <h2
                  id="booking-modal-title"
                  className="tv-modal-title"
                >
                  Start Your Booking
                </h2>

                <div className="tv-selected-vehicle-banner">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.title}
                  />

                  <div>
                    <span className="tv-selected-label">
                      Selected Vehicle
                    </span>

                    <strong>
                      {selectedVehicle.title}
                    </strong>
                  </div>
                </div>

                <div className="tv-form-grid">
                  <div className="tv-form-group">
                    <label htmlFor="pickupLocation">
                      Pick Up Location *
                    </label>

                    <input
                      id="pickupLocation"
                      type="text"
                      name="pickupLocation"
                      placeholder="Enter pickup location"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="tv-form-group">
                    <label htmlFor="dropLocation">
                      Drop Off Location *
                    </label>

                    <input
                      id="dropLocation"
                      type="text"
                      name="dropLocation"
                      placeholder="Enter drop location"
                      value={formData.dropLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="tv-form-group">
                    <label htmlFor="pickupDateTime">
                      Pick Up Date &amp; Time *
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

                  <div className="tv-form-group">
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

                <div className="tv-modal-footer-action">
                  <button
                    type="submit"
                    className="tv-modal-primary-btn"
                  >
                    Continue
                    <span>→</span>
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h2
                  id="booking-modal-title"
                  className="tv-modal-title"
                >
                  Confirm Your Booking
                </h2>

                <div className="tv-form-group">
                  <label htmlFor="fullName">
                    Full Name *
                  </label>

                  <div className="tv-input-icon-wrapper">
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />

                    <span className="tv-field-icon">
                      👤
                    </span>
                  </div>
                </div>

                <div className="tv-form-group">
                  <label htmlFor="mobileNumber">
                    Mobile Number *
                  </label>

                  <div className="tv-input-icon-wrapper">
                    <input
                      id="mobileNumber"
                      type="tel"
                      name="mobileNumber"
                      placeholder="Enter 10 digit mobile number"
                      maxLength="10"
                      inputMode="numeric"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                    />

                    <span className="tv-field-icon">
                      📞
                    </span>
                  </div>
                </div>

                <div className="tv-form-group">
                  <label htmlFor="message">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    maxLength="150"
                    placeholder="Tell us about your trip"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="tv-form-checkbox-group">
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
                      <span className="tv-highlight-link">
                        Terms &amp; Conditions
                      </span>{" "}
                      of {BUSINESS.name}.
                    </span>
                  </label>
                </div>

                <div className="tv-modal-footer-action tv-step2-actions">
                  <button
                    type="button"
                    className="tv-modal-secondary-btn"
                    onClick={() => setModalStep(1)}
                  >
                    ← Previous
                  </button>

                  <button
                    type="submit"
                    className="tv-modal-primary-btn"
                  >
                    Submit Booking →
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

export default Tempovehicle;