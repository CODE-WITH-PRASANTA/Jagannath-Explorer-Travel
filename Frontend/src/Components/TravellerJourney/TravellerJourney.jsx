import React, { useState } from "react";
import {
  FaArrowRight,
  FaArrowLeft,
  FaHeadset,
  FaTimes,
  FaRegUser,
  FaPhoneAlt,
} from "react-icons/fa";

import "./TravellerJourney.css";

// =====================================================
// VEHICLE IMAGES
// =====================================================
import urbania10 from "../../assets/Urbania-Traveller.webp";
import urbania13 from "../../assets/Urbania-Traveller.webp";
import urbania17 from "../../assets/Urbania-Traveller.webp";

const TravellerJourney = () => {
  // ===================================================
  // VEHICLE DATA
  // ===================================================
  const vehicles = [
    {
      id: 1,
      name: "Force Urbania 10 Seater",
      image: urbania10,
      ac: "Fully AC",
      seating: "Pushback Seats",
      comfort: "Smooth Ride",
      bestFor: "Family / Corporate",
      price: "₹5000",
      hours: "8 Hours",
    },
    {
      id: 2,
      name: "Force Urbania 13 Seater",
      image: urbania13,
      ac: "Fully AC",
      seating: "Reclining Seats",
      comfort: "Spacious",
      bestFor: "Group Tours",
      price: "₹5000",
      hours: "8 Hours",
    },
    {
      id: 3,
      name: "Force Urbania 17 Seater",
      image: urbania17,
      ac: "Fully AC",
      seating: "Comfortable Seats",
      comfort: "Extra Spacious",
      bestFor: "Large Groups",
      price: "₹5000",
      hours: "8 Hours",
    },
  ];

  // ===================================================
  // STATES
  // ===================================================
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDateTime: "",
    dropDateTime: "",
    fullName: "",
    mobileNumber: "",
    message: "",
    agreeTerms: false,
  });

  // ===================================================
  // OPEN BOOKING POPUP
  // ===================================================
  const handleBookNow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setBookingStep(1);
    setIsBookingOpen(true);
    document.body.style.overflow = "hidden";
  };

  // ===================================================
  // CLOSE BOOKING POPUP
  // ===================================================
  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedVehicle(null);
    setBookingStep(1);
    document.body.style.overflow = "auto";
  };

  // ===================================================
  // FORM CHANGE
  // ===================================================
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===================================================
  // STEP 1: SUBMIT TO STEP 2
  // ===================================================
  const handleNext = (event) => {
    event.preventDefault();
    setBookingStep(2);
  };

  // ===================================================
  // STEP 2: FINAL SUBMIT
  // ===================================================
  const handleFinalSubmit = (event) => {
    event.preventDefault();

    if (!formData.agreeTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    console.log("Confirmed Booking:", {
      vehicle: selectedVehicle,
      bookingDetails: formData,
    });

    alert("Booking submitted successfully!");
    handleCloseBooking();
  };

  return (
    <section className="TravellerJourney">
      <div className="TravellerJourney__container">
        {/* HEADER */}
        <div className="TravellerJourney__header">
          <div className="TravellerJourney__eyebrow">Urbania Traveller</div>
          <h1 className="TravellerJourney__heading">
            Hire Urbania Tempo Traveller in Bhubaneswar Odisha for Every Journey
          </h1>
          <p className="TravellerJourney__description">
            Need a <strong>Cab Taxi Service in Bhubaneswar</strong>, Odisha for
            local travel, airport pickup, railway station drop, or outstation
            tours? Jagannatha Travels provides comfortable car rental and premium
            Urbania Tempo Traveller services in 10, 12, and 17-seater models.
          </p>
        </div>

        {/* VEHICLE GRID */}
        <div className="TravellerJourney__grid">
          {vehicles.map((vehicle) => (
            <article className="TravellerJourney__card" key={vehicle.id}>
              <div className="TravellerJourney__imageWrapper">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="TravellerJourney__image"
                />
              </div>

              <div className="TravellerJourney__content">
                <h2 className="TravellerJourney__vehicleName">{vehicle.name}</h2>

                <div className="TravellerJourney__details">
                  <div className="TravellerJourney__detailRow">
                    <span>A/C</span>
                    <span className="TravellerJourney__detailValue">{vehicle.ac}</span>
                  </div>
                  <div className="TravellerJourney__detailRow">
                    <span>Seating</span>
                    <span className="TravellerJourney__detailValue">{vehicle.seating}</span>
                  </div>
                  <div className="TravellerJourney__detailRow">
                    <span>Comfort</span>
                    <span className="TravellerJourney__detailValue">{vehicle.comfort}</span>
                  </div>
                  <div className="TravellerJourney__detailRow">
                    <span>Best For</span>
                    <span className="TravellerJourney__detailValue">{vehicle.bestFor}</span>
                  </div>
                </div>

                <div className="TravellerJourney__bottom">
                  <div className="TravellerJourney__price">
                    <span className="TravellerJourney__priceAmount">{vehicle.price}</span>
                    <span className="TravellerJourney__priceHours">/{vehicle.hours}</span>
                  </div>

                  <button
                    type="button"
                    className="TravellerJourney__bookButton"
                    onClick={() => handleBookNow(vehicle)}
                  >
                    <span>Book Now</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* SUPPORT FLOATING BUTTON */}
      <button
        type="button"
        className="TravellerJourney__support"
        aria-label="Customer support"
      >
        <FaHeadset />
      </button>

      {/* BOOKING MODAL */}
      {isBookingOpen && selectedVehicle && (
        <div
          className="TravellerJourney__modalOverlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseBooking();
            }
          }}
        >
          <div className="TravellerJourney__modal">
            <button
              type="button"
              className="TravellerJourney__modalClose"
              onClick={handleCloseBooking}
              aria-label="Close booking"
            >
              <FaTimes />
            </button>

            <div className="TravellerJourney__modalInner">
              {/* STEP 1: ROUTE & TIMING */}
              {bookingStep === 1 && (
                <>
                  <h2 className="TravellerJourney__modalTitle">
                    Start Your Booking
                  </h2>

                  <div className="TravellerJourney__selectedVehicle">
                    <div className="TravellerJourney__selectedImage">
                      <img
                        src={selectedVehicle.image}
                        alt={selectedVehicle.name}
                      />
                    </div>
                    <div className="TravellerJourney__selectedName">
                      {selectedVehicle.name}
                    </div>
                  </div>

                  <form className="TravellerJourney__form" onSubmit={handleNext}>
                    <div className="TravellerJourney__formGrid">
                      <div className="TravellerJourney__field">
                        <label htmlFor="pickupLocation">Pick Up Location</label>
                        <div className="TravellerJourney__inputWrapper">
                          <input
                            id="pickupLocation"
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleInputChange}
                            placeholder="Pick Up Location"
                            required
                          />
                        </div>
                      </div>

                      <div className="TravellerJourney__field">
                        <label htmlFor="dropoffLocation">Drop Off Location</label>
                        <div className="TravellerJourney__inputWrapper">
                          <input
                            id="dropoffLocation"
                            type="text"
                            name="dropoffLocation"
                            value={formData.dropoffLocation}
                            onChange={handleInputChange}
                            placeholder="Drop Off Location"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="TravellerJourney__formGrid">
                      <div className="TravellerJourney__field">
                        <label htmlFor="pickupDateTime">Pick Up Date &amp; Time</label>
                        <div className="TravellerJourney__inputWrapper TravellerJourney__dateWrapper">
                          <input
                            id="pickupDateTime"
                            type="datetime-local"
                            name="pickupDateTime"
                            value={formData.pickupDateTime}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="TravellerJourney__field">
                        <label htmlFor="dropDateTime">Drop Date &amp; Time</label>
                        <div className="TravellerJourney__inputWrapper TravellerJourney__dateWrapper">
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
                    </div>

                    <div className="TravellerJourney__nextWrapper">
                      <button type="submit" className="TravellerJourney__nextButton">
                        <span>Next</span>
                        <FaArrowRight />
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* STEP 2: USER DETAILS & CONFIRMATION */}
              {bookingStep === 2 && (
                <>
                  <h2 className="TravellerJourney__modalTitle">
                    Confirm Your Booking Details
                  </h2>

                  <form
                    className="TravellerJourney__form"
                    onSubmit={handleFinalSubmit}
                  >
                    <div className="TravellerJourney__field">
                      <div className="TravellerJourney__inputWrapperWithIcon">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="* Enter Your Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                        <FaRegUser className="TravellerJourney__inputIcon" />
                      </div>
                    </div>

                    <div className="TravellerJourney__field">
                      <div className="TravellerJourney__inputWrapperWithIcon">
                        <input
                          type="tel"
                          name="mobileNumber"
                          pattern="[0-9]{10}"
                          placeholder="* Enter 10 Digit Mobile Number"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          required
                        />
                        <FaPhoneAlt className="TravellerJourney__inputIcon" />
                      </div>
                    </div>

                    <div className="TravellerJourney__field">
                      <textarea
                        name="message"
                        maxLength={150}
                        rows={4}
                        placeholder="Your Message (max 150 characters)"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="TravellerJourney__textarea"
                      />
                    </div>

                    <div className="TravellerJourney__termsWrapper">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="agreeTerms">
                        I agree to the{" "}
                        <a href="#terms" className="TravellerJourney__termsLink">
                          Terms &amp; Conditions
                        </a>{" "}
                        from <strong>Jagannath Tours &amp; Travels</strong>.
                      </label>
                    </div>

                    <div className="TravellerJourney__actionsRow">
                      <button
                        type="button"
                        className="TravellerJourney__prevButton"
                        onClick={() => setBookingStep(1)}
                      >
                        <FaArrowLeft />
                        <span>Previous</span>
                      </button>

                      <button
                        type="submit"
                        className="TravellerJourney__submitButton"
                      >
                        <span>Submit</span>
                        <FaArrowRight />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravellerJourney;