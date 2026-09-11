import React, { useState } from "react";
import "./Frequently.css";

const faqData = [
  {
    id: 1,
    question: "Are family tour packages available in Bhubaneswar?",
    answer:
      "Yes. Jagannath Explorer Travels offers comfortable travel options for families, couples and groups. You can choose a suitable car, tempo traveller or larger vehicle depending on your group size, destination and travel plans."
  },
  {
    id: 2,
    question: "Where can I get cab service in Bhubaneswar?",
    answer:
      "You can book a cab from Jagannath Explorer Travels for local travel, airport transfers, railway station pickups, sightseeing and outstation journeys. You can also contact our team directly to discuss your pickup location and travel requirements."
  },
  {
    id: 3,
    question: "Do you provide outstation travel services from Bhubaneswar?",
    answer:
      "Yes. We provide one-way and round-trip vehicle services from Bhubaneswar to popular destinations across Odisha. Our vehicles are suitable for family trips, business travel, sightseeing and pilgrimage journeys."
  },
  {
    id: 4,
    question: "Is Urbania Tempo Traveller available for full-day booking?",
    answer:
      "Yes. Force Urbania tempo travellers are available for full-day bookings, family tours, weddings, corporate outings, group sightseeing and longer journeys. Different seating options are available according to the size of your group."
  },
  {
    id: 5,
    question: "How is the travel and vehicle pricing calculated?",
    answer:
      "Pricing generally depends on the vehicle selected, travelling hours, kilometres, trip duration, destination and group size. We keep the pricing straightforward so you can understand the estimated travel cost before confirming your booking."
  },
  {
    id: 6,
    question: "How can I book a tempo traveller in Bhubaneswar?",
    answer:
      "Booking is simple. Share your travel date, destination, pickup point and number of passengers with our team. We can then suggest a suitable tempo traveller and provide the available options for your journey."
  },
  {
    id: 7,
    question: "Are the drivers experienced?",
    answer:
      "Our drivers are selected for their driving experience and knowledge of local and outstation routes. They are expected to follow responsible driving practices and maintain a professional approach throughout the journey."
  },
  {
    id: 8,
    question: "Is Force Van available for group travel?",
    answer:
      "Yes. Force vehicles and tempo travellers are available for group tours, family holidays, pilgrimages, sightseeing and other occasions. The right vehicle can be selected based on the number of passengers and luggage requirements."
  },
  {
    id: 9,
    question: "What makes Jagannath Explorer Travels useful for travellers?",
    answer:
      "We focus on making travel simple from booking to the end of the journey. Customers can choose from different vehicle categories, discuss their route with our team and plan local or outstation travel according to their requirements."
  },
  {
    id: 10,
    question: "Can I book a taxi for full-day use in Bhubaneswar?",
    answer:
      "Yes. Full-day taxi rentals are available for local sightseeing, meetings, business travel, shopping and personal trips. Vehicle options can be selected according to the required hours, kilometres and number of passengers."
  }
];

const Frequently = () => {
  const [openIds, setOpenIds] = useState([1]);

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const leftColumn = faqData.filter((_, index) => index % 2 === 0);
  const rightColumn = faqData.filter((_, index) => index % 2 !== 0);

  const renderFaqItem = (item) => {
    const isOpen = openIds.includes(item.id);

    return (
      <article
        key={item.id}
        className={`faq-card ${isOpen ? "open" : ""}`}
      >
        <button
          type="button"
          className="faq-question-btn"
          onClick={() => toggleAccordion(item.id)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${item.id}`}
        >
          <span className="faq-question-text">
            {item.question}
          </span>

          <span className="faq-chevron-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        <div
          id={`faq-answer-${item.id}`}
          className="faq-answer-wrapper"
          aria-hidden={!isOpen}
        >
          <div className="faq-answer-content">
            <p>{item.answer}</p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section className="faq-section">
      <div className="faq-container">

        {/* FAQ Header */}
        <header className="faq-header">
          <span className="faq-pill-label">
            Travel FAQ
          </span>

          <h1 className="faq-main-title">
            Best tour and travel agency in bhubaneswar
          </h1>

          <p className="faq-subtitle">
            Find answers about cab services, tempo travellers, family
            tours, outstation trips and Odisha travel bookings with
            Jagannath Explorer Travels.
          </p>
        </header>

        {/* SEO Introduction */}
        <div className="faq-intro-content">
          <h2>
            Best Tour &amp; Travel Agency in Bhubaneswar Odisha
          </h2>

          <p>
            Planning a trip from Bhubaneswar becomes easier when your
            transportation is comfortable, reliable and suited to your
            group. Jagannath Explorer Travels provides cars, cabs,
            tempo travellers and larger vehicles for local sightseeing,
            family holidays, business travel, weddings, pilgrimages and
            outstation journeys.
          </p>

          <p>
            As a{" "}
            <strong>
              Tour &amp; Travel Agency in Bhubaneswar, Odisha
            </strong>
            , we help travellers choose a vehicle according to their
            destination, number of passengers and travel duration.
            Whether you need a cab for a local trip or a spacious
            traveller for a family tour, our team can help you plan the
            journey.
          </p>

          <p>
            If you are searching for{" "}
            <strong>odisha tourism packages with price</strong>, the
            final cost can vary depending on the destination, number of
            days, vehicle type, sightseeing plan and group size. You
            can contact us with your travel details to discuss a suitable
            option for your Odisha trip.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="faq-grid">
          <div className="faq-column">
            {leftColumn.map(renderFaqItem)}
          </div>

          <div className="faq-column">
            {rightColumn.map(renderFaqItem)}
          </div>
        </div>

        {/* Bottom SEO Content */}
        <div className="faq-bottom-content">
          <span className="faq-bottom-label">
            Plan Your Odisha Journey
          </span>

          <h2>
            Travel Comfortably Across Bhubaneswar &amp; Odisha
          </h2>

          <p>
            From short city transfers to multi-day Odisha tours,
            Jagannath Explorer Travels offers practical vehicle choices
            for different types of travellers. You can plan trips to
            destinations such as Puri, Konark, Chilika, Cuttack and
            other popular places in Odisha with a vehicle that matches
            your group size and itinerary.
          </p>

          <p>
            For booking enquiries, vehicle availability or information
            about tour packages, speak with our travel team and share
            your destination, travel date and passenger count.
          </p>

          <div className="faq-contact-buttons">
            <a href="tel:9668892441">
              Call 9668892441
            </a>

            <a href="tel:9556355446">
              Call 9556355446
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Frequently;