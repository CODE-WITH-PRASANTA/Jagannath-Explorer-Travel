import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  Phone, 
  MapPin, 
  IndianRupee, 
  Users, 
  PlusCircle, 
  Trash2, 
  ChevronRight,
  Home,
  CheckCircle2,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import './Tourbooking.css';

const Tourbooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    packageName: '',
    phone: '',
    destination: '',
    price: '',
    members: '',
  });

  const [viewMode, setViewMode] = useState('table'); // 'table' | 'card'

  // Pre-loaded dummy booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: 'Rohan Sharma',
      packageName: 'Puri Heritage Special',
      phone: '+91 98765 43210',
      destination: 'Puri - Konark',
      price: '12500',
      members: '4',
      date: '10 Sep 2026',
      status: 'Confirmed'
    },
    {
      id: 2,
      name: 'Ananya Verma',
      packageName: 'Golden Triangle Odisha',
      phone: '+91 98451 22334',
      destination: 'Bhubaneswar - Puri - Chilika',
      price: '24000',
      members: '3',
      date: '09 Sep 2026',
      status: 'Confirmed'
    },
    {
      id: 3,
      name: 'Deepak Pattnaik',
      packageName: 'Chilika Eco Wonder',
      phone: '+91 94370 88991',
      destination: 'Chilika Lake - Satapada',
      price: '8500',
      members: '2',
      date: '08 Sep 2026',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Sneha Kulkarni',
      packageName: 'Odisha Tribal Circuit',
      phone: '+91 91234 56780',
      destination: 'Koraput - Rayagada',
      price: '32000',
      members: '5',
      date: '07 Sep 2026',
      status: 'Confirmed'
    }
  ]);

  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.packageName || !formData.phone || !formData.destination || !formData.price || !formData.members) {
      alert('Please fill in all required fields!');
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...formData,
      status: 'Confirmed',
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
    };

    setBookings([newBooking, ...bookings]);

    setFormData({
      name: '',
      packageName: '',
      phone: '',
      destination: '',
      price: '',
      members: '',
    });

    setNotification('Booking added successfully!');
    setTimeout(() => setNotification(''), 3500);
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter((item) => item.id !== id));
  };

  return (
    <div className="tb-container">
      {/* Breadcrumb Top Navigation Header */}
      <header className="tb-top-header">
        <nav className="tb-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="tb-breadcrumb-link">
            <Home size={16} />
            <span>Dashboard</span>
          </Link>
          <ChevronRight size={15} className="tb-breadcrumb-separator" />
          <span className="tb-breadcrumb-current">Tour Booking</span>
        </nav>

        <div className="tb-header-titles">
          <h1 className="tb-title">Tour Booking</h1>
          <p className="tb-subtitle">Enter customer booking details and manage active reservations seamlessly.</p>
        </div>
      </header>

      {notification && (
        <div className="tb-alert">
          <CheckCircle2 size={18} color="#16a34a" />
          <span>{notification}</span>
        </div>
      )}

      {/* Booking Form Card */}
      <div className="tb-form-card">
        <div className="tb-card-header">
          <h2 className="tb-card-title">Add New Booking</h2>
        </div>

        <form onSubmit={handleSubmit} className="tb-form">
          <div className="tb-form-grid">
            
            {/* Customer Name */}
            <div className="tb-input-group">
              <label>Customer Name</label>
              <div className="tb-input-wrapper">
                <User size={18} className="tb-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Rajesh Mohanty"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Package Name */}
            <div className="tb-input-group">
              <label>Package Name</label>
              <div className="tb-input-wrapper">
                <Package size={18} className="tb-icon" />
                <input
                  type="text"
                  name="packageName"
                  placeholder="e.g. Golden Triangle Odisha"
                  value={formData.packageName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="tb-input-group">
              <label>Phone Number</label>
              <div className="tb-input-wrapper">
                <Phone size={18} className="tb-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. +91 98765 00000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Destination */}
            <div className="tb-input-group">
              <label>Destination</label>
              <div className="tb-input-wrapper">
                <MapPin size={18} className="tb-icon" />
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g. Puri - Chilika - Konark"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="tb-input-group">
              <label>Total Price (₹)</label>
              <div className="tb-input-wrapper">
                <IndianRupee size={18} className="tb-icon" />
                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 15000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Total Members */}
            <div className="tb-input-group">
              <label>Number of Members</label>
              <div className="tb-input-wrapper">
                <Users size={18} className="tb-icon" />
                <input
                  type="number"
                  name="members"
                  placeholder="e.g. 3"
                  value={formData.members}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>

          </div>

          <button type="submit" className="tb-submit-btn">
            <PlusCircle size={19} />
            <span>Confirm & Add Booking</span>
          </button>
        </form>
      </div>

      {/* Bookings Display Section */}
      <div className="tb-records-section">
        <div className="tb-records-header">
          <div>
            <h2 className="tb-records-title">Booking Records</h2>
            <span className="tb-records-count">{bookings.length} Total Bookings Recorded</span>
          </div>

          {/* Table / Card View Toggle */}
          <div className="tb-view-toggle">
            <button
              className={`tb-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <TableIcon size={16} />
              <span>Table</span>
            </button>
            <button
              className={`tb-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
              title="Card View"
            >
              <LayoutGrid size={16} />
              <span>Cards</span>
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="tb-empty-state">
            <Package size={46} className="tb-empty-icon" />
            <p>No bookings found. Use the form above to add a new booking.</p>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="tb-table-wrapper">
            <table className="tb-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Package</th>
                  <th>Destination</th>
                  <th>Phone No.</th>
                  <th>Members</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td className="tb-col-index">{index + 1}</td>
                    <td className="tb-col-name">{booking.name}</td>
                    <td>
                      <span className="tb-table-badge">{booking.packageName}</span>
                    </td>
                    <td>{booking.destination}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.members} Persons</td>
                    <td className="tb-col-price">₹{Number(booking.price).toLocaleString('en-IN')}</td>
                    <td className="tb-col-date">{booking.date}</td>
                    <td>
                      <span className={`tb-status-badge ${booking.status === 'Pending' ? 'pending' : 'confirmed'}`}>
                        {booking.status || 'Confirmed'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="tb-delete-btn"
                        title="Delete Booking"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Card View */
          <div className="tb-cards-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="tb-record-card">
                <div className="tb-record-card-top">
                  <div className="tb-pill-tag">{booking.packageName}</div>
                  <button 
                    onClick={() => handleDelete(booking.id)}
                    className="tb-delete-btn"
                    title="Delete Booking"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h3 className="tb-customer-name">{booking.name}</h3>

                <div className="tb-details-list">
                  <div className="tb-detail-row">
                    <MapPin size={16} className="tb-accent-icon" />
                    <span><strong>Destination:</strong> {booking.destination}</span>
                  </div>
                  <div className="tb-detail-row">
                    <Phone size={16} className="tb-accent-icon" />
                    <span><strong>Phone:</strong> {booking.phone}</span>
                  </div>
                  <div className="tb-detail-row">
                    <Users size={16} className="tb-accent-icon" />
                    <span><strong>Members:</strong> {booking.members} Persons</span>
                  </div>
                </div>

                <div className="tb-card-footer">
                  <div className="tb-price-box">
                    <span className="tb-price-label">Price</span>
                    <span className="tb-price-val">₹{Number(booking.price).toLocaleString('en-IN')}</span>
                  </div>
                  <span className="tb-date-tag">{booking.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tourbooking;