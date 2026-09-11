import React, { useState } from "react";
import "./Smlfaq.css";

/* =========================================================
   FAQ DATA
========================================================= */

const SML_FAQS = [
  {
    id: 1,
    question: "What travel and tour services do you provide in Bhubaneswar?",
    answer:
      "We provide local sightseeing, airport and railway transfers, outstation cab booking, family tours, corporate travel, pilgrimage trips and group transportation from Bhubaneswar. Our fleet includes comfortable sedans, SUVs, Travellers, Urbania vehicles and A/C coaches for different group sizes.",
  },
  {
    id: 2,
    question: "Why choose you as the Best Tour & Travel Agency in Bhubaneswar?",
    answer:
      "We focus on making every journey simple and comfortable, from choosing the right vehicle to planning the route. Our services are suitable for families, couples, corporate groups and larger tour groups travelling around Bhubaneswar and different destinations across Odisha.",
  },
  {
    id: 3,
    question: "Do you provide Odisha Tour & Travel services from Bhubaneswar?",
    answer:
      "Yes. We arrange travel from Bhubaneswar to popular destinations across Odisha, including Puri, Konark, Chilika, Cuttack and other places based on your itinerary. You can choose a vehicle according to your group size and travel requirements.",
  },
  {
    id: 4,
    question: "Do you offer Odisha tourism packages with price details?",
    answer:
      "Yes, we can help you plan Odisha tourism packages based on the destinations, number of travellers, vehicle type and number of days. Since every trip is different, the final price is prepared according to your itinerary rather than using a fixed price for every tour.",
  },
  {
    id: 5,
    question: "Can I book an outstation cab from Bhubaneswar?",
    answer:
      "Absolutely. Outstation cab and vehicle booking is available for short and multi-day journeys. For outstation duty, a minimum of 300 km is charged per day as per the applicable tariff. You can select a sedan, SUV, Traveller, Urbania or coach depending on your requirements.",
  },
  {
    id: 6,
    question: "Which vehicles are available for sightseeing and group tours?",
    answer:
      "Our available options include Swift Dzire, Aura, Xcent, Ertiga, Toyota Innova, Innova Crysta, Honda City, Verna, 13/17/25-seater Travellers, 10/12/17-seater Urbania vehicles and 13/19/22/28/36-seater SML A/C coaches.",
  },
  {
    id: 7,
    question: "Can you arrange Bhubaneswar, Puri and Konark sightseeing?",
    answer:
      "Yes. Bhubaneswar, Puri and Konark are among the most popular routes for travellers visiting Odisha. We can arrange comfortable transportation for temple visits, sightseeing and family trips according to your preferred schedule.",
  },
  {
    id: 8,
    question: "Do you provide airport and railway station pickup in Bhubaneswar?",
    answer:
      "Yes. Airport and railway station pickup and drop services are available in Bhubaneswar. You can book a suitable vehicle for individual travel, family transfers or larger groups.",
  },
  {
    id: 9,
    question: "Are your vehicles suitable for family and corporate tours?",
    answer:
      "Yes. We have vehicles for both small and large groups. Sedans and SUVs are suitable for families and smaller groups, while Travellers, Urbania vehicles and SML A/C coaches are convenient for corporate groups, wedding travel, school trips and larger tour groups.",
  },
  {
    id: 10,
    question: "How can I book a tour or vehicle in Bhubaneswar?",
    answer:
      "You can contact our travel team through the available booking, call or WhatsApp options. Share your travel date, pickup location, destination, number of travellers and preferred vehicle, and we can suggest a suitable travel option and quotation.",
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

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="smlfaq-header">

          <span className="smlfaq-subtitle">
            Travel Help &amp; Information
          </span>

          {/* Primary SEO Keyword */}
          <h1 className="smlfaq-title">
            Best Tour &amp; Travel Agency in Bhubaneswar
          </h1>

          <div className="smlfaq-title-line">
            <span></span>
            <i>◆</i>
            <span></span>
          </div>

          <p className="smlfaq-description">
            Have questions about tour packages, vehicle booking,
            sightseeing or travelling across Odisha? Find answers
            to some of the most common questions below.
          </p>

        </div>

        {/* =================================================
            SEO INTRO CONTENT
        ================================================= */}

        <div className="smlfaq-intro">

          <p>
            Planning a trip from Bhubaneswar becomes easier when your
            transportation and itinerary are taken care of properly.
            As an <strong>Odisha Tour &amp; Travel Agency in Bhubaneswar,
            Odisha</strong>, we provide travel solutions for local
            sightseeing, family holidays, pilgrimage tours, corporate
            travel and outstation journeys.
          </p>

          <p>
            Whether you are looking for a comfortable cab for a short
            sightseeing trip or a larger vehicle for a group tour, we
            offer different vehicle options to suit your travel plans.
            We also help travellers plan trips to popular destinations
            such as Puri, Konark and Chilika.
          </p>

        </div>

        {/* =================================================
            FAQ GRID
        ================================================= */}

        <div className="smlfaq-grid">

          {SML_FAQS.map((faq) => {

            const isOpen = !!openIds[faq.id];

            return (
              <div
                key={faq.id}
                className={`smlfaq-item ${
                  isOpen ? "smlfaq-item-active" : ""
                }`}
              >

                <button
                  type="button"
                  className="smlfaq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`smlfaq-answer-${faq.id}`}
                >

                  <span className="smlfaq-question-text">
                    {faq.question}
                  </span>

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

                <div
                  id={`smlfaq-answer-${faq.id}`}
                  className="smlfaq-answer-wrapper"
                >

                  <div className="smlfaq-answer-inner">

                    <p className="smlfaq-answer-text">
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* =================================================
            BOTTOM SEO CONTENT
        ================================================= */}

        <div className="smlfaq-bottom-content">

          <div className="smlfaq-bottom-heading">

            <span className="smlfaq-bottom-label">
              Plan Your Odisha Journey
            </span>

            <h2>
              Explore Odisha Your Way
            </h2>

          </div>

          <p>
            From a quick Bhubaneswar city tour to a multi-day Odisha
            holiday, the right vehicle can make a big difference to
            your travel experience. We offer flexible transportation
            options for individuals, families and groups, making it
            convenient to plan your journey around your own schedule.
          </p>

          <p>
            Looking for <strong>Odisha tourism packages with price</strong>?
            Share your destinations, travel dates and number of
            travellers with us. We can help you choose a suitable
            vehicle and prepare a tour quotation based on your
            actual travel requirements.
          </p>

          <div className="smlfaq-destination-list">

            <span>Bhubaneswar</span>
            <span>Puri</span>
            <span>Konark</span>
            <span>Chilika</span>
            <span>Cuttack</span>
            <span>Odisha Tours</span>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Smlfaq;