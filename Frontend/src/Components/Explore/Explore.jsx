import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Explore.css";

// ======================================================
// ODISHA ACTIVITY IMAGES
// ======================================================

import boating1 from "../../assets/ChilikaBeach.webp";
import boating2 from "../../assets/Chilikabeach2.webp";

import surfing1 from "../../assets/puribeach.webp";
import surfing2 from "../../assets/puribeach1.webp";

import trekking1 from "../../assets/Demomali.webp";
import trekking2 from "../../assets/Deomali1.webp";

import daringbadi1 from "../../assets/Daringibadi.webp";
import daringbadi2 from "../../assets/Daringibadi1.webp";

import satkosia1 from "../../assets/Satakosia.webp";
import satkosia2 from "../../assets/satakosia1.webp";

import watersport1 from "../../assets/watersports.webp";
import watersport2 from "../../assets/watersports1.webp";

// ======================================================
// ODISHA TOURISM ACTIVITIES DATA
// ======================================================

const activitiesData = {
  // ====================================================
  // CHILIKA
  // ====================================================

  boating: {
    badge: "Chilika Boating",
    title: "Explore Chilika Lake by Boat",
    description:
      "Enjoy a memorable boat journey across Chilika Lake, Odisha's famous coastal lagoon. Discover beautiful islands, fishing villages, migratory birds and the peaceful waters surrounding Kalijai Temple.",
    features: [
      "Chilika Lake Boat Ride",
      "Kalijai Temple Visit",
      "Migratory Bird Watching",
      "Scenic Sunset Views",
    ],
    images: [boating1, boating2],
  },

  // ====================================================
  // PURI
  // ====================================================

  surfing: {
    badge: "Puri Beach",
    title: "Experience the Beauty of Puri Beach",
    description:
      "Enjoy the beautiful coastline of Puri and experience the waves of the Bay of Bengal. Puri Beach offers a refreshing combination of beach sightseeing, ocean views and coastal adventure.",
    features: [
      "Puri Beach Experience",
      "Bay of Bengal Views",
      "Beach Adventure",
      "Coastal Photography",
    ],
    images: [surfing1, surfing2],
  },

  // ====================================================
  // DEOMALI
  // ====================================================

  deomali: {
    badge: "Deomali Trekking",
    title: "Trek Through the Deomali Hills",
    description:
      "Explore the magnificent Deomali hills of Koraput and experience Odisha's beautiful mountain landscapes. Enjoy fresh air, scenic valleys, sunrise views and the natural beauty of southern Odisha.",
    features: [
      "Deomali Hill Trek",
      "Koraput Valley Views",
      "Sunrise Experience",
      "Nature Photography",
    ],
    images: [trekking1, trekking2],
  },

  // ====================================================
  // DARINGBADI
  // ====================================================

  daringbadi: {
    badge: "Daringbadi",
    title: "Discover the Natural Beauty of Daringbadi",
    description:
      "Visit Daringbadi, one of Odisha's beautiful hill destinations. Explore pine forests, waterfalls, green valleys and peaceful mountain surroundings away from busy city life.",
    features: [
      "Pine Forests",
      "Waterfall Exploration",
      "Hill & Valley Views",
      "Nature Walks",
    ],
    images: [daringbadi1, daringbadi2],
  },

  // ====================================================
  // SATKOSIA
  // ====================================================

  satkosia: {
    badge: "Satkosia",
    title: "Explore the Wild Beauty of Satkosia",
    description:
      "Discover the spectacular Satkosia Gorge and the beautiful Mahanadi landscape. Enjoy river views, forest surroundings, nature experiences and the peaceful wilderness of Odisha.",
    features: [
      "Satkosia Gorge",
      "Mahanadi River Views",
      "Forest Exploration",
      "Wildlife & Nature Experience",
    ],
    images: [satkosia1, satkosia2],
  },

  // ====================================================
  // ODISHA WATER SPORTS
  // ====================================================

  watersports: {
    badge: "Odisha Water Sports",
    title: "Enjoy Water Sports Along Odisha's Coast",
    description:
      "Make your Odisha holiday more exciting with coastal water activities. Enjoy the sea, beaches and refreshing outdoor experiences along Odisha's beautiful coastline.",
    features: [
      "Coastal Water Activities",
      "Beach Adventures",
      "Family-Friendly Activities",
      "Bay of Bengal Experience",
    ],
    images: [watersport1, watersport2],
  },
};

// ======================================================
// EXPLORE COMPONENT
// ======================================================

const Explore = () => {
  const [activeTab, setActiveTab] = useState("boating");

  const currentActivity = activitiesData[activeTab];

  // ====================================================
  // EXPLORE EXPERIENCE
  // ====================================================

  const handleExplore = () => {
    alert(
      `Explore ${currentActivity.badge} with Jagannath Explorer Travels.`
    );
  };

  return (
    <section
      className="explore-section"
      aria-labelledby="odisha-activities-title"
    >
      <div className="explore-container">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <div className="explore-header">

          <div className="explore-subtitle-badge">
            <span className="badge-arrow">➜</span>

            <span>Discover the beauty of Odisha</span>

            <span className="badge-sparkle">✦</span>
          </div>

          <h2
            id="odisha-activities-title"
            className="explore-main-title"
          >
            Explore Odisha Adventure & Travel Experiences
          </h2>

          <p className="explore-main-description">
            Discover Odisha through its beautiful beaches, peaceful
            lakes, scenic hills, forests, rivers and unforgettable
            outdoor experiences with Jagannath Explorer Travels.
          </p>

        </div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div className="explore-content-grid">

          {/* ==================================================
              ODISHA ACTIVITY TABS
          ================================================== */}

          <div className="activities-tabs-grid">

            {/* CHILIKA BOATING */}

            <button
              type="button"
              className={`activity-tab-btn ${
                activeTab === "boating" ? "active" : ""
              }`}
              onClick={() => setActiveTab("boating")}
              aria-pressed={activeTab === "boating"}
            >
              <div className="tab-icon-wrap">
                <span>⛵</span>
              </div>

              <span className="tab-label">
                Chilika Boating
              </span>
            </button>

            {/* PURI BEACH */}

            <button
              type="button"
              className={`activity-tab-btn ${
                activeTab === "surfing" ? "active" : ""
              }`}
              onClick={() => setActiveTab("surfing")}
              aria-pressed={activeTab === "surfing"}
            >
              <div className="tab-icon-wrap">
                <span>🌊</span>
              </div>

              <span className="tab-label">
                Puri Beach
              </span>
            </button>

            {/* DEOMALI TREKKING */}

            <button
              type="button"
              className={`activity-tab-btn ${
                activeTab === "deomali" ? "active" : ""
              }`}
              onClick={() => setActiveTab("deomali")}
              aria-pressed={activeTab === "deomali"}
            >
              <div className="tab-icon-wrap">
                <span>⛰️</span>
              </div>

              <span className="tab-label">
                Deomali Trekking
              </span>
            </button>

            {/* DARINGBADI */}

            <button
              type="button"
              className={`activity-tab-btn ${
                activeTab === "daringbadi" ? "active" : ""
              }`}
              onClick={() => setActiveTab("daringbadi")}
              aria-pressed={activeTab === "daringbadi"}
            >
              <div className="tab-icon-wrap">
                <span>🌲</span>
              </div>

              <span className="tab-label">
                Daringbadi
              </span>
            </button>

            {/* SATKOSIA */}

            <button
              type="button"
              className={`activity-tab-btn ${
                activeTab === "satkosia" ? "active" : ""
              }`}
              onClick={() => setActiveTab("satkosia")}
              aria-pressed={activeTab === "satkosia"}
            >
              <div className="tab-icon-wrap">
                <span>🚣</span>
              </div>

              <span className="tab-label">
                Satkosia
              </span>
            </button>

            {/* WATER SPORTS */}

            <button
              type="button"
              className={`activity-tab-btn ${
                activeTab === "watersports" ? "active" : ""
              }`}
              onClick={() => setActiveTab("watersports")}
              aria-pressed={activeTab === "watersports"}
            >
              <div className="tab-icon-wrap">
                <span>🏄</span>
              </div>

              <span className="tab-label">
                Water Sports
              </span>
            </button>

          </div>

          {/* ==================================================
              ACTIVITY DETAILS
          ================================================== */}

          <div className="activity-detail-col">

            {/* ACTIVITY BADGE */}

            <div className="brush-tag-wrap">
              <span className="brush-badge">
                {currentActivity.badge}
              </span>
            </div>

            {/* TITLE */}

            <h3 className="activity-detail-title">
              {currentActivity.title}
            </h3>

            {/* DESCRIPTION */}

            <p className="activity-detail-desc">
              {currentActivity.description}
            </p>

            {/* ==================================================
                FEATURES
            ================================================== */}

            <div className="activity-features-list">

              {currentActivity.features.map((feature, index) => (
                <div
                  key={`${activeTab}-feature-${index}`}
                  className="act-feat-item"
                >
                  <span className="act-feat-dot"></span>

                  <span className="act-feat-name">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

            {/* ==================================================
                ACTION BUTTONS
            ================================================== */}

            <div className="activity-actions">

              <Link to="/contact" className="btn-check-avail">
                Check Availability
              </Link>

              <button
                type="button"
                className="btn-watch-adventure"
                onClick={handleExplore}
              >
                <span className="play-icon-circle">

                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="9.5,7.5 16.5,12 9.5,16.5" />
                  </svg>

                </span>

                <span>
                  Explore Experience
                </span>

              </button>

            </div>

          </div>

          {/* ==================================================
              ODISHA ACTIVITY IMAGES
          ================================================== */}

          <div className="activity-images-col">

            {/* FIRST IMAGE */}

            <div className="stacked-img-wrapper">

              <img
                src={currentActivity.images[0]}
                alt={`${currentActivity.badge} in Odisha`}
                className="activity-img"
                loading="lazy"
              />

              <div className="shine-sweep"></div>

            </div>

            {/* SECOND IMAGE */}

            <div className="stacked-img-wrapper">

              <img
                src={currentActivity.images[1]}
                alt={`${currentActivity.badge} Odisha travel experience`}
                className="activity-img"
                loading="lazy"
              />

              <div className="shine-sweep"></div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Explore;