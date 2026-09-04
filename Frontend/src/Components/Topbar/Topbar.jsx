import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        {/* Location Section */}
        <div className="topbar-location">
          <span className="topbar-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>
          </span>
          <span className="topbar-text">
            Plot no 348, Lewis Rd, BJB Nagar, Bhubaneswar, Odisha 751014
          </span>
        </div>

        {/* Contact Numbers */}
        <div className="topbar-contacts">
          {/* Phone 1 */}
          <a href="tel:+919583244441" className="topbar-contact">
            <span className="topbar-phone-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </span>
            <span>(+91) 9583244441</span>
          </a>

          <span className="topbar-divider"></span>

          {/* Phone 2 */}
          <a href="tel:+917978007410" className="topbar-contact">
            <span className="topbar-phone-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </span>
            <span>(+91) 7978007410</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;