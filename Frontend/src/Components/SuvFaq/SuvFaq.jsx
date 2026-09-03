import React, { useState, useId } from 'react';
import './SuvFaq.css';

/* ---------------------------------------------------------------------------
   Data
--------------------------------------------------------------------------- */

const FAQS = [
  {
    q: 'What types of cars are available for rent?',
    a: 'We offer a wide range of premium SUVs including Maruti Ertiga, Toyota Innova, Toyota Innova Crysta, Mahindra Scorpio-N, and Toyota Fortuner, all fully maintained and ready for local or outstation travel.',
  },
  {
    q: 'Is hourly booking available?',
    a: 'Yes. You can book our SUVs in 4, 8, or 10-hour packages with fixed kilometre allowances, with clear extra-hour and extra-km rates if you exceed the limit.',
  },
  {
    q: 'How can booking be done?',
    a: 'Bookings can be made effortlessly through our website, via direct phone call, or over WhatsApp by sharing your preferred vehicle, date, and pickup location.',
  },
  {
    q: 'What payment options are available?',
    a: 'We support multiple convenient payment methods including cash, UPI, credit/debit cards, and bank transfers, payable either in advance or upon trip completion.',
  },
  {
    q: 'Are drivers experienced and licensed?',
    a: 'All our chauffeurs are background-verified, professionally licensed, and possess extensive expertise in managing both dense city navigation and long-distance highways.',
  },
  {
    q: 'Can a booking be cancelled or changed?',
    a: 'Rescheduling and cancellations are free of charge up to 24 hours prior to departure. Cancellations within 24 hours incur a standard 20% charge of the total billing.',
  },
  {
    q: 'Do you provide airport and railway pickup?',
    a: 'Yes, we provide dedicated airport and railway station transfers equipped with live schedule tracking so your driver is always prompt.',
  },
  {
    q: 'Are AC and comfort features available?',
    a: 'Every SUV in our fleet features high-output climate control, dedicated rear AC vents, pristine upholstery, and mobile charging ports as standard.',
  },
  {
    q: 'Can I Rent Outstation Cab Booking?',
    a: 'Absolutely. We specialize in round-trip and one-way outstation journeys across Odisha and neighboring states, billed per day with a 300 km minimum limit.',
  },
  {
    q: 'Is service available at all times, Best Travels in Bhubaneswar?',
    a: 'Yes, our dispatch and support desks operate 24 hours a day, 7 days a week, cementing our reputation as a trusted travel partner in Bhubaneswar.',
  },
];

/* ---------------------------------------------------------------------------
   ChevronIcon
--------------------------------------------------------------------------- */

const ChevronIcon = () => (
  <svg
    className="suv-faq-item__chevron"
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 7.5l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------------------------------------------------------------------------
   FaqItem Component
--------------------------------------------------------------------------- */

const FaqItem = ({ item, index, isOpen, onToggle }) => {
  const uid = useId();
  const panelId = `suv-faq-panel-${uid}`;
  const buttonId = `suv-faq-button-${uid}`;

  return (
    <div
      className={`suv-faq-item${isOpen ? ' suv-faq-item--open' : ''}`}
      style={{ '--stagger': index }}
    >
      <h3 className="suv-faq-item__heading">
        <button
          type="button"
          id={buttonId}
          className="suv-faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <span className="suv-faq-item__question">{item.q}</span>
          <span className="suv-faq-item__icon">
            <ChevronIcon />
          </span>
        </button>
      </h3>

      <div
        className="suv-faq-item__panel"
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
      >
        <div className="suv-faq-item__panel-inner">
          <p className="suv-faq-item__answer">{item.a}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   SuvFaq Component
--------------------------------------------------------------------------- */

const SuvFaq = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="suv-faq-section">
      <div className="suv-faq-section__bg" aria-hidden="true" />

      <header className="suv-faq-section__header">
        <span className="suv-faq-section__eyebrow">FAQ&apos;s</span>
        <h2 className="suv-faq-section__title">Frequently Ask Questions</h2>
        <p className="suv-faq-section__subtitle">
          Have questions about our services or bookings?
        </p>
      </header>

      <div className="suv-faq-grid">
        {FAQS.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default SuvFaq;