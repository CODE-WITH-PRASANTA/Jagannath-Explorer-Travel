import React, { useState } from "react";
import "./Tempovehicle.css";
import image1 from "../../assets/TempoTraveller1 - Copy.webp";
import image2 from "../../assets/tempotraveller2.webp";
import image3 from "../../assets/TempoTraveller3.webp";

const VEHICLE_LIST = [
  {
    id: 1,
    title: "Tempo Traveller 13 Seater",
    seats: "13",
    ac: "Yes (Individual Vents)",
    comfort: "Pushback Seats",
    bestFor: "Family Trips / Small Groups",
    price: "4500",
    image: image1,
    features: ["Luxury Interiors", "Music System", "Charging Ports"]
  },
  {
    id: 2,
    title: "Tempo Traveller 17 Seater",
    seats: "17",
    ac: "Yes (Roof Mounted AC)",
    comfort: "Pushback + Extra Leg Space",
    bestFor: "Corporate / Group Travel",
    price: "5000",
    image: image2,
    features: ["Ample Luggage Space", "LED TV", "Reading Lights"]
  },
  {
    id: 3,
    title: "Tempo Traveller 25 Seater",
    seats: "25",
    ac: "Yes (High Capacity AC)",
    comfort: "Wide Seats + Luggage Space",
    bestFor: "Events / Weddings",
    price: "7000",
    image: image3,
    features: ["Grand Coach Build", "Microphone System", "Recliner Sofas"]
  },
  {
    id: 4,
    title: "10 Seater Urbania Luxury",
    seats: "10",
    ac: "Yes (Climate Control)",
    comfort: "Captain Seats",
    bestFor: "VIP Travel / Luxury Tours",
    price: "11000",
    image: image1,
    features: ["Italian Leather", "Individual Screens", "Premium Sound"]
  },
  {
    id: 5,
    title: "12 Seater Urbania Elite",
    seats: "12",
    ac: "Yes (Dual Zone AC)",
    comfort: "Executive Recliners",
    bestFor: "Corporate Retreats / Weddings",
    price: "12000",
    image: image2,
    features: ["Ambient Lighting", "Panoramic Windows", "Wi-Fi Connectivity"]
  },
  {
    id: 6,
    title: "17 Seater Urbania Grand",
    seats: "17",
    ac: "Yes (High Output AC)",
    comfort: "Luxury Pushback",
    bestFor: "Long Distance & Tours",
    price: "13000",
    image: image3,
    features: ["Extra Legroom", "Personal Charging", "Mini Fridge"]
  }
];

const ITEMS_PER_DESKTOP_PAGE = 3;

const Tempovehicle = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalDesktopPages = Math.ceil(VEHICLE_LIST.length / ITEMS_PER_DESKTOP_PAGE);
  const currentDesktopVehicles = VEHICLE_LIST.slice(
    desktopPage * ITEMS_PER_DESKTOP_PAGE,
    (desktopPage + 1) * ITEMS_PER_DESKTOP_PAGE
  );

  return (
    <section className="tempovehicle-section">
      <div className="tempovehicle-container">
        
        {/* Header Area */}
        <div className="tempovehicle-header-area">
          <span className="tempovehicle-subtitle">✦ TEMPO TRAVELLER &amp; VAN FLEET ✦</span>
          <h2 className="tempovehicle-main-title">
            Book Tempo Traveller in <span>Bhubaneswar Odisha</span> for Group Journeys
          </h2>
          <div className="tempovehicle-title-divider">
            <span></span>
            <i>❦</i>
            <span></span>
          </div>
          <p className="tempovehicle-description">
            Explore our pristine white-and-black fleet of 13, 17, 25-seater tempo travellers and luxury urbanias. Perfect for local excursions, airport transfers, weddings, and grand outstation journeys across Bhubaneswar.
          </p>
        </div>

        {/* Desktop View: 3 Cards per Page Grid */}
        <div className="tempovehicle-desktop-grid-wrapper">
          <div className="tempovehicle-grid tempovehicle-desktop-grid">
            {currentDesktopVehicles.map((vehicle) => {
              const isFlipped = !!flippedCards[vehicle.id];
              return (
                <div key={vehicle.id} className="tempovehicle-card-wrapper">
                  <div className={`tempovehicle-card-inner ${isFlipped ? "is-flipped" : ""}`}>
                    
                    {/* FRONT SIDE */}
                    <div className="tempovehicle-card-face tempovehicle-card-front">
                      <div className="tempovehicle-image-wrapper">
                        <img src={vehicle.image} alt={vehicle.title} className="tempovehicle-img" />
                        <div className="tempovehicle-badge-tag">Featured</div>
                      </div>

                      <div className="tempovehicle-front-content">
                        <h3 className="tempovehicle-card-title">{vehicle.title}</h3>
                        
                        <div className="tempovehicle-specs-preview">
                          <div className="tempovehicle-spec-row">
                            <span>Seats</span>
                            <strong>{vehicle.seats}</strong>
                          </div>
                          <div className="tempovehicle-spec-row">
                            <span>Best For</span>
                            <strong>{vehicle.bestFor}</strong>
                          </div>
                        </div>

                        <div className="tempovehicle-card-footer">
                          <div className="tempovehicle-price-box">
                            <strong>₹{vehicle.price}</strong>
                            <span>/ 8 Hours</span>
                          </div>
                          <button className="tempovehicle-action-btn" onClick={() => handleFlip(vehicle.id)}>
                            View Specs ↺
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="tempovehicle-card-face tempovehicle-card-back">
                      <div className="tempovehicle-back-header">
                        <h3 className="tempovehicle-card-title">{vehicle.title}</h3>
                        <button className="tempovehicle-close-btn" onClick={() => handleFlip(vehicle.id)}>
                          ✕ Back
                        </button>
                      </div>

                      <div className="tempovehicle-specs-list">
                        <div className="tempovehicle-spec-row">
                          <span>Seats</span>
                          <strong>{vehicle.seats}</strong>
                        </div>
                        <div className="tempovehicle-spec-row">
                          <span>A/C</span>
                          <strong>{vehicle.ac}</strong>
                        </div>
                        <div className="tempovehicle-spec-row">
                          <span>Comfort</span>
                          <strong>{vehicle.comfort}</strong>
                        </div>
                        <div className="tempovehicle-spec-row">
                          <span>Best For</span>
                          <strong>{vehicle.bestFor}</strong>
                        </div>
                      </div>

                      <div className="tempovehicle-features-tags">
                        {vehicle.features.map((feat, idx) => (
                          <span key={idx} className="tempovehicle-feat-chip">✓ {feat}</span>
                        ))}
                      </div>

                      <div className="tempovehicle-card-footer">
                        <div className="tempovehicle-price-box">
                          <strong>₹{vehicle.price}</strong>
                          <span>/ 8 Hours</span>
                        </div>
                        <button className="tempovehicle-book-now-btn">
                          Book Now →
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Pagination */}
          <div className="tempovehicle-pagination tempovehicle-desktop-pagination">
            <button 
              className={`tempovehicle-page-btn ${desktopPage === 0 ? "tempovehicle-page-disabled" : ""}`}
              onClick={() => setDesktopPage((prev) => Math.max(prev - 1, 0))}
              disabled={desktopPage === 0}
            >
              Prev
            </button>
            <span className="tempovehicle-page-indicator">
              Page {desktopPage + 1} of {totalDesktopPages}
            </span>
            <button 
              className={`tempovehicle-page-btn ${desktopPage === totalDesktopPages - 1 ? "tempovehicle-page-disabled" : ""}`}
              onClick={() => setDesktopPage((prev) => Math.min(prev + 1, totalDesktopPages - 1))}
              disabled={desktopPage === totalDesktopPages - 1}
            >
              Next
            </button>
          </div>
        </div>

        {/* Mobile View: 1 by 1 Card with Pagination */}
        <div className="tempovehicle-mobile-slider-wrapper">
          <div className="tempovehicle-mobile-slider">
            {(() => {
              const vehicle = VEHICLE_LIST[mobileIndex];
              const isFlipped = !!flippedCards[vehicle.id];
              return (
                <div key={vehicle.id} className="tempovehicle-card-wrapper">
                  <div className={`tempovehicle-card-inner ${isFlipped ? "is-flipped" : ""}`}>
                    
                    {/* FRONT SIDE */}
                    <div className="tempovehicle-card-face tempovehicle-card-front">
                      <div className="tempovehicle-image-wrapper">
                        <img src={vehicle.image} alt={vehicle.title} className="tempovehicle-img" />
                        <div className="tempovehicle-badge-tag">Featured</div>
                      </div>

                      <div className="tempovehicle-front-content">
                        <h3 className="tempovehicle-card-title">{vehicle.title}</h3>
                        
                        <div className="tempovehicle-specs-preview">
                          <div className="tempovehicle-spec-row">
                            <span>Seats</span>
                            <strong>{vehicle.seats}</strong>
                          </div>
                          <div className="tempovehicle-spec-row">
                            <span>Best For</span>
                            <strong>{vehicle.bestFor}</strong>
                          </div>
                        </div>

                        <div className="tempovehicle-card-footer">
                          <div className="tempovehicle-price-box">
                            <strong>₹{vehicle.price}</strong>
                            <span>/ 8 Hours</span>
                          </div>
                          <button className="tempovehicle-action-btn" onClick={() => handleFlip(vehicle.id)}>
                            View Specs ↺
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="tempovehicle-card-face tempovehicle-card-back">
                      <div className="tempovehicle-back-header">
                        <h3 className="tempovehicle-card-title">{vehicle.title}</h3>
                        <button className="tempovehicle-close-btn" onClick={() => handleFlip(vehicle.id)}>
                          ✕ Back
                        </button>
                      </div>

                      <div className="tempovehicle-specs-list">
                        <div className="tempovehicle-spec-row">
                          <span>Seats</span>
                          <strong>{vehicle.seats}</strong>
                        </div>
                        <div className="tempovehicle-spec-row">
                          <span>A/C</span>
                          <strong>{vehicle.ac}</strong>
                        </div>
                        <div className="tempovehicle-spec-row">
                          <span>Comfort</span>
                          <strong>{vehicle.comfort}</strong>
                        </div>
                        <div className="tempovehicle-spec-row">
                          <span>Best For</span>
                          <strong>{vehicle.bestFor}</strong>
                        </div>
                      </div>

                      <div className="tempovehicle-features-tags">
                        {vehicle.features.map((feat, idx) => (
                          <span key={idx} className="tempovehicle-feat-chip">✓ {feat}</span>
                        ))}
                      </div>

                      <div className="tempovehicle-card-footer">
                        <div className="tempovehicle-price-box">
                          <strong>₹{vehicle.price}</strong>
                          <span>/ 8 Hours</span>
                        </div>
                        <button className="tempovehicle-book-now-btn">
                          Book Now →
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}
          </div>

          {/* Mobile Pagination */}
          <div className="tempovehicle-pagination tempovehicle-mobile-pagination">
            <button 
              className={`tempovehicle-page-btn ${mobileIndex === 0 ? "tempovehicle-page-disabled" : ""}`}
              onClick={() => setMobileIndex((prev) => Math.max(prev - 1, 0))}
              disabled={mobileIndex === 0}
            >
              Prev
            </button>
            <span className="tempovehicle-page-indicator">
              Page {mobileIndex + 1} of {VEHICLE_LIST.length}
            </span>
            <button 
              className={`tempovehicle-page-btn ${mobileIndex === VEHICLE_LIST.length - 1 ? "tempovehicle-page-disabled" : ""}`}
              onClick={() => setMobileIndex((prev) => Math.min(prev + 1, VEHICLE_LIST.length - 1))}
              disabled={mobileIndex === VEHICLE_LIST.length - 1}
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tempovehicle;