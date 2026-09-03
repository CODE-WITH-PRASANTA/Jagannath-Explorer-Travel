import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './SedanDescri.css';

/* ---------------------------------------------------------------------------
   Data
   6 premium sedan cars curated for the car rental fleet.
--------------------------------------------------------------------------- */

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
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'ciaz',
    name: 'Maruti Ciaz',
    accent: '#4f46e5',
    seating: '5 Seater',
    ac: 'Automatic Climate Control',
    boot: '510L',
    fuel: 'Petrol / Hybrid',
    price: 3800,
    duration: '8 Hours',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
  },
];

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

/* ---------------------------------------------------------------------------
   CarCard
--------------------------------------------------------------------------- */

const CarCard = ({ car, index, onOpen }) => {
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
            onOpen(car.id);
          }}
        >
          Book Now
          <BookIcon />
        </button>
      </div>
    </article>
  );
};

/* ---------------------------------------------------------------------------
   CarStage — full-screen white showroom with auto-rotating & interactive model
--------------------------------------------------------------------------- */

const CarStage = ({ car, onClose }) => {
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

  // Continuous auto-rotation loop that pauses when dragged
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
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
    <div
      className={`car-stage${mounted ? ' car-stage--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${car.name} details`}
    >
      <div className="car-stage__backdrop" onClick={onClose} />

      <div className="car-stage__panel">
        <button
          ref={closeBtnRef}
          type="button"
          className="car-stage__close"
          onClick={onClose}
          aria-label="Close details"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 4l10 10M14 4L4 14"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
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

          <span className="car-stage__hint">Drag to rotate / Auto-rotating</span>
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
            <button type="button" className="book-btn book-btn--lg">
              Book Now
              <BookIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   SedanDescri — Clean Light Theme Section with Responsive Pagination
--------------------------------------------------------------------------- */

const SedanDescri = () => {
  const [openId, setOpenId] = useState(null);
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

  const handleOpen = useCallback((id) => setOpenId(id), []);
  const handleClose = useCallback(() => setOpenId(null), []);

  // Desktop shows all 6 cards at once (no pagination needed, or 1 page). Mobile shows 1 per page.
  const itemsPerPage = isMobile ? 1 : CARS.length;
  const totalPages = Math.ceil(CARS.length / itemsPerPage);

  const displayedCars = useMemo(() => {
    if (!isMobile) return CARS;
    const start = (currentPage - 1) * itemsPerPage;
    return CARS.slice(start, start + itemsPerPage);
  }, [isMobile, currentPage, itemsPerPage]);

  const activeCar = CARS.find((c) => c.id === openId) || null;

  return (
    <section className="sedan-catalog">
      <header className="sedan-catalog__header">
        <p className="sedan-catalog__eyebrow">Sedan Cars</p>
        <h2 className="sedan-catalog__title">
          Travel in Style with Our Sedan Car Rental Agencies in Bhubaneswar
        </h2>
        <p className="sedan-catalog__desc">
          Sedan provides 5-seater <strong>Cab Taxi Service in Bhubaneswar</strong> with
          clean vehicles, skilled drivers, airport pickup, local sightseeing, and
          outstation trips at fair prices with smooth, safe travel.{' '}
          <strong>Best Cab Rental in Bhubaneswar</strong> for local travel, airport
          pickup, outstation trips, and daily booking.
        </p>
      </header>

      <div className="car-grid">
        {displayedCars.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} onOpen={handleOpen} />
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

      {activeCar && <CarStage car={activeCar} onClose={handleClose} />}
    </section>
  );
};

export default SedanDescri;