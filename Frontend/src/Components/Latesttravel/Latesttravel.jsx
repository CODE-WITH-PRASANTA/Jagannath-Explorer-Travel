import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Latesttravel.css';

// =========================================================================
// 👉 अपनी लोकल इमेजेस लगाने के लिए नीचे दी गई लाइनों को अनकमेंट (Uncomment) करें:
// =========================================================================
// import featuredCampfireImg from './assets/campfire-night.jpg';
// import cabinLakeImg from './assets/cabin-lake.jpg';
// import mountainJumpImg from './assets/mountain-jump.jpg';
// import hikerTrekImg from './assets/hiker-trek.jpg';

const dummyImages = {
  featured: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=900&auto=format&fit=crop&q=80',
  cabin: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
  jump: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80',
  trek: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80'
};

const featuredPostData = {
  id: 'featured-1',
  isFeatured: true,
  author: 'Rison Donec',
  dateText: 'Nov 10, 2022',
  comments: '5 Comment',
  title: 'Our Begin Now What Your Will Bean Forest This Our Agency.',
  image: dummyImages.featured
};

const rightPostsData = [
  {
    id: 1,
    isFeatured: false,
    dateDay: '20',
    dateMonth: 'August',
    author: 'Rison Donec',
    category: 'City Tour',
    title: 'Our Begin Now To Benign Onet What You Will Be.',
    readTime: '5 Min Read',
    image: dummyImages.cabin
  },
  {
    id: 2,
    isFeatured: false,
    dateDay: '16',
    dateMonth: 'July',
    author: 'Goran Jack',
    category: 'City Tour',
    title: 'Our Begin Now To Benign Onet What You Will Be.',
    readTime: '5 Min Read',
    image: dummyImages.jump
  },
  {
    id: 3,
    isFeatured: false,
    dateDay: '30',
    dateMonth: 'June',
    author: 'David Mitat',
    category: 'City Tour',
    title: 'Our Begin Now To Benign Onet What You Will Be.',
    readTime: '5 Min Read',
    image: dummyImages.trek
  }
];

// मोबाइल व्यू पर स्लाइड करने के लिए सभी 4 पोस्ट्स की एक कंबाइन्ड लिस्ट
const allMobilePosts = [featuredPostData, ...rightPostsData];

const Latesttravel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allMobilePosts.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < allMobilePosts.length - 1 ? prev + 1 : 0));
  };

  const handleViewPost = (postTitle) => {
    alert(`Opening article: "${postTitle}"`);
  };

  const handleSocialShare = (platform) => {
    alert(`Sharing post on ${platform}`);
  };

  // फीचर्ड कार्ड रेंडर करने का हेल्पर फंक्शन
  const renderFeaturedCard = (post) => (
    <article className="featured-card" key={post.id}>
      <div className="featured-img-wrap">
        <img
          src={post.image}
          alt={post.title}
          className="blog-img"
        />
        <div className="shine-overlay"></div>
      </div>

      <div className="featured-content">
        <div className="featured-meta">
          <span>By <button type="button" className="author-link">{post.author}</button></span>
          <span className="meta-dot">•</span>
          <span>{post.dateText}</span>
          <span className="meta-dot">•</span>
          <span>{post.comments}</span>
        </div>

        <h3 className="featured-title">{post.title}</h3>

        <div className="featured-footer">
          <button
            type="button"
            className="view-post-btn"
            onClick={() => handleViewPost(post.title)}
          >
            <span>View Post</span>
            <span className="arrow-circle">↗</span>
          </button>

          {/* Social Share Icons */}
          <div className="social-links-row">
            <button type="button" onClick={() => handleSocialShare('Facebook')} aria-label="Facebook">
              f
            </button>
            <button type="button" onClick={() => handleSocialShare('X (Twitter)')} aria-label="X">
              𝕏
            </button>
            <button type="button" onClick={() => handleSocialShare('Pinterest')} aria-label="Pinterest">
              ρ
            </button>
            <button type="button" onClick={() => handleSocialShare('Instagram')} aria-label="Instagram">
              📷
            </button>
          </div>
        </div>
      </div>
    </article>
  );

  // हॉरिजॉन्टल कार्ड रेंडर करने का हेल्पर फंक्शन
  const renderHorizontalCard = (post) => (
    <article className="horizontal-post-card" key={post.id}>
      <div className="horizontal-img-wrap">
        <img
          src={post.image}
          alt={post.title}
          className="blog-img"
        />
        <div className="shine-overlay"></div>

        {/* Circular Date Badge */}
        <div className="date-circle-badge">
          <span className="date-number">{post.dateDay}</span>
          <span className="date-month">{post.dateMonth}</span>
        </div>
      </div>

      <div className="horizontal-content">
        <div className="post-meta-top">
          <span>By <button type="button" className="author-link">{post.author}</button></span>
          <span className="meta-dot">•</span>
          <span className="category-text">{post.category}</span>
        </div>

        <h4 className="horizontal-title">{post.title}</h4>

        <div className="horizontal-footer">
          <button
            type="button"
            className="view-post-btn"
            onClick={() => handleViewPost(post.title)}
          >
            <span>View Post</span>
            <span className="arrow-circle">↗</span>
          </button>

          <div className="read-time-box">
            <span className="fire-icon">🔥</span>
            <span className="read-time-text">{post.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section className="latesttravel-section">
      {/* Background World Map & Tree Line Art */}
      <div className="bg-decorations" aria-hidden="true">
        <div className="bg-world-overlay"></div>
        <div className="bg-pine-trees">
          <svg viewBox="0 0 100 160" fill="none" stroke="#e1e8dc" strokeWidth="1.6">
            <path d="M40 30 L50 15 L60 30 L55 30 L66 45 L58 45 L72 65 L28 65 L42 45 L34 45 L45 30 Z M50 65 L50 80" />
            <path d="M15 70 L22 55 L29 70 L26 70 L34 85 L28 85 L38 105 L2 105 L12 85 L6 85 L14 70 Z M20 105 L20 120" />
          </svg>
        </div>
      </div>

      <div className="latesttravel-container">
        {/* Section Header */}
        <div className="latesttravel-header">
          <div className="latesttravel-badge">
            <span className="badge-arrow">➔</span>
            <span>Latest Blog</span>
            <span className="badge-sparkle">✦</span>
          </div>
          <h2 className="latesttravel-main-title">Latest Travel Blog</h2>
        </div>

        {/* ================= DESKTOP & TABLET VIEW (> 650px) ================= */}
        {!isMobile && (
          <div className="latesttravel-grid">
            {renderFeaturedCard(featuredPostData)}
            <div className="stacked-cards-col">
              {rightPostsData.map((post) => renderHorizontalCard(post))}
            </div>
          </div>
        )}

        {/* ================= MOBILE SLIDER VIEW (<= 650px) ================= */}
        {isMobile && (
          <div className="mobile-blog-slider-wrap">
            <div className="mobile-single-card-view">
              {allMobilePosts[currentIndex].isFeatured
                ? renderFeaturedCard(allMobilePosts[currentIndex])
                : renderHorizontalCard(allMobilePosts[currentIndex])}
            </div>

            {/* Arrow Navigation & Indicator Dots */}
            <div className="mobile-slider-controls">
              <button
                type="button"
                className="slider-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous Post"
              >
                <FaChevronLeft />
              </button>

              <div className="slider-indicator-dots">
                {allMobilePosts.map((_, idx) => (
                  <span
                    key={idx}
                    className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="slider-arrow-btn"
                onClick={handleNext}
                aria-label="Next Post"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Latesttravel;