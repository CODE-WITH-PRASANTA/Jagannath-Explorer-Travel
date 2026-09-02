import React, { useState } from 'react';
import { 
  FaArrowRight, 
  FaPhoneAlt, 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaCcVisa, 
  FaCcStripe, 
  FaCcPaypal 
} from 'react-icons/fa';
import { SiVisa, SiStripe, SiPaypal } from 'react-icons/si';
import './Footer.css';

// अगर आपके पास न्यूज़लेटर बैकग्राउंड या लोगो इमेज है, तो ऐसे इम्पोर्ट कर सकते हैं:
import newsletterBannerBg from '../../assets/banner3-vector2.webp';
import customLogo from '../../assets/Logo 006.webp';

const Footer = ({ logoSrc, newsletterBg }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed successfully with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* ================= 1. NEWSLETTER CARD ================= */}
        <div 
          className="newsletter-card"
          style={{
            backgroundImage: newsletterBg 
              ? `url(${newsletterBg})` 
              : `radial-gradient(circle at 10% 20%, rgba(92, 184, 43, 0.08) 0%, transparent 40%),
                 radial-gradient(circle at 90% 20%, rgba(92, 184, 43, 0.08) 0%, transparent 40%),
                 linear-gradient(180deg, #fbfbf9 0%, #f4f5f0 100%)`
          }}
        >
          {/* Decorative Corner Leaf Graphics */}
          <div className="leaf-decor leaf-left"></div>
          <div className="leaf-decor leaf-right"></div>

          <div className="newsletter-content">
            <h2 className="newsletter-title">Join The Newsletter</h2>
            <p className="newsletter-subtitle">To receive our best monthly deals</p>

            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter Your Gmail..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>

        {/* ================= 2. MAIN FOOTER CONTENT ================= */}
        <div className="footer-grid">
          
          {/* Column 1: Brand & CTA */}
          <div className="footer-col col-brand">
            <div className="footer-logo">
              {logoSrc ? (
                <img src={logoSrc} alt="TripRex Logo" className="footer-logo-img" />
              ) : (
                <div className="brand-wrapper">
                  <svg className="brand-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 20C24 16 20 12 16 16C12 20 16 24 20 24" fill="#5cb82b" />
                    <path d="M28 24C32 24 36 20 32 16C28 12 24 16 24 20" fill="#5cb82b" />
                    <path d="M24 28C24 32 28 36 32 32C36 28 32 24 28 24" fill="#5cb82b" />
                    <path d="M20 24C16 24 12 28 16 32C20 36 24 32 24 28" fill="#5cb82b" />
                    <path d="M27 19L23 23M23 23L21 21M23 23L25 25M27 19L28 16L25 17L23 23" stroke="#5cb82b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="brand-name">Trip<span className="brand-bold">Rex</span></span>
                </div>
              )}
            </div>

            <h3 className="cta-headline">
              Want<span className="cta-light">to Take</span><br />Tour Packages?
            </h3>

            <a href="#book-tour" className="btn-book-tour">
              Book A Tour
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col col-links">
            <h4 className="col-title">Quick Link</h4>
            <ul className="footer-links-list">
              <li><a href="#about">About Us</a></li>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#tour-package">Tour Package</a></li>
              <li><a href="#tour-guide">Tour Guide</a></li>
              <li><a href="#article">Article</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="footer-col col-contact">
            <div className="contact-block">
              <div className="contact-heading">
                <FaPhoneAlt className="contact-icon" />
                <span>More Inquiry</span>
              </div>
              <a href="tel:+999858624984" className="contact-value phone-link">+999-858 624 984</a>
            </div>

            <div className="contact-block">
              <div className="contact-heading">
                <FaPaperPlane className="contact-icon" />
                <span>Send Mail</span>
              </div>
              <a href="mailto:info@example.com" className="contact-value email-link">info@example.com</a>
            </div>

            <div className="contact-block">
              <div className="contact-heading">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Address</span>
              </div>
              <p className="contact-value address-text">
                House 168/170, Avenue 01, Mirpur<br />
                DOHS, Dhaka Bangladesh
              </p>
            </div>
          </div>

          {/* Column 4: About & Payment Partners */}
          <div className="footer-col col-about">
            <h4 className="col-title">We Are Here</h4>
            <p className="about-text">
              Quisque purus augue, facilisis andi neque idont accumsan fringilla massa. Vivamusol id nibhom condimentum.
            </p>

            <div className="payment-partner-section">
              <h5 className="payment-title">Payment Partner</h5>
              <div className="payment-badges">
                <span className="payment-card visa"><SiVisa /></span>
                <span className="payment-card stripe"><SiStripe /></span>
                <span className="payment-card paypal"><SiPaypal /></span>
                <span className="payment-card mastercard">WP</span>
                <span className="payment-card skrill">Skrill</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;