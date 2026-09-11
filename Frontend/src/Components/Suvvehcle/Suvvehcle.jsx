import React, { useState } from "react";
import "./Suvvehcle.css";
import API from "../../api/axios";

import {
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
  FaUser,
  FaPhoneAlt,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

// SUV Images
import ertigaImg from "../../assets/Suv1.webp";
import innovaImg from "../../assets/Suv2.webp";
import crystaImg from "../../assets/Suv3.webp";

/* ==========================================================================
   SUV DATA
   ========================================================================== */

const carsData = [
  {
    id: 1,
    name: "Maruti Suzuki Ertiga",
    accent: "#0ea5e9",
    image: ertigaImg,
    seating: "7 Seater",
    ac: "Automatic + Rear AC Vents",
    bootSpace: "209 Litres",
    fuelType: "Petrol",
    price: "₹3000",
    unit: "/ 8 Hours",
  },
  {
    id: 2,
    name: "Toyota Innova",
    accent: "#2563eb",
    image: innovaImg,
    seating: "7 Seater",
    ac: "Automatic + Rear AC Vents",
    bootSpace: "300 Litres (Approx.)",
    fuelType: "Diesel",
    price: "₹3000",
    unit: "/ 8 Hours",
  },
  {
    id: 3,
    name: "Toyota Innova Crysta",
    accent: "#7c3aed",
    image: crystaImg,
    seating: "7 Seater",
    ac: "Automatic + Rear AC Vents",
    bootSpace: "300 Litres (Approx.)",
    fuelType: "Diesel",
    price: "₹4000",
    unit: "/ 8 Hours",
  },
];

/* ==========================================================================
   SUV VEHICLE COMPONENT
   ========================================================================== */

const Suvvehcle = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [step, setStep] = useState(0);

  /* ------------------------------------------------------------------------
      Booking Form
  ------------------------------------------------------------------------ */

  const [formData, setFormData] = useState({
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDateTime: "",
    dropDateTime: "",
    fullName: "",
    mobileNumber: "",
    message: "",
    agreedTerms: false,
  });

  /* ------------------------------------------------------------------------
      Open Booking
  ------------------------------------------------------------------------ */

  const handleOpenBooking = (car) => {
    setSelectedCar(car);
    setStep(1);
  };

  /* ------------------------------------------------------------------------
      Close Booking
  ------------------------------------------------------------------------ */

  const handleCloseModal = () => {
    setStep(0);
    setSelectedCar(null);
  };

  /* ------------------------------------------------------------------------
      Form Input
  ------------------------------------------------------------------------ */

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ------------------------------------------------------------------------
      Next Step
  ------------------------------------------------------------------------ */

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  /* ------------------------------------------------------------------------
      Previous Step
  ------------------------------------------------------------------------ */

  const handlePrevious = () => {
    setStep(1);
  };

  /* ------------------------------------------------------------------------
      Submit Booking
  ------------------------------------------------------------------------ */

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
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

    if (!formData.agreedTerms) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        vehicleName: selectedCar?.name || "SUV Car",
        vehicleType: "SUV",
        vehiclePrice: selectedCar?.price ? `${selectedCar.price} ${selectedCar.unit || ""}`.trim() : "",
        vehicleImage: typeof selectedCar?.image === "string" ? selectedCar.image : "",
        pickupLocation: formData.pickUpLocation || formData.pickupLocation,
        dropLocation: formData.dropOffLocation || formData.dropLocation,
        pickupDateTime: formData.pickUpDateTime || formData.pickupDateTime,
        dropDateTime: formData.dropDateTime,
        fullName: formData.fullName,
        mobileNumber: cleanMobile,
        message: formData.message,
        agreedToTerms: formData.agreedTerms,
      };

      const res = await API.post("/car-bookings", payload);

      alert(
        res.data?.message ||
          `Booking request received for ${selectedCar?.name}! We will contact you shortly.`
      );

      handleCloseModal();
    } catch (error) {
      console.error("SUV booking error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit booking. Please check your details or call our office."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="Suvvehcle">

      {/* ==================================================================
          SEO / INTRO HEADER
      ================================================================== */}

      <header className="Suvvehcle-header">

        <div className="Suvvehcle-badge-pill">
          <span>✨ Jagannath Explorer Travels</span>
        </div>

        <h1 className="Suvvehcle-title">
          Best Tour and Travel Agency in Bhubaneswar
        </h1>

        <p className="Suvvehcle-description">
          Looking for a comfortable SUV for your next journey?{" "}
          <strong>Jagannath Explorer Travels</strong> is a trusted{" "}
          <strong>
            Tour &amp; Travel Agency in Bhubaneswar, Odisha
          </strong>{" "}
          offering well-maintained SUVs for local sightseeing, family trips,
          airport transfers, and outstation journeys. Choose from popular
          vehicles like the Maruti Suzuki Ertiga, Toyota Innova, and Toyota
          Innova Crysta and enjoy a smooth journey with experienced drivers
          and dependable service.
        </p>

        <div className="Suvvehcle-business-info">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha - 751002</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <span className="phone-highlight">9668892441 &nbsp;|&nbsp; 9556355446</span>
          </div>
        </div>

      </header>


      {/* ==================================================================
          SUV CAR GRID
      ================================================================== */}

      <div className="Suvvehcle-grid">

        {carsData.map((car, index) => (
          <article
            className="Suvvehcle-card"
            key={car.id}
            style={{ '--accent': car.accent, '--stagger': index }}
          >
            <div className="Suvvehcle-card-badge">Available Today</div>

            {/* Vehicle Image */}

            <div className="Suvvehcle-card-image-wrapper">
              <div className="Suvvehcle-card-glow" aria-hidden="true" />
              <img
                src={car.image}
                alt={`${car.name} SUV rental in Bhubaneswar`}
                className="Suvvehcle-card-image"
                loading="lazy"
              />
            </div>


            {/* Vehicle Name */}

            <h2 className="Suvvehcle-card-title">
              {car.name}
            </h2>


            {/* Vehicle Details */}

            <div className="Suvvehcle-card-details">

              <div className="Suvvehcle-detail-row">
                <span className="Suvvehcle-detail-label">
                  Seating Capacity
                </span>

                <span className="Suvvehcle-detail-value">
                  {car.seating}
                </span>
              </div>


              <div className="Suvvehcle-detail-row">
                <span className="Suvvehcle-detail-label">
                  A/C
                </span>

                <span className="Suvvehcle-detail-value">
                  {car.ac}
                </span>
              </div>


              <div className="Suvvehcle-detail-row">
                <span className="Suvvehcle-detail-label">
                  Boot Space
                </span>

                <span className="Suvvehcle-detail-value">
                  {car.bootSpace}
                </span>
              </div>


              <div className="Suvvehcle-detail-row">
                <span className="Suvvehcle-detail-label">
                  Fuel Type
                </span>

                <span className="Suvvehcle-detail-value">
                  {car.fuelType}
                </span>
              </div>

            </div>


            {/* Price + Booking */}

            <div className="Suvvehcle-card-footer">

              <div className="Suvvehcle-card-price">
                <strong>{car.price}</strong>
                <span>{car.unit}</span>
              </div>

              <button
                type="button"
                className="Suvvehcle-book-btn"
                onClick={() => handleOpenBooking(car)}
              >
                <span>Book Now</span>
                <FaArrowRight />
              </button>

            </div>

          </article>
        ))}

      </div>


      {/* ==================================================================
          BOOKING MODAL
      ================================================================== */}

      {step > 0 && selectedCar && (

        <div
          className="Suvvehcle-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="Suvvehcle-modal-title"
        >
          <div className="Suvvehcle-modal-backdrop" onClick={handleCloseModal} />

          <div className="Suvvehcle-modal-content">

            {/* Close */}

            <button
              type="button"
              className="Suvvehcle-modal-close"
              onClick={handleCloseModal}
              aria-label="Close booking form"
            >
              <FaTimes />
            </button>


            {/* ============================================================
                STEP 1
            ============================================================ */}

            {step === 1 && (

              <form
                onSubmit={handleNext}
                className="Suvvehcle-form"
              >

                <span className="Suvvehcle-modal-subtitle">
                  RESERVE YOUR RIDE
                </span>

                <h2
                  id="Suvvehcle-modal-title"
                  className="Suvvehcle-modal-title"
                >
                  Start Your Booking
                </h2>


                {/* Selected Vehicle */}

                <div className="Suvvehcle-selected-car">

                  <div className="Suvvehcle-selected-car-img">
                    <img
                      src={selectedCar.image}
                      alt={selectedCar.name}
                    />
                  </div>

                  <div className="Suvvehcle-selected-car-info">
                    <h3>
                      {selectedCar.name}
                    </h3>

                    <p>
                      <strong>
                        {selectedCar.price}
                      </strong>

                      {selectedCar.unit}
                    </p>
                  </div>

                </div>


                {/* Booking Inputs */}

                <div className="Suvvehcle-form-grid">

                  <div className="Suvvehcle-form-group">
                    <label htmlFor="pickUpLocation">
                      Pick Up Location
                    </label>

                    <input
                      id="pickUpLocation"
                      type="text"
                      name="pickUpLocation"
                      placeholder="Enter pickup location"
                      value={formData.pickUpLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>


                  <div className="Suvvehcle-form-group">
                    <label htmlFor="dropOffLocation">
                      Drop Off Location
                    </label>

                    <input
                      id="dropOffLocation"
                      type="text"
                      name="dropOffLocation"
                      placeholder="Enter drop-off location"
                      value={formData.dropOffLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>


                  <div className="Suvvehcle-form-group">
                    <label htmlFor="pickUpDateTime">
                      Pick Up Date &amp; Time
                    </label>

                    <input
                      id="pickUpDateTime"
                      type="datetime-local"
                      name="pickUpDateTime"
                      value={formData.pickUpDateTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>


                  <div className="Suvvehcle-form-group">
                    <label htmlFor="dropDateTime">
                      Drop Date &amp; Time
                    </label>

                    <input
                      id="dropDateTime"
                      type="datetime-local"
                      name="dropDateTime"
                      value={formData.dropDateTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                </div>


                <div className="Suvvehcle-modal-footer center">
                  <button
                    type="submit"
                    className="Suvvehcle-next-btn"
                  >
                    <span>Next</span>
                    <FaArrowRight />
                  </button>
                </div>

              </form>
            )}


            {/* ============================================================
                STEP 2
            ============================================================ */}

            {step === 2 && (

              <form
                onSubmit={handleSubmit}
                className="Suvvehcle-form"
              >

                <h2 className="Suvvehcle-modal-title large-margin">
                  Confirm Your Booking Details
                </h2>


                {/* Full Name */}

                <div className="Suvvehcle-form-group icon-input">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="* Enter Your Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    autoComplete="name"
                    required
                  />

                  <FaUser
                    className="Suvvehcle-input-icon"
                    aria-hidden="true"
                  />
                </div>


                {/* Mobile Number */}

                <div className="Suvvehcle-form-group icon-input">
                  <input
                    type="tel"
                    name="mobileNumber"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    inputMode="numeric"
                    placeholder="* Enter 10 Digit Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    required
                  />

                  <FaPhoneAlt
                    className="Suvvehcle-input-icon"
                    aria-hidden="true"
                  />
                </div>


                {/* Message */}

                <div className="Suvvehcle-form-group">
                  <textarea
                    name="message"
                    maxLength={150}
                    placeholder="Your Message (max 150 characters)"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>


                {/* Terms */}

                <div className="Suvvehcle-checkbox-group">
                  <input
                    type="checkbox"
                    id="agreedTerms"
                    name="agreedTerms"
                    checked={formData.agreedTerms}
                    onChange={handleInputChange}
                    required
                  />

                  <label htmlFor="agreedTerms">
                    I agree to the{" "}

                    <a
                      href="#terms"
                      onClick={(e) => e.preventDefault()}
                    >
                      Terms &amp; Conditions
                    </a>{" "}

                    from{" "}

                    <strong>
                      Jagannath Explorer Travels
                    </strong>.
                  </label>
                </div>


                {/* Buttons */}

                <div className="Suvvehcle-modal-footer space-between">
                  <button
                    type="button"
                    className="Suvvehcle-prev-btn"
                    onClick={handlePrevious}
                  >
                    <FaArrowLeft />
                    <span>Previous</span>
                  </button>


                  <button
                    type="submit"
                    className="Suvvehcle-submit-btn"
                  >
                    <span>Submit</span>
                    <FaArrowRight />
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

export default Suvvehcle;