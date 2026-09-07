import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPlane, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import './Tourpackage.css';

// आवश्यकतानुसार अपनी स्थानीय इमेजेस यहाँ जोड़ें
import packageImg1 from '../../assets/img2.webp';
import packageImg2 from '../../assets/img3.webp';
import packageImg3 from '../../assets/bed5.webp';
import packageImg4 from '../../assets/img4.webp';
import packageImg5 from '../../assets/bed6.webp';
import packageImg6 from '../../assets/img7.webp';

const packagesData = [
  {
    id: 1,
    duration: '3 DAYS / 2 NIGHT',
    tag: 'GOLDEN TRIANGLE ODISHA',
    title: 'Puri Jagannath Dham, Konark Sun Temple & Bhubaneswar Heritage',
    route: 'BHUBANESWAR → DHAULI → PIPILI → PURI → KONARK',
    price: '₹7,499',
    oldPrice: '₹9,200',
    image: packageImg1
  },
  {
    id: 2,
    duration: '4 DAYS / 3 NIGHT',
    tag: 'CHILIKA LAKE SPECIAL',
    title: 'Chilika Dolphin Lagoon, Satapada & Mangalajodi Bird Sanctuary',
    route: 'BHUBANESWAR → SATAPADA → BARKUL → MANGALAJODI',
    price: '₹10,499',
    oldPrice: '₹12,800',
    image: packageImg2
  },
  {
    id: 3,
    duration: '5 DAYS / 4 NIGHT',
    tag: 'KASHMIR OF ODISHA',
    title: 'Daringbadi Valley, Hill View Coffee Gardens & Pine Forests',
    route: 'BHUBANESWAR → PHULBANI → DARINGBADI → MIDUBANDA',
    price: '₹13,999',
    oldPrice: '₹16,500',
    image: packageImg3
  },
  {
    id: 4,
    duration: '4 DAYS / 3 NIGHT',
    tag: 'WILDLIFE & MANGROVES',
    title: 'Bhitarkanika Crocodile Safari & Simlipal National Forest Trail',
    route: 'BHUBANESWAR → CHANDBALI → BHITARKANIKA → JASHIPUR',
    price: '₹11,800',
    oldPrice: '₹14,200',
    image: packageImg4
  },
  {
    id: 5,
    duration: '5 DAYS / 4 NIGHT',
    tag: 'TRIBAL & HIGHLAND TRAIL',
    title: 'Scenic Koraput Hills, Deomali Peak & Duduma Waterfalls',
    route: 'BHUBANESWAR → RAYAGADA → JEYPORE → KORAPUT',
    price: '₹15,499',
    oldPrice: '₹18,000',
    image: packageImg5
  },
  {
    id: 6,
    duration: '2 DAYS / 1 NIGHT',
    tag: 'NORTH ODISHA PILGRIMAGE',
    title: 'Ghatagaon Maa Tarini Darshan & Keonjhar Khandadhar Falls',
    route: 'BHUBANESWAR → GHATAGAON → KEONJHAR → SANAGHAGARA',
    price: '₹5,499',
    oldPrice: '₹6,800',
    image: packageImg6
  }
];

const Tourpackage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    window.location.href = 'tel:9668892441';
  };

  const handleViewAll = () => {
    window.location.href = '/tours';
  };

  const displayedPackages = isMobile ? [packagesData[currentIndex]] : packagesData;

  return (
    <section className="tourpackage-section">
      <div className="tourpackage-container">
        
        {/* ================= HEADER WITH H1 SEO KEYWORD ================= */}
        <div className="tourpackage-header">
          <div className="tourpackage-badge">
            <span className="badge-arrow">→</span>
            <span className="badge-text">Odisha Tour Packages</span>
            <span className="badge-wave">~</span>
          </div>
          <h1 className="tourpackage-main-title">Odisha Tourism Packages With Price</h1>
          <p className="tourpackage-subtext">
            Explore Lord Jagannath Dham Puri, Chilika Lake, scenic Daringbadi, and heritage temples with verified hotels, AC cabs, and transparent rates.
          </p>
        </div>

        {/* ================= 3-COLUMN CARDS GRID ================= */}
        <div className="tourpackage-grid">
          {displayedPackages.map((pkg) => (
            <article key={pkg.id} className="tourpackage-card">
              
              {/* Card Image Wrap */}
              <div className="card-img-wrap">
                <img src={pkg.image} alt={pkg.title} className="card-image" loading="lazy" />
                
                {/* Image Shine Sweep Overlay */}
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
                    <span className="taxes-note">PER PERSON / NET PRICE</span>
                  </div>

                  <button 
                    type="button" 
                    className="btn-book-tour-pkg"
                    onClick={() => handleBooking(pkg.title)}
                  >
                    <span>Book Trip</span>
                    <FaPlane className="plane-fly-icon" />
                  </button>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* ================= MOBILE SLIDER CONTROLS ================= */}
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

        {/* ================= VIEW ALL PACKAGES BUTTON ================= */}
        <div className="view-all-packages-wrapper">
          <button 
            type="button" 
            className="btn-view-all-golden" 
            onClick={handleViewAll}
          >
            <span>View All Odisha Packages</span>
            <FaChevronRight className="view-all-arrow" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Tourpackage;