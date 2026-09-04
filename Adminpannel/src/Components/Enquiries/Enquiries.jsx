import React, { useState } from 'react';
import './Enquiries.css';
import {
  FiFileText,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiCalendar,
  FiRotateCcw,
  FiSend,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCheckCircle
} from 'react-icons/fi';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  tourPackage: '',
  travelDate: '',
  travelers: '',
  departure: '',
  destination: '',
  budget: '',
  message: ''
};

const initialList = [
  {
    id: 'ENQ-01',
    name: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    phone: '9876543210',
    tour: 'Bali Tour',
    travelDate: '12/06/2025',
    travelers: 2,
    departure: 'Mumbai',
    destination: 'Bali, Indonesia',
    budget: '$1,000 - $3,000',
    message: 'Need 4-star beachfront resort accommodation.',
    status: 'New',
    createdDate: '01 May 2025'
  },
  {
    id: 'ENQ-02',
    name: 'Priya Patel',
    email: 'priya@gmail.com',
    phone: '8765432109',
    tour: 'Goa Trip',
    travelDate: '18/06/2025',
    travelers: 4,
    departure: 'Delhi',
    destination: 'Goa, India',
    budget: 'Below $1,000',
    message: 'Looking for a private villa near Baga.',
    status: 'In Progress',
    createdDate: '30 Apr 2025'
  },
  {
    id: 'ENQ-03',
    name: 'Amit Verma',
    email: 'amit@gmail.com',
    phone: '7654321098',
    tour: 'Europe Tour',
    travelDate: '25/07/2025',
    travelers: 2,
    departure: 'Bangalore',
    destination: 'Switzerland & Paris',
    budget: '$5,000+',
    message: 'Prefer private rail transfers.',
    status: 'Replied',
    createdDate: '28 Apr 2025'
  },
  {
    id: 'ENQ-04',
    name: 'Sneha Reddy',
    email: 'sneha@gmail.com',
    phone: '6543210987',
    tour: 'Thailand Tour',
    travelDate: '10/08/2025',
    travelers: 3,
    departure: 'Hyderabad',
    destination: 'Phuket & Bangkok',
    budget: '$1,000 - $3,000',
    message: 'Family vacation with kid-friendly sightseeing.',
    status: 'Closed',
    createdDate: '25 Apr 2025'
  }
];

const Enquiries = () => {
  const [formData, setFormData] = useState(initialForm);
  const [enquiries, setEnquiries] = useState(initialList);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.tourPackage) {
      alert('Please fill all mandatory fields (*)');
      return;
    }

    const today = new Date();
    const formattedCreated = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const formattedTravel = formData.travelDate
      ? formData.travelDate.split('-').reverse().join('/')
      : 'TBD';

    const newRecord = {
      id: `ENQ-${Date.now().toString().slice(-4)}`,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      tour: formData.tourPackage,
      travelDate: formattedTravel,
      travelers: formData.travelers ? Number(formData.travelers) : 1,
      departure: formData.departure || 'N/A',
      destination: formData.destination || 'N/A',
      budget: formData.budget || 'Flexible',
      message: formData.message || 'No requirements specified.',
      status: 'New',
      createdDate: formattedCreated
    };

    setEnquiries([newRecord, ...enquiries]);
    handleReset();
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      const updated = enquiries.filter((item) => item.id !== id);
      setEnquiries(updated);
      if ((currentPage - 1) * itemsPerPage >= updated.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Edit Submission Handler
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEnquiries((prev) =>
      prev.map((item) => (item.id === editItem.id ? editItem : item))
    );
    setEditItem(null);
  };

  // CSV Export
  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = ['Ref ID', 'Name', 'Email', 'Phone', 'Tour', 'Travel Date', 'Travelers', 'Departure', 'Destination', 'Budget', 'Status', 'Date Submitted'];
    const rows = filteredEnquiries.map((item) => [
      `"${item.id}"`,
      `"${item.name}"`,
      `"${item.email}"`,
      `"${item.phone}"`,
      `"${item.tour}"`,
      `"${item.travelDate}"`,
      `"${item.travelers}"`,
      `"${item.departure || ''}"`,
      `"${item.destination || ''}"`,
      `"${item.budget || ''}"`,
      `"${item.status}"`,
      `"${item.createdDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredEnquiries = enquiries.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.tour.toLowerCase().includes(query) ||
      item.phone.includes(query);

    const matchesStatus =
      statusFilter === 'All Status' || item.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  // Pagination indexing
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredEnquiries.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="enquiries-view-wrapper">
      {/* Top Header Navbar */}
      <header className="enquiries-top-navbar">
        <div className="enquiries-navbar-left">
          <h1 className="enquiries-page-heading">Enquiries</h1>
          <nav className="enquiries-breadcrumb-trail">
            <span>Home</span>
            <span className="enquiries-breadcrumb-sep">/</span>
            <span className="enquiries-breadcrumb-current">Enquiries</span>
          </nav>
        </div>

      </header>

      {/* Main Form & Table Content */}
      <main className="enquiries-main-body">
        {/* Add New Enquiry Card */}
        <section className="enquiries-card-box">
          <div className="enquiries-card-title-row">
            <FiFileText className="enquiries-header-card-icon" />
            <h2 className="enquiries-section-title">Add New Enquiry</h2>
          </div>

          <form onSubmit={handleSubmit} className="enquiries-input-form">
            <div className="enquiries-form-three-grid">
              {/* Full Name */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">
                  Full Name <span className="enquiries-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="enquiries-field-input"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">
                  Email Address <span className="enquiries-asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="enquiries-field-input"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">
                  Phone Number <span className="enquiries-asterisk">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="enquiries-field-input"
                  required
                />
              </div>

              {/* Tour Interested In */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">
                  Tour Interested In <span className="enquiries-asterisk">*</span>
                </label>
                <div className="enquiries-select-box">
                  <select
                    name="tourPackage"
                    value={formData.tourPackage}
                    onChange={handleInputChange}
                    className="enquiries-field-select"
                    required
                  >
                    <option value="">Select tour</option>
                    <option value="Bali Tour">Bali Tour</option>
                    <option value="Goa Trip">Goa Trip</option>
                    <option value="Europe Tour">Europe Tour</option>
                    <option value="Thailand Tour">Thailand Tour</option>
                    <option value="Dubai Desert & City">Dubai Desert & City</option>
                  </select>
                  <FiChevronDown className="enquiries-select-dropdown-icon" />
                </div>
              </div>

              {/* Travel Date */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">Travel Date</label>
                <div className="enquiries-date-wrapper">
                  <input
                    type="date"
                    name="travelDate"
                    placeholder="dd/mm/yyyy"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="enquiries-field-input enquiries-field-date-input"
                  />
                  <FiCalendar className="enquiries-field-date-icon" />
                </div>
              </div>

              {/* No. of Travelers */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">No. of Travelers</label>
                <input
                  type="number"
                  name="travelers"
                  min="1"
                  placeholder="Enter number of travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  className="enquiries-field-input"
                />
              </div>

              {/* Departure From */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">Departure From</label>
                <input
                  type="text"
                  name="departure"
                  placeholder="Enter departure city"
                  value={formData.departure}
                  onChange={handleInputChange}
                  className="enquiries-field-input"
                />
              </div>

              {/* Destination */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">Destination</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="Enter destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="enquiries-field-input"
                />
              </div>

              {/* Budget Range */}
              <div className="enquiries-field-cell">
                <label className="enquiries-label-text">Budget Range</label>
                <div className="enquiries-select-box">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="enquiries-field-select"
                  >
                    <option value="">Select budget range</option>
                    <option value="Below $1,000">Below $1,000</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                  <FiChevronDown className="enquiries-select-dropdown-icon" />
                </div>
              </div>

              {/* Message / Requirements */}
              <div className="enquiries-field-cell enquiries-field-fullspan">
                <label className="enquiries-label-text">Message / Requirements</label>
                <textarea
                  rows="3"
                  name="message"
                  placeholder="Write your message or requirements..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="enquiries-field-textarea"
                />
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="enquiries-form-action-bar">
              <button
                type="button"
                onClick={handleReset}
                className="enquiries-reset-btn"
              >
                <FiRotateCcw className="enquiries-btn-svg" />
                <span>Reset</span>
              </button>
              <button type="submit" className="enquiries-submit-btn">
                <FiSend className="enquiries-btn-svg" />
                <span>Submit Enquiry</span>
              </button>
            </div>
          </form>
        </section>

        {/* Enquiries List Table Section */}
        <section className="enquiries-card-box">
          <h2 className="enquiries-list-title">Enquiries List</h2>

          <div className="enquiries-toolbar-flex">
            <div className="enquiries-filter-search-combo">
              <div className="enquiries-select-box enquiries-filter-select-box">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="enquiries-filter-select"
                >
                  <option value="All Status">All Status</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Replied">Replied</option>
                  <option value="Closed">Closed</option>
                </select>
                <FiChevronDown className="enquiries-select-dropdown-icon" />
              </div>

              <div className="enquiries-search-input-wrap">
                <input
                  type="text"
                  placeholder="Search enquiry..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="enquiries-table-search-input"
                />
                <FiSearch className="enquiries-table-search-icon" />
              </div>
            </div>

            <button
              type="button"
              className="enquiries-export-btn"
              onClick={handleExportCSV}
            >
              <FiDownload className="enquiries-btn-svg" />
              <span>Export</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="enquiries-table-scroll-container">
            <table className="enquiries-records-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Tour</th>
                  <th>Travel Date</th>
                  <th>Travelers</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((row, idx) => (
                    <tr key={row.id}>
                      <td className="enquiries-row-index">{startIndex + idx + 1}</td>
                      <td className="enquiries-customer-name">{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.phone}</td>
                      <td>{row.tour}</td>
                      <td>{row.travelDate}</td>
                      <td>{row.travelers}</td>
                      <td>
                        <span
                          className={`enquiries-badge-pill enquiries-badge-${row.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>{row.createdDate}</td>
                      <td className="enquiries-action-cell">
                        <button
                          type="button"
                          className="enquiries-action-icon enquiries-action-view"
                          title="View Details"
                          onClick={() => setViewItem(row)}
                        >
                          <FiEye />
                        </button>
                        <button
                          type="button"
                          className="enquiries-action-icon enquiries-action-edit"
                          title="Edit"
                          onClick={() => setEditItem({ ...row })}
                        >
                          <FiEdit />
                        </button>
                        <button
                          type="button"
                          className="enquiries-action-icon enquiries-action-delete"
                          title="Delete"
                          onClick={() => handleDelete(row.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="enquiries-no-records">
                      No enquiries found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <footer className="enquiries-pagination-bar">
            <div className="enquiries-showing-text">
              Showing {filteredEnquiries.length > 0 ? startIndex + 1 : 0} to{' '}
              {Math.min(startIndex + itemsPerPage, filteredEnquiries.length)} of{' '}
              {filteredEnquiries.length} entries
            </div>

            <div className="enquiries-pagination-nav">
              <button
                type="button"
                className="enquiries-page-arrow"
                aria-label="Previous Page"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`enquiries-page-number ${
                    currentPage === page ? 'enquiries-page-number-active' : ''
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="enquiries-page-arrow"
                aria-label="Next Page"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FiChevronRight />
              </button>
            </div>
          </footer>
        </section>
      </main>

      {/* View Modal Popup */}
      {viewItem && (
        <div className="enquiries-modal-backdrop" onClick={() => setViewItem(null)}>
          <div
            className="enquiries-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="enquiries-modal-header">
              <h3 className="enquiries-modal-title">Enquiry Details ({viewItem.id})</h3>
              <button
                type="button"
                className="enquiries-modal-close-btn"
                onClick={() => setViewItem(null)}
              >
                <FiX />
              </button>
            </div>
            <div className="enquiries-modal-body">
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Customer Name:</span>
                <span className="enquiries-detail-val">{viewItem.name}</span>
              </div>
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Email:</span>
                <span className="enquiries-detail-val">{viewItem.email}</span>
              </div>
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Phone:</span>
                <span className="enquiries-detail-val">{viewItem.phone}</span>
              </div>
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Tour Package:</span>
                <span className="enquiries-detail-val">{viewItem.tour}</span>
              </div>
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Travel Date:</span>
                <span className="enquiries-detail-val">{viewItem.travelDate}</span>
              </div>
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Travelers:</span>
                <span className="enquiries-detail-val">{viewItem.travelers} People</span>
              </div>
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Departure / Destination:</span>
                <span className="enquiries-detail-val">
                  {viewItem.departure || 'N/A'} &rarr; {viewItem.destination || 'N/A'}
                </span>
              </div>
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Budget:</span>
                <span className="enquiries-detail-val">{viewItem.budget || 'Flexible'}</span>
              </div>
              <div className="enquiries-detail-row">
                <span className="enquiries-detail-label">Status:</span>
                <span
                  className={`enquiries-badge-pill enquiries-badge-${viewItem.status
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                >
                  {viewItem.status}
                </span>
              </div>
              <div className="enquiries-detail-row enquiries-detail-full">
                <span className="enquiries-detail-label">Requirements / Message:</span>
                <p className="enquiries-detail-notes">
                  {viewItem.message || 'No additional specifications provided.'}
                </p>
              </div>
            </div>
            <div className="enquiries-modal-footer">
              <button
                type="button"
                className="enquiries-reset-btn"
                onClick={() => setViewItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal Popup */}
      {editItem && (
        <div className="enquiries-modal-backdrop" onClick={() => setEditItem(null)}>
          <div
            className="enquiries-modal-window enquiries-modal-edit-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="enquiries-modal-header">
              <h3 className="enquiries-modal-title">Edit Enquiry ({editItem.id})</h3>
              <button
                type="button"
                className="enquiries-modal-close-btn"
                onClick={() => setEditItem(null)}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="enquiries-modal-body enquiries-modal-grid">
                <div className="enquiries-field-cell">
                  <label className="enquiries-label-text">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editItem.name}
                    onChange={handleEditChange}
                    className="enquiries-field-input"
                    required
                  />
                </div>
                <div className="enquiries-field-cell">
                  <label className="enquiries-label-text">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editItem.email}
                    onChange={handleEditChange}
                    className="enquiries-field-input"
                    required
                  />
                </div>
                <div className="enquiries-field-cell">
                  <label className="enquiries-label-text">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editItem.phone}
                    onChange={handleEditChange}
                    className="enquiries-field-input"
                    required
                  />
                </div>
                <div className="enquiries-field-cell">
                  <label className="enquiries-label-text">Tour Package</label>
                  <input
                    type="text"
                    name="tour"
                    value={editItem.tour}
                    onChange={handleEditChange}
                    className="enquiries-field-input"
                    required
                  />
                </div>
                <div className="enquiries-field-cell">
                  <label className="enquiries-label-text">Travel Date</label>
                  <input
                    type="text"
                    name="travelDate"
                    value={editItem.travelDate}
                    onChange={handleEditChange}
                    className="enquiries-field-input"
                  />
                </div>
                <div className="enquiries-field-cell">
                  <label className="enquiries-label-text">Travelers</label>
                  <input
                    type="number"
                    name="travelers"
                    value={editItem.travelers}
                    onChange={handleEditChange}
                    className="enquiries-field-input"
                  />
                </div>
                <div className="enquiries-field-cell">
                  <label className="enquiries-label-text">Status</label>
                  <div className="enquiries-select-box">
                    <select
                      name="status"
                      value={editItem.status}
                      onChange={handleEditChange}
                      className="enquiries-field-select"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Replied">Replied</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <FiChevronDown className="enquiries-select-dropdown-icon" />
                  </div>
                </div>
              </div>
              <div className="enquiries-modal-footer">
                <button
                  type="button"
                  className="enquiries-reset-btn"
                  onClick={() => setEditItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="enquiries-submit-btn">
                  <FiCheckCircle className="enquiries-btn-svg" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;