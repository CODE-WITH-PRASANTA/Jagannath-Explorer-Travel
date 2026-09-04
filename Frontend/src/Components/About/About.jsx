import React, { useState } from 'react';
import './About.css';

// आप अपनी इमेज फ़ाइलों को यहाँ अपने पाथ के अनुसार इम्पोर्ट कर सकते हैं:
// import imgLarge from './assets/group-hike.jpg';
// import imgTopRight from './assets/resort-night.jpg';
// import imgBottomLeft from './assets/van-desert.jpg';
// import imgBottomRight from './assets/couple-night.jpg';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  // टैब के अनुसार टेक्स्ट कंटेंट
  const tabContent = {
    mission: `Etiam ac tortor id purus commodo vulputate. Vestibulum porttitor erat felis and sed vehicula tortor malesuada gravida. Mauris volutpat enim quis pulv gont congue. Suspendisse ullamcorper, enim vitae tristique blandit, eratot augue torel tempo libero, non porta lectus tortor et elit. Quisque finibusot enim et eratourgt gravida, eu elementum turpis lacinia. Integer female go tellus ligula, attendora and condimentum.`,
    customer: `Focusing on our customers is at the heart of TripRex. We listen to your travel aspirations and curate experiences that cater directly to your comfort, safety, and wanderlust. Dedicated 24/7 support ensures every step of your journey is memorable, seamless, and uniquely tailored to create lifelong travel memories.`
  };

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Left Column: Text & Controls */}
        <div className="about-left">
          <div className="sub-badge">
            <span className="arrow-dash">➔</span> About Us <span className="sparkle">✦</span>
          </div>

          <h1 className="about-heading">
            Let’s know About Our<br />Journey For TripRex.
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
            <button className="cta-btn">More About</button>

            <div className="social-proof">
              <div className="avatar-group">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" alt="Customer 1" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60" alt="Customer 2" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60" alt="Customer 3" />
              </div>
              <div className="proof-text">
                <strong>500+</strong>
                <span>Customer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 2-Column Asymmetric Image Grid */}
        <div className="about-right">
          <div className="grid-col left-col">
            <div className="img-wrapper tall">
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=700&auto=format&fit=crop&q=80"
                alt="Hikers enjoying mountain view"
              />
            </div>
            <div className="img-wrapper medium">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&auto=format&fit=crop&q=80"
                alt="Van traveling through canyon"
              />
            </div>
          </div>

          <div className="grid-col right-col">
            <div className="img-wrapper medium">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700&auto=format&fit=crop&q=80"
                alt="Resort swimming pool at twilight"
              />
            </div>
            <div className="img-wrapper tall">
              <img
                src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=700&auto=format&fit=crop&q=80"
                alt="Couple standing under night sky"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;