import React from "react";
import "./TransportFees.css";

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
  "Toll Tax, Interstate Tax and Parking charges on actual basis.",
  "Kms and Hours will be calculated from the Garage to Garage.",
  "Night Halt Charges from 10 PM - 6 AM (Light Vehicle - Rs.350, Traveller - Rs.500, Coach - Rs.1000).",
  "Driver Allowance Applicable for Outstation Trip (Light Vehicle - Rs.350, Tempo - Rs.500, Coach - Rs.1000).",
  "A vehicle covering below 300kms in a day shall be billed as per Local Tariff.",
  "For Outstation Duty - Minimum 300 km's charged per Day.",
  "Standing AC is Chargeable.",
  "If a booking is canceled before 24 hrs of the scheduled time then 20% of the total billing will be charged.",
  "While driving on Ghat roads, Air-Conditioning shall remain switched off.",
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
    label: "10 Hrs./100 Km (Rs.)",
  },
  {
    key: "eightHrs",
    label: "8 Hrs./80 Km (Rs.)",
  },
  {
    key: "fourHrs",
    label: "4 Hrs./40 Km (Rs.)",
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
          HERO / TITLE SECTION (Matched with Luxury Wedding Header Style)
      ===================================================== */}

      <section className="transport-fees-header">
        <div className="transport-fees-header-glow"></div>

        <span className="transport-fees-subtitle">
          ✦ RATES &amp; CHARGES ✦
        </span>

        <h1 className="transport-fees-title">
          Transport <br />
          <span>Tariff</span>
        </h1>

        <div className="transport-fees-title-line">
          <span></span>
          <i>❦</i>
          <span></span>
        </div>
      </section>

      {/* =====================================================
          TARIFF SECTION
      ===================================================== */}

      <section className="transport-fees-tariff-section">

        <div className="transport-fees-tariff-wrapper">

          {/* Luxury Banner */}
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

                    <h3>{item.vehicle}</h3>
                  </div>

                  {item.featured && (
                    <span className="transport-fees-mobile-badge">
                      Popular
                    </span>
                  )}

                </div>

                <div className="transport-fees-mobile-price-grid">

                  <div className="transport-fees-mobile-price">
                    <span>10 Hrs. / 100 Km</span>
                    <strong>₹{item.tenHrs}</strong>
                  </div>

                  <div className="transport-fees-mobile-price">
                    <span>8 Hrs. / 80 Km</span>
                    <strong>₹{item.eightHrs}</strong>
                  </div>

                  <div className="transport-fees-mobile-price">
                    <span>4 Hrs. / 40 Km</span>
                    <strong>
                      {item.fourHrs === "—"
                        ? "—"
                        : `₹${item.fourHrs}`}
                    </strong>
                  </div>

                  <div className="transport-fees-mobile-price">
                    <span>Extra Hours</span>
                    <strong>₹{item.extraHrs}</strong>
                  </div>

                  <div className="transport-fees-mobile-price">
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
                    <path d="M7 12.5l3.2 3L17 8.5" />
                  </svg>
                </div>

                <p>{term}</p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM DECORATIVE SECTION
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