import React, { useState, useEffect, useMemo } from 'react';
import './Coupons.css';
import API from '../../api/axios';
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

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
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

  // 1. Get all coupons
  const fetchCoupons = async () => {
    try {
      const res = await API.get('/coupons');
      if (res.data.success) {
        setCoupons(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch coupons:', err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  // 2. Submit "Add New Coupon"
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.couponCode || !formData.couponName || !formData.discountValue || !formData.discountType) {
      alert('Please fill in required fields: Coupon Code, Name, Discount Type, and Value.');
      return;
    }

    try {
      const res = await API.post('/coupons', formData);
      if (res.data.success) {
        setCoupons((prev) => [res.data.data, ...prev]);
        handleReset();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating coupon');
    }
  };

  // 3. Open Edit Modal & Populate Form
  const handleOpenEditModal = (coupon) => {
    setEditingCouponId(coupon._id);
    setEditFormData({
      couponCode: coupon.code,
      couponName: coupon.name,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minBooking: coupon.minBooking || '',
      maxDiscount: coupon.maxDiscount || '',
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      usageLimit: coupon.usageLimit,
      applicableFor: coupon.applicableFor || 'All Users',
      applicableTours: coupon.applicableTours || 'All Tours',
      status: coupon.status,
      description: coupon.description || ''
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCouponId(null);
    setEditFormData(initialFormData);
  };

  // 4. Update Coupon
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    if (!editFormData.couponCode || !editFormData.couponName || !editFormData.discountValue) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const res = await API.put(`/coupons/${editingCouponId}`, editFormData);
      if (res.data.success) {
        setCoupons((prev) =>
          prev.map((item) => (item._id === editingCouponId ? res.data.data : item))
        );
        handleCloseEditModal();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating coupon');
    }
  };

  // 5. Delete Coupon
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;

    try {
      const res = await API.delete(`/coupons/${id}`);
      if (res.data.success) {
        setCoupons((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting coupon');
    }
  };

  const filteredCoupons = useMemo(() => {
    return coupons.filter((item) => {
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesSearch =
        item.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [coupons, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage) || 1;
  const paginatedCoupons = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCoupons.slice(start, start + itemsPerPage);
  }, [filteredCoupons, currentPage, itemsPerPage]);

  const handleExport = () => {
    const headers = ['Code,Name,Discount,Min Booking,Valid From,Valid To,Usage Limit,Used,Status'];
    const rows = filteredCoupons.map((c) => {
      const discount = c.discountType === 'Percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`;
      return [c.code, `"${c.name}"`, discount, `₹${c.minBooking}`, c.validFrom, c.validTo, c.usageLimit, c.used, c.status].join(',');
    });
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
      <div className="coupons-main">
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
                      <tr key={coupon._id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="coupons-font-semibold">{coupon.code}</td>
                        <td>{coupon.name}</td>
                        <td>
                          {coupon.discountType === 'Percentage'
                            ? `${coupon.discountValue}%`
                            : `₹${coupon.discountValue}`}
                        </td>
                        <td>₹{coupon.minBooking || 0}</td>
                        <td>{coupon.validFrom}</td>
                        <td>{coupon.validTo}</td>
                        <td>{coupon.usageLimit}</td>
                        <td>{coupon.used || 0}</td>
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
                              onClick={() => handleDelete(coupon._id)}
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
              <p>
                <strong>Discount:</strong>{' '}
                {activeModalCoupon.discountType === 'Percentage'
                  ? `${activeModalCoupon.discountValue}%`
                  : `₹${activeModalCoupon.discountValue}`}
              </p>
              <p><strong>Minimum Booking:</strong> ₹{activeModalCoupon.minBooking || 0}</p>
              <p><strong>Validity:</strong> {activeModalCoupon.validFrom} to {activeModalCoupon.validTo}</p>
              <p><strong>Redemptions:</strong> {activeModalCoupon.used || 0} / {activeModalCoupon.usageLimit}</p>
              <p><strong>Applicable Users:</strong> {activeModalCoupon.applicableFor}</p>
              <p><strong>Applicable Tours:</strong> {activeModalCoupon.applicableTours}</p>
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