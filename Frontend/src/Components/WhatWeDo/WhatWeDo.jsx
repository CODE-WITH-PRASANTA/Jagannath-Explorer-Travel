import React, { useState } from "react";
import {
  FaPersonFalling,
  FaWater,
  FaParachuteBox,
  FaPersonSkiing,
  FaMountainSun,
  FaPlay,
} from "react-icons/fa6";

import "./WhatWeDo.css";

import adventureImage from "../../assets/zip-lining-01.webp";
// Change the path above if your image is stored somewhere else.

const WhatWeDo = () => {
  const activities = [
    {
      id: 1,
      name: "Zip Lining",
      icon: <FaMountainSun />,
      image: adventureImage,
      title: "Thrill Above Ground: The Zip Line Adventure",
      description:
        "Embark on an adrenaline-fueled journey, zipping through lush landscapes, feeling the wind rush past, and experiencing nature from breathtaking heights. Unleash your inner adventurer today.",
      features: [
        "Treetop Views",
        "Adrenaline Rush",
        "Safety Measures",
        "Nature Immersion",
      ],
    },
    {
      id: 2,
      name: "Bungee Jumping",
      icon: <FaPersonFalling />,
      image: adventureImage,
      title: "Leap Into Adventure: The Ultimate Bungee Experience",
      description:
        "Feel the rush as you take the leap from breathtaking heights. Experience an unforgettable adventure surrounded by stunning landscapes and professional safety support.",
      features: [
        "Extreme Adventure",
        "Professional Support",
        "Safety Measures",
        "Amazing Views",
      ],
    },
    {
      id: 3,
      name: "Rafting",
      icon: <FaWater />,
      image: adventureImage,
      title: "Ride The Rapids: An Exciting Rafting Adventure",
      description:
        "Navigate through exciting rapids, flowing rivers, and beautiful natural surroundings. Enjoy an energetic water adventure designed for unforgettable moments.",
      features: [
        "River Adventure",
        "Team Experience",
        "Safety Equipment",
        "Natural Landscapes",
      ],
    },
    {
      id: 4,
      name: "Paragliding",
      icon: <FaParachuteBox />,
      image: adventureImage,
      title: "Touch The Sky: A Breathtaking Paragliding Experience",
      description:
        "Soar high above beautiful landscapes and discover the freedom of flight. Enjoy spectacular aerial views while experiencing an unforgettable adventure in the sky.",
      features: [
        "Sky Views",
        "Expert Guidance",
        "Safety Equipment",
        "Memorable Flight",
      ],
    },
    {
      id: 5,
      name: "Ski Touring",
      icon: <FaPersonSkiing />,
      image: adventureImage,
      title: "Explore The Mountains: An Unforgettable Ski Tour",
      description:
        "Discover snowy mountain trails and peaceful landscapes while enjoying an exciting ski touring experience. Adventure, nature, and exploration come together in one journey.",
      features: [
        "Mountain Trails",
        "Snow Adventure",
        "Expert Guide",
        "Nature Exploration",
      ],
    },
  ];

  const [activeActivity, setActiveActivity] = useState(0);

  const currentActivity = activities[activeActivity];

  return (
    <section className="WhatWeDo">

      <div className="WhatWeDo__container">

        {/* =================================================
            LEFT IMAGE
        ================================================== */}

        <div className="WhatWeDo__image-side">

          <div className="WhatWeDo__image-wrapper">

            <img
              key={currentActivity.id}
              src={currentActivity.image}
              alt={currentActivity.name}
              className="WhatWeDo__main-image"
            />

            <div className="WhatWeDo__image-overlay"></div>

          </div>

        </div>


        {/* =================================================
            RIGHT CONTENT
        ================================================== */}

        <div className="WhatWeDo__content">

          <div className="WhatWeDo__content-inner">

            {/* Label */}
            <div className="WhatWeDo__label">
              <span>What We Do</span>
            </div>


            {/* Main Heading */}
            <h2 className="WhatWeDo__heading">
              Our Particular Activities
            </h2>


            {/* =================================================
                ACTIVITIES + DETAILS
            ================================================== */}

            <div className="WhatWeDo__activity-area">

              {/* ---------------------------------------------
                  CATEGORY LIST
              ---------------------------------------------- */}

              <div className="WhatWeDo__categories">

                {activities.map((activity, index) => (
                  <button
                    key={activity.id}
                    type="button"
                    className={`WhatWeDo__category ${
                      activeActivity === index
                        ? "WhatWeDo__category--active"
                        : ""
                    }`}
                    onClick={() => setActiveActivity(index)}
                  >

                    <span className="WhatWeDo__category-icon">
                      {activity.icon}
                    </span>

                    <span className="WhatWeDo__category-name">
                      {activity.name}
                    </span>

                  </button>
                ))}

              </div>


              {/* ---------------------------------------------
                  ACTIVITY CONTENT
              ---------------------------------------------- */}

              <div
                className="WhatWeDo__details"
                key={currentActivity.id}
              >

                <h3 className="WhatWeDo__details-title">
                  {currentActivity.title}
                </h3>


                <p className="WhatWeDo__details-description">
                  {currentActivity.description}
                </p>


                {/* Features */}
                <div className="WhatWeDo__features">

                  {currentActivity.features.map(
                    (feature, index) => (
                      <div
                        className="WhatWeDo__feature"
                        key={index}
                      >

                        <span className="WhatWeDo__feature-dot"></span>

                        <span className="WhatWeDo__feature-text">
                          {feature}
                        </span>

                      </div>
                    )
                  )}

                </div>


                {/* Buttons */}
                <div className="WhatWeDo__actions">

                  <button
                    type="button"
                    className="WhatWeDo__availability-button"
                  >
                    Check Availability
                  </button>


                  <button
                    type="button"
                    className="WhatWeDo__watch-button"
                  >

                    <span className="WhatWeDo__play-icon">
                      <FaPlay />
                    </span>

                    <span className="WhatWeDo__watch-text">
                      Watch Cultural
                    </span>

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WhatWeDo;