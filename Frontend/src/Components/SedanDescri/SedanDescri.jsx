import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './SedanDescri.css';
import API from '../../api/axios';

/* ---------------------------------------------------------------------------
   Data — Exactly 5 curated sedan cars imported with the requested assets.
--------------------------------------------------------------------------- */

import sedan1 from '../../assets/Sedan1.webp';
import sedan2 from '../../assets/Sedan2.webp';
import sedan3 from '../../assets/Sedan3.webp';
import sedan4 from '../../assets/Sedan4.webp';
import sedan5 from '../../assets/Sedan5.webp';

const CARS = [
  {
    id: 'dzire',
    name: 'Swift Dzire',
    accent: '#d97706',
    seating: '5 Seater',
    ac: 'Automatic Climate Control',
    boot: '378L',
    fuel: 'Petrol',
    price: 2200,
    duration: '8 Hours',
    image: sedan1,
  },
  {
    id: 'aura',
    name: 'Hyundai Aura',
    accent: '#0284c7',
    seating: '5 Seater',
    ac: 'Automatic Climate + Rear AC Vents',
    boot: '402L',
    fuel: 'Petrol',
    price: 2200,
    duration: '8 Hours',
    image: sedan2,
  },
  {
    id: 'xcent',
    name: 'Hyundai Xcent',
    accent: '#7c3aed',
    seating: '5 Seater',
    ac: 'Automatic Climate + Rear AC Vents',
    boot: '407L',
    fuel: 'Petrol',
    price: 2200,
    duration: '8 Hours',
    image: sedan3,
  },
  {
    id: 'city',
    name: 'Honda City',
    accent: '#059669',
    seating: '5 Seater',
    ac: 'Yes + Rear AC Vents',
    boot: '506L',
    fuel: 'Petrol',
    price: 4500,
    duration: '8 Hours',
    image: sedan4,
  },
  {
    id: 'verna',
    name: 'Hyundai Verna',
    accent: '#ea580c',
    seating: '5 Seater',
    ac: 'Automatic + Rear AC Vents',
    boot: '528L',
    fuel: 'Petrol',
    price: 4500,
    duration: '8 Hours',
    image: sedan5,
  },
];

const STAGE_TRANSITION_MS = 420;
const BOOKING_TRANSITION_MS = 320;

/* ---------------------------------------------------------------------------
   SpecRow
--------------------------------------------------------------------------- */

const SpecRow = ({ label, value }) => (
  <div className="spec-row">
    <span className="spec-row__label">{label}</span>
    <span className="spec-row__value">{value}</span>
  </div>
);

const BookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 8h9M8.5 3.5L13 8l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------------------------------------------------
   BookingModal — multi-step wizard matching reference layout & step 2 design
--------------------------------------------------------------------------- */

const BookingModal = ({ car, open, onRequestClose }) => {
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
  const firstFieldRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onRequestClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onRequestClose]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 260);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open, step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!/^\d{10}$/.test(cleanMobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        vehicleName: car?.name || 'Sedan Car',
        vehicleType: 'Sedan',
        vehiclePrice: car?.price ? `₹${car.price} / ${car.duration}` : '',
        vehicleImage: typeof car?.image === 'string' ? car.image : '',
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropOffLocation || formData.dropLocation,
        pickupDateTime: formData.pickupDateTime,
        dropDateTime: formData.dropDateTime,
        fullName: formData.fullName,
        mobileNumber: cleanMobile,
        message: formData.message,
        agreedToTerms: formData.termsAgreed,
      };

      await API.post('/car-bookings', payload);
      setSuccess(true);
    } catch (error) {
      console.error('Sedan booking error:', error);
      alert(
        error.response?.data?.message ||
          'Failed to submit booking. Please verify your details or contact us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`booking-modal-overlay${open ? ' booking-modal-overlay--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${car.name}`}
    >
      <div className="booking-modal-backdrop" onClick={onRequestClose} />
      <div className="booking-modal-container">
        <button
          type="button"
          className="booking-modal__close"
          onClick={onRequestClose}
          aria-label="Close booking form"
        >
          <CloseIcon />
        </button>

        {!success ? (
          <>
            {step === 1 ? (
              <>
                <p className="booking-modal__eyebrow">Reserve Your Ride</p>
                <h3 className="booking-modal__title">Start Your Booking</h3>

                <div className="booking-modal__selected-car">
                  <img src={car.image} alt={car.name} className="booking-modal__car-thumb" />
                  <div className="booking-modal__car-meta">
                    <span className="booking-modal__car-name">{car.name}</span>
                    <span className="booking-modal__car-price">
                      ₹{car.price} <em>/{car.duration}</em>
                    </span>
                  </div>
                </div>

                <form className="booking-modal__form" onSubmit={handleNext}>
                  <div className="booking-modal__row">
                    <div className="booking-modal__field">
                      <label htmlFor="pickupLocation">Pick Up Location</label>
                      <input
                        ref={firstFieldRef}
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
                      <label htmlFor="pickupDateTime">Pick Up Date &amp; Time</label>
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
                      <label htmlFor="dropDateTime">Drop Date &amp; Time</label>
                      <input
                        type="datetime-local"
                        id="dropDateTime"
                        name="dropDateTime"
                        required
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
                        ref={firstFieldRef}
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="* Enter Your Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      <span className="booking-modal__input-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </span>
                    </div>
                  </div>

                  <div className="booking-modal__field booking-modal__field--full">
                    <div className="booking-modal__input-icon-wrapper">
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        required
                        pattern="[0-9]{10}"
                        maxLength="10"
                        placeholder="* Enter 10 Digit Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                      <span className="booking-modal__input-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      </span>
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
                        I agree to the <span className="booking-modal__terms-link">Terms & Conditions</span> from <strong>Jagannath Explorer Travels</strong>.
                      </span>
                    </label>
                  </div>

                  <div className="booking-modal__actions-row">
                    <button type="button" className="booking-modal__prev-btn" onClick={handlePrevious}>
                      ← Previous
                    </button>
                    <button type="submit" className="booking-modal__submit" disabled={submitting}>
                      {submitting ? (
                        <span className="booking-modal__spinner" aria-hidden="true" />
                      ) : (
                        'Submit →'
                      )}
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
            <p>
              Your vehicle reservation request for <strong>{car.name}</strong> has been logged
              successfully. Our team will contact you shortly.
            </p>
            <button type="button" className="booking-modal__submit" onClick={onRequestClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   CarCard
--------------------------------------------------------------------------- */

const CarCard = ({ car, index, onOpen, onBook }) => {
  const specs = [
    { label: 'Seating Capacity', value: car.seating },
    { label: 'A/C', value: car.ac },
    { label: 'Boot Space', value: car.boot },
    { label: 'Fuel Type', value: car.fuel },
  ];

  return (
    <article
      className="car-card"
      style={{ '--accent': car.accent, '--stagger': index }}
      onClick={() => onOpen(car.id)}
      role="button"
      tabIndex={0}
      aria-label={`View ${car.name} details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(car.id);
        }
      }}
    >
      <span className="car-card__badge">Available Today</span>

      <div className="car-card__frame">
        <div className="car-card__glow" aria-hidden="true" />
        <img className="car-card__image" src={car.image} alt={car.name} loading="lazy" />
      </div>

      <h3 className="car-card__name">{car.name}</h3>

      <div className="car-card__specs">
        {specs.map((s) => (
          <SpecRow key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="car-card__footer">
        <p className="car-card__price">
          <span className="car-card__price-amount">₹{car.price}</span>
          <span className="car-card__price-unit">/{car.duration}</span>
        </p>
        <button
          type="button"
          className="book-btn"
          onClick={(e) => {
            e.stopPropagation();
            onBook(car);
          }}
        >
          <span>Book Now</span>
          <BookIcon />
        </button>
      </div>
    </article>
  );
};

/* ---------------------------------------------------------------------------
   CarStage — Showroom overlay, symmetric fade/scale open+close, drag-to-rotate
--------------------------------------------------------------------------- */

const CarStage = ({ car, open, onRequestClose, onBook }) => {
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const rafRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => closeBtnRef.current?.focus(), 260);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

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
      if (e.key === 'Escape') onRequestClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onRequestClose]);

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
    <div
      className={`car-stage${open ? ' car-stage--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${car.name} details`}
    >
      <div className="car-stage__backdrop" onClick={onRequestClose} />

      <div className="car-stage__panel">
        <button
          ref={closeBtnRef}
          type="button"
          className="car-stage__close"
          onClick={onRequestClose}
          aria-label="Close details"
        >
          <CloseIcon />
        </button>

        <div className="car-stage__visual" style={{ '--accent': car.accent }}>
          <div className="car-stage__spotlight" aria-hidden="true" />
          <div className="car-stage__ring" aria-hidden="true" />

          <div
            className="car-stage__turntable"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div
              className="car-stage__figure"
              style={{ transform: `perspective(1000px) rotateY(${angle}deg)` }}
            >
              <img className="car-stage__image" src={car.image} alt={car.name} />
            </div>
            <div className="car-stage__shadow" />
          </div>

          <span className="car-stage__hint">Drag to rotate · Auto-rotating</span>
        </div>

        <div className="car-stage__info">
          <p className="car-stage__eyebrow">Sedan Cars</p>
          <h3 className="car-stage__name">{car.name}</h3>

          <div className="car-stage__specs">
            <SpecRow label="Seating Capacity" value={car.seating} />
            <SpecRow label="A/C" value={car.ac} />
            <SpecRow label="Boot Space" value={car.boot} />
            <SpecRow label="Fuel Type" value={car.fuel} />
          </div>

          <div className="car-stage__footer">
            <p className="car-card__price car-stage__price">
              <span className="car-card__price-amount">₹{car.price}</span>
              <span className="car-card__price-unit">/{car.duration}</span>
            </p>
            <button type="button" className="book-btn book-btn--lg" onClick={() => onBook(car)}>
              <span>Book Now →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   SedanDescri — Premium Modern Light Theme & Agency Header
--------------------------------------------------------------------------- */

const SedanDescri = () => {
  const [stageCar, setStageCar] = useState(null);
  const [stageOpen, setStageOpen] = useState(false);
  const [bookingCar, setBookingCar] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const stageTimeoutRef = useRef(null);
  const bookingTimeoutRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(stageTimeoutRef.current);
      clearTimeout(bookingTimeoutRef.current);
    },
    []
  );

  const handleOpen = useCallback((id) => {
    clearTimeout(stageTimeoutRef.current);
    const car = CARS.find((c) => c.id === id) || null;
    setStageCar(car);
    requestAnimationFrame(() => requestAnimationFrame(() => setStageOpen(true)));
  }, []);

  const handleClose = useCallback(() => {
    setStageOpen(false);
    stageTimeoutRef.current = setTimeout(() => setStageCar(null), STAGE_TRANSITION_MS);
  }, []);

  const handleOpenBooking = useCallback((car) => {
    clearTimeout(bookingTimeoutRef.current);
    setBookingCar(car);
    requestAnimationFrame(() => requestAnimationFrame(() => setBookingOpen(true)));
  }, []);

  const handleCloseBooking = useCallback(() => {
    clearTimeout(bookingTimeoutRef.current);
    setBookingOpen(false);
    bookingTimeoutRef.current = setTimeout(() => setBookingCar(null), BOOKING_TRANSITION_MS);
  }, []);

  const itemsPerPage = isMobile ? 1 : CARS.length;
  const totalPages = Math.ceil(CARS.length / itemsPerPage);

  const displayedCars = useMemo(() => {
    if (!isMobile) return CARS;
    const start = (currentPage - 1) * itemsPerPage;
    return CARS.slice(start, start + itemsPerPage);
  }, [isMobile, currentPage, itemsPerPage]);

  return (
    <section className="sedan-catalog">
      <header className="sedan-catalog__header">
        <div className="sedan-catalog__badge-pill">
          <span>✨ Welcome to Jagannath Explorer Travels</span>
        </div>

        <h1 className="sedan-catalog__title">
          Best tour and travel agency in bhubaneswar
        </h1>

        <p className="sedan-catalog__desc">
          Experience world-class comfort with <strong>Jagannath Explorer Travels</strong>. We offer pristine vehicles, professional chauffeurs, airport pickups, scenic local sightseeing, and outstation trips tailored for your ultimate safety and luxury.
        </p>

        <div className="sedan-catalog__business-info">
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

      <div className="car-grid">
        {displayedCars.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} onOpen={handleOpen} onBook={handleOpenBooking} />
        ))}
      </div>

      {isMobile && totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination__btn"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          >
            Previous
          </button>
          <div className="pagination__indicators">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`pagination__dot ${currentPage === idx + 1 ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage(idx + 1);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="pagination__btn"
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

      {stageCar && (
        <CarStage
          car={stageCar}
          open={stageOpen}
          onRequestClose={handleClose}
          onBook={(car) => {
            handleClose();
            handleOpenBooking(car);
          }}
        />
      )}

      {bookingCar && (
        <BookingModal car={bookingCar} open={bookingOpen} onRequestClose={handleCloseBooking} />
      )}
    </section>
  );
};

export default SedanDescri;