import React, { useState, useEffect } from 'react';
import './Myprofile.css';

const BACKEND_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = `${BACKEND_BASE_URL}/api/profiles`;

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

// Helper to resolve backend relative paths, blob previews, and external URLs
const getAvatarUrl = (path) => {
  if (!path) return DEFAULT_AVATAR;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return path;
  }
  return `${BACKEND_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

const INITIAL_FORM = {
  fullName: '',
  email: '',
  travelerType: '',
  homeLocation: '',
  bio: '',
};

const Myprofile = () => {
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all profiles on mount
  const fetchProfiles = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const result = await res.json();
      if (result.success) {
        setProfiles(result.data);
        if (result.data.length > 0 && editingId === null) {
          handleEditRow(result.data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load profiles:', err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartAddNew = () => {
    setEditingId(null);
    setAvatar(DEFAULT_AVATAR);
    setAvatarFile(null);
    setFormData(INITIAL_FORM);
  };

  const handleEditRow = (row) => {
    setEditingId(row._id);
    setAvatar(row.avatar || DEFAULT_AVATAR);
    setAvatarFile(null);
    setFormData({
      fullName: row.name,
      email: row.email,
      travelerType: row.travelerType || '',
      homeLocation: row.homeLocation || '',
      bio: row.bio || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteRow = async (id) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setProfiles((prev) => prev.filter((p) => p._id !== id));
        if (editingId === id) {
          handleStartAddNew();
        }
      } else {
        alert(data.message || 'Error deleting profile');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert('Name and Email are required.');
      return;
    }

    setLoading(true);

    const payload = new FormData();
    payload.append('name', formData.fullName);
    payload.append('email', formData.email);
    payload.append('travelerType', formData.travelerType);
    payload.append('homeLocation', formData.homeLocation);
    payload.append('bio', formData.bio);

    if (avatarFile) {
      payload.append('avatarFile', avatarFile);
    } else {
      payload.append('avatar', avatar);
    }

    try {
      const url = editingId ? `${API_BASE_URL}/${editingId}` : API_BASE_URL;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: payload,
      });

      const result = await res.json();

      if (result.success) {
        if (editingId) {
          setProfiles((prev) =>
            prev.map((item) => (item._id === editingId ? result.data : item))
          );
          alert('Profile updated successfully!');
        } else {
          setProfiles((prev) => [result.data, ...prev]);
          setEditingId(result.data._id);
          alert('Profile created successfully!');
        }
        setAvatar(result.data.avatar);
        setAvatarFile(null);
      } else {
        alert(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Server error. Please verify backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="myprofile-page-wrapper">
      <div className="myprofile-banner">
        <div className="myprofile-banner-pill-btn">
          <svg className="myprofile-banner-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="myprofile-banner-pill-text">Account Settings</span>
        </div>
      </div>

      <div className="myprofile-content-container">
        <div className="myprofile-card">
          <div className="myprofile-card-header">
            <div className="myprofile-avatar-wrapper">
              {/* FIXED: Applied getAvatarUrl */}
              <img
                src={getAvatarUrl(avatar)}
                alt="Profile Avatar"
                className="myprofile-avatar-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
              <label htmlFor="myprofile-avatar-upload" className="myprofile-edit-badge-btn" title="Change Avatar">
                <svg className="myprofile-edit-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </label>
              <input
                id="myprofile-avatar-upload"
                className="myprofile-file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="myprofile-heading-group">
              <h1 className="myprofile-title">Profile Settings</h1>
              <p className="myprofile-subtitle">
                Manage your personal details, travel preferences, and account information
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="myprofile-form">
            <div className="myprofile-form-grid">
              <div className="myprofile-form-group">
                <label htmlFor="fullName" className="myprofile-label">Admin Name</label>
                <input
                  id="fullName"
                  className="myprofile-input"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="myprofile-form-group">
                <label htmlFor="email" className="myprofile-label">Email Address</label>
                <input
                  id="email"
                  className="myprofile-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@pureflow.com"
                />
              </div>

              <div className="myprofile-form-group">
                <label htmlFor="travelerType" className="myprofile-label">Travel Style / Explorer Category</label>
                <input
                  id="travelerType"
                  className="myprofile-input"
                  type="text"
                  name="travelerType"
                  value={formData.travelerType}
                  onChange={handleInputChange}
                  placeholder="e.g. Solo Backpacker, Roadtripper"
                />
              </div>

              <div className="myprofile-form-group">
                <label htmlFor="homeLocation" className="myprofile-label">Base Location / City</label>
                <input
                  id="homeLocation"
                  className="myprofile-input"
                  type="text"
                  name="homeLocation"
                  value={formData.homeLocation}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                />
              </div>

              <div className="myprofile-form-group myprofile-form-group-full">
                <label htmlFor="bio" className="myprofile-label">Traveler Bio & Exploration Highlights</label>
                <textarea
                  id="bio"
                  className="myprofile-textarea"
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Write a brief intro about your journeys..."
                />
              </div>
            </div>

            <div className="myprofile-form-action-row">
              {editingId !== null && (
                <button type="button" className="myprofile-cancel-btn" onClick={handleStartAddNew}>
                  + New Profile
                </button>
              )}
              <button type="submit" className="myprofile-update-btn" disabled={loading}>
                <svg className="myprofile-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{loading ? 'Saving...' : editingId !== null ? 'Update Profile' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="myprofile-table-card">
          <div className="myprofile-table-header-row">
            <div className="myprofile-table-title-wrap">
              <svg className="myprofile-table-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <h2 className="myprofile-table-title-text">Profile Details</h2>
            </div>
            <button type="button" className="myprofile-add-new-btn" onClick={handleStartAddNew}>
              + Add New
            </button>
          </div>

          <div className="myprofile-table-wrapper">
            <table className="myprofile-table">
              <thead className="myprofile-thead">
                <tr className="myprofile-tr">
                  <th className="myprofile-th" style={{ width: '60px' }}>S.No</th>
                  <th className="myprofile-th">Name</th>
                  <th className="myprofile-th">Email</th>
                  <th className="myprofile-th">Travel Style</th>
                  <th className="myprofile-th">Base Location</th>
                  <th className="myprofile-th">Status</th>
                  <th className="myprofile-th myprofile-th-center">Actions</th>
                </tr>
              </thead>
              <tbody className="myprofile-tbody">
                {profiles.length === 0 ? (
                  <tr className="myprofile-tr">
                    <td colSpan="7" className="myprofile-td myprofile-empty-row">
                      No profiles found. Click "+ Add New" to add one.
                    </td>
                  </tr>
                ) : (
                  profiles.map((profile, idx) => (
                    <tr
                      key={profile._id}
                      className={`myprofile-tr ${editingId === profile._id ? 'myprofile-tr-active' : ''}`}
                    >
                      <td className="myprofile-td">{idx + 1}</td>
                      <td className="myprofile-td">
                        <div className="myprofile-table-user-cell">
                          {/* FIXED: Applied getAvatarUrl */}
                          <img
                            src={getAvatarUrl(profile.avatar)}
                            alt={profile.name}
                            className="myprofile-table-avatar"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_AVATAR;
                            }}
                          />
                          <span className="myprofile-table-username">{profile.name}</span>
                        </div>
                      </td>
                      <td className="myprofile-td">{profile.email}</td>
                      <td className="myprofile-td">{profile.travelerType || '—'}</td>
                      <td className="myprofile-td">{profile.homeLocation || '—'}</td>
                      <td className="myprofile-td">
                        <span className={`myprofile-status-badge myprofile-status-${(profile.status || 'active').toLowerCase()}`}>
                          • {profile.status || 'Active'}
                        </span>
                      </td>
                      <td className="myprofile-td">
                        <div className="myprofile-action-buttons-group">
                          <button
                            type="button"
                            className="myprofile-action-icon-btn myprofile-action-edit"
                            title="Edit"
                            onClick={() => handleEditRow(profile)}
                          >
                            <svg className="myprofile-action-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="myprofile-action-icon-btn myprofile-action-delete"
                            title="Delete"
                            onClick={() => handleDeleteRow(profile._id)}
                          >
                            <svg className="myprofile-action-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="myprofile-table-footer">
            <span className="myprofile-entries-count">
              Showing 1 to {profiles.length} of {profiles.length} entries
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;