import React, { useState, useMemo } from 'react';
import './Coupons.css';
import {
  FiTag,
  FiRotateCcw,
  FiSend,
  FiSearch,
  FiDownload,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiBell,
  FiGrid,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiX,
  FiCheck
} from 'react-icons/fi';

const initialFormData = {
  couponCode: '',
  couponName: '',
  discountType: '',
  discountValue: '',
  minBooking: '',
  maxDiscount: '',
  validFrom: '',
  validTo: '',
  usageLimit: '',
  applicableFor: '',
  applicableTours: '',
  status: 'Active',
  description: ''
};

const initialCoupons = [
  {
    id: 1,
    code: 'TRAVEL10',
    name: 'Travel 10% Off',
    discount: '10%',
    minBooking: '₹5,000',
    validFrom: '2025-05-01',
    validTo: '2025-07-31',
    usageLimit: 100,
    used: 25,
    status: 'Active',
    applicableFor: 'All Users',
    tours: 'All Tours',
    description: 'Flat 10% discount on all spiritual and temple tour packages.'
  },
  {
    id: 2,
    code: 'EXPLORE15',
    name: 'Explore 15% Off',
    discount: '15%',
    minBooking: '₹10,000',
    validFrom: '2025-05-10',
    validTo: '2025-08-10',
    usageLimit: 200,
    used: 40,
    status: 'Active',
    applicableFor: 'New Users',
    tours: 'Puri Golden Beach Tour',
    description: 'Special explorer summer discount.'
  },
  {
    id: 3,
    code: 'SUMMER20',
    name: 'Summer Special 20%',
    discount: '20%',
    minBooking: '₹15,000',
    validFrom: '2025-06-01',
    validTo: '2025-08-31',
    usageLimit: 150,
    used: 60,
    status: 'Inactive',
    applicableFor: 'Registered Members',
    tours: 'Konark Sun Temple & Marine Drive',
    description: 'Seasonal peak holiday discount pass.'
  },
  {
    id: 4,
    code: 'WELCOME5',
    name: 'Welcome 5% Off',
    discount: '5%',
    minBooking: '₹2,000',
    validFrom: '2025-04-25',
    validTo: '2025-06-25',
    usageLimit: 300,
    used: 120,
    status: 'Active',
    applicableFor: 'First Time Bookers',
    tours: 'All Tours',
    description: 'Welcome discount for new accounts.'
  }
];

const Coupons = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [formData, setFormData] = useState(initialFormData);

  // Edit Modal State
  const [editFormData, setEditFormData] = useState(initialFormData);
  const [editingCouponId, setEditingCouponId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter & Pagination
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // View Details Modal State
  const [activeModalCoupon, setActiveModalCoupon] = useState(null);

  // Input change for "Add New Coupon" form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Input change for "Edit Coupon" popup modal form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  // Submit "Add New Coupon"
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.couponCode || !formData.couponName || !formData.discountValue) {
      alert('Please fill in required fields: Coupon Code, Name, and Discount Value.');
      return;
    }

    const newCoupon = {
      id: Date.now(),
      code: formData.couponCode.toUpperCase(),
      name: formData.couponName,
      discount:
        formData.discountType === 'Percentage'
          ? `${formData.discountValue}%`
          : `₹${formData.discountValue}`,
      minBooking: formData.minBooking ? `₹${formData.minBooking}` : '₹0',
      validFrom: formData.validFrom || '2026-01-01',
      validTo: formData.validTo || '2026-12-31',
      usageLimit: Number(formData.usageLimit) || 100,
      used: 0,
      status: formData.status,
      applicableFor: formData.applicableFor || 'All Users',
      tours: formData.applicableTours || 'All Tours',
      description: formData.description
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    handleReset();
  };

  // Open Edit Popup Modal
  const handleOpenEditModal = (coupon) => {
    setEditingCouponId(coupon.id);
    setEditFormData({
      couponCode: coupon.code,
      couponName: coupon.name,
      discountType: coupon.discount.includes('%') ? 'Percentage' : 'Fixed',
      discountValue: coupon.discount.replace(/[^0-9]/g, ''),
      minBooking: coupon.minBooking.replace(/[^0-9]/g, ''),
      maxDiscount: '',
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      usageLimit: coupon.usageLimit,
      applicableFor: coupon.applicableFor || 'All Users',
      applicableTours: coupon.tours || 'All Tours',
      status: coupon.status,
      description: coupon.description || ''
    });
    setIsEditModalOpen(true);
  };

  // Close Edit Popup Modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCouponId(null);
    setEditFormData(initialFormData);
  };

  // Save changes from Edit Popup Modal
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (!editFormData.couponCode || !editFormData.couponName || !editFormData.discountValue) {
      alert('Please fill in required fields: Coupon Code, Name, and Discount Value.');
      return;
    }

    setCoupons((prev) =>
      prev.map((item) =>
        item.id === editingCouponId
          ? {
              ...item,
              code: editFormData.couponCode.toUpperCase(),
              name: editFormData.couponName,
              discount:
                editFormData.discountType === 'Percentage'
                  ? `${editFormData.discountValue}%`
                  : `₹${editFormData.discountValue}`,
              minBooking: editFormData.minBooking ? `₹${editFormData.minBooking}` : '₹0',
              validFrom: editFormData.validFrom || item.validFrom,
              validTo: editFormData.validTo || item.validTo,
              usageLimit: Number(editFormData.usageLimit) || item.usageLimit,
              status: editFormData.status,
              applicableFor: editFormData.applicableFor || item.applicableFor,
              tours: editFormData.applicableTours || item.tours,
              description: editFormData.description
            }
          : item
      )
    );
    handleCloseEditModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filteredCoupons = useMemo(() => {
    return coupons.filter((item) => {
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesSearch =
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [coupons, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage) || 1;
  const paginatedCoupons = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCoupons.slice(start, start + itemsPerPage);
  }, [filteredCoupons, currentPage, itemsPerPage]);

  const handleExport = () => {
    const headers = ['ID,Code,Name,Discount,Min Booking,Valid From,Valid To,Usage Limit,Used,Status'];
    const rows = filteredCoupons.map((c) =>
      [c.id, c.code, `"${c.name}"`, c.discount, `"${c.minBooking}"`, c.validFrom, c.validTo, c.usageLimit, c.used, c.status].join(',')
    );
    const blob = new Blob([[...headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coupons_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="coupons-layout">

      {/* Main Content Area */}
      <div className="coupons-main">
        {/* Top Navbar */}
        <header className="coupons-topbar">
          <div className="coupons-page-title-area">
            <h1 className="coupons-page-heading">Coupons</h1>
            <div className="coupons-breadcrumb">
              <span>Home</span> / <span className="coupons-breadcrumb-active">Coupons</span>
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="coupons-content-container">
          {/* Add Coupon Form Card */}
          <section className="coupons-card-box">
            <div className="coupons-card-header">
              <FiTag className="coupons-icon-tag-title" />
              <h2>Add New Coupon</h2>
            </div>
            <form onSubmit={handleFormSubmit} className="coupons-form">
              <div className="coupons-form-grid">
                <div className="coupons-form-group">
                  <label>Coupon Code <span className="coupons-req">*</span></label>
                  <input
                    type="text"
                    name="couponCode"
                    placeholder="Enter coupon code (e.g., TRAVEL10)"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Coupon Name <span className="coupons-req">*</span></label>
                  <input
                    type="text"
                    name="couponName"
                    placeholder="Enter coupon name"
                    value={formData.couponName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Discount Type <span className="coupons-req">*</span></label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select discount type</option>
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div className="coupons-form-group">
                  <label>Discount Value <span className="coupons-req">*</span></label>
                  <input
                    type="number"
                    name="discountValue"
                    placeholder="Enter discount value"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Minimum Booking Amount</label>
                  <input
                    type="number"
                    name="minBooking"
                    placeholder="Enter minimum amount"
                    value={formData.minBooking}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Maximum Discount (Optional)</label>
                  <input
                    type="number"
                    name="maxDiscount"
                    placeholder="Enter maximum discount"
                    value={formData.maxDiscount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Valid From <span className="coupons-req">*</span></label>
                  <input
                    type="date"
                    name="validFrom"
                    value={formData.validFrom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Valid To <span className="coupons-req">*</span></label>
                  <input
                    type="date"
                    name="validTo"
                    value={formData.validTo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Usage Limit</label>
                  <input
                    type="number"
                    name="usageLimit"
                    placeholder="Enter usage limit"
                    value={formData.usageLimit}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Applicable For <span className="coupons-req">*</span></label>
                  <select
                    name="applicableFor"
                    value={formData.applicableFor}
                    onChange={handleInputChange}
                  >
                    <option value="">Select applicable for</option>
                    <option value="All Users">All Users</option>
                    <option value="New Users">New Users</option>
                    <option value="Registered Members">Registered Members</option>
                  </select>
                </div>
                <div className="coupons-form-group">
                  <label>Applicable Tours (Optional)</label>
                  <select
                    name="applicableTours"
                    value={formData.applicableTours}
                    onChange={handleInputChange}
                  >
                    <option value="">Select tours</option>
                    <option value="All Tours">All Tours</option>
                    <option value="Puri Jagannath Temple Tour">Puri Jagannath Temple Tour</option>
                    <option value="Konark Sun Temple & Marine Drive">Konark Sun Temple & Marine Drive</option>
                    <option value="Chilika Lake Dolphin Tour">Chilika Lake Dolphin Tour</option>
                  </select>
                </div>
                <div className="coupons-form-group">
                  <label>Status <span className="coupons-req">*</span></label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="coupons-form-group coupons-full-width">
                  <label>Description (Optional)</label>
                  <textarea
                    rows="3"
                    name="description"
                    placeholder="Enter coupon description..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="coupons-form-footer-actions">
                <button type="button" className="coupons-btn-reset" onClick={handleReset}>
                  <FiRotateCcw /> Reset
                </button>
                <button type="submit" className="coupons-btn-save">
                  <FiSend /> Save Coupon
                </button>
              </div>
            </form>
          </section>

          {/* Table List Card */}
          <section className="coupons-card-box">
            <h2 className="coupons-table-heading">Coupons List</h2>
            <div className="coupons-table-controls">
              <div className="coupons-left-controls">
                <select
                  className="coupons-filter-select"
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
                <div className="coupons-table-search">
                  <input
                    type="text"
                    placeholder="Search coupon..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <FiSearch className="coupons-search-icon" />
                </div>
              </div>
              <button className="coupons-btn-export" onClick={handleExport}>
                <FiDownload /> Export
              </button>
            </div>

            <div className="coupons-table-responsive">
              <table className="coupons-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Coupon Code</th>
                    <th>Coupon Name</th>
                    <th>Discount</th>
                    <th>Min. Booking</th>
                    <th>Valid From</th>
                    <th>Valid To</th>
                    <th>Usage Limit</th>
                    <th>Used</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCoupons.length > 0 ? (
                    paginatedCoupons.map((coupon, index) => (
                      <tr key={coupon.id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="coupons-font-semibold">{coupon.code}</td>
                        <td>{coupon.name}</td>
                        <td>{coupon.discount}</td>
                        <td>{coupon.minBooking}</td>
                        <td>{coupon.validFrom}</td>
                        <td>{coupon.validTo}</td>
                        <td>{coupon.usageLimit}</td>
                        <td>{coupon.used}</td>
                        <td>
                          <span className={`coupons-status-badge coupons-status-${coupon.status.toLowerCase()}`}>
                            {coupon.status}
                          </span>
                        </td>
                        <td>
                          <div className="coupons-action-buttons">
                            <button
                              className="coupons-action-btn coupons-action-view"
                              title="View Details"
                              onClick={() => setActiveModalCoupon(coupon)}
                            >
                              <FiEye />
                            </button>
                            <button
                              className="coupons-action-btn coupons-action-edit"
                              title="Edit Coupon"
                              onClick={() => handleOpenEditModal(coupon)}
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              className="coupons-action-btn coupons-action-delete"
                              title="Delete Coupon"
                              onClick={() => handleDelete(coupon.id)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="coupons-no-data">
                        No coupons found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="coupons-table-footer">
              <div className="coupons-entries-count">
                Showing {filteredCoupons.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredCoupons.length)} of {filteredCoupons.length} entries
              </div>
              <div className="coupons-pagination">
                <button
                  className="coupons-page-arrow"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <FiChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`coupons-page-num ${page === currentPage ? 'coupons-page-active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="coupons-page-arrow"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* View Details Modal */}
      {activeModalCoupon && (
        <div className="coupons-modal-backdrop" onClick={() => setActiveModalCoupon(null)}>
          <div className="coupons-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="coupons-modal-header">
              <h3>Coupon Details: {activeModalCoupon.code}</h3>
              <button className="coupons-btn-close" onClick={() => setActiveModalCoupon(null)}>
                <FiX />
              </button>
            </div>
            <div className="coupons-modal-body">
              <p><strong>Name:</strong> {activeModalCoupon.name}</p>
              <p><strong>Discount:</strong> {activeModalCoupon.discount}</p>
              <p><strong>Minimum Booking:</strong> {activeModalCoupon.minBooking}</p>
              <p><strong>Validity:</strong> {activeModalCoupon.validFrom} to {activeModalCoupon.validTo}</p>
              <p><strong>Redemptions:</strong> {activeModalCoupon.used} / {activeModalCoupon.usageLimit}</p>
              <p><strong>Applicable Users:</strong> {activeModalCoupon.applicableFor}</p>
              <p><strong>Applicable Tours:</strong> {activeModalCoupon.tours}</p>
              <p><strong>Description:</strong> {activeModalCoupon.description || 'None provided.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Coupon Popup Modal Form */}
      {isEditModalOpen && (
        <div className="coupons-modal-backdrop" onClick={handleCloseEditModal}>
          <div className="coupons-modal-card coupons-modal-card-large" onClick={(e) => e.stopPropagation()}>
            <div className="coupons-modal-header">
              <div className="coupons-modal-title">
                <FiEdit2 className="coupons-icon-tag-title" />
                <h3>Edit Coupon: {editFormData.couponCode}</h3>
              </div>
              <button className="coupons-btn-close" onClick={handleCloseEditModal}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleEditFormSubmit} className="coupons-modal-form">
              <div className="coupons-form-grid">
                <div className="coupons-form-group">
                  <label>Coupon Code <span className="coupons-req">*</span></label>
                  <input
                    type="text"
                    name="couponCode"
                    value={editFormData.couponCode}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Coupon Name <span className="coupons-req">*</span></label>
                  <input
                    type="text"
                    name="couponName"
                    value={editFormData.couponName}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Discount Type <span className="coupons-req">*</span></label>
                  <select
                    name="discountType"
                    value={editFormData.discountType}
                    onChange={handleEditInputChange}
                    required
                  >
                    <option value="">Select discount type</option>
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div className="coupons-form-group">
                  <label>Discount Value <span className="coupons-req">*</span></label>
                  <input
                    type="number"
                    name="discountValue"
                    value={editFormData.discountValue}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Minimum Booking Amount</label>
                  <input
                    type="number"
                    name="minBooking"
                    value={editFormData.minBooking}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Maximum Discount (Optional)</label>
                  <input
                    type="number"
                    name="maxDiscount"
                    value={editFormData.maxDiscount}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Valid From <span className="coupons-req">*</span></label>
                  <input
                    type="date"
                    name="validFrom"
                    value={editFormData.validFrom}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Valid To <span className="coupons-req">*</span></label>
                  <input
                    type="date"
                    name="validTo"
                    value={editFormData.validTo}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Usage Limit</label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={editFormData.usageLimit}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className="coupons-form-group">
                  <label>Applicable For <span className="coupons-req">*</span></label>
                  <select
                    name="applicableFor"
                    value={editFormData.applicableFor}
                    onChange={handleEditInputChange}
                  >
                    <option value="All Users">All Users</option>
                    <option value="New Users">New Users</option>
                    <option value="Registered Members">Registered Members</option>
                  </select>
                </div>
                <div className="coupons-form-group">
                  <label>Applicable Tours (Optional)</label>
                  <select
                    name="applicableTours"
                    value={editFormData.applicableTours}
                    onChange={handleEditInputChange}
                  >
                    <option value="All Tours">All Tours</option>
                    <option value="Puri Jagannath Temple Tour">Puri Jagannath Temple Tour</option>
                    <option value="Konark Sun Temple & Marine Drive">Konark Sun Temple & Marine Drive</option>
                    <option value="Chilika Lake Dolphin Tour">Chilika Lake Dolphin Tour</option>
                  </select>
                </div>
                <div className="coupons-form-group">
                  <label>Status <span className="coupons-req">*</span></label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="coupons-form-group coupons-full-width">
                  <label>Description (Optional)</label>
                  <textarea
                    rows="3"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="coupons-form-footer-actions">
                <button type="button" className="coupons-btn-reset" onClick={handleCloseEditModal}>
                  Cancel
                </button>
                <button type="submit" className="coupons-btn-save">
                  <FiCheck /> Update Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;