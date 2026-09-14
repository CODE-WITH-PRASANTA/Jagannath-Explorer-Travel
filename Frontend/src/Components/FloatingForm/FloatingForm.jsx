import React, { useState, useEffect, useCallback } from 'react';
import './FloatingForm.css';
import travelImage from '../../assets/images.webp';

const API_URL = 'http://localhost:5000';
const FloatingForm = ({
  triggerOnLoad = true,
  loadDelay = 800,
  onFormSubmitSuccess
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    service: '',
    captchaInput: '',
    agreeTerms: false,
  });

  const [captchaRaw, setCaptchaRaw] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================
  // GENERATE CAPTCHA
  // ===============================
  const generateCaptcha = useCallback(() => {
    const randomNum = Math.floor(
      100 + Math.random() * 900
    ).toString();

    setCaptchaRaw(randomNum);

    setFormData((prev) => ({
      ...prev,
      captchaInput: '',
    }));
  }, []);

  // ===============================
  // OPEN FORM ON LOAD
  // ===============================
  useEffect(() => {
    if (triggerOnLoad) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        generateCaptcha();
      }, loadDelay);

      return () => clearTimeout(timer);
    }
  }, [triggerOnLoad, loadDelay, generateCaptcha]);

  // ===============================
  // LOCK BACKGROUND SCROLL
  // ===============================
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;

      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // ===============================
  // ESCAPE KEY
  // ===============================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // ===============================
  // CLOSE
  // ===============================
  const handleClose = () => {
    setIsOpen(false);
  };

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));
  };

  // ===============================
  // SUBMIT FORM
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // CAPTCHA
    if (
      formData.captchaInput.trim() !== captchaRaw
    ) {
      alert('Invalid CAPTCHA code. Please try again.');
      generateCaptcha();
      return;
    }

    // Terms
    if (!formData.agreeTerms) {
      alert(
        'Please agree to the Terms & Conditions to proceed.'
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${API_URL}/api/enquiries`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            service: formData.service,

            // Additional fields
            travelDate: '',
            travelers: 1,
            departure: '',
            destination: '',
            budget: '',
            message:
              'Website enquiry submitted through Floating Form.',
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to submit enquiry.'
        );
      }

      console.log(
        'Enquiry saved successfully:',
        data.enquiry
      );

      alert(
        'Thank you! Your travel inquiry has been received successfully.'
      );

      if (onFormSubmitSuccess) {
        onFormSubmitSuccess(data.enquiry);
      }

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        service: '',
        captchaInput: '',
        agreeTerms: false,
      });

      setIsOpen(false);
    } catch (error) {
      console.error(
        'Enquiry submission error:',
        error
      );

      alert(
        error.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="floating-form-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="floating-form-card"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* Close Button */}
        <button
          type="button"
          className="floating-form-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* ===============================
            LEFT PROMO PANEL
        =============================== */}
        <div
          className="floating-form-promo"
          style={{
            backgroundImage: `url(${travelImage})`,
          }}
        >
          <div className="floating-form-promo-overlay" />

          <div className="floating-form-promo-content">

            <div className="floating-form-badge">
              <span>
                ✨ Odisha's Trusted Travel Partner
              </span>
            </div>

            <h2 className="floating-form-promo-title">
              Your Journey Begins with <br />
              <span>
                Jagannath Explorer Travels
              </span>
            </h2>

            <p className="floating-form-promo-desc">
              Crafting unforgettable journeys
              with personalized travel planning,
              unbeatable deals, and seamless
              experiences.
            </p>

            <ul className="floating-form-features">

              <li>
                <span className="floating-form-check">
                  ✓
                </span>
                <span>
                  Curated Odisha Travel Experiences
                </span>
              </li>

              <li>
                <span className="floating-form-check">
                  ✓
                </span>
                <span>
                  Premium &amp; Budget Car Rental Options
                </span>
              </li>

              <li>
                <span className="floating-form-check">
                  ✓
                </span>
                <span>
                  Professional Chauffeurs for Smooth Travel
                </span>
              </li>

              <li>
                <span className="floating-form-check">
                  ✓
                </span>
                <span>
                  Tailor-Made Trips as per Your Needs
                </span>
              </li>

              <li>
                <span className="floating-form-check">
                  ✓
                </span>
                <span>
                  Safe, Smooth &amp; Convenient Travel Guaranteed
                </span>
              </li>

            </ul>

            <p className="floating-form-tagline">
              Tell us your travel plan — we'll handle the rest.
            </p>

            <a
              href="tel:+919583244441"
              className="floating-form-call-btn"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>

              <span>
                Call Now: (+91) 95832 44441
              </span>
            </a>

          </div>
        </div>

        {/* ===============================
            RIGHT FORM PANEL
        =============================== */}
        <div className="floating-form-pane">

          <div className="floating-form-header-wrap">
            <h3 className="floating-form-title">
              Plan Your Trip Today
            </h3>

            <p className="floating-form-subtitle">
              Fill out the form below &amp; our
              travel expert will get back to you
              instantly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="floating-form-body"
          >

            {/* NAME */}
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
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
            </div>

            {/* EMAIL */}
            <div className="floating-form-field">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                value={formData.email}
                onChange={handleChange}
              />

              <span className="floating-form-field-icon">
                ✉
              </span>
            </div>

            {/* MOBILE */}
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
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l-2.2 2.2c-.27.27-.67.36-1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z" />
                </svg>
              </span>
            </div>

            {/* SERVICE */}
            <div className="floating-form-field floating-form-select">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option
                  value=""
                  disabled
                  hidden
                >
                  Select Services
                </option>

                <option value="Car Rental Services">
                  Car Rental Services
                </option>

                <option value="Odisha Tour Packages">
                  Odisha Tour Packages
                </option>

                <option value="Chauffeur Drive">
                  Chauffeur Drive
                </option>

                <option value="Custom Itinerary">
                  Custom Itinerary
                </option>
              </select>

              <span className="floating-form-chevron">
                ▼
              </span>
            </div>

            {/* CAPTCHA */}
            <div className="floating-form-captcha-group">

              <label className="floating-form-captcha-label">
                * Verify CAPTCHA
              </label>

              <div className="floating-form-captcha-row">

                <div className="floating-form-captcha-box">
                  {captchaRaw
                    ? captchaRaw
                        .split('')
                        .join(' ')
                    : '...'}
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

            {/* TERMS */}
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
                I agree to the{' '}
                <a href="#terms">
                  Terms &amp; Conditions
                </a>{' '}
                from{' '}
                <strong>
                  Jagannath Explorer Travels
                </strong>.
              </label>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="floating-form-submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit Now'}
              </span>

              {!isSubmitting && (
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingForm;