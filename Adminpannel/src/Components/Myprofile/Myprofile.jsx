import React, { useState } from 'react';
import './Myprofile.css';

const Myprofile = () => {
  // Travel avatar default image
  const [avatar, setAvatar] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );

  const [formData, setFormData] = useState({
    fullName: 'Explorer Admin',
    email: 'traveler@wanderlust.com',
    travelerType: 'Backpacker & Photographer',
    homeLocation: 'Cuttack, India',
    bio: 'Passionate about exploring serene trails, coastal drives, and capturing aesthetic moments.',
  });

  // Handle avatar upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page-wrapper">
      {/* Top Blue Banner Header */}
      <div className="profile-banner">
        <div className="banner-pill-btn">
          <svg className="icon-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Account Settings</span>
        </div>
      </div>

      {/* Main Profile Content Area */}
      <div className="profile-content-container">
        {/* Overlapping Avatar Section */}
        <div className="avatar-wrapper">
          <img src={avatar} alt="Profile Avatar" className="avatar-img" />
          <label htmlFor="avatar-upload" className="edit-badge-btn" title="Change Avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>

        {/* Section Heading */}
        <div className="profile-heading-group">
          <h1 className="profile-title">Profile Settings</h1>
          <p className="profile-subtitle">
            Manage your personal details, travel preferences, and account information
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-grid">
            {/* Admin/User Name */}
            <div className="form-group">
              <label htmlFor="fullName">Admin Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@pureflow.com"
              />
            </div>

            {/* Travel-specific Fields */}
            <div className="form-group">
              <label htmlFor="travelerType">Travel Style / Explorer Category</label>
              <input
                id="travelerType"
                type="text"
                name="travelerType"
                value={formData.travelerType}
                onChange={handleInputChange}
                placeholder="e.g. Solo Backpacker, Roadtripper"
              />
            </div>

            <div className="form-group">
              <label htmlFor="homeLocation">Base Location / City</label>
              <input
                id="homeLocation"
                type="text"
                name="homeLocation"
                value={formData.homeLocation}
                onChange={handleInputChange}
                placeholder="City, Country"
              />
            </div>

            {/* Bio Field (Spans full row) */}
            <div className="form-group full-width">
              <label htmlFor="bio">Traveler Bio & Exploration Highlights</label>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Write a brief intro about your journeys..."
              />
            </div>
          </div>

          <hr className="divider-line" />

          {/* Action Button */}
          <div className="form-action-row">
            <button type="submit" className="update-profile-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Myprofile;