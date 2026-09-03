import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Carrental.css';

const carData = [
  {
    id: 1,
    name: 'Swift Dzire',
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/45691/dzire-exterior-right-front-three-quarter-3.jpeg?q=80',
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
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/102663/ertiga-exterior-right-front-three-quarter-5.jpeg?q=80',
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
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop',
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
    name: 'Toyota Innova Crysta',
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-2.png?q=80',
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
    name: 'Mahindra Scorpio-N',
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg?q=80',
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
    name: 'Mercedes-Benz E-Class',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
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

  // राइट एरो क्लिक -> आगे (Right/Next) स्लाइड
  const handleNext = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    startAutoSlide();
  };

  // लेफ्ट एरो क्लिक -> पीछे (Left/Prev) स्लाइड
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
      {/* हेडर */}
      <div className="car-rental__header">
        <span className="car-rental__subtitle">Car Rental</span>
        <h2 className="car-rental__title">
          Comfortable Car Rental and Tour Services in Bhubaneswar, Odisha
        </h2>
        <p className="car-rental__description">
          Taxi booking, car rental and Odisha tour packages for airport pickup, temple visits, Puri-Konark tours and family travel. Clean vehicles, local drivers, fair price and on-time service make journeys smooth. <strong>Best Travels and Tours Agency Bhubaneswar Odisha</strong>, trusted travel support for easy and safe tours.
        </p>
      </div>

      {/* स्लाइडर रैपर जिसके दोनों साइड्स में एरो बटन्स हैं */}
      <div className="car-rental__slider-wrapper">
        
        {/* लेफ्ट साइड एरो */}
        <button 
          type="button" 
          className="car-rental__side-arrow car-rental__side-arrow--left" 
          onClick={handlePrev}
          aria-label="Slide Left"
        >
          <FaChevronLeft />
        </button>

        {/* राइट साइड एरो */}
        <button 
          type="button" 
          className="car-rental__side-arrow car-rental__side-arrow--right" 
          onClick={handleNext}
          aria-label="Slide Right"
        >
          <FaChevronRight />
        </button>

        {/* कार्ड्स ट्रैक */}
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
                  
                  {/* कार इमेज */}
                  <div className="car-rental__image-box">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="car-rental__car-image" 
                      loading="lazy"
                    />
                  </div>

                  {/* कार विवरण */}
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

                    {/* फुटर (कीमत व बटन) */}
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

      {/* बॉटम डॉट्स */}
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