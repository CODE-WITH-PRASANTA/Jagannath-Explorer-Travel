import React, { useState, useEffect, useMemo } from 'react';
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
  FaFilter,
  FaSyncAlt,
  FaSpinner
} from 'react-icons/fa';
import API from '../../api/axios';

const formatPrice = (priceVal) => {
  if (!priceVal && priceVal !== 0) return '₹0';
  const raw = String(priceVal).trim();
  const digitsOnly = raw.replace(/[^0-9]/g, '');
  if (digitsOnly) {
    return `₹${Number(digitsOnly).toLocaleString('en-IN')}`;
  }
  return raw.startsWith('₹') ? raw : `₹${raw}`;
};

const TourBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [tourTypeFilter, setTourTypeFilter] = useState('All Tour Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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

  // Fetch real tour bookings from database
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get('/tour-bookings');
      if (res.data?.data && Array.isArray(res.data.data)) {
        const mapped = res.data.data.map((b, idx) => ({
          id: b._id || Date.now() + idx,
          _id: b._id,
          bookingId: b.bookingId || `TR${1000 + idx}`,
          name: b.fullName || b.name || 'N/A',
          phone: b.mobileNumber || b.phone || 'N/A',
          tourPackage: b.tourPackage || b.packageName || 'Odisha Tour Package',
          tourType: b.tourType || `${b.category || 'Standard'} Tour`,
          startDate: b.startDate || b.checkIn || 'TBD',
          endDate: b.endDate || b.checkOut || 'TBD',
          guests: b.guests || `${b.adults || 1} Adult(s)${b.children > 0 ? `, ${b.children} Child(ren)` : ''}`,
          status: b.status || 'Pending',
          price: formatPrice(b.price),
          rawPrice: b.price || '',
          extraServices: b.extraServices || {},
          message: b.message || '',
          createdAt: b.createdAt || '',
        }));
        setBookings(mapped);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error('Failed to fetch tour bookings:', err);
      setError('Could not connect to database. Please ensure backend is running.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Compute dynamic tour types
  const dynamicTourTypes = useMemo(() => {
    const list = new Set(['Standard Tour', 'Deluxe Tour', 'Super Deluxe Tour', 'Luxury Tour', 'Adventure Tour']);
    bookings.forEach((b) => {
      if (b.tourType) list.add(b.tourType);
    });
    return Array.from(list);
  }, [bookings]);

  // Summary statistics
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
    const completed = bookings.filter((b) => b.status === 'Completed').length;
    const pending = bookings.filter((b) => b.status === 'Pending').length;
    return { total, confirmed, completed, pending };
  }, [bookings]);

  // Filter Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.bookingId && item.bookingId.toLowerCase().includes(q)) ||
        (item.phone && item.phone.includes(q)) ||
        (item.tourPackage && item.tourPackage.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === 'All Status' || item.status === statusFilter;

      const matchesTourType =
        tourTypeFilter === 'All Tour Types' || item.tourType === tourTypeFilter;

      return matchesSearch && matchesStatus && matchesTourType;
    });
  }, [bookings, searchQuery, statusFilter, tourTypeFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Delete Action
  const handleDelete = async (id, mongoId) => {
    if (!window.confirm('Are you sure you want to delete this tour booking?')) return;

    try {
      if (mongoId) {
        await API.delete(`/tour-bookings/${mongoId}`);
      }
      setBookings((prev) => prev.filter((b) => b._id !== mongoId && b.id !== id));
      alert('Tour booking deleted successfully.');
    } catch (err) {
      console.error('Failed to delete booking:', err);
      alert('Error deleting booking.');
    }
  };

  // Open Edit Modal
  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      name: booking.name,
      phone: booking.phone,
      tourPackage: booking.tourPackage,
      tourType: booking.tourType,
      startDate: booking.startDate,
      endDate: booking.endDate,
      guests: booking.guests,
      status: booking.status,
      price: booking.rawPrice || booking.price
    });
    setIsModalOpen(true);
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Modal Form (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = {
        fullName: formData.name,
        mobileNumber: formData.phone,
        tourPackage: formData.tourPackage,
        tourType: formData.tourType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        checkIn: formData.startDate,
        checkOut: formData.endDate,
        guests: formData.guests,
        status: formData.status,
        price: formData.price
      };

      if (editingBooking?._id) {
        const res = await API.put(`/tour-bookings/${editingBooking._id}`, payload);
        if (res.data?.success) {
          fetchBookings();
        }
      } else {
        const res = await API.post('/tour-bookings', payload);
        if (res.data?.success) {
          fetchBookings();
        }
      }
      closeModal();
    } catch (err) {
      console.error('Failed to save booking:', err);
      alert('Error saving tour booking.');
    } finally {
      setIsSaving(false);
    }
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
      default: return 'TourBookings-status-pending';
    }
  };

  const getTourTypeClass = (tourType) => {
    const t = String(tourType).toLowerCase();
    if (t.includes('luxury') || t.includes('super')) return 'TourBookings-type-luxury';
    if (t.includes('adventure')) return 'TourBookings-type-adventure';
    return 'TourBookings-type-standard';
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
            <p>Manage real customer tour package reservations stored in the database.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="TourBookings-btn-secondary" onClick={fetchBookings} title="Refresh Data">
            <FaSyncAlt className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
          <button className="TourBookings-btn-primary" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Add New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="TourBookings-stats-grid">
        <div className="TourBookings-stat-card">
          <div className="TourBookings-stat-icon-wrapper TourBookings-stat-blue">
            <FaMapMarkedAlt />
          </div>
          <div className="TourBookings-stat-info">
            <span className="TourBookings-stat-label">Total Tour Bookings</span>
            <h2 className="TourBookings-stat-value">{stats.total}</h2>
            <span className="TourBookings-stat-subtext TourBookings-text-green">
              <FaArrowUp /> Active leads
            </span>
          </div>
        </div>

        <div className="TourBookings-stat-card">
          <div className="TourBookings-stat-icon-wrapper TourBookings-stat-green">
            <FaCalendarAlt />
          </div>
          <div className="TourBookings-stat-info">
            <span className="TourBookings-stat-label">Confirmed Tours</span>
            <h2 className="TourBookings-stat-value">{stats.confirmed}</h2>
            <span className="TourBookings-stat-subtext">Confirmed reservations</span>
          </div>
        </div>

        <div className="TourBookings-stat-card">
          <div className="TourBookings-stat-icon-wrapper TourBookings-stat-orange">
            <FaCalendarAlt />
          </div>
          <div className="TourBookings-stat-info">
            <span className="TourBookings-stat-label">Pending Inquiries</span>
            <h2 className="TourBookings-stat-value">{stats.pending}</h2>
            <span className="TourBookings-stat-subtext">Awaiting confirmation</span>
          </div>
        </div>

        <div className="TourBookings-stat-card">
          <div className="TourBookings-stat-icon-wrapper TourBookings-stat-purple">
            <FaUsers />
          </div>
          <div className="TourBookings-stat-info">
            <span className="TourBookings-stat-label">Completed Tours</span>
            <h2 className="TourBookings-stat-value">{stats.completed}</h2>
            <span className="TourBookings-stat-subtext">Finished itineraries</span>
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="TourBookings-filters-group">
            <div className="TourBookings-select-wrapper">
              <FaFilter className="TourBookings-select-icon" />
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                <option value="All Status">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="TourBookings-select-wrapper">
              <FaMapMarkedAlt className="TourBookings-select-icon" />
              <select value={tourTypeFilter} onChange={(e) => { setTourTypeFilter(e.target.value); setCurrentPage(1); }}>
                <option value="All Tour Types">All Tour Types</option>
                {dynamicTourTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <button className="TourBookings-btn-export" onClick={exportToCSV}>
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <FaSpinner className="fa-spin" style={{ fontSize: '1.8rem', color: '#39b500', marginBottom: '10px' }} />
            <p>Loading tour bookings from database...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#ef4444' }}>
            <p>{error}</p>
          </div>
        ) : (
          /* Data Table */
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
                    <tr key={item._id || item.id}>
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
                            onClick={() => handleDelete(item.id, item._id)}
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
                      No tour bookings found in database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer / Pagination */}
        {!loading && filteredBookings.length > 0 && (
          <div className="TourBookings-pagination-container">
            <p className="TourBookings-showing-text">
              Showing {indexOfFirstItem + 1} to{' '}
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
        )}
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
                  placeholder="e.g. Odisha Heritage Tour"
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
                    <option value="Deluxe Tour">Deluxe Tour</option>
                    <option value="Super Deluxe Tour">Super Deluxe Tour</option>
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
                  <label>Check In / Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    placeholder="YYYY-MM-DD or 10 Sep 2026"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="TourBookings-form-group">
                  <label>Check Out / End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    placeholder="YYYY-MM-DD or 15 Sep 2026"
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
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
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
                <button type="submit" className="TourBookings-btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingBooking ? 'Update Booking' : 'Save Booking'}
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
              <p><strong>Check In / Start Date:</strong> {viewBooking.startDate}</p>
              <p><strong>Check Out / End Date:</strong> {viewBooking.endDate}</p>
              <p><strong>Status:</strong> {viewBooking.status}</p>
              <p><strong>Price:</strong> {viewBooking.price}</p>
              {viewBooking.message && (
                <p><strong>Notes / Message:</strong> {viewBooking.message}</p>
              )}
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