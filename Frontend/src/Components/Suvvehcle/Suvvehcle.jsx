import React, { useState } from 'react';
import './Suvvehcle.css';
import { FaArrowRight, FaArrowLeft, FaTimes, FaUser, FaPhoneAlt } from 'react-icons/fa';

// Assets import matching your path requirement
import ertigaImg from '../../assets/Suv1.webp';
import innovaImg from '../../assets/Suv2.webp';
import crystaImg from '../../assets/Suv3.webp';

const carsData = [
  {
    id: 1,
    name: 'Maruti Suzuki Ertiga',
    image: ertigaImg,
    seating: '7 Seater',
    ac: 'Automatic + Rear AC Vents',
    bootSpace: '209 Litres',
    fuelType: 'Petrol',
    price: '₹3000',
    unit: '/8 Hours'
  },
  {
    id: 2,
    name: 'Toyota Innova',
    image: innovaImg,
    seating: '7 Seater',
    ac: 'Automatic + Rear AC Vents',
    bootSpace: '300 Litres (Approx.)',
    fuelType: 'Diesel',
    price: '₹3000',
    unit: '/8 Hours'
  },
  {
    id: 3,
    name: 'Toyota Innova Crysta',
    image: crystaImg,
    seating: '7 Seater',
    ac: 'Automatic + Rear AC Vents',
    bootSpace: '300 Litres (Approx.)',
    fuelType: 'Diesel',
    price: '₹4000',
    unit: '/8 Hours'
  }
];

const Suvvehcle = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [step, setStep] = useState(0); // 0: Closed, 1: Step 1 (Pickup/Drop), 2: Step 2 (Details)

  // Form State
  const [formData, setFormData] = useState({
    pickUpLocation: '',
    dropOffLocation: '',
    pickUpDateTime: '',
    dropDateTime: '',
    fullName: '',
    mobileNumber: '',
    message: '',
    agreedTerms: false
  });

  const handleOpenBooking = (car) => {
    setSelectedCar(car);
    setStep(1);
  };

  const handleCloseModal = () => {
    setStep(0);
    setSelectedCar(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedTerms) {
      alert('Please agree to the Terms & Conditions.');
      return;
    }
    alert('Booking submitted successfully!');
    handleCloseModal();
  };

  return (
    <section className="Suvvehcle">
      {/* Header Section */}
      <div className="Suvvehcle-header">
        <span className="Suvvehcle-subheading">SUV CARS</span>
        <h1 className="Suvvehcle-title">
          Premium SUV Car On Rent in<br />Bhubaneswar for Every Journey
        </h1>
        <p className="Suvvehcle-description">
          Enjoy comfortable and reliable SUV <strong>Taxi and Cab Service in Bhubaneswar</strong> with compact 5-seaters to
          spacious 7-seaters and multi-row family Outstation Cab Booking with professional drivers, perfect for
          both city travel and long-distance journeys.
        </p>
      </div>

      {/* Car Cards Grid */}
      <div className="Suvvehcle-grid">
        {carsData.map((car) => (
          <div className="Suvvehcle-card" key={car.id}>
            <div className="Suvvehcle-card-image-wrapper">
              <img src={car.image} alt={car.name} className="Suvvehcle-card-image" />
            </div>

            <h3 className="Suvvehcle-card-title">{car.name}</h3>

            <div className="Suvvehcle-card-details">
              <div className="Suvvehcle-detail-row">
                <span className="Suvvehcle-detail-label">Seating Capacity</span>
                <span className="Suvvehcle-detail-value">{car.seating}</span>
              </div>
              <div className="Suvvehcle-detail-row">
                <span className="Suvvehcle-detail-label">A/C</span>
                <span className="Suvvehcle-detail-value">{car.ac}</span>
              </div>
              <div className="Suvvehcle-detail-row">
                <span className="Suvvehcle-detail-label">Boot Space</span>
                <span className="Suvvehcle-detail-value">{car.bootSpace}</span>
              </div>
              <div className="Suvvehcle-detail-row">
                <span className="Suvvehcle-detail-label">Fuel Type</span>
                <span className="Suvvehcle-detail-value">{car.fuelType}</span>
              </div>
            </div>

            <div className="Suvvehcle-card-footer">
              <div className="Suvvehcle-card-price">
                <strong>{car.price}</strong><span>{car.unit}</span>
              </div>
              <button
                className="Suvvehcle-book-btn"
                onClick={() => handleOpenBooking(car)}
              >
                Book Now <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Popup Container */}
      {step > 0 && selectedCar && (
        <div className="Suvvehcle-modal-overlay">
          <div className="Suvvehcle-modal-content">
            <button className="Suvvehcle-modal-close" onClick={handleCloseModal}>
              <FaTimes />
            </button>

            {/* STEP 1: RESERVE YOUR RIDE */}
            {step === 1 && (
              <form onSubmit={handleNext} className="Suvvehcle-form">
                <span className="Suvvehcle-modal-subtitle">RESERVE YOUR RIDE</span>
                <h2 className="Suvvehcle-modal-title">Start Your Booking</h2>

                {/* Selected Car Info Banner */}
                <div className="Suvvehcle-selected-car">
                  <div className="Suvvehcle-selected-car-img">
                    <img src={selectedCar.image} alt={selectedCar.name} />
                  </div>
                  <div className="Suvvehcle-selected-car-info">
                    <h3>{selectedCar.name}</h3>
                    <p><strong>{selectedCar.price}</strong>{selectedCar.unit}</p>
                  </div>
                </div>

                {/* Input Grid */}
                <div className="Suvvehcle-form-grid">
                  <div className="Suvvehcle-form-group">
                    <label>Pick Up Location</label>
                    <input
                      type="text"
                      name="pickUpLocation"
                      placeholder="Pick Up Location"
                      value={formData.pickUpLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="Suvvehcle-form-group">
                    <label>Drop Off Location</label>
                    <input
                      type="text"
                      name="dropOffLocation"
                      placeholder="Drop Off Location"
                      value={formData.dropOffLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="Suvvehcle-form-group">
                    <label>Pick Up Date & Time</label>
                    <input
                      type="datetime-local"
                      name="pickUpDateTime"
                      value={formData.pickUpDateTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="Suvvehcle-form-group">
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

                <div className="Suvvehcle-modal-footer center">
                  <button type="submit" className="Suvvehcle-next-btn">
                    Next <FaArrowRight />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: CONFIRM BOOKING DETAILS */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="Suvvehcle-form">
                <h2 className="Suvvehcle-modal-title large-margin">Confirm Your Booking Details</h2>

                <div className="Suvvehcle-form-group icon-input">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="* Enter Your Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <FaUser className="Suvvehcle-input-icon" />
                </div>

                <div className="Suvvehcle-form-group icon-input">
                  <input
                    type="tel"
                    name="mobileNumber"
                    pattern="[0-9]{10}"
                    placeholder="* Enter 10 Digit Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <FaPhoneAlt className="Suvvehcle-input-icon" />
                </div>

                <div className="Suvvehcle-form-group">
                  <textarea
                    name="message"
                    maxLength={150}
                    placeholder="Your Message (max 150 characters)"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="Suvvehcle-checkbox-group">
                  <input
                    type="checkbox"
                    id="agreedTerms"
                    name="agreedTerms"
                    checked={formData.agreedTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="agreedTerms">
                    I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms & Conditions</a> from <strong>Jagannath Tours & Travels</strong>.
                  </label>
                </div>

                <div className="Suvvehcle-modal-footer space-between">
                  <button type="button" className="Suvvehcle-prev-btn" onClick={handlePrevious}>
                    <FaArrowLeft /> Previous
                  </button>
                  <button type="submit" className="Suvvehcle-submit-btn">
                    Submit <FaArrowRight />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Suvvehcle;