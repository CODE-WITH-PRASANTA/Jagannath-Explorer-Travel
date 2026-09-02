import React from 'react';
import './BookTrip.css';

// React Icons
import { FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

// WebP image imports from src/assets/
import trip1 from '../../assets/img1.webp';
import trip2 from '../../assets/img2.webp';
import trip3 from '../../assets/img3.webp';
import trip4 from '../../assets/img4.webp';
import trip5 from '../../assets/img5.webp';
import trip6 from '../../assets/img6.webp';
import trip7 from '../../assets/img7.webp';
import trip8 from '../../assets/img8.webp';
import trip9 from '../../assets/img1.webp';

const BookTrip = () => {
  // All 9 tour packages with updated INR Pricing
  const tripsData = [
    {
      id: 1,
      duration: '3 DAYS / 4 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip1,
      title: "The Allure Italy's Rich Culture, History, And Cuisine.",
      routes: ['ALEXANDRIA', 'SHARM EL SHEIKH', 'MANSOURA', 'KAIRO'],
      price: '₹2,39,999',
      oldPrice: '₹2,50,000',
    },
    {
      id: 2,
      duration: '7 DAYS / 8 NIGHT',
      tag: 'EGYPT + TURKEY TOUR',
      image: trip2,
      title: "Explore Travel NYC's Museums, Diversity, And Energy.",
      routes: ['MECCA', 'MEDINA', 'RIYADH', 'DOHA', 'AL WAKRA'],
      price: '₹2,69,999',
      oldPrice: '',
    },
    {
      id: 3,
      duration: '5 DAYS / 6 NIGHT',
      tag: 'FRANCE + SPAIN TOUR',
      image: trip3,
      title: 'Embark Tranquility, Adventure, And Spiritual.',
      routes: ['ALEXANDRIA', 'SHARM EL SHEIKH', 'MANSOURA', 'KAIRO'],
      price: '₹1,64,999',
      oldPrice: '₹2,05,000',
    },
    {
      id: 4,
      duration: '8 DAYS / 9 NIGHT',
      tag: 'INDIA + JAPAN TOUR',
      image: trip4,
      title: 'Embracing City Lights, Landm, And Iconic Culture.',
      routes: ['BANGALORE', 'CHENNAI', 'NEW DELHI', 'DHAKA'],
      price: '₹3,14,999',
      oldPrice: '',
    },
    {
      id: 5,
      duration: '6 DAYS / 7 NIGHT',
      tag: 'BRAZIL + HUNGARY TOUR',
      image: trip5,
      title: 'A Journey Of Tour Beauty And Inspiration.',
      routes: ['PARIS', 'MARSEILLE', 'BORDEAUX', 'MADRID', 'BARCELONA'],
      price: '₹3,78,000',
      oldPrice: '₹4,15,000',
    },
    {
      id: 6,
      duration: '4 DAYS / 5 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip6,
      title: 'Adventure Art, Architecture, And Mediterranean.',
      routes: ['KATHMANDU', 'POKHARA', 'LALITPUR', 'JAKARTA'],
      price: '₹4,40,999',
      oldPrice: '₹4,56,000',
    },
    {
      id: 7,
      duration: '2 DAYS / 3 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip7,
      title: 'Exploring Ancient Ruins, Histor Landmarks, And Cultural.',
      routes: ['KATHMANDU', 'POKHARA', 'LALITPUR', 'JAKARTA'],
      price: '₹4,40,999',
      oldPrice: '₹4,56,000',
    },
    {
      id: 8,
      duration: '3 DAYS / 4 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip8,
      title: 'Immersive Cultural Expirees, Local Cuisine.',
      routes: ['KATHMANDU', 'POKHARA', 'LALITPUR', 'JAKARTA'],
      price: '₹4,40,999',
      oldPrice: '₹4,56,000',
    },
    {
      id: 9,
      duration: '3 DAYS / 4 NIGHT',
      tag: 'NEPAL + INDONESIA TOUR',
      image: trip9,
      title: 'Embracing City Lights, Landm, And Iconic Culture.',
      routes: ['KATHMANDU', 'POKHARA', 'LALITPUR', 'JAKARTA'],
      price: '₹4,40,999',
      oldPrice: '₹4,56,000',
    },
  ];

  return (
    <div className="BookTrip">
      <div className="BookTrip-container">
        <div className="BookTrip-grid">
          {tripsData.map((trip) => (
            <div className="BookTrip-card" key={trip.id}>
              {/* Card Image Container with Zoom In/Out Pulse Effect */}
              <div className="BookTrip-imageContainer">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="BookTrip-image"
                />

                {/* Overlaid Badges */}
                <div className="BookTrip-durationBadge">{trip.duration}</div>
                <div className="BookTrip-locationTag">
                  <FaMapMarkerAlt className="BookTrip-tagIcon" />
                  <span>{trip.tag}</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="BookTrip-content">
                <h3 className="BookTrip-title">{trip.title}</h3>

                {/* Infinite Scrolling Route Line */}
                <div className="BookTrip-routeTicker">
                  <div className="BookTrip-routeTrack">
                    {[...trip.routes, ...trip.routes].map((city, idx) => (
                      <React.Fragment key={idx}>
                        <span className="BookTrip-cityName">{city}</span>
                        <span className="BookTrip-arrow">➔</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="BookTrip-divider"></div>

                {/* Footer Section */}
                <div className="BookTrip-footer">
                  <div className="BookTrip-priceBlock">
                    <span className="BookTrip-priceLabel">Starting Form:</span>
                    <div className="BookTrip-priceRow">
                      <span className="BookTrip-currentPrice">
                        {trip.price}
                      </span>
                      {trip.oldPrice && (
                        <span className="BookTrip-oldPrice">
                          {trip.oldPrice}
                        </span>
                      )}
                    </div>
                    <span className="BookTrip-taxInfo">TAXES INCL/PERS</span>
                  </div>

                  {/* Book Button */}
                  <button className="BookTrip-btn">
                    <span>Book A Trip</span>
                    <FaPaperPlane className="BookTrip-btnIcon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookTrip;