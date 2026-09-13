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
  FiXCircle,
} from "react-icons/fi";

import "./OurGuide.css";
import API, { IMG_URL } from "../../api/axios";

const OurGuide = () => {
  // Form input states
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Media handling
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const previewBlobRef = useRef(null);

  // Status & entity management
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Revoke object URL on cleanup
  const cleanupPreviewBlob = () => {
    if (previewBlobRef.current) {
      URL.revokeObjectURL(previewBlobRef.current);
      previewBlobRef.current = null;
    }
  };

  useEffect(() => {
    fetchTeamMembers();
    return () => cleanupPreviewBlob();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setFetchLoading(true);
      const response = await API.get("/team");
      if (response.data?.success) {
        setTeamMembers(response.data.data || []);
      } else {
        setTeamMembers(Array.isArray(response.data?.data) ? response.data.data : []);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      showToast(error.response?.data?.message || "Failed to load team members");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    cleanupPreviewBlob();
    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    previewBlobRef.current = previewUrl;
    setProfileImage(previewUrl);
  };

  const handleReset = () => {
    cleanupPreviewBlob();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("Please enter name");
      return;
    }

    if (!designation.trim()) {
      showToast("Please enter designation");
      return;
    }

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

      if (editingId) {
        const response = await API.put(`/team/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data?.success) {
          showToast("Team member updated successfully!");
          await fetchTeamMembers();
          handleReset();
        } else {
          showToast(response.data?.message || "Failed to update team member");
        }
      } else {
        const response = await API.post("/team", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data?.success) {
          showToast("New team member added successfully!");
          await fetchTeamMembers();
          handleReset();
        } else {
          showToast(response.data?.message || "Failed to add team member");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      showToast(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    cleanupPreviewBlob();
    setEditingId(member._id);
    setName(member.name || "");
    setDesignation(member.designation || "");
    setInstagram(member.instagram || "");
    setFacebook(member.facebook || "");
    setWhatsapp(member.whatsapp || "");

    if (member.image) {
      const fullImageUrl = member.image.startsWith("http")
        ? member.image
        : `${IMG_URL || "http://localhost:5000"}${member.image.startsWith("/") ? "" : "/"}${member.image}`;
      setProfileImage(fullImageUrl);
    } else {
      setProfileImage(null);
    }

    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!id) {
      showToast("Invalid team member ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this team member?")) return;

    try {
      const response = await API.delete(`/team/${id}`);
      if (response.data?.success) {
        showToast("Team member removed successfully");
        await fetchTeamMembers();
        if (editingId === id) handleReset();
      } else {
        showToast(response.data?.message || "Failed to delete team member");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast(error.response?.data?.message || "Failed to delete team member");
    }
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;
    const baseUrl = IMG_URL || "http://localhost:5000";
    return image.startsWith("/") ? `${baseUrl}${image}` : `${baseUrl}/${image}`;
  };

  return (
    <main className="our-guide-container">
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="our-guide-toast" role="status" aria-live="polite">
          <FiCheckCircle className="our-guide-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Entry Form Card */}
      <section className="our-guide-form-card">
        <header className="our-guide-form-header">
          <div className="our-guide-header-title-wrap">
            <span className="our-guide-header-icon">
              {editingId ? <FiEdit2 /> : <FiUserPlus />}
            </span>
            <div className="our-guide-header-titles">
              <h2>{editingId ? "Edit Team Member" : "Add Team Member"}</h2>
              <p className="our-guide-header-subtitle">
                {editingId
                  ? "Update professional background and contact endpoints."
                  : "Register a team member into the active system records."}
              </p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="our-guide-form-body">
          <div className="our-guide-form-grid">
            {/* Left Col: Core Identifiers & Socials */}
            <div className="our-guide-inputs-col">
              <div className="our-guide-row-2">
                <div className="our-guide-field">
                  <label className="our-guide-label">
                    Full Name <span className="our-guide-required">*</span>
                  </label>
                  <div className="our-guide-input-wrap">
                    <FiUser className="our-guide-input-prefix" />
                    <input
                      type="text"
                      className="our-guide-control"
                      placeholder="e.g. Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="our-guide-field">
                  <label className="our-guide-label">
                    Designation <span className="our-guide-required">*</span>
                  </label>
                  <div className="our-guide-input-wrap">
                    <FiBriefcase className="our-guide-input-prefix" />
                    <input
                      type="text"
                      className="our-guide-control"
                      placeholder="e.g. Senior Lead Architect"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Social Channels Subsection */}
              <div className="our-guide-social-section">
                <span className="our-guide-label social-heading">Social Media Links & Direct Line</span>
                <div className="our-guide-social-grid">
                  <div className="our-guide-field">
                    <span className="our-guide-social-sublabel">
                      <FiInstagram className="ig-color" /> Instagram Profile URL
                    </span>
                    <input
                      type="url"
                      className="our-guide-control"
                      placeholder="https://instagram.com/username"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </div>

                  <div className="our-guide-field">
                    <span className="our-guide-social-sublabel">
                      <FiFacebook className="fb-color" /> Facebook Profile URL
                    </span>
                    <input
                      type="url"
                      className="our-guide-control"
                      placeholder="https://facebook.com/username"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                    />
                  </div>

                  <div className="our-guide-field">
                    <span className="our-guide-social-sublabel">
                      <FiMessageCircle className="wa-color" /> WhatsApp Contact
                    </span>
                    <input
                      type="text"
                      className="our-guide-control"
                      placeholder="+91 98765 43210"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Media Upload & Dropzone */}
            <div className="our-guide-upload-col">
              <label className="our-guide-label">
                Profile Avatar <span className="our-guide-required">*</span>
              </label>
              <div
                className="our-guide-upload-box"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click();
                  }
                }}
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
                    <span className="our-guide-preview-text">Click to choose a different photo</span>
                  </div>
                ) : (
                  <div className="our-guide-upload-placeholder">
                    <FiUploadCloud className="our-guide-upload-icon" />
                    <span className="our-guide-upload-title">Choose or drop an image</span>
                    <span className="our-guide-upload-subtitle">
                      JPG, PNG, WebP — Up to 5MB
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Control Buttons */}
          <div className="our-guide-form-actions">
            <button
              type="button"
              className="our-guide-btn-cancel"
              onClick={handleReset}
              disabled={loading}
            >
              <FiXCircle /> Cancel
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
                : "Save Member"}
            </button>
          </div>
        </form>
      </section>

      {/* Directory Table Card */}
      <section className="our-guide-table-card">
        <header className="our-guide-table-header-row">
          <div className="our-guide-table-title-wrap">
            <FiUsers className="our-guide-table-main-icon" />
            <h3>Team Directory</h3>
          </div>
          <div className="our-guide-member-count-badge">
            Active Members: <span>{teamMembers.length}</span>
          </div>
        </header>

        <div className="our-guide-table-responsive">
          <table className="our-guide-table">
            <thead>
              <tr>
                <th className="col-index">#</th>
                <th className="col-avatar">Avatar</th>
                <th>Full Name</th>
                <th>Designation</th>
                <th>Instagram</th>
                <th>Facebook</th>
                <th>WhatsApp</th>
                <th className="text-center col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    Loading directory records...
                  </td>
                </tr>
              ) : teamMembers.length > 0 ? (
                teamMembers.map((member, index) => {
                  const avatarUrl = getImageUrl(member.image);
                  return (
                    <tr key={member._id || index}>
                      <td className="col-index text-muted" data-label="Index">
                        {index + 1}
                      </td>

                      <td className="col-avatar" data-label="Avatar">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={member.name || "Member avatar"}
                            className="our-guide-avatar"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="our-guide-avatar-placeholder">
                            <FiUser />
                          </div>
                        )}
                      </td>

                      <td className="fw-bold" data-label="Full Name">
                        {member.name || "—"}
                      </td>

                      <td data-label="Designation">
                        <span className="our-guide-designation-badge">
                          {member.designation || "—"}
                        </span>
                      </td>

                      <td data-label="Instagram">
                        {member.instagram ? (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="our-guide-social-cell"
                          >
                            <FiInstagram className="ig-color" />
                            <span>Instagram</span>
                          </a>
                        ) : (
                          <span className="our-guide-empty-social">—</span>
                        )}
                      </td>

                      <td data-label="Facebook">
                        {member.facebook ? (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="our-guide-social-cell"
                          >
                            <FiFacebook className="fb-color" />
                            <span>Facebook</span>
                          </a>
                        ) : (
                          <span className="our-guide-empty-social">—</span>
                        )}
                      </td>

                      <td data-label="WhatsApp">
                        {member.whatsapp ? (
                          <a
                            href={`https://wa.me/${String(member.whatsapp).replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="our-guide-social-cell"
                          >
                            <FiMessageCircle className="wa-color" />
                            <span>{member.whatsapp}</span>
                          </a>
                        ) : (
                          <span className="our-guide-empty-social">—</span>
                        )}
                      </td>

                      <td className="col-actions" data-label="Actions">
                        <div className="our-guide-actions-cell">
                          <button
                            type="button"
                            className="our-guide-action-btn edit"
                            onClick={() => handleEdit(member)}
                            title="Edit"
                            aria-label={`Edit ${member.name}`}
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            type="button"
                            className="our-guide-action-btn delete"
                            onClick={() => handleDelete(member._id)}
                            title="Delete"
                            aria-label={`Delete ${member.name}`}
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    <div className="our-guide-empty-state">
                      <FiUsers className="empty-icon" />
                      <p>No team members found.</p>
                      <span>Add a team member using the form above.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default OurGuide;