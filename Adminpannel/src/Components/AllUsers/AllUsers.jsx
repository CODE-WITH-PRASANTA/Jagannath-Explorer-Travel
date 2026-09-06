import React, { useState, useRef } from 'react';
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
  FaQuoteLeft
} from 'react-icons/fa';

const initialUsers = [
  {
    id: 1,
    name: 'Admin User',
    title: 'Super Admin',
    email: 'admin@jagannathtours.com',
    role: 'Super Admin',
    status: 'Active',
    joinedOn: '12 Jan 2024',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: 2,
    name: 'Priya Sahu',
    title: 'Content Manager',
    email: 'priya@jagannathtours.com',
    role: 'Admin',
    status: 'Active',
    joinedOn: '20 Jan 2024',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 3,
    name: 'Rakesh Das',
    title: 'Booking Manager',
    email: 'rakesh@jagannathtours.com',
    role: 'Staff',
    status: 'Active',
    joinedOn: '05 Feb 2024',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 4,
    name: 'Anita Patra',
    title: 'Customer Support',
    email: 'anita@jagannathtours.com',
    role: 'Staff',
    status: 'Active',
    joinedOn: '18 Feb 2024',
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    id: 5,
    name: 'Suresh Behera',
    title: 'Operations',
    email: 'suresh@jagannathtours.com',
    role: 'Staff',
    status: 'Inactive',
    joinedOn: '02 Mar 2024',
    avatar: 'https://i.pravatar.cc/150?img=13'
  },
  {
    id: 6,
    name: 'Neha Mohanty',
    title: 'Marketing',
    email: 'neha@jagannathtours.com',
    role: 'Staff',
    status: 'Active',
    joinedOn: '15 Mar 2024',
    avatar: 'https://i.pravatar.cc/150?img=20'
  },
  {
    id: 7,
    name: 'Amit Kumar',
    title: 'Tour Executive',
    email: 'amit@jagannathtours.com',
    role: 'Staff',
    status: 'Active',
    joinedOn: '28 Mar 2024',
    avatar: 'https://i.pravatar.cc/150?img=15'
  },
  {
    id: 8,
    name: 'Sneha Raut',
    title: 'Enquiry Manager',
    email: 'sneha@jagannathtours.com',
    role: 'Staff',
    status: 'Inactive',
    joinedOn: '10 Apr 2024',
    avatar: 'https://i.pravatar.cc/150?img=23'
  },
  {
    id: 9,
    name: 'Manish Swain',
    title: 'Accounts Exec',
    email: 'manish@jagannathtours.com',
    role: 'Staff',
    status: 'Active',
    joinedOn: '15 Apr 2024',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    id: 10,
    name: 'Subhashree Nayak',
    title: 'Travel Advisor',
    email: 'subha@jagannathtours.com',
    role: 'Staff',
    status: 'Active',
    joinedOn: '02 May 2024',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: 11,
    name: 'Deepak Mishra',
    title: 'Logistics Lead',
    email: 'deepak@jagannathtours.com',
    role: 'Admin',
    status: 'Active',
    joinedOn: '12 May 2024',
    avatar: 'https://i.pravatar.cc/150?img=60'
  },
  {
    id: 12,
    name: 'Pooja Jena',
    title: 'Client Specialist',
    email: 'pooja@jagannathtours.com',
    role: 'Staff',
    status: 'Inactive',
    joinedOn: '01 Jun 2024',
    avatar: 'https://i.pravatar.cc/150?img=25'
  }
];

const AllUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Staff');
  const [status, setStatus] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef(null);

  // Search & Filter Logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Pagination Logic
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
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form Submit (Create / Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(
        users.map((u) =>
          u.id === editingId
            ? {
                ...u,
                name: fullName,
                email: email,
                role: role,
                status: status ? 'Active' : 'Inactive',
                avatar: profilePic || u.avatar
              }
            : u
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newUser = {
        id: Date.now(),
        name: fullName,
        title: 'New Member',
        email: email,
        role: role,
        status: status ? 'Active' : 'Inactive',
        joinedOn: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        avatar: profilePic || 'https://i.pravatar.cc/150?img=33'
      };
      setUsers([newUser, ...users]);
    }

    // Reset Form
    setFullName('');
    setEmail('');
    setPassword('');
    setRole('Staff');
    setStatus(true);
    setProfilePic(null);
    setFileName('');
  };

  // Edit Action
  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingId(user.id);
    setFullName(user.name);
    setEmail(user.email);
    setPassword('******');
    setRole(user.role);
    setStatus(user.status === 'Active');
    setProfilePic(user.avatar);
  };

  // Delete Action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Export CSV Action
  const handleExport = () => {
    const headers = ['ID,Name,Title,Email,Role,Status,Joined On\n'];
    const rows = filteredUsers.map(
      (u) =>
        `${u.id},"${u.name}","${u.title}",${u.email},${u.role},${u.status},"${u.joinedOn}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Users_List.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="AllUsers">
      {/* Top Banner Header matching background */}
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
          {/* Left Column: Users Table & Controls */}
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
                    className="control-btn"
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  >
                    <FaFilter /> Filter
                  </button>

                  {showFilterDropdown && (
                    <div className="filter-menu">
                      <div
                        className={`filter-item ${roleFilter === 'All' ? 'active' : ''}`}
                        onClick={() => {
                          setRoleFilter('All');
                          setShowFilterDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        All Roles
                      </div>
                      <div
                        className={`filter-item ${roleFilter === 'Super Admin' ? 'active' : ''}`}
                        onClick={() => {
                          setRoleFilter('Super Admin');
                          setShowFilterDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        Super Admin
                      </div>
                      <div
                        className={`filter-item ${roleFilter === 'Admin' ? 'active' : ''}`}
                        onClick={() => {
                          setRoleFilter('Admin');
                          setShowFilterDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        Admin
                      </div>
                      <div
                        className={`filter-item ${roleFilter === 'Staff' ? 'active' : ''}`}
                        onClick={() => {
                          setRoleFilter('Staff');
                          setShowFilterDropdown(false);
                          setCurrentPage(1);
                        }}
                      >
                        Staff
                      </div>
                    </div>
                  )}
                </div>

                <button className="control-btn" onClick={handleExport}>
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
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, idx) => (
                      <tr key={user.id}>
                        <td>{indexOfFirstUser + idx + 1}</td>
                        <td>
                          <div className="user-profile-cell">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="user-avatar"
                            />
                            <div>
                              <div className="user-name">{user.name}</div>
                              <div className="user-title">{user.title}</div>
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
                        <td className="date-text">{user.joinedOn}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn edit"
                              onClick={() => handleEdit(user)}
                              title="Edit User"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => handleDelete(user.id)}
                              title="Delete User"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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

            {/* Table Pagination Footer */}
            <div className="AllUsers-table-footer">
              <span className="showing-text">
                Showing{' '}
                {filteredUsers.length === 0 ? 0 : indexOfFirstUser + 1} to{' '}
                {Math.min(indexOfLastUser, filteredUsers.length)} of{' '}
                {filteredUsers.length} users
              </span>

              <div className="pagination">
                <button
                  className="page-nav-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <FaChevronLeft />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
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
              <div>
                <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
                <p>
                  {isEditing
                    ? 'Update user role and details'
                    : 'Create a new admin or staff user'}
                </p>
              </div>
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
                  Password <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                    <option value="Select role" disabled>
                      Select role
                    </option>
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
                  {fileName ? (
                    <p className="upload-text file-selected">{fileName}</p>
                  ) : (
                    <>
                      <p className="upload-text">
                        <span>Click to upload</span> or drag and drop
                      </p>
                      <p className="upload-subtext">PNG, JPG (Max 2MB)</p>
                    </>
                  )}
                </div>
              </div>

              <button type="submit" className="submit-user-btn">
                <FaPlusCircle /> {isEditing ? 'Update User' : 'Create User'}
              </button>
            </form>

            {/* Travel Quote Section */}
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