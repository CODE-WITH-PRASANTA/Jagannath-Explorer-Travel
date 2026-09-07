import React, { useState, useEffect, useCallback } from 'react';
import './FloatingForm.css';
import travelImage from '../../assets/images.webp';

const FloatingForm = ({ isOpen = true, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    service: '',
    captchaInput: '',
    agreeTerms: false,
  });

  const [captchaRaw, setCaptchaRaw] = useState('502');

  const generateCaptcha = useCallback(() => {
    const randomNum = Math.floor(100 + Math.random() * 900).toString();
    setCaptchaRaw(randomNum);
    setFormData((prev) => ({ ...prev, captchaInput: '' }));
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
    }
  }, [isOpen, generateCaptcha]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verify Captcha
    if (formData.captchaInput.trim() !== captchaRaw) {
      alert('Invalid Captcha code. Please try again.');
      generateCaptcha();
      return;
    }

    console.log('Form Submitted successfully:', formData);
    alert('Thank you! Your travel inquiry has been received.');
    
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="floating-form-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="floating-form-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="floating-form-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Left Side: Destination Promo */}
        <div
          className="floating-form-promo"
          style={{ backgroundImage: `url(${travelImage})` }}
        >
          <div className="floating-form-promo-overlay"></div>
          <div className="floating-form-promo-content">
            <h2 className="floating-form-promo-title">
              Your Journey Begins with <br />
              <span>Jagannatha Travels</span>
            </h2>

            <p className="floating-form-promo-desc">
              Crafting unforgettable journeys with personalized travel planning, unbeatable deals, and seamless experiences.
            </p>

            <ul className="floating-form-features">
              <li>
                <span className="floating-form-check">✓</span>
                <span>Curated Odisha Travel Experiences</span>
              </li>
              <li>
                <span className="floating-form-check">✓</span>
                <span>Premium &amp; Budget Car Rental Options</span>
              </li>
              <li>
                <span className="floating-form-check">✓</span>
                <span>Professional Chauffeurs for Smooth Travel</span>
              </li>
              <li>
                <span className="floating-form-check">✓</span>
                <span>Tailor-Made Trips as per Your Needs</span>
              </li>
              <li>
                <span className="floating-form-check">✓</span>
                <span>Safe, Smooth &amp; Convenient Travel Guaranteed</span>
              </li>
            </ul>

            <p className="floating-form-tagline">
              Tell us your travel plan — we'll handle the rest.
            </p>

            <a href="tel:+919583244441" className="floating-form-call-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>Call Now: (+91) 9583244441</span>
            </a>
          </div>
        </div>

        {/* Right Side: Lead Capture Form */}
        <div className="floating-form-pane">
          <h3 className="floating-form-title">Get in Touch With Us</h3>

          <form onSubmit={handleSubmit} className="floating-form-body">
            <div className="floating-form-field">
              <input
                type="text"
                name="fullName"
                placeholder="* Enter Your Full Name (min 6 chars)"
                value={formData.fullName}
                onChange={handleChange}
                required
                minLength={6}
              />
              <span className="floating-form-field-icon">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>

            <div className="floating-form-field">
              <input
                type="tel"
                name="mobile"
                placeholder="* Enter 10 Digit Mobile Number"
                pattern="[0-9]{10}"
                maxLength={10}
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <span className="floating-form-field-icon">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </span>
            </div>

            <div className="floating-form-field floating-form-select">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Services
                </option>
                <option value="car-rental">Car Rental Services</option>
                <option value="tour-packages">Odisha Tour Packages</option>
                <option value="chauffeur">Chauffeur Drive</option>
                <option value="custom">Custom Itinerary</option>
              </select>
              <span className="floating-form-chevron">▼</span>
            </div>

            <div className="floating-form-captcha-group">
              <label className="floating-form-captcha-label">* Verify CAPTCHA</label>
              <div className="floating-form-captcha-row">
                <div className="floating-form-captcha-box">
                  {captchaRaw.split('').join(' ')}
                </div>
                <input
                  type="text"
                  name="captchaInput"
                  placeholder="Enter Captcha"
                  className="floating-form-captcha-input"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="floating-form-captcha-refresh"
                  onClick={generateCaptcha}
                  title="Reload Captcha"
                >
                  ↻
                </button>
              </div>
            </div>

            <div className="floating-form-terms">
              <input
                type="checkbox"
                id="floatingFormTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingFormTerms">
                I agree to the <a href="#terms">Terms &amp; Conditions</a> from{' '}
                <strong>Jagannath Tours &amp; Travels</strong>.
              </label>
            </div>

            <button type="submit" className="floating-form-submit">
              <span>Submit Now</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingForm;