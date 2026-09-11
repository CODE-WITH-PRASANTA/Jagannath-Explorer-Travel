import React, { useState } from 'react';
import './Explore.css';

// ==========================================
// 12 IMAGES IMPORT (2 for each activity)
// आवश्यकतानुसार अपनी लोकल इमेज का पाथ दें:
// ==========================================
import zip1 from '../../assets/zip-lining-01.webp';
import zip2 from '../../assets/zip-landing-02.webp';
import para1 from '../../assets/paragliding-01.webp';
import para2 from '../../assets/paragliding-02.webp';
import bungee1 from '../../assets/bungee-jump-01.webp';
import bungee2 from '../../assets/bungee-jump-02.webp';
import ski1 from '../../assets/ski-touring-01.webp';
import ski2 from '../../assets/ski-touring-02.webp';
import raft1 from '../../assets/rafting-01.webp';
import raft2 from '../../assets/rafting-02.webp';
import surf1 from '../../assets/surfing-01.webp';
import surf2 from '../../assets/surfing-02.webp';

const activitiesData = {
  ziplining: {
    badge: 'Zip lining',
    title: 'Thrill Above Ground: The Zip Line Adventure',
    description:
      'Embark on an adrenaline-fueled journey, zipping through lush landscapes, feeling the wind rush past, and experiencing nature from breathtaking heights. Unleash your inner adventurer today.',
    features: ['Treetop Views', 'Adrenaline Rush', 'Safety Measures', 'Nature Immersion'],
    images: [
      zip1 || 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=700&auto=format&fit=crop&q=80',
      zip2 || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&auto=format&fit=crop&q=80'
    ]
  },
  paragliding: {
    badge: 'Paragliding',
    title: 'Horizon Dance: Unique Paragliding Perspectives.',
    description:
      "Experience freedom in flight, soaring gracefully over landscapes, feeling the wind's embrace on an exhilarating paragliding escapade. Adventure awaits above!",
    features: ['Glide Experience', 'Scenic Views', 'Safety Measures', 'Adventurous Spirit'],
    images: [
      para1 || 'https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?w=700&auto=format&fit=crop&q=80',
      para2 || 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=700&auto=format&fit=crop&q=80'
    ]
  },
  bungee: {
    badge: 'Bungee Jumping',
    title: "Plunge: Bungee Jumping's Gravity-Defying Thrill",
    description:
      'Plunge into pure adrenaline. Free fall, then rebound, suspended mid-air. Experience the ultimate rush, a heart-pounding leap into the unknown.',
    features: ['Professional Guidance', 'Secure Harnesses', 'Adrenaline Rush', 'Scenic Locations'],
    images: [
      bungee1 || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80',
      bungee2 || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&auto=format&fit=crop&q=80'
    ]
  },
  skitouring: {
    badge: 'Ski touring',
    title: 'Powder Quest: Exploring Snow-Covered Landscapes on Skis',
    description:
      "Ski tour through pristine snowscapes, ascend peaks, and savor thrilling descents, immersing in nature's beauty on an exhilarating adventure.",
    features: ['Ascend and Descend', 'Specialized Equipment', 'Remote Exploration', 'Physical Challenge'],
    images: [
      ski1 || 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=700&auto=format&fit=crop&q=80',
      ski2 || 'https://images.unsplash.com/photo-1516565972841-294442abfa12?w=700&auto=format&fit=crop&q=80'
    ]
  },
  rafting: {
    badge: 'Rafting',
    title: 'Whitewater Rush: Thrilling Rafting Adventure',
    description:
      'Ride through rapids, paddle through currents, and enjoy thrilling adventures with expert guides amidst stunning natural landscapes and excitement.',
    features: ['Professional Guides', 'Adventurous Rapids', 'Scenic Landscapes', 'Team Experience'],
    images: [
      raft1 || 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=700&auto=format&fit=crop&q=80',
      raft2 || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80'
    ]
  },
  surfing: {
    badge: 'Surfing',
    title: 'Ocean Rush: The Thrill of Riding Majestic Surf Waves.',
    description:
      "Ride powerful waves, feel the ocean's rhythm, and embrace the thrill of surfing, blending athleticism and connection with nature's forces.",
    features: ['Wave Mastery', 'Board Variety', 'Physical Fitness', 'Ocean Awareness'],
    images: [
      surf1 || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&auto=format&fit=crop&q=80',
      surf2 || 'https://images.unsplash.com/photo-1508873696983-2df57046475a?w=700&auto=format&fit=crop&q=80'
    ]
  }
};

const Explore = () => {
  const [activeTab, setActiveTab] = useState('ziplining');

  const current = activitiesData[activeTab];

  const handleBooking = () => {
    alert(`Checking availability for: ${current.title}`);
  };

  const handleWatch = () => {
    alert(`Playing adventure video for: ${current.badge}`);
  };

  return (
    <section className="explore-section">
      {/* Background Animated Floating Illustrations */}
      <div className="explore-bg-doodles" aria-hidden="true">
        <div className="bg-world-map"></div>

        {/* Floating Hot Air Balloon */}
        <div className="floating-balloon">
          <svg viewBox="0 0 100 130" fill="none" stroke="#d5ded0" strokeWidth="1.6">
            <ellipse cx="50" cy="50" rx="36" ry="44" />
            <path d="M30 18 C40 35, 40 65, 30 82" />
            <path d="M70 18 C60 35, 60 65, 70 82" />
            <line x1="50" y1="6" x2="50" y2="94" />
            <path d="M38 94 L42 110 M62 94 L58 110" />
            <rect x="42" y="110" width="16" height="12" rx="2" />
          </svg>
        </div>

        {/* Floating Mountain Doodle */}
        <div className="floating-mountains">
          <svg viewBox="0 0 160 100" fill="none" stroke="#d5ded0" strokeWidth="1.5">
            <polygon points="10,95 65,25 110,95" />
            <polygon points="80,95 120,40 155,95" />
            <polyline points="50,45 62,52 72,43" />
          </svg>
        </div>
      </div>

      <div className="explore-container">
        {/* Section Heading */}
        <div className="explore-header">
          <div className="explore-subtitle-badge">
            <span className="badge-arrow">➔</span>
            <span>Are you ready to travel?</span>
            <span className="badge-sparkle">✦</span>
          </div>
          <h2 className="explore-main-title">Explore Your Activities</h2>
        </div>

        {/* 3-Column Layout: Left (Tab Selector), Middle (Info Content), Right (2-Stacked Images) */}
        <div className="explore-content-grid">
          
          {/* 1. LEFT TAB SELECTOR (2x3 Grid) */}
          <div className="activities-tabs-grid">
            {/* Zip lining */}
            <button
              type="button"
              className={`activity-tab-btn ${activeTab === 'ziplining' ? 'active' : ''}`}
              onClick={() => setActiveTab('ziplining')}
            >
              <div className="tab-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14 C16 16, 32 12, 44 8" />
                  <circle cx="24" cy="22" r="3.5" />
                  <path d="M22 25.5 L19 32 L15 30 M24 25.5 L27 34 L32 32 M24 13 L24 18.5" />
                </svg>
              </div>
              <span className="tab-label">Zip lining</span>
            </button>

            {/* Paragliding */}
            <button
              type="button"
              className={`activity-tab-btn ${activeTab === 'paragliding' ? 'active' : ''}`}
              onClick={() => setActiveTab('paragliding')}
            >
              <div className="tab-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16 C12 8, 36 8, 36 16 Z" />
                  <path d="M12 16 L22 32 M36 16 L26 32 M18 16 L23 32 M30 16 L25 32" />
                  <circle cx="24" cy="35" r="2.5" />
                </svg>
              </div>
              <span className="tab-label">Paragliding</span>
            </button>

            {/* Bungee Jumping */}
            <button
              type="button"
              className={`activity-tab-btn ${activeTab === 'bungee' ? 'active' : ''}`}
              onClick={() => setActiveTab('bungee')}
            >
              <div className="tab-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="14" r="3.5" />
                  <path d="M17 22 L24 26 L31 22 M24 26 L24 35 L20 42 M24 35 L28 42" />
                  <path d="M22 42 C24 45, 24 48, 26 48" />
                </svg>
              </div>
              <span className="tab-label">Bungee Jumping</span>
            </button>

            {/* Ski touring */}
            <button
              type="button"
              className={`activity-tab-btn ${activeTab === 'skitouring' ? 'active' : ''}`}
              onClick={() => setActiveTab('skitouring')}
            >
              <div className="tab-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="27" cy="12" r="3.5" />
                  <path d="M26 16 L24 26 L18 30 M24 26 L28 34 L32 38" />
                  <path d="M14 36 L36 28 M12 24 L22 42" />
                  <path d="M12 10 L14 12 M14 8 L12 14" />
                </svg>
              </div>
              <span className="tab-label">Ski touring</span>
            </button>

            {/* Rafting */}
            <button
              type="button"
              className={`activity-tab-btn ${activeTab === 'rafting' ? 'active' : ''}`}
              onClick={() => setActiveTab('rafting')}
            >
              <div className="tab-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="15" r="2.8" />
                  <circle cx="30" cy="15" r="2.8" />
                  <path d="M14 28 C14 24, 34 24, 34 28 L31 31 L17 31 Z" />
                  <path d="M12 22 L22 36 M36 22 L26 36" />
                  <path d="M8 38 C14 36, 18 40, 24 38 C30 36, 34 40, 40 38" />
                </svg>
              </div>
              <span className="tab-label">Rafting</span>
            </button>

            {/* Surfing */}
            <button
              type="button"
              className={`activity-tab-btn ${activeTab === 'surfing' ? 'active' : ''}`}
              onClick={() => setActiveTab('surfing')}
            >
              <div className="tab-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="25" cy="16" r="3" />
                  <path d="M23 19 L21 26 L26 29 L28 34" />
                  <path d="M16 36 C22 33, 30 31, 35 34" strokeWidth="2.5" />
                  <path d="M8 32 C12 24, 20 20, 28 22" />
                </svg>
              </div>
              <span className="tab-label">Surfing</span>
            </button>
          </div>

          {/* 2. MIDDLE CONTENT COLUMN */}
          <div className="activity-detail-col">
            <div className="brush-tag-wrap">
              <span className="brush-badge">{current.badge}</span>
            </div>

            <h3 className="activity-detail-title">{current.title}</h3>

            <p className="activity-detail-desc">{current.description}</p>

            {/* Features Bullet List */}
            <div className="activity-features-list">
              {current.features.map((feat, idx) => (
                <div key={idx} className="act-feat-item">
                  <span className="act-feat-dot"></span>
                  <span className="act-feat-name">{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="activity-actions">
              <button type="button" className="btn-check-avail" onClick={handleBooking}>
                Check Availability
              </button>

              <button type="button" className="btn-watch-adventure" onClick={handleWatch}>
                <div className="play-icon-circle">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="9.5,7.5 16.5,12 9.5,16.5" />
                  </svg>
                </div>
                <span>Watch Adventure</span>
              </button>
            </div>
          </div>

          {/* 3. RIGHT COLUMN: 2 STACKED IMAGES */}
          <div className="activity-images-col">
            <div className="stacked-img-wrapper">
              <img src={current.images[0]} alt={`${current.badge} 1`} className="activity-img" />
              <div className="shine-sweep"></div>
            </div>
            <div className="stacked-img-wrapper">
              <img src={current.images[1]} alt={`${current.badge} 2`} className="activity-img" />
              <div className="shine-sweep"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Explore;