import React from "react";
import {
  FaBriefcaseMedical,
  FaUserTie,
  FaUsers,
  FaGlobeAmericas,
  FaPlay,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

import "./Aboutus.css";

import mainImg from "../../assets/About.webp";
import brushImg from "../../assets/img-1.webp";
import planeVector from "../../assets/plane-vector.webp";

const features = [
  {
    id: 1,
    title: (
      <>
        Safety First
        <br />
        Always
      </>
    ),
    icon: <FaBriefcaseMedical />,
    type: "green",
  },
  {
    id: 2,
    title: (
      <>
        Trusted Travel
        <br />
        Guide
      </>
    ),
    icon: <FaUserTie />,
    type: "orange",
  },
  {
    id: 3,
    title: (
      <>
        Expertise And
        <br />
        Experience
      </>
    ),
    icon: <FaUsers />,
    type: "orange",
  },
  {
    id: 4,
    title: (
      <>
        Global
        <br />
        Destinations
      </>
    ),
    icon: <FaGlobeAmericas />,
    type: "green",
  },
];

const AboutUs = () => {
  return (
    <section className="AboutUs">
      <div className="AboutUs__background-shape AboutUs__background-shape--one" />
      <div className="AboutUs__background-shape AboutUs__background-shape--two" />
      <div className="AboutUs__grain" />

      <div className="AboutUs__container">
        {/* left side - text content */}
        <div className="AboutUs__content">
          <div className="AboutUs__label">
            <span className="AboutUs__label-dot" />
            <span>About Us</span>
          </div>

          <h1 className="AboutUs__heading">
            Best Tour and Travel Agency in Bhubaneswar
          </h1>

          <p className="AboutUs__description">
            We are a trusted <strong>Bhubaneswar travel agency</strong>{" "}
            offering handpicked tour packages for families, couples and
            corporate groups. From weekend getaways to custom itineraries
            across Odisha and beyond, our team plans every trip with care so
            you can just show up and enjoy the journey.
          </p>

          <div className="AboutUs__features">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`AboutUs__feature-card AboutUs__feature-card--${feature.type}`}
              >
                <div className="AboutUs__feature-icon">{feature.icon}</div>
                <div className="AboutUs__feature-text">{feature.title}</div>
              </div>
            ))}
          </div>

          <div className="AboutUs__actions">
            <button className="AboutUs__find-button">
              <span>Find Out More</span>
              <FaArrowRight className="AboutUs__find-arrow" />
            </button>

            <button className="AboutUs__watch-button">
              <span className="AboutUs__play-circle">
                <span className="AboutUs__play-pulse" />
                <FaPlay />
              </span>
              <span className="AboutUs__watch-text">Watch Tour</span>
            </button>
          </div>
        </div>

        {/* right side - image + floating cards */}
        <div className="AboutUs__visual">
          <img src={planeVector} alt="" className="AboutUs__plane" />

          <div className="AboutUs__orbit AboutUs__orbit--one" />
          <div className="AboutUs__orbit AboutUs__orbit--two" />

          <div className="AboutUs__image-wrapper">
            <div className="AboutUs__image-glow" />

            <div
              className="AboutUs__image-mask"
              style={{
                WebkitMaskImage: `url(${brushImg})`,
                maskImage: `url(${brushImg})`,
              }}
            >
              <img
                src={mainImg}
                alt="Tourists exploring a destination with our Bhubaneswar travel agency"
                className="AboutUs__main-image"
              />
              <div className="AboutUs__image-shine" />
              <div className="AboutUs__image-tint" />
            </div>
          </div>

          <div className="AboutUs__rating">
            <div className="AboutUs__rating-stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="AboutUs__rating-text">
              <strong>4.9</strong> / 5.0 Rated
            </div>
          </div>

          <div className="AboutUs__experience">
            <div className="AboutUs__experience-number">
              05<span className="AboutUs__experience-plus">+</span>
            </div>
            <div className="AboutUs__experience-content">
              <span>Years of</span>
              <strong>experience</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;