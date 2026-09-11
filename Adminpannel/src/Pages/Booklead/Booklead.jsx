import React, { useState } from 'react';
import {
  FaUsers,
  FaSnowflake,
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
} from 'react-icons/fa';
import './Booklead.css';

const INITIAL_LEADS = [
  {
    id: 'LD-1001',
    customer: 'Ankita Nayak',
    phone: '9827825440',
    vehicle: 'Hyundai Aura',
    route: 'Bhubaneswar → Cuttack',
    dateTime: '10 Sep 2026, 10:00 AM - 06:00 PM',
    price: 2200,
  },
  {
    id: 'LD-1002',
    customer: 'Rahul Sharma',
    phone: '9876543210',
    vehicle: 'BMW 3 Series',
    route: 'Patia → Airport',
    dateTime: '11 Sep 2026, 09:00 AM - 06:00 PM',
    price: 6500,
  },
  {
    id: 'LD-1003',
    customer: 'Priya Das',
    phone: '9123456780',
    vehicle: 'Mercedes C-Class',
    route: 'Cuttack → Puri',
    dateTime: '12 Sep 2026, 08:00 AM - 08:00 PM',
    price: 8000,
  },
  {
    id: 'LD-1004',
    customer: 'Rohit Sahoo',
    phone: '8765432109',
    vehicle: 'Audi A4',
    route: 'Bhubaneswar → Konark',
    dateTime: '13 Sep 2026, 09:30 AM - 07:30 PM',
    price: 7500,
  },
  {
    id: 'LD-1005',
    customer: 'Sneha Mishra',
    phone: '7987654321',
    vehicle: 'Toyota Innova',
    route: 'Balianta → Puri',
    dateTime: '14 Sep 2026, 10:00 AM - 08:00 PM',
    price: 5500,
  },
  {
    id: 'LD-1006',
    customer: 'Amit Kumar',
    phone: '9345678901',
    vehicle: 'Hyundai Creta',
    route: 'Cuttack → Bhubaneswar',
    dateTime: '15 Sep 2026, 09:00 AM - 05:00 PM',
    price: 4000,
  },
  {
    id: 'LD-1007',
    customer: 'Neha Gupta',
    phone: '9001234567',
    vehicle: 'Innova Crysta',
    route: 'Puri → Bhubaneswar',
    dateTime: '16 Sep 2026, 08:00 AM - 08:00 PM',
    price: 6000,
  },
  {
    id: 'LD-1008',
    customer: 'Sahil Patnaik',
    phone: '8997766555',
    vehicle: 'Swift Dzire',
    route: 'Rasgovindpur → Puri',
    dateTime: '17 Sep 2026, 10:00 AM - 06:00 PM',
    price: 3000,
  },
  {
    id: 'LD-1009',
    customer: 'Pooja Singh',
    phone: '8765443322',
    vehicle: 'Honda City',
    route: 'Bhubaneswar → Cuttack',
    dateTime: '18 Sep 2026, 09:00 AM - 05:00 PM',
    price: 3500,
  },
  {
    id: 'LD-1010',
    customer: 'Vikaash Kumar',
    phone: '9887766555',
    vehicle: 'Mahindra XUV700',
    route: 'Balianta → Puri',
    dateTime: '19 Sep 2026, 08:00 AM - 06:00 PM',
    price: 7000,
  },
  {
    id: 'LD-1011',
    customer: 'Siddharth Rao',
    phone: '9112233445',
    vehicle: 'Toyota Fortuner',
    route: 'Airport → Puri',
    dateTime: '20 Sep 2026, 10:00 AM - 07:00 PM',
    price: 9000,
  }
];

const CSV_HEADERS = ['Lead ID', 'Customer', 'Phone', 'Vehicle', 'Pickup - Drop', 'Date & Time', 'Price (INR)'];

// Wraps a cell in quotes and escapes any embedded quotes whenever the value
// contains a comma, quote, or newline — keeps the CSV valid for every field.
const escapeCsvCell = (value) => {
  const str = String(value ?? '');
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const Booklead = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const itemsPerPage = 5;

  // Modal states
  const [modalMode, setModalMode] = useState(null); // 'view' or 'edit'
  const [selectedLead, setSelectedLead] = useState(null);

  // Filter logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.route.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVehicle = vehicleFilter === 'All' || lead.vehicle.includes(vehicleFilter);

    return matchesSearch && matchesVehicle;
  });

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

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? selectedLead : l))
    );
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (currentPage > 1 && currentLeads.length === 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  /* ----------------------------------------------------------------
     Export CSV — exports exactly what's currently filtered/searched
     (not just the current page), so the file matches what's on screen.
  ---------------------------------------------------------------- */
  const handleExportCSV = () => {
    if (filteredLeads.length === 0 || isExporting) return;

    setIsExporting(true);

    try {
      const rows = filteredLeads.map((lead) => [
        lead.id,
        lead.customer,
        lead.phone,
        lead.vehicle,
        lead.route,
        lead.dateTime,
        lead.price,
      ]);

      const csvContent = [CSV_HEADERS, ...rows]
        .map((row) => row.map(escapeCsvCell).join(','))
        .join('\r\n');

      // Prepend a BOM so Excel opens the file with correct encoding.
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);

      link.href = url;
      link.setAttribute('download', `booking-leads-${timestamp}.csv`);
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

  const totalLeads = leads.length;

  return (
    <div className="booklead">
      <div className="booklead__wrapper">
        
        {/* ==========================================
            METRICS STATS CARDS
        ================ ========================== */}
        <div className="booklead__metrics-grid">
          <div className="booklead__metric-card">
            <div className="booklead__metric-info">
              <span className="booklead__metric-label">Total Leads</span>
              <h3 className="booklead__metric-value">{totalLeads}</h3>
              <span className="booklead__metric-trend booklead__metric-trend--up">+12% this month</span>
            </div>
            <div className="booklead__metric-icon booklead__metric-icon--total">
              <FaUsers />
            </div>
          </div>

          <div className="booklead__metric-card">
            <div className="booklead__metric-info">
              <span className="booklead__metric-label">Active Bookings</span>
              <h3 className="booklead__metric-value">{Math.round(totalLeads * 0.6)}</h3>
              <span className="booklead__metric-trend">On Schedule</span>
            </div>
            <div className="booklead__metric-icon booklead__metric-icon--cold">
              <FaSnowflake />
            </div>
          </div>

          <div className="booklead__metric-card">
            <div className="booklead__metric-info">
              <span className="booklead__metric-label">Pending Review</span>
              <h3 className="booklead__metric-value">{Math.round(totalLeads * 0.25)}</h3>
              <span className="booklead__metric-trend">Requires Action</span>
            </div>
            <div className="booklead__metric-icon booklead__metric-icon--follow">
              <FaClock />
            </div>
          </div>

          <div className="booklead__metric-card">
            <div className="booklead__metric-info">
              <span className="booklead__metric-label">Completed</span>
              <h3 className="booklead__metric-value">{Math.round(totalLeads * 0.15)}</h3>
              <span className="booklead__metric-trend">Successful Trips</span>
            </div>
            <div className="booklead__metric-icon booklead__metric-icon--converted">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        {/* ==========================================
            CONTROLS / SEARCH & FILTERS BAR
        ================ ========================== */}
        <div className="booklead__controls-bar">
          <div className="booklead__search-box">
            <FaSearch className="booklead__search-icon" />
            <input
              type="text"
              placeholder="Search by customer name, phone, lead ID, vehicle, pickup..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="booklead__search-input"
            />
          </div>

          <div className="booklead__filter-group">
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
                <option value="Hyundai">Hyundai</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Toyota">Toyota</option>
                <option value="Swift">Swift</option>
              </select>
              <FaChevronDown className="booklead__select-chevron" aria-hidden="true" />
            </div>

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

        {/* ==========================================
            LEADS DATA TABLE
        ================ ========================== */}
        <div className="booklead__table-container">
          <table className="booklead__table">
            <thead>
              <tr>
                <th><input type="checkbox" aria-label="Select all rows" /></th>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Pickup → Drop</th>
                <th>Date & Time</th>
                <th>Price</th>
                <th className="booklead__text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.length > 0 ? (
                currentLeads.map((lead) => {
                  return (
                    <tr key={lead.id} className="booklead__table-row">
                      <td><input type="checkbox" aria-label={`Select row ${lead.id}`} /></td>
                      <td className="booklead__font-semibold">{lead.id}</td>
                      <td>
                        <div className="booklead__customer-name">{lead.customer}</div>
                      </td>
                      <td className="booklead__text-muted">{lead.phone}</td>
                      <td>
                        <div className="booklead__vehicle-cell">
                          <span className="booklead__vehicle-icon"><FaCar /></span>
                          <span>{lead.vehicle}</span>
                        </div>
                      </td>
                      <td className="booklead__text-muted">{lead.route}</td>
                      <td className="booklead__text-muted">{lead.dateTime}</td>
                      <td className="booklead__font-semibold">₹{lead.price.toLocaleString()}</td>
                      <td className="booklead__text-right">
                        <div className="booklead__actions">
                          <button
                            type="button"
                            className="booklead__action-btn booklead__action-btn--view"
                            onClick={() => handleOpenModal('view', lead)}
                            title="View Details"
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
                    No matching leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ==========================================
            PAGINATION FOOTER
        ================ ========================== */}
        <div className="booklead__footer">
          <span className="booklead__footer-info">
            Showing {filteredLeads.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredLeads.length)} of {filteredLeads.length} entries
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

      </div>

      {/* ==========================================
          POP-UP MODAL (VIEW / EDIT FORM)
      ================ ========================== */}
      {modalMode && selectedLead && (
        <div className="booklead__modal-backdrop" onClick={handleCloseModal}>
          <div className="booklead__modal-container" onClick={(e) => e.stopPropagation()}>
            
            <div className="booklead__modal-header">
              <h3 className="booklead__modal-title">
                {modalMode === 'edit' ? `Edit Lead: ${selectedLead.id}` : `Lead Details: ${selectedLead.id}`}
              </h3>
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
                    <span className="booklead__detail-value">{selectedLead.phone}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Vehicle</span>
                    <span className="booklead__detail-value">{selectedLead.vehicle}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Route (Pickup → Drop)</span>
                    <span className="booklead__detail-value">{selectedLead.route}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Date & Time</span>
                    <span className="booklead__detail-value">{selectedLead.dateTime}</span>
                  </div>
                  <div className="booklead__detail-item">
                    <span className="booklead__detail-label">Price</span>
                    <span className="booklead__detail-value">₹{selectedLead.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="booklead__modal-footer">
                  <button type="button" className="booklead__btn-secondary" onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type="button" className="booklead__btn-primary" onClick={() => setModalMode('edit')}>
                    Switch to Edit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveEdit} className="booklead__modal-body">
                <div className="booklead__form-grid">
                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Customer Name</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.customer}
                      onChange={(e) => setSelectedLead({ ...selectedLead, customer: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Phone Number</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.phone}
                      onChange={(e) => setSelectedLead({ ...selectedLead, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Vehicle</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.vehicle}
                      onChange={(e) => setSelectedLead({ ...selectedLead, vehicle: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Route</label>
                    <input
                      type="text"
                      className="booklead__form-input"
                      value={selectedLead.route}
                      onChange={(e) => setSelectedLead({ ...selectedLead, route: e.target.value })}
                      required
                    />
                  </div>

                  <div className="booklead__form-group">
                    <label className="booklead__form-label">Price (₹)</label>
                    <input
                      type="number"
                      className="booklead__form-input"
                      value={selectedLead.price}
                      onChange={(e) => setSelectedLead({ ...selectedLead, price: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div className="booklead__modal-footer">
                  <button type="button" className="booklead__btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="booklead__btn-primary">
                    <FaSave /> Save Changes
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