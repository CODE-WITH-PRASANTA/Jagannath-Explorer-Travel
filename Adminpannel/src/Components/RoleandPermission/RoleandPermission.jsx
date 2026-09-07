import React, { useState } from 'react';
import './RoleandPermission.css';
import {
  FaUserShield,
  FaKey,
  FaUsers,
  FaShieldAlt,
  FaSearch,
  FaPlus,
  FaPencilAlt,
  FaTrashAlt,
  FaCrown,
  FaUserCheck,
  FaUserTie,
  FaFileAlt,
  FaHeadset,
  FaChevronDown,
  FaChevronRight,
  FaTachometerAlt,
  FaUsersCog,
  FaInfoCircle,
  FaSave,
  FaTimes,
  FaCheck
} from 'react-icons/fa';

const initialRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all modules and settings',
    users: 1,
    status: 'Active',
    icon: 'crown'
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Manage users, roles and most system settings',
    users: 3,
    status: 'Active',
    icon: 'user-check'
  },
  {
    id: 3,
    name: 'Staff',
    description: 'Access assigned modules and manage data',
    users: 12,
    status: 'Active',
    icon: 'user-tie'
  },
  {
    id: 4,
    name: 'Content Manager',
    description: 'Manage content, blog and media related data',
    users: 4,
    status: 'Active',
    icon: 'file-alt'
  },
  {
    id: 5,
    name: 'Customer Support',
    description: 'Handle customer queries and support tickets',
    users: 8,
    status: 'Active',
    icon: 'headset'
  }
];

const initialModules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    expanded: true,
    permissions: [
      { id: 'view_dashboard', name: 'View Dashboard', view: true, add: false, edit: false, delete: false }
    ]
  },
  {
    id: 'user_management',
    name: 'User Management',
    icon: 'users',
    expanded: true,
    permissions: [
      { id: 'view_users', name: 'View Users', view: true, add: false, edit: false, delete: false },
      { id: 'add_users', name: 'Add Users', view: false, add: true, edit: false, delete: false },
      { id: 'edit_users', name: 'Edit Users', view: false, add: false, edit: true, delete: false },
      { id: 'delete_users', name: 'Delete Users', view: false, add: false, edit: false, delete: true }
    ]
  },
  {
    id: 'role_permissions',
    name: 'Role & Permissions',
    icon: 'shield',
    expanded: true,
    permissions: [
      { id: 'view_roles', name: 'View Roles', view: true, add: false, edit: false, delete: false },
      { id: 'add_roles', name: 'Add Roles', view: false, add: true, edit: false, delete: false },
      { id: 'edit_roles', name: 'Edit Roles', view: false, add: false, edit: true, delete: false },
      { id: 'delete_roles', name: 'Delete Roles', view: false, add: false, edit: false, delete: true }
    ]
  }
];

const RoleandPermission = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Super Admin');
  const [modules, setModules] = useState(initialModules);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [roleStatus, setRoleStatus] = useState('Active');

  // Search Filter
  const filteredRoles = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Role Icon Helper
  const renderRoleIcon = (iconType) => {
    switch (iconType) {
      case 'crown':
        return <FaCrown className="role-icon-symbol crown" />;
      case 'user-check':
        return <FaUserCheck className="role-icon-symbol admin" />;
      case 'user-tie':
        return <FaUserTie className="role-icon-symbol staff" />;
      case 'file-alt':
        return <FaFileAlt className="role-icon-symbol content" />;
      case 'headset':
        return <FaHeadset className="role-icon-symbol support" />;
      default:
        return <FaUserShield className="role-icon-symbol default" />;
    }
  };

  // Module Icon Helper
  const renderModuleIcon = (iconType) => {
    switch (iconType) {
      case 'dashboard':
        return <FaTachometerAlt className="module-icon" />;
      case 'users':
        return <FaUsersCog className="module-icon" />;
      case 'shield':
        return <FaUserShield className="module-icon" />;
      default:
        return <FaUserShield className="module-icon" />;
    }
  };

  // Toggle Module Expand/Collapse
  const toggleModuleExpand = (moduleId) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId ? { ...m, expanded: !m.expanded } : m
      )
    );
  };

  // Checkbox Handlers
  const handleSingleCheckboxChange = (moduleId, permId, type) => {
    setModules(
      modules.map((m) => {
        if (m.id === moduleId) {
          return {
            ...m,
            permissions: m.permissions.map((p) =>
              p.id === permId ? { ...p, [type]: !p[type] } : p
            )
          };
        }
        return m;
      })
    );
  };

  // Parent Module Level Header Checkbox Toggle
  const handleModuleHeaderCheckboxChange = (moduleId, type) => {
    setModules(
      modules.map((m) => {
        if (m.id === moduleId) {
          const allChecked = m.permissions.every((p) => p[type]);
          return {
            ...m,
            permissions: m.permissions.map((p) => ({ ...p, [type]: !allChecked }))
          };
        }
        return m;
      })
    );
  };

  // Check if all permissions in a module are checked for a type
  const isModuleHeaderChecked = (moduleObj, type) => {
    return moduleObj.permissions.every((p) => p[type]);
  };

  // Modal Actions
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setRoleName('');
    setRoleDescription('');
    setRoleStatus('Active');
    setShowModal(true);
  };

  const handleOpenEditModal = (role) => {
    setIsEditing(true);
    setCurrentRoleId(role.id);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setRoleStatus(role.status);
    setShowModal(true);
  };

  const handleDeleteRole = (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter((r) => r.id !== id));
    }
  };

  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!roleName.trim()) return;

    if (isEditing) {
      setRoles(
        roles.map((r) =>
          r.id === currentRoleId
            ? { ...r, name: roleName, description: roleDescription, status: roleStatus }
            : r
        )
      );
    } else {
      const newRole = {
        id: Date.now(),
        name: roleName,
        description: roleDescription,
        users: 0,
        status: roleStatus,
        icon: 'user-shield'
      };
      setRoles([...roles, newRole]);
    }
    setShowModal(false);
  };

  // Save Permissions Action
  const handleSavePermissions = () => {
    alert(`Permissions saved successfully for ${selectedRole}!`);
  };

  return (
    <div className="RoleandPermission">
      {/* Top Header Banner */}
      <div className="RoleandPermission-header-banner">
        <div className="RoleandPermission-title-area">
          <h1>Role & Permissions</h1>
          <p>Manage user roles and configure access permissions</p>
        </div>

        <div className="RoleandPermission-banner-illustration">
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

      <div className="RoleandPermission-content">
        {/* Stat Cards Row */}
        <div className="RoleandPermission-stats-grid">
          <div className="RoleandPermission-stat-card">
            <div className="stat-icon-box blue">
              <FaUserShield />
            </div>
            <div className="stat-info">
              <h2>{roles.length}</h2>
              <p>Total Roles</p>
            </div>
          </div>

          <div className="RoleandPermission-stat-card">
            <div className="stat-icon-box green">
              <FaKey />
            </div>
            <div className="stat-info">
              <h2>78</h2>
              <p>Total Permissions</p>
            </div>
          </div>

          <div className="RoleandPermission-stat-card">
            <div className="stat-icon-box purple">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h2>32</h2>
              <p>Role Assignments</p>
            </div>
          </div>

          <div className="RoleandPermission-stat-card">
            <div className="stat-icon-box orange">
              <FaShieldAlt />
            </div>
            <div className="stat-info">
              <h2>100%</h2>
              <p>System Secured</p>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="RoleandPermission-main-grid">
          {/* Left Column: Roles Table Card */}
          <div className="RoleandPermission-card">
            <div className="RoleandPermission-card-top">
              <div>
                <h2>Roles</h2>
                <p>Create and manage user roles</p>
              </div>

              <div className="RoleandPermission-card-controls">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button
                  className="add-role-btn"
                  onClick={handleOpenAddModal}
                >
                  <FaPlus /> Add New Role
                </button>
              </div>
            </div>

            <div className="RoleandPermission-table-wrapper">
              <table className="RoleandPermission-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Role Name</th>
                    <th>Description</th>
                    <th className="center">Users</th>
                    <th className="center">Status</th>
                    <th className="center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoles.map((role, idx) => (
                    <tr
                      key={role.id}
                      className={selectedRole === role.name ? 'selected-row' : ''}
                      onClick={() => setSelectedRole(role.name)}
                    >
                      <td>{idx + 1}</td>
                      <td>
                        <div className="role-cell">
                          <div className={`role-badge-icon ${role.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {renderRoleIcon(role.icon)}
                          </div>
                          <span className="role-name-text">{role.name}</span>
                        </div>
                      </td>
                      <td className="desc-text">{role.description}</td>
                      <td className="center count-text">{role.users}</td>
                      <td className="center">
                        <span className={`status-pill ${role.status.toLowerCase()}`}>
                          {role.status}
                        </span>
                      </td>
                      <td className="center" onClick={(e) => e.stopPropagation()}>
                        <div className="action-btns">
                          <button
                            className="act-btn edit"
                            onClick={() => handleOpenEditModal(role)}
                            title="Edit Role"
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            className="act-btn delete"
                            onClick={() => handleDeleteRole(role.id)}
                            title="Delete Role"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="RoleandPermission-card-footer">
              <span>Showing 1 to {filteredRoles.length} of {roles.length} roles</span>
            </div>
          </div>

          {/* Right Column: Permissions Matrix Card */}
          <div className="RoleandPermission-card">
            <div className="RoleandPermission-card-top align-center">
              <div>
                <h2>Permissions</h2>
                <p>Configure permissions for selected role</p>
              </div>

              <div className="role-dropdown-wrapper">
                <div className="role-dropdown-badge">
                  {renderRoleIcon(
                    roles.find((r) => r.name === selectedRole)?.icon || 'crown'
                  )}
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="RoleandPermission-matrix-wrapper">
              <table className="RoleandPermission-matrix-table">
                <thead>
                  <tr>
                    <th className="left-align">Module / Permission</th>
                    <th className="center">View</th>
                    <th className="center">Add</th>
                    <th className="center">Edit</th>
                    <th className="center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((mod) => (
                    <React.Fragment key={mod.id}>
                      {/* Parent Module Row */}
                      <tr className="module-group-row">
                        <td className="left-align">
                          <div className="module-title-cell">
                            <button
                              type="button"
                              className="expand-btn"
                              onClick={() => toggleModuleExpand(mod.id)}
                            >
                              {mod.expanded ? <FaChevronDown /> : <FaChevronRight />}
                            </button>
                            {renderModuleIcon(mod.icon)}
                            <span className="module-name-text">{mod.name}</span>
                          </div>
                        </td>
                        <td className="center">
                          <input
                            type="checkbox"
                            checked={isModuleHeaderChecked(mod, 'view')}
                            onChange={() => handleModuleHeaderCheckboxChange(mod.id, 'view')}
                          />
                        </td>
                        <td className="center">
                          <input
                            type="checkbox"
                            checked={isModuleHeaderChecked(mod, 'add')}
                            onChange={() => handleModuleHeaderCheckboxChange(mod.id, 'add')}
                          />
                        </td>
                        <td className="center">
                          <input
                            type="checkbox"
                            checked={isModuleHeaderChecked(mod, 'edit')}
                            onChange={() => handleModuleHeaderCheckboxChange(mod.id, 'edit')}
                          />
                        </td>
                        <td className="center">
                          <input
                            type="checkbox"
                            checked={isModuleHeaderChecked(mod, 'delete')}
                            onChange={() => handleModuleHeaderCheckboxChange(mod.id, 'delete')}
                          />
                        </td>
                      </tr>

                      {/* Sub Permissions Rows */}
                      {mod.expanded &&
                        mod.permissions.map((perm) => (
                          <tr key={perm.id} className="permission-sub-row">
                            <td className="left-align indent">
                              <span className="sub-perm-text">{perm.name}</span>
                            </td>
                            <td className="center">
                              <input
                                type="checkbox"
                                checked={perm.view}
                                onChange={() => handleSingleCheckboxChange(mod.id, perm.id, 'view')}
                              />
                            </td>
                            <td className="center">
                              <input
                                type="checkbox"
                                checked={perm.add}
                                onChange={() => handleSingleCheckboxChange(mod.id, perm.id, 'add')}
                              />
                            </td>
                            <td className="center">
                              <input
                                type="checkbox"
                                checked={perm.edit}
                                onChange={() => handleSingleCheckboxChange(mod.id, perm.id, 'edit')}
                              />
                            </td>
                            <td className="center">
                              <input
                                type="checkbox"
                                checked={perm.delete}
                                onChange={() => handleSingleCheckboxChange(mod.id, perm.id, 'delete')}
                              />
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="RoleandPermission-matrix-footer">
              <div className="info-notice">
                <FaInfoCircle className="info-icon" />
                <span>Changes to permissions will be applied immediately.</span>
              </div>

              <button
                className="save-changes-btn"
                onClick={handleSavePermissions}
              >
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Role Modal Popup */}
      {showModal && (
        <div className="RoleandPermission-modal-overlay">
          <div className="RoleandPermission-modal">
            <div className="modal-header">
              <h2>{isEditing ? 'Edit Role' : 'Add New Role'}</h2>
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveRole}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Role Name <span className="req">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Finance Manager"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows="3"
                    placeholder="Brief description of responsibilities..."
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={roleStatus}
                    onChange={(e) => setRoleStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <FaCheck /> {isEditing ? 'Update Role' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleandPermission;