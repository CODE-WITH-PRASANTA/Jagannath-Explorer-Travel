import React, { useState } from "react";
import "./ContactMain.css";

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fullAddress =
    "Plot no 348, Lewis Rd, BJB Nagar, Bhubaneswar, Odisha 751014";
  const encodedAddress = encodeURIComponent(fullAddress);

  // Native Google Maps embed iframe URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="ContactMain">
      <div className="ContactMain__wrapper">
        {/* Left Side: Contact Info Cards */}
        <div className="ContactMain__infoList">
          {/* Phone Card */}
          <div className="ContactMain__infoCard">
            <span className="ContactMain__infoTag">Phone</span>
            <div className="ContactMain__iconBox">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ContactMain__svgIcon"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="ContactMain__infoDetails">
              <p>(+91) 9583244441</p>
              <p>(+91) 7978007410</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="ContactMain__infoCard">
            <span className="ContactMain__infoTag">Email Now</span>
            <div className="ContactMain__iconBox">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ContactMain__svgIcon"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
              </svg>
            </div>
            <div className="ContactMain__infoDetails">
              <p>info@example.com</p>
              <p>example@example.com</p>
            </div>
          </div>

          {/* Location Card */}
          <div className="ContactMain__infoCard">
            <span className="ContactMain__infoTag">Location</span>
            <div className="ContactMain__iconBox">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ContactMain__svgIcon"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="ContactMain__infoDetails">
              <p className="ContactMain__address">{fullAddress}</p>
            </div>
          </div>

          {/* Opening Time Card */}
          <div className="ContactMain__infoCard">
            <span className="ContactMain__infoTag">Opening Time</span>
            <div className="ContactMain__iconBox">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ContactMain__svgIcon"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="ContactMain__infoDetails">
              <p className="ContactMain__time">8:00Am - 10:Pm, Friday Close</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="ContactMain__formCard">
          <h2 className="ContactMain__formTitle">Reach Us Anytime</h2>

          <form className="ContactMain__form" onSubmit={handleSubmit}>
            <div className="ContactMain__fieldGroup">
              <label className="ContactMain__label">Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Daniel Scoot"
                className="ContactMain__input"
                required
              />
            </div>

            <div className="ContactMain__inputRow">
              <div className="ContactMain__fieldGroup">
                <label className="ContactMain__label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(+91) 9583244441"
                  className="ContactMain__input"
                />
              </div>

              <div className="ContactMain__fieldGroup">
                <label className="ContactMain__label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Us...."
                  className="ContactMain__input"
                />
              </div>
            </div>

            <div className="ContactMain__fieldGroup">
              <label className="ContactMain__label">Write Your Message*</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind"
                rows="5"
                className="ContactMain__textarea"
                required
              ></textarea>
            </div>

            <button type="submit" className="ContactMain__submitBtn">
              <span className="ContactMain__btnText">Submit Now</span>
            </button>
          </form>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="ContactMain__mapWrapper">
        <iframe
          title="Office Location Bhubaneswar"
          src={mapEmbedUrl}
          className="ContactMain__mapIframe"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMain;