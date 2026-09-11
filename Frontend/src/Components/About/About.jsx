import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

import aboutImg1 from '../../assets/images.webp';
import aboutImg2 from '../../assets/Dhauligiri Shanti Stupa (1) (1).webp';
import aboutImg3 from '../../assets/khandagiri (1).webp';
import aboutImg4 from '../../assets/Maa Tarini Keounjhar (1).webp';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const navigate = useNavigate();

  const tabContent = {
    mission: `We believe every journey should be comfortable, well planned, and worth remembering. As a trusted travel company in Bhubaneswar, we create thoughtfully planned tours that bring together beautiful destinations, reliable travel services, comfortable stays, and memorable experiences. From exploring Odisha to discovering popular destinations across India, our goal is to make every trip simple, enjoyable, and stress-free.`,

    customer: `Our customers are at the centre of everything we do. We take the time to understand your travel plans, budget, preferences, and expectations before creating your trip. Whether you are planning a family holiday, a couple's getaway, a group tour, or a spiritual journey, our team is here to help with practical guidance and friendly support from the first conversation until you return home.`
  };

  const handleContactNavigation = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="about-section">
      <div className="about-container">

        {/* Left Column */}
        <div className="about-left">

          <div className="sub-badge">
            <span className="arrow-dash">➔</span>
            About Us
            <span className="sparkle">✦</span>
          </div>

          <h1 className="about-heading">
            Best Tour and Travel Agency in Bhubaneswar for Memorable Journeys
          </h1>

          {/* Interactive Tabs */}
          <div className="tabs-container">
            <button
              className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              <span className="tab-icon">🎯</span>
              <span>Mission & Vision</span>
            </button>

            <button
              className={`tab-btn ${activeTab === 'customer' ? 'active' : ''}`}
              onClick={() => setActiveTab('customer')}
            >
              <span className="tab-icon">👥</span>
              <span>Focus On Customer</span>
            </button>
          </div>

          {/* Dynamic Content */}
          <p className="tab-description">
            {tabContent[activeTab]}
          </p>

          {/* Bottom Actions */}
          <div className="about-bottom">
            <button 
              type="button" 
              className="cta-btn primary-btn"
              onClick={handleContactNavigation}
            >
              <span>Contact Us</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

        </div>

        {/* Right Column - Image Grid */}
        <div className="about-right">
          <div className="grid-col left-col">
            <div className="img-wrapper tall">
              <img
                src={aboutImg1}
                alt="Travellers enjoying a mountain destination"
              />
            </div>
            <div className="img-wrapper medium">
              <img
                src={aboutImg2}
                alt="Road trip through a beautiful destination"
              />
            </div>
          </div>

          <div className="grid-col right-col">
            <div className="img-wrapper medium">
              <img
                src={aboutImg3}
                alt="Comfortable resort for travellers"
              />
            </div>
            <div className="img-wrapper tall">
              <img
                src={aboutImg4}
                alt="Couple enjoying a peaceful travel experience"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;