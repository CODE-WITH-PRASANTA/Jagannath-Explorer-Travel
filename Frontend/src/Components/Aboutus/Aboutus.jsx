import React, { useState } from 'react';
import { BiTargetLock } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import './Aboutus.css';

// अगर आपकी इमेजेस लोकल 'assets' फोल्डर में हैं, तो आप उन्हें यहाँ इम्पोर्ट कर सकते हैं:
import img1 from '../../assets/about-img (1).webp';


const Aboutus = ({
  image1 = 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format&fit=crop', // Friends hiking
  image2 = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop', // Resort / Pool night
  image3 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop', // Van road trip
  image4 = 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=800&auto=format&fit=crop', // Couple night sky
}) => {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <section className="aboutus-section">
      <div className="aboutus-container">
        
        {/* ================= LEFT CONTENT COLUMN ================= */}
        <div className="aboutus-left-content">
          
          {/* Section Subtitle / Tag */}
          <div className="about-badge">
            <span className="badge-arrow">→</span>
            <span className="badge-text">About Us</span>
            <span className="badge-wave">~</span>
          </div>

          {/* Main Title */}
          <h2 className="about-title">
            Let's know About Our<br />Journey For TripRex.
          </h2>

          {/* Feature Tabs (Mission & Vision / Focus On Customer) */}
          <div className="about-feature-tabs">
            <div 
              className={`feature-tab ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              <div className="feature-icon-wrapper">
                <BiTargetLock className="feature-icon" />
              </div>
              <span className="feature-title">Mission & Vision</span>
            </div>

            <div 
              className={`feature-tab ${activeTab === 'customer' ? 'active' : ''}`}
              onClick={() => setActiveTab('customer')}
            >
              <div className="feature-icon-wrapper">
                <FiUsers className="feature-icon" />
              </div>
              <span className="feature-title">Focus On Customer</span>
            </div>
          </div>

          {/* Dynamic Description Paragraph */}
          <p className="about-description">
            {activeTab === 'mission' ? (
              <>
                Etiam ac tortor id purus commodo vulputate. Vestibulum porttitor erat felis and sed vehicula tortor malesuada gravida. Mauris volutpat enim quis pulv gont congue. Suspendisse ullamcorper, enim vitae tristique blandit, eratot augue torel tempo libero, non porta lectus tortor et elit. Quisque finibusot enim et eratourgt gravida, eu elementum turpis lacinia. Integer female go tellus ligula, attendora and condimentum.
              </>
            ) : (
              <>
                Our customer satisfaction remains at the core of our journey. We deliver personalized holiday plans, seamless round-the-clock assistance, and curated local experiences so you make unforgettable memories with complete peace of mind across every destination.
              </>
            )}
          </p>

          {/* Action Row: Button & Customer Proof */}
          <div className="about-actions">
            <a href="#more-about" className="btn-more-about">
              More About
            </a>

            <div className="customer-avatar-group">
              <div className="avatar-stack">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" alt="Customer 1" className="avatar-img" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Customer 2" className="avatar-img" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="Customer 3" className="avatar-img" />
              </div>
              <div className="customer-count-text">
                <span className="count-number">500+</span>
                <span className="count-label">Customer</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT IMAGES GRID ================= */}
        <div className="aboutus-right-gallery">
          
          {/* Column 1: Hiking group (tall) + Road trip van (square) */}
          <div className="gallery-col col-1">
            <div className="img-card img-card-large">
              <img src={image1} alt="Group trekking in mountains" />
            </div>
            <div className="img-card img-card-medium">
              <img src={image3} alt="Van road trip" />
            </div>
          </div>

          {/* Column 2: Night resort (medium) + Couple under stars (tall) */}
          <div className="gallery-col col-2">
            <div className="img-card img-card-medium">
              <img src={image2} alt="Resort swimming pool at night" />
            </div>
            <div className="img-card img-card-large">
              <img src={image4} alt="Couple standing under night sky" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Aboutus;