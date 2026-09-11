import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Tempofaq.css";

/* =========================================================
   BUSINESS INFORMATION
========================================================= */

const BUSINESS = {
  name: "Jagannath Explorer Travels",
  address:
    "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha, Pin - 751002",
  phone1: "9668892441",
  phone2: "9556355446",
};

/* =========================================================
   FAQ DATA (12 Short & Essential Questions)
========================================================= */

const FAQ_ITEMS = [
  {
    question: "What vehicles are available for rent?",
    answer:
      "We offer Swift Dzire, Aura, Ertiga, Toyota Innova, Innova Crysta, Honda City, Verna, Travellers, Urbania, and SML Coaches based on your group size.",
  },
  {
    question: "Do you offer local and outstation bookings?",
    answer:
      "Yes, we provide reliable cars and coaches for local sightseeing, airport transfers, corporate travel, and outstation trips across Odisha.",
  },
  {
    question: "What hourly rental packages do you provide?",
    answer:
      "Our local rental plans include flexible options such as 4 Hrs/40 Km, 8 Hrs/80 Km, and 10 Hrs/100 Km packages.",
  },
  {
    question: "How can I book a vehicle?",
    answer:
      "You can book instantly by calling our team directly with your travel dates, pickup location, destination, and vehicle preference.",
  },
  {
    question: "Do you provide airport and railway station pickup?",
    answer:
      "Yes, 24/7 airport and railway station pickup and drop services are available across Bhubaneswar.",
  },
  {
    question: "Do you offer Odisha tourism packages?",
    answer:
      "Yes, we customize sightseeing and tour itineraries across popular Odisha destinations. Contact us for personalized pricing.",
  },
  {
    question: "Are experienced drivers provided?",
    answer:
      "Yes, all our vehicles come with polite, licensed, and experienced drivers who are well-versed with all local routes and tourist destinations.",
  },
  {
    question: "Can I book a vehicle for family or group tours?",
    answer:
      "Absolutely. We offer spacious SUVs, Tempo Travellers, Urbania, and large SML Coaches suitable for comfortable family and group travels.",
  },
  {
    question: "What are the outstation travel guidelines?",
    answer:
      "For outstation journeys, a minimum daily distance threshold applies along with driver allowances and night halt charges as per tariff rules.",
  },
  {
    question: "How early should I book my vehicle?",
    answer:
      "While last-minute bookings depend on availability, we recommend reserving your vehicle in advance for weekends, holidays, and peak tourist seasons.",
  },
  {
    question: "What is your booking cancellation policy?",
    answer:
      "Bookings can be cancelled or modified by contacting our support team. Cancellation charges may apply based on the notice period provided.",
  },
  {
    question: "Why choose Jagannath Explorer Travels?",
    answer:
      "We guarantee transparent pricing, immaculately maintained vehicles, punctual pick-ups, and dedicated customer support throughout your trip.",
  },
];

/* =========================================================
   FAQ SCHEMA
========================================================= */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/* =========================================================
   COMPONENT
========================================================= */

const Tempofaq = () => {
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleAccordion = (index) => {
    setOpenIndices((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  return (
    <main className="tempofaq-page">
      <Helmet>
        <html lang="en" />
        <title>
          Best Tour and Travel Agency in Bhubaneswar | Jagannath Explorer Travels
        </title>
        <meta
          name="description"
          content="Jagannath Explorer Travels offers local, outstation, group travel, and Odisha tourism packages in Bhubaneswar."
        />
        <meta
          name="keywords"
          content="Best tour and travel agency in bhubaneswar, travel agency in bhubaneswar, odisha tourism packages"
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* HEADER */}
      <section className="tempofaq-header">
        <div className="tempofaq-header-inner">
          <span className="tempofaq-subtitle">Jagannath Explorer Travels</span>
          <h1 className="tempofaq-title">
            Best tour and travel agency in bhubaneswar
          </h1>
          <p className="tempofaq-description">
            Quick answers about vehicle rentals, local sightseeing, and outstation trips.
          </p>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="tempofaq-intro-section">
        <div className="tempofaq-container">
          <div className="tempofaq-intro-card">
            <div className="tempofaq-intro-content">
              <span className="tempofaq-section-label">Travel Support</span>
              <h2>Your Trusted Travel Partner in Odisha</h2>
              <p>
                Looking for a dependable vehicle for your trip? Jagannath Explorer Travels provides well-maintained cars, SUVs, and coaches for all your local and outstation journeys with experienced drivers.
              </p>
            </div>

            <div className="tempofaq-business-box">
              <span className="tempofaq-business-label">Contact Us</span>
              <address>
                <div className="tempofaq-business-row">
                  <span className="tempofaq-business-icon">📍</span>
                  <span>{BUSINESS.address}</span>
                </div>
                <div className="tempofaq-business-row">
                  <span className="tempofaq-business-icon">📞</span>
                  <div className="tempofaq-phone-links">
                    <a href={`tel:+91${BUSINESS.phone1}`}>+91 {BUSINESS.phone1}</a>
                    <a href={`tel:+91${BUSINESS.phone2}`}>+91 {BUSINESS.phone2}</a>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="tempofaq-content-section">
        <div className="tempofaq-container">
          <div className="tempofaq-section-heading">
            <span className="tempofaq-section-label">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="tempofaq-grid">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndices.includes(index);

              return (
                <article
                  key={`tempofaq-${index}`}
                  className={`tempofaq-card ${isOpen ? "tempofaq-card-active" : ""}`}
                >
                  <button
                    type="button"
                    className="tempofaq-card-question"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`tempofaq-answer-${index}`}
                  >
                    <span>{item.question}</span>
                    <span className="tempofaq-icon-wrapper">▼</span>
                  </button>

                  <div
                    id={`tempofaq-answer-${index}`}
                    className="tempofaq-card-answer-wrapper"
                    style={{ maxHeight: isOpen ? "300px" : "0px" }}
                  >
                    <div className="tempofaq-card-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="tempofaq-cta-section">
        <div className="tempofaq-container">
          <div className="tempofaq-cta">
            <div className="tempofaq-cta-content">
              <span className="tempofaq-section-label">Book Now</span>
              <h2>Ready for your next journey?</h2>
              <p>Call our team today to reserve your vehicle or plan your custom itinerary.</p>
            </div>
            <div className="tempofaq-cta-actions">
              <a href={`tel:+91${BUSINESS.phone1}`} className="tempofaq-call-button">
                Call {BUSINESS.phone1}
              </a>
              <a href={`tel:+91${BUSINESS.phone2}`} className="tempofaq-call-button tempofaq-call-button-light">
                Call {BUSINESS.phone2}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tempofaq;