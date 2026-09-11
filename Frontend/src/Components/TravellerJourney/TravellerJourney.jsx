import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

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

// =====================================================
// BUSINESS INFORMATION
// =====================================================

const BUSINESS = {
  name: "Jagannath Explorer Travels",
  address:
    "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha, Pin - 751002",
  phone1: "9668892441",
  phone2: "9556355446",
};

// =====================================================
// VEHICLE DATA
// =====================================================

const VEHICLES = [
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

// =====================================================
// COMPONENT
// =====================================================

const TravellerJourney = () => {
  // ===================================================
  // STATES
  // ===================================================

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

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
  // MOBILE DETECTION
  // ===================================================

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // ===================================================
  // PAGINATION
  // ===================================================

  const itemsPerPage = isMobile ? 1 : 3;

  const totalPages = Math.ceil(
    VEHICLES.length / itemsPerPage
  );

  const displayedVehicles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return VEHICLES.slice(
      start,
      start + itemsPerPage
    );
  }, [currentPage, itemsPerPage]);

  // ===================================================
  // OPEN BOOKING MODAL
  // ===================================================

  const handleBookNow = useCallback((vehicle) => {
    setSelectedVehicle(vehicle);
    setBookingStep(1);
    setIsBookingOpen(true);

    document.body.style.overflow = "hidden";
  }, []);

  // ===================================================
  // CLOSE BOOKING MODAL
  // ===================================================

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
    setSelectedVehicle(null);
    setBookingStep(1);

    document.body.style.overflow = "";
  }, []);

  // ===================================================
  // CLEAN BODY SCROLL
  // ===================================================

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleInputChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ===================================================
  // STEP 1
  // ===================================================

  const handleNext = (event) => {
    event.preventDefault();
    setBookingStep(2);
  };

  // ===================================================
  // STEP 2
  // ===================================================

  const handleFinalSubmit = (event) => {
    event.preventDefault();

    if (!formData.agreeTerms) {
      alert(
        "Please accept the Terms & Conditions to proceed."
      );
      return;
    }

    console.log("Confirmed Booking:", {
      business: BUSINESS.name,
      vehicle: selectedVehicle,
      bookingDetails: formData,
    });

    alert(
      "Your booking request has been submitted successfully!"
    );

    handleCloseBooking();
  };

  // ===================================================
  // PAGINATION SCROLL
  // ===================================================

  const changePage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section
      className="TravellerJourney"
      aria-labelledby="traveller-journey-title"
    >
      <div className="TravellerJourney__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="TravellerJourney__header">

          <div className="TravellerJourney__eyebrow">
            Jagannath Explorer Travels
          </div>

          <h1
            id="traveller-journey-title"
            className="TravellerJourney__heading"
          >
            Best tour and travel agency in bhubaneswar
          </h1>

          <p className="TravellerJourney__description">
            Looking for a comfortable vehicle for your next
            journey? <strong>Jagannath Explorer Travels</strong>{" "}
            provides Urbania Tempo Traveller rental services
            in Bhubaneswar for family trips, group tours,
            airport transfers, local sightseeing and
            outstation travel across Odisha.
          </p>

          <p className="TravellerJourney__description TravellerJourney__description--secondary">
            As a{" "}
            <strong>
              Best Tour &amp; Travel Agency in Bhubaneswar Odisha
            </strong>
            , we offer practical vehicle options for different
            group sizes. If you are searching for a{" "}
            <strong>
              Tour &amp; Travel Agency in Bhubaneswar, Odisha
            </strong>
            , you can contact our team to discuss your travel
            date, route and vehicle requirement.
          </p>

          <div
            className="TravellerJourney__titleLine"
            aria-hidden="true"
          >
            <span></span>
            <i>◆</i>
            <span></span>
          </div>

        </header>

        {/* =================================================
            BUSINESS CONTACT STRIP
        ================================================= */}

        <div className="TravellerJourney__contactStrip">

          <div className="TravellerJourney__contactInfo">

            <span className="TravellerJourney__contactLabel">
              Travel from Bhubaneswar
            </span>

            <span className="TravellerJourney__contactAddress">
              {BUSINESS.address}
            </span>

          </div>

          <div className="TravellerJourney__contactPhones">

            <a
              href={`tel:+91${BUSINESS.phone1}`}
              aria-label={`Call ${BUSINESS.phone1}`}
            >
              <FaPhoneAlt />
              +91 {BUSINESS.phone1}
            </a>

            <a
              href={`tel:+91${BUSINESS.phone2}`}
              aria-label={`Call ${BUSINESS.phone2}`}
            >
              <FaPhoneAlt />
              +91 {BUSINESS.phone2}
            </a>

          </div>

        </div>

        {/* =================================================
            VEHICLE SECTION
        ================================================= */}

        <div className="TravellerJourney__sectionIntro">

          <span className="TravellerJourney__sectionLabel">
            Urbania Tempo Traveller
          </span>

          <h2>
            Comfortable group travel from Bhubaneswar
          </h2>

          <p>
            Choose a vehicle according to your group size
            and travel plan. Our Urbania options are suitable
            for family holidays, corporate travel, sightseeing
            and outstation journeys.
          </p>

        </div>

        {/* =================================================
            VEHICLE GRID
        ================================================= */}

        <div className="TravellerJourney__grid">

          {displayedVehicles.map((vehicle) => (
            <article
              className="TravellerJourney__card"
              key={vehicle.id}
            >

              <div className="TravellerJourney__imageWrapper">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.name} rental in Bhubaneswar`}
                  className="TravellerJourney__image"
                  loading="lazy"
                />
              </div>

              <div className="TravellerJourney__content">

                <h3 className="TravellerJourney__vehicleName">
                  {vehicle.name}
                </h3>

                <div className="TravellerJourney__details">

                  <div className="TravellerJourney__detailRow">
                    <span>A/C</span>
                    <span className="TravellerJourney__detailValue">
                      {vehicle.ac}
                    </span>
                  </div>

                  <div className="TravellerJourney__detailRow">
                    <span>Seating</span>
                    <span className="TravellerJourney__detailValue">
                      {vehicle.seating}
                    </span>
                  </div>

                  <div className="TravellerJourney__detailRow">
                    <span>Comfort</span>
                    <span className="TravellerJourney__detailValue">
                      {vehicle.comfort}
                    </span>
                  </div>

                  <div className="TravellerJourney__detailRow">
                    <span>Best For</span>
                    <span className="TravellerJourney__detailValue">
                      {vehicle.bestFor}
                    </span>
                  </div>

                </div>

                <div className="TravellerJourney__bottom">

                  <div className="TravellerJourney__price">
                    <span className="TravellerJourney__priceAmount">
                      {vehicle.price}
                    </span>

                    <span className="TravellerJourney__priceHours">
                      / {vehicle.hours}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="TravellerJourney__bookButton"
                    onClick={() =>
                      handleBookNow(vehicle)
                    }
                    aria-label={`Book ${vehicle.name}`}
                  >
                    <span>Book Now</span>
                    <FaArrowRight />
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {totalPages > 1 && (
          <nav
            className="TravellerJourney__pagination"
            aria-label="Vehicle pagination"
          >

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                changePage(
                  Math.max(currentPage - 1, 1)
                )
              }
            >
              <FaArrowLeft />
              <span>Previous</span>
            </button>

            <div className="TravellerJourney__pageNumbers">

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    currentPage === page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    changePage(page)
                  }
                  aria-label={`Go to page ${page}`}
                  aria-current={
                    currentPage === page
                      ? "page"
                      : undefined
                  }
                >
                  {page}
                </button>
              ))}

            </div>

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                changePage(
                  Math.min(
                    currentPage + 1,
                    totalPages
                  )
                )
              }
            >
              <span>Next</span>
              <FaArrowRight />
            </button>

          </nav>
        )}

        {/* =================================================
            TRAVEL CONTENT
        ================================================= */}

        <div className="TravellerJourney__seoContent">

          <span className="TravellerJourney__sectionLabel">
            Travel Services in Bhubaneswar
          </span>

          <h2>
            Urbania Traveller and Group Travel Services
          </h2>

          <p>
            Jagannath Explorer Travels helps travellers
            arrange comfortable transportation from
            Bhubaneswar for local and outstation journeys.
            Whether you are travelling with family, friends
            or colleagues, you can choose a vehicle based on
            the number of passengers and your itinerary.
          </p>

          <p>
            Our Urbania Tempo Traveller options are suitable
            for Odisha sightseeing, weekend trips, family
            holidays, religious tours and corporate travel.
            For longer journeys, we can also help you choose
            a vehicle that suits the route and group size.
          </p>

          <p>
            If you are comparing a{" "}
            <strong>
              Tour &amp; Travel Agency in Bhubaneswar, Odisha
            </strong>
            , consider your vehicle requirement, travel
            distance, journey duration and service terms before
            booking. Our team is available to discuss your
            requirements directly.
          </p>

        </div>

      </div>

      {/* =====================================================
          SUPPORT BUTTON
      ===================================================== */}

      <a
        href={`tel:+91${BUSINESS.phone1}`}
        className="TravellerJourney__support"
        aria-label="Call Jagannath Explorer Travels"
      >
        <FaHeadset />
      </a>

      {/* =====================================================
          BOOKING MODAL
      ===================================================== */}

      {isBookingOpen && selectedVehicle && (
        <div
          className="TravellerJourney__modalOverlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleCloseBooking();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >

          <div className="TravellerJourney__modal">

            <button
              type="button"
              className="TravellerJourney__modalClose"
              onClick={handleCloseBooking}
              aria-label="Close booking form"
            >
              <FaTimes />
            </button>

            <div className="TravellerJourney__modalInner">

              {/* =========================================
                  STEP 1
              ========================================= */}

              {bookingStep === 1 && (
                <>

                  <h2
                    id="booking-modal-title"
                    className="TravellerJourney__modalTitle"
                  >
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

                  <form
                    className="TravellerJourney__form"
                    onSubmit={handleNext}
                  >

                    <div className="TravellerJourney__formGrid">

                      <div className="TravellerJourney__field">
                        <label htmlFor="pickupLocation">
                          Pick Up Location
                        </label>

                        <input
                          id="pickupLocation"
                          type="text"
                          name="pickupLocation"
                          value={
                            formData.pickupLocation
                          }
                          onChange={
                            handleInputChange
                          }
                          placeholder="Enter pickup location"
                          autoComplete="street-address"
                          required
                        />
                      </div>

                      <div className="TravellerJourney__field">
                        <label htmlFor="dropoffLocation">
                          Drop Off Location
                        </label>

                        <input
                          id="dropoffLocation"
                          type="text"
                          name="dropoffLocation"
                          value={
                            formData.dropoffLocation
                          }
                          onChange={
                            handleInputChange
                          }
                          placeholder="Enter drop-off location"
                          required
                        />
                      </div>

                    </div>

                    <div className="TravellerJourney__formGrid">

                      <div className="TravellerJourney__field">
                        <label htmlFor="pickupDateTime">
                          Pick Up Date &amp; Time
                        </label>

                        <input
                          id="pickupDateTime"
                          type="datetime-local"
                          name="pickupDateTime"
                          value={
                            formData.pickupDateTime
                          }
                          onChange={
                            handleInputChange
                          }
                          required
                        />
                      </div>

                      <div className="TravellerJourney__field">
                        <label htmlFor="dropDateTime">
                          Drop Date &amp; Time
                        </label>

                        <input
                          id="dropDateTime"
                          type="datetime-local"
                          name="dropDateTime"
                          value={
                            formData.dropDateTime
                          }
                          onChange={
                            handleInputChange
                          }
                          required
                        />
                      </div>

                    </div>

                    <div className="TravellerJourney__nextWrapper">

                      <button
                        type="submit"
                        className="TravellerJourney__nextButton"
                      >
                        <span>Next</span>
                        <FaArrowRight />
                      </button>

                    </div>

                  </form>

                </>
              )}

              {/* =========================================
                  STEP 2
              ========================================= */}

              {bookingStep === 2 && (
                <>

                  <h2 className="TravellerJourney__modalTitle">
                    Confirm Your Booking Details
                  </h2>

                  <form
                    className="TravellerJourney__form"
                    onSubmit={
                      handleFinalSubmit
                    }
                  >

                    <div className="TravellerJourney__field">

                      <div className="TravellerJourney__inputWrapperWithIcon">

                        <input
                          type="text"
                          name="fullName"
                          placeholder="Enter Your Full Name"
                          value={
                            formData.fullName
                          }
                          onChange={
                            handleInputChange
                          }
                          autoComplete="name"
                          required
                        />

                        <FaRegUser
                          className="TravellerJourney__inputIcon"
                        />

                      </div>

                    </div>

                    <div className="TravellerJourney__field">

                      <div className="TravellerJourney__inputWrapperWithIcon">

                        <input
                          type="tel"
                          name="mobileNumber"
                          inputMode="numeric"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          placeholder="Enter 10 Digit Mobile Number"
                          value={
                            formData.mobileNumber
                          }
                          onChange={
                            handleInputChange
                          }
                          autoComplete="tel"
                          required
                        />

                        <FaPhoneAlt
                          className="TravellerJourney__inputIcon"
                        />

                      </div>

                    </div>

                    <div className="TravellerJourney__field">

                      <textarea
                        name="message"
                        maxLength={150}
                        rows={3}
                        placeholder="Your Message (max 150 characters)"
                        value={
                          formData.message
                        }
                        onChange={
                          handleInputChange
                        }
                        className="TravellerJourney__textarea"
                      />

                    </div>

                    <div className="TravellerJourney__termsWrapper">

                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={
                          formData.agreeTerms
                        }
                        onChange={
                          handleInputChange
                        }
                        required
                      />

                      <label htmlFor="agreeTerms">
                        I agree to the{" "}
                        <a
                          href="#terms"
                          className="TravellerJourney__termsLink"
                        >
                          Terms &amp; Conditions
                        </a>{" "}
                        of{" "}
                        <strong>
                          Jagannath Explorer Travels
                        </strong>
                        .
                      </label>

                    </div>

                    <div className="TravellerJourney__actionsRow">

                      <button
                        type="button"
                        className="TravellerJourney__prevButton"
                        onClick={() =>
                          setBookingStep(1)
                        }
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