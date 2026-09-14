import React, { useEffect, useMemo, useState } from 'react';
import './Enquiries.css';

import {
  FiFileText,
  FiSearch,
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
  FiCheckCircle,
  FiPlus,
  FiUsers,
  FiClock,
  FiMessageCircle,
  FiCheck,
  FiSquare,
  FiCheckSquare,
  FiRefreshCw,
} from 'react-icons/fi';

const API_URL = 'http://localhost:5000';

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
  message: '',
};

const Enquiries = () => {
  const [formData, setFormData] = useState(initialForm);
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  // Selected enquiries
  const [selectedIds, setSelectedIds] = useState([]);

  // =========================================================
  // FETCH ENQUIRIES
  // =========================================================

  const fetchEnquiries = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const response = await fetch(`${API_URL}/api/enquiries`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch enquiries.');
      }

      const formattedData = (data.enquiries || []).map((item) => ({
        id: item._id,
        name: item.name || 'N/A',
        email: item.email || 'N/A',
        phone: item.phone || 'N/A',
        tour: item.tour || item.service || 'N/A',
        travelDate: item.travelDate || 'TBD',
        travelers: item.travelers || 1,
        departure: item.departure || 'N/A',
        destination: item.destination || 'N/A',
        budget: item.budget || 'Flexible',
        message: item.message || 'No requirements specified.',
        status: item.status || 'New',
        createdDate: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'N/A',
      }));

      setEnquiries(formattedData);

      // Remove deleted/non-existing IDs from selection
      setSelectedIds((prev) =>
        prev.filter((id) => formattedData.some((item) => item.id === id))
      );
    } catch (error) {
      console.error('Fetch enquiries error:', error);

      if (showLoader) {
        alert(error.message || 'Unable to load enquiries.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // =========================================================
  // FORM
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialForm);
  };

  // =========================================================
  // ADD ENQUIRY
  // =========================================================

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.tourPackage
    ) {
      alert('Please fill all mandatory fields (*)');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.phone,
          service: formData.tourPackage,
          travelDate: formData.travelDate,
          travelers: formData.travelers
            ? Number(formData.travelers)
            : 1,
          departure: formData.departure,
          destination: formData.destination,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to create enquiry.'
        );
      }

      await fetchEnquiries(false);

      handleReset();
      setIsAddModalOpen(false);
      setCurrentPage(1);

      alert('Enquiry added successfully.');
    } catch (error) {
      console.error('Add enquiry error:', error);

      alert(
        error.message || 'Failed to add enquiry.'
      );
    }
  };

  // =========================================================
  // DELETE SINGLE
  // =========================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this enquiry?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/enquiries/${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete enquiry.'
        );
      }

      setEnquiries((prev) =>
        prev.filter((item) => item.id !== id)
      );

      setSelectedIds((prev) =>
        prev.filter((selectedId) => selectedId !== id)
      );

      alert('Enquiry deleted successfully.');
    } catch (error) {
      console.error('Delete enquiry error:', error);

      alert(
        error.message || 'Failed to delete enquiry.'
      );
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editItem) return;

    try {
      const response = await fetch(
        `${API_URL}/api/enquiries/${editItem.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: editItem.name,
            email: editItem.email,
            phone: editItem.phone,
            tour: editItem.tour,
            travelDate: editItem.travelDate,
            travelers: Number(editItem.travelers) || 1,
            departure: editItem.departure || 'N/A',
            destination: editItem.destination || 'N/A',
            budget: editItem.budget || 'Flexible',
            message:
              editItem.message ||
              'No requirements specified.',
            status: editItem.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update enquiry.'
        );
      }

      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === editItem.id
            ? { ...item, ...editItem }
            : item
        )
      );

      setEditItem(null);

      alert('Enquiry updated successfully.');
    } catch (error) {
      console.error('Update enquiry error:', error);

      alert(
        error.message || 'Failed to update enquiry.'
      );
    }
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.tour.toLowerCase().includes(query) ||
        item.phone.includes(query) ||
        item.destination.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'All Status' ||
        item.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [enquiries, searchQuery, statusFilter]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages =
    Math.ceil(
      filteredEnquiries.length / itemsPerPage
    ) || 1;

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentItems = filteredEnquiries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // =========================================================
  // SELECT SYSTEM
  // =========================================================

  const allFilteredSelected =
    filteredEnquiries.length > 0 &&
    filteredEnquiries.every((item) =>
      selectedIds.includes(item.id)
    );

  const currentPageSelected =
    currentItems.length > 0 &&
    currentItems.every((item) =>
      selectedIds.includes(item.id)
    );

  const toggleSingleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Select ALL filtered enquiries
  const handleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !filteredEnquiries.some(
              (item) => item.id === id
            )
        )
      );
    } else {
      setSelectedIds((prev) => {
        const newIds = filteredEnquiries
          .map((item) => item.id)
          .filter((id) => !prev.includes(id));

        return [...prev, ...newIds];
      });
    }
  };

  // Select current page only
  const handleSelectCurrentPage = () => {
    if (currentPageSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !currentItems.some(
              (item) => item.id === id
            )
        )
      );
    } else {
      setSelectedIds((prev) => {
        const newIds = currentItems
          .map((item) => item.id)
          .filter((id) => !prev.includes(id));

        return [...prev, ...newIds];
      });
    }
  };

  // =========================================================
  // BULK DELETE
  // =========================================================

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one enquiry.');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} selected enquiry${
        selectedIds.length > 1 ? 'ies' : ''
      }?`
    );

    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`${API_URL}/api/enquiries/${id}`, {
            method: 'DELETE',
          })
        )
      );

      setEnquiries((prev) =>
        prev.filter(
          (item) => !selectedIds.includes(item.id)
        )
      );

      setSelectedIds([]);

      alert('Selected enquiries deleted successfully.');
    } catch (error) {
      console.error('Bulk delete error:', error);

      alert(
        'Some enquiries could not be deleted. Please try again.'
      );

      await fetchEnquiries(false);
    }
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(
      (item) => item.status === 'New'
    ).length,
    progress: enquiries.filter(
      (item) => item.status === 'In Progress'
    ).length,
    replied: enquiries.filter(
      (item) => item.status === 'Replied'
    ).length,
    closed: enquiries.filter(
      (item) => item.status === 'Closed'
    ).length,
  };

  // =========================================================
  // CSV EXPORT
  // =========================================================

  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = [
      'Ref ID',
      'Name',
      'Email',
      'Phone',
      'Tour',
      'Travel Date',
      'Travelers',
      'Departure',
      'Destination',
      'Budget',
      'Status',
      'Date Submitted',
    ];

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
      `"${item.createdDate}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n');

    const encodedUri =
      encodeURI(csvContent);

    const link =
      document.createElement('a');

    link.setAttribute('href', encodedUri);

    link.setAttribute(
      'download',
      `Enquiries_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
    return `enquiries-badge-${status
      .toLowerCase()
      .replace(/\s+/g, '-')}`;
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="enquiries-view-wrapper">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="enquiries-page-header">
        <div>
          <div className="enquiries-header-kicker">
            <span className="enquiries-kicker-dot" />
            Customer Management
          </div>

          <h1 className="enquiries-page-main-title">
            Enquiries
          </h1>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="enquiries-stats-grid">

        <div className="enquiries-stat-card enquiries-stat-total">
          <div className="enquiries-stat-icon">
            <FiUsers />
          </div>

          <div className="enquiries-stat-content">
            <span>Total Enquiries</span>
            <strong>{stats.total}</strong>
            <small>All customer requests</small>
          </div>
        </div>

        <div className="enquiries-stat-card enquiries-stat-new">
          <div className="enquiries-stat-icon">
            <FiFileText />
          </div>

          <div className="enquiries-stat-content">
            <span>New</span>
            <strong>{stats.new}</strong>
            <small>Needs attention</small>
          </div>
        </div>

        <div className="enquiries-stat-card enquiries-stat-progress">
          <div className="enquiries-stat-icon">
            <FiClock />
          </div>

          <div className="enquiries-stat-content">
            <span>In Progress</span>
            <strong>{stats.progress}</strong>
            <small>Currently processing</small>
          </div>
        </div>

        <div className="enquiries-stat-card enquiries-stat-replied">
          <div className="enquiries-stat-icon">
            <FiMessageCircle />
          </div>

          <div className="enquiries-stat-content">
            <span>Replied</span>
            <strong>{stats.replied}</strong>
            <small>Customer contacted</small>
          </div>
        </div>

        <div className="enquiries-stat-card enquiries-stat-closed">
          <div className="enquiries-stat-icon">
            <FiCheckCircle />
          </div>

          <div className="enquiries-stat-content">
            <span>Closed</span>
            <strong>{stats.closed}</strong>
            <small>Completed enquiries</small>
          </div>
        </div>

      </section>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <main className="enquiries-main-body">
        <section className="enquiries-card-box">

          {/* TOP BAR */}

          <div className="enquiries-card-topbar">

            <div className="enquiries-title-area">
              <div className="enquiries-title-icon">
                <FiFileText />
              </div>

              <div>
                <h2 className="enquiries-list-title">
                  Enquiries List
                </h2>

                <p className="enquiries-list-subtitle">
                  View and manage all incoming enquiries
                </p>
              </div>
            </div>

            <div className="enquiries-action-group">

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  className="enquiries-bulk-delete-btn"
                  onClick={handleBulkDelete}
                >
                  <FiTrash2 />
                  <span>
                    Delete Selected ({selectedIds.length})
                  </span>
                </button>
              )}

              <button
                type="button"
                className="enquiries-btn enquiries-select-all-btn"
                onClick={handleSelectAll}
              >
                {allFilteredSelected ? (
                  <FiCheckSquare />
                ) : (
                  <FiSquare />
                )}

                <span>
                  {allFilteredSelected
                    ? 'Unselect All'
                    : 'Select All'}
                </span>
              </button>

              <button
                type="button"
                className="enquiries-btn enquiries-export-btn"
                onClick={handleExportCSV}
              >
                <FiDownload />
                <span>Export</span>
              </button>

              <button
                type="button"
                className="enquiries-btn enquiries-add-btn"
                onClick={() =>
                  setIsAddModalOpen(true)
                }
              >
                <FiPlus />
                <span>New Enquiry</span>
              </button>

            </div>
          </div>

          {/* SELECTION INFO */}

          {selectedIds.length > 0 && (
            <div className="enquiries-selection-banner">

              <div className="enquiries-selection-left">
                <div className="enquiries-selection-check">
                  <FiCheck />
                </div>

                <div>
                  <strong>
                    {selectedIds.length} enquiry
                    {selectedIds.length > 1 ? 'ies' : ''}
                    {' '}selected
                  </strong>

                  <span>
                    You can delete the selected enquiries.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIds([])}
              >
                Clear Selection
              </button>

            </div>
          )}

          {/* TOOLBAR */}

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
                  <option value="All Status">
                    All Status
                  </option>

                  <option value="New">
                    New
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Replied">
                    Replied
                  </option>

                  <option value="Closed">
                    Closed
                  </option>
                </select>

                <FiChevronDown className="enquiries-select-dropdown-icon" />
              </div>

              <div className="enquiries-search-input-wrap">

                <FiSearch className="enquiries-table-search-icon" />

                <input
                  type="text"
                  placeholder="Search name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="enquiries-table-search-input"
                />

                {searchQuery && (
                  <button
                    type="button"
                    className="enquiries-search-clear"
                    onClick={() =>
                      setSearchQuery('')
                    }
                  >
                    <FiX />
                  </button>
                )}

              </div>

            </div>

            <div className="enquiries-toolbar-right">

              <span className="enquiries-results-count">
                Showing{' '}
                <strong>
                  {filteredEnquiries.length}
                </strong>{' '}
                result
                {filteredEnquiries.length !== 1
                  ? 's'
                  : ''}
              </span>

            </div>

          </div>

          {/* TABLE */}

          <div className="enquiries-table-scroll-container">

            <table className="enquiries-records-table">

              <thead>
                <tr>

                  <th className="enquiries-checkbox-column">
                    <button
                      type="button"
                      className="enquiries-header-checkbox"
                      onClick={
                        handleSelectCurrentPage
                      }
                      title={
                        currentPageSelected
                          ? 'Unselect current page'
                          : 'Select current page'
                      }
                    >
                      {currentPageSelected ? (
                        <FiCheckSquare />
                      ) : (
                        <FiSquare />
                      )}
                    </button>
                  </th>

                  <th>#</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Tour Package</th>
                  <th>Travel Date</th>
                  <th>Travelers</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="enquiries-action-header">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan="11"
                      className="enquiries-loading-cell"
                    >
                      <div className="enquiries-loader">
                        <span />
                        <span />
                        <span />
                      </div>

                      <p>
                        Loading enquiries...
                      </p>
                    </td>
                  </tr>
                ) : currentItems.length > 0 ? (

                  currentItems.map((row, idx) => {

                    const isSelected =
                      selectedIds.includes(row.id);

                    return (
                      <tr
                        key={row.id}
                        className={
                          isSelected
                            ? 'enquiries-row-selected'
                            : ''
                        }
                      >

                        <td className="enquiries-checkbox-column">

                          <button
                            type="button"
                            className={`enquiries-row-checkbox ${
                              isSelected
                                ? 'enquiries-row-checkbox-active'
                                : ''
                            }`}
                            onClick={() =>
                              toggleSingleSelect(
                                row.id
                              )
                            }
                          >
                            {isSelected ? (
                              <FiCheckSquare />
                            ) : (
                              <FiSquare />
                            )}
                          </button>

                        </td>

                        <td className="enquiries-row-index">
                          {startIndex + idx + 1}
                        </td>

                        <td>
                          <div className="enquiries-customer-cell">

                            <div className="enquiries-avatar">
                              {row.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <span className="enquiries-customer-name">
                                {row.name}
                              </span>

                              <small>
                                {row.destination !==
                                'N/A'
                                  ? row.destination
                                  : 'Travel enquiry'}
                              </small>
                            </div>

                          </div>
                        </td>

                        <td>
                          <span className="enquiries-email-text">
                            {row.email}
                          </span>
                        </td>

                        <td>
                          <span className="enquiries-phone-text">
                            {row.phone}
                          </span>
                        </td>

                        <td>
                          <span className="enquiries-tour-text">
                            {row.tour}
                          </span>
                        </td>

                        <td>
                          <span className="enquiries-date-text">
                            <FiCalendar />
                            {row.travelDate}
                          </span>
                        </td>

                        <td>
                          <span className="enquiries-travelers-count">
                            {row.travelers}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`enquiries-badge-pill ${getStatusClass(
                              row.status
                            )}`}
                          >
                            <span className="enquiries-status-dot" />
                            {row.status}
                          </span>
                        </td>

                        <td>
                          <span className="enquiries-created-date">
                            {row.createdDate}
                          </span>
                        </td>

                        <td className="enquiries-action-cell">

                          <button
                            type="button"
                            className="enquiries-action-icon enquiries-action-view"
                            title="View Details"
                            onClick={() =>
                              setViewItem(row)
                            }
                          >
                            <FiEye />
                          </button>

                          <button
                            type="button"
                            className="enquiries-action-icon enquiries-action-edit"
                            title="Edit"
                            onClick={() =>
                              setEditItem({
                                ...row,
                              })
                            }
                          >
                            <FiEdit />
                          </button>

                          <button
                            type="button"
                            className="enquiries-action-icon enquiries-action-delete"
                            title="Delete"
                            onClick={() =>
                              handleDelete(row.id)
                            }
                          >
                            <FiTrash2 />
                          </button>

                        </td>

                      </tr>
                    );
                  })

                ) : (

                  <tr>
                    <td
                      colSpan="11"
                      className="enquiries-no-records"
                    >
                      <div className="enquiries-empty-state">

                        <div className="enquiries-empty-icon">
                          <FiFileText />
                        </div>

                        <h3>
                          No enquiries found
                        </h3>

                        <p>
                          Try changing your search or
                          filter criteria.
                        </p>

                      </div>
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}

          <footer className="enquiries-pagination-bar">

            <div className="enquiries-showing-text">
              Showing{' '}
              <strong>
                {filteredEnquiries.length > 0
                  ? startIndex + 1
                  : 0}
              </strong>{' '}
              to{' '}
              <strong>
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredEnquiries.length
                )}
              </strong>{' '}
              of{' '}
              <strong>
                {filteredEnquiries.length}
              </strong>{' '}
              entries
            </div>

            <div className="enquiries-pagination-nav">

              <button
                type="button"
                className="enquiries-page-arrow"
                disabled={currentPage === 1}
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
              >
                <FiChevronLeft />
              </button>

              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    handlePageChange(page)
                  }
                  className={`enquiries-page-number ${
                    currentPage === page
                      ? 'enquiries-page-number-active'
                      : ''
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="enquiries-page-arrow"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
              >
                <FiChevronRight />
              </button>

            </div>

          </footer>

        </section>
      </main>

      {/* =====================================================
          ADD NEW ENQUIRY MODAL
      ===================================================== */}

      {isAddModalOpen && (
        <div
          className="enquiries-modal-backdrop"
          onClick={() =>
            setIsAddModalOpen(false)
          }
        >

          <div
            className="enquiries-modal-window enquiries-modal-large-window"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="enquiries-modal-header">

              <div className="enquiries-modal-heading">

                <div className="enquiries-modal-heading-icon">
                  <FiFileText />
                </div>

                <div>
                  <h3 className="enquiries-modal-title">
                    Add New Enquiry
                  </h3>

                  <p>
                    Create a new customer enquiry
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="enquiries-modal-close-btn"
                onClick={() =>
                  setIsAddModalOpen(false)
                }
              >
                <FiX />
              </button>

            </div>

            <form
              onSubmit={handleAddSubmit}
            >

              <div className="enquiries-modal-body">

                <div className="enquiries-form-modal-grid">

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Full Name{' '}
                      <span className="enquiries-asterisk">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleInputChange
                      }
                      className="enquiries-field-input"
                      required
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Email Address{' '}
                      <span className="enquiries-asterisk">
                        *
                      </span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={
                        formData.email
                      }
                      onChange={
                        handleInputChange
                      }
                      className="enquiries-field-input"
                      required
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Phone Number{' '}
                      <span className="enquiries-asterisk">
                        *
                      </span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleInputChange
                      }
                      className="enquiries-field-input"
                      required
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Tour Interested In{' '}
                      <span className="enquiries-asterisk">
                        *
                      </span>
                    </label>

                    <div className="enquiries-select-box">

                      <select
                        name="tourPackage"
                        value={
                          formData.tourPackage
                        }
                        onChange={
                          handleInputChange
                        }
                        className="enquiries-field-select"
                        required
                      >
                        <option value="">
                          Select tour
                        </option>

                        <option value="Bali Tour">
                          Bali Tour
                        </option>

                        <option value="Goa Trip">
                          Goa Trip
                        </option>

                        <option value="Europe Tour">
                          Europe Tour
                        </option>

                        <option value="Thailand Tour">
                          Thailand Tour
                        </option>

                        <option value="Dubai Desert & City">
                          Dubai Desert & City
                        </option>

                        <option value="Odisha Tour Packages">
                          Odisha Tour Packages
                        </option>
                      </select>

                      <FiChevronDown className="enquiries-select-dropdown-icon" />

                    </div>
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Travel Date
                    </label>

                    <div className="enquiries-date-wrapper">

                      <input
                        type="date"
                        name="travelDate"
                        value={
                          formData.travelDate
                        }
                        onChange={
                          handleInputChange
                        }
                        className="enquiries-field-input enquiries-field-date-input"
                      />

                      <FiCalendar className="enquiries-field-date-icon" />

                    </div>
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      No. of Travelers
                    </label>

                    <input
                      type="number"
                      name="travelers"
                      min="1"
                      placeholder="Enter number of travelers"
                      value={
                        formData.travelers
                      }
                      onChange={
                        handleInputChange
                      }
                      className="enquiries-field-input"
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Departure From
                    </label>

                    <input
                      type="text"
                      name="departure"
                      placeholder="Enter departure city"
                      value={
                        formData.departure
                      }
                      onChange={
                        handleInputChange
                      }
                      className="enquiries-field-input"
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Destination
                    </label>

                    <input
                      type="text"
                      name="destination"
                      placeholder="Enter destination"
                      value={
                        formData.destination
                      }
                      onChange={
                        handleInputChange
                      }
                      className="enquiries-field-input"
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Budget Range
                    </label>

                    <div className="enquiries-select-box">

                      <select
                        name="budget"
                        value={
                          formData.budget
                        }
                        onChange={
                          handleInputChange
                        }
                        className="enquiries-field-select"
                      >
                        <option value="">
                          Select budget range
                        </option>

                        <option value="Below ₹50,000">
                          Below ₹50,000
                        </option>

                        <option value="₹50,000 - ₹1,00,000">
                          ₹50,000 - ₹1,00,000
                        </option>

                        <option value="₹1,00,000 - ₹2,00,000">
                          ₹1,00,000 - ₹2,00,000
                        </option>

                        <option value="₹2,00,000+">
                          ₹2,00,000+
                        </option>
                      </select>

                      <FiChevronDown className="enquiries-select-dropdown-icon" />

                    </div>
                  </div>

                  <div className="enquiries-field-cell enquiries-field-fullspan">

                    <label className="enquiries-label-text">
                      Message / Requirements
                    </label>

                    <textarea
                      rows="4"
                      name="message"
                      placeholder="Write your message or requirements..."
                      value={
                        formData.message
                      }
                      onChange={
                        handleInputChange
                      }
                      className="enquiries-field-textarea"
                    />

                  </div>

                </div>

              </div>

              <div className="enquiries-modal-footer">

                <button
                  type="button"
                  onClick={handleReset}
                  className="enquiries-reset-btn"
                >
                  <FiRotateCcw />
                  <span>Reset</span>
                </button>

                <button
                  type="submit"
                  className="enquiries-submit-btn"
                >
                  <FiSend />
                  <span>
                    Submit Enquiry
                  </span>
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {viewItem && (
        <div
          className="enquiries-modal-backdrop"
          onClick={() =>
            setViewItem(null)
          }
        >

          <div
            className="enquiries-modal-window enquiries-view-window"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="enquiries-modal-header">

              <div className="enquiries-modal-heading">

                <div className="enquiries-modal-heading-icon">
                  <FiEye />
                </div>

                <div>
                  <h3 className="enquiries-modal-title">
                    Enquiry Details
                  </h3>

                  <p>
                    Reference ID: {viewItem.id}
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="enquiries-modal-close-btn"
                onClick={() =>
                  setViewItem(null)
                }
              >
                <FiX />
              </button>

            </div>

            <div className="enquiries-modal-body">

              <div className="enquiries-profile-box">

                <div className="enquiries-profile-avatar">
                  {viewItem.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3>
                    {viewItem.name}
                  </h3>

                  <span>
                    {viewItem.email}
                  </span>
                </div>

                <span
                  className={`enquiries-badge-pill ${getStatusClass(
                    viewItem.status
                  )}`}
                >
                  <span className="enquiries-status-dot" />
                  {viewItem.status}
                </span>

              </div>

              <div className="enquiries-detail-grid">

                <div className="enquiries-detail-card">
                  <span>
                    Phone Number
                  </span>

                  <strong>
                    {viewItem.phone}
                  </strong>
                </div>

                <div className="enquiries-detail-card">
                  <span>
                    Tour Package
                  </span>

                  <strong>
                    {viewItem.tour}
                  </strong>
                </div>

                <div className="enquiries-detail-card">
                  <span>
                    Travel Date
                  </span>

                  <strong>
                    {viewItem.travelDate}
                  </strong>
                </div>

                <div className="enquiries-detail-card">
                  <span>
                    Travelers
                  </span>

                  <strong>
                    {viewItem.travelers} People
                  </strong>
                </div>

                <div className="enquiries-detail-card">
                  <span>
                    Departure
                  </span>

                  <strong>
                    {viewItem.departure}
                  </strong>
                </div>

                <div className="enquiries-detail-card">
                  <span>
                    Destination
                  </span>

                  <strong>
                    {viewItem.destination}
                  </strong>
                </div>

                <div className="enquiries-detail-card">
                  <span>
                    Budget
                  </span>

                  <strong>
                    {viewItem.budget}
                  </strong>
                </div>

                <div className="enquiries-detail-card">
                  <span>
                    Submitted
                  </span>

                  <strong>
                    {viewItem.createdDate}
                  </strong>
                </div>

              </div>

              <div className="enquiries-message-box">

                <div className="enquiries-message-heading">
                  <FiMessageCircle />
                  <span>
                    Requirements / Message
                  </span>
                </div>

                <p>
                  {viewItem.message ||
                    'No additional specifications provided.'}
                </p>

              </div>

            </div>

            <div className="enquiries-modal-footer">

              <button
                type="button"
                className="enquiries-reset-btn"
                onClick={() =>
                  setViewItem(null)
                }
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editItem && (
        <div
          className="enquiries-modal-backdrop"
          onClick={() =>
            setEditItem(null)
          }
        >

          <div
            className="enquiries-modal-window enquiries-modal-edit-window"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="enquiries-modal-header">

              <div className="enquiries-modal-heading">

                <div className="enquiries-modal-heading-icon">
                  <FiEdit />
                </div>

                <div>
                  <h3 className="enquiries-modal-title">
                    Edit Enquiry
                  </h3>

                  <p>
                    Update customer enquiry details
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="enquiries-modal-close-btn"
                onClick={() =>
                  setEditItem(null)
                }
              >
                <FiX />
              </button>

            </div>

            <form
              onSubmit={handleEditSubmit}
            >

              <div className="enquiries-modal-body">

                <div className="enquiries-modal-grid">

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        editItem.name || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                      required
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        editItem.email || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                      required
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        editItem.phone || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                      required
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Tour Package
                    </label>

                    <input
                      type="text"
                      name="tour"
                      value={
                        editItem.tour || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                      required
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Travel Date
                    </label>

                    <input
                      type="text"
                      name="travelDate"
                      value={
                        editItem.travelDate || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Travelers
                    </label>

                    <input
                      type="number"
                      name="travelers"
                      min="1"
                      value={
                        editItem.travelers || 1
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Departure
                    </label>

                    <input
                      type="text"
                      name="departure"
                      value={
                        editItem.departure || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Destination
                    </label>

                    <input
                      type="text"
                      name="destination"
                      value={
                        editItem.destination || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                    />
                  </div>

                  <div className="enquiries-field-cell">
                    <label className="enquiries-label-text">
                      Budget
                    </label>

                    <input
                      type="text"
                      name="budget"
                      value={
                        editItem.budget || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-input"
                    />
                  </div>

                  <div className="enquiries-field-cell">

                    <label className="enquiries-label-text">
                      Status
                    </label>

                    <div className="enquiries-select-box">

                      <select
                        name="status"
                        value={
                          editItem.status ||
                          'New'
                        }
                        onChange={
                          handleEditChange
                        }
                        className="enquiries-field-select"
                      >
                        <option value="New">
                          New
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Replied">
                          Replied
                        </option>

                        <option value="Closed">
                          Closed
                        </option>
                      </select>

                      <FiChevronDown className="enquiries-select-dropdown-icon" />

                    </div>

                  </div>

                  <div className="enquiries-field-cell enquiries-field-fullspan">

                    <label className="enquiries-label-text">
                      Message / Requirements
                    </label>

                    <textarea
                      rows="4"
                      name="message"
                      value={
                        editItem.message || ''
                      }
                      onChange={
                        handleEditChange
                      }
                      className="enquiries-field-textarea"
                    />

                  </div>

                </div>

              </div>

              <div className="enquiries-modal-footer">

                <button
                  type="button"
                  className="enquiries-reset-btn"
                  onClick={() =>
                    setEditItem(null)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="enquiries-submit-btn"
                >
                  <FiCheckCircle />
                  <span>
                    Save Changes
                  </span>
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