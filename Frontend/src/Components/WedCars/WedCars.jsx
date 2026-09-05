import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import "./WedCars.css";
import image1 from "../../assets/Weddingcar1.webp";
import image2 from "../../assets/Weddingcar2.webp";
import image3 from "../../assets/Weddingcar3.webp";
import image4 from "../../assets/Weddingcar4.webp";
import image5 from "../../assets/Weddingcar5.webp";
import image6 from "../../assets/Weddingcar6.webp";

/* =========================================================
   WEDDING CAR DATA
   ========================================================= */
const WEDDING_CARS = [
  {
    id: "audi-a4",
    name: "Audi A4",
    type: "Luxury Wedding Car",
    accent: "#c58c35",
    sunroof: "Electric Sunroof",
    interior: "Premium Leather Interior",
    use: "Luxury Wedding / Groom Entry",
    advantage: "Smooth Ride",
    image: image1,
  },
  {
    id: "audi-a5",
    name: "Audi A5",
    type: "Luxury Wedding Car",
    accent: "#b99352",
    sunroof: "Electric Sunroof",
    interior: "Premium Leather Interior",
    use: "Bride & Groom Entry",
    advantage: "Elegant Premium Look",
    image: image2,
  },
  {
    id: "audi-a6",
    name: "Audi A6",
    type: "Executive Wedding Car",
    accent: "#d0a85c",
    sunroof: "Electric Sunroof",
    interior: "Executive Leather Interior",
    use: "Grand Wedding Entry",
    advantage: "Luxury & Comfort",
    image: image3,
  },
  {
    id: "bmw",
    name: "BMW",
    type: "Luxury Wedding Car",
    accent: "#d89b35",
    sunroof: "Panoramic / Convertible",
    interior: "Sporty Luxury Interior",
    use: "Stylish Groom Entry",
    advantage: "High Road Attraction",
    image: image4,
  },
  {
    id: "jaguar",
    name: "Jaguar",
    type: "Royal Wedding Car",
    accent: "#b88935",
    sunroof: "Panoramic Sunroof",
    interior: "Silent Luxury Cabin",
    use: "Royal Wedding Entry",
    advantage: "Elegant Design",
    image: image5,
  },
  {
    id: "mercedes",
    name: "Mercedes",
    type: "Premium Wedding Car",
    accent: "#c9a45c",
    sunroof: "Panoramic Sunroof",
    interior: "Ultra Luxury Interior",
    use: "VIP Wedding Entry",
    advantage: "Top-Class Comfort & Prestige",
    image: image6,
  },
];

/* =========================================================
   ARROW COMPONENT
   ========================================================= */
const ArrowIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3.5 9h10.5M9.5 4.5L14 9l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================
   WEDDING CAR IMAGE (Click to open 3D Showcase)
   ========================================================= */
const WeddingCarImage = ({ car, onOpenStage }) => {
  return (
    <div className="wed-card-image-box" onClick={() => onOpenStage(car.id)}>
      <div className="wed-card-image-wrap">
        <img
          className="wed-card-image"
          src={car.image}
          alt={`${car.name} luxury wedding car`}
          loading="lazy"
        />
        <div className="wed-image-overlay" />
        <div className="wedding-badge">
          <span>✦</span>
          WEDDING HIRE
          <span>✦</span>
        </div>
        <div className="image-shine" />
      </div>
      <div className="image-bottom-fade" />
    </div>
  );
};

/* =========================================================
   SPEC ROW COMPONENT
   ========================================================= */
const SpecRow = ({ label, value }) => (
  <div className="wed-spec-row">
    <span className="wed-spec-label">{label}</span>
    <span className="wed-spec-value">{value}</span>
  </div>
);

/* =========================================================
   CAR CARD COMPONENT
   ========================================================= */
const WedCard = ({ car, index, onOpenStage, onOpenBooking }) => {
  const specs = [
    { label: "Sunroof", value: car.sunroof },
    { label: "Interior", value: car.interior },
    { label: "Use", value: car.use },
    { label: "Advantage", value: car.advantage },
  ];

  return (
    <article
      className="wed-card"
      style={{
        "--accent": car.accent,
        "--delay": `${index * 0.1}s`,
      }}
    >
      <WeddingCarImage car={car} onOpenStage={onOpenStage} />

      <div className="wed-card-content">
        <div className="car-type">
          <span className="type-dot" />
          {car.type}
        </div>

        <h3 className="wed-card-name" onClick={() => onOpenStage(car.id)} style={{ cursor: "pointer" }}>
          {car.name}
        </h3>

        <div className="gold-line">
          <span />
          <i>✦</i>
          <span />
        </div>

        <div className="wed-specs">
          {specs.map((item) => (
            <SpecRow key={item.label} label={item.label} value={item.value} />
          ))}
        </div>

        <div className="wed-card-footer">
          <a
            href="tel:+919876543210"
            className="wed-btn wed-btn-dark"
          >
            Call Now
            <ArrowIcon />
          </a>

          <button
            type="button"
            className="wed-btn wed-btn-gold"
            onClick={() => onOpenBooking(car)}
          >
            Book Now
            <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  );
};

/* =========================================================
   3D SHOWROOM STAGE MODAL
   ========================================================= */
const WedStage = ({ car, onClose, onOpenBooking }) => {
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let lastTime = performance.now();
    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!draggingRef.current) {
        angleRef.current = (angleRef.current + delta * 0.035) % 360;
        setAngle(angleRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startAngleRef.current = angleRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const delta = (e.clientX - startXRef.current) * 0.5;
    angleRef.current = startAngleRef.current + delta;
    setAngle(angleRef.current);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <div className="wed-stage" role="dialog" aria-modal="true">
      <div className="wed-stage-backdrop" onClick={onClose} />

      <div className="wed-stage-panel">
        <button className="wed-stage-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="wed-stage-visual" style={{ "--accent": car.accent }}>
          <div className="stage-glow" />
          <div className="stage-ring" />

          <div
            className="stage-turntable"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div
              className="stage-car"
              style={{
                transform: `perspective(1000px) rotateY(${angle}deg)`,
              }}
            >
              <img src={car.image} alt={car.name} />
            </div>
            <div className="stage-shadow" />
          </div>

          <div className="drag-hint">↔ Drag to rotate · Auto rotating 3D view</div>
        </div>

        <div className="wed-stage-info">
          <span className="stage-label">✦ Luxury Wedding Collection ✦</span>
          <h2>{car.name}</h2>
          <p className="stage-description">
            Make your special day unforgettable with our immaculately maintained,
            chauffeur-driven {car.name} designed for grand wedding entrances.
          </p>

          <div className="stage-specs">
            <SpecRow label="Sunroof" value={car.sunroof} />
            <SpecRow label="Interior" value={car.interior} />
            <SpecRow label="Use" value={car.use} />
            <SpecRow label="Advantage" value={car.advantage} />
          </div>

          <div className="stage-footer">
            <a href="tel:+919876543210" className="wed-btn wed-btn-dark large">
              Call Now
              <ArrowIcon />
            </a>

            <button
              type="button"
              className="wed-btn wed-btn-gold large"
              onClick={() => onOpenBooking(car)}
            >
              Book Now
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MULTI-STEP BOOKING POPUP MODAL
   ========================================================= */
const BookingModal = ({ car, onClose }) => {
  const [modalStep, setModalStep] = useState(1);
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.pickupLocation || !formData.dropLocation || !formData.pickupDateTime) {
      alert("Please fill in required pickup and drop details.");
      return;
    }
    setModalStep(2);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobileNumber) {
      alert("Please enter your Full Name and Mobile Number.");
      return;
    }
    if (!formData.agreedToTerms) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }

    alert(`Booking successfully requested for ${car.name}! We will contact you soon.`);
    onClose();
  };

  return (
    <div className="wed-booking-overlay" onClick={onClose}>
      <div className="wed-booking-content" onClick={(e) => e.stopPropagation()}>
        <button className="wed-booking-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {modalStep === 1 ? (
          <form onSubmit={handleNextStep}>
            <h2 className="wed-booking-title">Start Your Booking</h2>

            <div className="wed-selected-car-banner">
              <img src={car.image} alt={car.name} />
              <span>{car.name}</span>
            </div>

            <div className="wed-form-grid">
              <div className="wed-form-group">
                <label>Pick Up Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  placeholder="Pick Up Location"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="wed-form-group">
                <label>Drop Off Location</label>
                <input
                  type="text"
                  name="dropLocation"
                  placeholder="Drop Off Location"
                  value={formData.dropLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="wed-form-group">
                <label>Pick Up Date &amp; Time</label>
                <input
                  type="datetime-local"
                  name="pickupDateTime"
                  value={formData.pickupDateTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="wed-form-group">
                <label>Drop Date &amp; Time</label>
                <input
                  type="datetime-local"
                  name="dropDateTime"
                  value={formData.dropDateTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="wed-booking-actions">
              <button type="submit" className="wed-booking-next-btn">
                Next →
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <h2 className="wed-booking-title">Confirm Your Booking Details</h2>

            <div className="wed-form-group">
              <div className="wed-input-icon-box">
                <input
                  type="text"
                  name="fullName"
                  placeholder="* Enter Your Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
                <span className="wed-field-icon">👤</span>
              </div>
            </div>

            <div className="wed-form-group">
              <div className="wed-input-icon-box">
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="* Enter 10 Digit Mobile Number"
                  maxLength="10"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                />
                <span className="wed-field-icon">📞</span>
              </div>
            </div>

            <div className="wed-form-group">
              <textarea
                name="message"
                rows="4"
                maxLength="150"
                placeholder="Your Message (max 150 characters)"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="wed-checkbox-row">
              <label>
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  required
                />
                I agree to the <span className="wed-link-text">Terms &amp; Conditions</span> from <strong>Jagannath Tours &amp; Travels</strong>.
              </label>
            </div>

            <div className="wed-booking-actions wed-step2-footer">
              <button
                type="button"
                className="wed-booking-prev-btn"
                onClick={() => setModalStep(1)}
              >
                ← Previous
              </button>
              <button type="submit" className="wed-booking-submit-btn">
                Submit →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT (WedCars)
   ========================================================= */
const WedCars = () => {
  const [stageCarId, setStageCarId] = useState(null);
  const [bookingCar, setBookingCar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOpenStage = useCallback((id) => setStageCarId(id), []);
  const handleCloseStage = useCallback(() => setStageCarId(null), []);

  const handleOpenBooking = useCallback((car) => {
    setStageCarId(null); // Close 3D stage if open
    setBookingCar(car);
  }, []);
  const handleCloseBooking = useCallback(() => setBookingCar(null), []);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(WEDDING_CARS.length / itemsPerPage);

  const displayedCars = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return WEDDING_CARS.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const activeStageCar =
    WEDDING_CARS.find((car) => car.id === stageCarId) || null;

  return (
    <section className="wed-catalog">
      <div className="catalog-glow glow-one" />
      <div className="catalog-glow glow-two" />

      <header className="wed-header">
        <span className="header-small">✦ PREMIUM WEDDING COLLECTION ✦</span>
        <h1>
          Decorated Luxury
          <br />
          <span>Wedding Cars</span>
        </h1>

        <div className="header-divider">
          <span />
          ❦
          <span />
        </div>

        <p>
          Make your wedding day special with{" "}
          <strong>Wedding Car Rental Service in Bhubaneswar</strong> for a grand
          and stylish entry. Premium vehicles with pristine interiors, expert chauffeurs,
          and exceptional service for weddings and special occasions.
        </p>
      </header>

      <div className="wed-grid">
        {displayedCars.map((car, index) => (
          <WedCard
            key={car.id}
            car={car}
            index={index}
            onOpenStage={handleOpenStage}
            onOpenBooking={handleOpenBooking}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="wed-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
          >
            ← Previous
          </button>

          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
          >
            Next →
          </button>
        </div>
      )}

      {activeStageCar && (
        <WedStage
          car={activeStageCar}
          onClose={handleCloseStage}
          onOpenBooking={handleOpenBooking}
        />
      )}

      {bookingCar && (
        <BookingModal car={bookingCar} onClose={handleCloseBooking} />
      )}
    </section>
  );
};

export default WedCars;