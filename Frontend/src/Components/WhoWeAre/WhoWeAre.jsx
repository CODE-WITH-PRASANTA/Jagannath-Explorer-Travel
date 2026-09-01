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
      title: "Worldwide Coverage",
      description:
        "Curabitur convallis enim atnora ullamcorper sagittis.",
      icon: <FaGlobeAmericas />,
      color: "green",
    },
    {
      id: 2,
      title: "Competitive Pricing",
      description:
        "Burabitur convallis enim atnora. Morbi nug scelerisque for thana.",
      icon: <FaTags />,
      color: "orange",
    },
    {
      id: 3,
      title: "Fast Booking",
      description:
        "Fermentum eitorx quis maximum Etiam urnan posuere convallis.",
      icon: <FaCalendarAlt />,
      color: "blue",
    },
    {
      id: 4,
      title: "Guided Tours",
      description:
        "Pellentesque venenatis egestasio diam Proin velgorat elit porttitor metus convallis.",
      icon: <FaUserTie />,
      color: "purple",
    },
    {
      id: 5,
      title: "Best Support 24/7",
      description:
        "Sed venenatis mauris nec nulla euismod, accounv varius lectus viverra oncen.",
      icon: <FaHeadset />,
      color: "red",
    },
    {
      id: 6,
      title: "Ultimate Flexibility",
      description:
        "Duis leo sapien, lacinia utorrent efficitur utom suscipit quis nulla Sed auctor eu.",
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
    >
      <div className="WhoWeAre__container">

        {/* Heading */}
        <div className="WhoWeAre__heading-area">

          <div className="WhoWeAre__label">
            <span>Who We Are</span>
          </div>

          <h2 className="WhoWeAre__title">
            Why TripRex Is Best
          </h2>

        </div>

        {/* Cards */}
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

      </div>
    </section>
  );
};

export default WhoWeAre;