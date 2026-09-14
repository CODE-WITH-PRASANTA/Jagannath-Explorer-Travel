import React, { useState } from "react";
import "./ToursLocation.css";

const ToursLocation = ({
  address: externalAddress,
  setAddress: externalSetAddress,
  coordinates: externalCoordinates,
  setCoordinates: externalSetCoordinates,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const [internalAddress, setInternalAddress] = useState("");
  const [internalCoordinates, setInternalCoordinates] = useState("");

  const address =
    externalAddress !== undefined ? externalAddress : internalAddress;

  const setAddress = externalSetAddress || setInternalAddress;

  const coordinates =
    externalCoordinates !== undefined
      ? externalCoordinates
      : internalCoordinates;

  const setCoordinates =
    externalSetCoordinates || setInternalCoordinates;

  const encodedAddress = encodeURIComponent(
    (address || "").trim() || "Odisha, India"
  );

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="ToursLocation-wrapper">
      <div className="ToursLocation-card">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div
          className="ToursLocation-header"
          onClick={() => setIsOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }
          }}
        >
          <div className="ToursLocation-header-left">

            <div className="ToursLocation-icon-box">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>

            <div className="ToursLocation-header-content">
              <h2 className="ToursLocation-header-title">
                4. Location
              </h2>

              <p className="ToursLocation-header-subtitle">
                Add the destination and map location for this tour
              </p>
            </div>
          </div>

          <button
            type="button"
            className="ToursLocation-toggle-button"
            aria-label={
              isOpen ? "Collapse section" : "Expand section"
            }
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <svg
              className={`ToursLocation-chevron ${
                isOpen ? "ToursLocation-open" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* =====================================================
            BODY
        ===================================================== */}
        {isOpen && (
          <div className="ToursLocation-body">

            {/* Section Heading */}
            <div className="ToursLocation-section-heading">
              <div className="ToursLocation-section-title-wrap">
                <h3 className="ToursLocation-section-label">
                  Location Map
                </h3>

                <p className="ToursLocation-section-description">
                  Preview the geographical location of your tour.
                </p>
              </div>

              <div className="ToursLocation-map-status">
                <span className="ToursLocation-status-dot"></span>
                Map Preview
              </div>
            </div>

            {/* =================================================
                GOOGLE MAP
            ================================================= */}
            <div className="ToursLocation-map-container">

              <iframe
                title="Location Preview Map"
                className="ToursLocation-map-frame"
                src={mapEmbedUrl}
                loading="lazy"
              />

              {/* Subtle top label */}
              <div className="ToursLocation-map-label">
                <span className="ToursLocation-map-label-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>

                <span>
                  {address
                    ? address.split(",")[0]
                    : "Tour Destination"}
                </span>
              </div>
            </div>

            {/* =================================================
                LOCATION FIELDS
            ================================================= */}
            <div className="ToursLocation-fields-grid">

              {/* Address */}
              <div className="ToursLocation-field-group">

                <label
                  htmlFor="address-input"
                  className="ToursLocation-field-title"
                >
                  Address
                  <span className="ToursLocation-required">*</span>
                </label>

                <div className="ToursLocation-input-wrapper">

                  <svg
                    className="ToursLocation-input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>

                  <input
                    id="address-input"
                    type="text"
                    className="ToursLocation-input-control"
                    placeholder="e.g. Puri, Odisha, India"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                </div>

                <span className="ToursLocation-field-hint">
                  Enter the main destination or tour location.
                </span>
              </div>

              {/* Coordinates */}
              <div className="ToursLocation-field-group">

                <label
                  htmlFor="coordinates-input"
                  className="ToursLocation-field-title"
                >
                  Coordinates
                  <span className="ToursLocation-field-optional">
                    Optional
                  </span>
                </label>

                <div className="ToursLocation-input-wrapper">

                  <svg
                    className="ToursLocation-input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3c3 3.5 3 14.5 0 18" />
                    <path d="M12 3c-3 3.5-3 14.5 0 18" />
                  </svg>

                  <input
                    id="coordinates-input"
                    type="text"
                    className="ToursLocation-input-control"
                    placeholder="20.2961, 85.8245"
                    value={coordinates}
                    onChange={(e) =>
                      setCoordinates(e.target.value)
                    }
                  />

                </div>

                <span className="ToursLocation-field-hint">
                  Add latitude and longitude if available.
                </span>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursLocation;