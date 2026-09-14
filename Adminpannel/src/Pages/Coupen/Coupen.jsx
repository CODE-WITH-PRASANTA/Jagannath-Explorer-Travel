import React, { useState, useEffect } from "react";
import "./Coupen.css";

import API, { IMG_URL } from "../../api/axios";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80";

const INITIAL_FORM = {
  title: "",
  subtitle: "",
  discount: "",
  bgColor: "#22c55e",
  buttonText: "",
  image: null,
  status: "Active",
};

const Coupen = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [previewImage, setPreviewImage] = useState(DEFAULT_IMAGE);
  const [banners, setBanners] = useState([]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // =========================================================
  // IMAGE URL HELPER
  // =========================================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return DEFAULT_IMAGE;
    }

    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://") ||
      imagePath.startsWith("blob:")
    ) {
      return imagePath;
    }

    const baseUrl = IMG_URL || "http://localhost:5000";
    const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
    const cleanImagePath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;

    return `${cleanBaseUrl}${cleanImagePath}`;
  };

  // =========================================================
  // FETCH ALL BANNERS
  // =========================================================

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await API.get("/coupen");

      if (response.data?.success) {
        const bannerData = response.data.data || [];
        setBanners(bannerData);
      } else {
        setBanners([]);
        setErrorMessage(
          response.data?.message || "Failed to load banners."
        );
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to load existing banners."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // =========================================================
  // IMAGE CHANGE
  // =========================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setErrorMessage("");
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = (e) => {
    if (e) {
      e.preventDefault();
    }

    setFormData(INITIAL_FORM);
    setPreviewImage(DEFAULT_IMAGE);
    setEditingId(null);
    setErrorMessage("");

    const fileInput = document.querySelector(
      ".coupen-file-hidden"
    );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setErrorMessage("Please enter a banner title.");
      return;
    }

    if (!editingId && !formData.image) {
      setErrorMessage("Please select a banner image.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append(
        "subtitle",
        formData.subtitle?.trim() || ""
      );
      data.append(
        "discount",
        formData.discount?.trim() || ""
      );
      data.append(
        "bgColor",
        formData.bgColor || "#22c55e"
      );
      data.append(
        "buttonText",
        formData.buttonText?.trim() || "Book Now"
      );
      data.append(
        "status",
        formData.status || "Active"
      );

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      if (editingId) {
        const response = await API.put(
          `/coupen/${editingId}`,
          data
        );

        if (response.data?.success) {
          setSuccessMessage("Banner updated successfully!");
          await fetchBanners();
          handleReset();
        } else {
          setErrorMessage(
            response.data?.message || "Failed to update banner."
          );
        }
      } else {
        const response = await API.post(
          "/coupen",
          data
        );

        if (response.data?.success) {
          setSuccessMessage("New banner created successfully!");
          await fetchBanners();
          handleReset();
        } else {
          setErrorMessage(
            response.data?.message || "Failed to create banner."
          );
        }
      }
    } catch (error) {
      console.error("Submit banner error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Operation failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (banner) => {
    const id = banner._id || banner.id;

    setEditingId(id);

    setFormData({
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      discount: banner.discount || "",
      bgColor: banner.bgColor || "#22c55e",
      buttonText: banner.buttonText || "",
      status: banner.status || "Active",
      image: null,
    });

    setPreviewImage(getImageUrl(banner.image));
    setErrorMessage("");
    setSuccessMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this banner?"
      )
    ) {
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      await API.delete(`/coupen/${id}`);

      setSuccessMessage("Banner deleted successfully!");

      setBanners((prev) =>
        prev.filter(
          (banner) =>
            (banner._id || banner.id) !== id
        )
      );

      if (editingId === id) {
        handleReset();
      }
    } catch (error) {
      console.error("Delete banner error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete banner."
      );
    }
  };

  // =========================================================
  // ADD BANNER
  // =========================================================

  const handleAddBanner = () => {
    handleReset();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SUCCESS MESSAGE TIMER
  // =========================================================

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="coupen-dashboard-wrap">
      <div className="coupen-main-container">
        {successMessage && (
          <div className="coupen-success-alert">
            ✓ {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="coupen-error-alert">
            ⚠ {errorMessage}
          </div>
        )}

        {/* TOP SECTION */}
        <div className="coupen-top-section-grid">
          {/* FORM CARD */}
          <div className="coupen-box coupen-form-box">
            <div className="coupen-box-header">
              <h2 className="coupen-heading-title">
                {editingId ? "Edit Banner" : "Add New Banner"}
              </h2>
              <span className="coupen-status-pill">
                ✦ Dynamic Creator
              </span>
            </div>

            <form
              className="coupen-form-layout"
              onSubmit={handleSubmit}
            >
              <div className="coupen-grid-2col">
                <div className="coupen-form-group">
                  <label className="coupen-form-label">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="coupen-text-input"
                    placeholder="Enter banner title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="coupen-form-group">
                  <label className="coupen-form-label">
                    Background Color / Theme
                  </label>
                  <div className="coupen-color-picker-flex">
                    <input
                      type="color"
                      name="bgColor"
                      className="coupen-native-color"
                      value={formData.bgColor}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="bgColor"
                      className="coupen-text-input coupen-color-code"
                      value={formData.bgColor}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="coupen-grid-2col">
                <div className="coupen-form-group">
                  <label className="coupen-form-label">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    className="coupen-text-input"
                    placeholder="Enter short description"
                    value={formData.subtitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="coupen-form-group">
                  <label className="coupen-form-label">
                    Button Text
                  </label>
                  <input
                    type="text"
                    name="buttonText"
                    className="coupen-text-input"
                    placeholder="e.g. Book Now"
                    value={formData.buttonText}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="coupen-grid-2col">
                <div className="coupen-form-group">
                  <label className="coupen-form-label">
                    Discount / Offer
                  </label>
                  <input
                    type="text"
                    name="discount"
                    className="coupen-text-input"
                    placeholder="e.g. 20% Off"
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </div>

                <div className="coupen-form-group">
                  <label className="coupen-form-label">
                    Status
                  </label>
                  <select
                    name="status"
                    className="coupen-text-input"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="coupen-form-group">
                <label className="coupen-form-label">
                  Banner Image {!editingId && " *"}
                </label>
                <div className="coupen-file-picker-box">
                  <label className="coupen-upload-trigger">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      className="coupen-file-hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="coupen-file-display-name">
                    {formData.image
                      ? formData.image.name
                      : editingId
                      ? "Choose new image to replace existing image"
                      : "No file chosen"}
                  </span>
                </div>
              </div>

              <div className="coupen-form-button-row">
                <button
                  type="submit"
                  className="coupen-action-button coupen-btn-blue"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Banner"
                    : "Add Banner"}
                </button>

                <button
                  type="button"
                  className="coupen-action-button coupen-btn-light"
                  onClick={handleReset}
                  disabled={submitting}
                >
                  Reset
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="coupen-action-button coupen-btn-light"
                    onClick={handleAddBanner}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* LIVE PREVIEW */}
          <div className="coupen-box coupen-preview-box">
            <h2 className="coupen-heading-title">
              Banner Preview
            </h2>
            <div className="coupen-preview-canvas">
              <div className="coupen-preview-bg-image">
                <img
                  src={previewImage}
                  alt="Live Banner Preview"
                  className="coupen-preview-graphic"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />
              </div>

              <div
                className="coupen-preview-theme-overlay"
                style={{
                  backgroundColor:
                    formData.bgColor || "#22c55e",
                }}
              >
                <div className="coupen-preview-info">
                  <span className="coupen-preview-subtitle-text">
                    {formData.subtitle ||
                      "Discover Great Deal"}
                  </span>
                  <h3 className="coupen-preview-offer-text">
                    {formData.discount || "20% Off"}
                  </h3>
                </div>

                <div className="coupen-preview-cta-pill">
                  <span className="coupen-preview-cta-label">
                    {formData.buttonText ||
                      formData.title ||
                      "Savings worldwide"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EXISTING BANNERS - LIST TABLE */}
        <div className="coupen-bottom-section-wrap">
          <div className="coupen-bottom-title-bar">
            <h2 className="coupen-heading-title">
              Existing Banners
            </h2>
            <button
              type="button"
              className="coupen-action-button coupen-btn-blue coupen-top-add-trigger"
              onClick={handleAddBanner}
            >
              + Add Banner
            </button>
          </div>

          {loading ? (
            <div className="coupen-empty-state-box">
              <p className="coupen-empty-msg">
                Loading banners from server...
              </p>
            </div>
          ) : banners.length === 0 ? (
            <div className="coupen-empty-state-box">
              <p className="coupen-empty-msg">
                No banners available in database. Use the form above to create one!
              </p>
            </div>
          ) : (
            <div className="coupen-table-responsive-wrapper" style={{ overflowX: "auto", background: "#fff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginTop: "16px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569" }}>
                    <th style={{ padding: "14px 16px", fontWeight: "600" }}>#</th>
                    <th style={{ padding: "14px 16px", fontWeight: "600" }}>Image</th>
                    <th style={{ padding: "14px 16px", fontWeight: "600" }}>Title & Subtitle</th>
                    <th style={{ padding: "14px 16px", fontWeight: "600" }}>Offer</th>
                    <th style={{ padding: "14px 16px", fontWeight: "600" }}>Theme</th>
                    <th style={{ padding: "14px 16px", fontWeight: "600" }}>Status</th>
                    <th style={{ padding: "14px 16px", fontWeight: "600", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner, index) => {
                    const imageUrl = getImageUrl(banner.image);

                    return (
                      <tr key={banner._id || banner.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" }}>
                        <td style={{ padding: "12px 16px", color: "#64748b", fontWeight: "500" }}>
                          #{index + 1}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <img
                            src={imageUrl}
                            alt={banner.title || "Banner"}
                            style={{ width: "50px", height: "40px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e2e8f0" }}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_IMAGE;
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ fontWeight: "600", color: "#1e293b" }}>{banner.title}</div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>{banner.subtitle || "No subtitle"}</div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "500", color: "#334155" }}>
                            {banner.discount || "Special Offer"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                backgroundColor: banner.bgColor || "#22c55e",
                                border: "1px solid #cbd5e1"
                              }}
                              title={`Theme Color: ${banner.bgColor || "#22c55e"}`}
                            />
                            <span style={{ fontSize: "12px", color: "#64748b" }}>{banner.bgColor || "#22c55e"}</span>
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "500",
                              background: banner.status === "Inactive" ? "#fee2e2" : "#dcfce7",
                              color: banner.status === "Inactive" ? "#991b1b" : "#166534"
                            }}
                          >
                            {banner.status || "Active"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                            <button
                              type="button"
                              className="coupen-card-tool-btn coupen-tool-edit"
                              onClick={() => handleEdit(banner)}
                              style={{ padding: "6px 12px", fontSize: "12px", cursor: "pointer" }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              type="button"
                              className="coupen-card-tool-btn coupen-tool-delete"
                              onClick={() =>
                                handleDelete(
                                  banner._id || banner.id
                                )
                              }
                              style={{ padding: "6px 12px", fontSize: "12px", cursor: "pointer" }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupen;