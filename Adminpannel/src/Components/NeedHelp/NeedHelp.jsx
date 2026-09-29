import React, { useState, useEffect, useRef, useCallback } from 'react';
import './NeedHelp.css';

const API_BASE_URL = 'http://localhost:5000/api/need-help';
const ITEMS_PER_PAGE = 8;

const statusList = [
  { label: 'New', colorClass: 'NeedHelp__badge--new', dotClass: 'NeedHelp__dot--new' },
  { label: 'Replied', colorClass: 'NeedHelp__badge--replied', dotClass: 'NeedHelp__dot--replied' },
  { label: 'Closed', colorClass: 'NeedHelp__badge--closed', dotClass: 'NeedHelp__dot--closed' }
];

const NeedHelp = () => {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [activeStatusMenuId, setActiveStatusMenuId] = useState(null);

  const statusDropdownRef = useRef(null);

  // Close status dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target)) {
        setActiveStatusMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // 1. Fetch live records from backend
  const fetchNeedHelpRecords = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}?page=${page}&limit=${ITEMS_PER_PAGE}`);
      const result = await res.json();

      if (result.success) {
        setDataList(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotalEntries(result.pagination.totalEntries);
        setCurrentPage(result.pagination.currentPage);
      }
    } catch (err) {
      console.error('Error fetching NeedHelp data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNeedHelpRecords(currentPage);
  }, [fetchNeedHelpRecords, currentPage]);

  // 2. Change status on backend
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // Optimistic instant UI update
      setDataList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      setActiveStatusMenuId(null);

      const res = await fetch(`${API_BASE_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();
      if (!result.success) {
        fetchNeedHelpRecords(currentPage);
      }
    } catch (err) {
      console.error('Status update failed:', err);
      fetchNeedHelpRecords(currentPage);
    }
  };

  // 3. Confirm Delete on backend
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (result.success) {
        setDeleteTarget(null);
        // If deleting the last entry on page > 1, go to previous page
        if (dataList.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetchNeedHelpRecords(currentPage);
        }
      }
    } catch (err) {
      console.error('Delete request failed:', err);
    }
  };

  const handleOpenDelete = (item) => {
    setDeleteTarget(item);
  };

  const handleOpenView = (item) => {
    setViewTarget(item);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = totalEntries === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalEntries);

  return (
    <div className="NeedHelp">
      <div className="NeedHelp__card">
        {/* Table Container */}
        <div className="NeedHelp__table-wrapper">
          <table className="NeedHelp__table">
            <thead>
              <tr className="NeedHelp__header-row">
                <th className="NeedHelp__th NeedHelp__th--hash">#</th>
                <th className="NeedHelp__th NeedHelp__th--name">Name</th>
                <th className="NeedHelp__th">Mobile Number</th>
                <th className="NeedHelp__th NeedHelp__th--message">Message</th>
                <th className="NeedHelp__th NeedHelp__th--date">
                  <span className="NeedHelp__sort-label">
                    Submitted Date
                    <svg className="NeedHelp__sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </th>
                <th className="NeedHelp__th NeedHelp__th--status-col">Status</th>
                <th className="NeedHelp__th NeedHelp__th--action">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="NeedHelp__empty-state">
                    Loading enquiries...
                  </td>
                </tr>
              ) : dataList.length > 0 ? (
                dataList.map((item, index) => {
                  const serialNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                  const initialLetter = item.name?.trim().charAt(0).toUpperCase() || '?';
                  const isMenuOpen = activeStatusMenuId === item.id;

                  return (
                    <tr key={item.id} className="NeedHelp__tr">
                      {/* # Number */}
                      <td className="NeedHelp__td NeedHelp__td--hash">{serialNumber}</td>

                      {/* Name with pastel Avatar */}
                      <td className="NeedHelp__td">
                        <div className="NeedHelp__user-cell">
                          <div className={`NeedHelp__avatar NeedHelp__avatar--${item.color || 'blue'}`}>
                            {initialLetter}
                          </div>
                          <span className="NeedHelp__user-name">{item.name}</span>
                        </div>
                      </td>

                      {/* Mobile */}
                      <td className="NeedHelp__td NeedHelp__phone-text">{item.phone}</td>

                      {/* Message with tooltip */}
                      <td className="NeedHelp__td">
                        <span className="NeedHelp__message-text" title={item.message}>
                          {item.message}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="NeedHelp__td">
                        <div className="NeedHelp__date-cell">
                          <svg className="NeedHelp__calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.8" />
                            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.8" />
                          </svg>
                          <div className="NeedHelp__date-details">
                            <div className="NeedHelp__date-primary">{item.date}</div>
                            <div className="NeedHelp__date-time">{item.time}</div>
                          </div>
                        </div>
                      </td>

                      {/* Status Tag */}
                      <td className="NeedHelp__td">
                        <span className={`NeedHelp__badge NeedHelp__badge--${item.status.toLowerCase()}`}>
                          <span className="NeedHelp__badge-dot"></span>
                          {item.status}
                        </span>
                      </td>

                      {/* Action column (View, Status Change, Delete) */}
                      <td className="NeedHelp__td NeedHelp__td--action-cell">
                        <div className="NeedHelp__actions-group" ref={isMenuOpen ? statusDropdownRef : null}>
                          {/* 1. View Button */}
                          <button
                            type="button"
                            className="NeedHelp__btn-action NeedHelp__btn-action--view"
                            onClick={() => handleOpenView(item)}
                            title="View Details"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          {/* 2. Change Status Button */}
                          <div className="NeedHelp__status-dropdown-wrap">
                            <button
                              type="button"
                              className={`NeedHelp__btn-action NeedHelp__btn-action--status ${isMenuOpen ? 'NeedHelp__btn-action--active' : ''}`}
                              onClick={() => setActiveStatusMenuId(isMenuOpen ? null : item.id)}
                              title="Update Status"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>

                            {/* Floating Popover Status List */}
                            {isMenuOpen && (
                              <div className="NeedHelp__status-menu">
                                <div className="NeedHelp__status-menu-header">Change Status</div>
                                {statusList.map((st) => (
                                  <button
                                    key={st.label}
                                    type="button"
                                    className={`NeedHelp__status-option ${item.status === st.label ? 'NeedHelp__status-option--selected' : ''}`}
                                    onClick={() => handleUpdateStatus(item.id, st.label)}
                                  >
                                    <span className={`NeedHelp__status-dot-indicator ${st.dotClass}`}></span>
                                    <span>{st.label}</span>
                                    {item.status === st.label && (
                                      <svg className="NeedHelp__check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 3. Delete Button */}
                          <button
                            type="button"
                            className="NeedHelp__btn-action NeedHelp__btn-action--delete"
                            onClick={() => handleOpenDelete(item)}
                            title="Delete"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="NeedHelp__empty-state">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with entries counter and pagination */}
        <div className="NeedHelp__footer">
          <div className="NeedHelp__footer-info">
            {totalEntries > 0
              ? `Showing ${startIndex} to ${endIndex} of ${totalEntries} entries`
              : 'Showing 0 of 0 entries'}
          </div>

          <div className="NeedHelp__pagination">
            {/* Prev button */}
            <button
              type="button"
              className="NeedHelp__pg-btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous Page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page numeric pills */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`NeedHelp__pg-btn ${pageNum === currentPage ? 'NeedHelp__pg-btn--active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            ))}

            {/* Next button */}
            <button
              type="button"
              className="NeedHelp__pg-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next Page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ================= PREMIUM DELETE MODAL ================= */}
      {deleteTarget && (
        <div className="NeedHelp__modal-backdrop" onClick={() => setDeleteTarget(null)}>
          <div className="NeedHelp__modal NeedHelp__modal--delete" onClick={(e) => e.stopPropagation()}>
            <div className="NeedHelp__modal-icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <h3 className="NeedHelp__modal-title">Delete Enquiry</h3>
            <p className="NeedHelp__modal-desc">
              Are you sure you want to permanently delete the message from{' '}
              <strong>"{deleteTarget.name}"</strong>? This action cannot be undone.
            </p>

            <div className="NeedHelp__modal-actions">
              <button
                type="button"
                className="NeedHelp__modal-btn NeedHelp__modal-btn--cancel"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="NeedHelp__modal-btn NeedHelp__modal-btn--danger"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW DETAILS MODAL ================= */}
      {viewTarget && (
        <div className="NeedHelp__modal-backdrop" onClick={() => setViewTarget(null)}>
          <div className="NeedHelp__modal NeedHelp__modal--view" onClick={(e) => e.stopPropagation()}>
            <div className="NeedHelp__view-header">
              <div className="NeedHelp__view-header-left">
                <div className={`NeedHelp__avatar NeedHelp__avatar--${viewTarget.color || 'blue'}`}>
                  {viewTarget.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="NeedHelp__view-name">{viewTarget.name}</h3>
                  <span className={`NeedHelp__badge NeedHelp__badge--${viewTarget.status.toLowerCase()}`}>
                    <span className="NeedHelp__badge-dot"></span>
                    {viewTarget.status}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="NeedHelp__modal-close"
                onClick={() => setViewTarget(null)}
              >
                ✕
              </button>
            </div>

            <div className="NeedHelp__view-body">
              <div className="NeedHelp__view-field">
                <label className="NeedHelp__view-label">Mobile Number</label>
                <div className="NeedHelp__view-value">{viewTarget.phone}</div>
              </div>

              <div className="NeedHelp__view-field">
                <label className="NeedHelp__view-label">Submitted Date & Time</label>
                <div className="NeedHelp__view-value">
                  {viewTarget.date} &bull; {viewTarget.time}
                </div>
              </div>

              <div className="NeedHelp__view-field">
                <label className="NeedHelp__view-label">Message Content</label>
                <div className="NeedHelp__view-message-box">
                  {viewTarget.message}
                </div>
              </div>
            </div>

            <div className="NeedHelp__modal-actions">
              <button
                type="button"
                className="NeedHelp__modal-btn NeedHelp__modal-btn--primary"
                onClick={() => setViewTarget(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeedHelp;