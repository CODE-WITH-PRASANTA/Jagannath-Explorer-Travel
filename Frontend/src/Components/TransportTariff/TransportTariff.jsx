import React from "react";
import "./TransportTariff.css";

const tariffData = [
  {
    vehicle: "Swift Dzire / Aura / Xcent",
    hrs10: "2,500",
    hrs8: "2,200",
    hrs4: "1,600",
    extraHr: "120",
    extraKm: "13",
  },
  {
    vehicle: "Ertiga",
    hrs10: "3,500",
    hrs8: "3,000",
    hrs4: "2,500",
    extraHr: "150",
    extraKm: "15",
  },
  {
    vehicle: "Toyota Innova",
    hrs10: "4,000",
    hrs8: "3,000",
    hrs4: "2,800",
    extraHr: "180",
    extraKm: "17",
  },
  {
    vehicle: "Toyota Innova Crysta",
    hrs10: "4,500",
    hrs8: "4,000",
    hrs4: "3,500",
    extraHr: "200",
    extraKm: "20",
  },
  {
    vehicle: "Honda City / Verna",
    hrs10: "5,000",
    hrs8: "4,500",
    hrs4: "4,000",
    extraHr: "200",
    extraKm: "18",
  },
  {
    vehicle: "13 Seater Traveller",
    hrs10: "5,000",
    hrs8: "4,500",
    hrs4: "4,000",
    extraHr: "220",
    extraKm: "28",
  },
  {
    vehicle: "17 Seater Traveller",
    hrs10: "5,500",
    hrs8: "5,000",
    hrs4: "4,500",
    extraHr: "250",
    extraKm: "30",
  },
  {
    vehicle: "25 Seater Traveller",
    hrs10: "7,500",
    hrs8: "7,000",
    hrs4: "6,500",
    extraHr: "350",
    extraKm: "45",
  },
  {
    vehicle: "10 Seater Urbania",
    hrs10: "11,000",
    hrs8: "10,000",
    hrs4: "—",
    extraHr: "500",
    extraKm: "50",
  },
  {
    vehicle: "12 Seater Urbania",
    hrs10: "12,000",
    hrs8: "11,000",
    hrs4: "—",
    extraHr: "500",
    extraKm: "60",
  },
  {
    vehicle: "17 Seater Urbania",
    hrs10: "13,000",
    hrs8: "12,000",
    hrs4: "—",
    extraHr: "500",
    extraKm: "65",
  },
  {
    vehicle: "13 SML Coach A/C",
    hrs10: "9,000",
    hrs8: "8,000",
    hrs4: "7,500",
    extraHr: "500",
    extraKm: "45",
  },
  {
    vehicle: "19 SML Coach A/C",
    hrs10: "11,000",
    hrs8: "10,000",
    hrs4: "9,000",
    extraHr: "600",
    extraKm: "55",
  },
  {
    vehicle: "22 SML Coach A/C",
    hrs10: "14,000",
    hrs8: "13,000",
    hrs4: "12,000",
    extraHr: "700",
    extraKm: "55",
  },
  {
    vehicle: "28 SML Coach A/C",
    hrs10: "18,000",
    hrs8: "17,000",
    hrs4: "16,000",
    extraHr: "800",
    extraKm: "60",
  },
  {
    vehicle: "36 SML Coach A/C",
    hrs10: "20,000",
    hrs8: "18,000",
    hrs4: "17,000",
    extraHr: "1,000",
    extraKm: "65",
  },
];

const termsData = [
  "Toll Tax, Interstate Tax and Parking charges are applicable on actual basis.",
  "Kilometres and hours are calculated from Garage to Garage.",
  "Night Halt Charges from 10 PM to 6 AM: Light Vehicle – ₹350, Traveller – ₹500, Coach – ₹1,000.",
  "Driver Allowance for outstation trips: Light Vehicle – ₹350, Tempo – ₹500, Coach – ₹1,000.",
  "A vehicle covering below 300 km in a day will be billed as per the applicable local tariff.",
  "For outstation duty, a minimum of 300 km is charged per day.",
  "Standing AC charges are applicable where required.",
  "If a booking is cancelled within 24 hours of the scheduled time, 20% of the total billing will be charged.",
  "While travelling on Ghat roads, Air-Conditioning may remain switched off for safety and vehicle performance.",
  "All disputes are subject to Bhubaneswar legal jurisdiction only.",
  <>
    For <strong>Urbania Tempo Traveller in Bhubaneswar</strong>, toll tax,
    interstate tax and parking charges are charged separately as per actual
    cost.
  </>,
];

const TransportTariff = () => {
  return (
    <main className="TransportTariff">
      <div className="TransportTariff-container">

        {/* =====================================================
            SEO HEADER
        ===================================================== */}
        <header className="TransportTariff-header">
          <span className="TransportTariff-tagline">
            Jagannath Explorer Travels • Bhubaneswar, Odisha
          </span>

          <h1 className="TransportTariff-title">
            Best tour and travel agency in bhubaneswar
          </h1>

          <p className="TransportTariff-intro">
            Plan your local sightseeing, family trip, business journey or
            outstation tour with <strong>Jagannath Explorer Travels</strong>.
            As a trusted <strong>Best Tour &amp; Travel Agency in Bhubaneswar
            Odisha</strong>, we provide practical vehicle options and clear
            transport tariffs for individuals, families and groups travelling
            across Bhubaneswar and Odisha.
          </p>

          <p className="TransportTariff-intro TransportTariff-introSecondary">
            If you are comparing an{" "}
            <strong>odisha tourism packages with price</strong>, the final
            package cost can vary according to the destination, number of
            travelling days, vehicle type and group size. The vehicle rates
            below give you a clear starting point for planning your journey.
          </p>

          <div className="TransportTariff-titleLine">
            <span></span>
            <i>◆</i>
            <span></span>
          </div>
        </header>

        {/* =====================================================
            BUSINESS INFORMATION
        ===================================================== */}
        <section
          className="TransportTariff-businessInfo"
          aria-label="Jagannath Explorer Travels contact information"
        >
          <div className="TransportTariff-businessContent">
            <span className="TransportTariff-businessLabel">
              Tour &amp; Travel Agency in Bhubaneswar, Odisha
            </span>

            <h2>Jagannath Explorer Travels</h2>

            <p>
              Comfortable cars, tempo travellers and coaches for local and
              outstation travel from Bhubaneswar.
            </p>

            <address>
              Plot No - 001, Mahaveer Nagar, Road No. - 18,
              <br />
              Samantray Pur, Bhubaneswar, Odisha, Pin - 751002
            </address>
          </div>

          <div className="TransportTariff-contact">
            <span>For Booking &amp; Enquiry</span>

            <div className="TransportTariff-phoneList">
              <a href="tel:9668892441" aria-label="Call 9668892441">
                9668892441
              </a>

              <a href="tel:9556355446" aria-label="Call 9556355446">
                9556355446
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT INTRO
        ===================================================== */}
        <section className="TransportTariff-contentIntro">
          <div className="TransportTariff-contentIntroBadge">
            Travel Made Simple
          </div>

          
        
          <p>
            Jagannath Explorer Travels works as a{" "}
            <strong>Tour &amp; Travel Agency in Bhubaneswar, Odisha</strong>
            for local sightseeing, airport transfers, railway station
            transfers, family holidays, corporate travel, pilgrimage trips
            and outstation journeys. Contact our team for the latest
            availability and a trip estimate based on your route and travel
            dates.
          </p>
        </section>

        {/* =====================================================
            TARIFF CARD
        ===================================================== */}
        <section
          className="TransportTariff-card"
          aria-labelledby="transport-tariff-heading"
        >
          <div className="TransportTariff-cardHeader">
            <div>
              <span>Vehicle Rental Rates</span>
              <h2 id="transport-tariff-heading">
                Local &amp; Outstation Transport Tariff
              </h2>
            </div>

            <div className="TransportTariff-cardNote">
              300 Km Per Day
            </div>
          </div>

          <div className="TransportTariff-banner">
            FOR LOCAL &amp; OUTSTATION (300 Km Per Day)
          </div>

          {/* Desktop / Tablet Table */}
          <div className="TransportTariff-tableResponsive">
            <table className="TransportTariff-table">
              <caption>
                Vehicle rental tariff for local and outstation travel from
                Bhubaneswar
              </caption>

              <thead>
                <tr>
                  <th className="TransportTariff-colVehicle">
                    Vehicle A/C
                  </th>
                  <th>10 Hrs./100 Km (Rs.)</th>
                  <th>8 Hrs./80 Km (Rs.)</th>
                  <th>4 Hrs./40 Km (Rs.)</th>
                  <th>Extra Hrs. (Rs.)</th>
                  <th>Extra Km (Rs.)</th>
                </tr>
              </thead>

              <tbody>
                {tariffData.map((row, index) => (
                  <tr
                    key={`${row.vehicle}-${index}`}
                    className="TransportTariff-row"
                  >
                    <td className="TransportTariff-cellVehicle">
                      {row.vehicle}
                    </td>

                    <td className="TransportTariff-cell">
                      ₹{row.hrs10}
                    </td>

                    <td className="TransportTariff-cell">
                      ₹{row.hrs8}
                    </td>

                    <td
                      className={`TransportTariff-cell ${
                        row.hrs4 === "—"
                          ? "TransportTariff-notAvailable"
                          : ""
                      }`}
                    >
                      {row.hrs4 === "—" ? "—" : `₹${row.hrs4}`}
                    </td>

                    <td className="TransportTariff-cell">
                      ₹{row.extraHr}
                    </td>

                    <td className="TransportTariff-cell">
                      ₹{row.extraKm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="TransportTariff-mobileList">
            {tariffData.map((row, index) => (
              <article
                className="TransportTariff-mobileCard"
                key={`mobile-${row.vehicle}-${index}`}
              >
                <div className="TransportTariff-mobileHeader">
                  <span>Vehicle A/C</span>
                  <h3>{row.vehicle}</h3>
                </div>

                <div className="TransportTariff-mobilePrices">
                  <div>
                    <span>10 Hrs / 100 Km</span>
                    <strong>₹{row.hrs10}</strong>
                  </div>

                  <div>
                    <span>8 Hrs / 80 Km</span>
                    <strong>₹{row.hrs8}</strong>
                  </div>

                  <div>
                    <span>4 Hrs / 40 Km</span>
                    <strong>
                      {row.hrs4 === "—" ? "—" : `₹${row.hrs4}`}
                    </strong>
                  </div>

                  <div>
                    <span>Extra Hours</span>
                    <strong>₹{row.extraHr}</strong>
                  </div>

                  <div>
                    <span>Extra Km</span>
                    <strong>₹{row.extraKm}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================
            TOUR PACKAGE CONTENT
        ===================================================== */}
        <section className="TransportTariff-packageSection">
          <div className="TransportTariff-packageBadge">
            Odisha Travel Planning
          </div>

          <h2>Odisha Tourism Packages with Price</h2>

          <p>
            Looking for <strong>odisha tourism packages with price</strong>?
            We can help you plan a trip around your preferred destinations,
            travel dates and group size. Package pricing is not one fixed
            amount because every journey is different. The total cost depends
            on the vehicle selected, number of days, travel distance,
            sightseeing route and other applicable charges.
          </p>

          <p>
            From Bhubaneswar and Puri to Konark, Chilika, Cuttack and other
            popular Odisha destinations, you can discuss your route with our
            team and choose a vehicle that suits your travel plans and
            budget.
          </p>

          <div className="TransportTariff-packageActions">
            <a href="tel:9668892441">
              Call 9668892441
            </a>

            <a href="tel:9556355446">
              Call 9556355446
            </a>
          </div>
        </section>

        {/* =====================================================
            TERMS & CONDITIONS
        ===================================================== */}
        <section className="TransportTariff-termsSection">
          <div className="TransportTariff-termsHeader">
            <span>Before You Book</span>
            <h2>Terms &amp; Conditions</h2>
            <p>
              Please review the following conditions before confirming your
              vehicle booking.
            </p>
          </div>

          <ul className="TransportTariff-termsList">
            {termsData.map((term, index) => (
              <li
                key={`term-${index}`}
                className="TransportTariff-termsItem"
              >
                <span
                  className="TransportTariff-checkIcon"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>

                <span className="TransportTariff-termsText">
                  {term}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}
        <section className="TransportTariff-cta">
          <div>
            <span>Plan Your Next Journey</span>

            <h2>
              Need a Vehicle for Your Odisha Trip?
            </h2>

            <p>
              Tell us your destination, travel dates and group size. Our team
              can help you select a suitable car, Traveller, Urbania or coach
              for your journey.
            </p>
          </div>

          <div className="TransportTariff-ctaButtons">
            <a href="tel:9668892441">
              9668892441
            </a>

            <a href="tel:9556355446">
              9556355446
            </a>
          </div>
        </section>

      </div>
    </main>
  );
};

export default TransportTariff;