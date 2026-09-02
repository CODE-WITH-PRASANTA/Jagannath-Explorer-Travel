import React, { useState } from 'react';
import './Journey.css';

import brazilImg from '../../assets/destination-card-img1.webp';
import italyImg from '../../assets/destination-card-img2.webp';
import newYorkImg from '../../assets/destination-card-img3.webp';
import saudiArabImg from '../../assets/destination-card-img4.webp';
import europeImg from '../../assets/destination-card-img5.webp';

const Journey = () => {
  // डिफ़ॉल्ट रूप से New York (id: 3) एक्टिव रहेगा
  const [activeId, setActiveId] = useState(3);

  const destinations = [
    { id: 1, title: 'Brazil', image: brazilImg, tours: '25 Tour' },
    { id: 2, title: 'Italy', image: italyImg, tours: '18 Tour' },
    { id: 3, title: 'New York', image: newYorkImg, tours: '30 Tour' },
    { id: 4, title: 'Saudi Arab', image: saudiArabImg, tours: '15 Tour' },
    { id: 5, title: 'Europe', image: europeImg, tours: '42 Tour' },
  ];

  return (
    <section className="journey-section">
      <div className="journey-container">
        
        {/* Section Header */}
        <div className="journey-header">
          <div className="journey-badge">
            <span className="badge-arrow">→</span>
            <span className="badge-text">Journey to the</span>
            <span className="badge-wave">~</span>
          </div>
          <h2 className="journey-main-title">Desired Vacation Spots</h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="journey-grid" onMouseLeave={() => setActiveId(3)}>
          
          {/* First 5 Destination Cards */}
          {destinations.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div 
                key={item.id} 
                className={`destination-card ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveId(item.id)}
              >
                {item.image ? (
                  <img src={item.image} alt={item.title} className="card-bg-img" />
                ) : (
                  <div className="empty-img-placeholder">
                    <span>{item.title} Image</span>
                  </div>
                )}

                <div className="card-overlay"></div>

                <div className="card-info-content">
                  <h3 className="place-title">{item.title}</h3>
                  
                  {/* Tour Ribbon Badge */}
                  <div className="tour-badge-wrapper">
                    <div className="tour-ribbon">
                      <span className="ribbon-text">{item.tours}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Promotional Offer Card */}
          <div className="promo-banner-card">
            <div className="plane-sketch sketch-top">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#778079" strokeWidth="1.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </div>
            <div className="plane-sketch sketch-bottom">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#778079" strokeWidth="1.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </div>

            <div className="promo-content">
              <div className="discount-tag">
                <span>Get 10% Off</span>
              </div>
              <h3 className="promo-title">
                Of Our All<br />Destination
              </h3>
              <a href="#all-destinations" className="btn-view-destinations">
                View All Destination
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Journey;