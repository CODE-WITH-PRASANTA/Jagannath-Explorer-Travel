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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // =========================================================
  // OFFICE ADDRESS
  // =========================================================
  const fullAddress =
    "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur, Bhubaneswar, Odisha, Pin - 751002";

  const encodedAddress = encodeURIComponent(fullAddress);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="ContactMain">
      <div className="ContactMain__wrapper">

        {/* =====================================================
            LEFT SIDE - CONTACT INFORMATION
        ====================================================== */}
        <div className="ContactMain__infoList">

          {/* PHONE */}
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
              <p>(+91) 9668892441</p>
              <p>(+91) 9556355446</p>
            </div>
          </div>

          {/* EMAIL */}
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
              <p>Jagannathexplore99@gmail.com</p>
             
            </div>
          </div>

          {/* LOCATION */}
          <div className="ContactMain__infoCard ContactMain__locationCard">
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

            <div className="ContactMain__infoDetails ContactMain__locationDetails">
              <p className="ContactMain__address">
                Plot No - 001, Mahaveer Nagar, Road No. - 18,
                Samantarapur, Bhubaneswar, Odisha, Pin - 751002
              </p>
            </div>
          </div>

          {/* OPENING TIME */}
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
              <p className="ContactMain__time">
                10:00 AM - 9:00 PM, Sunday Closed
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE - CONTACT FORM
        ====================================================== */}
        <div className="ContactMain__formCard">

          {/* PREMIUM BRAND HEADER */}
          <div className="ContactMain__formHeader">

            <div className="ContactMain__brandLine">
              <span className="ContactMain__brandDot"></span>

              <span className="ContactMain__brandName">
                JAGANNATH EXPLORER TRAVELS
              </span>

              <span className="ContactMain__brandLineAfter"></span>
            </div>

            <h2 className="ContactMain__formTitle">
              Reach Us Anytime
            </h2>

          </div>

          {/* FORM */}
          <form
            className="ContactMain__form"
            onSubmit={handleSubmit}
          >
            {/* NAME */}
            <div className="ContactMain__fieldGroup">
              <label className="ContactMain__label">
                Name*
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="ContactMain__input"
                required
              />
            </div>

            {/* PHONE + EMAIL */}
            <div className="ContactMain__inputRow">

              <div className="ContactMain__fieldGroup">
                <label className="ContactMain__label">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Number"
                  className="ContactMain__input"
                />
              </div>

              <div className="ContactMain__fieldGroup">
                <label className="ContactMain__label">
                  Email
                </label>

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

            {/* MESSAGE */}
            <div className="ContactMain__fieldGroup">
              <label className="ContactMain__label">
                Write Your Message*
              </label>

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

            {/* SUBMIT */}
            <button
              type="submit"
              className="ContactMain__submitBtn"
            >
              <span className="ContactMain__btnText">
                Submit Now
              </span>

              <span className="ContactMain__btnArrow">
                →
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* =====================================================
          GOOGLE MAP
      ====================================================== */}
      <div className="ContactMain__mapWrapper">
        <iframe
          title="Jagannath Explorer Travels Office Location"
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