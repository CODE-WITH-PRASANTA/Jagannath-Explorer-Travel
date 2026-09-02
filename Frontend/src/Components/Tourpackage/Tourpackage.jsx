import React from 'react';
import { FaMapMarkerAlt, FaPlane } from 'react-icons/fa';
import './Tourpackage.css';

// 👉 यदि आपकी इमेजेस लोकल फोल्डर में हैं, तो यहाँ अनकमेंट करके पाथ दें:
// import packageImg1 from '../../assets/package-1.jpg';
// import packageImg2 from '../../assets/package-2.jpg';
// import packageImg3 from '../../assets/package-3.jpg';
// import packageImg4 from '../../assets/package-4.jpg';
// import packageImg5 from '../../assets/package-5.jpg';
// import packageImg6 from '../../assets/package-6.jpg';

const packagesData = [
  {
    id: 1,
    duration: '3 DAYS / 4 NIGHT',
    tag: 'NEPAL + INDONESIA TOUR',
    title: "The Allure Italy's Rich Culture, History, And Cuisine.",
    route: 'ALEXANDRIA → SHARM EL SHEIKH → MANSOURA → K.',
    price: '$2,898',
    oldPrice: '$3000',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    duration: '7 DAYS / 8 NIGHT',
    tag: 'EGYPT + TURKEY TOUR',
    title: "Explore Travel NYC's Museums, Diversity, And Energy.",
    route: 'MECCA → MEDINA → RIYADH → DOHA → AL WAKRA',
    price: '$3,256',
    oldPrice: '',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    duration: '5 DAYS / 6 NIGHT',
    tag: 'FRANCE + SPAIN TOUR',
    title: 'Embark Tranquility, Adventure, And Spiritual.',
    route: 'ALEXANDRIA → SHARM EL SHEIKH → MANSOURA → K.',
    price: '$1,988',
    oldPrice: '$2500',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    duration: '8 DAYS / 9 NIGHT',
    tag: 'INDIA + JAPAN TOUR',
    title: 'Embracing City Lights, Landm, And Iconic Culture.',
    route: 'BANGALORE → CHENNAI → NEW DELHI → DHAKA →',
    price: '$3,798',
    oldPrice: '',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    duration: '6 DAYS / 7 NIGHT',
    tag: 'BRAZIL + HUNGARY TOUR',
    title: 'A Journey Of Tour Beauty And Inspiration.',
    route: 'PARIS → MARSEILLE → BORDEAUX → MADRID → B',
    price: '$4,562',
    oldPrice: '$5,000',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    duration: '4 DAYS / 5 NIGHT',
    tag: 'NEPAL + INDONESIA TOUR',
    title: 'Adventure Art, Architecture, And Mediterranean.',
    route: 'KATHMANDU → POKHARA → LALITPUR → JAKARTA →',
    price: '$5,320',
    oldPrice: '$5,500',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800&auto=format&fit=crop'
  }
];

const Tourpackage = () => {
  const handleBooking = (tourTitle) => {
    alert(`Redirecting to booking for: ${tourTitle}`);
  };

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

        {/* ================= 6 CARDS GRID (3 Columns) ================= */}
        <div className="tourpackage-grid">
          {packagesData.map((pkg) => (
            <div key={pkg.id} className="tourpackage-card">
              
              {/* Card Image Wrap */}
              <div className="card-img-wrap">
                <img src={pkg.image} alt={pkg.title} className="card-image" />
                
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
                    <span className="starting-text">Starting Form:</span>
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

      </div>
    </section>
  );
};

export default Tourpackage;