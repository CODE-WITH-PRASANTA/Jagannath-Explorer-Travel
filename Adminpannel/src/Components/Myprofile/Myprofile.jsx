
import React, { useState, useEffect } from "react";
import "./Myprofile.css";

import API, { IMG_URL } from "../../api/axios";

// =====================================================
// DEFAULT AVATAR
// =====================================================

const DEFAULT_AVATAR = "";

// =====================================================
// AVATAR URL HELPER
// =====================================================

const getAvatarUrl = (path) => {
  if (!path) return DEFAULT_AVATAR;

  // Blob preview from local file upload
  if (path.startsWith("blob:")) {
    return path;
  }

  // Already a complete external URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  // Remove duplicate slashes
  const cleanPath = path.replace(/^\/+/, "");

  // Backend image URL through existing axios config
  if (cleanPath.startsWith("uploads/")) {
    return `${IMG_URL}/${cleanPath}`;
  }

  return `${IMG_URL}/${cleanPath}`;
};

// =====================================================
// INITIAL FORM
// =====================================================

const INITIAL_FORM = {
  fullName: "",
  email: "",
  travelerType: "",
  homeLocation: "",
  bio: "",
};

// =====================================================
// COMPONENT
// =====================================================

const Myprofile = () => {
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState(INITIAL_FORM);

  const [editingId, setEditingId] = useState(null);
  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // =====================================================
  // FETCH PROFILES
  // =====================================================

  const fetchProfiles = async () => {
    try {
      setFetchLoading(true);

      const response = await API.get("/profiles");

      const result = response.data;

      if (result.success) {
        const profileData = Array.isArray(result.data)
          ? result.data
          : [];

        setProfiles(profileData);

        if (profileData.length > 0 && editingId === null) {
          handleEditRow(profileData[0]);
        }
      } else {
        console.error(
          result.message || "Failed to load profiles"
        );
      }
    } catch (error) {
      console.error(
        "Failed to load profiles:",
        error.response?.data || error.message
      );
    } finally {
      setFetchLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchProfiles();
  }, []);

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Optional 2MB validation
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB.");
      return;
    }

    // Revoke previous blob URL
    if (avatar?.startsWith("blob:")) {
      URL.revokeObjectURL(avatar);
    }

    setAvatarFile(file);
    setAvatar(URL.createObjectURL(file));
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // START NEW PROFILE
  // =====================================================

  const handleStartAddNew = () => {
    setEditingId(null);
    setAvatarFile(null);
    setAvatar(DEFAULT_AVATAR);
    setFormData(INITIAL_FORM);

    const fileInput = document.getElementById(
      "myprofile-avatar-upload"
    );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =====================================================
  // EDIT PROFILE
  // =====================================================

  const handleEditRow = (row) => {
    if (!row) return;

    setEditingId(row._id);

    setAvatar(
      row.avatar
        ? getAvatarUrl(row.avatar)
        : DEFAULT_AVATAR
    );

    setAvatarFile(null);

    setFormData({
      fullName: row.name || "",
      email: row.email || "",
      travelerType: row.travelerType || "",
      homeLocation: row.homeLocation || "",
      bio: row.bio || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE PROFILE
  // =====================================================

  const handleDeleteRow = async (id) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this profile?"
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);

      const response = await API.delete(
        `/profiles/${id}`
      );

      const result = response.data;

      if (result.success) {
        setProfiles((prev) =>
          prev.filter((profile) => profile._id !== id)
        );

        if (editingId === id) {
          handleStartAddNew();
        }

        alert("Profile deleted successfully!");
      } else {
        alert(
          result.message || "Error deleting profile."
        );
      }
    } catch (error) {
      console.error(
        "Delete error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete profile."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // SUBMIT PROFILE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      alert("Admin Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Email Address is required.");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append(
        "name",
        formData.fullName.trim()
      );

      payload.append(
        "email",
        formData.email.trim()
      );

      payload.append(
        "travelerType",
        formData.travelerType.trim()
      );

      payload.append(
        "homeLocation",
        formData.homeLocation.trim()
      );

      payload.append(
        "bio",
        formData.bio.trim()
      );

      // =================================================
      // IMAGE
      // =================================================

      if (avatarFile) {
        payload.append("avatarFile", avatarFile);
      }

      // =================================================
      // CREATE / UPDATE
      // =================================================

      let response;

      if (editingId) {
        response = await API.put(
          `/profiles/${editingId}`,
          payload
        );
      } else {
        response = await API.post(
          "/profiles",
          payload
        );
      }

      const result = response.data;

      if (result.success) {
        // ===============================================
        // UPDATE EXISTING
        // ===============================================

        if (editingId) {
          setProfiles((prev) =>
            prev.map((item) =>
              item._id === editingId
                ? result.data
                : item
            )
          );

          alert("Profile updated successfully!");
        }

        // ===============================================
        // CREATE NEW
        // ===============================================

        else {
          setProfiles((prev) => [
            result.data,
            ...prev,
          ]);

          setEditingId(result.data._id);

          alert("Profile created successfully!");
        }

        // ===============================================
        // UPDATE AVATAR
        // ===============================================

        if (result.data?.avatar) {
          setAvatar(
            getAvatarUrl(result.data.avatar)
          );
        } else {
          setAvatar(DEFAULT_AVATAR);
        }

        setAvatarFile(null);

        const fileInput = document.getElementById(
          "myprofile-avatar-upload"
        );

        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        alert(
          result.message ||
            "Profile submission failed."
        );
      }
    } catch (error) {
      console.error(
        "Submit error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Server error. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="myprofile-page-wrapper">

      {/* =================================================
          BANNER
      ================================================= */}

      <div className="myprofile-banner">
        <div className="myprofile-banner-pill-btn">

          <svg
            className="myprofile-banner-pill-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle
              cx="12"
              cy="7"
              r="4"
            />
          </svg>

          <span className="myprofile-banner-pill-text">
            Account Settings
          </span>

        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="myprofile-content-container">

        {/* =================================================
            PROFILE FORM CARD
        ================================================= */}

        <div className="myprofile-card">

          <div className="myprofile-card-header">

            {/* AVATAR */}

            <div className="myprofile-avatar-wrapper">

              {avatar ? (
                <img
                  src={getAvatarUrl(avatar)}
                  alt="Profile Avatar"
                  className="myprofile-avatar-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div className="myprofile-avatar-placeholder">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                    />
                  </svg>
                </div>
              )}

              <label
                htmlFor="myprofile-avatar-upload"
                className="myprofile-edit-badge-btn"
                title="Change Avatar"
              >
                <svg
                  className="myprofile-edit-badge-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </label>

              <input
                id="myprofile-avatar-upload"
                className="myprofile-file-input"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageUpload}
              />

            </div>

            {/* HEADING */}

            <div className="myprofile-heading-group">

              <h1 className="myprofile-title">
                Profile Settings
              </h1>

              <p className="myprofile-subtitle">
                Manage your personal details, travel
                preferences, and account information
              </p>

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="myprofile-form"
          >

            <div className="myprofile-form-grid">

              {/* ADMIN NAME */}

              <div className="myprofile-form-group">

                <label
                  htmlFor="fullName"
                  className="myprofile-label"
                >
                  Admin Name
                </label>

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

              {/* EMAIL */}

              <div className="myprofile-form-group">

                <label
                  htmlFor="email"
                  className="myprofile-label"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  className="myprofile-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                />

              </div>

              {/* TRAVEL STYLE */}

              <div className="myprofile-form-group">

                <label
                  htmlFor="travelerType"
                  className="myprofile-label"
                >
                  Travel Style / Explorer Category
                </label>

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

              {/* HOME LOCATION */}

              <div className="myprofile-form-group">

                <label
                  htmlFor="homeLocation"
                  className="myprofile-label"
                >
                  Base Location / City
                </label>

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

              {/* BIO */}

              <div className="myprofile-form-group myprofile-form-group-full">

                <label
                  htmlFor="bio"
                  className="myprofile-label"
                >
                  Traveler Bio & Exploration Highlights
                </label>

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

            {/* =================================================
                FORM BUTTONS
            ================================================= */}

            <div className="myprofile-form-action-row">

              {editingId !== null && (
                <button
                  type="button"
                  className="myprofile-cancel-btn"
                  onClick={handleStartAddNew}
                  disabled={loading}
                >
                  + New Profile
                </button>
              )}

              <button
                type="submit"
                className="myprofile-update-btn"
                disabled={loading}
              >

                <svg
                  className="myprofile-btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                  />
                </svg>

                <span>
                  {loading
                    ? "Saving..."
                    : editingId !== null
                    ? "Update Profile"
                    : "Save Profile"}
                </span>

              </button>

            </div>

          </form>

        </div>

        {/* =================================================
            PROFILE TABLE
        ================================================= */}

        <div className="myprofile-table-card">

          <div className="myprofile-table-header-row">

            <div className="myprofile-table-title-wrap">

              <svg
                className="myprofile-table-title-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                />
              </svg>

              <h2 className="myprofile-table-title-text">
                Profile Details
              </h2>

            </div>

            <button
              type="button"
              className="myprofile-add-new-btn"
              onClick={handleStartAddNew}
            >
              + Add New
            </button>

          </div>

          {/* TABLE */}

          <div className="myprofile-table-wrapper">

            <table className="myprofile-table">

              <thead className="myprofile-thead">

                <tr className="myprofile-tr">

                  <th
                    className="myprofile-th"
                    style={{ width: "60px" }}
                  >
                    S.No
                  </th>

                  <th className="myprofile-th">
                    Name
                  </th>

                  <th className="myprofile-th">
                    Email
                  </th>

                  <th className="myprofile-th">
                    Travel Style
                  </th>

                  <th className="myprofile-th">
                    Base Location
                  </th>

                  <th className="myprofile-th">
                    Status
                  </th>

                  <th className="myprofile-th myprofile-th-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="myprofile-tbody">

                {/* LOADING */}

                {fetchLoading ? (
                  <tr className="myprofile-tr">

                    <td
                      colSpan="7"
                      className="myprofile-td myprofile-empty-row"
                    >
                      Loading profiles...
                    </td>

                  </tr>
                ) : profiles.length === 0 ? (

                  /* EMPTY */

                  <tr className="myprofile-tr">

                    <td
                      colSpan="7"
                      className="myprofile-td myprofile-empty-row"
                    >
                      No profiles found. Click
                      "+ Add New" to add one.
                    </td>

                  </tr>

                ) : (

                  /* DATA */

                  profiles.map((profile, idx) => (

                    <tr
                      key={profile._id}
                      className={`myprofile-tr ${
                        editingId === profile._id
                          ? "myprofile-tr-active"
                          : ""
                      }`}
                    >

                      {/* S.NO */}

                      <td className="myprofile-td">
                        {idx + 1}
                      </td>

                      {/* NAME */}

                      <td className="myprofile-td">

                        <div className="myprofile-table-user-cell">

                          {profile.avatar ? (
                            <img
                              src={getAvatarUrl(
                                profile.avatar
                              )}
                              alt={
                                profile.name ||
                                "Profile"
                              }
                              className="myprofile-table-avatar"
                              onError={(e) => {
                                e.currentTarget.onerror =
                                  null;
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="myprofile-table-avatar-placeholder">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle
                                  cx="12"
                                  cy="7"
                                  r="4"
                                />
                              </svg>
                            </div>
                          )}

                          <span className="myprofile-table-username">
                            {profile.name || "—"}
                          </span>

                        </div>

                      </td>

                      {/* EMAIL */}

                      <td className="myprofile-td">
                        {profile.email || "—"}
                      </td>

                      {/* TRAVEL STYLE */}

                      <td className="myprofile-td">
                        {profile.travelerType || "—"}
                      </td>

                      {/* LOCATION */}

                      <td className="myprofile-td">
                        {profile.homeLocation || "—"}
                      </td>

                      {/* STATUS */}

                      <td className="myprofile-td">

                        <span
                          className={`myprofile-status-badge myprofile-status-${(
                            profile.status ||
                            "active"
                          ).toLowerCase()}`}
                        >
                          •{" "}
                          {profile.status || "Active"}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="myprofile-td">

                        <div className="myprofile-action-buttons-group">

                          {/* EDIT */}

                          <button
                            type="button"
                            className="myprofile-action-icon-btn myprofile-action-edit"
                            title="Edit"
                            onClick={() =>
                              handleEditRow(profile)
                            }
                            disabled={
                              deleteLoading ===
                              profile._id
                            }
                          >

                            <svg
                              className="myprofile-action-svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>

                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            className="myprofile-action-icon-btn myprofile-action-delete"
                            title="Delete"
                            onClick={() =>
                              handleDeleteRow(
                                profile._id
                              )
                            }
                            disabled={
                              deleteLoading ===
                              profile._id
                            }
                          >

                            {deleteLoading ===
                            profile._id ? (
                              <span>
                                ...
                              </span>
                            ) : (
                              <svg
                                className="myprofile-action-svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            )}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}

          <div className="myprofile-table-footer">

            <span className="myprofile-entries-count">
              Showing{" "}
              {profiles.length > 0 ? 1 : 0} to{" "}
              {profiles.length} of{" "}
              {profiles.length} entries
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Myprofile;
