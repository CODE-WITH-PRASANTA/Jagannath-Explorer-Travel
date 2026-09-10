import React, { useState } from 'react';
import './TourDetailsFaq.css';

// React Icons
import { FaPlus, FaMinus } from 'react-icons/fa';

const TourDetailsFaq = ({ faqs }) => {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const dynamicFaqList = faqs.map((f, idx) => ({
    id: idx + 1,
    number: f.number ? `${f.number}.` : `${String(idx + 1).padStart(2, '0')}.`,
    question: f.question,
    answer: f.answer,
  }));

  // Set first item open by default
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Structured Schema markup for SEO optimization
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dynamicFaqList.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section className="TourDetailsFaq" aria-labelledby="faq-title">
      {/* Dynamic SEO JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="TourDetailsFaq-container">
        {/* Header Title */}
        <h2 id="faq-title" className="TourDetailsFaq-heading">
          Frequently Asked Questions
        </h2>

        {/* Accordion Container */}
        <div className="TourDetailsFaq-list">
          {dynamicFaqList.map((item) => {
            const isOpen = openId === item.id;
            return (
              <article
                key={item.id}
                className={`TourDetailsFaq-item ${isOpen ? 'TourDetailsFaq-active' : ''}`}
              >
                <div
                  className="TourDetailsFaq-header"
                  onClick={() => toggleFaq(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFaq(item.id);
                    }
                  }}
                >
                  <h3 className="TourDetailsFaq-question">
                    <span className="TourDetailsFaq-number">{item.number}</span>{' '}
                    {item.question}
                  </h3>
                  <div className="TourDetailsFaq-iconWrapper">
                    {isOpen ? (
                      <FaMinus className="TourDetailsFaq-icon" />
                    ) : (
                      <FaPlus className="TourDetailsFaq-icon" />
                    )}
                  </div>
                </div>

                <div className={`TourDetailsFaq-body ${isOpen ? 'TourDetailsFaq-show' : ''}`}>
                  <p className="TourDetailsFaq-answer">{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TourDetailsFaq;