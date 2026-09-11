import React, { useState } from 'react';
import './TourBookings.css';
import {
  FaCalendarAlt,
  FaPlus,
  FaMapMarkedAlt,
  FaUsers,
  FaSearch,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaArrowUp,
  FaFilter
} from 'react-icons/fa';

const initialTourBookings = [
  { id: 1, bookingId: 'TR1001', name: 'Ankita Nayak', phone: '9827825440', tourPackage: 'Golden Triangle Classic', tourType: 'Luxury Tour', startDate: '10 Sep 2026', endDate: '15 Sep 2026', guests: '2 Persons', status: 'Confirmed', price: '₹24,500' },
  { id: 2, bookingId: 'TR1002', name: 'Rahul Sharma', phone: '9876543210', tourPackage: 'Himalayan Adventure Trek', tourType: 'Adventure Tour', startDate: '11 Sep 2026', endDate: '18 Sep 2026', guests: '4 Persons', status: 'Confirmed', price: '₹42,000' },
  { id: 3, bookingId: 'TR1003', name: 'Priya Das', phone: '9123456780', tourPackage: 'Kerala Backwaters & Hills', tourType: 'Standard Tour', startDate: '12 Sep 2026', endDate: '17 Sep 2026', guests: '2 Persons', status: 'Pending', price: '₹31,000' },
  { id: 4, bookingId: 'TR1004', name: 'Rohit Sahoo', phone: '8765432109', tourPackage: 'Goa Coastal Getaway', tourType: 'Standard Tour', startDate: '13 Sep 2026', endDate: '16 Sep 2026', guests: '3 Persons', status: 'Completed', price: '₹18,800' },
  { id: 5, bookingId: 'TR1005', name: 'Sneha Mishra', phone: '7987654321', tourPackage: 'Royal Rajasthan Heritage', tourType: 'Luxury Tour', startDate: '14 Sep 2026', endDate: '20 Sep 2026', guests: '2 Persons', status: 'Confirmed', price: '₹48,500' },
  { id: 6, bookingId: 'TR1006', name: 'Sourav Patra', phone: '9432145678', tourPackage: 'Kashmir Paradise Circuit', tourType: 'Luxury Tour', startDate: '15 Sep 2026', endDate: '22 Sep 2026', guests: '2 Persons', status: 'Confirmed', price: '₹52,000' },
  { id: 7, bookingId: 'TR1007', name: 'Neha Singh', phone: '7734562180', tourPackage: 'Andaman Island Explorer', tourType: 'Adventure Tour', startDate: '16 Sep 2026', endDate: '21 Sep 2026', guests: '1 Person', status: 'Cancelled', price: '₹36,200' },
  { id: 8, bookingId: 'TR1008', name: 'Amit Kumar', phone: '9056783210', tourPackage: 'Varanasi Spiritual Walk', tourType: 'Standard Tour', startDate: '17 Sep 2026', endDate: '19 Sep 2026', guests: '2 Persons', status: 'Confirmed', price: '₹14,800' },
  { id: 9, bookingId: 'TR1009', name: 'Pooja Verma', phone: '9812345678', tourPackage: 'Golden Triangle Classic', tourType: 'Luxury Tour', startDate: '18 Sep 2026', endDate: '23 Sep 2026', guests: '3 Persons', status: 'Pending', price: '₹34,500' }
];

const TourBookings = () => {
  const [bookings, setBookings] = useState(initialTourBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [tourTypeFilter, setTourTypeFilter] = useState('All Tour Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tourPackage: '',
    tourType: 'Standard Tour',
    startDate: '',
    endDate: '',
    guests: '2 Persons',
    status: 'Pending',
    price: ''
  });

  const itemsPerPage = 8;

  // Filter Logic
  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.tourPackage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All Status' || item.status === statusFilter;

    const matchesTourType =
      tourTypeFilter === 'All Tour Types' || item.tourType === tourTypeFilter;

    return matchesSearch && matchesStatus && matchesTourType;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tour booking?')) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  // Open Edit Modal
  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData(booking);
    setIsModalOpen(true);
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Modal Form (Add / Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBooking) {
      setBookings(
        bookings.map((b) => (b.id === editingBooking.id ? { ...formData, id: b.id } : b))
      );
    } else {
      const newBooking = {
        ...formData,
        id: Date.now(),
        bookingId: `TR10${bookings.length + 1}`
      };
      setBookings([newBooking, ...bookings]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBooking(null);
    setFormData({
      name: '',
      phone: '',
      tourPackage: '',
      tourType: 'Standard Tour',
      startDate: '',
      endDate: '',
      guests: '2 Persons',
      status: 'Pending',
      price: ''
    });
  };

  // Export CSV
  const exportToCSV = () => {
    const headers = ['Booking ID,Customer Name,Phone,Tour Package,Tour Type,Start Date,End Date,Guests,Status,Price\n'];
    const rows = filteredBookings.map((b) =>
      `"${b.bookingId}","${b.name}","${b.phone}","${b.tourPackage}","${b.tourType}","${b.startDate}","${b.endDate}","${b.guests}","${b.status}","${b.price}"\n`
    );

    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Tour_Bookings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'TourBookings-status-confirmed';
      case 'Pending': return 'TourBookings-status-pending';
      case 'Completed': return 'TourBookings-status-completed';
      case 'Cancelled': return 'TourBookings-status-cancelled';
      default: return '';
    }
  };

  const getTourTypeClass = (tourType) => {
    switch (tourType) {
      case 'Standard Tour': return 'TourBookings-type-standard';
      case 'Luxury Tour': return 'TourBookings-type-luxury';
      case 'Adventure Tour': return 'TourBookings-type-adventure';
      default: return '';
    }
  };

  return (
    <div className="TourBookings-container">
      {/* Header Section */}
      <div className="TourBookings-header">
        <div className="TourBookings-header-left">
          <div className="TourBookings-header-icon-box">
            <FaMapMarkedAlt />
          </div>
          <div>
            <h1>Tour Bookings</h1>
            <p>Manage and monitor customer tour packages, itineraries, and traveler reservations.</p>
          </div>
        </div>
        <button className="TourBookings-btn-primary" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add New Booking
        </button>
      </div>

      {/* Stats Cards */}
      <div className="TourBookings-stats-grid">
        <div className="TourBookings-stat-card">
          <div className="TourBookings-stat-icon-wrapper TourBookings-stat-blue">
            <FaMapMarkedAlt />
          </div>
          <div className="TourBookings-stat-info">
            <span className="TourBookings-stat-label">Total Tour Bookings</span>
            <h2 className="TourBookings-stat-value">38</h2>
            <span className="TourBookings-stat-subtext TourBookings-text-green">
              <FaArrowUp /> +15% this month
            </span>
          </div>
        </div>

        <div className="TourBookings-stat-card">
          <div className="TourBookings-stat-icon-wrapper TourBookings-stat-green">
            <FaCalendarAlt />
          </div>
          <div className="TourBookings-stat-info">
            <span className="TourBookings-stat-label">Confirmed Tours</span>
            <h2 className="TourBookings-stat-value">22</h2>
            <span className="TourBookings-stat-subtext">Upcoming departures</span>
          </div>
        </div>

        <div className="TourBookings-stat-card">
          <div className="TourBookings-stat-icon-wrapper TourBookings-stat-orange">
            <FaCalendarAlt />
          </div>
          <div className="TourBookings-stat-info">
            <span className="TourBookings-stat-label">Completed Tours</span>
            <h2 className="TourBookings-stat-value">12</h2>
            <span className="TourBookings-stat-subtext">Finished itineraries</span>
          </div>
        </div>

        <div className="TourBookings-stat-card">
          <div className="TourBookings-stat-icon-wrapper TourBookings-stat-purple">
            <FaUsers />
          </div>
          <div className="TourBookings-stat-info">
            <span className="TourBookings-stat-label">Total Travelers</span>
            <h2 className="TourBookings-stat-value">94</h2>
            <span className="TourBookings-stat-subtext">Tour participants</span>
          </div>
        </div>
      </div>

      {/* Filters and Search Control Bar */}
      <div className="TourBookings-table-card">
        <div className="TourBookings-controls">
          <div className="TourBookings-search-box">
            <FaSearch className="TourBookings-search-icon" />
            <input
              type="text"
              placeholder="Search by customer, tour package, phone, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="TourBookings-filters-group">
            <div className="TourBookings-select-wrapper">
              <FaFilter className="TourBookings-select-icon" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All Status">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="TourBookings-select-wrapper">
              <FaMapMarkedAlt className="TourBookings-select-icon" />
              <select value={tourTypeFilter} onChange={(e) => setTourTypeFilter(e.target.value)}>
                <option value="All Tour Types">All Tour Types</option>
                <option value="Standard Tour">Standard Tour</option>
                <option value="Luxury Tour">Luxury Tour</option>
                <option value="Adventure Tour">Adventure Tour</option>
              </select>
            </div>

            <div className="TourBookings-select-wrapper">
              <FaCalendarAlt className="TourBookings-select-icon" />
              <select>
                <option value="Select Date Range">Select Date Range</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>

            <button className="TourBookings-btn-export" onClick={exportToCSV}>
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="TourBookings-table-responsive">
          <table className="TourBookings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Tour Package</th>
                <th>Tour Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td className="TourBookings-fw-bold">{item.bookingId}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td className="TourBookings-text-muted">{item.tourPackage}</td>
                    <td>
                      <span className={`TourBookings-badge ${getTourTypeClass(item.tourType)}`}>
                        {item.tourType}
                      </span>
                    </td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.guests}</td>
                    <td>
                      <span className={`TourBookings-badge ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="TourBookings-fw-bold">{item.price}</td>
                    <td>
                      <div className="TourBookings-actions">
                        <button
                          className="TourBookings-action-btn TourBookings-action-view"
                          onClick={() => setViewBooking(item)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="TourBookings-action-btn TourBookings-action-edit"
                          onClick={() => handleEdit(item)}
                          title="Edit Booking"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="TourBookings-action-btn TourBookings-action-delete"
                          onClick={() => handleDelete(item.id)}
                          title="Delete Booking"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="TourBookings-no-data">
                    No tour bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="TourBookings-pagination-container">
          <p className="TourBookings-showing-text">
            Showing {filteredBookings.length > 0 ? indexOfFirstItem + 1 : 0} to{' '}
            {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} entries
          </p>
          <div className="TourBookings-pagination">
            <button
              className="TourBookings-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`TourBookings-page-btn ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="TourBookings-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Animated Modal Popup (Add/Edit) */}
      {isModalOpen && (
        <div className="TourBookings-modal-overlay">
          <div className="TourBookings-modal">
            <div className="TourBookings-modal-header">
              <h3>{editingBooking ? 'Edit Tour Booking' : 'Add New Tour Booking'}</h3>
              <button className="TourBookings-close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="TourBookings-modal-body">
              <div className="TourBookings-form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="TourBookings-form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="TourBookings-form-group">
                <label>Tour Package Name</label>
                <input
                  type="text"
                  name="tourPackage"
                  placeholder="e.g. Golden Triangle Classic"
                  value={formData.tourPackage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="TourBookings-form-row">
                <div className="TourBookings-form-group">
                  <label>Tour Type</label>
                  <select name="tourType" value={formData.tourType} onChange={handleInputChange}>
                    <option value="Standard Tour">Standard Tour</option>
                    <option value="Luxury Tour">Luxury Tour</option>
                    <option value="Adventure Tour">Adventure Tour</option>
                  </select>
                </div>
                <div className="TourBookings-form-group">
                  <label>Guests / Persons</label>
                  <input
                    type="text"
                    name="guests"
                    placeholder="e.g. 2 Persons"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="TourBookings-form-row">
                <div className="TourBookings-form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    placeholder="10 Sep 2026"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="TourBookings-form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    placeholder="15 Sep 2026"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="TourBookings-form-row">
                <div className="TourBookings-form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="TourBookings-form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="₹24,500"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="TourBookings-modal-footer">
                <button type="button" className="TourBookings-btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="TourBookings-btn-primary">
                  {editingBooking ? 'Update Booking' : 'Save Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewBooking && (
        <div className="TourBookings-modal-overlay">
          <div className="TourBookings-modal TourBookings-view-modal">
            <div className="TourBookings-modal-header">
              <h3>Tour Details ({viewBooking.bookingId})</h3>
              <button className="TourBookings-close-btn" onClick={() => setViewBooking(null)}>
                <FaTimes />
              </button>
            </div>
            <div className="TourBookings-view-body">
              <p><strong>Customer Name:</strong> {viewBooking.name}</p>
              <p><strong>Phone:</strong> {viewBooking.phone}</p>
              <p><strong>Tour Package:</strong> {viewBooking.tourPackage}</p>
              <p><strong>Tour Type:</strong> {viewBooking.tourType}</p>
              <p><strong>Guests:</strong> {viewBooking.guests}</p>
              <p><strong>Start Date:</strong> {viewBooking.startDate}</p>
              <p><strong>End Date:</strong> {viewBooking.endDate}</p>
              <p><strong>Status:</strong> {viewBooking.status}</p>
              <p><strong>Price:</strong> {viewBooking.price}</p>
            </div>
            <div className="TourBookings-modal-footer">
              <button className="TourBookings-btn-secondary" onClick={() => setViewBooking(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourBookings;