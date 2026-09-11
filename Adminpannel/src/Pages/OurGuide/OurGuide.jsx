import React, { useState, useRef, useEffect } from "react";
import {
  FiUserPlus,
  FiUser,
  FiBriefcase,
  FiUploadCloud,
  FiInstagram,
  FiFacebook,
  FiMessageCircle,
  FiCheckCircle,
  FiEdit2,
  FiTrash2,
  FiSend,
  FiUsers,
} from "react-icons/fi";

import "./OurGuide.css";
import API, { IMG_URL } from "../../api/axios";

const OurGuide = () => {
  // =========================================================
  // FORM STATES
  // =========================================================
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Image preview + actual file
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // =========================================================
  // EDITING
  // =========================================================
  const [editingId, setEditingId] = useState(null);

  // =========================================================
  // LOADING / TOAST
  // =========================================================
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // =========================================================
  // TEAM MEMBERS
  // =========================================================
  const [teamMembers, setTeamMembers] = useState([]);

  // =========================================================
  // TOAST
  // =========================================================
  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // =========================================================
  // FETCH TEAM MEMBERS
  // GET: /api/team
  // =========================================================
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setFetchLoading(true);

      const response = await API.get("/team");

      console.log("Team API response:", response.data);

      if (response.data?.success) {
        setTeamMembers(response.data.data || []);
      } else {
        setTeamMembers(
          Array.isArray(response.data?.data) ? response.data.data : []
        );
      }
    } catch (error) {
      console.error("Error fetching team members:", error);

      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
      console.error("URL:", error.config?.url);

      showToast(
        error.response?.data?.message ||
          "Failed to load team members"
      );
    } finally {
      setFetchLoading(false);
    }
  };

  // =========================================================
  // IMAGE CHANGE
  // =========================================================
  const handleImageChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const file = e.target.files[0];

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5MB");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
  };

  // =========================================================
  // RESET FORM
  // =========================================================
  const handleReset = () => {
    setName("");
    setDesignation("");
    setInstagram("");
    setFacebook("");
    setWhatsapp("");

    setProfileImage(null);
    setSelectedFile(null);
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // SUBMIT FORM
  //
  // ADD:
  // POST /api/team
  //
  // UPDATE:
  // PUT /api/team/:id
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      showToast("Please enter name");
      return;
    }

    if (!designation.trim()) {
      showToast("Please enter designation");
      return;
    }

    // Image required only when creating
    if (!editingId && !selectedFile) {
      showToast("Please select a profile image");
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("designation", designation.trim());
    formData.append("instagram", instagram.trim());
    formData.append("facebook", facebook.trim());
    formData.append("whatsapp", whatsapp.trim());

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      setLoading(true);

      let response;

      // =====================================================
      // UPDATE
      // =====================================================
      if (editingId) {
        response = await API.put(
          `/team/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Update response:", response.data);

        if (response.data?.success) {
          showToast("Team member updated successfully!");

          await fetchTeamMembers();

          handleReset();
        } else {
          showToast(
            response.data?.message ||
              "Failed to update team member"
          );
        }
      }

      // =====================================================
      // CREATE
      // =====================================================
      else {
        response = await API.post(
          "/team",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Create response:", response.data);

        if (response.data?.success) {
          showToast("New team member added successfully!");

          await fetchTeamMembers();

          handleReset();
        } else {
          showToast(
            response.data?.message ||
              "Failed to add team member"
          );
        }
      }
    } catch (error) {
      console.error("Submission error:", error);

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Response:",
        error.response?.data
      );

      console.error(
        "Request URL:",
        error.config?.url
      );

      showToast(
        error.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT MEMBER
  // =========================================================
  const handleEdit = (member) => {
    setEditingId(member._id);

    setName(member.name || "");
    setDesignation(member.designation || "");

    setInstagram(member.instagram || "");
    setFacebook(member.facebook || "");
    setWhatsapp(member.whatsapp || "");

    // Image URL
    if (member.image) {
      const fullImageUrl = member.image.startsWith("http")
        ? member.image
        : `${IMG_URL || "http://localhost:5000"}${member.image}`;

      setProfileImage(fullImageUrl);
    } else {
      setProfileImage(null);
    }

    // Existing image should not be uploaded again
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE MEMBER
  // DELETE /api/team/:id
  // =========================================================
  const handleDelete = async (id) => {
    if (!id) {
      showToast("Invalid team member ID");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await API.delete(
        `/team/${id}`
      );

      console.log("Delete response:", response.data);

      if (response.data?.success) {
        showToast("Team member removed successfully");

        await fetchTeamMembers();

        if (editingId === id) {
          handleReset();
        }
      } else {
        showToast(
          response.data?.message ||
            "Failed to delete team member"
        );
      }
    } catch (error) {
      console.error("Delete error:", error);

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Response:",
        error.response?.data
      );

      showToast(
        error.response?.data?.message ||
          "Failed to delete team member"
      );
    }
  };

  // =========================================================
  // IMAGE URL HELPER
  // =========================================================
  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (image.startsWith("http")) {
      return image;
    }

    const baseUrl =
      IMG_URL || "http://localhost:5000";

    // Avoid double slash
    if (image.startsWith("/")) {
      return `${baseUrl}${image}`;
    }

    return `${baseUrl}/${image}`;
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="our-guide-container">

      {/* =====================================================
          TOAST
      ====================================================== */}
      {toastMessage && (
        <div className="our-guide-toast">
          <FiCheckCircle className="our-guide-toast-icon" />

          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================
          ADD / EDIT FORM
      ====================================================== */}
      <div className="our-guide-form-card">

        {/* FORM HEADER */}
        <div className="our-guide-form-header">

          <div className="our-guide-header-title-wrap">

            <span className="our-guide-header-icon">
              {editingId ? (
                <FiEdit2 />
              ) : (
                <FiUserPlus />
              )}
            </span>

            <h2>
              {editingId
                ? "Edit Team Member"
                : "Add Team Member"}
            </h2>
          </div>

          <p className="our-guide-header-subtitle">
            Fill in the details to{" "}
            {editingId
              ? "update the"
              : "add a new"}{" "}
            team member
          </p>
        </div>

        {/* ===================================================
            FORM BODY
        ==================================================== */}
        <form
          onSubmit={handleSubmit}
          className="our-guide-form-body"
        >

          <div className="our-guide-form-grid">

            {/* =================================================
                LEFT INPUT SECTION
            ================================================== */}
            <div className="our-guide-inputs-col">

              {/* NAME + DESIGNATION */}
              <div className="our-guide-row-2">

                {/* NAME */}
                <div className="our-guide-field">

                  <label className="our-guide-label">
                    Name{" "}
                    <span className="our-guide-required">
                      *
                    </span>
                  </label>

                  <div className="our-guide-input-wrap">

                    <FiUser className="our-guide-input-prefix" />

                    <input
                      type="text"
                      className="our-guide-control"
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* DESIGNATION */}
                <div className="our-guide-field">

                  <label className="our-guide-label">
                    Designation{" "}
                    <span className="our-guide-required">
                      *
                    </span>
                  </label>

                  <div className="our-guide-input-wrap">

                    <FiBriefcase className="our-guide-input-prefix" />

                    <input
                      type="text"
                      className="our-guide-control"
                      placeholder="Enter designation"
                      value={designation}
                      onChange={(e) =>
                        setDesignation(
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* =================================================
                  SOCIAL MEDIA
              ================================================== */}
              <div className="our-guide-social-section">

                <label className="our-guide-label social-heading">
                  Social Media Links & Contact
                </label>

                <div className="our-guide-social-grid">

                  {/* INSTAGRAM */}
                  <div className="our-guide-field">

                    <span className="our-guide-social-sublabel">
                      <FiInstagram className="ig-color" />

                      Instagram Link
                    </span>

                    <input
                      type="url"
                      className="our-guide-control"
                      placeholder="https://instagram.com/username"
                      value={instagram}
                      onChange={(e) =>
                        setInstagram(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* FACEBOOK */}
                  <div className="our-guide-field">

                    <span className="our-guide-social-sublabel">
                      <FiFacebook className="fb-color" />

                      Facebook Link
                    </span>

                    <input
                      type="url"
                      className="our-guide-control"
                      placeholder="https://facebook.com/username"
                      value={facebook}
                      onChange={(e) =>
                        setFacebook(
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* WHATSAPP */}
                  <div className="our-guide-field">

                    <span className="our-guide-social-sublabel">
                      <FiMessageCircle className="wa-color" />

                      WhatsApp Number
                    </span>

                    <input
                      type="text"
                      className="our-guide-control"
                      placeholder="+91 98765 43210"
                      value={whatsapp}
                      onChange={(e) =>
                        setWhatsapp(
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* =================================================
                IMAGE UPLOAD
            ================================================== */}
            <div className="our-guide-upload-col">

              <label className="our-guide-label">
                Profile Image{" "}
                <span className="our-guide-required">
                  *
                </span>
              </label>

              <div
                className="our-guide-upload-box"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="our-guide-file-input"
                  onChange={handleImageChange}
                />

                {profileImage ? (
                  <div className="our-guide-preview-box">

                    <img
                      src={profileImage}
                      alt="Profile Preview"
                      className="our-guide-preview-img"
                    />

                    <span className="our-guide-preview-text">
                      Click to change
                    </span>
                  </div>
                ) : (
                  <div className="our-guide-upload-placeholder">

                    <FiUploadCloud className="our-guide-upload-icon" />

                    <span className="our-guide-upload-title">
                      Click to upload image
                    </span>

                    <span className="our-guide-upload-subtitle">
                      or drag and drop
                      <br />
                      JPG, PNG - Max 5MB
                    </span>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              FORM BUTTONS
          ================================================== */}
          <div className="our-guide-form-actions">

            <button
              type="button"
              className="our-guide-btn-cancel"
              onClick={handleReset}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="our-guide-btn-submit"
              disabled={loading}
            >

              <FiSend />

              {loading
                ? "Processing..."
                : editingId
                ? "Update Member"
                : "Submit"}
            </button>
          </div>

        </form>
      </div>

      {/* =====================================================
          TEAM MEMBERS TABLE
      ====================================================== */}
      <div className="our-guide-table-card">

        {/* TABLE HEADER */}
        <div className="our-guide-table-header-row">

          <div className="our-guide-table-title-wrap">

            <FiUsers className="our-guide-table-main-icon" />

            <h3>
              Team Members List
            </h3>
          </div>

          <div className="our-guide-member-count-badge">
            Total Members:{" "}
            <span>{teamMembers.length}</span>
          </div>
        </div>

        {/* ===================================================
            TABLE
        ==================================================== */}
        <div className="our-guide-table-responsive">

          <table className="our-guide-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Instagram</th>
                <th>Facebook</th>
                <th>WhatsApp</th>
                <th className="text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {/* LOADING */}
              {fetchLoading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-4"
                  >
                    Loading team members...
                  </td>
                </tr>
              ) : teamMembers.length > 0 ? (

                teamMembers.map(
                  (member, index) => {

                    const avatarUrl =
                      getImageUrl(
                        member.image
                      );

                    return (
                      <tr
                        key={
                          member._id ||
                          index
                        }
                      >

                        {/* NUMBER */}
                        <td className="fw-semibold text-muted">
                          {index + 1}
                        </td>

                        {/* IMAGE */}
                        <td>

                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt={
                                member.name ||
                                "Team member"
                              }
                              className="our-guide-avatar"
                              onError={(e) => {
                                e.target.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="our-guide-avatar-placeholder">
                              <FiUser />
                            </div>
                          )}
                        </td>

                        {/* NAME */}
                        <td className="fw-bold text-dark">
                          {member.name || "-"}
                        </td>

                        {/* DESIGNATION */}
                        <td>

                          <span className="our-guide-designation-badge">
                            {member.designation ||
                              "-"}
                          </span>
                        </td>

                        {/* INSTAGRAM */}
                        <td>

                          {member.instagram ? (
                            <a
                              href={
                                member.instagram
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="our-guide-social-cell"
                            >
                              <FiInstagram className="ig-color" />

                              <span>
                                Instagram
                              </span>
                            </a>
                          ) : (
                            <span className="our-guide-empty-social">
                              —
                            </span>
                          )}
                        </td>

                        {/* FACEBOOK */}
                        <td>

                          {member.facebook ? (
                            <a
                              href={
                                member.facebook
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="our-guide-social-cell"
                            >
                              <FiFacebook className="fb-color" />

                              <span>
                                Facebook
                              </span>
                            </a>
                          ) : (
                            <span className="our-guide-empty-social">
                              —
                            </span>
                          )}
                        </td>

                        {/* WHATSAPP */}
                        <td>

                          {member.whatsapp ? (
                            <a
                              href={`https://wa.me/${String(
                                member.whatsapp
                              ).replace(
                                /\D/g,
                                ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="our-guide-social-cell"
                            >
                              <FiMessageCircle className="wa-color" />

                              <span>
                                {member.whatsapp}
                              </span>
                            </a>
                          ) : (
                            <span className="our-guide-empty-social">
                              —
                            </span>
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td>

                          <div className="our-guide-actions-cell">

                            {/* EDIT */}
                            <button
                              type="button"
                              className="our-guide-action-btn edit"
                              onClick={() =>
                                handleEdit(
                                  member
                                )
                              }
                              title="Edit"
                            >
                              <FiEdit2
                                size={14}
                              />
                            </button>

                            {/* DELETE */}
                            <button
                              type="button"
                              className="our-guide-action-btn delete"
                              onClick={() =>
                                handleDelete(
                                  member._id
                                )
                              }
                              title="Delete"
                            >
                              <FiTrash2
                                size={14}
                              />
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                /* NO DATA */
                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-4 text-muted"
                  >
                    <div className="our-guide-empty-state">

                      <FiUsers />

                      <p>
                        No team members found.
                      </p>

                      <span>
                        Add a team member using
                        the form above.
                      </span>

                    </div>
                  </td>

                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OurGuide;