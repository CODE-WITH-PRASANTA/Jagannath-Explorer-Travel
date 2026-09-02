import React, { useState } from "react";
import "./Smlfaq.css";

/* =========================================================
   FAQ DATA
========================================================= */

const SML_FAQS = [
  {
    id: 1,
    question: "What types of cars are available for rent?",
    answer:
      "We offer sedans (Dzire, Verna, Honda City), SUVs (Innova, Innova Crysta, Ertiga), Traveller vans (13/17/25 seater), Urbania coaches, and SML A/C coaches for group and corporate travel.",
  },
  {
    id: 2,
    question: "Is hourly booking available?",
    answer:
      "Yes, hourly packages are available starting from a 4-hour / 40-km slot, along with 8-hour and 10-hour packages across all vehicle categories.",
  },
  {
    id: 3,
    question: "How can booking be done?",
    answer:
      "You can book directly through our website booking form, or reach us via call or WhatsApp for instant confirmation and quotes.",
  },
  {
    id: 4,
    question: "What payment options are available?",
    answer:
      "We accept cash, UPI, debit/credit cards, and net banking, so you can choose whichever payment method is most convenient.",
  },
  {
    id: 5,
    question: "Are drivers experienced and licensed?",
    answer:
      "Yes, all our drivers are verified, professionally trained, and hold valid licenses with years of experience on both city and outstation routes.",
  },
  {
    id: 6,
    question: "Can a booking be cancelled or changed?",
    answer:
      "Bookings can be cancelled or rescheduled free of charge up to 24 hours before the scheduled time. Cancellations within 24 hours attract a 20% charge on total billing.",
  },
  {
    id: 7,
    question: "Do you provide airport and railway pickup?",
    answer:
      "Yes, we provide reliable airport and railway station pickup and drop services with real-time tracking of your flight or train timing.",
  },
  {
    id: 8,
    question: "Are AC and comfort features available?",
    answer:
      "All our vehicles come with fully functional air-conditioning along with comfortable pushback or recliner seating depending on the coach category.",
  },
  {
    id: 9,
    question: "Can I Rent Outstation Cab Booking?",
    answer:
      "Absolutely. We offer outstation cab and coach rentals with a minimum billing of 300 km per day, ideal for tours, pilgrimages, and long trips.",
  },
  {
    id: 10,
    question: "Is service available at all times, Best Travels in Bhubaneswar?",
    answer:
      "Yes, our booking and support team is available round the clock, making us one of the most reliable and trusted travel partners in Bhubaneswar.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Smlfaq = () => {
  const [openIds, setOpenIds] = useState({ 2: true });

  const toggleFaq = (id) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="smlfaq-section">
      <div className="smlfaq-container">

        {/* Header */}
        <div className="smlfaq-header">
          <span className="smlfaq-subtitle">FAQ's</span>
          <h2 className="smlfaq-title">Frequently Ask Questions</h2>
          <p className="smlfaq-description">Have questions about our services or bookings?</p>
        </div>

        {/* Accordion Grid */}
        <div className="smlfaq-grid">
          {SML_FAQS.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className={`smlfaq-item ${isOpen ? "smlfaq-item-active" : ""}`}
              >
                <button
                  className="smlfaq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="smlfaq-question-text">{faq.question}</span>
                  <span className="smlfaq-icon-wrapper">
                    <svg
                      className="smlfaq-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div className="smlfaq-answer-wrapper">
                  <div className="smlfaq-answer-inner">
                    <p className="smlfaq-answer-text">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Smlfaq;