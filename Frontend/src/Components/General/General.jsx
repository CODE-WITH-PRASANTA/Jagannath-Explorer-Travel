import React, { useState } from 'react';
import { FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';
import './General.css';

const generalFaqs = [
  {
    id: 'gen-1',
    number: '01',
    question: 'How Do I Book A Trip On Your Website?',
    answer: 'Browse our available packages or car rentals, select your preferred dates and destinations, and click "Book Now" to confirm your booking seamlessly.'
  },
  {
    id: 'gen-2',
    number: '02',
    question: 'What Payment Methods Do You Accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, digital wallets, and flexible offline advance payment options.'
  },
  {
    id: 'gen-3',
    number: '03',
    question: 'Can I Make Changes To My Reservation After Booking?',
    answer: 'Yes, you can modify your travel dates or details up to 24 hours prior to your scheduled trip through your dashboard or customer support.'
  },
  {
    id: 'gen-4',
    number: '04',
    question: 'What Is Your Cancellation Policy?',
    answer: 'Free cancellations are available up to 48 hours before departure. Cancellations made within 24 hours are subject to standard processing fees.'
  },
  {
    id: 'gen-5',
    number: '05',
    question: 'Do You Offer Group Booking Discounts?',
    answer: 'Yes, we provide special corporate and family group discounts on group sizes exceeding 6 passengers.'
  }
];

const travelTipsFaqs = [
  {
    id: 'tip-1',
    number: '01',
    question: 'What Is Your Payment Schedule And Process?',
    answer: 'Aptent taciti sociosqu ad litora torquent per conubia nostra, per inci only Integer purus onthis felis non aliquam. Mauris nec just vitae ann auctor tol euismod sit amet non ipsul growing this.'
  },
  {
    id: 'tip-2',
    number: '02',
    question: 'Are There Any Additional Fees Or Surcharges?',
    answer: 'No hidden fees. All toll taxes, state permits, and fuel surcharges are clearly mentioned before you confirm your payment.'
  },
  {
    id: 'tip-3',
    number: '03',
    question: 'Can I Transfer My Reservation To Another Person?',
    answer: 'Yes, reservations can be transferred to family members or colleagues by submitting identity proof prior to departure.'
  },
  {
    id: 'tip-4',
    number: '04',
    question: 'Can I Request A Private Tour For My Group?',
    answer: 'Absolutely. We offer customized private tours with dedicated chauffeur-driven vehicles tailored to your itinerary.'
  },
  {
    id: 'tip-5',
    number: '05',
    question: 'Do You Offer Special Rates For Group Bookings?',
    answer: 'Yes, special customized quotations are provided for school tours, destination weddings, and corporate outings.'
  }
];

const General = () => {
  // 'tip-1' stays open by default
  const [activeFaq, setActiveFaq] = useState('tip-1');

  const toggleFaq = (id) => {
    setActiveFaq((prev) => (prev === id ? null : id));
  };

  const handleBookNow = () => {
    alert('Booking 50% Off Offer...');
  };

  const renderAccordion = (list) =>
    list.map((faq) => {
      const isOpen = activeFaq === faq.id;
      return (
        <div
          key={faq.id}
          className={`general-faq__item ${isOpen ? 'general-faq__item--open' : ''}`}
        >
          <button
            type="button"
            className="general-faq__question-bar"
            onClick={() => toggleFaq(faq.id)}
          >
            <span className="general-faq__question-text">
              <strong className="general-faq__number">{faq.number}.</strong> {faq.question}
            </span>
            <span className="general-faq__icon">
              {isOpen ? <FaMinus /> : <FaPlus />}
            </span>
          </button>

          {isOpen && (
            <div className="general-faq__answer-box">
              <p className="general-faq__answer-text">{faq.answer}</p>
            </div>
          )}
        </div>
      );
    });

  return (
    <section className="general-faq">
      <div className="general-faq__container">

        <div className="general-faq__layout-grid">

          {/* left - sticky 50% off promo card */}
          <aside className="general-faq__sidebar">
            <div className="general-faq__promo-card">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=900&auto=format&fit=crop"
                alt="Family on dock by the lake with dog"
                className="general-faq__promo-bg"
              />
              <div className="general-faq__promo-overlay" />

              <div className="general-faq__promo-badge-box">
                <span className="general-faq__promo-cursive">Savings worldwide</span>
                <div className="general-faq__promo-row">
                  <div className="general-faq__promo-offer">
                    <h2 className="general-faq__promo-discount">50% Off</h2>
                    <p className="general-faq__promo-sub">For Your First Book</p>
                  </div>
                  <button
                    type="button"
                    className="general-faq__promo-btn"
                    onClick={handleBookNow}
                  >
                    <span>Book Now</span>
                    <FaArrowRight className="general-faq__promo-btn-arrow" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* right - General + Travel Tips accordions */}
          <main className="general-faq__content">

            <div className="general-faq__block">
              <h2 className="general-faq__title">
                General <span className="general-faq__star-badge">✻</span>
              </h2>

              <div className="general-faq__accordion-list">
                {renderAccordion(generalFaqs)}
              </div>
            </div>

            <div className="general-faq__block">
              <h2 className="general-faq__title">
                Travel Tips <span className="general-faq__star-badge">✻</span>
              </h2>

              <div className="general-faq__accordion-list">
                {renderAccordion(travelTipsFaqs)}
              </div>
            </div>

          </main>

        </div>

      </div>
    </section>
  );
};

export default General;