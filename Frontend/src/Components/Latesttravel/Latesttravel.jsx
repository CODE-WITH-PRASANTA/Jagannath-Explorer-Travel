import React from 'react';
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

const rightPostsData = [
  {
    id: 1,
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
    dateDay: '30',
    dateMonth: 'June',
    author: 'David Mitat',
    category: 'City Tour',
    title: 'Our Begin Now To Benign Onet What You Will Be.',
    readTime: '5 Min Read',
    image: dummyImages.trek
  }
];

const Latesttravel = () => {
  const handleViewPost = (postTitle) => {
    alert(`Opening article: "${postTitle}"`);
  };

  const handleSocialShare = (platform) => {
    alert(`Sharing post on ${platform}`);
  };

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

        {/* 2-Column Grid Layout */}
        <div className="latesttravel-grid">
          
          {/* ================= LEFT COLUMN: BIG FEATURED POST ================= */}
          <article className="featured-card">
            <div className="featured-img-wrap">
              <img
                src={typeof featuredCampfireImg !== 'undefined' ? featuredCampfireImg : dummyImages.featured}
                alt="Campfire under starry sky"
                className="blog-img"
              />
              <div className="shine-overlay"></div>
            </div>

            <div className="featured-content">
              <div className="featured-meta">
                <span>By <button type="button" className="author-link">Rison Donec</button></span>
                <span className="meta-dot">•</span>
                <span>Nov 10, 2022</span>
                <span className="meta-dot">•</span>
                <span>5 Comment</span>
              </div>

              <h3 className="featured-title">
                Our Begin Now What Your Will Bean Forest This Our Agency.
              </h3>

              <div className="featured-footer">
                <button
                  type="button"
                  className="view-post-btn"
                  onClick={() => handleViewPost('Our Begin Now What Your Will Bean Forest This Our Agency.')}
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

          {/* ================= RIGHT COLUMN: 3 STACKED CARDS ================= */}
          <div className="stacked-cards-col">
            {rightPostsData.map((post) => (
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
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Latesttravel;