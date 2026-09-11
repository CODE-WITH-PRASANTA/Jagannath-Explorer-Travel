
import React, { useEffect, useRef, useState } from "react";
import {
  FaGlobeAmericas,
  FaTags,
  FaCalendarAlt,
  FaUserTie,
  FaHeadset,
  FaClock,
} from "react-icons/fa";

import "./WhoWeAre.css";

const WhoWeAre = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      id: 1,
      title: "Odisha & Beyond",
      description:
        "Explore Odisha and popular destinations across India with thoughtfully planned tour packages and travel services.",
      icon: <FaGlobeAmericas />,
      color: "green",
    },
    {
      id: 2,
      title: "Affordable Packages",
      description:
        "Choose value-for-money travel packages with transparent pricing designed for families, couples and groups.",
      icon: <FaTags />,
      color: "orange",
    },
    {
      id: 3,
      title: "Easy & Fast Booking",
      description:
        "Book hotels, tours, sightseeing and travel services conveniently with our experienced travel team.",
      icon: <FaCalendarAlt />,
      color: "blue",
    },
    {
      id: 4,
      title: "Experienced Travel Team",
      description:
        "Our local travel experts help you plan comfortable journeys, Odisha tourism packages and customized holidays.",
      icon: <FaUserTie />,
      color: "purple",
    },
    {
      id: 5,
      title: "Dedicated Support",
      description:
        "Get reliable assistance before and during your trip from our Bhubaneswar-based travel support team.",
      icon: <FaHeadset />,
      color: "red",
    },
    {
      id: 6,
      title: "Flexible Travel Plans",
      description:
        "Customize your itinerary, destinations, hotels and activities according to your travel requirements.",
      icon: <FaClock />,
      color: "yellow",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`WhoWeAre ${
        isVisible ? "WhoWeAre--visible" : ""
      }`}
      aria-labelledby="why-jagannath-explorer-title"
    >
      <div className="WhoWeAre__container">

        {/* SEO Heading */}
        <div className="WhoWeAre__heading-area">

          <div className="WhoWeAre__label">
            <span>Who We Are</span>
          </div>

          <h2
            id="why-jagannath-explorer-title"
            className="WhoWeAre__title"
          >
            Why Choose Jagannath Explorer Travels?
          </h2>

          <p className="WhoWeAre__intro">
            Jagannath Explorer Travels is a Bhubaneswar-based tour and
            travel agency offering carefully planned tour packages,
            travel services and customized holidays across Odisha and
            India. We help travelers discover beautiful destinations
            with comfortable, flexible and affordable travel solutions.
          </p>

        </div>

        {/* Service Cards */}
        <div className="WhoWeAre__grid">

          {cards.map((card, index) => (
            <article
              key={card.id}
              className={`WhoWeAre__card WhoWeAre__card--${card.color}`}
              style={{
                "--WhoWeAre-delay": `${index * 0.08}s`,
              }}
            >
              <div className="WhoWeAre__icon-wrapper">
                <div className="WhoWeAre__icon">
                  {card.icon}
                </div>
              </div>

              <div className="WhoWeAre__card-content">

                <h3 className="WhoWeAre__card-title">
                  {card.title}
                </h3>

                <p className="WhoWeAre__card-description">
                  {card.description}
                </p>

              </div>
            </article>
          ))}

        </div>

        {/* Business Information */}
        <div className="WhoWeAre__business-info">

          <h3>Jagannath Explorer Travels – Bhubaneswar</h3>

          <p>
            Looking for a reliable{" "}
            <strong>tour and travel agency in Bhubaneswar</strong>?
            Jagannath Explorer Travels provides tour packages,
            travel planning and customized holiday experiences from
            Bhubaneswar, Odisha.
          </p>

          <p>
            <strong>Address:</strong> Plot No - 001, Mahaveer Nagar,
            Road No. - 18, Samantray Pur, Bhubaneswar, Odisha -
            751002
          </p>

          <p>
            <strong>Contact:</strong>{" "}
            <a href="tel:9668892441">9668892441</a>
            {" | "}
            <a href="tel:9556355446">9556355446</a>
          </p>

        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;

