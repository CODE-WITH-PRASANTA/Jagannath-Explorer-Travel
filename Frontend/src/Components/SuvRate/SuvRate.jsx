import React, { useEffect, useRef, useState, useCallback } from 'react';
import './SuvRate.css';

/* ---------------------------------------------------------------------------
   Data
--------------------------------------------------------------------------- */

const COLUMNS = [
  { key: 'vehicle', label: 'SUV Vehicle A/C' },
  { key: 'h10', label: '10 Hrs. / 100 Km (Rs.)' },
  { key: 'h8', label: '8 Hrs. / 80 Km (Rs.)' },
  { key: 'h4', label: '4 Hrs. / 40 Km (Rs.)' },
  { key: 'exHr', label: 'Extra Hrs. (Rs.)' },
  { key: 'exKm', label: 'Extra Km (Rs.)' },
];

const ROWS = [
  { vehicle: 'Maruti Suzuki Ertiga', h10: '3,500', h8: '3,000', h4: '2,500', exHr: '150', exKm: '15' },
  { vehicle: 'Toyota Innova', h10: '4,000', h8: '3,000', h4: '2,800', exHr: '180', exKm: '17' },
  { vehicle: 'Toyota Innova Crysta', h10: '4,500', h8: '4,000', h4: '3,500', exHr: '200', exKm: '20', featured: true },
  { vehicle: 'Mahindra Scorpio-N', h10: '5,000', h8: '4,500', h4: '4,000', exHr: '220', exKm: '22' },
  { vehicle: 'Toyota Fortuner', h10: '7,000', h8: '6,500', h4: '5,500', exHr: '350', exKm: '35', featured: true },
  { vehicle: 'MG Hector Plus', h10: '5,200', h8: '4,800', h4: '4,200', exHr: '230', exKm: '24' },
  { vehicle: '10 Seater Urbania', h10: '11,000', h8: '10,000', h4: '—', exHr: '500', exKm: '50' },
  { vehicle: '12 Seater Urbania', h10: '12,000', h8: '11,000', h4: '—', exHr: '500', exKm: '60' },
  { vehicle: '17 Seater Urbania', h10: '13,000', h8: '12,000', h4: '—', exHr: '500', exKm: '65' },
  { vehicle: '13 Seater Traveller', h10: '5,000', h8: '4,500', h4: '4,000', exHr: '220', exKm: '28' },
  { vehicle: '17 Seater Traveller', h10: '5,500', h8: '5,000', h4: '4,500', exHr: '250', exKm: '30' },
];

const TERMS = [
  'Toll Tax, Interstate Tax and Parking charges on actual basis.',
  'Kms and Hours will be calculated from the Garage to Garage.',
  'Night Halt Charges from 10 PM – 6 AM (SUV Light Vehicle – Rs.350, Traveller – Rs.500).',
  'Driver Allowance applicable for outstation trips (SUV / Innova – Rs.350, Tempo Traveller – Rs.500).',
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
  <div className="suv-rate-banner">
    <span className="suv-rate-banner__shine" aria-hidden="true" />
    <span className="suv-rate-banner__icon">✨</span>
    SUV FLEET TARIFF — LOCAL &amp; OUTSTATION (300 Km Per Day)
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
      className={`suv-rate-row reveal${row.featured ? ' suv-rate-row--featured' : ''}`}
      style={{ '--stagger': index }}
    >
      <th scope="row" className="suv-rate-row__vehicle">
        <span className="vehicle-name">{row.vehicle}</span>
        {row.featured && <span className="suv-rate-row__badge">Top Choice</span>}
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
    <div className="suv-rate-table-card">
      <TariffBanner />

      <div className="suv-rate-table-wrap">
        <div
          className={`suv-rate-scroll${scrolled ? ' suv-rate-scroll--scrolled' : ''}`}
          ref={scrollRef}
        >
          <table className="suv-rate-table">
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
        <span className="suv-rate-table-wrap__hint" aria-hidden="true">
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
    <li ref={reveal} className="suv-term-item reveal" style={{ '--stagger': index }}>
      <span className="suv-term-item__icon">
        <CheckIcon />
      </span>
      <span className="suv-term-item__text">{text}</span>
    </li>
  );
};

const TermsPanel = () => (
  <div className="suv-terms-card">
    <div className="suv-terms-card__header">
      <div className="suv-terms-card__badge-icon">🛡️</div>
      <h3 className="suv-terms-card__title">SUV Rental Terms &amp; Conditions</h3>
    </div>
    <ul className="suv-terms-card__list">
      {TERMS.map((text, i) => (
        <TermItem text={text} index={i} key={text} />
      ))}
    </ul>
  </div>
);

/* ---------------------------------------------------------------------------
   SuvRate — Clean Luxury White Theme Section
--------------------------------------------------------------------------- */

const SuvRate = () => {
  return (
    <section className="suv-rate-section">
      <div className="suv-rate-section__bg" aria-hidden="true" />

      <header className="suv-rate-section__header">
        <span className="suv-rate-section__eyebrow">SUV Rates &amp; Charges</span>
        <h2 className="suv-rate-section__title">Transparent SUV Fleet Tariff</h2>
        <p className="suv-rate-section__subtitle">
          Explore our crystal-clear rates for premium SUV and family vehicle rentals in Bhubaneswar with zero hidden fees.
        </p>
      </header>

      <div className="suv-rate-section__body">
        <TariffTable />
        <TermsPanel />
      </div>
    </section>
  );
};

export default SuvRate;