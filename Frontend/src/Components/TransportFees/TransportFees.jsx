import React from "react";
import { Helmet } from "react-helmet-async";
import "./TransportFees.css";

/* =========================================================
   BUSINESS INFORMATION
========================================================= */

const BUSINESS = {
  name: "Jagannath Explorer Travels",
  address:
    "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha, Pin - 751002",
  phones: ["9668892441", "9556355446"],
  city: "Bhubaneswar",
  state: "Odisha",
  pin: "751002",
};

/* =========================================================
   SEO STRUCTURED DATA
========================================================= */

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: BUSINESS.name,
  url: "https://jagannathexplorertravels.com/transport-fees",
  telephone: ["+919668892441", "+919556355446"],
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
    "Jagannath Explorer Travels is a trusted travel agency in Bhubaneswar offering tour packages, travel operator services, local transportation, outstation travel and comfortable vehicles for individuals, families, corporate groups and special occasions.",
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
  "Toll Tax, Interstate Tax and Parking charges are applicable on an actual basis.",
  "Kilometres and hours will be calculated from garage to garage.",
  "Night halt charges from 10 PM to 6 AM: Light Vehicle - ₹350, Traveller - ₹500, Coach - ₹1,000.",
  "Driver allowance is applicable for outstation trips: Light Vehicle - ₹350, Tempo - ₹500, Coach - ₹1,000.",
  "A vehicle covering below 300 km in a day will be billed according to the applicable local tariff.",
  "For outstation duty, a minimum of 300 km will be charged per day.",
  "Standing AC usage is chargeable.",
  "If a booking is cancelled before 24 hours of the scheduled time, 20% of the total billing will be charged.",
  "While travelling on Ghat roads, the air-conditioning may need to remain switched off for vehicle safety and operating conditions.",
  "All disputes are subject to Bhubaneswar legal jurisdiction only.",
];

/* =========================================================
   TABLE HEADERS
========================================================= */

const tableHeaders = [
  {
    key: "vehicle",
    label: "Vehicle A/C",
  },
  {
    key: "tenHrs",
    label: "10 Hrs. / 100 Km (Rs.)",
  },
  {
    key: "eightHrs",
    label: "8 Hrs. / 80 Km (Rs.)",
  },
  {
    key: "fourHrs",
    label: "4 Hrs. / 40 Km (Rs.)",
  },
  {
    key: "extraHrs",
    label: "Extra Hrs. (Rs.)",
  },
  {
    key: "extraKm",
    label: "Extra Km (Rs.)",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const TransportFees = () => {
  return (
    <main className="transport-fees-page">

      {/* =====================================================
          SEO
      ===================================================== */}

      <Helmet>
        <title>
          Best Tour and Travel Agency in Bhubaneswar | Transport Tariff |
          Jagannath Explorer Travels
        </title>

        <meta
          name="description"
          content="Jagannath Explorer Travels is a trusted travel agency in Bhubaneswar offering transparent transport tariffs, tour packages, travel operator services, local cab rentals, outstation vehicles, tempo travellers and coaches across Bhubaneswar and Odisha."
        />

        <meta
          name="keywords"
          content="Best tour and travel agency in bhubaneswar, Tour packages & Travel operators in Bhubaneswar, tour packages in Bhubaneswar, travel operators in Bhubaneswar, travel agency in Bhubaneswar, transport tariff Bhubaneswar, car rental Bhubaneswar, tempo traveller Bhubaneswar, bus rental Bhubaneswar, outstation travel Bhubaneswar, Jagannath Explorer Travels"
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
          name="theme-color"
          content="#c5a059"
        />

        <link
          rel="canonical"
          href="https://jagannathexplorertravels.com/transport-fees"
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
          content="Explore transparent transport tariffs and dependable travel services from Jagannath Explorer Travels, a trusted travel agency serving Bhubaneswar and Odisha."
        />

        <meta
          property="og:url"
          content="https://jagannathexplorertravels.com/transport-fees"
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
          content="Transparent transport tariffs, tour packages and travel operator services in Bhubaneswar and Odisha."
        />

        {/* Structured Data */}

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* =====================================================
          HERO HEADER
      ===================================================== */}

      <section className="transport-fees-header">

        <div className="transport-fees-header-glow"></div>

        <span className="transport-fees-subtitle">
          ✦ JAGANNATH EXPLORER TRAVELS ✦
        </span>

        <h1 className="transport-fees-title">
          Best tour and travel agency in bhubaneswar
          <br />
          <span>Transport Tariff</span>
        </h1>

        <div className="transport-fees-title-line">
          <span></span>
          <i>❦</i>
          <span></span>
        </div>

        <p className="transport-fees-header-description">
          Plan your journey with confidence with{" "}
          <strong>Jagannath Explorer Travels</strong>, a dependable travel
          service provider in Bhubaneswar. We offer comfortable cars,
          tempo travellers, Urbania vehicles and coaches for local travel,
          family trips, group journeys, weddings, corporate requirements
          and outstation tours across Odisha.
        </p>

        <div className="transport-fees-business-info">

          <div className="transport-fees-business-item">
            <span>📍</span>
            <p>
              {BUSINESS.address}
            </p>
          </div>

          <div className="transport-fees-business-item">
            <span>☎</span>
            <p>
              <a href="tel:+919668892441">
                9668892441
              </a>
              <span className="transport-fees-phone-separator">
                |
              </span>
              <a href="tel:+919556355446">
                9556355446
              </a>
            </p>
          </div>

        </div>

      </section>

      {/* =====================================================
          SEO INTRO CONTENT
      ===================================================== */}

      <section className="transport-fees-intro">

        <div className="transport-fees-intro-inner">

          <span className="transport-fees-intro-label">
            TRAVEL SERVICES IN BHUBANESWAR
          </span>

          <h2>
            Tour packages &amp; Travel operators in Bhubaneswar
          </h2>

          <p>
            Looking for reliable transportation for your next trip?
            <strong> Jagannath Explorer Travels </strong>
            provides practical travel solutions for individuals, families,
            businesses and groups. From comfortable sedans and SUVs to
            spacious tempo travellers, Urbania vehicles and coaches, our
            fleet is suitable for different travel requirements and group
            sizes.
          </p>

          <p>
            As a local travel service provider in Bhubaneswar, we understand
            that every journey has different requirements. Whether you need
            a vehicle for a city tour, a wedding function, an airport
            transfer, a family holiday, a corporate trip or an outstation
            journey, you can choose a vehicle according to your group size
            and travel plan.
          </p>

          <p>
            Our transport tariff is presented clearly so that customers can
            compare vehicle options before making a booking. For outstation
            journeys, the applicable minimum kilometres, driver allowance,
            tolls, parking and other conditions are explained in advance.
            This helps make your travel planning simpler and more
            straightforward.
          </p>

        </div>

      </section>

      {/* =====================================================
          TARIFF SECTION
      ===================================================== */}

      <section className="transport-fees-tariff-section">

        <div className="transport-fees-tariff-wrapper">

          {/* Banner */}

          <div className="transport-fees-tariff-banner">

            <div className="transport-fees-banner-shine"></div>

            <span className="transport-fees-banner-text">
              FOR LOCAL &amp; OUTSTATION
            </span>

            <span className="transport-fees-banner-distance">
              (300 Km Per Day)
            </span>

          </div>

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="transport-fees-table-container">

            <table className="transport-fees-table">

              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header.key}
                      className={`transport-fees-th transport-fees-th-${header.key}`}
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
                        ? "transport-fees-featured-row"
                        : ""
                    }
                  >

                    <td className="transport-fees-vehicle-cell">

                      <span className="transport-fees-vehicle-name">
                        {item.vehicle}
                      </span>

                      {item.featured && (
                        <span className="transport-fees-popular-badge">
                          Popular
                        </span>
                      )}

                    </td>

                    <td>{item.tenHrs}</td>

                    <td>{item.eightHrs}</td>

                    <td
                      className={
                        item.fourHrs === "—"
                          ? "transport-fees-na"
                          : ""
                      }
                    >
                      {item.fourHrs}
                    </td>

                    <td>{item.extraHrs}</td>

                    <td>{item.extraKm}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* =================================================
              MOBILE CARDS
          ================================================= */}

          <div className="transport-fees-mobile-list">

            {TRANSPORT_TARIFFS.map((item, index) => (

              <article
                key={`mobile-${item.vehicle}-${index}`}
                className={`transport-fees-mobile-card ${
                  item.featured
                    ? "transport-fees-mobile-card-featured"
                    : ""
                }`}
              >

                <div className="transport-fees-mobile-card-head">

                  <div className="transport-fees-mobile-vehicle">

                    <span className="transport-fees-mobile-vehicle-label">
                      Vehicle A/C
                    </span>

                    <h3>
                      {item.vehicle}
                    </h3>

                  </div>

                  {item.featured && (
                    <span className="transport-fees-mobile-badge">
                      Popular
                    </span>
                  )}

                </div>

                <div className="transport-fees-mobile-price-grid">

                  <div className="transport-fees-mobile-price">
                    <span>
                      10 Hrs. / 100 Km
                    </span>

                    <strong>
                      ₹{item.tenHrs}
                    </strong>
                  </div>

                  <div className="transport-fees-mobile-price">
                    <span>
                      8 Hrs. / 80 Km
                    </span>

                    <strong>
                      ₹{item.eightHrs}
                    </strong>
                  </div>

                  <div className="transport-fees-mobile-price">
                    <span>
                      4 Hrs. / 40 Km
                    </span>

                    <strong>
                      {item.fourHrs === "—"
                        ? "—"
                        : `₹${item.fourHrs}`}
                    </strong>
                  </div>

                  <div className="transport-fees-mobile-price">
                    <span>
                      Extra Hours
                    </span>

                    <strong>
                      ₹{item.extraHrs}
                    </strong>
                  </div>

                  <div className="transport-fees-mobile-price">
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
          WHY CHOOSE US
      ===================================================== */}

      <section className="transport-fees-service-section">

        <div className="transport-fees-service-wrapper">

          <div className="transport-fees-service-heading">

            <span>
              ✦ TRAVEL WITH CONFIDENCE ✦
            </span>

            <h2>
              Travel solutions for every journey
            </h2>

            <p>
              From short city rides to longer group journeys, our
              transportation options are planned around comfort,
              convenience and practical travel requirements.
            </p>

          </div>

          <div className="transport-fees-service-grid">

            <article className="transport-fees-service-card">
              <div className="transport-fees-service-icon">
                01
              </div>

              <h3>
                Local Travel
              </h3>

              <p>
                Comfortable vehicles for city travel, meetings,
                functions, airport transfers and everyday travel
                requirements in Bhubaneswar.
              </p>
            </article>

            <article className="transport-fees-service-card">
              <div className="transport-fees-service-icon">
                02
              </div>

              <h3>
                Outstation Trips
              </h3>

              <p>
                Choose from cars, travellers and coaches for family
                holidays, group tours and longer journeys across
                Odisha and nearby destinations.
              </p>
            </article>

            <article className="transport-fees-service-card">
              <div className="transport-fees-service-icon">
                03
              </div>

              <h3>
                Group Transportation
              </h3>

              <p>
                Spacious Traveller, Urbania and SML Coach options
                are available for larger groups, events, tours and
                corporate travel requirements.
              </p>
            </article>

          </div>

        </div>

      </section>

      {/* =====================================================
          TERMS & CONDITIONS
      ===================================================== */}

      <section className="transport-fees-terms-section">

        <div className="transport-fees-terms-wrapper">

          <div className="transport-fees-terms-heading-area">

            <span className="transport-fees-terms-mini">
              ✦ IMPORTANT INFORMATION ✦
            </span>

            <h2 className="transport-fees-terms-title">
              Terms &amp; Conditions
            </h2>

            <div className="transport-fees-terms-line"></div>

          </div>

          <div className="transport-fees-terms-list">

            {TERMS_CONDITIONS.map((term, index) => (

              <div
                className="transport-fees-term-item"
                key={index}
              >

                <div className="transport-fees-check-icon">

                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                    />

                    <path
                      d="M7 12.5l3.2 3L17 8.5"
                    />
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

      <section className="transport-fees-contact-section">

        <div className="transport-fees-contact-card">

          <span>
            PLAN YOUR NEXT JOURNEY
          </span>

          <h2>
            Need a vehicle for your trip?
          </h2>

          <p>
            Talk to Jagannath Explorer Travels for vehicle
            availability, travel requirements and booking assistance
            in Bhubaneswar.
          </p>

          <div className="transport-fees-contact-buttons">

            <a
              href="tel:+919668892441"
              className="transport-fees-contact-btn"
            >
              Call 9668892441
            </a>

            <a
              href="tel:+919556355446"
              className="transport-fees-contact-btn transport-fees-contact-btn-outline"
            >
              Call 9556355446
            </a>

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM DECORATION
      ===================================================== */}

      <div className="transport-fees-bottom-decoration">

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

export default TransportFees;