import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPlane, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import './Tourpackage.css';

// 👉 यदि आपकी इमेजेस लोकल फोल्डर में हैं, तो यहाँ अनकमेंट करके पाथ दें:
// import packageImg1 from '../../assets/package-1.jpg';
// ... (अन्य 5 इमेजेस)

const packagesData = [
  {
    id: 1,
    duration: '3 DAYS / 4 NIGHT',
    tag: 'NEPAL + INDONESIA TOUR',
    title: "The Allure Italy's Rich Culture, History, And Cuisine.",
    route: 'ALEXANDRIA → SHARM EL SHEIKH → MANSOURA → K.',
    price: '₹2,39,999',
    oldPrice: '₹2,49,999',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    duration: '7 DAYS / 8 NIGHT',
    tag: 'EGYPT + TURKEY TOUR',
    title: "Explore Travel NYC's Museums, Diversity, And Energy.",
    route: 'MECCA → MEDINA → RIYADH → DOHA → AL WAKRA',
    price: '₹2,69,999',
    oldPrice: '',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    duration: '5 DAYS / 6 NIGHT',
    tag: 'FRANCE + SPAIN TOUR',
    title: 'Embark Tranquility, Adventure, And Spiritual.',
    route: 'ALEXANDRIA → SHARM EL SHEIKH → MANSOURA → K.',
    price: '₹1,64,999',
    oldPrice: '₹2,09,999',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    duration: '8 DAYS / 9 NIGHT',
    tag: 'INDIA + JAPAN TOUR',
    title: 'Embracing City Lights, Landm, And Iconic Culture.',
    route: 'BANGALORE → CHENNAI → NEW DELHI → DHAKA →',
    price: '₹3,15,000',
    oldPrice: '',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    duration: '6 DAYS / 7 NIGHT',
    tag: 'BRAZIL + HUNGARY TOUR',
    title: 'A Journey Of Tour Beauty And Inspiration.',
    route: 'PARIS → MARSEILLE → BORDEAUX → MADRID → B',
    price: '₹3,79,999',
    oldPrice: '₹4,15,000',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    duration: '4 DAYS / 5 NIGHT',
    tag: 'NEPAL + INDONESIA TOUR',
    title: 'Adventure Art, Architecture, And Mediterranean.',
    route: 'KATHMANDU → POKHARA → LALITPUR → JAKARTA →',
    price: '₹4,40,000',
    oldPrice: '₹4,55,000',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800&auto=format&fit=crop'
  }
];

const Tourpackage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // स्क्रीन साइज चेक करने के लिए listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : packagesData.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < packagesData.length - 1 ? prev + 1 : 0));
  };

  const handleBooking = (tourTitle) => {
    alert(`Redirecting to booking for: ${tourTitle}`);
  };

  const handleViewAll = () => {
    alert('Redirecting to full packages listing page...');
  };

  // मोबाइल पर केवल 1 कार्ड दिखेगा, डेस्कटॉप पर सभी कार्ड्स
  const displayedPackages = isMobile ? [packagesData[currentIndex]] : packagesData;

  return (
    <section className="tourpackage-section">
      <div className="tourpackage-container">
        
        {/* ================= HEADER ================= */}
        <div className="tourpackage-header">
          <div className="tourpackage-badge">
            <span className="badge-arrow">→</span>
            <span className="badge-text">Tour Package</span>
            <span className="badge-wave">~</span>
          </div>
          <h2 className="tourpackage-main-title">Affordable Vacation Bundles</h2>
        </div>

        {/* ================= CARDS CONTAINER ================= */}
        <div className="tourpackage-grid">
          {displayedPackages.map((pkg) => (
            <div key={pkg.id} className="tourpackage-card">
              
              {/* Card Image Wrap */}
              <div className="card-img-wrap">
                <img src={pkg.image} alt={pkg.title} className="card-image" />
                
                {/* 🌟 IMAGE SHINE EFFECT OVERLAY */}
                <div className="shine-sweep-overlay"></div>
                
                {/* Duration Badge */}
                <span className="badge-duration">{pkg.duration}</span>
                
                {/* Package Tag */}
                <div className="badge-location-tag">
                  <FaMapMarkerAlt className="loc-icon" />
                  <span>{pkg.tag}</span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="card-body-content">
                <h3 className="card-title">{pkg.title}</h3>
                <p className="card-route-text">{pkg.route}</p>
                
                <hr className="card-divider-line" />

                {/* Card Footer: Price & CTA */}
                <div className="card-footer-flex">
                  <div className="price-container">
                    <span className="starting-text">Starting From:</span>
                    <div className="price-row">
                      <span className="active-price">{pkg.price}</span>
                      {pkg.oldPrice && <span className="striked-price">{pkg.oldPrice}</span>}
                    </div>
                    <span className="taxes-note">TAXES INCL/PERS</span>
                  </div>

                  <button 
                    type="button" 
                    className="btn-book-tour-pkg"
                    onClick={() => handleBooking(pkg.title)}
                  >
                    <span>Book A Trip</span>
                    <FaPlane className="plane-fly-icon" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ================= MOBILE SLIDER CONTROLS (ARROWS & DOTS) ================= */}
        {isMobile && (
          <div className="mobile-slider-controls">
            <button 
              type="button" 
              className="slider-arrow-btn" 
              onClick={handlePrev} 
              aria-label="Previous Package"
            >
              <FaChevronLeft />
            </button>

            <div className="slider-indicator-dots">
              {packagesData.map((_, idx) => (
                <span
                  key={idx}
                  className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>

            <button 
              type="button" 
              className="slider-arrow-btn" 
              onClick={handleNext} 
              aria-label="Next Package"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* ================= 🌟 VIEW ALL PACKAGES BUTTON ================= */}
        <div className="view-all-packages-wrapper">
          <button 
            type="button" 
            className="btn-view-all-golden" 
            onClick={handleViewAll}
          >
            <span>View All Packages</span>
            <FaChevronRight className="view-all-arrow" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Tourpackage;