
import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabContent = {
    mission: `We believe every journey should be comfortable, well planned, and worth remembering. As a trusted travel company in Bhubaneswar, we create thoughtfully planned tours that bring together beautiful destinations, reliable travel services, comfortable stays, and memorable experiences. From exploring Odisha to discovering popular destinations across India, our goal is to make every trip simple, enjoyable, and stress-free.`,

    customer: `Our customers are at the centre of everything we do. We take the time to understand your travel plans, budget, preferences, and expectations before creating your trip. Whether you are planning a family holiday, a couple's getaway, a group tour, or a spiritual journey, our team is here to help with practical guidance and friendly support from the first conversation until you return home.`
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
              className={`tab-btn ${
                activeTab === 'mission' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('mission')}
            >
              <span className="tab-icon">🎯</span>
              <span>Mission & Vision</span>
            </button>

            <button
              className={`tab-btn ${
                activeTab === 'customer' ? 'active' : ''
              }`}
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

            <button className="cta-btn">
              More About Us
            </button>

            <div className="social-proof">

              <div className="avatar-group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60"
                  alt="Happy travel customer"
                />

                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60"
                  alt="Happy travel customer"
                />

                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60"
                  alt="Happy travel customer"
                />
              </div>

              <div className="proof-text">
                <strong>500+</strong>
                <span>Happy Customers</span>
              </div>

            </div>

          </div>

        </div>

        {/* Right Column - Image Grid */}
        <div className="about-right">

          {/* Left Image Column */}
          <div className="grid-col left-col">

            <div className="img-wrapper tall">
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=700&auto=format&fit=crop&q=80"
                alt="Travellers enjoying a mountain destination"
              />
            </div>

            <div className="img-wrapper medium">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&auto=format&fit=crop&q=80"
                alt="Road trip through a beautiful destination"
              />
            </div>

          </div>

          {/* Right Image Column */}
          <div className="grid-col right-col">

            <div className="img-wrapper medium">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&auto=format&fit=crop&q=80"
                alt="Comfortable resort for travellers"
              />
            </div>

            <div className="img-wrapper tall">
              <img
                src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=700&auto=format&fit=crop&q=80"
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

