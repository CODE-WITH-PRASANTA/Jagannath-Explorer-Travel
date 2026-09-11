import React, { useId, useState } from "react";
import "./SuvFaq.css";

/* ---------------------------------------------------------------------------
   Business Information
--------------------------------------------------------------------------- */

const BUSINESS = {
  name: "Jagannath Explorer Travels",
  address:
    "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha - 751002",
  phones: ["9668892441", "9556355446"],
};

/* ---------------------------------------------------------------------------
   FAQ Data
--------------------------------------------------------------------------- */

const FAQS = [
  {
    q: "What types of SUVs and vehicles are available for booking?",
    a: "Jagannath Explorer Travels offers a practical range of comfortable vehicles for families, couples, groups and business travellers. Our fleet includes Maruti Suzuki Ertiga, Toyota Innova, Toyota Innova Crysta, Mahindra Scorpio-N, Toyota Fortuner and other options depending on your travel requirement. Vehicles can be arranged for local sightseeing, airport transfers, family trips and outstation journeys.",
  },
  {
    q: "Do you provide Bhubaneswar travel agency tour packages?",
    a: "Yes. We help travellers plan convenient Bhubaneswar travel agency tour packages based on their destination, number of days, group size and preferred vehicle. You can discuss your itinerary with our team and choose suitable sightseeing, transportation and outstation travel options.",
  },
  {
    q: "Why choose Jagannath Explorer Travels in Bhubaneswar?",
    a: "We focus on straightforward bookings, comfortable vehicles and dependable travel support. From local city trips to longer Odisha journeys, our aim is to make transportation simple and comfortable. This customer-focused approach is why many travellers consider us when looking for a Best Tour & Travel Agency in Bhubaneswar Odisha.",
  },
  {
    q: "Can I book a vehicle for local sightseeing in Bhubaneswar?",
    a: "Absolutely. You can book a vehicle for Bhubaneswar local sightseeing and nearby destinations. We can help arrange a suitable SUV according to your group size and travel schedule, making it easier to visit temples, cultural attractions, shopping areas and other places around the city.",
  },
  {
    q: "Do you provide outstation travel from Bhubaneswar?",
    a: "Yes. We provide vehicles for outstation trips from Bhubaneswar to destinations across Odisha and nearby states. Depending on your requirement, you can plan one-way or round-trip travel with an appropriate vehicle and transparent tariff.",
  },
  {
    q: "Do you offer airport and railway station pickup?",
    a: "Yes. Jagannath Explorer Travels provides airport and railway station transfers in Bhubaneswar. Share your pickup time, location and travel details with us, and we can help arrange a suitable vehicle for a smooth transfer.",
  },
  {
    q: "How can I book a car or SUV?",
    a: "Booking is simple. You can call us directly on 9668892441 or 9556355446 and share your travel date, pickup location, destination, number of passengers and preferred vehicle. Our team can then guide you about availability, vehicle options and applicable charges.",
  },
  {
    q: "Do you provide Tour & Travel Agency services across Odisha?",
    a: "Yes. As a Tour & Travel Agency in Bhubaneswar, Odisha, we assist with travel requirements within Bhubaneswar as well as trips to different destinations across Odisha. We can help with vehicle selection and travel planning according to your itinerary.",
  },
  {
    q: "Where can I find information about Odisha tourism packages with price?",
    a: "The price of Odisha tourism packages depends on destinations, number of days, vehicle type, travel distance, accommodation requirements and sightseeing plans. Contact Jagannath Explorer Travels with your preferred itinerary and we can help you understand the available travel and vehicle options with applicable pricing.",
  },
  {
    q: "How do I find a reliable travel agency in Bhubaneswar?",
    a: "When choosing a travel agency in Bhubaneswar, it is useful to check vehicle condition, pricing, booking terms, travel support and whether the service matches your itinerary. Jagannath Explorer Travels provides local and outstation transportation options with clear booking communication and support for different types of journeys.",
  },
];

/* ---------------------------------------------------------------------------
   Chevron Icon
--------------------------------------------------------------------------- */

const ChevronIcon = () => (
  <svg
    className="suv-faq-item__chevron"
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 7.5l5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------------------------------------------------------------------------
   FAQ Item
--------------------------------------------------------------------------- */

const FaqItem = ({ item, index, isOpen, onToggle }) => {
  const uid = useId();

  const panelId = `suv-faq-panel-${uid}`;
  const buttonId = `suv-faq-button-${uid}`;

  return (
    <article
      className={`suv-faq-item ${
        isOpen ? "suv-faq-item--open" : ""
      }`}
      style={{ "--stagger": index }}
    >
      <h2 className="suv-faq-item__heading">
        <button
          type="button"
          id={buttonId}
          className="suv-faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <span className="suv-faq-item__question">
            {item.q}
          </span>

          <span className="suv-faq-item__icon">
            <ChevronIcon />
          </span>
        </button>
      </h2>

      <div
        id={panelId}
        className="suv-faq-item__panel"
        role="region"
        aria-labelledby={buttonId}
      >
        <div className="suv-faq-item__panel-inner">
          <p className="suv-faq-item__answer">
            {item.a}
          </p>
        </div>
      </div>
    </article>
  );
};

/* ---------------------------------------------------------------------------
   Main FAQ Component
--------------------------------------------------------------------------- */

const SuvFaq = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const handleToggle = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      className="suv-faq-section"
      aria-labelledby="suv-faq-title"
    >
      <div
        className="suv-faq-section__bg"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="suv-faq-section__header">
        <span className="suv-faq-section__eyebrow">
          Travel FAQ
        </span>

        <h1
          id="suv-faq-title"
          className="suv-faq-section__title"
        >
          Best tour and travel agency in bhubaneswar
        </h1>

        <p className="suv-faq-section__subtitle">
          Have questions about SUV rentals, local sightseeing,
          outstation trips or tour planning in Bhubaneswar?
          Find useful answers below or contact{" "}
          <strong>{BUSINESS.name}</strong> for assistance
          with your journey.
        </p>

        <p className="suv-faq-section__description">
          We help travellers plan comfortable journeys with
          suitable vehicles and flexible travel options. From
          <strong>
            {" "}Bhubaneswar travel agency tour packages
          </strong>{" "}
          to local transfers and Odisha trips, our team focuses
          on simple booking and reliable travel support. If you
          are comparing a{" "}
          <strong>
            Best Travels and Tours Agency Bhubaneswar Odisha
          </strong>
          , we are here to help you plan your trip according to
          your actual travel needs.
        </p>
      </header>

      {/* Business Details */}
      <div className="suv-faq-business">
        <div className="suv-faq-business__card">
          <span
            className="suv-faq-business__icon"
            aria-hidden="true"
          >
            📍
          </span>

          <div>
            <span className="suv-faq-business__label">
              Our Office
            </span>

            <strong>{BUSINESS.name}</strong>

            <p>{BUSINESS.address}</p>
          </div>
        </div>

        <div className="suv-faq-business__card">
          <span
            className="suv-faq-business__icon"
            aria-hidden="true"
          >
            📞
          </span>

          <div>
            <span className="suv-faq-business__label">
              Booking &amp; Enquiries
            </span>

            <strong>Call us for travel assistance</strong>

            <p>
              {BUSINESS.phones[0]}
              {"  |  "}
              {BUSINESS.phones[1]}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="suv-faq-grid">
        {FAQS.map((item, index) => (
          <FaqItem
            key={item.q}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Bottom Content */}
      <div className="suv-faq-bottom">
        <h2>
          Plan Your Next Journey with Jagannath Explorer Travels
        </h2>

        <p>
          Whether you are looking for Tour &amp; Travel Agents
          in Bhubaneswar, planning an Odisha holiday or
          searching for comfortable transportation for your
          family, our team can help you choose a practical
          option. Contact us to discuss your destination,
          travel dates and vehicle requirement.
        </p>

        <div className="suv-faq-bottom__keywords">
          <span>Tour and Travels Bhubaneswar</span>
          <span>Tour &amp; Travel Agents in Bhubaneswar</span>
          <span>Tour packages &amp; Travel operators in Bhubaneswar</span>
          <span>Odisha tourism packages with price</span>
        </div>
      </div>
    </section>
  );
};

export default SuvFaq;