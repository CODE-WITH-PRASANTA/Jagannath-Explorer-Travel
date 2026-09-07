import React from "react";
import { Helmet } from "react-helmet-async";
import "./Tempotransport.css";

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
   TRANSPORT TARIFF DATA
========================================================= */

const TRANSPORT_TARIFFS = [
  {
    vehicle: "Swift Dzire / Aura / Xcent",
    tenHrs: "2,500",
    eightHrs: "2,200",
    fourHrs: "1,600",
    extraHrs: "120",
    extraKm: "13",
  },
  {
    vehicle: "Ertiga",
    tenHrs: "3,500",
    eightHrs: "3,000",
    fourHrs: "2,500",
    extraHrs: "150",
    extraKm: "15",
  },
  {
    vehicle: "Toyota Innova",
    tenHrs: "4,000",
    eightHrs: "3,000",
    fourHrs: "2,800",
    extraHrs: "180",
    extraKm: "17",
  },
  {
    vehicle: "Toyota Innova Crysta",
    tenHrs: "4,500",
    eightHrs: "4,000",
    fourHrs: "3,500",
    extraHrs: "200",
    extraKm: "20",
    featured: true,
  },
  {
    vehicle: "Honda City / Verna",
    tenHrs: "5,000",
    eightHrs: "4,500",
    fourHrs: "4,000",
    extraHrs: "200",
    extraKm: "18",
  },
  {
    vehicle: "13 Seater Traveller",
    tenHrs: "5,000",
    eightHrs: "4,500",
    fourHrs: "4,000",
    extraHrs: "220",
    extraKm: "28",
  },
  {
    vehicle: "17 Seater Traveller",
    tenHrs: "5,500",
    eightHrs: "5,000",
    fourHrs: "4,500",
    extraHrs: "250",
    extraKm: "30",
  },
  {
    vehicle: "25 Seater Traveller",
    tenHrs: "7,500",
    eightHrs: "7,000",
    fourHrs: "6,500",
    extraHrs: "350",
    extraKm: "45",
  },
  {
    vehicle: "10 Seater Urbania",
    tenHrs: "11,000",
    eightHrs: "10,000",
    fourHrs: "—",
    extraHrs: "500",
    extraKm: "50",
  },
  {
    vehicle: "12 Seater Urbania",
    tenHrs: "12,000",
    eightHrs: "11,000",
    fourHrs: "—",
    extraHrs: "500",
    extraKm: "60",
  },
  {
    vehicle: "17 Seater Urbania",
    tenHrs: "13,000",
    eightHrs: "12,000",
    fourHrs: "—",
    extraHrs: "500",
    extraKm: "65",
  },
  {
    vehicle: "13 SML Coach A/C",
    tenHrs: "9,000",
    eightHrs: "8,000",
    fourHrs: "7,500",
    extraHrs: "500",
    extraKm: "45",
  },
  {
    vehicle: "19 SML Coach A/C",
    tenHrs: "11,000",
    eightHrs: "10,000",
    fourHrs: "9,000",
    extraHrs: "600",
    extraKm: "55",
  },
  {
    vehicle: "22 SML Coach A/C",
    tenHrs: "14,000",
    eightHrs: "13,000",
    fourHrs: "12,000",
    extraHrs: "700",
    extraKm: "55",
  },
  {
    vehicle: "28 SML Coach A/C",
    tenHrs: "18,000",
    eightHrs: "17,000",
    fourHrs: "16,000",
    extraHrs: "800",
    extraKm: "60",
  },
  {
    vehicle: "36 SML Coach A/C",
    tenHrs: "20,000",
    eightHrs: "18,000",
    fourHrs: "17,000",
    extraHrs: "1,000",
    extraKm: "65",
  },
];

/* =========================================================
   TERMS & CONDITIONS
========================================================= */

const TERMS_CONDITIONS = [
  "Toll Tax, Interstate Tax and Parking charges will be charged on an actual basis.",
  "Kilometres and hours are calculated from garage to garage.",
  "Night Halt Charges from 10 PM to 6 AM: Light Vehicle - ₹350, Traveller - ₹500, Coach - ₹1,000.",
  "Driver allowance for outstation trips: Light Vehicle - ₹350, Tempo - ₹500, Coach - ₹1,000.",
  "A vehicle covering below 300 km in a day will be billed as per the applicable local tariff.",
  "For outstation duty, a minimum of 300 km is charged per day.",
  "Standing AC is chargeable where applicable.",
  "If a booking is cancelled before 24 hours of the scheduled time, 20% of the total billing will be charged.",
  "While travelling on Ghat roads, air-conditioning may remain switched off for vehicle safety and performance.",
  "All disputes are subject to Bhubaneswar legal jurisdiction only.",
];

/* =========================================================
   TABLE HEADER
========================================================= */

const tableHeaders = [
  {
    key: "vehicle",
    label: "Vehicle A/C",
  },
  {
    key: "tenHrs",
    label: "10 Hrs. / 100 Km",
  },
  {
    key: "eightHrs",
    label: "8 Hrs. / 80 Km",
  },
  {
    key: "fourHrs",
    label: "4 Hrs. / 40 Km",
  },
  {
    key: "extraHrs",
    label: "Extra Hrs.",
  },
  {
    key: "extraKm",
    label: "Extra Km",
  },
];

/* =========================================================
   STRUCTURED DATA
========================================================= */

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: BUSINESS.name,
  telephone: [
    "+919668892441",
    "+919556355446",
  ],
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
  description:
    "Jagannath Explorer Travels is a travel agency in Bhubaneswar offering local and outstation vehicle rentals, group transportation, sightseeing services and Odisha tourism packages.",
  serviceType: [
    "Local Car Rental",
    "Outstation Car Rental",
    "Tempo Traveller Rental",
    "Urbania Rental",
    "Group Transportation",
    "Odisha Tourism Packages",
    "Airport Transfer",
    "Railway Station Transfer",
  ],
};

/* =========================================================
   COMPONENT
========================================================= */

const Tempotransport = () => {
  return (
    <main className="tempotransport-page">

      {/* =====================================================
          SEO / META TAGS
      ===================================================== */}

      <Helmet>
        <title>
          Best Tour and Travel Agency in Bhubaneswar | Transport Tariff
          | Jagannath Explorer Travels
        </title>

        <meta
          name="description"
          content="Jagannath Explorer Travels is a trusted tour and travel agency in Bhubaneswar offering local and outstation cab rentals, Tempo Travellers, Urbania, group transportation and Odisha tourism packages with price options."
        />

        <meta
          name="keywords"
          content="Best tour and travel agency in bhubaneswar, tour and travel agency in Bhubaneswar, travel agency in Bhubaneswar, top 10 travel agency in Bhubaneswar, Odisha tourism packages with price, Odisha tour packages, Bhubaneswar tour packages, travel operators in Bhubaneswar, car rental Bhubaneswar, Tempo Traveller Bhubaneswar, Urbania rental Bhubaneswar, outstation cab Bhubaneswar, Jagannath Explorer Travels"
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
          name="language"
          content="English"
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
          name="geo.position"
          content="20.2961;85.8245"
        />

        <meta
          name="ICBM"
          content="20.2961, 85.8245"
        />

        <meta
          name="theme-color"
          content="#0f172a"
        />

        {/* Open Graph */}

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
          content="Explore transparent transport tariffs, local and outstation vehicle rentals and Odisha tourism packages from Jagannath Explorer Travels, Bhubaneswar."
        />

        <meta
          property="og:site_name"
          content="Jagannath Explorer Travels"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        {/* Twitter */}

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
          content="Local and outstation travel services, vehicle rentals and Odisha tourism packages from Jagannath Explorer Travels."
        />

        {/* Structured Data */}

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* =====================================================
          HERO / TITLE SECTION
      ===================================================== */}

      <section className="tempotransport-header">

        <span className="tempotransport-subtitle">
          ✦ JAGANNATH EXPLORER TRAVELS ✦
        </span>

        <h1 className="tempotransport-title">
          Best tour and travel agency in bhubaneswar
          <span className="tempotransport-title-accent">
            Transport Tariff &amp; Travel Services
          </span>
        </h1>

        <div className="tempotransport-title-line">
          <span></span>
          <i>◆</i>
          <span></span>
        </div>

        <p className="tempotransport-intro">
          Planning a city ride, family trip, wedding journey or an
          outstation holiday from Bhubaneswar? Jagannath Explorer Travels
          offers practical transportation options for individuals,
          families and groups. Choose from comfortable cars, Tempo
          Travellers, Urbania vehicles and larger coaches according to
          your route and group size.
        </p>

        <p className="tempotransport-intro-secondary">
          We also help travellers plan{" "}
          <strong>Odisha tourism packages with price</strong> options
          based on the destination, number of travellers, vehicle type
          and duration of the trip. From Bhubaneswar sightseeing to
          longer Odisha journeys, our team can help you arrange a
          convenient travel plan.
        </p>

        {/* Business Contact */}

        <div className="tempotransport-business-card">

          <div className="tempotransport-business-item">
            <span className="tempotransport-business-label">
              OFFICE
            </span>

            <strong>
              {BUSINESS.name}
            </strong>

            <p>
              {BUSINESS.address}
            </p>
          </div>

          <div className="tempotransport-business-divider"></div>

          <div className="tempotransport-business-item">
            <span className="tempotransport-business-label">
              BOOKING HELPLINE
            </span>

            <div className="tempotransport-phone-links">
              <a href={`tel:+91${BUSINESS.phone1}`}>
                {BUSINESS.phone1}
              </a>

              <a href={`tel:+91${BUSINESS.phone2}`}>
                {BUSINESS.phone2}
              </a>
            </div>
          </div>

        </div>

      </section>

      {/* =====================================================
          TARIFF SECTION
      ===================================================== */}

      <section className="tempotransport-tariff-section">

        <div className="tempotransport-tariff-wrapper">

          {/* Banner */}

          <div className="tempotransport-tariff-banner">

            <div>
              <span className="tempotransport-banner-eyebrow">
                LOCAL &amp; OUTSTATION TRAVEL
              </span>

              <span className="tempotransport-banner-text">
                Transport Tariff — 300 Km Per Day for Outstation
              </span>
            </div>

          </div>

          {/* Desktop Table */}

          <div className="tempotransport-table-container">

            <table className="tempotransport-table">

              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header.key}
                      className={`tempotransport-th tempotransport-th-${header.key}`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {TRANSPORT_TARIFFS.map((item, index) => (
                  <tr
                    key={`${item.vehicle}-${index}`}
                    className={
                      item.featured
                        ? "tempotransport-featured-row"
                        : ""
                    }
                  >

                    <td className="tempotransport-vehicle-cell">

                      <span className="tempotransport-vehicle-name">
                        {item.vehicle}
                      </span>

                      {item.featured && (
                        <span className="tempotransport-popular-badge">
                          Popular
                        </span>
                      )}

                    </td>

                    <td>
                      <span className="tempotransport-price">
                        ₹{item.tenHrs}
                      </span>
                    </td>

                    <td>
                      <span className="tempotransport-price">
                        ₹{item.eightHrs}
                      </span>
                    </td>

                    <td
                      className={
                        item.fourHrs === "—"
                          ? "tempotransport-na"
                          : ""
                      }
                    >
                      {item.fourHrs === "—"
                        ? "—"
                        : `₹${item.fourHrs}`}
                    </td>

                    <td>
                      ₹{item.extraHrs}
                    </td>

                    <td>
                      ₹{item.extraKm}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          {/* Mobile Cards */}

          <div className="tempotransport-mobile-list">

            {TRANSPORT_TARIFFS.map((item, index) => (

              <article
                key={`mobile-${item.vehicle}-${index}`}
                className={`tempotransport-mobile-card ${
                  item.featured
                    ? "tempotransport-mobile-card-featured"
                    : ""
                }`}
              >

                <div className="tempotransport-mobile-card-head">

                  <div className="tempotransport-mobile-vehicle">

                    <span className="tempotransport-mobile-vehicle-label">
                      Vehicle A/C
                    </span>

                    <h3>
                      {item.vehicle}
                    </h3>

                  </div>

                  {item.featured && (
                    <span className="tempotransport-mobile-badge">
                      Popular
                    </span>
                  )}

                </div>

                <div className="tempotransport-mobile-price-grid">

                  <div className="tempotransport-mobile-price">
                    <span>
                      10 Hrs. / 100 Km
                    </span>
                    <strong>
                      ₹{item.tenHrs}
                    </strong>
                  </div>

                  <div className="tempotransport-mobile-price">
                    <span>
                      8 Hrs. / 80 Km
                    </span>
                    <strong>
                      ₹{item.eightHrs}
                    </strong>
                  </div>

                  <div className="tempotransport-mobile-price">
                    <span>
                      4 Hrs. / 40 Km
                    </span>
                    <strong>
                      {item.fourHrs === "—"
                        ? "—"
                        : `₹${item.fourHrs}`}
                    </strong>
                  </div>

                  <div className="tempotransport-mobile-price">
                    <span>
                      Extra Hours
                    </span>
                    <strong>
                      ₹{item.extraHrs}
                    </strong>
                  </div>

                  <div className="tempotransport-mobile-price">
                    <span>
                      Extra Km
                    </span>
                    <strong>
                      ₹{item.extraKm}
                    </strong>
                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          TOURISM CONTENT
      ===================================================== */}

      <section className="tempotransport-tourism-section">

        <div className="tempotransport-tourism-wrapper">

          <div className="tempotransport-tourism-content">

            <span className="tempotransport-section-kicker">
              EXPLORE ODISHA WITH CONFIDENCE
            </span>

            <h2>
              Odisha Tourism Packages With Price
            </h2>

            <p>
              Odisha is a wonderful choice for family holidays,
              temple visits, coastal escapes and cultural trips.
              If you are starting your journey from Bhubaneswar,
              Jagannath Explorer Travels can help arrange the vehicle
              and travel plan around your preferred destinations.
            </p>

            <p>
              Popular travel plans can include Bhubaneswar,
              Puri, Konark, Chilika, Dhauli, Cuttack and other
              destinations across Odisha. The final package price
              depends on the vehicle, travel dates, route, number of
              passengers and duration, so we provide a practical
              quotation based on your actual requirements.
            </p>

          </div>

          <div className="tempotransport-tourism-highlights">

            <div className="tempotransport-tourism-highlight">
              <span>01</span>
              <strong>
                Bhubaneswar Sightseeing
              </strong>
              <p>
                Comfortable local travel for temples,
                landmarks and city attractions.
              </p>
            </div>

            <div className="tempotransport-tourism-highlight">
              <span>02</span>
              <strong>
                Puri &amp; Konark Trips
              </strong>
              <p>
                Convenient travel options for family
                and group journeys.
              </p>
            </div>

            <div className="tempotransport-tourism-highlight">
              <span>03</span>
              <strong>
                Chilika &amp; Coastal Routes
              </strong>
              <p>
                Plan relaxed day trips and longer
                coastal journeys from Bhubaneswar.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="tempotransport-services-section">

        <div className="tempotransport-services-header">

          <span>
            WHY TRAVELLERS CHOOSE US
          </span>

          <h2>
            Travel options designed around your journey
          </h2>

        </div>

        <div className="tempotransport-services-grid">

          <div className="tempotransport-service-card">
            <span className="tempotransport-service-number">
              01
            </span>

            <h3>
              Flexible Vehicle Choices
            </h3>

            <p>
              From comfortable sedans and SUVs to Tempo Travellers,
              Urbania vehicles and coaches, we have options for
              different group sizes and travel requirements.
            </p>
          </div>

          <div className="tempotransport-service-card">
            <span className="tempotransport-service-number">
              02
            </span>

            <h3>
              Local &amp; Outstation Travel
            </h3>

            <p>
              Arrange city travel, airport transfers, sightseeing,
              wedding transportation or longer outstation journeys
              from Bhubaneswar.
            </p>
          </div>

          <div className="tempotransport-service-card">
            <span className="tempotransport-service-number">
              03
            </span>

            <h3>
              Group Travel Made Simple
            </h3>

            <p>
              Travelling with family, friends or a larger group?
              Select a suitable vehicle based on passenger count,
              luggage and route.
            </p>
          </div>

        </div>

      </section>

      {/* =====================================================
          TERMS & CONDITIONS
      ===================================================== */}

      <section className="tempotransport-terms-section">

        <div className="tempotransport-terms-wrapper">

          <div className="tempotransport-terms-heading-area">

            <span className="tempotransport-section-kicker">
              BEFORE YOU BOOK
            </span>

            <h2 className="tempotransport-terms-title">
              Terms &amp; Conditions
            </h2>

            <div className="tempotransport-terms-line"></div>

            <p>
              Please review the following points before confirming
              your local or outstation vehicle booking.
            </p>

          </div>

          <div className="tempotransport-terms-list">

            {TERMS_CONDITIONS.map((term, index) => (

              <div
                className="tempotransport-term-item"
                key={index}
              >

                <div className="tempotransport-check-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                    />

                    <path d="M7 12.5l3.2 3L17 8.5" />
                  </svg>
                </div>

                <p>
                  {term}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT CTA
      ===================================================== */}

      <section className="tempotransport-contact-section">

        <div className="tempotransport-contact-card">

          <div>

            <span className="tempotransport-contact-kicker">
              PLAN YOUR NEXT JOURNEY
            </span>

            <h2>
              Need a vehicle or an Odisha tour plan?
            </h2>

            <p>
              Tell us your destination, travel date, passenger
              count and preferred vehicle. Our team at Jagannath
              Explorer Travels can help you choose a suitable
              travel option.
            </p>

          </div>

          <div className="tempotransport-contact-actions">

            <a
              href={`tel:+91${BUSINESS.phone1}`}
              className="tempotransport-contact-btn"
            >
              Call {BUSINESS.phone1}
            </a>

            <a
              href={`tel:+91${BUSINESS.phone2}`}
              className="tempotransport-contact-btn secondary"
            >
              Call {BUSINESS.phone2}
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Tempotransport;