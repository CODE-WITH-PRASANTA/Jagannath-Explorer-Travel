import React from "react";
import "./SmlTransport.css";

/* =========================================================
   SML TRANSPORT TARIFF DATA (Full Fleet Dataset)
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
  "Toll Tax, Interstate Tax and Parking charges on actual basis.",
  "Kms and Hours will be calculated from the Garage to Garage.",
  "Night Halt Charges from 10 PM - 6 AM (Light Vehicle- Rs.350, Traveller - Rs.500, Coach - Rs.1000).",
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

const smlTableHeaders = [
  { key: "vehicle", label: "Vehicle A/C" },
  { key: "tenHrs", label: "10 Hrs./100 Km (Rs.)" },
  { key: "eightHrs", label: "8 Hrs./80 Km (Rs.)" },
  { key: "fourHrs", label: "4 Hrs./40 Km (Rs.)" },
  { key: "extraHrs", label: "Extra Hrs. (Rs.)" },
  { key: "extraKm", label: "Extra Km (Rs.)" },
];

/* =========================================================
   COMPONENT
========================================================= */

const SmlTransport = () => {
  return (
    <main className="smltransport-page">

      {/* =====================================================
          HERO / TITLE SECTION
      ===================================================== */}
      <section className="smltransport-header">
        <span className="smltransport-subtitle">Rates &amp; Charges</span>
        <h1 className="smltransport-title">Transport Tariff</h1>
        <div className="smltransport-title-line">
          <span></span>
          <i>◆</i>
          <span></span>
        </div>
      </section>

      {/* =====================================================
          TARIFF SECTION
      ===================================================== */}
      <section className="smltransport-tariff-section">
        <div className="smltransport-tariff-wrapper">

          {/* Banner */}
          <div className="smltransport-tariff-banner">
            <span className="smltransport-banner-text">
              FOR LOCAL &amp; OUTSTATION (300 Km Per Day)
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
                    <th key={header.key} className={`smltransport-th smltransport-th-${header.key}`}>
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SML_TARIFFS.map((item, index) => (
                  <tr key={`${item.vehicle}-${index}`} className={item.featured ? "smltransport-featured-row" : ""}>
                    <td className="smltransport-vehicle-cell">
                      <span className="smltransport-vehicle-name">{item.vehicle}</span>
                      {item.featured && <span className="smltransport-popular-badge">Popular</span>}
                    </td>
                    <td>{item.tenHrs}</td>
                    <td>{item.eightHrs}</td>
                    <td className={item.fourHrs === "—" ? "smltransport-na" : ""}>{item.fourHrs}</td>
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
          <div className="smltransport-mobile-list">
            {SML_TARIFFS.map((item, index) => (
              <article key={`mobile-${item.vehicle}-${index}`} className={`smltransport-mobile-card ${item.featured ? "smltransport-mobile-card-featured" : ""}`}>
                <div className="smltransport-mobile-card-head">
                  <div className="smltransport-mobile-vehicle">
                    <span className="smltransport-mobile-vehicle-label">Vehicle A/C</span>
                    <h3>{item.vehicle}</h3>
                  </div>
                  {item.featured && <span className="smltransport-mobile-badge">Popular</span>}
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
                    <strong>{item.fourHrs === "—" ? "—" : `₹${item.fourHrs}`}</strong>
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
          TERMS & CONDITIONS
      ===================================================== */}
      <section className="smltransport-terms-section">
        <div className="smltransport-terms-wrapper">
          <div className="smltransport-terms-heading-area">
            <h2 className="smltransport-terms-title">Terms &amp; Conditions</h2>
            <div className="smltransport-terms-line"></div>
          </div>

          <div className="smltransport-terms-list">
            {SML_TERMS.map((term, index) => (
              <div className="smltransport-term-item" key={index}>
                <div className="smltransport-check-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
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