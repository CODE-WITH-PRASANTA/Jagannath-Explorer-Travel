import React, { useState, useEffect, useMemo } from 'react';
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
  FaFilter,
  FaSyncAlt,
  FaSpinner,
  FaUser,
  FaPhoneAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaDoorOpen,
  FaInfoCircle
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

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [roomTypeFilter, setRoomTypeFilter] = useState('All Room Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    package: 'Grand Luxury Hotel & Resort Stay',
    destination: 'Puri, Odisha, India',
    roomNo: '',
    roomType: 'Standard Room',
    checkIn: '',
    checkOut: '',
    stayNights: '1 Night',
    guests: 2,
    status: 'Booked',
    price: ''
  });

  const itemsPerPage = 8;

  // Fetch real hotel bookings from backend API
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get('/hotel-bookings');
      if (res.data?.data && Array.isArray(res.data.data)) {
        const mapped = res.data.data.map((b, idx) => ({
          id: b._id || Date.now() + idx,
          _id: b._id,
          bookingId: b.bookingId && b.bookingId.startsWith('BK-')
            ? b.bookingId
            : (b._id ? `BK-${b._id.slice(-6).toUpperCase()}` : (b.bookingId || `BK-${1001 + idx}`)),
          name: b.fullName || b.name || 'N/A',
          phone: b.phone || b.mobileNumber || 'N/A',
          package: b.hotelName || b.packageName || 'Grand Luxury Hotel & Resort Stay',
          destination: b.destination || 'Puri, Odisha, India',
          roomNo: b.roomNo || 'Unassigned',
          roomType: b.roomType || b.category || 'Standard Room',
          checkIn: b.checkIn || 'TBD',
          checkOut: b.checkOut || 'TBD',
          stayNights: b.stayNights || '1 Night',
          guests: b.guests || b.member || 2,
          adults: b.adults || 2,
          children: b.children || 0,
          status: b.status || 'Booked',
          price: formatPrice(b.price),
          rawPrice: b.price || '',
          extraServices: b.extraServices || {},
          notes: b.notes || '',
          createdAt: b.createdAt || '',
        }));
        setBookings(mapped);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error('Failed to fetch hotel bookings:', err);
      setError('Could not connect to the database. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Compute dynamic room types list from fetched bookings
  const dynamicRoomTypes = useMemo(() => {
    const list = new Set(['Standard Room', 'Deluxe Room', 'Premium Room', 'Premium Deluxe', 'Suite Room', 'Executive Suite']);
    bookings.forEach((b) => {
      if (b.roomType) list.add(b.roomType);
    });
    return Array.from(list);
  }, [bookings]);

  // Filter Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      const term = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.bookingId.toLowerCase().includes(term) ||
        item.phone.includes(term) ||
        item.package.toLowerCase().includes(term) ||
        String(item.roomNo).toLowerCase().includes(term) ||
        item.destination.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'All Status' || item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesRoomType =
        roomTypeFilter === 'All Room Types' || item.roomType.toLowerCase() === roomTypeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesRoomType;
    });
  }, [bookings, searchQuery, statusFilter, roomTypeFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Delete Action
  const handleDelete = async (booking) => {
    if (!booking) return;
    if (window.confirm(`Are you sure you want to delete booking ${booking.bookingId} for ${booking.name}?`)) {
      if (booking._id) {
        try {
          await API.delete(`/hotel-bookings/${booking._id}`);
        } catch (err) {
          console.error('Failed to delete booking from database:', err);
          alert('Failed to delete booking from database.');
          return;
        }
      }
      setBookings((prev) => prev.filter((b) => b._id !== booking._id && b.id !== booking.id));
      if (currentPage > 1 && currentItems.length === 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  // Open Edit Modal
  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      name: booking.name,
      phone: booking.phone,
      package: booking.package,
      destination: booking.destination || 'Puri, Odisha, India',
      roomNo: booking.roomNo === 'Unassigned' ? '' : booking.roomNo,
      roomType: booking.roomType,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      stayNights: booking.stayNights || '1 Night',
      guests: booking.guests || 2,
      status: booking.status,
      price: booking.price
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
      if (editingBooking && editingBooking._id) {
        const payload = {
          fullName: formData.name,
          phone: formData.phone,
          hotelName: formData.package,
          destination: formData.destination,
          roomNo: formData.roomNo ? formData.roomNo.trim() : 'Unassigned',
          roomType: formData.roomType,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          stayNights: formData.stayNights,
          guests: Number(formData.guests) || 2,
          status: formData.status,
          price: formData.price
        };

        const res = await API.put(`/hotel-bookings/${editingBooking._id}`, payload);
        if (res.data?.success || res.status === 200) {
          setBookings((prev) =>
            prev.map((b) =>
              b._id === editingBooking._id
                ? {
                    ...b,
                    name: formData.name,
                    phone: formData.phone,
                    package: formData.package,
                    destination: formData.destination,
                    roomNo: formData.roomNo ? formData.roomNo.trim() : 'Unassigned',
                    roomType: formData.roomType,
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut,
                    stayNights: formData.stayNights,
                    guests: Number(formData.guests) || 2,
                    status: formData.status,
                    price: formatPrice(formData.price),
                  }
                : b
            )
          );
          closeModal();
        }
      } else {
        const payload = {
          fullName: formData.name,
          phone: formData.phone,
          hotelName: formData.package,
          destination: formData.destination,
          roomNo: formData.roomNo ? formData.roomNo.trim() : 'Unassigned',
          roomType: formData.roomType,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          stayNights: formData.stayNights,
          guests: Number(formData.guests) || 2,
          status: formData.status,
          price: formData.price
        };

        const res = await API.post('/hotel-bookings', payload);
        if (res.data?.success || res.status === 201) {
          const created = res.data.data;
          const newFormatted = {
            id: created._id || Date.now(),
            _id: created._id,
            bookingId: created.bookingId || (created._id ? `BK-${created._id.slice(-6).toUpperCase()}` : `BK-${1001 + bookings.length}`),
            name: created.fullName || formData.name,
            phone: created.phone || formData.phone,
            package: created.hotelName || formData.package,
            destination: created.destination || formData.destination,
            roomNo: created.roomNo || 'Unassigned',
            roomType: created.roomType || formData.roomType,
            checkIn: created.checkIn || formData.checkIn,
            checkOut: created.checkOut || formData.checkOut,
            stayNights: created.stayNights || formData.stayNights,
            guests: created.guests || formData.guests,
            status: created.status || formData.status,
            price: formatPrice(created.price || formData.price),
            createdAt: created.createdAt || new Date().toISOString(),
          };
          setBookings([newFormatted, ...bookings]);
          closeModal();
        }
      }
    } catch (err) {
      console.error('Failed to save booking:', err);
      alert('Failed to save booking. Please check database connection.');
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
      package: 'Grand Luxury Hotel & Resort Stay',
      destination: 'Puri, Odisha, India',
      roomNo: '',
      roomType: 'Standard Room',
      checkIn: '',
      checkOut: '',
      stayNights: '1 Night',
      guests: 2,
      status: 'Booked',
      price: ''
    });
  };

  // Export CSV
  const exportToCSV = () => {
    if (filteredBookings.length === 0) return;
    const headers = ['Booking ID,Customer Name,Phone,Package Name,Destination,Room No,Room Type,Check In,Check Out,Nights,Guests,Status,Price\n'];
    const rows = filteredBookings.map((b) =>
      `"${b.bookingId}","${b.name}","${b.phone}","${b.package}","${b.destination}","${b.roomNo}","${b.roomType}","${b.checkIn}","${b.checkOut}","${b.stayNights}","${b.guests}","${b.status}","${b.price}"\n`
    );

    const blob = new Blob(['\uFEFF' + headers + rows.join('')], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hotel_Room_Bookings_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Checked In': return 'BookingDetails-status-checkedin';
      case 'Booked': return 'BookingDetails-status-booked';
      case 'Checked Out': return 'BookingDetails-status-checkedout';
      case 'Pending': return 'BookingDetails-status-pending';
      case 'Cancelled': return 'BookingDetails-status-cancelled';
      default: return 'BookingDetails-status-booked';
    }
  };

  const getRoomTypeClass = (roomType = '') => {
    const r = String(roomType).toLowerCase();
    if (r.includes('standard')) return 'BookingDetails-room-standard';
    if (r.includes('deluxe')) return 'BookingDetails-room-deluxe';
    if (r.includes('premium')) return 'BookingDetails-room-premium';
    if (r.includes('suite') || r.includes('executive')) return 'BookingDetails-room-suite';
    return 'BookingDetails-room-standard';
  };

  // Live real dynamic counts
  const totalBookingsCount = bookings.length;
  const checkedInCount = bookings.filter((b) => b.status === 'Checked In').length;
  const checkedOutCount = bookings.filter((b) => b.status === 'Checked Out').length;
  const totalGuestsCount = bookings.reduce((acc, b) => acc + (Number(b.guests) || 1), 0);

  return (
    <div className="BookingDetails-container">
      {/* Header Section */}
      <div className="BookingDetails-header">
        <div className="BookingDetails-header-left">
          <div className="BookingDetails-header-icon-box">
            <FaCalendarAlt />
          </div>
          <div>
            <h1>Hotel Room Bookings</h1>
            <p>Manage and view live customer hotel room bookings, check-in and check-out records.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="BookingDetails-btn-secondary"
            onClick={fetchBookings}
            disabled={loading}
            title="Refresh bookings from database"
          >
            <FaSyncAlt className={loading ? 'BookingDetails-spin' : ''} /> {loading ? 'Fetching...' : 'Refresh'}
          </button>
          <button className="BookingDetails-btn-primary" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Add New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="BookingDetails-stats-grid">
        <div className="BookingDetails-stat-card">
          <div className="BookingDetails-stat-icon-wrapper BookingDetails-stat-blue">
            <FaBed />
          </div>
          <div className="BookingDetails-stat-info">
            <span className="BookingDetails-stat-label">Total Bookings</span>
            <h2 className="BookingDetails-stat-value">{totalBookingsCount}</h2>
            <span className="BookingDetails-stat-subtext BookingDetails-text-green">
              <FaArrowUp /> {totalBookingsCount > 0 ? `${totalBookingsCount} in database` : 'Live records'}
            </span>
          </div>
        </div>

        <div className="BookingDetails-stat-card">
          <div className="BookingDetails-stat-icon-wrapper BookingDetails-stat-green">
            <FaCalendarAlt />
          </div>
          <div className="BookingDetails-stat-info">
            <span className="BookingDetails-stat-label">Checked In</span>
            <h2 className="BookingDetails-stat-value">{checkedInCount}</h2>
            <span className="BookingDetails-stat-subtext">Currently staying</span>
          </div>
        </div>

        <div className="BookingDetails-stat-card">
          <div className="BookingDetails-stat-icon-wrapper BookingDetails-stat-orange">
            <FaCalendarAlt />
          </div>
          <div className="BookingDetails-stat-info">
            <span className="BookingDetails-stat-label">Checked Out</span>
            <h2 className="BookingDetails-stat-value">{checkedOutCount}</h2>
            <span className="BookingDetails-stat-subtext">Completed stays</span>
          </div>
        </div>

        <div className="BookingDetails-stat-card">
          <div className="BookingDetails-stat-icon-wrapper BookingDetails-stat-purple">
            <FaUsers />
          </div>
          <div className="BookingDetails-stat-info">
            <span className="BookingDetails-stat-label">Total Guests</span>
            <h2 className="BookingDetails-stat-value">{totalGuestsCount}</h2>
            <span className="BookingDetails-stat-subtext">Total guest heads</span>
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
              placeholder="Search by name, package, phone, room no, destination, or booking ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="BookingDetails-filters-group">
            <div className="BookingDetails-select-wrapper">
              <FaFilter className="BookingDetails-select-icon" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All Status">All Status</option>
                <option value="Booked">Booked</option>
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="BookingDetails-select-wrapper">
              <FaBed className="BookingDetails-select-icon" />
              <select
                value={roomTypeFilter}
                onChange={(e) => {
                  setRoomTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All Room Types">All Room Types</option>
                {dynamicRoomTypes.map((rt) => (
                  <option key={rt} value={rt}>
                    {rt}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="BookingDetails-btn-export"
              onClick={exportToCSV}
              disabled={filteredBookings.length === 0}
              title={filteredBookings.length === 0 ? 'No records to export' : 'Export current results to CSV'}
            >
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* Error notice */}
        {error && (
          <div style={{ padding: '12px', background: '#ffe6eb', color: '#ff3b30', borderRadius: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{error}</span>
            <button type="button" onClick={fetchBookings} style={{ border: 'none', background: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Retry</button>
          </div>
        )}

        {/* Data Table */}
        <div className="BookingDetails-table-responsive">
          <table className="BookingDetails-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Hotel / Package</th>
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
              {loading ? (
                <tr>
                  <td colSpan="12" className="BookingDetails-no-data">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '20px' }}>
                      <FaSpinner className="BookingDetails-spin" />
                      <span>Loading hotel room bookings...</span>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item._id || item.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td className="BookingDetails-fw-bold">{item.bookingId}</td>
                    <td>{item.name}</td>
                    <td>
                      <a href={`tel:${item.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {item.phone}
                      </a>
                    </td>
                    <td className="BookingDetails-text-muted" title={item.package}>{item.package}</td>
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
                          onClick={() => handleDelete(item)}
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
                    No hotel room bookings found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        {filteredBookings.length > 0 && (
          <div className="BookingDetails-pagination-container">
            <p className="BookingDetails-showing-text">
              Showing {indexOfFirstItem + 1} to{' '}
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
        )}
      </div>

      {/* Spacious Premium Modal Popup (Add/Edit) */}
      {isModalOpen && (
        <div className="BookingDetails-modal-overlay" onClick={closeModal}>
          <div className="BookingDetails-modal" onClick={(e) => e.stopPropagation()}>
            <div className="BookingDetails-modal-header">
              <h3>{editingBooking ? `Edit Booking Details — ${editingBooking.bookingId}` : 'Add New Hotel Booking'}</h3>
              <button className="BookingDetails-close-btn" onClick={closeModal} aria-label="Close modal">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="BookingDetails-form-grid">
                
                <div className="BookingDetails-form-group">
                  <label><FaUser style={{ color: '#0066ff' }} /> Customer Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaPhoneAlt style={{ color: '#0066ff' }} /> Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. 9876543210"
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaHotel style={{ color: '#0066ff' }} /> Hotel / Package Name</label>
                  <input
                    type="text"
                    name="package"
                    value={formData.package}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Grand Luxury Hotel & Resort Stay"
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaMapMarkerAlt style={{ color: '#0066ff' }} /> Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g. Puri Beach Road, Puri"
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaDoorOpen style={{ color: '#0066ff' }} /> Assigned Room No.</label>
                  <input
                    type="text"
                    name="roomNo"
                    placeholder="e.g. 204 or leave Unassigned"
                    value={formData.roomNo}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaBed style={{ color: '#0066ff' }} /> Room Category</label>
                  <select name="roomType" value={formData.roomType} onChange={handleInputChange}>
                    <option value="Standard Room">Standard Room</option>
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Premium Room">Premium Room</option>
                    <option value="Premium Deluxe">Premium Deluxe</option>
                    <option value="Executive Suite">Executive Suite</option>
                    <option value="Suite Room">Suite Room</option>
                  </select>
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaUsers style={{ color: '#0066ff' }} /> Total Guests</label>
                  <input
                    type="number"
                    min="1"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaCalendarAlt style={{ color: '#0066ff' }} /> Check-In Date</label>
                  <input
                    type="text"
                    name="checkIn"
                    placeholder="e.g. 15 Oct 2026"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaCalendarAlt style={{ color: '#0066ff' }} /> Check-Out Date</label>
                  <input
                    type="text"
                    name="checkOut"
                    placeholder="e.g. 17 Oct 2026"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaMoneyBillWave style={{ color: '#0066ff' }} /> Total Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="e.g. ₹4,500"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="BookingDetails-form-group">
                  <label><FaInfoCircle style={{ color: '#0066ff' }} /> Booking Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Booked">Booked</option>
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

              </div>

              <div className="BookingDetails-modal-footer">
                <button type="button" className="BookingDetails-btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="BookingDetails-modal-submit-btn" disabled={isSaving}>
                  {isSaving ? 'Saving Changes...' : editingBooking ? 'Update Booking' : 'Save Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Spacious Premium View Details Modal */}
      {viewBooking && (
        <div className="BookingDetails-modal-overlay" onClick={() => setViewBooking(null)}>
          <div className="BookingDetails-modal" onClick={(e) => e.stopPropagation()}>
            <div className="BookingDetails-modal-header">
              <div>
                <h3>Booking Details — {viewBooking.bookingId}</h3>
                {viewBooking.createdAt && (
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Received on {new Date(viewBooking.createdAt).toLocaleString()}
                  </span>
                )}
              </div>
              <button className="BookingDetails-close-btn" onClick={() => setViewBooking(null)} aria-label="Close modal">
                <FaTimes />
              </button>
            </div>
            
            <div className="BookingDetails-view-grid">
              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Customer Name</span>
                <span className="BookingDetails-view-val">{viewBooking.name}</span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Phone Number</span>
                <span className="BookingDetails-view-val">
                  <a href={`tel:${viewBooking.phone}`}>{viewBooking.phone}</a>
                </span>
              </div>

              <div className="BookingDetails-view-item BookingDetails-view-full">
                <span className="BookingDetails-view-label">Hotel / Package</span>
                <span className="BookingDetails-view-val">{viewBooking.package}</span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Destination</span>
                <span className="BookingDetails-view-val">{viewBooking.destination}</span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Assigned Room No.</span>
                <span className="BookingDetails-view-val">{viewBooking.roomNo}</span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Room Category</span>
                <span className="BookingDetails-view-val">
                  <span className={`BookingDetails-badge ${getRoomTypeClass(viewBooking.roomType)}`}>
                    {viewBooking.roomType}
                  </span>
                </span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Total Guests</span>
                <span className="BookingDetails-view-val">{viewBooking.guests} Guest(s)</span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Check-In Date</span>
                <span className="BookingDetails-view-val">{viewBooking.checkIn}</span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Check-Out Date</span>
                <span className="BookingDetails-view-val">{viewBooking.checkOut}</span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Current Status</span>
                <span className="BookingDetails-view-val">
                  <span className={`BookingDetails-badge ${getStatusClass(viewBooking.status)}`}>
                    {viewBooking.status}
                  </span>
                </span>
              </div>

              <div className="BookingDetails-view-item">
                <span className="BookingDetails-view-label">Total Price</span>
                <span className="BookingDetails-view-val" style={{ color: '#0066ff', fontSize: '16px' }}>
                  {viewBooking.price}
                </span>
              </div>
            </div>

            <div className="BookingDetails-modal-footer">
              <button className="BookingDetails-btn-secondary" onClick={() => setViewBooking(null)}>
                Close
              </button>
              <button
                className="BookingDetails-modal-submit-btn"
                onClick={() => {
                  const b = viewBooking;
                  setViewBooking(null);
                  handleEdit(b);
                }}
              >
                <FaEdit /> Edit Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;