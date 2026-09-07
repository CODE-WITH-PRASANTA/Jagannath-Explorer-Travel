import React from "react";
import "./SmlTransport.css";

/* =========================================================
   SML TRANSPORT TARIFF DATA
========================================================= */

const SML_TARIFFS = [
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

const SML_TERMS = [
  "Toll Tax, Interstate Tax and Parking charges will be charged on an actual basis.",
  "Kilometres and hours will be calculated from garage to garage.",
  "Night halt charges from 10 PM to 6 AM: Light Vehicle – ₹350, Traveller – ₹500 and Coach – ₹1,000.",
  "Driver allowance is applicable for outstation trips: Light Vehicle – ₹350, Tempo/Traveller – ₹500 and Coach – ₹1,000.",
  "A vehicle covering less than 300 km in a day will be billed according to the applicable local tariff.",
  "For outstation duty, a minimum of 300 km will be charged per day.",
  "Standing AC usage is chargeable.",
  "For cancellations made less than 24 hours before the scheduled booking time, 20% of the total billing will be charged.",
  "While travelling through Ghat roads, the air-conditioning may be switched off for safety and vehicle performance.",
  "All disputes are subject to Bhubaneswar legal jurisdiction only.",
];

/* =========================================================
   TABLE HEADERS
========================================================= */

const smlTableHeaders = [
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

const SmlTransport = () => {
  return (
    <main className="smltransport-page">

      {/* =====================================================
          SEO HERO SECTION
      ===================================================== */}

      <section className="smltransport-header">

        <span className="smltransport-subtitle">
          Odisha Travel, Tours &amp; Transport
        </span>

        <h1 className="smltransport-title">
          Best Tour &amp; Travel Agency in Bhubaneswar
        </h1>

        <div className="smltransport-title-line">
          <span></span>
          <i>◆</i>
          <span></span>
        </div>

        <div className="smltransport-intro">
          <p>
            Looking for a reliable travel partner for your next journey?
            We provide comfortable vehicles and flexible travel solutions
            for local sightseeing, family trips, corporate travel,
            weddings, airport transfers and outstation tours from
            Bhubaneswar.
          </p>

        
        </div>

      </section>

      {/* =====================================================
          TRAVEL SERVICES SEO CONTENT
      ===================================================== */}

      <section className="smltransport-seo-section">

        <div className="smltransport-seo-wrapper">

          <div className="smltransport-seo-content">

            <span className="smltransport-section-label">
              Explore Odisha With Comfort
            </span>

       

          </div>

          <div className="smltransport-seo-highlights">

            <div className="smltransport-highlight-card">
              <span className="smltransport-highlight-number">01</span>
              <h3>Local Sightseeing</h3>
              <p>
                Comfortable vehicles for sightseeing around Bhubaneswar
                and nearby destinations.
              </p>
            </div>

            <div className="smltransport-highlight-card">
              <span className="smltransport-highlight-number">02</span>
              <h3>Outstation Tours</h3>
              <p>
                Convenient transportation for multi-day Odisha and
                outstation journeys.
              </p>
            </div>

            <div className="smltransport-highlight-card">
              <span className="smltransport-highlight-number">03</span>
              <h3>Group Travel</h3>
              <p>
                Traveller, Urbania and coach options for families,
                groups and corporate tours.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          TARIFF SECTION
      ===================================================== */}

      <section className="smltransport-tariff-section">

        <div className="smltransport-tariff-wrapper">

          <div className="smltransport-tariff-heading">

            <span className="smltransport-section-label">
              Rates &amp; Charges
            </span>

            <h2>Transport Tariff</h2>

            <p>
              Choose the vehicle that best suits your travel requirements.
              Our tariff covers local and outstation travel options with
              different seating capacities.
            </p>

          </div>

          {/* Banner */}

          <div className="smltransport-tariff-banner">

            <span className="smltransport-banner-text">
              FOR LOCAL &amp; OUTSTATION — 300 KM PER DAY
            </span>

          </div>

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="smltransport-table-container">

            <table className="smltransport-table">

              <thead>
                <tr>
                  {smlTableHeaders.map((header) => (
                    <th
                      key={header.key}
                      className={`smltransport-th smltransport-th-${header.key}`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>

                {SML_TARIFFS.map((item, index) => (

                  <tr
                    key={`${item.vehicle}-${index}`}
                    className={
                      item.featured
                        ? "smltransport-featured-row"
                        : ""
                    }
                  >

                    <td className="smltransport-vehicle-cell">

                      <span className="smltransport-vehicle-name">
                        {item.vehicle}
                      </span>

                      {item.featured && (
                        <span className="smltransport-popular-badge">
                          Popular
                        </span>
                      )}

                    </td>

                    <td>₹{item.tenHrs}</td>

                    <td>₹{item.eightHrs}</td>

                    <td
                      className={
                        item.fourHrs === "—"
                          ? "smltransport-na"
                          : ""
                      }
                    >
                      {item.fourHrs === "—"
                        ? "—"
                        : `₹${item.fourHrs}`}
                    </td>

                    <td>₹{item.extraHrs}</td>

                    <td>₹{item.extraKm}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* =================================================
              MOBILE CARDS
          ================================================= */}

          <div className="smltransport-mobile-list">

            {SML_TARIFFS.map((item, index) => (

              <article
                key={`mobile-${item.vehicle}-${index}`}
                className={`smltransport-mobile-card ${
                  item.featured
                    ? "smltransport-mobile-card-featured"
                    : ""
                }`}
              >

                <div className="smltransport-mobile-card-head">

                  <div className="smltransport-mobile-vehicle">

                    <span className="smltransport-mobile-vehicle-label">
                      Vehicle A/C
                    </span>

                    <h3>{item.vehicle}</h3>

                  </div>

                  {item.featured && (
                    <span className="smltransport-mobile-badge">
                      Popular
                    </span>
                  )}

                </div>

                <div className="smltransport-mobile-price-grid">

                  <div className="smltransport-mobile-price">
                    <span>10 Hrs. / 100 Km</span>
                    <strong>₹{item.tenHrs}</strong>
                  </div>

                  <div className="smltransport-mobile-price">
                    <span>8 Hrs. / 80 Km</span>
                    <strong>₹{item.eightHrs}</strong>
                  </div>

                  <div className="smltransport-mobile-price">
                    <span>4 Hrs. / 40 Km</span>
                    <strong>
                      {item.fourHrs === "—"
                        ? "—"
                        : `₹${item.fourHrs}`}
                    </strong>
                  </div>

                  <div className="smltransport-mobile-price">
                    <span>Extra Hours</span>
                    <strong>₹{item.extraHrs}</strong>
                  </div>

                  <div className="smltransport-mobile-price">
                    <span>Extra Km</span>
                    <strong>₹{item.extraKm}</strong>
                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          ODISHA TOURISM SEO CONTENT
      ===================================================== */}

      <section className="smltransport-tourism-section">

        <div className="smltransport-tourism-wrapper">

          <div className="smltransport-tourism-heading">

            <span className="smltransport-section-label">
              Discover Odisha
            </span>

            <h2>
              Odisha Tourism Packages With Price
            </h2>

            <p>
              Explore the cultural, spiritual and natural beauty of Odisha
              with thoughtfully planned tour options from Bhubaneswar.
            </p>

          </div>

          <div className="smltransport-tourism-grid">

            <div className="smltransport-tourism-card">

              <h3>Bhubaneswar – Puri – Konark Tour</h3>

              <p>
                A popular Odisha circuit covering the temples and
                heritage attractions of Bhubaneswar, the spiritual city
                of Puri and the famous Sun Temple at Konark.
              </p>

              <span>
                Ideal for family and weekend trips
              </span>

            </div>

            <div className="smltransport-tourism-card">

              <h3>Chilika Lake Tour</h3>

              <p>
                Enjoy a relaxing journey towards Chilika and explore
                one of Odisha's most popular natural attractions.
                It is a great choice for families and groups.
              </p>

              <span>
                Flexible vehicle options available
              </span>

            </div>

            <div className="smltransport-tourism-card">

              <h3>Odisha Temple Tour</h3>

              <p>
                Plan a comfortable temple journey covering important
                religious destinations across Odisha with transportation
                arranged according to your itinerary.
              </p>

              <span>
                Suitable for families and groups
              </span>

            </div>

          </div>

          <div className="smltransport-price-note">

            <h3>Planning Your Odisha Tour?</h3>

            <p>
              Tour prices can vary depending on the vehicle, number of
              travellers, duration, destinations and itinerary. Contact
              our travel team for a suitable vehicle and a customised
              quotation for your Odisha tour.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="smltransport-why-section">

        <div className="smltransport-why-wrapper">

          <div className="smltransport-why-heading">

            <span className="smltransport-section-label">
              Travel With Confidence
            </span>

            <h2>
              Why Choose Our Tour &amp; Travel Services?
            </h2>

          </div>

          <div className="smltransport-why-grid">

            <div className="smltransport-why-item">
              <strong>Comfortable Vehicles</strong>
              <p>
                Choose from sedans, SUVs, Travellers, Urbania and
                SML coaches according to your group size.
              </p>
            </div>

            <div className="smltransport-why-item">
              <strong>Experienced Drivers</strong>
              <p>
                Experienced drivers help make your local and outstation
                journey comfortable and convenient.
              </p>
            </div>

            <div className="smltransport-why-item">
              <strong>Flexible Travel Plans</strong>
              <p>
                Plan sightseeing, family trips, group tours and
                outstation journeys around your preferred itinerary.
              </p>
            </div>

            <div className="smltransport-why-item">
              <strong>Transparent Tariff</strong>
              <p>
                View the applicable vehicle rates before planning your
                journey and select an option that fits your requirements.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          TERMS & CONDITIONS
      ===================================================== */}

      <section className="smltransport-terms-section">

        <div className="smltransport-terms-wrapper">

          <div className="smltransport-terms-heading-area">

            <span className="smltransport-section-label">
              Important Information
            </span>

            <h2 className="smltransport-terms-title">
              Terms &amp; Conditions
            </h2>

            <div className="smltransport-terms-line"></div>

          </div>

          <div className="smltransport-terms-list">

            {SML_TERMS.map((term, index) => (

              <div
                className="smltransport-term-item"
                key={index}
              >

                <div className="smltransport-check-icon">

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

                <p>{term}</p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
};

export default SmlTransport;