import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './Suvvehcle.css';

import suv1 from "../../assets/Suv1.webp";
import suv2 from "../../assets/Suv2.webp";
import suv3 from "../../assets/Suv3.webp";

const SUV_CARS = [
  {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga',
    accent: '#2563eb',
    seating: '7 Seater',
    ac: 'Automatic + Rear AC Vents',
    boot: '209 Litres',
    fuel: 'Petrol',
    price: 3000,
    duration: '8 Hours',
    image: suv1,
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    accent: '#0284c7',
    seating: '7 Seater',
    ac: 'Automatic + Rear AC Vents',
    boot: '300 Litres (Approx.)',
    fuel: 'Diesel',
    price: 3000,
    duration: '8 Hours',
    image: suv2,
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    accent: '#7c3aed',
    seating: '7 Seater',
    ac: 'Automatic + Rear AC Vents',
    boot: '300 Litres (Approx.)',
    fuel: 'Diesel',
    price: 4000,
    duration: '8 Hours',
    image: suv3,
  },
];

const SpecRow = ({ label, value }) => (
  <div className="suv-spec-row">
    <span className="suv-spec-row__label">{label}</span>
    <span className="suv-spec-row__value">{value}</span>
  </div>
);

const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 8h9M8.5 3.5L13 8l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------------------------------------------------------------------------
   BookingModal — Multi-step wizard matching reference forms
--------------------------------------------------------------------------- */
const BookingModal = ({ car, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropOffLocation: '',
    pickupDateTime: '',
    dropDateTime: '',
    fullName: '',
    mobileNumber: '',
    message: '',
    termsAgreed: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.pickupLocation || !formData.dropLocation || !formData.pickupDateTime) {
      alert('Please fill in required pickup and drop details.');
      return;
    }
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobileNumber) {
      alert('Please enter your Full Name and Mobile Number.');
      return;
    }
    if (!formData.termsAgreed) {
      alert('You must agree to the Terms & Conditions.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <div className="booking-modal-overlay" role="dialog" aria-modal="true" aria-label={`Book ${car.name}`}>
      <div className="booking-modal-backdrop" onClick={onClose} />
      <div className="booking-modal-container" ref={modalRef}>
        <button
          type="button"
          className="booking-modal__close"
          onClick={onClose}
          aria-label="Close booking form"
        >
          ✕
        </button>

        {!success ? (
          <>
            {step === 1 ? (
              <>
                <h3 className="booking-modal__title">Start Your Booking</h3>

                <div className="booking-modal__selected-car">
                  <img src={car.image} alt={car.name} className="booking-modal__car-thumb" />
                  <span className="booking-modal__car-name">{car.name}</span>
                </div>

                <form className="booking-modal__form" onSubmit={handleNext}>
                  <div className="booking-modal__row">
                    <div className="booking-modal__field">
                      <label htmlFor="pickupLocation">Pick Up Location</label>
                      <input
                        type="text"
                        id="pickupLocation"
                        name="pickupLocation"
                        required
                        placeholder="Pick Up Location"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="booking-modal__field">
                      <label htmlFor="dropOffLocation">Drop Off Location</label>
                      <input
                        type="text"
                        id="dropOffLocation"
                        name="dropOffLocation"
                        required
                        placeholder="Drop Off Location"
                        value={formData.dropOffLocation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="booking-modal__row">
                    <div className="booking-modal__field">
                      <label htmlFor="pickupDateTime">Pick Up Date & Time</label>
                      <input
                        type="datetime-local"
                        id="pickupDateTime"
                        name="pickupDateTime"
                        required
                        value={formData.pickupDateTime}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="booking-modal__field">
                      <label htmlFor="dropDateTime">Drop Date & Time</label>
                      <input
                        type="datetime-local"
                        id="dropDateTime"
                        name="dropDateTime"
                        value={formData.dropDateTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="booking-modal__submit-wrapper">
                    <button type="submit" className="booking-modal__submit">
                      Next →
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3 className="booking-modal__title">Confirm Your Booking Details</h3>

                <form className="booking-modal__form" onSubmit={handleSubmit}>
                  <div className="booking-modal__field booking-modal__field--full">
                    <div className="booking-modal__input-icon-wrapper">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="* Enter Your Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      <span className="booking-modal__input-icon" aria-hidden="true">👤</span>
                    </div>
                  </div>

                  <div className="booking-modal__field booking-modal__field--full">
                    <div className="booking-modal__input-icon-wrapper">
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        required
                        maxLength="10"
                        placeholder="* Enter 10 Digit Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                      <span className="booking-modal__input-icon" aria-hidden="true">📞</span>
                    </div>
                  </div>

                  <div className="booking-modal__field booking-modal__field--full">
                    <textarea
                      id="message"
                      name="message"
                      maxLength="150"
                      rows="4"
                      placeholder="Your Message (max 150 characters)"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="booking-modal__terms">
                    <label className="booking-modal__checkbox-label">
                      <input
                        type="checkbox"
                        name="termsAgreed"
                        required
                        checked={formData.termsAgreed}
                        onChange={handleChange}
                      />
                      <span>
                        I agree to the <span className="booking-modal__terms-link">Terms & Conditions</span> from <strong>Jagannath Tours & Travels</strong>.
                      </span>
                    </label>
                  </div>

                  <div className="booking-modal__actions-row">
                    <button type="button" className="booking-modal__prev-btn" onClick={handlePrevious}>
                      ← Previous
                    </button>
                    <button type="submit" className="booking-modal__submit" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Submit →'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        ) : (
          <div className="booking-modal__success">
            <div className="booking-modal__success-icon">✓</div>
            <h3>Booking Request Received!</h3>
            <p>Your vehicle reservation request for <strong>{car.name}</strong> has been logged successfully. Our team will contact you shortly.</p>
            <button type="button" className="booking-modal__submit" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   SuvCard Component (Image click -> 3D stage, Book Now -> Form)
--------------------------------------------------------------------------- */
const SuvCard = ({ car, index, onOpenImage, onBook }) => {
  const specs = [
    { label: 'Seating Capacity', value: car.seating },
    { label: 'A/C', value: car.ac },
    { label: 'Boot Space', value: car.boot },
    { label: 'Fuel Type', value: car.fuel },
  ];

  return (
    <article className="suv-card" style={{ '--accent': car.accent, '--stagger': index }}>
      <div 
        className="suv-card__frame" 
        onClick={() => onOpenImage(car.id)}
        role="button"
        tabIndex={0}
        aria-label={`View 3D showroom for ${car.name}`}
      >
        <div className="suv-card__glow" aria-hidden="true" />
        <img className="suv-card__image" src={car.image} alt={car.name} loading="lazy" />
      </div>

      <h3 className="suv-card__name">{car.name}</h3>

      <div className="suv-card__specs">
        {specs.map((s) => (
          <SpecRow key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="suv-card__footer">
        <p className="suv-card__price">
          <span className="suv-card__price-amount">₹{car.price}</span>
          <span className="suv-card__price-unit">/{car.duration}</span>
        </p>
        <button
          type="button"
          className="suv-book-btn"
          onClick={() => onBook(car)}
        >
          Book Now
          <BookIcon />
        </button>
      </div>
    </article>
  );
};

/* ---------------------------------------------------------------------------
   SuvStage Component — 3D Rotating Showroom Modal
--------------------------------------------------------------------------- */
const SuvStage = ({ car, onClose, onBook }) => {
  const [angle, setAngle] = useState(0);
  const [mounted, setMounted] = useState(false);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const rafRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    closeBtnRef.current?.focus();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    let lastTime = performance.now();
    const loop = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!draggingRef.current) {
        angleRef.current = (angleRef.current + delta * 0.04) % 360;
        setAngle(angleRef.current);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

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
    <div className={`suv-stage${mounted ? ' suv-stage--open' : ''}`} role="dialog" aria-modal="true">
      <div className="suv-stage__backdrop" onClick={onClose} />

      <div className="suv-stage__panel">
        <button
          ref={closeBtnRef}
          type="button"
          className="suv-stage__close"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>

        <div className="suv-stage__visual" style={{ '--accent': car.accent }}>
          <div className="suv-stage__spotlight" aria-hidden="true" />
          <div className="suv-stage__ring" aria-hidden="true" />

          <div
            className="suv-stage__turntable"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div
              className="suv-stage__figure"
              style={{ transform: `perspective(1000px) rotateY(${angle}deg)` }}
            >
              <img className="suv-stage__image" src={car.image} alt={car.name} />
            </div>
            <div className="suv-stage__shadow" />
          </div>

          <span className="suv-stage__hint">Drag to rotate / Auto-rotating 3D View</span>
        </div>

        <div className="suv-stage__info">
          <p className="suv-stage__eyebrow">SUV CARS FLEET</p>
          <h3 className="suv-stage__name">{car.name}</h3>

          <div className="suv-stage__specs">
            <SpecRow label="Seating Capacity" value={car.seating} />
            <SpecRow label="A/C" value={car.ac} />
            <SpecRow label="Boot Space" value={car.boot} />
            <SpecRow label="Fuel Type" value={car.fuel} />
          </div>

          <div className="suv-stage__footer">
            <p className="suv-card__price suv-stage__price">
              <span className="suv-card__price-amount">₹{car.price}</span>
              <span className="suv-card__price-unit">/{car.duration}</span>
            </p>
            <button
              type="button"
              className="suv-book-btn suv-book-btn--lg"
              onClick={() => onBook(car)}
            >
              Book Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   Suvvehcle Component
--------------------------------------------------------------------------- */
const Suvvehcle = () => {
  const [openId, setOpenId] = useState(null);
  const [bookingCar, setBookingCar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpenImage = useCallback((id) => setOpenId(id), []);
  const handleCloseImage = useCallback(() => setOpenId(null), []);
  
  const handleOpenBooking = useCallback((car) => {
    setOpenId(null);
    setBookingCar(car);
  }, []);
  
  const handleCloseBooking = useCallback(() => setBookingCar(null), []);

  const itemsPerPage = isMobile ? 1 : SUV_CARS.length;
  const totalPages = Math.ceil(SUV_CARS.length / itemsPerPage);

  const displayedCars = useMemo(() => {
    if (!isMobile) return SUV_CARS;
    const start = (currentPage - 1) * itemsPerPage;
    return SUV_CARS.slice(start, start + itemsPerPage);
  }, [isMobile, currentPage, itemsPerPage]);

  const activeCar = SUV_CARS.find((c) => c.id === openId) || null;

  return (
    <section className="suv-catalog">
      <header className="suv-catalog__header">
        <p className="suv-catalog__eyebrow">SUV CARS</p>
        <h2 className="suv-catalog__title">
          Premium SUV Car On Rent in Bhubaneswar for Every Journey
        </h2>
        <p className="suv-catalog__desc">
          Enjoy comfortable and reliable SUV <strong>Taxi and Cab Service in Bhubaneswar</strong> with
          compact 5-seaters to spacious 7-seaters and multi-row family Outstation Cab Booking with
          professional drivers, perfect for both city travel and long-distance journeys.
        </p>
      </header>

      <div className="suv-grid">
        {displayedCars.map((car, i) => (
          <SuvCard
            key={car.id}
            car={car}
            index={i}
            onOpenImage={handleOpenImage}
            onBook={handleOpenBooking}
          />
        ))}
      </div>

      {isMobile && totalPages > 1 && (
        <div className="suv-pagination">
          <button
            type="button"
            className="suv-pagination__btn"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          >
            Prev
          </button>
          
          <div className="suv-pagination__info">
            Page {currentPage} of {totalPages}
          </div>

          <button
            type="button"
            className="suv-pagination__btn"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          >
            Next
          </button>
        </div>
      )}

      {activeCar && (
        <SuvStage
          car={activeCar}
          onClose={handleCloseImage}
          onBook={(car) => {
            handleCloseImage();
            handleOpenBooking(car);
          }}
        />
      )}

      {bookingCar && (
        <BookingModal car={bookingCar} onClose={handleCloseBooking} />
      )}
    </section>
  );
};

export default Suvvehcle;