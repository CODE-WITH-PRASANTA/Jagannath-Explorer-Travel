import React, { useState } from 'react';
import './ToursFAQSection.css';

const initialFaqs = [
  {
    id: 1,
    number: '01',
    question: 'How Do I Book A Trip On Your Website?',
    answer:
      'You can easily book a trip by selecting your desired tour, choosing travel dates, and completing the booking form.',
    isOpen: true,
  },
];

const ToursFAQSection = () => {
  const [faqs, setFaqs] = useState(initialFaqs);
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

  const handleAddNewFaq = () => {
    const nextId = faqs.length + 1;
    const formattedNumber = nextId < 10 ? `0${nextId}` : `${nextId}`;
    const newFaq = {
      id: nextId,
      number: formattedNumber,
      question: `New Frequently Asked Question #${nextId}`,
      answer:
        'Fill in the relevant answer or guidance steps for this query so your users can navigate smoothly.',
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
              <p className="faq-subtitle">Frequently Asked Questions</p>
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
            <div className="faq-list">
              {faqs.map((faq) => (
                <div key={faq.id} className="faq-item-card">
                  {/* Question Row */}
                  <div
                    className="faq-item-header"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="faq-item-title-group">
                      <span className="faq-badge q-badge">Q</span>
                      <span className="faq-item-question">
                        {faq.number}. {faq.question}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="faq-toggle-btn"
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

                  {/* Expandable Answer Box */}
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
                        <p className="faq-answer-text">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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