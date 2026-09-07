import React, { useState, useMemo } from 'react';
import './Customers.css';
import {
  FiUserPlus,
  FiSearch,
  FiBell,
  FiRotateCcw,
  FiSend,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiX
} from 'react-icons/fi';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  country: '',
  city: '',
  address: '',
  customerType: '',
  status: 'Active',
  notes: ''
};

const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', phone: '9876543210', city: 'Bhubaneswar', totalBookings: 5, joinedDate: '01 May 2025', status: 'Active', dob: '1995-04-12', gender: 'Male', country: 'India', address: 'Plot 42, Saheed Nagar', customerType: 'VIP', notes: 'Frequent weekend traveler.' },
  { id: 2, name: 'Priya Patel', email: 'priya.patel@gmail.com', phone: '8765432109', city: 'Cuttack', totalBookings: 3, joinedDate: '28 Apr 2025', status: 'Active', dob: '1998-08-20', gender: 'Female', country: 'India', address: 'Link Road, Badambadi', customerType: 'Standard', notes: 'Prefers temple tour packages.' },
  { id: 3, name: 'Amit Verma', email: 'amit.verma@gmail.com', phone: '7654321098', city: 'Puri', totalBookings: 7, joinedDate: '22 Apr 2025', status: 'Active', dob: '1992-11-05', gender: 'Male', country: 'India', address: 'VIP Road', customerType: 'Corporate', notes: 'Corporate booking coordinator.' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha.reddy@gmail.com', phone: '6543210987', city: 'Visakhapatnam', totalBookings: 2, joinedDate: '20 Apr 2025', status: 'Inactive', dob: '2000-01-15', gender: 'Female', country: 'India', address: 'Beach Road', customerType: 'Standard', notes: '' },
  { id: 5, name: 'Vikash Singh', email: 'vikash.singh@gmail.com', phone: '6432109876', city: 'Bangalore', totalBookings: 4, joinedDate: '18 Apr 2025', status: 'Active', dob: '1989-06-30', gender: 'Male', country: 'India', address: 'Indiranagar 100ft Rd', customerType: 'VIP', notes: 'Prefers AC luxury coaches.' },
  { id: 6, name: 'Ananya Das', email: 'ananya.das@gmail.com', phone: '9812345670', city: 'Bhubaneswar', totalBookings: 1, joinedDate: '15 Apr 2025', status: 'Active', dob: '1997-09-18', gender: 'Female', country: 'India', address: 'Patia Infocity', customerType: 'Standard', notes: '' },
  { id: 7, name: 'Rohan Mehta', email: 'rohan.mehta@gmail.com', phone: '9123456789', city: 'Rourkela', totalBookings: 0, joinedDate: '10 Apr 2025', status: 'Inactive', dob: '1994-03-22', gender: 'Male', country: 'India', address: 'Civil Township', customerType: 'Standard', notes: '' }
];

const Customers = () => {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // Modal States
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editFormData, setEditFormData] = useState(INITIAL_FORM);

  // Search, Filter & Pagination
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Full Name, Email, Phone).');
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
      country: formData.country,
      city: formData.city || 'Bhubaneswar',
      address: formData.address,
      customerType: formData.customerType || 'Standard',
      totalBookings: 0,
      joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: formData.status,
      notes: formData.notes
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    handleReset();
  };

  const handleOpenView = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleCloseView = () => {
    setIsViewModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleOpenEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditFormData({
      fullName: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      dob: customer.dob || '',
      gender: customer.gender || '',
      country: customer.country || 'India',
      city: customer.city || '',
      address: customer.address || '',
      customerType: customer.customerType || 'Standard',
      status: customer.status || 'Active',
      notes: customer.notes || ''
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    if (!editFormData.fullName || !editFormData.email || !editFormData.phone) {
      alert('Please fill in all required fields (Full Name, Email, Phone).');
      return;
    }

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id
          ? {
              ...c,
              name: editFormData.fullName,
              email: editFormData.email,
              phone: editFormData.phone,
              dob: editFormData.dob,
              gender: editFormData.gender,
              country: editFormData.country,
              city: editFormData.city || 'N/A',
              address: editFormData.address,
              customerType: editFormData.customerType,
              status: editFormData.status,
              notes: editFormData.notes
            }
          : c
      )
    );

    handleCloseEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
        item.email.toLowerCase().includes(tableSearch.toLowerCase()) ||
        item.city.toLowerCase().includes(tableSearch.toLowerCase()) ||
        item.phone.includes(tableSearch);
      const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, tableSearch, statusFilter]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Email,Phone,City,Total Bookings,Joined Date,Status']
        .concat(
          filteredCustomers.map(
            (c) => `${c.id},"${c.name}","${c.email}","${c.phone}","${c.city}",${c.totalBookings},"${c.joinedDate}","${c.status}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'customers_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="customers-wrapper">
      {/* Top Header */}
      <header className="customers-header">
        <div className="customers-header-left">
          <h1 className="customers-title">Customers</h1>
          <div className="customers-breadcrumbs">
            <span>Home</span> / <span className="customers-active-crumb">Customers</span>
          </div>
        </div>
      </header>

      {/* Add Customer Card */}
      <section className="customers-card">
        <div className="customers-card-head">
          <span className="customers-head-icon">
            <FiUserPlus />
          </span>
          <h2 className="customers-card-title">Add New Customer</h2>
        </div>

        <form onSubmit={handleSaveCustomer} className="customers-form">
          <div className="customers-form-grid">
            <div className="customers-field-group">
              <label className="customers-label">
                Full Name <span className="customers-required">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                className="customers-input"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="customers-field-group">
              <label className="customers-label">
                Email Address <span className="customers-required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="customers-input"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="customers-field-group">
              <label className="customers-label">
                Phone Number <span className="customers-required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="customers-input"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="customers-field-group">
              <label className="customers-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="customers-input"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>

            <div className="customers-field-group">
              <label className="customers-label">Gender</label>
              <div className="customers-select-wrap">
                <select
                  name="gender"
                  className="customers-select"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="customers-field-group">
              <label className="customers-label">Country</label>
              <div className="customers-select-wrap">
                <select
                  name="country"
                  className="customers-select"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">Select country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
            </div>

            <div className="customers-field-group">
              <label className="customers-label">City</label>
              <input
                type="text"
                name="city"
                className="customers-input"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="customers-field-group">
              <label className="customers-label">Address</label>
              <input
                type="text"
                name="address"
                className="customers-input"
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="customers-field-group">
              <label className="customers-label">Customer Type</label>
              <div className="customers-select-wrap">
                <select
                  name="customerType"
                  className="customers-select"
                  value={formData.customerType}
                  onChange={handleInputChange}
                >
                  <option value="">Select customer type</option>
                  <option value="Standard">Standard</option>
                  <option value="VIP">VIP</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            </div>

            <div className="customers-field-group">
              <label className="customers-label">
                Status <span className="customers-required">*</span>
              </label>
              <div className="customers-select-wrap">
                <select
                  name="status"
                  className="customers-select"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="customers-field-group customers-full-width">
              <label className="customers-label">Notes</label>
              <textarea
                name="notes"
                className="customers-textarea"
                rows="3"
                placeholder="Enter notes about the customer..."
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="customers-form-buttons">
            <button type="button" className="customers-btn-reset" onClick={handleReset}>
              <FiRotateCcw /> Reset
            </button>
            <button type="submit" className="customers-btn-save">
              <FiSend /> Save Customer
            </button>
          </div>
        </form>
      </section>

      {/* Customers List Card */}
      <section className="customers-card">
        <div className="customers-list-head">
          <h2 className="customers-card-title">Customers List</h2>
        </div>

        <div className="customers-toolbar">
          <div className="customers-toolbar-left">
            <div className="customers-select-wrap customers-filter-select">
              <select
                className="customers-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="customers-table-search">
              <input
                type="text"
                className="customers-input"
                placeholder="Search customer..."
                value={tableSearch}
                onChange={(e) => {
                  setTableSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <FiSearch className="customers-table-search-icon" />
            </div>
          </div>
          <button className="customers-btn-export" onClick={handleExport}>
            <FiDownload /> Export
          </button>
        </div>

        <div className="customers-table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Total Bookings</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((c, index) => (
                  <tr key={c.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="customers-cell-semibold">{c.name}</td>
                    <td className="customers-cell-muted">{c.email}</td>
                    <td className="customers-cell-muted">{c.phone}</td>
                    <td>{c.city}</td>
                    <td>{c.totalBookings}</td>
                    <td>{c.joinedDate}</td>
                    <td>
                      <span className={`customers-badge customers-badge-${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div className="customers-actions">
                        <button
                          type="button"
                          className="customers-action-btn customers-btn-view"
                          title="View"
                          onClick={() => handleOpenView(c)}
                        >
                          <FiEye />
                        </button>
                        <button
                          type="button"
                          className="customers-action-btn customers-btn-edit"
                          title="Edit"
                          onClick={() => handleOpenEdit(c)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          type="button"
                          className="customers-action-btn customers-btn-delete"
                          title="Delete"
                          onClick={() => handleDelete(c.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="customers-no-data">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customers-pagination-wrapper">
          <span className="customers-entries-info">
            Showing {filteredCustomers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries
          </span>
          <div className="customers-pagination">
            <button
              className="customers-page-btn customers-nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <FiChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`customers-page-btn ${currentPage === page ? 'customers-page-active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="customers-page-btn customers-nav-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* VIEW CUSTOMER POPUP MODAL */}
      {isViewModalOpen && selectedCustomer && (
        <div className="customers-modal-backdrop" onClick={handleCloseView}>
          <div className="customers-modal-content customers-view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="customers-modal-header">
              <div className="customers-modal-header-left">
                <span className="customers-head-icon">
                  <FiEye />
                </span>
                <h3 className="customers-modal-title">Customer Details</h3>
              </div>
              <button className="customers-modal-close" onClick={handleCloseView}>
                <FiX />
              </button>
            </div>

            <div className="customers-view-body">
              <div className="customers-view-profile-bar">
                <div className="customers-view-avatar">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="customers-view-name">{selectedCustomer.name}</h4>
                  <p className="customers-view-email">{selectedCustomer.email}</p>
                </div>
                <span className={`customers-badge customers-badge-${selectedCustomer.status.toLowerCase()} customers-view-status`}>
                  {selectedCustomer.status}
                </span>
              </div>

              <div className="customers-view-grid">
                <div className="customers-view-item">
                  <span className="customers-view-label">Phone Number</span>
                  <span className="customers-view-value">{selectedCustomer.phone || 'N/A'}</span>
                </div>
                <div className="customers-view-item">
                  <span className="customers-view-label">Date of Birth</span>
                  <span className="customers-view-value">{selectedCustomer.dob || 'N/A'}</span>
                </div>
                <div className="customers-view-item">
                  <span className="customers-view-label">Gender</span>
                  <span className="customers-view-value">{selectedCustomer.gender || 'N/A'}</span>
                </div>
                <div className="customers-view-item">
                  <span className="customers-view-label">Country</span>
                  <span className="customers-view-value">{selectedCustomer.country || 'N/A'}</span>
                </div>
                <div className="customers-view-item">
                  <span className="customers-view-label">City</span>
                  <span className="customers-view-value">{selectedCustomer.city || 'N/A'}</span>
                </div>
                <div className="customers-view-item">
                  <span className="customers-view-label">Customer Type</span>
                  <span className="customers-view-value">{selectedCustomer.customerType || 'Standard'}</span>
                </div>
                <div className="customers-view-item">
                  <span className="customers-view-label">Total Bookings</span>
                  <span className="customers-view-value">{selectedCustomer.totalBookings}</span>
                </div>
                <div className="customers-view-item">
                  <span className="customers-view-label">Joined Date</span>
                  <span className="customers-view-value">{selectedCustomer.joinedDate}</span>
                </div>
                <div className="customers-view-item customers-full-width">
                  <span className="customers-view-label">Address</span>
                  <span className="customers-view-value">{selectedCustomer.address || 'N/A'}</span>
                </div>
                <div className="customers-view-item customers-full-width">
                  <span className="customers-view-label">Notes</span>
                  <span className="customers-view-value">{selectedCustomer.notes || 'No notes added.'}</span>
                </div>
              </div>
            </div>

            <div className="customers-modal-footer">
              <button type="button" className="customers-btn-reset" onClick={handleCloseView}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CUSTOMER POPUP MODAL */}
      {isEditModalOpen && selectedCustomer && (
        <div className="customers-modal-backdrop" onClick={handleCloseEdit}>
          <div className="customers-modal-content customers-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="customers-modal-header">
              <div className="customers-modal-header-left">
                <span className="customers-head-icon">
                  <FiEdit />
                </span>
                <h3 className="customers-modal-title">Edit Customer</h3>
              </div>
              <button className="customers-modal-close" onClick={handleCloseEdit}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="customers-form">
              <div className="customers-modal-body">
                <div className="customers-form-grid">
                  <div className="customers-field-group">
                    <label className="customers-label">
                      Full Name <span className="customers-required">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="customers-input"
                      value={editFormData.fullName}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">
                      Email Address <span className="customers-required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="customers-input"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">
                      Phone Number <span className="customers-required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="customers-input"
                      value={editFormData.phone}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      className="customers-input"
                      value={editFormData.dob}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">Gender</label>
                    <div className="customers-select-wrap">
                      <select
                        name="gender"
                        className="customers-select"
                        value={editFormData.gender}
                        onChange={handleEditInputChange}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">Country</label>
                    <div className="customers-select-wrap">
                      <select
                        name="country"
                        className="customers-select"
                        value={editFormData.country}
                        onChange={handleEditInputChange}
                      >
                        <option value="">Select country</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="customers-input"
                      value={editFormData.city}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="customers-input"
                      value={editFormData.address}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">Customer Type</label>
                    <div className="customers-select-wrap">
                      <select
                        name="customerType"
                        className="customers-select"
                        value={editFormData.customerType}
                        onChange={handleEditInputChange}
                      >
                        <option value="">Select customer type</option>
                        <option value="Standard">Standard</option>
                        <option value="VIP">VIP</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                    </div>
                  </div>

                  <div className="customers-field-group">
                    <label className="customers-label">
                      Status <span className="customers-required">*</span>
                    </label>
                    <div className="customers-select-wrap">
                      <select
                        name="status"
                        className="customers-select"
                        value={editFormData.status}
                        onChange={handleEditInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="customers-field-group customers-full-width">
                    <label className="customers-label">Notes</label>
                    <textarea
                      name="notes"
                      className="customers-textarea"
                      rows="3"
                      value={editFormData.notes}
                      onChange={handleEditInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="customers-modal-footer">
                <button type="button" className="customers-btn-reset" onClick={handleCloseEdit}>
                  Cancel
                </button>
                <button type="submit" className="customers-btn-save">
                  <FiSend /> Update Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;