
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import "./FloatingForm.css";
import travelImage from "../../assets/images.webp";

const API_URL = "http://localhost:5000";

// Keep this number identical everywhere.
const CALL_NUMBER = "+919668892441";

const FloatingForm = ({
  triggerOnLoad = false,
  loadDelay = 800,
  onFormSubmitSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaRaw, setCaptchaRaw] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    service: "",
    captchaInput: "",
    agreeTerms: false,
  });

  const firstInputRef = useRef(null);

  // ==========================================
  // GENERATE CAPTCHA
  // ==========================================
  const generateCaptcha = useCallback(() => {
    const randomNum = Math.floor(
      100 + Math.random() * 900
    ).toString();

    setCaptchaRaw(randomNum);

    setFormData((prev) => ({
      ...prev,
      captchaInput: "",
    }));
  }, []);

  // ==========================================
  // OPEN FORM
  // ==========================================
  const handleOpen = useCallback(() => {
    if (isSubmitting) return;

    generateCaptcha();
    setIsOpen(true);
  }, [generateCaptcha, isSubmitting]);

  // ==========================================
  // OPTIONAL AUTO OPEN
  // ==========================================
  useEffect(() => {
    if (!triggerOnLoad) return;

    const timer = setTimeout(() => {
      handleOpen();
    }, loadDelay);

    return () => clearTimeout(timer);
  }, [triggerOnLoad, loadDelay, handleOpen]);

  // ==========================================
  // FOCUS FIRST INPUT
  // ==========================================
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 350);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // ==========================================
  // LOCK BACKGROUND SCROLL
  // ==========================================
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // ==========================================
  // CLOSE FORM
  // ==========================================
  const handleClose = useCallback(() => {
    if (isSubmitting) return;

    setIsOpen(false);
  }, [isSubmitting]);

  // ==========================================
  // ESCAPE KEY
  // ==========================================
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Escape" &&
        isOpen &&
        !isSubmitting
      ) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, isSubmitting, handleClose]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    if (name === "mobile") {
      const onlyNumbers = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        mobile: onlyNumbers,
      }));

      return;
    }

    if (name === "captchaInput") {
      const onlyNumbers = value
        .replace(/\D/g, "")
        .slice(0, 3);

      setFormData((prev) => ({
        ...prev,
        captchaInput: onlyNumbers,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // VALIDATE FORM
  // ==========================================
  const validateForm = () => {
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const mobile = formData.mobile.trim();

    if (fullName.length < 6) {
      alert(
        "Please enter your full name with at least 6 characters."
      );
      return false;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert(
        "Please enter a valid 10 digit Indian mobile number."
      );
      return false;
    }

    if (formData.service === "") {
      alert("Please select a travel service.");
      return false;
    }

    if (
      formData.captchaInput.trim() !== captchaRaw
    ) {
      alert(
        "Invalid CAPTCHA code. Please try again."
      );

      generateCaptcha();
      return false;
    }

    if (!formData.agreeTerms) {
      alert(
        "Please agree to the Terms & Conditions to continue."
      );
      return false;
    }

    return true;
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const isValid = validateForm();

    if (!isValid) return;

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${API_URL}/api/enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
            service: formData.service,

            travelDate: "",
            travelers: 1,
            departure: "",
            destination: "",
            budget: "",
            message:
              "Website enquiry submitted through Floating Form.",
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit your enquiry."
        );
      }

      console.log(
        "Enquiry saved successfully:",
        data.enquiry
      );

      alert(
        "Thank you! Your travel enquiry has been received successfully. Our travel expert will contact you shortly."
      );

      if (onFormSubmitSuccess) {
        onFormSubmitSuccess(data.enquiry);
      }

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        service: "",
        captchaInput: "",
        agreeTerms: false,
      });

      setIsOpen(false);
    } catch (error) {
      console.error(
        "Enquiry submission error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong. Please try again."
      );

      generateCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // CALL NOW
  // ==========================================
  const handleCall = () => {
    window.location.href = `tel:${CALL_NUMBER}`;
  };

  return (
    <>
      {/* =================================================
          FIXED SIDE ENQUIRE BUTTON
      ================================================= */}
      {!isOpen && (
        <button
          type="button"
          className="floating-enquire-trigger"
          onClick={handleOpen}
          aria-label="Open travel enquiry form"
        >
          <span className="floating-enquire-glow" />

          <span className="floating-enquire-icon">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
              <path d="M8 9h8" />
              <path d="M8 13h5" />
            </svg>
          </span>

          <span className="floating-enquire-text">
            ENQUIRE NOW
          </span>

          <span className="floating-enquire-arrow">
            →
          </span>
        </button>
      )}

      {/* =================================================
          ENQUIRY MODAL
      ================================================= */}
      {isOpen && (
        <div
          className="floating-form-backdrop"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isSubmitting
            ) {
              handleClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="floating-form-title"
          aria-describedby="floating-form-description"
        >
          <div className="floating-form-card">

          <div className="floating-form-promo-content">
            {/* Badge */}
            <div className="floating-form-badge">
              <span>
                ✨ Odisha's Trusted Travel Partner
              </span>
            </div>

            {/* Promo Title */}
            <h2 className="floating-form-promo-title">
              Your Journey Begins with <br />
              <span>
                Jagannath Explorer Travels
              </span>
            </h2>

            {/* Description */}
            <p className="floating-form-promo-desc">
              Crafting unforgettable journeys
              with personalized travel planning,
              unbeatable deals, and seamless
              experiences.
            </p>

            {/* Features */}
            <ul className="floating-form-features">
              <li>
                <span
                  className="floating-form-check"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>
                  Curated Odisha Travel Experiences
                </span>
              </li>

              <li>
                <span
                  className="floating-form-check"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>
                  Premium &amp; Budget Car Rental Options
                </span>
              </li>

              <li>
                <span
                  className="floating-form-check"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>
                  Professional Chauffeurs for Smooth Travel
                </span>
              </li>

              <li>
                <span
                  className="floating-form-check"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>
                  Tailor-Made Trips as per Your Needs
                </span>
              </li>

              <li>
                <span
                  className="floating-form-check"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>
                  Safe, Smooth &amp; Convenient Travel Guaranteed
                </span>
              </li>
            </ul>

            {/* Tagline */}
            <p className="floating-form-tagline">
              Tell us your travel plan — we'll handle the rest.
            </p>

            {/* Call Button */}
              <a
                href="tel:+919668892441"
                className="floating-form-call-btn"
                aria-label="Call Jagannath Explorer Travels at +91 9668892441"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>

                <span>
                  Call Now: (+91) 9668892441
                </span>
              </a>
          </div>
        </div>

        {/* ==========================================
            RIGHT FORM PANEL
        ========================================== */}
        <div className="floating-form-pane">
          <div className="floating-form-header-wrap">
            <h3
              id="floating-form-title"
              className="floating-form-title"
            >
              <div className="floating-form-promo-overlay" />

              <div className="floating-form-promo-content">

                <div className="floating-form-badge">
                  <span className="floating-form-badge-dot" />
                  Odisha's Trusted Travel Partner
                </div>

                <div className="floating-form-small-label">
                  PLAN • EXPLORE • EXPERIENCE
                </div>

                <h2 className="floating-form-promo-title">
                  Your Journey Begins
                  <br />
                  With
                  <span>
                    {" "}
                    Jagannath Explorer Travels
                  </span>
                </h2>

                <p className="floating-form-promo-desc">
                  Discover Odisha with personalized
                  itineraries, reliable car rentals,
                  professional chauffeurs and
                  hassle-free travel planning.
                </p>

                <div className="floating-form-feature-grid">

                  <div className="floating-form-feature">
                    <span className="floating-form-feature-icon">
                      ✓
                    </span>

                    <div>
                      <strong>Curated Trips</strong>
                      <small>
                        Designed around your plan
                      </small>
                    </div>
                  </div>

                  <div className="floating-form-feature">
                    <span className="floating-form-feature-icon">
                      ✓
                    </span>

                    <div>
                      <strong>Reliable Cars</strong>
                      <small>
                        Local & outstation travel
                      </small>
                    </div>
                  </div>

                  <div className="floating-form-feature">
                    <span className="floating-form-feature-icon">
                      ✓
                    </span>

                    <div>
                      <strong>Expert Chauffeurs</strong>
                      <small>
                        Comfortable & smooth rides
                      </small>
                    </div>
                  </div>

                  <div className="floating-form-feature">
                    <span className="floating-form-feature-icon">
                      ✓
                    </span>

                    <div>
                      <strong>Custom Plans</strong>
                      <small>
                        Built around your needs
                      </small>
                    </div>
                  </div>

                </div>

                <div className="floating-form-divider" />

                <p className="floating-form-tagline">
                  Tell us your travel plan —
                  <strong> we'll handle the rest.</strong>
                </p>

                <button
                  type="button"
                  className="floating-form-call-btn"
                  onClick={handleCall}
                  aria-label="Call Jagannath Explorer Travels"
                >
                  <span className="floating-form-call-icon">
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.39 21 3 13.61 3 4.5 3 3.95 3.45 3.5 4 3.5h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </span>

                  <span>
                    Call Now
                    <strong>+91 96688 92441</strong>
                  </span>
                </button>

              </div>
            </div>

            {/* ==========================================
                RIGHT FORM PANEL
            ========================================== */}
            <div className="floating-form-pane">

              <div className="floating-form-header-wrap">

                <div className="floating-form-form-badge">
                  QUICK ENQUIRY
                </div>

                <h3
                  id="floating-form-title"
                  className="floating-form-title"
                >
                  Plan Your Trip Today
                </h3>

                <p
                  id="floating-form-description"
                  className="floating-form-subtitle"
                >
                  Share your details and our travel
                  expert will contact you shortly.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="floating-form-body"
                noValidate
              >

                {/* NAME */}
                <div className="floating-form-field">
                  <label
                    htmlFor="floatingFormFullName"
                    className="floating-form-label"
                  >
                    Full Name
                  </label>

                  <div className="floating-form-input-wrap">
                    <input
                      ref={firstInputRef}
                      id="floatingFormFullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      minLength={6}
                      maxLength={80}
                      required
                      autoComplete="name"
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
                </div>

                {/* EMAIL */}
                <div className="floating-form-field">
                  <label
                    htmlFor="floatingFormEmail"
                    className="floating-form-label"
                  >
                    Email Address
                    <span>Optional</span>
                  </label>

                  <div className="floating-form-input-wrap">
                    <input
                      id="floatingFormEmail"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />

                    <span className="floating-form-field-icon">
                      ✉
                    </span>
                  </div>
                </div>

                {/* MOBILE */}
                <div className="floating-form-field">
                  <label
                    htmlFor="floatingFormMobile"
                    className="floating-form-label"
                  >
                    Mobile Number
                  </label>

                  <div className="floating-form-input-wrap">

                    <span className="floating-form-country-code">
                      +91
                    </span>

                    <input
                      id="floatingFormMobile"
                      type="tel"
                      name="mobile"
                      placeholder="Enter 10 digit mobile number"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      inputMode="numeric"
                    />

                    <span className="floating-form-field-icon">
                      <svg
                        viewBox="0 0 24 24"
                        width="17"
                        height="17"
                        fill="currentColor"
                      >
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.39 21 3 13.61 3 4.5 3 3.95 3.45 3.5 4 3.5h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </span>

                  </div>
                </div>

                {/* SERVICE */}
                <div className="floating-form-field">
                  <label
                    htmlFor="floatingFormService"
                    className="floating-form-label"
                  >
                    Travel Service
                  </label>

                  <div className="floating-form-input-wrap">
                    <select
                      id="floatingFormService"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a service
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
                </div>

                {/* CAPTCHA */}
                <div className="floating-form-captcha-group">

                  <label
                    htmlFor="floatingFormCaptcha"
                    className="floating-form-label"
                  >
                    Security Verification
                  </label>

                  <div className="floating-form-captcha-row">

                    <div
                      className="floating-form-captcha-box"
                      aria-label={`CAPTCHA code ${captchaRaw
                        .split("")
                        .join(" ")}`}
                    >
                      {captchaRaw
                        ? captchaRaw
                            .split("")
                            .join(" ")
                        : "..."}
                    </div>

                    <input
                      id="floatingFormCaptcha"
                      type="text"
                      name="captchaInput"
                      placeholder="Enter code"
                      className="floating-form-captcha-input"
                      value={formData.captchaInput}
                      onChange={handleChange}
                      maxLength={3}
                      required
                      autoComplete="off"
                      inputMode="numeric"
                    />

                    <button
                      type="button"
                      className="floating-form-captcha-refresh"
                      onClick={generateCaptcha}
                      title="Generate new CAPTCHA"
                      aria-label="Generate new CAPTCHA"
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
                    I agree to the{" "}
                    <a href="/terms">
                      Terms & Conditions
                    </a>{" "}
                    of Jagannath Explorer Travels.
                  </label>

                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="floating-form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="floating-form-spinner" />
                      Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      Submit Enquiry

                      <svg
                        viewBox="0 0 24 24"
                        width="17"
                        height="17"
                        fill="currentColor"
                      >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="floating-form-secure-text">
                  🔒 Your information is safe and will only
                  be used to contact you regarding your enquiry.
                </p>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingForm;

