import React from "react";
import {
  FaBriefcaseMedical,
  FaUserTie,
  FaUsers,
  FaPlay,
  FaArrowRight,
} from "react-icons/fa";

import "./AboutUs.css";

import mainImg from "../../assets/main-img.webp";
import brushImg from "../../assets/img-1.webp";
import planeVector from "../../assets/plane-vector.webp";

const AboutUs = () => {
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
          Expertise And
          <br />
          Experience
        </>
      ),
      icon: <FaUsers />,
      type: "green",
    },
  ];

  return (
    <section className="AboutUs">
      <div className="AboutUs__background-shape AboutUs__background-shape--one" />
      <div className="AboutUs__background-shape AboutUs__background-shape--two" />

      <div className="AboutUs__container">

        {/* LEFT SIDE */}
        <div className="AboutUs__content">

          <div className="AboutUs__label">
            <span>About Us</span>
          </div>

          <h2 className="AboutUs__heading">
            We provide the best
            <br />
            tour facilities.
          </h2>

          <p className="AboutUs__description">
            Etiam ac tortor id purus commodo vulputate. Vestibulum porttitor
            erat felis and sed vehicula tortor malesuada gravida. Mauris
            volutpat enim quis pulv gont congue. Suspendisse ullamcorper.
          </p>

          <div className="AboutUs__features">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`AboutUs__feature-card AboutUs__feature-card--${feature.type}`}
              >
                <div className="AboutUs__feature-icon">
                  {feature.icon}
                </div>

                <div className="AboutUs__feature-text">
                  {feature.title}
                </div>
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
                <FaPlay />
              </span>

              <span className="AboutUs__watch-text">
                Watch Tour
              </span>
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="AboutUs__visual">

          {/* Decorative Plane */}
          <img
            src={planeVector}
            alt=""
            className="AboutUs__plane"
          />

          {/* Image */}
          <div className="AboutUs__image-wrapper">

            <div
              className="AboutUs__image-mask"
              style={{
                WebkitMaskImage: `url(${brushImg})`,
                maskImage: `url(${brushImg})`,
              }}
            >
              <img
                src={mainImg}
                alt="Tourists exploring a destination"
                className="AboutUs__main-image"
              />

              <div className="AboutUs__image-shine" />
            </div>

          </div>

          {/* Experience */}
          <div className="AboutUs__experience">
            <div className="AboutUs__experience-number">
              05
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