import React, { useId, useState } from "react";
import "./SedanFaq.css";

/* ---------------------------------------------------------------------------
   FAQ Data
--------------------------------------------------------------------------- */

const FAQS = [
  {
    q: "Why choose Jagannath Explorer Travels as the best tour and travel agency in Bhubaneswar?",
    a: "Jagannath Explorer Travels provides comfortable cars, reliable drivers, local sightseeing, airport and railway transfers, and customized travel plans from Bhubaneswar. We focus on transparent service, comfortable journeys, and helping travelers explore Odisha with ease.",
  },
  {
    q: "What bhubaneswar travel agency tour packages do you offer?",
    a: "We offer flexible tour packages covering Bhubaneswar, Puri, Konark, Chilika, Cuttack, Dhenkanal and other popular destinations in Odisha. Packages can be customized according to your travel dates, group size, sightseeing plans, and vehicle requirements.",
  },
  {
    q: "Do you provide Odisha tourism packages with price options?",
    a: "Yes. We provide Odisha tourism packages with price options based on the destination, number of travelers, duration, vehicle type, accommodation requirements, and sightseeing plan. Contact our team with your travel details and we can suggest a suitable package.",
  },
  {
    q: "Are you a Best Tour & Travel Agency in Bhubaneswar Odisha for family trips?",
    a: "Yes. Our travel services are suitable for families, couples, friends, corporate groups, and larger tour groups. We can arrange comfortable vehicles and customized sightseeing plans so you can enjoy your Odisha trip without unnecessary travel stress.",
  },
  {
    q: "What services does a Tour & Travel Agency in Bhubaneswar, Odisha provide?",
    a: "Our services include local car rental, outstation cab booking, airport pickup and drop, railway station transfers, Odisha sightseeing, family tours, corporate travel, one-way journeys, round trips, and customized tour packages.",
  },
  {
    q: "Can I book Tour packages & Travel operators in Bhubaneswar for an Odisha trip?",
    a: "Absolutely. We help travelers plan complete Odisha journeys from Bhubaneswar. Depending on your itinerary, we can arrange transportation, sightseeing routes, suitable vehicles, and customized travel plans for short trips as well as multi-day tours.",
  },
  {
    q: "What vehicles are available for Tour and Travels Bhubaneswar bookings?",
    a: "Our vehicle options include comfortable sedans such as Swift Dzire, Hyundai Aura, Xcent, Honda City and Verna, along with SUVs and larger vehicles such as Ertiga, Toyota Innova Crysta and Tempo Travellers for group travel.",
  },
  {
    q: "Can I contact Tour & Travel Agents in Bhubaneswar for a customized package?",
    a: "Yes. You can contact Jagannath Explorer Travels and share your destination, travel dates, number of passengers, pickup location, and preferred vehicle. Our team can help you create a practical travel plan based on your requirements.",
  },
  {
    q: "How can I find a reliable travel agency in Bhubaneswar?",
    a: "Look for a travel company that provides clear pricing, dependable vehicles, experienced drivers, flexible travel options, and responsive customer support. Jagannath Explorer Travels serves travelers from Bhubaneswar with local and outstation transportation and customized tour services.",
  },
  {
    q: "Are you among the top 10 travel agency in Bhubaneswar?",
    a: "We aim to be one of the trusted travel choices for customers looking for comfortable transportation and well-planned Odisha tours. Our focus is simple: dependable vehicles, experienced drivers, helpful service, and travel plans that suit each customer's needs.",
  },
];

/* ---------------------------------------------------------------------------
   Chevron Icon
--------------------------------------------------------------------------- */

const ChevronIcon = () => (
  <svg
    className="faq-item__chevron"
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

  const panelId = `faq-panel-${uid}`;
  const buttonId = `faq-button-${uid}`;

  return (
    <div
      className={`faq-item${isOpen ? " faq-item--open" : ""}`}
      style={{ "--stagger": index }}
    >
      <h2 className="faq-item__heading">
        <button
          type="button"
          id={buttonId}
          className="faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <span className="faq-item__question">{item.q}</span>

          <span className="faq-item__icon">
            <ChevronIcon />
          </span>
        </button>
      </h2>

      <div
        className="faq-item__panel"
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
      >
        <div className="faq-item__panel-inner">
          <p className="faq-item__answer">{item.a}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   SedanFaq
--------------------------------------------------------------------------- */

const SedanFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className="sedan-faq"
      aria-labelledby="travel-faq-title"
    >
      <div className="sedan-faq__bg" aria-hidden="true" />

      <header className="sedan-faq__header">
        <span className="sedan-faq__eyebrow">Jagannath Explorer Travels</span>

        <h1
          id="travel-faq-title"
          className="sedan-faq__title"
        >
          Best Tour and Travel Agency in Bhubaneswar
        </h1>

        <p className="sedan-faq__subtitle">
          Planning a trip from Bhubaneswar? Explore answers about our tour
          packages, car rental, sightseeing, outstation travel, airport
          transfers, and Odisha travel services.
        </p>

        <div className="sedan-faq__business">
          <strong>Jagannath Explorer Travels</strong>
          <span>
            Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur,
            Bhubaneswar, Odisha - 751002
          </span>

          <div className="sedan-faq__phones">
            <a href="tel:9668892441">9668892441</a>
            <span>|</span>
            <a href="tel:9556355446">9556355446</a>
          </div>
        </div>
      </header>

      <div className="faq-grid">
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

      <div className="sedan-faq__bottom">
        <p>
          Planning a Bhubaneswar or Odisha tour?
        </p>

        <a
          href="tel:9668892441"
          className="sedan-faq__cta"
        >
          Talk to Our Travel Team
        </a>
      </div>
    </section>
  );
};

export default SedanFaq;