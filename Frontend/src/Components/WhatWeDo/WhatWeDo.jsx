
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  FaPrayingHands,
  FaUmbrellaBeach,
  FaWater,
  FaTree,
  FaTheaterMasks,
  FaPlay,
  FaArrowRight,
} from "react-icons/fa";

import "./WhatWeDo.css";

import odishaImage from "../../assets/odisha.webp";

const WhatWeDo = () => {
  // =========================================================
  // ODISHA TRAVEL EXPERIENCES
  // =========================================================

  const activities = [
    {
      id: 1,
      name: "Temples & Pilgrimage",
      icon: <FaPrayingHands />,
      image: odishaImage,

      title:
        "Discover Odisha's Famous Temples & Spiritual Heritage",

      description:
        "Explore the spiritual heart of Odisha with memorable pilgrimage journeys through Bhubaneswar, Puri and other historic destinations. Visit the sacred Jagannath Temple in Puri and discover the beautiful architecture, traditions and heritage of Odisha.",

      features: [
        "Jagannath Temple, Puri",
        "Lingaraj Temple, Bhubaneswar",
        "Mukteswar & Rajarani Temples",
        "Spiritual & Heritage Tours",
      ],
    },

    {
      id: 2,
      name: "Beaches & Coastal Tours",
      icon: <FaUmbrellaBeach />,
      image: odishaImage,

      title:
        "Experience the Beautiful Beaches of Odisha",

      description:
        "Discover the beautiful coastline of Odisha with relaxing beach experiences, coastal sightseeing and scenic sunsets. Explore Puri Beach, Chandrabhaga and other coastal destinations while enjoying the unique charm of Odisha.",

      features: [
        "Puri Beach",
        "Chandrabhaga Beach",
        "Coastal Sightseeing",
        "Sunrise & Sunset Experiences",
      ],
    },

    {
      id: 3,
      name: "Chilika Lake",
      icon: <FaWater />,
      image: odishaImage,

      title:
        "Explore Chilika Lake & Its Natural Beauty",

      description:
        "Experience the spectacular natural beauty of Chilika Lake. Enjoy scenic boat trips, explore the lake surroundings and discover its rich birdlife and unique coastal ecosystem. Chilika is an ideal destination for nature lovers and photographers.",

      features: [
        "Chilika Lake",
        "Satapada Boat Trips",
        "Bird Watching",
        "Scenic Lake Experiences",
      ],
    },

    {
      id: 4,
      name: "Nature & Wildlife",
      icon: <FaTree />,
      image: odishaImage,

      title:
        "Explore Odisha's Nature, Forests & Wildlife",

      description:
        "Discover the natural beauty of Odisha through forests, wetlands, wildlife destinations and scenic landscapes. Explore destinations such as Bhitarkanika and Similipal and experience the peaceful side of Odisha.",

      features: [
        "Bhitarkanika",
        "Similipal",
        "Wildlife Experiences",
        "Nature & Eco Tours",
      ],
    },

    {
      id: 5,
      name: "Culture & Festivals",
      icon: <FaTheaterMasks />,
      image: odishaImage,

      title:
        "Experience Odisha's Rich Culture & Festivals",

      description:
        "Experience the vibrant culture of Odisha through festivals, traditional art, handicrafts, classical dance, local food and cultural traditions. Discover the heritage and traditions that make Odisha a special destination for travellers.",

      features: [
        "Rath Yatra, Puri",
        "Odissi Dance & Culture",
        "Pipili Applique Crafts",
        "Traditional Odia Cuisine",
      ],
    },
  ];

  // =========================================================
  // ACTIVE ACTIVITY
  // =========================================================

  const [activeActivity, setActiveActivity] = useState(0);

  const currentActivity = activities[activeActivity];

  // =========================================================
  // BUSINESS STRUCTURED DATA
  // =========================================================

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",

    name: "Jagannath Explorer Travels",

    description:
      "Jagannath Explorer Travels is a tour and travel agency in Bhubaneswar, Odisha offering Odisha tour packages, pilgrimage tours, sightseeing tours, cultural experiences and customized travel services.",

    telephone: [
      "+91-9668892441",
      "+91-9556355446",
    ],

    address: {
      "@type": "PostalAddress",

      streetAddress:
        "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur",

      addressLocality: "Bhubaneswar",

      addressRegion: "Odisha",

      postalCode: "751002",

      addressCountry: "IN",
    },

    areaServed: [
      {
        "@type": "City",
        name: "Bhubaneswar",
      },

      {
        "@type": "City",
        name: "Puri",
      },

      {
        "@type": "State",
        name: "Odisha",
      },
    ],

    knowsAbout: [
      "Odisha Tourism",
      "Odisha Tour Packages",
      "Bhubaneswar Tours",
      "Puri Tours",
      "Konark Tours",
      "Chilika Lake Tours",
      "Pilgrimage Tours",
      "Beach Tours",
      "Wildlife Tours",
      "Cultural Tours",
      "Travel Planning",
    ],
  };

  // =========================================================
  // WEB PAGE STRUCTURED DATA
  // =========================================================

  const webPageSchema = {
    "@context": "https://schema.org",

    "@type": "WebPage",

    name:
      "Odisha Travel Experiences & Tour Activities | Jagannath Explorer Travels",

    description:
      "Explore temples, beaches, Chilika Lake, wildlife, culture and festivals with Jagannath Explorer Travels, a tour and travel agency in Bhubaneswar, Odisha.",

    about: {
      "@type": "TouristDestination",
      name: "Odisha",
    },

    publisher: {
      "@type": "TravelAgency",
      name: "Jagannath Explorer Travels",
    },
  };

  // =========================================================
  // FAQ STRUCTURED DATA
  // =========================================================

  const faqSchema = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",
        name: "What are the best places to visit in Odisha?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            "Popular destinations in Odisha include Bhubaneswar, Puri, Konark, Chilika Lake, Bhitarkanika and Similipal. Travellers can enjoy temple visits, beaches, nature, wildlife and cultural experiences.",
        },
      },

      {
        "@type": "Question",
        name: "What types of Odisha tour packages are available?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            "Odisha travel experiences can include pilgrimage tours, temple tours, beach holidays, heritage tours, Chilika Lake trips, wildlife tours, cultural tours and customized travel itineraries.",
        },
      },

      {
        "@type": "Question",
        name: "Is Bhubaneswar a good starting point for an Odisha tour?",

        acceptedAnswer: {
          "@type": "Answer",

          text:
            "Yes. Bhubaneswar is an important starting point for exploring Odisha and provides convenient access to destinations such as Puri, Konark and other attractions across the state.",
        },
      },
    ],
  };

  return (
    <>
      {/* =====================================================
          SEO / HELMET
      ===================================================== */}

      <Helmet>

        {/* PAGE TITLE */}

        <title>
          Odisha Tour & Travel Experiences | Jagannath Explorer Travels
        </title>

        {/* META DESCRIPTION */}

        <meta
          name="description"
          content="Explore Odisha with Jagannath Explorer Travels. Discover Puri Jagannath Temple, Konark, Chilika Lake, beaches, wildlife, culture and customized Odisha tour packages from Bhubaneswar."
        />

        {/* META KEYWORDS */}

        <meta
          name="keywords"
          content="Odisha tourism, Odisha tour packages, Odisha travel packages, Bhubaneswar travel agency, tour and travel agency in Bhubaneswar, travel agency in Bhubaneswar, Bhubaneswar tour packages, Puri tour packages, Konark tour packages, Chilika Lake tour, Odisha pilgrimage tour, Odisha beach tour, Odisha wildlife tour, Odisha cultural tour, Jagannath Temple tour, Odisha tourism packages with price"
        />

        {/* AUTHOR */}

        <meta
          name="author"
          content="Jagannath Explorer Travels"
        />

        {/* ROBOTS */}

        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />

        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large"
        />

        {/* LANGUAGE */}

        <meta
          httpEquiv="content-language"
          content="en-IN"
        />

        {/* THEME COLOR */}

        <meta
          name="theme-color"
          content="#61b341"
        />

        {/* CANONICAL */}

        <link
          rel="canonical"
          href="https://www.jagannathexplorertravels.com/what-we-do"
        />

        {/* =====================================================
            OPEN GRAPH
        ===================================================== */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Odisha Tour & Travel Experiences | Jagannath Explorer Travels"
        />

        <meta
          property="og:description"
          content="Discover Odisha's temples, beaches, Chilika Lake, wildlife, culture and festivals with Jagannath Explorer Travels in Bhubaneswar."
        />

        <meta
          property="og:url"
          content="https://www.jagannathexplorertravels.com/what-we-do"
        />

        <meta
          property="og:site_name"
          content="Jagannath Explorer Travels"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        <meta
          property="og:image"
          content="https://www.jagannathexplorertravels.com/assets/odisha.webp"
        />

        <meta
          property="og:image:alt"
          content="Odisha tourism and travel experiences"
        />

        {/* =====================================================
            TWITTER / X
        ===================================================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Explore Odisha | Jagannath Explorer Travels"
        />

        <meta
          name="twitter:description"
          content="Explore Odisha's temples, beaches, Chilika Lake, wildlife, culture and festivals with Jagannath Explorer Travels."
        />

        <meta
          name="twitter:image"
          content="https://www.jagannathexplorertravels.com/assets/odisha.webp"
        />

        <meta
          name="twitter:image:alt"
          content="Odisha travel experiences"
        />

        {/* =====================================================
            BUSINESS SCHEMA
        ===================================================== */}

        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>

        {/* =====================================================
            WEB PAGE SCHEMA
        ===================================================== */}

        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>

        {/* =====================================================
            FAQ SCHEMA
        ===================================================== */}

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

      </Helmet>

      {/* =====================================================
          WHAT WE DO SECTION
      ===================================================== */}

      <section
        className="WhatWeDo"
        aria-labelledby="what-we-do-heading"
      >

        <div className="WhatWeDo__container">

          {/* =================================================
              LEFT IMAGE
          ================================================= */}

          <div className="WhatWeDo__image-side">

            <div className="WhatWeDo__image-wrapper">

              <img
                key={currentActivity.id}
                src={currentActivity.image}
                alt={`${currentActivity.name} in Odisha - Jagannath Explorer Travels`}
                className="WhatWeDo__main-image"
                loading="lazy"
                decoding="async"
              />

              <div
                className="WhatWeDo__image-overlay"
                aria-hidden="true"
              />

            </div>

          </div>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="WhatWeDo__content">

            <div className="WhatWeDo__content-inner">

              {/* =================================================
                  LABEL
              ================================================= */}

              <div className="WhatWeDo__label">

                <span>
                  Explore Odisha
                </span>

              </div>

              {/* =================================================
                  HEADING
              ================================================= */}

              <h2
                id="what-we-do-heading"
                className="WhatWeDo__heading"
              >
                Discover the Best of Odisha with Jagannath Explorer Travels
              </h2>

              {/* =================================================
                  INTRO
              ================================================= */}

              <p className="WhatWeDo__intro">
                Odisha is a land of ancient temples, beautiful beaches,
                spectacular lakes, forests, wildlife and vibrant cultural
                traditions. From the spiritual atmosphere of Puri and
                Bhubaneswar to the architectural beauty of Konark and the
                natural beauty of Chilika Lake, there is something for every
                traveller to discover.
              </p>

              <p className="WhatWeDo__intro">
                Jagannath Explorer Travels, based in Bhubaneswar, helps
                travellers explore Odisha through thoughtfully planned
                sightseeing, pilgrimage, cultural, nature and holiday
                experiences.
              </p>

              {/* =================================================
                  ACTIVITIES
              ================================================= */}

              <div className="WhatWeDo__activity-area">

                {/* =================================================
                    CATEGORY LIST
                ================================================= */}

                <div
                  className="WhatWeDo__categories"
                  role="tablist"
                  aria-label="Odisha travel experiences"
                >

                  {activities.map((activity, index) => (

                    <button
                      key={activity.id}
                      type="button"
                      role="tab"
                      aria-selected={
                        activeActivity === index
                      }
                      aria-controls={`odisha-activity-${activity.id}`}
                      className={`WhatWeDo__category ${
                        activeActivity === index
                          ? "WhatWeDo__category--active"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveActivity(index)
                      }
                    >

                      <span
                        className="WhatWeDo__category-icon"
                        aria-hidden="true"
                      >
                        {activity.icon}
                      </span>

                      <span className="WhatWeDo__category-name">
                        {activity.name}
                      </span>

                    </button>

                  ))}

                </div>

                {/* =================================================
                    ACTIVITY DETAILS
                ================================================= */}

                <div
                  id={`odisha-activity-${currentActivity.id}`}
                  className="WhatWeDo__details"
                  role="tabpanel"
                  key={currentActivity.id}
                >

                  <h3 className="WhatWeDo__details-title">
                    {currentActivity.title}
                  </h3>

                  <p className="WhatWeDo__details-description">
                    {currentActivity.description}
                  </p>

                  {/* =================================================
                      FEATURES
                  ================================================= */}

                  <div className="WhatWeDo__features">

                    {currentActivity.features.map(
                      (feature, index) => (

                        <div
                          className="WhatWeDo__feature"
                          key={index}
                        >

                          <span
                            className="WhatWeDo__feature-dot"
                            aria-hidden="true"
                          />

                          <span className="WhatWeDo__feature-text">
                            {feature}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                  {/* =================================================
                      ACTION BUTTONS
                  ================================================= */}

                  <div className="WhatWeDo__actions">

                    <a
                      href="/tours"
                      className="WhatWeDo__availability-button"
                    >
                      Explore Odisha Tours

                      <FaArrowRight
                        aria-hidden="true"
                      />

                    </a>

                    <button
                      type="button"
                      className="WhatWeDo__watch-button"
                      aria-label="Watch Odisha travel video"
                    >

                      <span
                        className="WhatWeDo__play-icon"
                        aria-hidden="true"
                      >
                        <FaPlay />
                      </span>

                      <span className="WhatWeDo__watch-text">
                        Watch Video
                      </span>

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
};

export default WhatWeDo;
