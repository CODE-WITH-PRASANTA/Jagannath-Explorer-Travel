import React, { useState, useEffect } from "react";
import "./Hurryup.css";
import API, { IMG_URL } from "../../api/axios";

// ================================================================
// FALLBACK / DEFAULT IMAGES
// ================================================================
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80";

const Hurryup = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ================================================================
  // IMAGE URL HELPER
  // ================================================================
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return DEFAULT_IMAGE;
    }

    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://") ||
      imagePath.startsWith("blob:")
    ) {
      return imagePath;
    }

    const baseUrl = IMG_URL || "http://localhost:5000";
    const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
    const cleanImagePath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;

    return `${cleanBaseUrl}${cleanImagePath}`;
  };

  // ================================================================
  // FETCH ACTIVE BANNERS FROM BACKEND
  // ================================================================
  const fetchBanners = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await API.get("/coupen");

      if (response.data?.success) {
        const allBanners = response.data.data || [];
        // Filter out inactive banners if status exists
        const activeBanners = allBanners.filter(
          (b) => !b.status || b.status === "Active"
        );
        setBanners(activeBanners);
      } else {
        setBanners([]);
        setErrorMessage(response.data?.message || "Failed to load banners.");
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to load existing banners."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ================================================================
  // Booking Handler
  // ================================================================
  const handleBooking = (dealName) => {
    alert(`Redirecting to booking for: ${dealName}`);
  };

  // Fallback items if database is empty
  const fallbackDeals = [
    {
      _id: "fallback-1",
      title: "Discover Great Deal",
      subtitle: "Savings worldwide",
      discount: "20% Off",
      bgColor: "#5da943",
      buttonText: "Book Now",
      image: DEFAULT_IMAGE,
    },
    {
      _id: "fallback-2",
      title: "4 Days In Switzerland",
      subtitle: "Couple Tour",
      discount: "50% Off",
      bgColor: "#bd6a37",
      buttonText: "Book Now",
      image: DEFAULT_IMAGE,
    },
    {
      _id: "fallback-3",
      title: "2 Country & 15 Location",
      subtitle: "Honeymoon Tour",
      discount: "40% Off",
      bgColor: "#1b4d3e",
      buttonText: "Book Now",
      image: DEFAULT_IMAGE,
    },
    {
      _id: "fallback-4",
      title: "For Your First Book",
      subtitle: "Savings worldwide",
      discount: "50% Off",
      bgColor: "#fca834",
      buttonText: "Book Now",
      image: DEFAULT_IMAGE,
    },
  ];

  const displayBanners = banners.length > 0 ? banners : fallbackDeals;

  return (
    <section className="hurryup-section">
      {/* ============================================================
          Background Pine Tree Illustration
      ============================================================ */}
      <div className="bg-trees-art" aria-hidden="true">
        <svg
          viewBox="0 0 100 160"
          fill="none"
          stroke="#e3ece1"
          strokeWidth="1.6"
        >
          <path d="M40 30 L50 15 L60 30 L55 30 L66 45 L58 45 L72 65 L28 65 L42 45 L34 45 L45 30 Z M50 65 L50 80" />
          <path d="M15 70 L22 55 L29 70 L26 70 L34 85 L28 85 L38 105 L2 105 L12 85 L6 85 L14 70 Z M20 105 L20 120" />
        </svg>
      </div>

      <div className="hurryup-container">
        {/* ============================================================
            Header
        ============================================================ */}
        <div className="hurryup-header">
          <div className="hurryup-badge">
            <span className="badge-arrow">➔</span>
            <span>Hurry Up</span>
            <span className="badge-sparkle">✦</span>
          </div>

          <h2 className="hurryup-main-title">
            Phenomenal Deals Offered
          </h2>
        </div>

        {errorMessage && (
          <div style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
            {errorMessage}
          </div>
        )}

        {/* ============================================================
            3 Column Deals Grid (Dynamic from Database)
        ============================================================ */}
        <div className="deals-grid">
          {/* CARD 1 - TALL LEFT CARD */}
          {displayBanners[0] && (
            <div className="deal-card card-tall-left">
              <div className="card-img-container">
                <img
                  src={getImageUrl(displayBanners[0].image)}
                  alt={displayBanners[0].title || "Banner"}
                  className="deal-bg-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />
                <div className="inner-border-line"></div>
              </div>

              <div
                className="torn-overlay green-torn"
                style={{
                  backgroundColor: displayBanners[0].bgColor || undefined,
                }}
              >
                <svg
                  className="torn-paper-svg"
                  viewBox="0 0 500 40"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 L0,18 Q30,5 65,22 T140,12 T210,24 T280,10 T360,25 T440,14 T500,20 L500,40 Z"
                    fill={displayBanners[0].bgColor || "#5da943"}
                  />
                </svg>

                <div className="torn-content">
                  <span className="script-subtitle">
                    {displayBanners[0].subtitle || "Savings worldwide"}
                  </span>
                  <h3 className="discount-title">
                    {displayBanners[0].discount || "20% Off"}
                  </h3>
                  <p
                    className="deal-action-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBooking(displayBanners[0].title)}
                  >
                    {displayBanners[0].buttonText || "Discover Great Deal"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MIDDLE COLUMN - 2 STACKED CARDS */}
          <div className="middle-stacked-col">
            {/* CARD 2 - MIDDLE TOP */}
            {displayBanners[1] && (
              <div className="deal-card card-mid-top">
                <div className="card-img-container">
                  <img
                    src={getImageUrl(displayBanners[1].image)}
                    alt={displayBanners[1].title || "Banner"}
                    className="deal-bg-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_IMAGE;
                    }}
                  />
                </div>

                <div
                  className="torn-overlay brown-torn"
                  style={{
                    backgroundColor: displayBanners[1].bgColor || undefined,
                  }}
                >
                  <svg
                    className="torn-paper-svg"
                    viewBox="0 0 500 35"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,35 L0,14 Q40,2 80,18 T170,10 T250,22 T330,8 T410,20 T500,12 L500,35 Z"
                      fill={displayBanners[1].bgColor || "#bd6a37"}
                    />
                  </svg>

                  <div className="torn-content horizontal-layout">
                    <div className="text-group">
                      <span className="script-subtitle">
                        {displayBanners[1].subtitle || "Couple Tour"}
                      </span>
                      <h4
                        className="location-heading"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleBooking(displayBanners[1].title)}
                      >
                        {displayBanners[1].title}
                      </h4>
                    </div>

                    <div className="round-badge-disc">
                      <span>{displayBanners[1].discount || "50%"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CARD 3 - MIDDLE BOTTOM */}
            {displayBanners[2] && (
              <div className="deal-card card-mid-bottom">
                <div className="card-img-container curve-right-img">
                  <img
                    src={getImageUrl(displayBanners[2].image)}
                    alt={displayBanners[2].title || "Banner"}
                    className="deal-bg-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_IMAGE;
                    }}
                  />
                </div>

                <div
                  className="wave-panel dark-green-panel"
                  style={{
                    backgroundColor: displayBanners[2].bgColor || undefined,
                  }}
                >
                  <span className="script-subtitle">
                    {displayBanners[2].subtitle || "Honeymoon Tour"}
                  </span>
                  <h4 className="panel-heading">
                    {displayBanners[2].title}{" "}
                    <span className="yellow-accent">
                      {displayBanners[2].discount || "40% Off"}
                    </span>
                  </h4>
                  <p className="panel-sub">
                    {displayBanners[2].buttonText || "Book Now"}
                  </p>
                  <button
                    type="button"
                    className="btn-pill-orange"
                    onClick={() => handleBooking(displayBanners[2].title)}
                  >
                    {displayBanners[2].buttonText || "Book Now"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CARD 4 - TALL RIGHT CARD */}
          {displayBanners[3] && (
            <div className="deal-card card-tall-right">
              <div
                className="yellow-top-banner"
                style={{
                  backgroundColor: displayBanners[3].bgColor || undefined,
                }}
              >
                <div className="banner-text-left">
                  <span className="script-subtitle dark-script">
                    ➔ {displayBanners[3].subtitle || "Savings worldwide"}
                  </span>
                  <h3 className="banner-heading">
                    {displayBanners[3].discount || "50% Off"}
                  </h3>
                  <p className="banner-sub">
                    {displayBanners[3].title}
                  </p>
                </div>

                <button
                  type="button"
                  className="btn-green-book"
                  onClick={() => handleBooking(displayBanners[3].title)}
                >
                  {displayBanners[3].buttonText || "Book Now"}
                </button>

                <svg
                  className="torn-paper-bottom-svg"
                  viewBox="0 0 500 30"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0 L500,0 L500,12 Q420,26 350,15 T200,24 T70,12 T0,18 Z"
                    fill={displayBanners[3].bgColor || "#fca834"}
                  />
                </svg>
              </div>

              <div className="card-img-container bottom-img-half">
                <img
                  src={getImageUrl(displayBanners[3].image)}
                  alt={displayBanners[3].title || "Banner"}
                  className="deal-bg-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hurryup;