import React, { useState } from 'react';
import './ToursItinerary.css';

const initialItinerary = [
  {
    id: 1,
    dayNumber: 'Day 01',
    title: 'Departure',
    description:
      'Arrive Cairo airport, welcome greeting by our representative who will assist you and provide transfers to your Hotel in Cairo.',
    highlights: [
      'Admire Big Ben, Buckingham Palace And St Paul’s Cathedral',
      'Chance To Spot Prominent Landmarks Of The City',
    ],
    isOpen: true,
  },
  {
    id: 2,
    dayNumber: 'Day 02',
    title: 'Adventure Begins',
    description: '',
    highlights: [],
    isOpen: false,
  },
  {
    id: 3,
    dayNumber: 'Day 03',
    title: 'Historical Tour',
    description: '',
    highlights: [],
    isOpen: false,
  },
  {
    id: 4,
    dayNumber: 'Day 04',
    title: 'Rest & Tour',
    description: '',
    highlights: [],
    isOpen: false,
  },
  {
    id: 5,
    dayNumber: 'Day 05',
    title: 'Return',
    description: '',
    highlights: [],
    isOpen: false,
  },
];

const ToursItinerary = () => {
  const [days, setDays] = useState(initialItinerary);
  const [isSectionOpen, setIsSectionOpen] = useState(true);

  const toggleSection = () => {
    setIsSectionOpen((prev) => !prev);
  };

  const toggleAccordion = (id) => {
    setDays((prev) =>
      prev.map((day) => (day.id === id ? { ...day, isOpen: !day.isOpen } : day))
    );
  };

  const handleTitleChange = (id, value) => {
    setDays((prev) =>
      prev.map((day) => (day.id === id ? { ...day, title: value } : day))
    );
  };

  const handleDescriptionChange = (id, value) => {
    setDays((prev) =>
      prev.map((day) => (day.id === id ? { ...day, description: value } : day))
    );
  };

  const handleHighlightChange = (dayId, index, value) => {
    setDays((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;
        const newHighlights = [...day.highlights];
        newHighlights[index] = value;
        return { ...day, highlights: newHighlights };
      })
    );
  };

  const addHighlight = (dayId) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === dayId ? { ...day, highlights: [...day.highlights, ''] } : day
      )
    );
  };

  const removeHighlight = (dayId, index) => {
    setDays((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;
        const newHighlights = day.highlights.filter((_, i) => i !== index);
        return { ...day, highlights: newHighlights };
      })
    );
  };

  const addNewDay = () => {
    const nextNum = days.length + 1;
    const formattedNum = nextNum < 10 ? `Day 0${nextNum}` : `Day ${nextNum}`;
    const newDayItem = {
      id: Date.now(),
      dayNumber: formattedNum,
      title: '',
      description: '',
      highlights: [],
      isOpen: true,
    };
    setDays((prev) => [...prev, newDayItem]);
  };

  return (
    <div className="ToursItinerary">
      <div className="ToursItinerary-container">
        {/* Main Section Header with Section Toggle Chevron */}
        <div
          className="ToursItinerary-header"
          onClick={toggleSection}
          role="button"
          tabIndex={0}
        >
          <div className="ToursItinerary-header-left">
            <div className="ToursItinerary-title-row">
              <h2 className="ToursItinerary-heading">3. Itinerary</h2>
            </div>
            <p className="ToursItinerary-subtitle">
              Add day by day itinerary for this tour package
            </p>
          </div>

          <button
            type="button"
            className="ToursItinerary-section-toggle-btn"
            aria-label="Toggle section"
          >
            <svg
              className={`ToursItinerary-section-chevron ${
                isSectionOpen ? 'open' : ''
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

        {/* Collapsible Section Body */}
        {isSectionOpen && (
          <div className="ToursItinerary-content-wrap">
            {/* Accordion List */}
            <div className="ToursItinerary-list">
              {days.map((day) => (
                <div
                  key={day.id}
                  className={`ToursItinerary-accordion-card ${
                    day.isOpen ? 'ToursItinerary-accordion-card-expanded' : ''
                  }`}
                >
                  {/* Accordion Row Header */}
                  <div
                    className="ToursItinerary-accordion-header"
                    onClick={() => toggleAccordion(day.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ToursItinerary-accordion-left">
                      <span className="ToursItinerary-day-tag">{day.dayNumber}</span>
                      <span className="ToursItinerary-day-title-preview">
                        {day.title || 'Departure'}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="ToursItinerary-row-toggle-btn"
                      aria-label="Toggle row"
                    >
                      <svg
                        className={`ToursItinerary-chevron-icon ${
                          day.isOpen ? 'ToursItinerary-chevron-icon-open' : ''
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

                  {/* Accordion Row Body */}
                  {day.isOpen && (
                    <div className="ToursItinerary-accordion-body">
                      {/* Day Title Input */}
                      <div className="ToursItinerary-form-group">
                        <label className="ToursItinerary-label">
                          Day Title <span className="ToursItinerary-required">*</span>
                        </label>
                        <input
                          type="text"
                          className="ToursItinerary-input"
                          value={day.title}
                          onChange={(e) => handleTitleChange(day.id, e.target.value)}
                          placeholder="Departure"
                        />
                      </div>

                      {/* Description Rich Text Editor */}
                      <div className="ToursItinerary-form-group">
                        <label className="ToursItinerary-label">
                          Description <span className="ToursItinerary-required">*</span>
                        </label>
                        <div className="ToursItinerary-editor-card">
                          <div className="ToursItinerary-editor-toolbar">
                            <select
                              className="ToursItinerary-editor-select"
                              defaultValue="Normal"
                            >
                              <option value="Normal">Normal</option>
                              <option value="Heading 1">Heading 1</option>
                              <option value="Heading 2">Heading 2</option>
                            </select>

                            <button type="button" className="ToursItinerary-editor-btn icon-btn" title="Format">
                              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                                <circle cx="12" cy="7" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="12" cy="17" r="1.5" />
                              </svg>
                            </button>

                            <button
                              type="button"
                              className="ToursItinerary-editor-btn ToursItinerary-editor-btn-bold"
                              title="Bold"
                            >
                              B
                            </button>
                            <button
                              type="button"
                              className="ToursItinerary-editor-btn ToursItinerary-editor-btn-italic"
                              title="Italic"
                            >
                              I
                            </button>
                            <button
                              type="button"
                              className="ToursItinerary-editor-btn ToursItinerary-editor-btn-underline"
                              title="Underline"
                            >
                              U
                            </button>
                            <button
                              type="button"
                              className="ToursItinerary-editor-btn ToursItinerary-editor-btn-strikethrough"
                              title="Strikethrough"
                            >
                              S
                            </button>

                            <button type="button" className="ToursItinerary-editor-btn" title="Align Left">
                              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="15" y2="12" />
                                <line x1="3" y1="18" x2="19" y2="18" />
                              </svg>
                            </button>

                            <button type="button" className="ToursItinerary-editor-btn" title="Bullet List">
                              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                                <line x1="9" y1="6" x2="20" y2="6" />
                                <line x1="9" y1="12" x2="20" y2="12" />
                                <line x1="9" y1="18" x2="20" y2="18" />
                                <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                                <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                              </svg>
                            </button>

                            <button type="button" className="ToursItinerary-editor-btn" title="Numbered List">
                              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                                <line x1="10" y1="6" x2="20" y2="6" />
                                <line x1="10" y1="12" x2="20" y2="12" />
                                <line x1="10" y1="18" x2="20" y2="18" />
                                <path d="M4 6h2v-2" />
                                <path d="M4 10h2l-2 2h2" />
                              </svg>
                            </button>

                            <button type="button" className="ToursItinerary-editor-btn" title="Indent">
                              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                                <polyline points="7 8 3 12 7 16" />
                                <line x1="21" y1="12" x2="11" y2="12" />
                                <line x1="21" y1="6" x2="11" y2="6" />
                                <line x1="21" y1="18" x2="11" y2="18" />
                              </svg>
                            </button>

                            <button type="button" className="ToursItinerary-editor-btn" title="Insert Link">
                              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                              </svg>
                            </button>

                            <button type="button" className="ToursItinerary-editor-btn" title="Insert Image">
                              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                              </svg>
                            </button>
                          </div>
                          <textarea
                            className="ToursItinerary-editor-input"
                            rows="4"
                            value={day.description}
                            onChange={(e) => handleDescriptionChange(day.id, e.target.value)}
                            placeholder="Arrive Cairo airport, welcome greeting by our representative who will assist you and provide transfers to your Hotel in Cairo."
                          />
                        </div>
                      </div>

                      {/* Highlights Field */}
                      <div className="ToursItinerary-form-group">
                        <label className="ToursItinerary-label">Highlights</label>
                        <div className="ToursItinerary-highlights-container">
                          {day.highlights.map((item, idx) => (
                            <div key={idx} className="ToursItinerary-highlight-item">
                              <span className="ToursItinerary-highlight-check">✓</span>
                              <input
                                type="text"
                                className="ToursItinerary-highlight-input"
                                value={item}
                                onChange={(e) =>
                                  handleHighlightChange(day.id, idx, e.target.value)
                                }
                                placeholder="Add Highlight"
                              />
                              <button
                                type="button"
                                className="ToursItinerary-highlight-delete-btn"
                                onClick={() => removeHighlight(day.id, idx)}
                                title="Delete highlight"
                              >
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
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

            {/* Bottom Add Day Action */}
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