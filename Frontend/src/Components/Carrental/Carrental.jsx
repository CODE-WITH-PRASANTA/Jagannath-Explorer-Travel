import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes, FaCheck, FaUser, FaPhoneAlt } from 'react-icons/fa';
import './Carrental.css';
import API from '../../api/axios';

// अपनी इमेज फ़ाइल्स को यहाँ इम्पोर्ट करें
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
    image: swiftDzireImg,
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
    price: '₹9500',
    duration: '/8 Hours',
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
    price: '₹5500',
    duration: '/8 Hours',
    hasMoreCars: true,
  }
];

const Carrental = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const slideTimerRef = useRef(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDateTime: '',
    dropDateTime: '',
    fullName: '',
    phone: '',
    message: '',
    agreeTerms: false,
  });

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

  // Open Modal Handler
  const handleBooking = (car) => {
    setSelectedCar(car);
    setStep(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Step 1 Validation
  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!formData.pickupLocation || !formData.dropLocation || !formData.pickupDateTime || !formData.dropDateTime) {
      alert('Please fill out pickup & drop locations and date/time.');
      return;
    }
    setStep(2);
  };

  // Step 2 Submit
  const [submitting, setSubmitting] = useState(false);

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please enter your full name and 10 digit mobile number.');
      return;
    }

    const cleanMobile = formData.phone.replace(/\D/g, '');
    if (!/^\d{10}$/.test(cleanMobile)) {
      alert('Please enter a valid 10 digit mobile number.');
      return;
    }

    if (!formData.agreeTerms) {
      alert('Please accept terms & conditions to proceed.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        vehicleName: selectedCar?.name || 'Rental Car',
        vehicleType: 'Car Rental',
        vehiclePrice: selectedCar?.price ? `${selectedCar.price} ${selectedCar.duration || ''}` : '',
        vehicleImage: typeof selectedCar?.image === 'string' ? selectedCar.image : '',
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropLocation,
        pickupDateTime: formData.pickupDateTime,
        dropDateTime: formData.dropDateTime,
        fullName: formData.fullName,
        mobileNumber: cleanMobile,
        message: formData.message || '',
        agreedToTerms: formData.agreeTerms,
      };

      await API.post('/car-bookings', payload);
      // Final Step 3 Screen
      setStep(3);
    } catch (error) {
      console.error('Car rental booking error:', error);
      alert(
        error.response?.data?.message ||
          'Failed to submit booking. Please verify your details or call our team.'
      );
    } finally {
      setSubmitting(false);
    }
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
                            onClick={() => (window.location.href = '/car-rental/sedan-cars')}
                          >
                            More Cars &rarr;
                          </button>
                        )}

                        <button 
                          type="button" 
                          className="car-rental__btn car-rental__btn--primary"
                          onClick={() => handleBooking(car)}
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

      {/* ================= 🌟 3-STEP INTERACTIVE BOOKING POPUP ================= */}
      {isModalOpen && (
        <div className="bk-overlay" onClick={closeModal}>
          <div className="bk-card" onClick={(e) => e.stopPropagation()}>
            <button className="bk-close-btn" onClick={closeModal} aria-label="Close modal">
              <FaTimes />
            </button>

            {/* STEP 1: START YOUR BOOKING */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="bk-form">
                <span className="bk-pill-subtitle">RESERVE YOUR RIDE</span>
                <h3 className="bk-main-title">Start Your Booking</h3>

                {/* Car Preview Badge */}
                <div className="bk-car-preview">
                  <img src={selectedCar?.image} alt={selectedCar?.name} className="bk-preview-thumb" />
                  <div className="bk-preview-info">
                    <h4 className="bk-preview-name">{selectedCar?.name}</h4>
                    <span className="bk-preview-price">
                      {selectedCar?.price || '₹2200'} <small>{selectedCar?.duration || '/8 Hours'}</small>
                    </span>
                  </div>
                </div>

                <div className="bk-inputs-grid">
                  <div className="bk-field-group">
                    <label>Pick Up Location</label>
                    <input 
                      type="text" 
                      name="pickupLocation" 
                      placeholder="Pick Up Location"
                      value={formData.pickupLocation} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="bk-field-group">
                    <label>Drop Off Location</label>
                    <input 
                      type="text" 
                      name="dropLocation" 
                      placeholder="Drop Off Location"
                      value={formData.dropLocation} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="bk-field-group">
                    <label>Pick Up Date & Time</label>
                    <input 
                      type="datetime-local" 
                      name="pickupDateTime" 
                      value={formData.pickupDateTime} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="bk-field-group">
                    <label>Drop Date & Time</label>
                    <input 
                      type="datetime-local" 
                      name="dropDateTime" 
                      value={formData.dropDateTime} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="bk-footer-single">
                  <button type="submit" className="bk-btn-cyan">
                    Next &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: CONFIRM YOUR BOOKING DETAILS */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="bk-form">
                <h3 className="bk-main-title mt-top">Confirm Your Booking Details</h3>

                <div className="bk-single-fields">
                  <div className="bk-icon-input">
                    <input 
                      type="text" 
                      name="fullName" 
                      placeholder="* Enter Your Full Name" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      required 
                    />
                    <FaUser className="bk-field-icon" />
                  </div>

                  <div className="bk-icon-input">
                    <input 
                      type="tel" 
                      name="phone" 
                      maxLength="10"
                      pattern="[0-9]{10}"
                      placeholder="* Enter 10 Digit Mobile Number" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                    />
                    <FaPhoneAlt className="bk-field-icon" />
                  </div>

                  <div className="bk-textarea-box">
                    <textarea 
                      name="message" 
                      maxLength="150"
                      rows="3" 
                      placeholder="Your Message (max 150 characters)"
                      value={formData.message} 
                      onChange={handleInputChange}
                    />
                  </div>

                  <label className="bk-checkbox-label">
                    <input 
                      type="checkbox" 
                      name="agreeTerms" 
                      checked={formData.agreeTerms} 
                      onChange={handleInputChange} 
                    />
                    <span>
                      I agree to the <a href="#terms">Terms & Conditions</a> from <strong>Jagannath Explore Travel</strong>.
                    </span>
                  </label>
                </div>

                <div className="bk-dual-actions">
                  <button type="button" className="bk-btn-dark" onClick={() => setStep(1)}>
                    &larr; Previous
                  </button>
                  <button type="submit" className="bk-btn-cyan">
                    Submit &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: SUCCESS / DONE SCREEN */}
            {step === 3 && (
              <div className="bk-success-box">
                <div className="bk-check-circle">
                  <FaCheck />
                </div>
                <h3 className="bk-success-title">Booking Request Received!</h3>
                <p className="bk-success-text">
                  Your vehicle reservation request for <strong>{selectedCar?.name || 'Selected Car'}</strong> has been logged successfully. Our team will contact you shortly.
                </p>

                <button type="button" className="bk-btn-cyan btn-center" onClick={closeModal}>
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
};

export default Carrental;