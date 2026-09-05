import React, { useState, useRef } from 'react';
import './Testimonial.css';
import {
  FaPlus,
  FaUpload,
  FaTrashAlt,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaSave,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaQuoteRight,
  FaFacebook,
  FaGoogle,
  FaTripadvisor
} from 'react-icons/fa';

const initialReviews = [
  {
    id: 1,
    reviewer: 'Sophia Reynolds',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    reviewText:
      'Booking our Himalayan trek through TripRex was effortless. The local guides were attentive, food was outstanding, and every hotel stop exceeded our expectations.',
    rating: 5,
    date: '2023-06-14',
    time: '16:15',
    formattedDate: 'Jun 14, 2023',
    formattedTime: '04:15 PM',
    platform: 'All Reviews',
    status: 'Published'
  },
  {
    id: 2,
    reviewer: 'Arjun Verma',
    location: 'New Delhi, India',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    reviewText:
      'Incredible experience! The itinerary was perfectly structured and the support team responded instantly to every query. Highly recommended!',
    rating: 5,
    date: '2023-07-21',
    time: '20:45',
    formattedDate: 'Jul 21, 2023',
    formattedTime: '08:45 PM',
    platform: 'Tripadvisor',
    status: 'Published'
  },
  {
    id: 3,
    reviewer: 'Elena Rostova',
    location: 'Prague, Czech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    reviewText:
      'Seamless booking process and pristine transport facilities throughout our golden triangle tour. Will definitely book again.',
    rating: 5,
    date: '2023-08-03',
    time: '11:00',
    formattedDate: 'Aug 03, 2023',
    formattedTime: '11:00 AM',
    platform: 'Google',
    status: 'Published'
  }
];

const Testimonial = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [activeTab, setActiveTab] = useState('All Reviews');
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [reviewerName, setReviewerName] = useState('Sophia Reynolds');
  const [location, setLocation] = useState('London, UK');
  const [reviewText, setReviewText] = useState(
    'Booking our Himalayan trek through TripRex was effortless. The local guides were attentive, food was outstanding, and every hotel stop exceeded our expectations.'
  );
  const [rating, setRating] = useState(5);
  const [reviewDate, setReviewDate] = useState('2023-06-14');
  const [reviewTime, setReviewTime] = useState('16:15');
  const [platform, setPlatform] = useState('All Reviews');
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  );

  // Table Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal View
  const [viewingReview, setViewingReview] = useState(null);

  const fileInputRef = useRef(null);

  // Formatting date and time helper
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr) return { formattedDate: '', formattedTime: '' };
    const dateObj = new Date(`${dateStr}T${timeStr || '12:00'}`);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    return { formattedDate, formattedTime };
  };

  // Profile Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset / Clear Form
  const handleCancel = () => {
    setEditingId(null);
    setReviewerName('');
    setLocation('');
    setReviewText('');
    setRating(5);
    setReviewDate('');
    setReviewTime('');
    setPlatform('All Reviews');
    setProfileImage('https://via.placeholder.com/100');
  };

  // Save / Add Review
  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewerName || !location || !reviewText || !reviewDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const { formattedDate, formattedTime } = formatDateTime(reviewDate, reviewTime);

    if (editingId) {
      setReviews((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                reviewer: reviewerName,
                location,
                reviewText,
                rating,
                date: reviewDate,
                time: reviewTime,
                formattedDate,
                formattedTime,
                platform,
                avatar: profileImage
              }
            : item
        )
      );
    } else {
      const newReview = {
        id: Date.now(),
        reviewer: reviewerName,
        location,
        avatar: profileImage,
        reviewText,
        rating,
        date: reviewDate,
        time: reviewTime,
        formattedDate,
        formattedTime,
        platform,
        status: 'Published'
      };
      setReviews([newReview, ...reviews]);
    }

    handleCancel();
  };

  // Edit Action
  const handleEdit = (item) => {
    setEditingId(item.id);
    setReviewerName(item.reviewer);
    setLocation(item.location);
    setReviewText(item.reviewText);
    setRating(item.rating);
    setReviewDate(item.date);
    setReviewTime(item.time);
    setPlatform(item.platform);
    setProfileImage(item.avatar);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews((prev) => prev.filter((item) => item.id !== id));
      if (activePreviewIndex >= reviews.length - 1 && activePreviewIndex > 0) {
        setActivePreviewIndex(activePreviewIndex - 1);
      }
    }
  };

  // Filtered Reviews logic
  const filteredReviews = reviews.filter((item) => {
    const matchesTab =
      activeTab === 'All Reviews' || item.platform.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      item.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reviewText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatformFilter =
      filterPlatform === 'All' || item.platform.toLowerCase() === filterPlatform.toLowerCase();

    return matchesTab && matchesSearch && matchesPlatformFilter;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  // Live preview current item
  const previewItems = filteredReviews.length > 0 ? filteredReviews : reviews;
  const currentPreview = previewItems[activePreviewIndex % previewItems.length] || reviews[0];

  const handleNextPreview = () => {
    setActivePreviewIndex((prev) => (prev + 1) % previewItems.length);
  };

  const handlePrevPreview = () => {
    setActivePreviewIndex((prev) => (prev - 1 + previewItems.length) % previewItems.length);
  };

  // Export functionality
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reviews, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "traveler_reviews.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getPlatformIcon = (platName) => {
    switch (platName.toLowerCase()) {
      case 'tripadvisor':
        return <FaTripadvisor className="platform-icon tripadvisor" />;
      case 'facebook':
        return <FaFacebook className="platform-icon facebook" />;
      case 'google':
        return <FaGoogle className="platform-icon google" />;
      default:
        return null;
    }
  };

  return (
    <div className="Testimonial">
      {/* Top Section */}
      <div className="Testimonial-top-bar">
        <div className="Testimonial-header">
          <h1>Regards From Travelers</h1>
          <p>Manage and showcase traveler reviews.</p>
        </div>

        <button className="Testimonial-add-btn" onClick={() => handleEdit({
          id: null,
          reviewer: '',
          location: '',
          reviewText: '',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          time: '12:00',
          platform: 'All Reviews',
          avatar: 'https://via.placeholder.com/100'
        })}>
          <FaPlus /> Add New Review
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="Testimonial-tabs">
        <button
          className={`Testimonial-tab ${activeTab === 'All Reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('All Reviews')}
        >
          All Reviews
        </button>
        <button
          className={`Testimonial-tab ${activeTab === 'Tripadvisor' ? 'active' : ''}`}
          onClick={() => setActiveTab('Tripadvisor')}
        >
          <FaTripadvisor className="tab-icon tripadvisor" /> Tripadvisor
        </button>
        <button
          className={`Testimonial-tab ${activeTab === 'Facebook' ? 'active' : ''}`}
          onClick={() => setActiveTab('Facebook')}
        >
          <FaFacebook className="tab-icon facebook" /> Facebook
        </button>
        <button
          className={`Testimonial-tab ${activeTab === 'Google' ? 'active' : ''}`}
          onClick={() => setActiveTab('Google')}
        >
          <FaGoogle className="tab-icon google" /> Google
        </button>
      </div>

      {/* Grid Layout: Form and Live Preview */}
      <div className="Testimonial-grid">
        {/* Left: Add / Edit Form */}
        <div className="Testimonial-card Testimonial-form-card">
          <h2 className="Testimonial-card-title">
            {editingId ? 'Edit Review' : 'Add New Review'}
          </h2>

          <form onSubmit={handleSaveReview}>
            <div className="Testimonial-form-row">
              <div className="Testimonial-form-group">
                <label>Reviewer Name *</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Sophia Reynolds"
                  required
                />
              </div>

              <div className="Testimonial-form-group">
                <label>Location *</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="London, UK"
                  required
                />
              </div>
            </div>

            {/* Profile Image Uploader */}
            <div className="Testimonial-form-group">
              <label>Profile Image *</label>
              <div className="Testimonial-image-uploader">
                <img src={profileImage} alt="Profile" className="Testimonial-profile-preview" />
                <div className="Testimonial-image-actions">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="Testimonial-change-img-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaUpload /> Change Image
                  </button>
                  <button
                    type="button"
                    className="Testimonial-delete-img-btn"
                    onClick={() => setProfileImage('https://via.placeholder.com/100')}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
              <span className="Testimonial-helper-text">
                Recommended size: 100x100px. Max size: 2MB
              </span>
            </div>

            {/* Review Text */}
            <div className="Testimonial-form-group">
              <label>Review Text *</label>
              <textarea
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Booking our Himalayan trek..."
                required
              />
            </div>

            {/* Rating Stars */}
            <div className="Testimonial-form-group">
              <label>Rating *</label>
              <div className="Testimonial-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`star-icon ${star <= rating ? 'selected' : ''}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Date, Time & Platform */}
            <div className="Testimonial-form-row three-col">
              <div className="Testimonial-form-group">
                <label>Review Date *</label>
                <div className="Testimonial-input-with-icon">
                  <input
                    type="date"
                    value={reviewDate}
                    onChange={(e) => setReviewDate(e.target.value)}
                    required
                  />
                  <FaCalendarAlt className="field-icon" />
                </div>
              </div>

              <div className="Testimonial-form-group">
                <label>Review Time *</label>
                <div className="Testimonial-input-with-icon">
                  <input
                    type="time"
                    value={reviewTime}
                    onChange={(e) => setReviewTime(e.target.value)}
                    required
                  />
                  <FaClock className="field-icon" />
                </div>
              </div>

              <div className="Testimonial-form-group">
                <label>Platform *</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                  <option value="All Reviews">All Reviews</option>
                  <option value="Tripadvisor">Tripadvisor</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Google">Google</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="Testimonial-form-actions">
              <button type="submit" className="Testimonial-save-btn">
                <FaSave /> Save Review
              </button>
              <button type="button" className="Testimonial-cancel-btn" onClick={handleCancel}>
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Preview */}
        <div className="Testimonial-card Testimonial-preview-card">
          <h2 className="Testimonial-card-title">Live Preview</h2>

          <div className="Testimonial-preview-wrapper">
            <button className="Testimonial-slider-arrow left" onClick={handlePrevPreview}>
              <FaChevronLeft />
            </button>

            <div className="Testimonial-preview-box">
              <div className="Testimonial-preview-tabs">
                <span className={`pv-tab ${currentPreview?.platform === 'All Reviews' ? 'active' : ''}`}>
                  All Reviews
                </span>
                <span className={`pv-tab ${currentPreview?.platform === 'Tripadvisor' ? 'active' : ''}`}>
                  <FaTripadvisor className="tab-icon tripadvisor" /> Tripadvisor
                </span>
                <span className={`pv-tab ${currentPreview?.platform === 'Facebook' ? 'active' : ''}`}>
                  <FaFacebook className="tab-icon facebook" /> Facebook
                </span>
                <span className={`pv-tab ${currentPreview?.platform === 'Google' ? 'active' : ''}`}>
                  <FaGoogle className="tab-icon google" /> Google
                </span>
              </div>

              <div className="Testimonial-preview-body">
                <p className="Testimonial-quote-text">
                  “{currentPreview ? currentPreview.reviewText : reviewText}”
                </p>

                <div className="Testimonial-preview-meta">
                  <div className="Testimonial-preview-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`star-icon ${
                          star <= (currentPreview ? currentPreview.rating : rating)
                            ? 'selected'
                            : ''
                        }`}
                      />
                    ))}
                  </div>

                  <FaQuoteRight className="Testimonial-watermark-quote" />

                  <div className="Testimonial-preview-datetime">
                    <span>
                      {currentPreview
                        ? currentPreview.formattedDate || currentPreview.date
                        : reviewDate}
                    </span>
                    <small>
                      {currentPreview
                        ? currentPreview.formattedTime || currentPreview.time
                        : reviewTime}
                    </small>
                  </div>
                </div>

                <div className="Testimonial-preview-user">
                  <img
                    src={currentPreview ? currentPreview.avatar : profileImage}
                    alt="User Avatar"
                    className="Testimonial-preview-avatar"
                  />
                  <div className="Testimonial-preview-user-info">
                    <h4>{currentPreview ? currentPreview.reviewer : reviewerName || 'Sophia Reynolds'}</h4>
                    <p>{currentPreview ? currentPreview.location : location || 'London, UK'}</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="Testimonial-slider-arrow right" onClick={handleNextPreview}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="Testimonial-card Testimonial-table-card">
        <div className="Testimonial-table-header">
          <h2>All Reviews</h2>

          <div className="Testimonial-table-controls">
            <div className="Testimonial-search-box">
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>

            <div className="Testimonial-filter-dropdown">
              <FaFilter className="filter-icon" />
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
              >
                <option value="All">Filter</option>
                <option value="All Reviews">All Reviews</option>
                <option value="Tripadvisor">Tripadvisor</option>
                <option value="Facebook">Facebook</option>
                <option value="Google">Google</option>
              </select>
            </div>

            <button className="Testimonial-export-btn" onClick={handleExport}>
              <FaDownload /> Export
            </button>
          </div>
        </div>

        <div className="Testimonial-table-responsive">
          <table className="Testimonial-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Reviewer</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Platform</th>
                <th>Review Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReviews.length > 0 ? (
                paginatedReviews.map((item, index) => (
                  <tr key={item.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>
                      <div className="Testimonial-reviewer-cell">
                        <img src={item.avatar} alt={item.reviewer} className="table-avatar" />
                        <span>{item.reviewer}</span>
                      </div>
                    </td>
                    <td>{item.location}</td>
                    <td>
                      <div className="table-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`star-icon ${star <= item.rating ? 'selected' : ''}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`platform-badge ${item.platform.toLowerCase().replace(/\s+/g, '')}`}>
                        {getPlatformIcon(item.platform)}
                        {item.platform}
                      </span>
                    </td>
                    <td>
                      <div className="datetime-cell">
                        <div>{item.formattedDate || item.date}</div>
                        <small>{item.formattedTime || item.time}</small>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge published">
                        • {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="action-btn view"
                          title="View"
                          onClick={() => setViewingReview(item)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="action-btn edit"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete"
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No reviews found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="Testimonial-pagination">
          <span className="pagination-info">
            Showing {filteredReviews.length === 0 ? 0 : startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of {filteredReviews.length}{' '}
            reviews
          </span>

          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* View Review Modal */}
      {viewingReview && (
        <div className="Testimonial-modal-overlay" onClick={() => setViewingReview(null)}>
          <div className="Testimonial-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setViewingReview(null)}>
              <FaTimes />
            </button>

            <div className="modal-header">
              <img src={viewingReview.avatar} alt={viewingReview.reviewer} className="modal-avatar" />
              <div>
                <h3>{viewingReview.reviewer}</h3>
                <p>{viewingReview.location}</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar
                    key={s}
                    className={`star-icon ${s <= viewingReview.rating ? 'selected' : ''}`}
                  />
                ))}
              </div>
              <p className="modal-text">“{viewingReview.reviewText}”</p>
              <div className="modal-meta">
                <span><strong>Platform:</strong> {viewingReview.platform}</span>
                <span>
                  <strong>Date:</strong> {viewingReview.formattedDate} ({viewingReview.formattedTime})
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;