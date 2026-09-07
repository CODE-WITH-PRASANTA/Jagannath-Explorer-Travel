import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaFacebookF, FaGoogle } from 'react-icons/fa';
import { SiTripadvisor } from 'react-icons/si';
import './Testimonial.css';

// =========================================================================
// 👉 अपनी लोकल अवतार इमेजेस इम्पोर्ट करने के लिए नीचे अनकमेंट करें:
// =========================================================================
// import userImg1 from './assets/liam.jpg';
// import userImg2 from './assets/jack.jpg';
// import userImg3 from './assets/mateo.jpg';
// import userImg4 from './assets/sophia.jpg';
// import userImg5 from './assets/arjun.jpg';
// import userImg6 from './assets/elena.jpg';

const allReviewsData = [
  {
    id: 1,
    platform: 'tripadvisor',
    name: 'Liam Nohkan',
    location: 'Istanbul',
    date: 'May 9, 2023',
    time: '10.30 PM',
    rating: 5,
    text: '“I love Tour! This is an amazing service and it has saved me and my small business so much time. I plan to use it for a long time to come. And i travel with TripRex again ”',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    platform: 'facebook',
    name: 'Jack Michael',
    location: 'Bangladesh',
    date: 'May 9, 2023',
    time: '10.30 PM',
    rating: 5,
    text: '“Duis ac est tincidunt, bibendum eros attendato, dignissim purus. Nunc posuere ornare velitbon, bibendum venenatis metus bibendum admora. Aliquam at vestibulum.”',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    platform: 'google',
    name: 'Mateo Daniel',
    location: 'Indonesia',
    date: 'May 9, 2023',
    time: '10.30 PM',
    rating: 5,
    text: '“I cannot express enough how satisfied I am with the web development services provided by Egens Lab. From the initial consultation to the final delivery, they have exceeded.”',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    platform: 'tripadvisor',
    name: 'Sophia Reynolds',
    location: 'London, UK',
    date: 'Jun 14, 2023',
    time: '04.15 PM',
    rating: 5,
    text: '“Booking our Himalayan trek through TripRex was effortless. The local guides were attentive, food was outstanding, and every hotel stop exceeded our expectations.”',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    platform: 'facebook',
    name: 'Arjun Verma',
    location: 'New Delhi, India',
    date: 'Jul 21, 2023',
    time: '08.45 PM',
    rating: 5,
    text: '“Super responsive 24/7 customer support! When our internal flight got delayed in Cairo, their travel desk rescheduled our entire itinerary within thirty minutes.”',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    platform: 'google',
    name: 'Elena Rostova',
    location: 'Prague, Czech',
    date: 'Aug 03, 2023',
    time: '11.00 AM',
    rating: 5,
    text: '“Transparent pricing with zero hidden charges. Best travel packages hands down. The private gondola ride booked through TripRex in Venice was pure magic.”',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
  }
];

const Testimonial = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // मोबाइल स्क्रीन डिटेक्शन (<= 650px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // फ़िल्टर किए गए रिव्यू
  const filteredReviews = activeTab === 'all'
    ? allReviewsData
    : allReviewsData.filter((item) => item.platform === activeTab);

  // डेस्कटॉप पर 3 कार्ड्स, मोबाइल पर 1 कार्ड
  const cardsPerPage = isMobile ? 1 : 3;
  const maxStartIndex = Math.max(0, filteredReviews.length - cardsPerPage);

  // टैब बदलते ही इंडेक्स 0 पर रीसेट
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentIndex(0);
  };

  // नेक्स्ट और प्रीवियस नेविगेशन (मोबाइल पर 1-दर-1, डेस्कटॉप पर 3-दर-3)
  const handlePrev = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredReviews.length - 1));
    } else {
      setCurrentIndex((prev) => (prev <= 0 ? maxStartIndex : Math.max(0, prev - cardsPerPage)));
    }
  };

  const handleNext = () => {
    if (isMobile) {
      setCurrentIndex((prev) => (prev < filteredReviews.length - 1 ? prev + 1 : 0));
    } else {
      setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : Math.min(maxStartIndex, prev + cardsPerPage)));
    }
  };

  // ऑटो स्लाइडर (हर 5 सेकंड में स्लाइड)
  useEffect(() => {
    if (isPaused || filteredReviews.length <= cardsPerPage) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, filteredReviews.length, maxStartIndex, isMobile]);

  // वर्तमान में दिखाए जा रहे कार्ड्स
  const displayedReviews = isMobile
    ? [filteredReviews[currentIndex]].filter(Boolean)
    : filteredReviews.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        {/* Header */}
        <div className="testimonial-header">
          <div className="testimonial-badge">
            <span className="badge-arrow">➔</span>
            <span>Testimonial</span>
            <span className="badge-sparkle">✦</span>
          </div>
          <h2 className="testimonial-main-title">Regards From Travelers</h2>
        </div>

        {/* Platform Selector Pill Bar */}
        <div className="platform-nav-pill">
          <button
            type="button"
            className={`pill-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabChange('all')}
          >
            All Reviews
          </button>
          <button
            type="button"
            className={`pill-btn ${activeTab === 'tripadvisor' ? 'active' : ''}`}
            onClick={() => handleTabChange('tripadvisor')}
          >
            <SiTripadvisor className="platform-icon tripadvisor-color" />
            <span>Tripadvisor</span>
          </button>
          <button
            type="button"
            className={`pill-btn ${activeTab === 'facebook' ? 'active' : ''}`}
            onClick={() => handleTabChange('facebook')}
          >
            <span className="circle-fb-icon"><FaFacebookF /></span>
            <span>Facebook</span>
          </button>
          <button
            type="button"
            className={`pill-btn ${activeTab === 'google' ? 'active' : ''}`}
            onClick={() => handleTabChange('google')}
          >
            <span className="circle-g-icon"><FaGoogle /></span>
            <span>Google</span>
          </button>
        </div>

        {/* Slider Area With Left & Right Arrows */}
        <div
          className="slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            className="nav-arrow-btn left-arrow"
            onClick={handlePrev}
            aria-label="Previous Reviews"
          >
            <FaChevronLeft />
          </button>

          {/* Cards Grid */}
          <div className="reviews-3x3-grid">
            {displayedReviews.map((review) => (
              <div key={review.id} className="review-unit">
                {/* Speech Bubble Card Box */}
                <div className="speech-bubble-box">
                  <p className="review-quote-text">{review.text}</p>

                  <div className="card-meta-bottom">
                    {/* 5 Yellow Stars */}
                    <div className="stars-row">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="star-char">★</span>
                      ))}
                    </div>

                    {/* Watermark Quote Mark */}
                    <div className="quote-watermark-icon" aria-hidden="true">
                      ❞
                    </div>

                    {/* Timestamp */}
                    <div className="timestamp-block">
                      <span className="date-str">{review.date}</span>
                      <span className="time-str">{review.time}</span>
                    </div>
                  </div>

                  {/* Speech Bubble Bottom Triangle Pointer */}
                  <div className="bubble-pointer-tail"></div>
                </div>

                {/* Traveler Profile Below Bubble */}
                <div className="traveler-profile-row">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="traveler-avatar"
                  />
                  <div className="traveler-details">
                    <h4 className="traveler-name">{review.name}</h4>
                    <span className="traveler-country">{review.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="nav-arrow-btn right-arrow"
            onClick={handleNext}
            aria-label="Next Reviews"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Mobile Indicator Dots */}
        {isMobile && filteredReviews.length > 1 && (
          <div className="mobile-dots-container">
            {filteredReviews.map((_, idx) => (
              <span
                key={idx}
                className={`mobile-dot ${currentIndex === idx ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;