import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Carrental.css';

// अपनी इमेज फ़ाइल्स को यहाँ इम्पोर्ट करें (पाथ और नाम अपने अनुसार सेट करें)
import swiftDzireImg from '../../assets/Swift-Dezire.webp';
import ertigaImg from '../../assets/Maruti-Suzuki-Ertiga.webp';
import audiA4Img from '../../assets/Wedding-car-Audi-A4-1.webp';
import innovaCrystaImg from '../../assets/Tempo-Traveller-13-SEATER.webp';
import scorpioNImg from '../../assets/Urbania-Traveller.webp';
import eClassImg from '../../assets/SML-COACH-13-SEATER.webp';

const carData = [
  {
    id: 1,
    name: 'Swift Dzire',
    image: swiftDzireImg, // इम्पोर्ट किया गया वेरिएबल यहाँ असाइन करें
    specs: [
      { label: 'Seating Capacity', value: '5 Seater' },
      { label: 'A/C', value: 'Automatic Climate Control' },
      { label: 'Boot Space', value: '378L' },
      { label: 'Fuel Type', value: 'Petrol' },
    ],
    price: '₹2200',
    duration: '/8 Hours',
    hasMoreCars: false,
  },
  {
    id: 2,
    name: 'Maruti Suzuki Ertiga',
    image: ertigaImg,
    specs: [
      { label: 'Seating Capacity', value: '7 Seater' },
      { label: 'A/C', value: 'Automatic + Rear AC Vents' },
      { label: 'Boot Space', value: '209 Litres' },
      { label: 'Fuel Type', value: 'Petrol' },
    ],
    price: '₹3000',
    duration: '/8 Hours',
    hasMoreCars: false,
  },
  {
    id: 3,
    name: 'Audi A4',
    image: audiA4Img,
    specs: [
      { label: 'Sunroof', value: 'Electric Sunroof' },
      { label: 'Interior', value: 'Premium Leather Interior' },
      { label: 'Use', value: 'Luxury Wedding / Groom Entry' },
      { label: 'Advantage', value: 'Smooth Ride' },
    ],
    price: '',
    duration: '',
    hasMoreCars: true,
  },
  {
    id: 4,
    name: 'Tempo Traveller',
    image: innovaCrystaImg,
    specs: [
      { label: 'Seating Capacity', value: '7/8 Seater' },
      { label: 'A/C', value: 'Dual Zone Climate Control' },
      { label: 'Boot Space', value: '300 Litres' },
      { label: 'Fuel Type', value: 'Diesel' },
    ],
    price: '₹3800',
    duration: '/8 Hours',
    hasMoreCars: false,
  },
  {
    id: 5,
    name: '10 Seater Urbania',
    image: scorpioNImg,
    specs: [
      { label: 'Seating Capacity', value: '7 Seater' },
      { label: 'A/C', value: 'Dual Zone FATC' },
      { label: 'Boot Space', value: '460 Litres' },
      { label: 'Fuel Type', value: 'Diesel (4x4)' },
    ],
    price: '₹3500',
    duration: '/8 Hours',
    hasMoreCars: false,
  },
  {
    id: 6,
    name: 'SML Coach-13 Seater',
    image: eClassImg,
    specs: [
      { label: 'Sunroof', value: 'Panoramic Sunroof' },
      { label: 'Interior', value: 'Artico Leather + Ambient Light' },
      { label: 'Use', value: 'VIP & Corporate Delegate' },
      { label: 'Advantage', value: 'First-Class Comfort' },
    ],
    price: '',
    duration: '',
    hasMoreCars: true,
  }
];

const Carrental = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const slideTimerRef = useRef(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 768) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1120) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, carData.length - visibleCount);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);
  };

  const stopAutoSlide = () => {
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [maxIndex]);

  const handleNext = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    startAutoSlide();
  };

  const handlePrev = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    startAutoSlide();
  };

  const handleBooking = (carName) => {
    alert(`Booking initiated for: ${carName}`);
  };

  const handleMoreCars = () => {
    alert('Opening full vehicle catalog...');
  };

  return (
    <section 
      className="car-rental"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="car-rental__header">
        <span className="car-rental__subtitle">Car Rental</span>
        <h2 className="car-rental__title">
          Comfortable Car Rental and Tour Services in Bhubaneswar, Odisha
        </h2>
        <p className="car-rental__description">
          Taxi booking, car rental and Odisha tour packages for airport pickup, temple visits, Puri-Konark tours and family travel. Clean vehicles, local drivers, fair price and on-time service make journeys smooth. <strong>Best Travels and Tours Agency Bhubaneswar Odisha</strong>, trusted travel support for easy and safe tours.
        </p>
      </div>

      <div className="car-rental__slider-wrapper">
        <button 
          type="button" 
          className="car-rental__side-arrow car-rental__side-arrow--left" 
          onClick={handlePrev}
          aria-label="Slide Left"
        >
          <FaChevronLeft />
        </button>

        <button 
          type="button" 
          className="car-rental__side-arrow car-rental__side-arrow--right" 
          onClick={handleNext}
          aria-label="Slide Right"
        >
          <FaChevronRight />
        </button>

        <div className="car-rental__carousel-window">
          <div 
            className="car-rental__carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
            }}
          >
            {carData.map((car) => (
              <div 
                key={car.id} 
                className="car-rental__slide-item"
                style={{ flex: `0 0 ${100 / visibleCount}%` }}
              >
                <div className="car-rental__card">
                  <div className="car-rental__image-box">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="car-rental__car-image" 
                      loading="lazy"
                    />
                  </div>

                  <div className="car-rental__body">
                    <h3 className="car-rental__car-name">{car.name}</h3>

                    <div className="car-rental__specs-list">
                      {car.specs.map((spec, i) => (
                        <div key={i} className="car-rental__spec-row">
                          <span className="car-rental__spec-label">{spec.label}</span>
                          <span className="car-rental__spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="car-rental__footer">
                      {car.price ? (
                        <div className="car-rental__price-box">
                          <span className="car-rental__price">{car.price}</span>
                          <span className="car-rental__duration">{car.duration}</span>
                        </div>
                      ) : null}

                      <div className={`car-rental__actions ${!car.price ? 'car-rental__actions--full' : ''}`}>
                        {car.hasMoreCars && (
                          <button 
                            type="button" 
                            className="car-rental__btn car-rental__btn--outline"
                            onClick={handleMoreCars}
                          >
                            More Cars &rarr;
                          </button>
                        )}

                        <button 
                          type="button" 
                          className="car-rental__btn car-rental__btn--primary"
                          onClick={() => handleBooking(car.name)}
                        >
                          Book Now &rarr;
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="car-rental__dots">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`car-rental__dot ${index === currentIndex ? 'car-rental__dot--active' : ''}`}
            onClick={() => {
              stopAutoSlide();
              setCurrentIndex(index);
              startAutoSlide();
            }}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carrental;