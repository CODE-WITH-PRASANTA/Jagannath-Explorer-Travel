import React, { useState, useEffect, useMemo } from 'react';
import {
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFileExport,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaTimes,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaCar,
  FaSyncAlt,
  FaSpinner,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from 'react-icons/fa';
import './Booklead.css';
import API from '../../api/axios';

const CSV_HEADERS = [
  'Lead ID',
  'Customer Name',
  'Phone Number',
  'Email',
  'Vehicle',
  'Vehicle Type',
  'Pickup Location',
  'Drop Location',
  'Pickup Date & Time',
  'Drop Date & Time',
  'Price',
  'Status',
  'Customer Note',
  'Created Date',
];

// Wraps a cell in quotes and escapes any embedded quotes whenever the value
// contains a comma, quote, or newline — keeps the CSV valid for every field.
const escapeCsvCell = (value) => {
  const str = String(value ?? '');
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const formatPrice = (priceVal) => {
  if (!priceVal && priceVal !== 0) return '₹0';
  const raw = String(priceVal).trim();
  const digitsOnly = raw.replace(/[^0-9]/g, '');
  if (digitsOnly) {
    return `₹${Number(digitsOnly).toLocaleString('en-IN')}`;
  }
  return raw.startsWith('₹') ? raw : `₹${raw}`;
};

const getStatusBadgeClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return 'booklead__status-badge booklead__status-badge--confirmed';
    case 'in progress':
      return 'booklead__status-badge booklead__status-badge--inprogress';
    case 'completed':
      return 'booklead__status-badge booklead__status-badge--completed';
    case 'cancelled':
      return 'booklead__status-badge booklead__status-badge--cancelled';
    case 'pending':
    default:
      return 'booklead__status-badge booklead__status-badge--pending';
  }
};

const Booklead = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const itemsPerPage = 8;

  // Modal states
  const [modalMode, setModalMode] = useState(null); // 'view' or 'edit'
  const [selectedLead, setSelectedLead] = useState(null);

  // Fetch real leads from MongoDB API
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get('/car-bookings');
      if (res.data?.data && Array.isArray(res.data.data)) {
        const mapped = res.data.data.map((b, idx) => ({
          id: b._id ? `LD-${b._id.slice(-6).toUpperCase()}` : `LD-${1000 + idx}`,
          _id: b._id,
          customer: b.fullName || 'N/A',
          phone: b.mobileNumber || 'N/A',
          email: b.email || '',
          vehicle: b.vehicleName || 'Standard Vehicle',
          vehicleType: b.vehicleType || 'Car Rental',
          pickupLocation: b.pickupLocation || '',
          dropLocation: b.dropLocation || '',
          route: (b.pickupLocation || b.dropLocation)
            ? `${b.pickupLocation || 'Pickup'} → ${b.dropLocation || 'Drop'}`
            : 'Route not specified',
          dateTime: `${b.pickupDateTime || ''}${b.dropDateTime ? ` - ${b.dropDateTime}` : ''}`.trim() || 'Date not specified',
          pickupDateTime: b.pickupDateTime || '',
          dropDateTime: b.dropDateTime || '',
          price: b.vehiclePrice || '0',
          status: b.status || 'Pending',
          message: b.message || '',
          createdAt: b.createdAt || '',
        }));
        setLeads(mapped);
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.error('Failed to fetch car booking leads:', err);
      setError('Could not connect to the database. Please verify backend is running.');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Compute dynamic vehicle dropdown options
  const uniqueVehicles = useMemo(() => {
    const list = new Set();
    leads.forEach((l) => {
      if (l.vehicle && l.vehicle !== 'Standard Vehicle') {
        list.add(l.vehicle);
      }
    });
    return Array.from(list).sort();
  }, [leads]);

  // Filter logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        lead.customer.toLowerCase().includes(term) ||
        lead.phone.includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.id.toLowerCase().includes(term) ||
        lead.vehicle.toLowerCase().includes(term) ||
        lead.route.toLowerCase().includes(term) ||
        lead.status.toLowerCase().includes(term);

      const matchesVehicle =
        vehicleFilter === 'All' ||
        lead.vehicle.toLowerCase() === vehicleFilter.toLowerCase();

      const matchesStatus =
        statusFilter === 'All' ||
        lead.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesVehicle && matchesStatus;
    });
  }, [leads, searchTerm, vehicleFilter, statusFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const handleOpenModal = (mode, lead) => {
    setModalMode(mode);
    setSelectedLead({ ...lead });
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedLead(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!selectedLead?._id) return;

    try {
      setIsSaving(true);
      const payload = {
        fullName: selectedLead.customer,
        mobileNumber: selectedLead.phone,
        email: selectedLead.email,
        vehicleName: selectedLead.vehicle,
        vehicleType: selectedLead.vehicleType,
        pickupLocation: selectedLead.pickupLocation,
        dropLocation: selectedLead.dropLocation,
        pickupDateTime: selectedLead.pickupDateTime,
        dropDateTime: selectedLead.dropDateTime,
        vehiclePrice: String(selectedLead.price),
        status: selectedLead.status,
        message: selectedLead.message,
      };

      const res = await API.put(`/car-bookings/${selectedLead._id}`, payload);
      if (res.data?.success || res.status === 200) {
        setLeads((prev) =>
          prev.map((l) =>
            l._id === selectedLead._id
              ? {
                  ...l,
                  customer: selectedLead.customer,
                  phone: selectedLead.phone,
                  email: selectedLead.email,
                  vehicle: selectedLead.vehicle,
                  vehicleType: selectedLead.vehicleType,
                  pickupLocation: selectedLead.pickupLocation,
                  dropLocation: selectedLead.dropLocation,
                  route: `${selectedLead.pickupLocation || 'Pickup'} → ${selectedLead.dropLocation || 'Drop'}`,
                  pickupDateTime: selectedLead.pickupDateTime,
                  dropDateTime: selectedLead.dropDateTime,
                  dateTime: `${selectedLead.pickupDateTime || ''}${selectedLead.dropDateTime ? ` - ${selectedLead.dropDateTime}` : ''}`.trim() || 'Date not specified',
                  price: selectedLead.price,
                  status: selectedLead.status,
                  message: selectedLead.message,
                }
              : l
          )
        );
        handleCloseModal();
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
      alert('Failed to update lead. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickStatusChange = async (leadId, newStatus) => {
    const targetLead = leads.find((l) => l.id === leadId || l._id === leadId);
    if (!targetLead?._id) return;

    try {
      await API.put(`/car-bookings/${targetLead._id}`, { status: newStatus });
      setLeads((prev) =>
        prev.map((l) => (l._id === targetLead._id ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Could not update status. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const targetLead = leads.find((l) => l.id === id);
    if (!targetLead) return;

    if (window.confirm(`Are you sure you want to delete lead ${targetLead.id} (${targetLead.customer})?`)) {
      if (targetLead._id) {
        try {
          await API.delete(`/car-bookings/${targetLead._id}`);
        } catch (err) {
          console.error('Failed to delete lead from server:', err);
          alert('Failed to delete booking from database.');
          return;
        }
      }
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (currentPage > 1 && currentLeads.length === 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  /* ----------------------------------------------------------------
     Export CSV — exports exactly what's currently filtered/searched
  ---------------------------------------------------------------- */
  const handleExportCSV = () => {
    if (filteredLeads.length === 0 || isExporting) return;

    setIsExporting(true);

    try {
      const rows = filteredLeads.map((lead) => [
        lead.id,
        lead.customer,
        lead.phone,
        lead.email || 'N/A',
        lead.vehicle,
        lead.vehicleType || 'N/A',
        lead.pickupLocation || 'N/A',
        lead.dropLocation || 'N/A',
        lead.pickupDateTime || 'N/A',
        lead.dropDateTime || 'N/A',
        formatPrice(lead.price),
        lead.status,
        lead.message || 'N/A',
        lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A',
      ]);

      const csvContent = [CSV_HEADERS, ...rows]
        .map((row) => row.map(escapeCsvCell).join(','))
        .join('\r\n');

      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);

      link.href = url;
      link.setAttribute('download', `car-booking-leads-${timestamp}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportDone(true);
      setTimeout(() => setExportDone(false), 1800);
    } finally {
      setIsExporting(false);
    }
  };

  // Real statistics derived from live fetched collection data
  const totalLeads = leads.length;
  const activeCount = leads.filter((l) => l.status === 'Confirmed' || l.status === 'In Progress').length;
  const pendingCount = leads.filter((l) => l.status === 'Pending').length;
  const completedCount = leads.filter((l) => l.status === 'Completed').length;

  return (
    <div className="booklead">
      <div className="booklead__wrapper">

        {/* ==========================================
            HEADER & REFRESH ACTION
        ========================================== */}
        <div className="booklead__header-bar">
          <div>
            <h1 className="booklead__page-title">Car Booking Leads</h1>
            <p className="booklead__page-subtitle">
              Manage live vehicle booking inquiries from customers
            </p>
          </div>
          <button
            type="button"
            className="booklead__refresh-btn"
            onClick={fetchBookings}
            disabled={loading}
            title="Refresh from database"
          >
            <FaSyncAlt className={loading ? 'booklead__spin' : ''} />
            <span>{loading ? 'Fetching...' : 'Refresh'}</span>
          </button>
        </div>
        
        {/* ==========================================
            METRICS STATS CARDS (LIVE REAL COUNTS)
        ========================================== */}
        <div className="booklead__metrics-grid">
          <div className="booklead__metric-card">
            <div className="booklead__metric-info">
              <span className="booklead__metric-label">Total Leads</span>
              <h3 className="booklead__metric-value">{totalLeads}</h3>
              <span className="booklead__metric-trend booklead__metric-trend--up">
                {totalLeads > 0 ? `${totalLeads} in database` : 'No records'}
              </span>
            </div>
            <div className="booklead__metric-icon booklead__metric-icon--total">
              <FaUsers />
            </div>
          </div>

          <div className="booklead__metric-card">
            <div className="booklead__metric-info">
              <span className="booklead__metric-label">Active / Confirmed</span>
              <h3 className="booklead__metric-value">{activeCount}</h3>
              <span className="booklead__metric-trend">Confirmed & In Progress</span>
            </div>
            <div className="booklead__metric-icon booklead__metric-icon--cold">
              <FaCar />
            </div>
          </div>

          <div className="booklead__metric-card">
            <div className="booklead__metric-info">
              <span className="booklead__metric-label">Pending Review</span>
              <h3 className="booklead__metric-value">{pendingCount}</h3>
              <span className="booklead__metric-trend">Awaiting Action</span>
            </div>
            <div className="booklead__metric-icon booklead__metric-icon--follow">
              <FaClock />
            </div>
          </div>

          <div className="booklead__metric-card">
            <div className="booklead__metric-info">
              <span className="booklead__metric-label">Completed</span>
              <h3 className="booklead__metric-value">{completedCount}</h3>
              <span className="booklead__metric-trend">Successful Trips</span>
            </div>
            <div className="booklead__metric-icon booklead__metric-icon--converted">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* ==========================================
            CONTROLS / SEARCH & FILTERS BAR
        ========================================== */}
        <div className="booklead__controls-bar">
          <div className="booklead__search-box">
            <FaSearch className="booklead__search-icon" />
            <input
              type="text"
              placeholder="Search by customer, phone, email, lead ID, vehicle, route..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="booklead__search-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="booklead__search-clear"
                onClick={() => setSearchTerm('')}
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="booklead__filter-group">
            {/* Status Filter */}
            <div className="booklead__select-wrapper">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="booklead__select"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <FaChevronDown className="booklead__select-chevron" aria-hidden="true" />
            </div>

            {/* Dynamic Vehicle Filter */}
            <div className="booklead__select-wrapper">
              <select
                value={vehicleFilter}
                onChange={(e) => {
                  setVehicleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="booklead__select"
              >
                <option value="All">All Vehicles</option>
                {uniqueVehicles.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <FaChevronDown className="booklead__select-chevron" aria-hidden="true" />
            </div>

            {/* CSV Export */}
            <button
              type="button"
              className={`booklead__export-btn ${exportDone ? 'booklead__export-btn--done' : ''}`}
              onClick={handleExportCSV}
              disabled={filteredLeads.length === 0 || isExporting}
              title={filteredLeads.length === 0 ? 'No leads to export' : 'Export current results to CSV'}
            >
              {exportDone ? (
                <>
                  <FaCheckCircle /> Exported
                </>
              ) : (
                <>
                  <FaFileExport /> Export CSV
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="booklead__error-banner">
            <span>{error}</span>
            <button type="button" onClick={fetchBookings}>Retry</button>
          </div>
        )}

        {/* ==========================================
            LEADS DATA TABLE
        ========================================== */}
        <div className="booklead__table-container">
          <table className="booklead__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Pickup → Drop</th>
                <th>Date & Time</th>
                <th>Price</th>
                <th>Status</th>
                <th className="booklead__text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="booklead__state-cell">
                    <div className="booklead__loading-spinner">
                      <FaSpinner className="booklead__spin" />
                      <span>Loading car booking collection data...</span>
                    </div>
                  </td>
                </tr>
              ) : currentLeads.length > 0 ? (
                currentLeads.map((lead) => {
                  return (
                    <tr key={lead.id} className="booklead__table-row">
                      <td className="booklead__font-semibold booklead__lead-id">
                        {lead.id}
                      </td>
                      <td>
                        <div className="booklead__customer-cell">
                          <span className="booklead__customer-name">{lead.customer}</span>
                          {lead.email && (
                            <span className="booklead__customer-email">{lead.email}</span>
                          )}
                        </div>
                      </td>
                      <td className="booklead__text-muted">
                        <a href={`tel:${lead.phone}`} className="booklead__phone-link">
                          {lead.phone}
                        </a>
                      </td>
                      <td>
                        <div className="booklead__vehicle-cell">
                          <span className="booklead__vehicle-icon"><FaCar /></span>
                          <div>
                            <div className="booklead__vehicle-name">{lead.vehicle}</div>
                            {lead.vehicleType && (
                              <div className="booklead__vehicle-type">{lead.vehicleType}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="booklead__text-muted" title={lead.route}>
                        <div className="booklead__route-cell">{lead.route}</div>
                      </td>
                      <td className="booklead__text-muted">
                        <div className="booklead__datetime-cell">{lead.dateTime}</div>
                      </td>
                      <td className="booklead__font-semibold booklead__price-cell">
                        {formatPrice(lead.price)}
                      </td>
                      <td>
                        <select
                          className={getStatusBadgeClass(lead.status)}
                          value={lead.status}
                          onChange={(e) => handleQuickStatusChange(lead.id, e.target.value)}
                          title="Click to update status"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="booklead__text-right">
                        <div className="booklead__actions">
                          <button
                            type="button"
                            className="booklead__action-btn booklead__action-btn--view"
                            onClick={() => handleOpenModal('view', lead)}
                            title="View Full Details"
                            aria-label="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            type="button"
                            className="booklead__action-btn booklead__action-btn--edit"
                            onClick={() => handleOpenModal('edit', lead)}
                            title="Edit Lead"
                            aria-label="Edit Lead"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="booklead__action-btn booklead__action-btn--delete"
                            onClick={() => handleDelete(lead.id)}
                            title="Delete Lead"
                            aria-label="Delete Lead"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="booklead__no-results">
                    <div className="booklead__empty-state">
                      <FaCar className="booklead__empty-icon" />
                      <h4>No car booking leads found</h4>
                      <p>
                        {searchTerm || vehicleFilter !== 'All' || statusFilter !== 'All'
                          ? 'Try clearing filters or search criteria.'
                          : 'No inquiries have been received yet from the website.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ==========================================
            PAGINATION FOOTER
        ========================================== */}
        {filteredLeads.length > 0 && (
          <div className="booklead__footer">
            <span className="booklead__footer-info">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
            </span>
            <div className="booklead__pagination">
              <button
                type="button"
                className="booklead__page-arrow"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`booklead__page-btn ${currentPage === pageNum ? 'booklead__page-btn--active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                type="button"
                className="booklead__page-arrow"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ==========================================
          POP-UP MODAL (VIEW / EDIT FORM)
      ========================================== */}
      {modalMode && selectedLead && (
        <div className="booklead__modal-backdrop" onClick={handleCloseModal}>
          <div className="booklead__modal-container" onClick={(e) => e.stopPropagation()}>
            
            <div className="booklead__modal-header">
              <div>
                <h3 className="booklead__modal-title">
                  {modalMode === 'edit' ? `Edit Lead: ${selectedLead.id}` : `Booking Details: ${selectedLead.id}`}
                </h3>
                {selectedLead.createdAt && (
                  <span className="booklead__modal-subtitle">
                    Created on {new Date(selectedLead.createdAt).toLocaleString()}
                  </span>
                )}
              </div>
              <button type="button" className="booklead__modal-close" onClick={handleCloseModal} aria-label="Close modal">
                <FaTimes />
              </button>
            </div>

            {modalMode === 'view' ? (
              <div className="booklead__modal-body">
                <div className="booklead__detail-grid">
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Customer Name</span>
                    <span className="booklead__detail-value">{selectedLead.customer}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Phone Number</span>
                    <span className="booklead__detail-value">
                      <a href={`tel:${selectedLead.phone}`} className="booklead__phone-link">
                        {selectedLead.phone}
                      </a>
                    </span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Email Address</span>
                    <span className="booklead__detail-value">
                      {selectedLead.email ? (
                        <a href={`mailto:${selectedLead.email}`} className="booklead__phone-link">
                          {selectedLead.email}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Vehicle Selected</span>
                    <span className="booklead__detail-value">
                      {selectedLead.vehicle} {selectedLead.vehicleType ? `(${selectedLead.vehicleType})` : ''}
                    </span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Pickup Location</span>
                    <span className="booklead__detail-value">{selectedLead.pickupLocation || 'Not specified'}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Drop Location</span>
                    <span className="booklead__detail-value">{selectedLead.dropLocation || 'Not specified'}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Pickup Date & Time</span>
                    <span className="booklead__detail-value">{selectedLead.pickupDateTime || 'Not specified'}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Drop Date & Time</span>
                    <span className="booklead__detail-value">{selectedLead.dropDateTime || 'Not specified'}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Price</span>
                    <span className="booklead__detail-value booklead__price-highlight">
                      {formatPrice(selectedLead.price)}
                    </span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Current Status</span>
                    <span className="booklead__detail-value">
                      <span className={getStatusBadgeClass(selectedLead.status)}>
                        {selectedLead.status}
                      </span>
                    </span>
                  </div>
                  {selectedLead.message && (
                    <div className="booklead__detail-item booklead__detail-item--full">
                      <span className="booklead__detail-label">Customer Note / Message</span>
                      <div className="booklead__message-box">{selectedLead.message}</div>
                    </div>
                  )}
                </div>
                <div className="booklead__modal-footer">
                  <button type="button" className="booklead__btn-secondary" onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type="button" className="booklead__btn-primary" onClick={() => setModalMode('edit')}>
                    <FaEdit /> Switch to Edit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveEdit} className="booklead__modal-body">
                <div className="booklead__form-grid">
                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Customer Name *</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.customer}
                      onChange={(e) => setSelectedLead({ ...selectedLead, customer: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Phone Number *</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.phone}
                      onChange={(e) => setSelectedLead({ ...selectedLead, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Email Address</label>
                    <input
                      type="email"
                      className="booklead__form-input"
                      value={selectedLead.email}
                      onChange={(e) => setSelectedLead({ ...selectedLead, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Vehicle Name *</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.vehicle}
                      onChange={(e) => setSelectedLead({ ...selectedLead, vehicle: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Vehicle Type</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.vehicleType}
                      onChange={(e) => setSelectedLead({ ...selectedLead, vehicleType: e.target.value })}
                      placeholder="e.g. SUV, Sedan, Luxury, Tempo"
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Status *</label>
                    <select
                      className="booklead__form-input"
                      value={selectedLead.status}
                      onChange={(e) => setSelectedLead({ ...selectedLead, status: e.target.value })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Pickup Location *</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.pickupLocation}
                      onChange={(e) => setSelectedLead({ ...selectedLead, pickupLocation: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Drop Location *</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.dropLocation}
                      onChange={(e) => setSelectedLead({ ...selectedLead, dropLocation: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Pickup Date & Time *</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.pickupDateTime}
                      onChange={(e) => setSelectedLead({ ...selectedLead, pickupDateTime: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Drop Date & Time</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.dropDateTime}
                      onChange={(e) => setSelectedLead({ ...selectedLead, dropDateTime: e.target.value })}
                      placeholder="Optional return/drop date"
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Price / Tariff</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.price}
                      onChange={(e) => setSelectedLead({ ...selectedLead, price: e.target.value })}
                      placeholder="e.g. 2500"
                    />
                  </div>

                  <div className="booklead__form-group booklead__form-group--full">
                    <label className="booklead__form-label">Customer Message / Special Requirements</label>
                    <textarea
                      rows="3"
                      className="booklead__form-input booklead__form-textarea"
                      value={selectedLead.message}
                      onChange={(e) => setSelectedLead({ ...selectedLead, message: e.target.value })}
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>

                <div className="booklead__modal-footer">
                  <button type="button" className="booklead__btn-secondary" onClick={handleCloseModal} disabled={isSaving}>
                    Cancel
                  </button>
                  <button type="submit" className="booklead__btn-primary" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <FaSpinner className="booklead__spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <FaSave /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default Booklead;