import React, { useEffect, useRef, useState, useCallback } from 'react';
import './RateChanges.css';

/* ---------------------------------------------------------------------------
   Data
--------------------------------------------------------------------------- */

const COLUMNS = [
  { key: 'vehicle', label: 'Vehicle A/C' },
  { key: 'h10', label: '10 Hrs. / 100 Km (Rs.)' },
  { key: 'h8', label: '8 Hrs. / 80 Km (Rs.)' },
  { key: 'h4', label: '4 Hrs. / 40 Km (Rs.)' },
  { key: 'exHr', label: 'Extra Hrs. (Rs.)' },
  { key: 'exKm', label: 'Extra Km (Rs.)' },
];

const ROWS = [
  { vehicle: 'Swift Dzire / Aura / Xcent', h10: '2,500', h8: '2,200', h4: '1,600', exHr: '120', exKm: '13' },
  { vehicle: 'Ertiga', h10: '3,500', h8: '3,000', h4: '2,500', exHr: '150', exKm: '15' },
  { vehicle: 'Toyota Innova', h10: '4,000', h8: '3,000', h4: '2,800', exHr: '180', exKm: '17' },
  { vehicle: 'Toyota Innova Crysta', h10: '4,500', h8: '4,000', h4: '3,500', exHr: '200', exKm: '20', featured: true },
  { vehicle: 'Honda City / Verna', h10: '5,000', h8: '4,500', h4: '4,000', exHr: '200', exKm: '18' },
  { vehicle: '13 Seater Traveller', h10: '5,000', h8: '4,500', h4: '4,000', exHr: '220', exKm: '28' },
  { vehicle: '17 Seater Traveller', h10: '5,500', h8: '5,000', h4: '4,500', exHr: '250', exKm: '30' },
  { vehicle: '25 Seater Traveller', h10: '7,500', h8: '7,000', h4: '6,500', exHr: '350', exKm: '45' },
  { vehicle: '10 Seater Urbania', h10: '11,000', h8: '10,000', h4: '—', exHr: '500', exKm: '50' },
  { vehicle: '12 Seater Urbania', h10: '12,000', h8: '11,000', h4: '—', exHr: '500', exKm: '60' },
  { vehicle: '17 Seater Urbania', h10: '13,000', h8: '12,000', h4: '—', exHr: '500', exKm: '65' },
  { vehicle: '13 SML Coach A/C', h10: '9,000', h8: '8,000', h4: '7,500', exHr: '500', exKm: '45' },
  { vehicle: '19 SML Coach A/C', h10: '11,000', h8: '10,000', h4: '9,000', exHr: '600', exKm: '55' },
  { vehicle: '22 SML Coach A/C', h10: '14,000', h8: '13,000', h4: '12,000', exHr: '700', exKm: '55' },
  { vehicle: '28 SML Coach A/C', h10: '18,000', h8: '17,000', h4: '16,000', exHr: '800', exKm: '60' },
  { vehicle: '36 SML Coach A/C', h10: '20,000', h8: '18,000', h4: '17,000', exHr: '1,000', exKm: '65' },
];

const TERMS = [
  'Toll Tax, Interstate Tax and Parking charges on actual basis.',
  'Kms and Hours will be calculated from the Garage to Garage.',
  'Night Halt Charges from 10 PM – 6 AM (Light Vehicle – Rs.350, Traveller – Rs.500, Coach – Rs.1000).',
  'Driver Allowance applicable for outstation trips (Light Vehicle – Rs.350, Tempo – Rs.500, Coach – Rs.1000).',
  'A vehicle covering below 300 kms in a day shall be billed as per Local Tariff.',
  'For outstation duty, a minimum of 300 kms is charged per day.',
  'Standing AC is chargeable.',
  'Cancelling a booking within 24 hrs of the scheduled time incurs 20% of the total billing.',
  'While driving on Ghat roads, air-conditioning shall remain switched off.',
  'All disputes are subject to Bhubaneswar legal jurisdiction only.',
];

/* ---------------------------------------------------------------------------
   useReveal — intersection observer for smooth scroll-in animation
--------------------------------------------------------------------------- */

const useReveal = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  return useCallback((node) => {
    if (node && observerRef.current) observerRef.current.observe(node);
  }, []);
};

/* ---------------------------------------------------------------------------
   TariffBanner
--------------------------------------------------------------------------- */

const TariffBanner = () => (
  <div className="tariff-banner">
    <span className="tariff-banner__shine" aria-hidden="true" />
    <span className="tariff-banner__icon">✨</span>
    FOR LOCAL &amp; OUTSTATION (300 Km Per Day)
  </div>
);

/* ---------------------------------------------------------------------------
   TariffRow
--------------------------------------------------------------------------- */

const TariffRow = ({ row, index }) => {
  const reveal = useReveal();

  return (
    <tr
      ref={reveal}
      className={`tariff-row reveal${row.featured ? ' tariff-row--featured' : ''}`}
      style={{ '--stagger': index }}
    >
      <th scope="row" className="tariff-row__vehicle">
        <span className="vehicle-name">{row.vehicle}</span>
        {row.featured && <span className="tariff-row__badge">Best Value</span>}
      </th>
      <td>{row.h10}</td>
      <td>{row.h8}</td>
      <td>{row.h4}</td>
      <td>{row.exHr}</td>
      <td>{row.exKm}</td>
    </tr>
  );
};

/* ---------------------------------------------------------------------------
   TariffTable
--------------------------------------------------------------------------- */

const TariffTable = () => {
  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    const handleScroll = () => setScrolled(el.scrollLeft > 8);
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="tariff-table-card">
      <TariffBanner />

      <div className="tariff-table-wrap">
        <div
          className={`tariff-scroll${scrolled ? ' tariff-scroll--scrolled' : ''}`}
          ref={scrollRef}
        >
          <table className="tariff-table">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th key={col.key} scope="col">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <TariffRow row={row} index={i} key={row.vehicle} />
              ))}
            </tbody>
          </table>
        </div>
        <span className="tariff-table-wrap__hint" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Swipe to view more
        </span>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   TermItem / TermsPanel
--------------------------------------------------------------------------- */

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6.2 10.3l2.4 2.4 5.2-5.4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TermItem = ({ text, index }) => {
  const reveal = useReveal();
  return (
    <li ref={reveal} className="term-item reveal" style={{ '--stagger': index }}>
      <span className="term-item__icon">
        <CheckIcon />
      </span>
      <span className="term-item__text">{text}</span>
    </li>
  );
};

const TermsPanel = () => (
  <div className="terms-card">
    <div className="terms-card__header">
      <div className="terms-card__badge-icon">📋</div>
      <h3 className="terms-card__title">Terms &amp; Conditions</h3>
    </div>
    <ul className="terms-card__list">
      {TERMS.map((text, i) => (
        <TermItem text={text} index={i} key={text} />
      ))}
    </ul>
  </div>
);

/* ---------------------------------------------------------------------------
   RateChanges — Clean Luxury White Theme Section
--------------------------------------------------------------------------- */

const RateChanges = () => {
  return (
    <section className="rate-section">
      <div className="rate-section__bg" aria-hidden="true" />

      <header className="rate-section__header">
        <span className="rate-section__eyebrow">Rates &amp; Charges</span>
        <h2 className="rate-section__title">Transparent Transport Tariff</h2>
        <p className="rate-section__subtitle">
          Explore our competitive rates for local and outstation rentals with zero hidden fees.
        </p>
      </header>

      <div className="rate-section__body">
        <TariffTable />
        <TermsPanel />
      </div>
    </section>
  );
};

export default RateChanges;