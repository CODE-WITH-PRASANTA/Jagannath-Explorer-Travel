import React, { useState } from 'react';
import './TourDetailsFaq.css';

// React Icons
import { FaPlus, FaMinus } from 'react-icons/fa';

const TourDetailsFaq = ({ faqs }) => {
  let parsedFaqs = [];
  if (faqs) {
    if (Array.isArray(faqs)) {
      parsedFaqs = faqs;
    } else if (typeof faqs === 'string') {
      try {
        const parsed = JSON.parse(faqs);
        if (Array.isArray(parsed)) parsedFaqs = parsed;
      } catch {
        parsedFaqs = [];
      }
    }
  }

  if (parsedFaqs.length === 0) {
    parsedFaqs = [
      {
        number: "01",
        question: "How do I confirm my tour booking with Jagannath Explorer Travel?",
        answer: "You can book directly by clicking 'Book Now' via WhatsApp, submitting the quick inquiry form, or calling our helpline at +91 96688 92441. Our team will send your booking confirmation immediately."
      },
      {
        number: "02",
        question: "Is temple VIP Darshan assistance included in the package?",
        answer: "Yes, our experienced local tour guides assist you with seamless darshan, ritual understanding, and obtaining sacred temple Mahaprasad without hassles."
      },
      {
        number: "03",
        question: "Can the tour itinerary and pickup locations be customized?",
        answer: "Absolutely! We customize pickups from Bhubaneswar Airport (BBI), Puri Railway Station, or your hotel according to your travel schedule and family requirements."
      },
      {
        number: "04",
        question: "What type of vehicles are provided for the tour?",
        answer: "We offer well-maintained, clean, air-conditioned Sedans (Dzire/Etios), SUVs (Innova/Ertiga/Crysta), and Tempo Travellers with courteous professional drivers."
      }
    ];
  }

  const dynamicFaqList = parsedFaqs.map((f, idx) => ({
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