import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import "./ToursFAQSection.css";

const initialFaqs = [];

const ToursFAQSection = ({
  faqs: externalFaqs,
  setFaqs: externalSetFaqs,
}) => {
  const [internalFaqs, setInternalFaqs] = useState(initialFaqs);

  const faqs = externalFaqs || internalFaqs;
  const setFaqs = externalSetFaqs || setInternalFaqs;

  const [isSectionOpen, setIsSectionOpen] = useState(true);

  const toggleSection = () => {
    setIsSectionOpen((prev) => !prev);
  };

  const toggleFaq = (id) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id
          ? { ...faq, isOpen: !faq.isOpen }
          : faq
      )
    );
  };

  const handleQuestionChange = (id, value) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id
          ? { ...faq, question: value }
          : faq
      )
    );
  };

  const handleAnswerChange = (id, value) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id
          ? { ...faq, answer: value }
          : faq
      )
    );
  };

  const handleDeleteFaq = (id, e) => {
    if (e) e.stopPropagation();

    setFaqs((prevFaqs) =>
      prevFaqs.filter((faq) => faq.id !== id)
    );
  };

  const handleAddNewFaq = () => {
    const nextId = Date.now();
    const nextIndex = faqs.length + 1;

    const formattedNumber =
      nextIndex < 10
        ? `0${nextIndex}`
        : `${nextIndex}`;

    const newFaq = {
      id: nextId,
      number: formattedNumber,
      question: "",
      answer: "",
      isOpen: true,
    };

    setFaqs((prev) => [...prev, newFaq]);
  };

  return (
    <div className="faq-page-wrapper">
      <div className="faq-card-container">

        {/* =====================================================
            MAIN SECTION HEADER
        ===================================================== */}

        <div
          className="faq-main-header"
          onClick={toggleSection}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleSection();
            }
          }}
        >
          <div className="faq-title-area">

            {/* Header Icon */}
            <div className="faq-header-icon-wrap">
              <svg
                className="faq-help-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M9.4 9a2.7 2.7 0 1 1 5.25 1c0 1.8-2.65 2.6-2.65 4.1" />
                <circle
                  cx="12"
                  cy="17.4"
                  r=".7"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>

            {/* Header Text */}
            <div className="faq-header-content">
              <h2 className="faq-title">
                5. FAQ Section
              </h2>

              <p className="faq-subtitle">
                Create helpful questions and answers for your tour
              </p>
            </div>
          </div>

          {/* Section Toggle */}
          <button
            type="button"
            className="faq-chevron-btn"
            aria-label={
              isSectionOpen
                ? "Collapse FAQ section"
                : "Expand FAQ section"
            }
            onClick={(e) => {
              e.stopPropagation();
              toggleSection();
            }}
          >
            <svg
              className={`faq-chevron-icon ${
                isSectionOpen ? "open" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* =====================================================
            COLLAPSIBLE BODY
        ===================================================== */}

        {isSectionOpen && (
          <div className="faq-body-content">

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {faqs.length === 0 ? (
              <div className="faq-empty-hint">

                <div className="faq-empty-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M9.4 9a2.7 2.7 0 1 1 5.25 1c0 1.8-2.65 2.6-2.65 4.1" />
                    <circle
                      cx="12"
                      cy="17.4"
                      r=".7"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </div>

                <div className="faq-empty-content">
                  <h3>No FAQs added yet</h3>

                  <p>
                    Add frequently asked questions to help
                    visitors understand your tour better.
                  </p>
                </div>

                <button
                  type="button"
                  className="faq-empty-add-btn"
                  onClick={handleAddNewFaq}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>

                  Add First FAQ
                </button>
              </div>
            ) : (
              <div className="faq-list">

                {/* =================================================
                    FAQ ITEMS
                ================================================= */}

                {faqs.map((faq, idx) => (
                  <div
                    key={faq.id}
                    className={`faq-item-card ${
                      faq.isOpen
                        ? "faq-item-card-expanded"
                        : ""
                    }`}
                  >

                    {/* =============================================
                        QUESTION HEADER
                    ============================================= */}

                    <div className="faq-item-header">

                      <div className="faq-item-title-group">

                        <span className="faq-badge q-badge">
                          {faq.number ||
                            (idx + 1 < 10
                              ? `0${idx + 1}`
                              : `${idx + 1}`)}
                        </span>

                        <div className="faq-question-wrap">

                          <span className="faq-question-label">
                            Question
                          </span>

                          <input
                            type="text"
                            className="faq-input-question"
                            placeholder="Write your FAQ question here..."
                            value={faq.question}
                            onChange={(e) =>
                              handleQuestionChange(
                                faq.id,
                                e.target.value
                              )
                            }
                            onClick={(e) =>
                              e.stopPropagation()
                            }
                          />
                        </div>
                      </div>

                      {/* Header Actions */}
                      <div className="faq-item-header-actions">

                        <button
                          type="button"
                          className="faq-delete-btn"
                          onClick={(e) =>
                            handleDeleteFaq(faq.id, e)
                          }
                          title="Delete FAQ"
                          aria-label="Delete FAQ"
                        >
                          <FiTrash2 />
                        </button>

                        <button
                          type="button"
                          className={`faq-toggle-btn ${
                            faq.isOpen
                              ? "faq-toggle-active"
                              : ""
                          }`}
                          onClick={() =>
                            toggleFaq(faq.id)
                          }
                          aria-label={
                            faq.isOpen
                              ? "Collapse answer"
                              : "Expand answer"
                          }
                        >
                          <svg
                            className="faq-action-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {faq.isOpen ? (
                              <polyline points="6 15 12 9 18 15" />
                            ) : (
                              <polyline points="6 9 12 15 18 9" />
                            )}
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* =============================================
                        ANSWER
                    ============================================= */}

                    <div
                      className={`faq-item-collapse ${
                        faq.isOpen ? "expanded" : ""
                      }`}
                    >
                      <div className="faq-item-body">

                        <div className="faq-answer-container">

                          <div className="faq-answer-heading">

                            <div className="faq-answer-badge">
                              A
                            </div>

                            <div>
                              <span className="faq-answer-label">
                                Answer
                              </span>

                              <span className="faq-answer-helper">
                                Provide a clear and useful response
                              </span>
                            </div>
                          </div>

                          <textarea
                            className="faq-textarea-answer"
                            rows={4}
                            placeholder="Write a detailed answer for this FAQ..."
                            value={faq.answer}
                            onChange={(e) =>
                              handleAnswerChange(
                                faq.id,
                                e.target.value
                              )
                            }
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* =================================================
                ADD FAQ ACTION
            ================================================= */}

            {faqs.length > 0 && (
              <div className="faq-actions">

                <button
                  type="button"
                  className="faq-add-btn"
                  onClick={handleAddNewFaq}
                >
                  <svg
                    className="add-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>

                  <span>Add New FAQ</span>
                </button>

                <span className="faq-count-text">
                  {faqs.length}{" "}
                  {faqs.length === 1 ? "FAQ" : "FAQs"} added
                </span>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursFAQSection;