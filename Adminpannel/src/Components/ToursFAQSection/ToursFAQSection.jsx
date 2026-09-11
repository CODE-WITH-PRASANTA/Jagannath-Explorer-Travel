import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import './ToursFAQSection.css';

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
        faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  const handleQuestionChange = (id, value) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id ? { ...faq, question: value } : faq
      )
    );
  };

  const handleAnswerChange = (id, value) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id ? { ...faq, answer: value } : faq
      )
    );
  };

  const handleDeleteFaq = (id, e) => {
    if (e) e.stopPropagation();
    setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
  };

  const handleAddNewFaq = () => {
    const nextId = Date.now();
    const nextIndex = faqs.length + 1;
    const formattedNumber = nextIndex < 10 ? `0${nextIndex}` : `${nextIndex}`;
    const newFaq = {
      id: nextId,
      number: formattedNumber,
      question: '',
      answer: '',
      isOpen: true,
    };
    setFaqs((prev) => [...prev, newFaq]);
  };

  return (
    <div className="faq-page-wrapper">
      <div className="faq-card-container">
        {/* Main Section Header */}
        <div className="faq-main-header" onClick={toggleSection}>
          <div className="faq-title-area">
            <div className="faq-header-icon-wrap">
              <svg
                className="faq-help-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h2 className="faq-title">5. FAQ Section</h2>
              <p className="faq-subtitle">Frequently Asked Questions (Writeable)</p>
            </div>
          </div>

          <button
            type="button"
            className="faq-chevron-btn"
            aria-label="Toggle entire FAQ section"
          >
            <svg
              className={`faq-chevron-icon ${isSectionOpen ? 'open' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>

        {/* Section Collapsible Content */}
        {isSectionOpen && (
          <div className="faq-body-content">
            {faqs.length === 0 ? (
              <div className="faq-empty-hint">
                <p>No FAQs added yet. Click <strong>"+ Add New FAQ"</strong> below to create writeable questions and answers.</p>
              </div>
            ) : (
              <div className="faq-list">
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="faq-item-card">
                    {/* Question Row (Editable) */}
                    <div className="faq-item-header">
                      <div className="faq-item-title-group">
                        <span className="faq-badge q-badge">
                          {faq.number || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)}
                        </span>
                        <input
                          type="text"
                          className="faq-input-question"
                          placeholder="Write FAQ question here (e.g. What is the booking process?)"
                          value={faq.question}
                          onChange={(e) => handleQuestionChange(faq.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      <div className="faq-item-header-actions">
                        <button
                          type="button"
                          className="faq-delete-btn"
                          onClick={(e) => handleDeleteFaq(faq.id, e)}
                          title="Delete FAQ"
                        >
                          <FiTrash2 />
                        </button>
                        <button
                          type="button"
                          className="faq-toggle-btn"
                          onClick={() => toggleFaq(faq.id)}
                          aria-label="Toggle answer visibility"
                        >
                          {faq.isOpen ? (
                            <svg
                              className="faq-action-icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          ) : (
                            <svg
                              className="faq-action-icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Answer Box (Editable) */}
                    <div
                      className={`faq-item-collapse ${
                        faq.isOpen ? 'expanded' : ''
                      }`}
                    >
                      <div className="faq-item-body">
                        <div className="faq-answer-container">
                          <div className="faq-answer-badge-row">
                            <span className="faq-badge a-badge">A</span>
                            <span className="faq-answer-label">Answer</span>
                          </div>
                          <textarea
                            className="faq-textarea-answer"
                            rows={3}
                            placeholder="Write detailed answer for this FAQ..."
                            value={faq.answer}
                            onChange={(e) => handleAnswerChange(faq.id, e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New FAQ Trigger */}
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
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Add New FAQ</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursFAQSection;