import React, { useState } from "react";
import "./Questionluxury.css";

/* =========================================================
   FAQ DATA
========================================================= */

const FAQ_ITEMS = [
  {
    question: "What types of cars are available for rent?",
    answer:
      "We offer a wide range of luxury wedding cars, premium sedans, Ertigas, Innovas, Crystas, Tempo Travellers, and Urbanias to match your grand celebration.",
  },
  {
    question: "Is hourly booking available?",
    answer:
      "Yes, flexible hourly packages (such as 4 hours/40 km, 8 hours/80 km, and 10 hours/100 km) are fully available for local city usage and events.",
  },
  {
    question: "How can booking be done?",
    answer:
      "You can easily book through our website inquiry form or contact our customer support directly via phone or WhatsApp to secure your preferred vehicle.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We accept secure online bank transfers, UPI, credit/debit cards, and cash payments as per your convenience.",
  },
  {
    question: "Are drivers experienced and licensed?",
    answer:
      "All our chauffeurs are professionally trained, polite, verified, dressed in formal attire, and highly experienced with both local and outstation routes.",
  },
  {
    question: "Can a booking be cancelled or changed?",
    answer:
      "Yes, bookings can be modified or cancelled. Please review our terms and conditions regarding timeline policies for cancellation charges.",
  },
  {
    question: "Do you provide airport and railway pickup?",
    answer:
      "Yes, dedicated airport and railway station pickup and drop-off services are available round the clock with prior scheduling.",
  },
  {
    question: "Are AC and comfort features available?",
    answer:
      "All vehicles in our luxury fleet come equipped with high-performance climate control air conditioning and premium plush interiors.",
  },
  {
    question: "Can I rent outstation cab booking?",
    answer:
      "Yes, we provide outstation rentals calculated with a minimum daily threshold of 300 km, ensuring a comfortable long-distance journey.",
  },
  {
    question: "Is service available at all times in Bhubaneswar?",
    answer:
      "Yes, our elite transportation and rental services operate 24/7 across Bhubaneswar and surrounding regions.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Questionluxury = () => {
  const [openIndices, setOpenIndices] = useState([0]); // First item open by default

  const toggleAccordion = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <main className="question-luxury-page">
      
      {/* =====================================================
         HEADER SECTION
      ===================================================== */}
      <section className="question-luxury-header">
        <div className="question-luxury-header-glow"></div>

        <span className="question-luxury-subtitle">
          ✦ FAQ'S ✦
        </span>

        <h1 className="question-luxury-title">
          Frequently Asked <br />
          <span>Questions</span>
        </h1>

        <div className="question-luxury-title-line">
          <span></span>
          <i>❦</i>
          <span></span>
        </div>

        <p className="question-luxury-description">
          Have questions about our services or bookings? Find everything you need to know below.
        </p>
      </section>

      {/* =====================================================
         FAQ GRID SECTION
      ===================================================== */}
      <section className="question-luxury-content-section">
        <div className="question-luxury-container">
          <div className="question-luxury-grid">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndices.includes(index);
              return (
                <div
                  key={`faq-${index}`}
                  className={`question-luxury-card ${
                    isOpen ? "question-luxury-card-active" : ""
                  }`}
                >
                  <button
                    className="question-luxury-card-question"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <div className="question-luxury-icon-wrapper">
                      <svg
                        className="question-luxury-chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </button>

                  <div
                    className="question-luxury-card-answer-wrapper"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                    }}
                  >
                    <div className="question-luxury-card-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
         BOTTOM DECORATION
      ===================================================== */}
      <div className="question-luxury-bottom-decoration">
        <span></span>
        <div>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <span></span>
      </div>

    </main>
  );
};

export default Questionluxury;