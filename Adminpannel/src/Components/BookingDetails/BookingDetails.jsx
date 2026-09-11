import React, { useState } from 'react';
import './BookingDetails.css';
import {
  FaCalendarAlt,
  FaPlus,
  FaBed,
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

const initialBookings = [
  { id: 1, bookingId: 'BK1001', name: 'Ankita Nayak', phone: '9827825440', package: 'Golden Tulip Luxury Package', roomNo: '101', roomType: 'Deluxe Room', checkIn: '10 Sep 2026', checkOut: '12 Sep 2026', status: 'Checked In', price: '₹4,500' },
  { id: 2, bookingId: 'BK1002', name: 'Rahul Sharma', phone: '9876543210', package: 'Golden Tulip Luxury Package', roomNo: '203', roomType: 'Premium Room', checkIn: '11 Sep 2026', checkOut: '13 Sep 2026', status: 'Checked In', price: '₹7,200' },
  { id: 3, bookingId: 'BK1003', name: 'Priya Das', phone: '9123456780', package: 'Golden Tulip Luxury Package', roomNo: '305', roomType: 'Suite Room', checkIn: '12 Sep 2026', checkOut: '14 Sep 2026', status: 'Booked', price: '₹11,000' },
  { id: 4, bookingId: 'BK1004', name: 'Rohit Sahoo', phone: '8765432109', package: 'Golden Tulip Luxury Package', roomNo: '108', roomType: 'Deluxe Room', checkIn: '13 Sep 2026', checkOut: '15 Sep 2026', status: 'Checked Out', price: '₹5,800' },
  { id: 5, bookingId: 'BK1005', name: 'Sneha Mishra', phone: '7987654321', package: 'Golden Tulip Luxury Package', roomNo: '204', roomType: 'Premium Room', checkIn: '14 Sep 2026', checkOut: '16 Sep 2026', status: 'Booked', price: '₹8,500' },
  { id: 6, bookingId: 'BK1006', name: 'Sourav Patra', phone: '9432145678', package: 'Golden Tulip Luxury Package', roomNo: '302', roomType: 'Suite Room', checkIn: '15 Sep 2026', checkOut: '17 Sep 2026', status: 'Checked In', price: '₹12,000' },
  { id: 7, bookingId: 'BK1007', name: 'Neha Singh', phone: '7734562180', package: 'Golden Tulip Luxury Package', roomNo: '109', roomType: 'Deluxe Room', checkIn: '16 Sep 2026', checkOut: '18 Sep 2026', status: 'Pending', price: '₹6,200' },
  { id: 8, bookingId: 'BK1008', name: 'Amit Kumar', phone: '9056783210', package: 'Golden Tulip Luxury Package', roomNo: '207', roomType: 'Premium Room', checkIn: '17 Sep 2026', checkOut: '19 Sep 2026', status: 'Booked', price: '₹9,800' },
  { id: 9, bookingId: 'BK1009', name: 'Pooja Verma', phone: '9812345678', package: 'Golden Tulip Luxury Package', roomNo: '102', roomType: 'Deluxe Room', checkIn: '18 Sep 2026', checkOut: '20 Sep 2026', status: 'Checked In', price: '₹4,500' }
];

const BookingDetails = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [roomTypeFilter, setRoomTypeFilter] = useState('All Room Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    package: 'Golden Tulip Luxury Package',
    roomNo: '',
    roomType: 'Deluxe Room',
    checkIn: '',
    checkOut: '',
    status: 'Booked',
    price: ''
  });

  const itemsPerPage = 8;

  // Filter Logic
  const filteredBookings = bookings.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.roomNo.includes(searchQuery);

    const matchesStatus =
      statusFilter === 'All Status' || item.status === statusFilter;

    const matchesRoomType =
      roomTypeFilter === 'All Room Types' || item.roomType === roomTypeFilter;

    return matchesSearch && matchesStatus && matchesRoomType;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
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
        bookingId: `BK10${bookings.length + 1}`
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
      package: 'Golden Tulip Luxury Package',
      roomNo: '',
      roomType: 'Deluxe Room',
      checkIn: '',
      checkOut: '',
      status: 'Booked',
      price: ''
    });
  };

  // Export CSV
  const exportToCSV = () => {
    const headers = ['Booking ID,Customer Name,Phone,Package Name,Room No,Room Type,Check In,Check Out,Status,Price\n'];
    const rows = filteredBookings.map((b) =>
      `"${b.bookingId}","${b.name}","${b.phone}","${b.package}","${b.roomNo}","${b.roomType}","${b.checkIn}","${b.checkOut}","${b.status}","${b.price}"\n`
    );

    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Room_Bookings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Checked In': return 'BookingDetails-status-checkedin';
      case 'Booked': return 'BookingDetails-status-booked';
      case 'Checked Out': return 'BookingDetails-status-checkedout';
      case 'Pending': return 'BookingDetails-status-pending';
      default: return '';
    }
  };

  const getRoomTypeClass = (roomType) => {
    switch (roomType) {
      case 'Deluxe Room': return 'BookingDetails-room-deluxe';
      case 'Premium Room': return 'BookingDetails-room-premium';
      case 'Suite Room': return 'BookingDetails-room-suite';
      default: return '';
    }
  };

  return (
    <div className="BookingDetails-container">
      {/* Header Section */}
      <div className="BookingDetails-header">
        <div className="BookingDetails-header-left">
          <div className="BookingDetails-header-icon-box">
            <FaCalendarAlt />
          </div>
          <div>
            <h1>Room Bookings</h1>
            <p>Manage and view all hotel room bookings, check-in and check-out details.</p>
          </div>
        </div>
        <button className="BookingDetails-btn-primary" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add New Booking
        </button>
      </div>

      {/* Stats Cards */}
      <div className="BookingDetails-stats-grid">
        <div className="BookingDetails-stat-card">
          <div className="BookingDetails-stat-icon-wrapper BookingDetails-stat-blue">
            <FaBed />
          </div>
          <div className="BookingDetails-stat-info">
            <span className="BookingDetails-stat-label">Total Bookings</span>
            <h2 className="BookingDetails-stat-value">25</h2>
            <span className="BookingDetails-stat-subtext BookingDetails-text-green">
              <FaArrowUp /> +12% this month
            </span>
          </div>
        </div>

        <div className="BookingDetails-stat-card">
          <div className="BookingDetails-stat-icon-wrapper BookingDetails-stat-green">
            <FaCalendarAlt />
          </div>
          <div className="BookingDetails-stat-info">
            <span className="BookingDetails-stat-label">Checked In</span>
            <h2 className="BookingDetails-stat-value">16</h2>
            <span className="BookingDetails-stat-subtext">Currently staying</span>
          </div>
        </div>

        <div className="BookingDetails-stat-card">
          <div className="BookingDetails-stat-icon-wrapper BookingDetails-stat-orange">
            <FaCalendarAlt />
          </div>
          <div className="BookingDetails-stat-info">
            <span className="BookingDetails-stat-label">Checked Out</span>
            <h2 className="BookingDetails-stat-value">7</h2>
            <span className="BookingDetails-stat-subtext">Completed stays</span>
          </div>
        </div>

        <div className="BookingDetails-stat-card">
          <div className="BookingDetails-stat-icon-wrapper BookingDetails-stat-purple">
            <FaUsers />
          </div>
          <div className="BookingDetails-stat-info">
            <span className="BookingDetails-stat-label">Total Guests</span>
            <h2 className="BookingDetails-stat-value">48</h2>
            <span className="BookingDetails-stat-subtext">Unique customers</span>
          </div>
        </div>
      </div>

      {/* Filters and Search Control Bar */}
      <div className="BookingDetails-table-card">
        <div className="BookingDetails-controls">
          <div className="BookingDetails-search-box">
            <FaSearch className="BookingDetails-search-icon" />
            <input
              type="text"
              placeholder="Search by name, package, phone, room no, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="BookingDetails-filters-group">
            <div className="BookingDetails-select-wrapper">
              <FaFilter className="BookingDetails-select-icon" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All Status">All Status</option>
                <option value="Checked In">Checked In</option>
                <option value="Booked">Booked</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="BookingDetails-select-wrapper">
              <FaBed className="BookingDetails-select-icon" />
              <select value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)}>
                <option value="All Room Types">All Room Types</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Premium Room">Premium Room</option>
                <option value="Suite Room">Suite Room</option>
              </select>
            </div>

            <div className="BookingDetails-select-wrapper">
              <FaCalendarAlt className="BookingDetails-select-icon" />
              <select>
                <option value="Select Date Range">Select Date Range</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>

            <button className="BookingDetails-btn-export" onClick={exportToCSV}>
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="BookingDetails-table-responsive">
          <table className="BookingDetails-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Package Name</th>
                <th>Room No.</th>
                <th>Room Type</th>
                <th>Check In</th>
                <th>Check Out</th>
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
                    <td className="BookingDetails-fw-bold">{item.bookingId}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td className="BookingDetails-text-muted">{item.package}</td>
                    <td>{item.roomNo}</td>
                    <td>
                      <span className={`BookingDetails-badge ${getRoomTypeClass(item.roomType)}`}>
                        {item.roomType}
                      </span>
                    </td>
                    <td>{item.checkIn}</td>
                    <td>{item.checkOut}</td>
                    <td>
                      <span className={`BookingDetails-badge ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="BookingDetails-fw-bold">{item.price}</td>
                    <td>
                      <div className="BookingDetails-actions">
                        <button
                          className="BookingDetails-action-btn BookingDetails-action-view"
                          onClick={() => setViewBooking(item)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="BookingDetails-action-btn BookingDetails-action-edit"
                          onClick={() => handleEdit(item)}
                          title="Edit Booking"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="BookingDetails-action-btn BookingDetails-action-delete"
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
                  <td colSpan="12" className="BookingDetails-no-data">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="BookingDetails-pagination-container">
          <p className="BookingDetails-showing-text">
            Showing {filteredBookings.length > 0 ? indexOfFirstItem + 1 : 0} to{' '}
            {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} entries
          </p>
          <div className="BookingDetails-pagination">
            <button
              className="BookingDetails-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`BookingDetails-page-btn ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="BookingDetails-page-btn"
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
        <div className="BookingDetails-modal-overlay">
          <div className="BookingDetails-modal">
            <div className="BookingDetails-modal-header">
              <h3>{editingBooking ? 'Edit Booking' : 'Add New Booking'}</h3>
              <button className="BookingDetails-close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="BookingDetails-modal-body">
              <div className="BookingDetails-form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="BookingDetails-form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Room No</label>
                  <input
                    type="text"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Room Type</label>
                  <select name="roomType" value={formData.roomType} onChange={handleInputChange}>
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Premium Room">Premium Room</option>
                    <option value="Suite Room">Suite Room</option>
                  </select>
                </div>
              </div>
              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Check In</label>
                  <input
                    type="text"
                    name="checkIn"
                    placeholder="10 Sep 2026"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Check Out</label>
                  <input
                    type="text"
                    name="checkOut"
                    placeholder="12 Sep 2026"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Booked">Booked</option>
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="BookingDetails-form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="₹4,500"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="BookingDetails-modal-footer">
                <button type="button" className="BookingDetails-btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="BookingDetails-btn-primary">
                  {editingBooking ? 'Update Booking' : 'Save Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewBooking && (
        <div className="BookingDetails-modal-overlay">
          <div className="BookingDetails-modal BookingDetails-view-modal">
            <div className="BookingDetails-modal-header">
              <h3>Booking Details ({viewBooking.bookingId})</h3>
              <button className="BookingDetails-close-btn" onClick={() => setViewBooking(null)}>
                <FaTimes />
              </button>
            </div>
            <div className="BookingDetails-view-body">
              <p><strong>Customer Name:</strong> {viewBooking.name}</p>
              <p><strong>Phone:</strong> {viewBooking.phone}</p>
              <p><strong>Package:</strong> {viewBooking.package}</p>
              <p><strong>Room No:</strong> {viewBooking.roomNo}</p>
              <p><strong>Room Type:</strong> {viewBooking.roomType}</p>
              <p><strong>Check In:</strong> {viewBooking.checkIn}</p>
              <p><strong>Check Out:</strong> {viewBooking.checkOut}</p>
              <p><strong>Status:</strong> {viewBooking.status}</p>
              <p><strong>Price:</strong> {viewBooking.price}</p>
            </div>
            <div className="BookingDetails-modal-footer">
              <button className="BookingDetails-btn-secondary" onClick={() => setViewBooking(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;