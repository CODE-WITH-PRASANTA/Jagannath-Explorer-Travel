import React, { useState } from 'react';
import './Frequently.css';

const faqData = [
  {
    id: 1,
    question: "Are family tour packages available?",
    answer: "Yes, family travel plans and holiday packages are available with flexible options based on group size and travel needs."
  },
  {
    id: 2,
    question: "Where can I get Cab Service in Bhubaneswar?",
    answer: "You can easily book our cab service online through our website or by contacting our 24/7 customer helpline across all major pickup points in Bhubaneswar."
  },
  {
    id: 3,
    question: "Is the travel service available for outstation trips?",
    answer: "Yes, we provide reliable round-trip and one-way outstation cab and tempo traveller services to nearby cities and popular tourist destinations."
  },
  {
    id: 4,
    question: "Do you provide urbania tempo traveller for full day booking?",
    answer: "Yes, our luxury Force Urbania tempo travellers are available for full-day city tours, events, weddings, and corporate outings."
  },
  {
    id: 5,
    question: "How is the pricing system?",
    answer: "Our pricing is transparent and competitive, calculated based on vehicle type, duration (per hour/day), and kilometer package with no hidden fees."
  },
  {
    id: 6,
    question: "How can I book a Tempo Traveller Service in Bhubaneswar quickly?",
    answer: "Fill out our quick booking form online or call our support team directly with your travel dates and passenger count for instant confirmation."
  },
  {
    id: 7,
    question: "Are drivers experienced?",
    answer: "All our drivers are verified, professionally trained, well-versed with local routes, and maintain strict road safety standards."
  },
  {
    id: 8,
    question: "Force van For Rent available for group travel?",
    answer: "Yes, we have multiple seating configurations of Force vans available for large groups, pilgrimages, and family getaways."
  },
  {
    id: 9,
    question: "What makes the service useful for travelers?",
    answer: "We provide punctual pickups, sanitized air-conditioned vehicles, transparent billing, and dedicated support for a hassle-free journey."
  },
  {
    id: 10,
    question: "Can I book a taxi for full day use?",
    answer: "Yes, we offer convenient local 8-hour/80 km and 12-hour/120 km full-day rental packages for local sightseeing and business transit."
  }
];

const Frequently = () => {
  const [openIds, setOpenIds] = useState([1]);

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const leftColumn = faqData.filter((_, idx) => idx % 2 === 0);
  const rightColumn = faqData.filter((_, idx) => idx % 2 !== 0);

  const renderFaqItem = (item) => {
    const isOpen = openIds.includes(item.id);
    return (
      <div 
        key={item.id} 
        className={`faq-card ${isOpen ? 'open' : ''}`}
      >
        <button
          type="button"
          className="faq-question-btn"
          onClick={() => toggleAccordion(item.id)}
          aria-expanded={isOpen}
        >
          <span className="faq-question-text">{item.question}</span>
          <span className="faq-chevron-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        <div className="faq-answer-wrapper">
          <div className="faq-answer-content">
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-pill-label">FAQ's</span>
          <h2 className="faq-main-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Have questions about our services or bookings? Find your answers below.</p>
        </div>

        <div className="faq-grid">
          <div className="faq-column">{leftColumn.map(renderFaqItem)}</div>
          <div className="faq-column">{rightColumn.map(renderFaqItem)}</div>
        </div>
      </div>
    </section>
  );
};

export default Frequently;