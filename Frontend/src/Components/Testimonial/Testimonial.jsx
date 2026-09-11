import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaFacebookF, FaGoogle } from 'react-icons/fa';
import { SiTripadvisor } from 'react-icons/si';
import './Testimonial.css';
import API, { IMG_URL } from "../../api/axios";

const Testimonial = () => {
  const [allReviewsData, setAllReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch Testimonials from Backend API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await API.get('/testimonials');
        // Assuming your backend returns { success: true, data: [...] }
        if (response.data && response.data.success) {
          // Map backend schema keys to match your frontend template variables if needed
          const formattedReviews = response.data.data.map((item) => ({
            id: item._id,
            platform: item.platform ? item.platform.toLowerCase() : 'all',
            name: item.reviewer,
            location: item.location,
            date: item.formattedDate || item.date,
            time: item.formattedTime || item.time,
            rating: item.rating,
            text: item.reviewText,
            // Handle absolute vs relative image URLs if uploaded via multer
            avatar: item.avatar && item.avatar.startsWith('http') 
              ? item.avatar 
              : `${IMG_URL || 'http://localhost:5000'}${item.avatar}`
          }));
          setAllReviewsData(formattedReviews);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
    : allReviewsData.filter((item) => item.platform === activeTab || item.platform === activeTab.toLowerCase());

  // डेस्कटॉप पर 3 कार्ड्स, मोबाइल पर 1 कार्ड
  const cardsPerPage = isMobile ? 1 : 3;
  const maxStartIndex = Math.max(0, filteredReviews.length - cardsPerPage);

  // टैब बदलते ही इंडेक्स 0 पर रीसेट
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentIndex(0);
  };

  // नेक्स्ट और प्रीवियस नेविगेशन
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

  if (loading) {
    return <div className="testimonial-section"><p style={{ textAlign: 'center' }}>Loading reviews...</p></div>;
  }

  if (error) {
    return <div className="testimonial-section"><p style={{ textAlign: 'center', color: 'red' }}>{error}</p></div>;
  }

  if (allReviewsData.length === 0) {
    return null; // Don't render section if there are no reviews
  }

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