import React, { useState } from "react";
import "./ToursItinerary.css";

const initialItinerary = [
  {
    id: 1,
    dayNumber: "Day 01",
    title: "",
    description: "",
    highlights: [],
    isOpen: true,
  },
];

const ToursItinerary = ({
  days: externalDays,
  setDays: externalSetDays,
}) => {
  const [internalDays, setInternalDays] = useState(initialItinerary);

  const days = externalDays || internalDays;
  const setDays = externalSetDays || setInternalDays;

  const [isSectionOpen, setIsSectionOpen] = useState(true);

  const toggleSection = () => {
    setIsSectionOpen((prev) => !prev);
  };

  const toggleAccordion = (id) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === id ? { ...day, isOpen: !day.isOpen } : day
      )
    );
  };

  const handleTitleChange = (id, value) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === id ? { ...day, title: value } : day
      )
    );
  };

  const handleDescriptionChange = (id, value) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === id ? { ...day, description: value } : day
      )
    );
  };

  const handleHighlightChange = (dayId, index, value) => {
    setDays((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;

        const newHighlights = [...day.highlights];
        newHighlights[index] = value;

        return {
          ...day,
          highlights: newHighlights,
        };
      })
    );
  };

  const addHighlight = (dayId) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              highlights: [...day.highlights, ""],
            }
          : day
      )
    );
  };

  const removeHighlight = (dayId, index) => {
    setDays((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;

        return {
          ...day,
          highlights: day.highlights.filter((_, i) => i !== index),
        };
      })
    );
  };

  const addNewDay = () => {
    const nextNum = days.length + 1;

    const formattedNum =
      nextNum < 10 ? `Day 0${nextNum}` : `Day ${nextNum}`;

    const newDayItem = {
      id: Date.now(),
      dayNumber: formattedNum,
      title: "",
      description: "",
      highlights: [],
      isOpen: true,
    };

    setDays((prev) => [...prev, newDayItem]);
  };

  return (
    <div className="ToursItinerary">

      <div className="ToursItinerary-container">

        {/* ================= HEADER ================= */}

        <div
          className="ToursItinerary-header"
          onClick={toggleSection}
          role="button"
          tabIndex={0}
        >

          <div className="ToursItinerary-header-left">

            <div className="ToursItinerary-icon-box">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>

            <div className="ToursItinerary-header-text">

              <h2 className="ToursItinerary-heading">
                3. Itinerary
              </h2>

              <p className="ToursItinerary-subtitle">
                Add day by day itinerary for this tour package
              </p>

            </div>

          </div>

          <button
            type="button"
            className="ToursItinerary-section-toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleSection();
            }}
          >

            <svg
              className={`ToursItinerary-section-chevron ${
                isSectionOpen ? "open" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.3"
                d="M19 9l-7 7-7-7"
              />
            </svg>

          </button>

        </div>

        {/* ================= BODY ================= */}

        {isSectionOpen && (

          <div className="ToursItinerary-content-wrap">

            <div className="ToursItinerary-list">

              {days.map((day) => (

                <div
                  key={day.id}
                  className={`ToursItinerary-accordion-card ${
                    day.isOpen
                      ? "ToursItinerary-accordion-card-expanded"
                      : ""
                  }`}
                >

                  {/* DAY HEADER */}

                  <div
                    className="ToursItinerary-accordion-header"
                    onClick={() => toggleAccordion(day.id)}
                  >

                    <div className="ToursItinerary-accordion-left">

                      <span className="ToursItinerary-day-tag">
                        {day.dayNumber}
                      </span>

                      <span className="ToursItinerary-day-title-preview">
                        {day.title || "Departure"}
                      </span>

                    </div>

                    <button
                      type="button"
                      className="ToursItinerary-row-toggle-btn"
                    >

                      <svg
                        className={`ToursItinerary-chevron-icon ${
                          day.isOpen
                            ? "ToursItinerary-chevron-icon-open"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>

                    </button>

                  </div>

                  {/* DAY BODY */}

                  {day.isOpen && (

                    <div className="ToursItinerary-accordion-body">

                      {/* TITLE */}

                      <div className="ToursItinerary-form-group">

                        <label className="ToursItinerary-label">
                          Day Title
                          <span className="ToursItinerary-required">
                            *
                          </span>
                        </label>

                        <input
                          type="text"
                          className="ToursItinerary-input"
                          value={day.title}
                          onChange={(e) =>
                            handleTitleChange(day.id, e.target.value)
                          }
                          placeholder="Departure"
                        />

                      </div>

                      {/* DESCRIPTION */}

                      <div className="ToursItinerary-form-group">

                        <label className="ToursItinerary-label">
                          Description
                          <span className="ToursItinerary-required">
                            *
                          </span>
                        </label>

                        <div className="ToursItinerary-editor-card">

                          <div className="ToursItinerary-editor-toolbar">

                            <select
                              className="ToursItinerary-editor-select"
                              defaultValue="Normal"
                            >
                              <option>Normal</option>
                              <option>Heading 1</option>
                              <option>Heading 2</option>
                            </select>

                            <span className="ToursItinerary-toolbar-divider"></span>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn"
                            >
                              B
                            </button>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn italic"
                            >
                              I
                            </button>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn underline"
                            >
                              U
                            </button>

                            <span className="ToursItinerary-toolbar-divider"></span>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn"
                            >
                              ☰
                            </button>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn"
                            >
                              ☷
                            </button>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn"
                            >
                              ☑
                            </button>

                            <span className="ToursItinerary-toolbar-divider"></span>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn"
                            >
                              🔗
                            </button>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn"
                            >
                              ▧
                            </button>

                          </div>

                          <textarea
                            className="ToursItinerary-editor-input"
                            rows="5"
                            value={day.description}
                            onChange={(e) =>
                              handleDescriptionChange(
                                day.id,
                                e.target.value
                              )
                            }
                            placeholder="Write detailed itinerary description..."
                          />

                        </div>

                      </div>

                      {/* HIGHLIGHTS */}

                      <div className="ToursItinerary-form-group">

                        <label className="ToursItinerary-label">
                          Highlights
                        </label>

                        <div className="ToursItinerary-highlights-container">

                          {day.highlights.map((item, idx) => (

                            <div
                              key={idx}
                              className="ToursItinerary-highlight-item"
                            >

                              <span className="ToursItinerary-highlight-check">
                                ✓
                              </span>

                              <input
                                type="text"
                                className="ToursItinerary-highlight-input"
                                value={item}
                                placeholder="Add highlight"
                                onChange={(e) =>
                                  handleHighlightChange(
                                    day.id,
                                    idx,
                                    e.target.value
                                  )
                                }
                              />

                              <button
                                type="button"
                                className="ToursItinerary-highlight-delete-btn"
                                onClick={() =>
                                  removeHighlight(day.id, idx)
                                }
                              >
                                ✕
                              </button>

                            </div>

                          ))}

                        </div>

                        <button
                          type="button"
                          className="ToursItinerary-btn-add-highlight"
                          onClick={() => addHighlight(day.id)}
                        >
                          + Add Highlight
                        </button>

                      </div>

                    </div>

                  )}

                </div>

              ))}

            </div>

            <div className="ToursItinerary-footer">

              <button
                type="button"
                className="ToursItinerary-btn-add-day"
                onClick={addNewDay}
              >
                + Add New Day
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default ToursItinerary;