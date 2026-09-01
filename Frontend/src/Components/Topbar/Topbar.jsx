import React from 'react';
import { FaPaperPlane, FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar-container">
      <div className="topbar-wrapper">
        
        {/* Left Section: Email Info */}
        <div className="topbar-left">
          <FaPaperPlane className="email-icon" />
          <div className="email-text">
            <span className="label">Email:</span>
            <a href="mailto:info@example.com" className="email-link">
              info@example.com
            </a>
          </div>
        </div>

        {/* Center Section: Promotional Text & Link */}
        <div className="topbar-center">
          <span>50% Off Your Next Trip. Hurry Up For Your New Tour!</span>
          <a href="#book-tour" className="book-link">
            Book Your Tour
          </a>
        </div>

        {/* Right Section: Social Icons */}
        <div className="topbar-right">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-icon">
            <FaXTwitter />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="social-icon">
            <FaPinterestP />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
            <FaInstagram />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Topbar;