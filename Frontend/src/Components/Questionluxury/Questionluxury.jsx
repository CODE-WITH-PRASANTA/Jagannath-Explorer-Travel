import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Questionluxury.css";

/* =========================================================
   BUSINESS INFORMATION
========================================================= */

const BUSINESS = {
  name: "Jagannath Explorer Travels",
  address:
    "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha, Pin - 751002",
  phones: ["9668892441", "9556355446"],
};

/* =========================================================
   FAQ DATA
========================================================= */

const FAQ_ITEMS = [
  {
    question: "What services does Jagannath Explorer Travels provide?",
    answer:
      "Jagannath Explorer Travels provides local and outstation car rentals, luxury vehicle rentals, Tempo Travellers, Urbania vehicles, wedding transportation, airport and railway transfers, and customized travel arrangements for individuals, families, groups, and special occasions.",
  },
  {
    question: "Are you a Tour & Travel Agency in Bhubaneswar, Odisha?",
    answer:
      "Yes. Jagannath Explorer Travels is a local travel service provider based in Bhubaneswar, Odisha. We assist customers with vehicle rentals, tour transportation, outstation journeys, group travel, sightseeing requirements, and customized travel plans.",
  },
  {
    question: "Why choose Jagannath Explorer Travels for local travel?",
    answer:
      "We focus on comfortable vehicles, dependable service, clear communication, and practical travel arrangements. Whether you need a car for a few hours, a full-day local trip, airport transfer, or transportation for a family function, our team helps arrange a suitable vehicle.",
  },
  {
    question: "Do you provide outstation car rental services?",
    answer:
      "Yes. We provide outstation transportation from Bhubaneswar for family trips, business travel, sightseeing, religious journeys, weddings, and other long-distance requirements. Vehicle options are available for both small families and larger groups.",
  },
  {
    question: "What types of vehicles can I book?",
    answer:
      "Our available vehicle options include Swift Dzire, Aura, Xcent, Ertiga, Toyota Innova, Innova Crysta, Honda City, Verna, Tempo Travellers, Urbania vehicles, and SML coaches. Vehicle availability may depend on the travel date and booking requirement.",
  },
  {
    question: "Can I book a vehicle for a wedding or special event?",
    answer:
      "Yes. We arrange comfortable and premium transportation for weddings, receptions, family celebrations, corporate events, and other special occasions. You can discuss your date, route, number of passengers, and preferred vehicle with our team.",
  },
  {
    question: "Do you provide airport and railway station pickup?",
    answer:
      "Yes. Airport and railway station pickup and drop services are available in Bhubaneswar with advance booking. Please share your arrival or departure details so that the appropriate vehicle can be arranged for your journey.",
  },
  {
    question: "Can I book a Tempo Traveller for a group trip?",
    answer:
      "Yes. Tempo Travellers are suitable for family tours, group sightseeing, corporate outings, pilgrimages, and outstation trips. Different seating capacities are available, subject to availability for your selected travel date.",
  },
  {
    question: "How can I book a vehicle?",
    answer:
      "You can contact Jagannath Explorer Travels directly by phone or WhatsApp. Share your travel date, pickup location, destination, number of passengers, and preferred vehicle. Our team can then guide you with the suitable option and booking details.",
  },
  {
    question: "Where is Jagannath Explorer Travels located?",
    answer:
      "Our office is located at Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha, Pin - 751002. Customers can contact us on 9668892441 or 9556355446 for travel and vehicle booking enquiries.",
  },
];

/* =========================================================
   STRUCTURED DATA
========================================================= */

const FAQ_SCHEMA = {
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

const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: BUSINESS.name,
  description:
    "Jagannath Explorer Travels is a Tour & Travel Agency in Bhubaneswar, Odisha providing local and outstation vehicle rentals, group transportation, airport transfers, wedding transportation, and customized travel services.",
  telephone: BUSINESS.phones.map((phone) => `+91${phone}`),
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    postalCode: "751002",
    addressCountry: "IN",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Bhubaneswar",
    },
    {
      "@type": "State",
      name: "Odisha",
    },
  ],
};

/* =========================================================
   COMPONENT
========================================================= */

const Questionluxury = () => {
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleAccordion = (index) => {
    setOpenIndices((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  return (
    <main className="question-luxury-page">
      {/* =====================================================
         SEO
      ===================================================== */}

      <Helmet>
        <title>
          Best Tour and Travel Agency in Bhubaneswar | Jagannath Explorer
          Travels FAQ
        </title>

        <meta
          name="description"
          content="Looking for the Best tour and travel agency in bhubaneswar? Jagannath Explorer Travels is a Tour & Travel Agency in Bhubaneswar, Odisha offering car rentals, outstation travel, Tempo Travellers, airport transfers, wedding transportation and customized tour services."
        />

        <meta
          name="keywords"
          content="Best tour and travel agency in bhubaneswar, Tour & Travel Agency in Bhubaneswar, Odisha, tour packages Bhubaneswar, travel operators in Bhubaneswar, car rental Bhubaneswar, outstation car rental Bhubaneswar, Tempo Traveller Bhubaneswar, wedding car rental Bhubaneswar, Jagannath Explorer Travels"
        />

        <meta
          name="author"
          content="Jagannath Explorer Travels"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <meta
          name="geo.region"
          content="IN-OD"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Best Tour and Travel Agency in Bhubaneswar | Jagannath Explorer Travels"
        />

        <meta
          property="og:description"
          content="Explore frequently asked questions about Jagannath Explorer Travels, a Tour & Travel Agency in Bhubaneswar, Odisha offering local, outstation and group travel services."
        />

        <meta
          property="og:site_name"
          content="Jagannath Explorer Travels"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Best Tour and Travel Agency in Bhubaneswar | Jagannath Explorer Travels"
        />

        <meta
          name="twitter:description"
          content="Frequently asked questions about vehicle rentals, tour packages, outstation trips and travel services in Bhubaneswar, Odisha."
        />

        <script type="application/ld+json">
          {JSON.stringify(FAQ_SCHEMA)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(BUSINESS_SCHEMA)}
        </script>
      </Helmet>

      {/* =====================================================
         HEADER SECTION
      ===================================================== */}

      <section className="question-luxury-header">
        <div className="question-luxury-header-glow"></div>

        <span className="question-luxury-subtitle">
          ✦ TRAVEL INFORMATION ✦
        </span>

        <h1 className="question-luxury-title">
          Best tour and travel agency in bhubaneswar
          <br />
          <span>Frequently Asked Questions</span>
        </h1>

        <div className="question-luxury-title-line">
          <span></span>
          <i>❦</i>
          <span></span>
        </div>

        <p className="question-luxury-description">
          Planning a trip, vehicle rental or group journey in Bhubaneswar?
          Find helpful answers about our travel services, vehicle bookings,
          outstation trips, tour packages and transportation options.
          <strong>
            {" "}
            Jagannath Explorer Travels
          </strong>{" "}
          provides practical travel solutions for families, groups, businesses
          and special occasions across Bhubaneswar and Odisha.
        </p>

        {/* BUSINESS INFO */}

        <div className="question-luxury-business-info">
          <div className="question-luxury-business-item">
            <span className="question-luxury-business-label">
              TRAVEL COMPANY
            </span>

            <strong>{BUSINESS.name}</strong>
          </div>

          <div className="question-luxury-business-item">
            <span className="question-luxury-business-label">
              LOCATION
            </span>

            <strong>
              Bhubaneswar, Odisha - 751002
            </strong>
          </div>

          <div className="question-luxury-business-item">
            <span className="question-luxury-business-label">
              CALL US
            </span>

            <strong>
              {BUSINESS.phones[0]} | {BUSINESS.phones[1]}
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
         SEO INTRODUCTION
      ===================================================== */}

      <section className="question-luxury-intro-section">
        <div className="question-luxury-container">
          <div className="question-luxury-intro-card">
            <span className="question-luxury-intro-label">
              ✦ PLAN YOUR JOURNEY ✦
            </span>

            <h2>
              Tour Packages &amp; Travel Operators in Bhubaneswar
            </h2>

            <p>
              Choosing the right travel partner can make a journey much easier.
              Jagannath Explorer Travels offers local transportation and travel
              support from Bhubaneswar for city travel, family outings,
              sightseeing, business requirements, weddings, group tours and
              outstation journeys.
            </p>

            <p>
              As a{" "}
              <strong>
                Tour &amp; Travel Agency in Bhubaneswar, Odisha
              </strong>
              , we understand that every trip has different requirements.
              Some travellers need a comfortable sedan for a short city
              journey, while families and larger groups may prefer an Innova,
              Tempo Traveller, Urbania or coach. Our team helps customers choose
              a vehicle according to their route, group size and travel plan.
            </p>

            <p>
              If you are searching for the{" "}
              <strong>
                Best tour and travel agency in bhubaneswar
              </strong>
              , you can contact Jagannath Explorer Travels to discuss your
              requirement and receive suitable travel assistance.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
         FAQ GRID SECTION
      ===================================================== */}

      <section className="question-luxury-content-section">
        <div className="question-luxury-container">

          <div className="question-luxury-section-heading">
            <span>✦ COMMON TRAVEL QUESTIONS ✦</span>

            <h2>
              Everything You Need to Know
            </h2>

            <p>
              Quick answers to common questions about our vehicles,
              bookings and travel services.
            </p>
          </div>

          <div className="question-luxury-grid">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndices.includes(index);

              return (
                <div
                  key={`faq-${index}`}
                  className={`question-luxury-card ${
                    isOpen
                      ? "question-luxury-card-active"
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    className="question-luxury-card-question"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>
                      {item.question}
                    </span>

                    <div className="question-luxury-icon-wrapper">
                      <svg
                        className="question-luxury-chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    className="question-luxury-card-answer-wrapper"
                    style={{
                      maxHeight: isOpen ? "320px" : "0px",
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
         CONTACT CTA
      ===================================================== */}

      <section className="question-luxury-contact-section">
        <div className="question-luxury-contact-card">

          <span>
            ✦ READY TO TRAVEL? ✦
          </span>

          <h2>
            Let&apos;s Plan Your Journey
          </h2>

          <p>
            Tell us your travel date, pickup location, destination and
            passenger count. Our team will help you choose a suitable vehicle
            for your journey.
          </p>

          <div className="question-luxury-contact-details">
            <a href="tel:+919668892441">
              <span>Call</span>
              9668892441
            </a>

            <a href="tel:+919556355446">
              <span>Call</span>
              9556355446
            </a>
          </div>

          <p className="question-luxury-address">
            {BUSINESS.address}
          </p>
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