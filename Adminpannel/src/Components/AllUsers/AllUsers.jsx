import React, { useState, useEffect, useRef } from 'react';
import './AllUsers.css';
import {
  FaUser,
  FaUserPlus,
  FaUserTie,
  FaUsers,
  FaClock,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPencilAlt,
  FaTrashAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCloudUploadAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlusCircle,
  FaQuoteLeft,
  FaTimes
} from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Staff');
  const [status, setStatus] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef(null);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Format Display Date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Search & Filter Logic
  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = u.name?.toLowerCase().includes(term);
    const emailMatch = u.email?.toLowerCase().includes(term);
    const titleMatch = u.title?.toLowerCase().includes(term);
    const roleMatch = roleFilter === 'All' || u.role === roleFilter;
    return (nameMatch || emailMatch || titleMatch) && roleMatch;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Stats Calculations
  const totalUsersCount = users.length;
  const adminsCount = users.filter(
    (u) => u.role === 'Admin' || u.role === 'Super Admin'
  ).length;
  const staffCount = users.filter((u) => u.role === 'Staff').length;
  const inactiveCount = users.filter((u) => u.status === 'Inactive').length;

  // File Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFullName('');
    setTitle('');
    setEmail('');
    setPassword('');
    setRole('Staff');
    setStatus(true);
    setSelectedFile(null);
    setPreviewPic(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Form Submit (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', fullName);
    formData.append('title', title || 'Team Member');
    formData.append('email', email);
    formData.append('role', role);
    formData.append('status', status ? 'Active' : 'Inactive');
    if (password) formData.append('password', password);
    if (selectedFile) formData.append('avatar', selectedFile);

    try {
      const url = isEditing
        ? `${API_BASE_URL}/api/users/${editingId}`
        : `${API_BASE_URL}/api/users`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Operation failed');
        return;
      }

      if (isEditing) {
        setUsers(users.map((u) => (u._id === editingId ? data.user : u)));
      } else {
        setUsers([data.user, ...users]);
      }

      resetForm();
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('An error occurred while saving.');
    }
  };

  // Populate Form for Edit
  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingId(user._id);
    setFullName(user.name);
    setTitle(user.title || '');
    setEmail(user.email);
    setPassword('******');
    setRole(user.role);
    setStatus(user.status === 'Active');
    setFileName('');
    setSelectedFile(null);
    setPreviewPic(
      user.avatar
        ? user.avatar.startsWith('http')
          ? user.avatar
          : `${API_BASE_URL}${user.avatar}`
        : null
    );
  };

  // Delete User
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (data.success) {
        setUsers(users.filter((u) => u._id !== id));
        if (editingId === id) resetForm();
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Export CSV Action
  const handleExport = () => {
    const headers = ['ID,Name,Title,Email,Role,Status,Joined On\n'];
    const rows = filteredUsers.map(
      (u, idx) =>
        `${idx + 1},"${u.name}","${u.title || ''}",${u.email},${u.role},${u.status},"${formatDate(u.joinedOn || u.createdAt)}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Users_List_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="AllUsers">
      {/* Top Banner Header */}
      <div className="AllUsers-header-banner">
        <div className="AllUsers-title-area">
          <h1>User Management</h1>
          <p>Manage admin and staff users, their roles and permissions</p>
        </div>

        <div className="AllUsers-banner-illustration">
          <div className="travel-text-wrapper">
            <span className="travel-script-line1">Great People</span>
            <span className="travel-script-line2">Make Great Journeys</span>
          </div>
          <svg className="airplane-path-svg" viewBox="0 0 120 60" fill="none">
            <path
              d="M 10 45 Q 60 10 100 20"
              stroke="#1e3a8a"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <path d="M 98 16 L 110 22 L 98 26 Z" fill="#1e3a8a" />
          </svg>
        </div>
      </div>

      <div className="AllUsers-content">
        {/* Stat Cards */}
        <div className="AllUsers-stats-grid">
          <div className="AllUsers-stat-card">
            <div className="stat-icon-box blue">
              <FaUser />
            </div>
            <div className="stat-info">
              <h2>{totalUsersCount}</h2>
              <p>Total Users</p>
            </div>
          </div>

          <div className="AllUsers-stat-card">
            <div className="stat-icon-box green">
              <FaUserTie />
            </div>
            <div className="stat-info">
              <h2>{adminsCount}</h2>
              <p>Admins</p>
            </div>
          </div>

          <div className="AllUsers-stat-card">
            <div className="stat-icon-box purple">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h2>{staffCount}</h2>
              <p>Staff Members</p>
            </div>
          </div>

          <div className="AllUsers-stat-card">
            <div className="stat-icon-box orange">
              <FaClock />
            </div>
            <div className="stat-info">
              <h2>{inactiveCount}</h2>
              <p>Inactive Users</p>
            </div>
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="AllUsers-main-layout">
          {/* Left Column: Users Table */}
          <div className="AllUsers-table-container">
            <div className="AllUsers-table-header">
              <div>
                <h2>All Users</h2>
                <p>View and manage all users</p>
              </div>

              <div className="AllUsers-controls">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <div className="filter-dropdown-wrapper">
                  <button
                    type="button"
                    className="control-btn"
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  >
                    <FaFilter /> {roleFilter === 'All' ? 'Filter' : roleFilter}
                  </button>

                  {showFilterDropdown && (
                    <div className="filter-menu">
                      {['All', 'Super Admin', 'Admin', 'Staff'].map((r) => (
                        <div
                          key={r}
                          className={`filter-item ${roleFilter === r ? 'active' : ''}`}
                          onClick={() => {
                            setRoleFilter(r);
                            setShowFilterDropdown(false);
                            setCurrentPage(1);
                          }}
                        >
                          {r === 'All' ? 'All Roles' : r}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="button" className="control-btn" onClick={handleExport}>
                  <FaDownload /> Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="AllUsers-table-wrapper">
              <table className="AllUsers-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="no-data">
                        Loading users...
                      </td>
                    </tr>
                  ) : currentUsers.length > 0 ? (
                    currentUsers.map((user, idx) => {
                      const avatarSrc = user.avatar
                        ? user.avatar.startsWith('http')
                          ? user.avatar
                          : `${API_BASE_URL}${user.avatar}`
                        : 'https://i.pravatar.cc/150?img=33';

                      return (
                        <tr key={user._id}>
                          <td>{indexOfFirstUser + idx + 1}</td>
                          <td>
                            <div className="user-profile-cell">
                              <img
                                src={avatarSrc}
                                alt={user.name}
                                className="user-avatar"
                                onError={(e) => {
                                  e.target.src = 'https://i.pravatar.cc/150?img=33';
                                }}
                              />
                              <div>
                                <div className="user-name">{user.name}</div>
                                <div className="user-title">{user.title || 'Member'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="email-text">{user.email}</td>
                          <td>
                            <span
                              className={`role-badge ${user.role
                                .toLowerCase()
                                .replace(' ', '-')}`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`status-badge ${user.status.toLowerCase()}`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="date-text">
                            {formatDate(user.joinedOn || user.createdAt)}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                type="button"
                                className="action-btn edit"
                                onClick={() => handleEdit(user)}
                                title="Edit User"
                              >
                                <FaPencilAlt />
                              </button>
                              <button
                                type="button"
                                className="action-btn delete"
                                onClick={() => handleDelete(user._id)}
                                title="Delete User"
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
                      <td colSpan="7" className="no-data">
                        No users found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="AllUsers-table-footer">
              <span className="showing-text">
                Showing{' '}
                {filteredUsers.length === 0 ? 0 : indexOfFirstUser + 1} to{' '}
                {Math.min(indexOfLastUser, filteredUsers.length)} of{' '}
                {filteredUsers.length} users
              </span>

              <div className="pagination">
                <button
                  type="button"
                  className="page-nav-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <FaChevronLeft />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      type="button"
                      key={pageNum}
                      className={`page-num-btn ${
                        currentPage === pageNum ? 'active' : ''
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                )}

                <button
                  type="button"
                  className="page-nav-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Add / Edit User Form Card */}
          <div className="AllUsers-form-card">
            <div className="AllUsers-form-header">
              <div className="form-icon-box">
                <FaUserPlus />
              </div>
              <div style={{ flex: 1 }}>
                <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
                <p>
                  {isEditing
                    ? 'Update user role and details'
                    : 'Create a new admin or staff user'}
                </p>
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                  title="Cancel Edit"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="AllUsers-form-group">
                <label>
                  Full Name <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="AllUsers-form-group">
                <label>Job Title / Designation</label>
                <div className="input-with-icon">
                  <FaUserTie className="input-icon" />
                  <input
                    type="text"
                    placeholder="e.g. Tour Manager"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="AllUsers-form-group">
                <label>
                  Email Address <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="AllUsers-form-group">
                <label>
                  Password {isEditing ? '(leave blank to keep current)' : <span className="req">*</span>}
                </label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isEditing ? 'Leave blank or enter new' : 'Enter password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!isEditing}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="AllUsers-form-group">
                <label>
                  Role <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <FaUserTie className="input-icon" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>

              <div className="AllUsers-toggle-group">
                <span className="toggle-label">
                  Status <span className="req">*</span>
                </span>
                <div className="toggle-control">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="status-text">
                    {status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="AllUsers-form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <div
                  className="upload-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaCloudUploadAlt className="upload-icon" />
                  {previewPic ? (
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src={previewPic}
                        alt="Preview"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          marginBottom: '6px'
                        }}
                      />
                      <p className="upload-text file-selected">
                        {fileName || 'Current Avatar'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="upload-text">
                        <span>Click to upload</span> or drag and drop
                      </p>
                      <p className="upload-subtext">PNG, JPG (Converts to WebP)</p>
                    </>
                  )}
                </div>
              </div>

              <button type="submit" className="submit-user-btn">
                <FaPlusCircle /> {isEditing ? 'Update User' : 'Create User'}
              </button>
            </form>

            <div className="AllUsers-quote-box">
              <FaQuoteLeft className="quote-icon" />
              <p>A great team creates greater travel experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;