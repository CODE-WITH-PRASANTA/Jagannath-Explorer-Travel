import React, { useState, useId } from 'react';
import './SedanFaq.css';

/* ---------------------------------------------------------------------------
   Data
--------------------------------------------------------------------------- */

const FAQS = [
  {
    q: 'What types of cars are available for rent?',
    a: 'We offer sedans (Swift Dzire, Aura, Xcent, Honda City, Verna), SUVs like the Ertiga and Toyota Innova Crysta, and Tempo Travellers and coaches for larger groups — all maintained and ready for local or outstation trips.',
  },
  {
    q: 'Is hourly booking available?',
    a: 'Yes. You can book in 4, 8, or 10-hour packages with a fixed kilometre allowance, and extend beyond that at the listed extra-hour and extra-km rates.',
  },
  {
    q: 'How can booking be done?',
    a: 'Book directly through our website, over a call, or via WhatsApp. Share your pickup point, date, and vehicle preference, and we’ll confirm your ride within minutes.',
  },
  {
    q: 'What payment options are available?',
    a: 'We accept cash, UPI, debit and credit cards, and bank transfers. Payment can be made at the end of the trip or in advance, whichever suits you.',
  },
  {
    q: 'Are drivers experienced and licensed?',
    a: 'Every driver on our platform is background-verified, holds a valid commercial license, and has years of experience driving both city routes and long-distance highways.',
  },
  {
    q: 'Can a booking be cancelled or changed?',
    a: 'Yes, bookings can be rescheduled or cancelled free of charge up to 24 hours before the trip. Cancellations within 24 hours attract a 20% charge on the total billing.',
  },
  {
    q: 'Do you provide airport and railway pickup?',
    a: 'Yes, we offer dedicated airport and railway station pickup and drop with live flight/train tracking, so your driver arrives on time even if your schedule shifts.',
  },
  {
    q: 'Are AC and comfort features available?',
    a: 'Every vehicle in our fleet comes with air-conditioning, clean upholstery, and phone charging points as standard, with rear AC vents on our premium sedans and SUVs.',
  },
  {
    q: 'Can I rent outstation cab booking?',
    a: 'Absolutely. We handle one-way and round-trip outstation journeys across Odisha and neighbouring states, billed per day with a minimum of 300 km.',
  },
  {
    q: 'Is service available at all times, best travels in Bhubaneswar?',
    a: 'Yes, our booking line and dispatch run 24/7, making us one of the most reliable cab and car rental services operating around the clock in Bhubaneswar.',
  },
];

/* ---------------------------------------------------------------------------
   ChevronIcon
--------------------------------------------------------------------------- */

const ChevronIcon = () => (
  <svg
    className="faq-item__chevron"
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
   FaqItem
--------------------------------------------------------------------------- */

const FaqItem = ({ item, index, isOpen, onToggle }) => {
  const uid = useId();
  const panelId = `faq-panel-${uid}`;
  const buttonId = `faq-button-${uid}`;

  return (
    <div
      className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
      style={{ '--stagger': index }}
    >
      <h3 className="faq-item__heading">
        <button
          type="button"
          id={buttonId}
          className="faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <span className="faq-item__question">{item.q}</span>
          <span className="faq-item__icon">
            <ChevronIcon />
          </span>
        </button>
      </h3>

      <div
        className="faq-item__panel"
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
      >
        <div className="faq-item__panel-inner">
          <p className="faq-item__answer">{item.a}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   SedanFaq — Compact White Showroom Section
--------------------------------------------------------------------------- */

const SedanFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="sedan-faq">
      <div className="sedan-faq__bg" aria-hidden="true" />

      <header className="sedan-faq__header">
        <span className="sedan-faq__eyebrow">FAQ&apos;s</span>
        <h2 className="sedan-faq__title">Frequently Asked Questions</h2>
        <p className="sedan-faq__subtitle">
          Have questions about our services or bookings? Everything you need to know is right here.
        </p>
      </header>

      <div className="faq-grid">
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

export default SedanFaq;