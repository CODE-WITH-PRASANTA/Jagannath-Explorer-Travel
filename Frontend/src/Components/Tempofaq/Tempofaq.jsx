import React, { useState } from "react";
import "./Tempofaq.css";

/* =========================================================
   FAQ DATA
========================================================= */

const FAQ_ITEMS = [
  {
    question: "What types of cars are available for rent?",
    answer:
      "We offer a wide range of vehicles including Swift Dzire, Aura, Ertiga, Innova, Crysta, Honda City, Verna, 13-25 Seater Travellers, Urbanias, and SML Coaches.",
  },
  {
    question: "Is hourly booking available?",
    answer:
      "Yes, flexible hourly packages such as 4 Hrs/40 Km, 8 Hrs/80 Km, and 10 Hrs/100 Km are available for local and city travel.",
  },
  {
    question: "How can booking be done?",
    answer:
      "Bookings can be made directly through our website inquiry or by contacting our 24/7 customer support line.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We support secure online transactions, UPI, bank transfers, and cash payments as per your booking preference.",
  },
  {
    question: "Are drivers experienced and licensed?",
    answer:
      "All our chauffeurs are professionally verified, fully licensed, uniformed, and highly experienced in both local and outstation routes.",
  },
  {
    question: "Can a booking be cancelled or changed?",
    answer:
      "Yes, cancellations or modifications are permitted. Cancellations made 24 hours prior are subject to our standard terms.",
  },
  {
    question: "Do you provide airport and railway pickup?",
    answer:
      "Yes, round-the-clock airport and railway station pickup and drop services are available across Bhubaneswar.",
  },
  {
    question: "Are AC and comfort features available?",
    answer:
      "All vehicles in our fleet are fully air-conditioned and equipped with comfortable pushback or luxury seating.",
  },
  {
    question: "Can I Rent Outstation Cab Booking?",
    answer:
      "Yes, outstation rentals are calculated with a minimum daily threshold of 300 km as per our tariff guidelines.",
  },
  {
    question: "Is service available at all times, Best Travels in Bhubaneswar?",
    answer:
      "Yes, our elite transportation and rental services operate 24/7 across Bhubaneswar and neighboring areas.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Tempofaq = () => {
  const [openIndices, setOpenIndices] = useState([1]); // Default second item open like reference image

  const toggleAccordion = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <main className="tempofaq-page">

      {/* =====================================================
          HEADER SECTION
      ===================================================== */}
      <section className="tempofaq-header">
        <span className="tempofaq-subtitle">FAQ's</span>
        <h1 className="tempofaq-title">Frequently Ask Questions</h1>
        <p className="tempofaq-description">
          Have questions about our services or bookings?
        </p>
        <div className="tempofaq-title-line">
          <span></span>
          <i>◆</i>
          <span></span>
        </div>
      </section>

      {/* =====================================================
          FAQ GRID SECTION (2 Columns matching reference)
      ===================================================== */}
      <section className="tempofaq-content-section">
        <div className="tempofaq-container">
          <div className="tempofaq-grid">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndices.includes(index);
              return (
                <div
                  key={`tempofaq-${index}`}
                  className={`tempofaq-card ${isOpen ? "tempofaq-card-active" : ""}`}
                >
                  <button
                    className="tempofaq-card-question"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <div className="tempofaq-icon-wrapper">
                      <svg
                        className="tempofaq-chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </div>
                  </button>

                  <div
                    className="tempofaq-card-answer-wrapper"
                    style={{ maxHeight: isOpen ? "220px" : "0px" }}
                  >
                    <div className="tempofaq-card-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Tempofaq;