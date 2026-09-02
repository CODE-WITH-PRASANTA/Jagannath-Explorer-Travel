import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './Suvvehcle.css';

/* ---------------------------------------------------------------------------
   Data
   Curated SUV fleet matching the reference style with specs, pricing, and 
   high-end visuals.
--------------------------------------------------------------------------- */

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
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=900&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=900&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'scorpio',
    name: 'Mahindra Scorpio-N',
    accent: '#ea580c',
    seating: '7 Seater',
    ac: 'Automatic Climate Control',
    boot: '460 Litres',
    fuel: 'Diesel',
    price: 4500,
    duration: '8 Hours',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner',
    accent: '#059669',
    seating: '7 Seater',
    ac: 'Dual Zone Automatic AC',
    boot: '296 Litres',
    fuel: 'Diesel',
    price: 6500,
    duration: '8 Hours',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'hector',
    name: 'MG Hector Plus',
    accent: '#d97706',
    seating: '6 Seater',
    ac: 'Automatic + Rear Vents',
    boot: '587 Litres',
    fuel: 'Petrol / Diesel',
    price: 4800,
    duration: '8 Hours',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=900&auto=format&fit=crop',
  },
];

/* ---------------------------------------------------------------------------
   SpecRow Component
--------------------------------------------------------------------------- */

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
   SuvCard Component
--------------------------------------------------------------------------- */

const SuvCard = ({ car, index, onOpen }) => {
  const specs = [
    { label: 'Seating Capacity', value: car.seating },
    { label: 'A/C', value: car.ac },
    { label: 'Boot Space', value: car.boot },
    { label: 'Fuel Type', value: car.fuel },
  ];

  return (
    <article
      className="suv-card"
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
      <div className="suv-card__frame">
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
   SuvStage Component — 3D Rotating Showroom Modal
--------------------------------------------------------------------------- */

const SuvStage = ({ car, onClose }) => {
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
      className={`suv-stage${mounted ? ' suv-stage--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${car.name} showroom details`}
    >
      <div className="suv-stage__backdrop" onClick={onClose} />

      <div className="suv-stage__panel">
        <button
          ref={closeBtnRef}
          type="button"
          className="suv-stage__close"
          onClick={onClose}
          aria-label="Close details"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 4l10 10M14 4L4 14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
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
          <p className="suv-stage__eyebrow">SUV Cars Fleet</p>
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
            <button type="button" className="suv-book-btn suv-book-btn--lg">
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
   Suvvehcle Component — Main Export with Responsive Pagination
--------------------------------------------------------------------------- */

const Suvvehcle = () => {
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

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(SUV_CARS.length / itemsPerPage);

  const displayedCars = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return SUV_CARS.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const activeCar = SUV_CARS.find((c) => c.id === openId) || null;

  return (
    <section className="suv-catalog">
      <header className="suv-catalog__header">
        <p className="suv-catalog__eyebrow">SUV Cars</p>
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
          <SuvCard key={car.id} car={car} index={i} onOpen={handleOpen} />
        ))}
      </div>

      {totalPages > 1 && (
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

      {activeCar && <SuvStage car={activeCar} onClose={handleClose} />}
    </section>
  );
};

export default Suvvehcle;