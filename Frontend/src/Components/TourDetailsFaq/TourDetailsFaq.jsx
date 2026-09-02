import React, { useState } from 'react';
import './TourDetailsFaq.css';

// React Icons
import { FaPlus, FaMinus } from 'react-icons/fa';

const TourDetailsFaq = () => {
  // Array of FAQ questions matching the exact reference text
  const faqData = [
    {
      id: 1,
      number: "01.",
      question: "How Do I Book A Trip On Your Website?",
      answer:
        "Aptent taciti sociosqu ad litora torquent per conubia nostra, per inci only Integer purus onthis felis non aliquam.Mauris nec just vitae ann auctor tol euismod sit amet non ipsul growing this.",
    },
    {
      id: 2,
      number: "02.",
      question: "What Payment Methods Do You Accept?",
      answer:
        "We accept all major credit cards, debit cards, net banking, UPI, and online wallet payments through our secure checkout system provided by Jagannatha Tour and Travels.",
    },
    {
      id: 3,
      number: "03.",
      question: "Can I Make Changes To My Reservation After Booking?",
      answer:
        "Yes, you can request changes to your reservation by contacting our customer support team or managing your booking through your account portal prior to the departure date.",
    },
    {
      id: 4,
      number: "04.",
      question: "What Is Your Cancellation Policy?",
      answer:
        "Cancellations made 7 days prior to departure are eligible for a full refund. Please review our detailed terms and conditions for specific tour package guidelines.",
    },
    {
      id: 5,
      number: "05.",
      question: "Do You Offer Group Booking Discounts?",
      answer:
        "Yes, Jagannatha Tour and Travels offers special discounted rates and custom itineraries for group bookings of 10 or more travelers.",
    },
  ];

  // Set first item open by default as shown in reference image
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Structured Schema markup for SEO optimization
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
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
          Frequently Asked & Question
        </h2>

        {/* Accordion Container */}
        <div className="TourDetailsFaq-list">
          {faqData.map((item) => {
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