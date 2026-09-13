import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlane, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { API, IMG_URL } from '../../api/axios';
import './Tourpackage.css';

// Fallback images in case a database tour item has no image uploaded
import packageImg1 from '../../assets/img2.webp';
import packageImg2 from '../../assets/img3.webp';
import packageImg3 from '../../assets/bed5.webp';
import packageImg4 from '../../assets/img4.webp';
import packageImg5 from '../../assets/bed6.webp';
import packageImg6 from '../../assets/img7.webp';

const fallbackImages = [packageImg1, packageImg2, packageImg3, packageImg4, packageImg5, packageImg6];

const Tourpackage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Helper to format route string
  const formatRoute = (tour) => {
    if (tour.route) return tour.route;
    if (Array.isArray(tour.itinerary) && tour.itinerary.length > 0) {
      const places = tour.itinerary
        .map((item) => (item.title ? item.title.replace(/^Day \d+[:\s-]*/i, '').trim() : ''))
        .filter(Boolean);
      if (places.length > 0) return places.join(' → ');
    }
    if (Array.isArray(tour.tags) && tour.tags.length > 0) {
      return tour.tags.join(' → ');
    }
    return tour.destination ? `${tour.destination.toUpperCase()} & SIGHTSEEING TOUR` : 'BHUBANESWAR → PURI → KONARK';
  };

  // Helper for image URL
  const getImageUrl = (imagePath, idx) => {
    if (!imagePath) return fallbackImages[idx % fallbackImages.length];
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `${IMG_URL}${imagePath}`;
  };

  // Fetch real-time tours from Database only
  useEffect(() => {
    let isMounted = true;

    const fetchRealTours = async () => {
      try {
        setLoading(true);
        const res = await API.get('/tours');
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          const transformed = res.data.data.map((tour, idx) => {
            const formattedPrice = typeof tour.price === 'number' 
              ? `₹${tour.price.toLocaleString('en-IN')}` 
              : (tour.price ? `₹${tour.price}` : '₹0');

            const formattedOldPrice = tour.discountPrice && Number(tour.discountPrice) > 0
              ? `₹${Number(tour.discountPrice).toLocaleString('en-IN')}`
              : null;

            const tag = tour.category 
              ? tour.category.toUpperCase() 
              : (tour.destination ? `${tour.destination.toUpperCase()} SPECIAL` : 'ODISHA TOUR');

            return {
              id: tour._id || idx + 1,
              _id: tour._id,
              slug: tour.slug || tour._id,
              title: tour.title,
              duration: tour.duration || '3 DAYS / 2 NIGHT',
              tag: tag,
              route: formatRoute(tour),
              price: formattedPrice,
              oldPrice: formattedOldPrice,
              image: getImageUrl(tour.mainImage, idx),
            };
          });

          if (isMounted) {
            setPackages(transformed);
          }
        }
      } catch (err) {
        console.error('Error fetching real-time tours:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRealTours();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : packages.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < packages.length - 1 ? prev + 1 : 0));
  };

  const handleCardClick = (pkg) => {
    if (pkg.slug || pkg._id) {
      navigate(`/tours/${pkg.slug || pkg._id}`);
    } else {
      navigate('/tours');
    }
  };

  const handleBooking = (e, pkg) => {
    e.stopPropagation();
    if (pkg.slug || pkg._id) {
      navigate(`/tours/${pkg.slug || pkg._id}`);
    } else {
      window.location.href = 'tel:9668892441';
    }
  };

  const handleViewAll = () => {
    navigate('/tours');
  };

  const displayedPackages = isMobile 
    ? (packages[currentIndex] ? [packages[currentIndex]] : packages.slice(0, 1)) 
    : packages;

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

        {/* ================= LOADING STATE ================= */}
        {loading && (
          <div className="tourpackage-loading-box">
            <div className="tourpackage-spinner"></div>
            <p className="tourpackage-loading-text">Loading tour packages...</p>
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && packages.length === 0 && (
          <div className="tourpackage-empty-box">
            <p className="tourpackage-empty-text">No tour packages available at the moment.</p>
          </div>
        )}

        {/* ================= 3-COLUMN CARDS GRID ================= */}
        {!loading && packages.length > 0 && (
          <div className="tourpackage-grid">
            {displayedPackages.map((pkg, idx) => (
              <article 
                key={pkg._id || pkg.id || idx} 
                className="tourpackage-card"
                onClick={() => handleCardClick(pkg)}
                style={{ cursor: 'pointer' }}
              >
                
                {/* Card Image Wrap */}
                <div className="card-img-wrap">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="card-image" 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImages[idx % fallbackImages.length];
                    }}
                  />
                  
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
                  <h3 className="card-title" title={pkg.title}>{pkg.title}</h3>
                  <p className="card-route-text" title={pkg.route}>{pkg.route}</p>
                  
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
                      onClick={(e) => handleBooking(e, pkg)}
                    >
                      <span>Book Trip</span>
                      <FaPlane className="plane-fly-icon" />
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

        {/* ================= MOBILE SLIDER CONTROLS ================= */}
        {!loading && isMobile && packages.length > 1 && (
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
              {packages.map((_, idx) => (
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
        {!loading && packages.length > 0 && (
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
        )}

      </div>
    </section>
  );
};

export default Tourpackage;