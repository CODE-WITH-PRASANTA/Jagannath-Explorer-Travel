import React, { useState, useEffect, useRef } from "react";
import "./Hotel.css";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Upload,
  X,
  Star,
  ArrowLeft,
  Bold,
  Italic,
  List,
  AlignLeft,
  Link,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import API, { IMG_URL } from "../../api/axios";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [viewMode, setViewMode] = useState("list"); // "list" | "form"
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    shortDesc: "",
    detailedDesc: "",
    city: "",
    address: "",
    landmark: "",
    starRating: 5,
    amenities: "",
    checkIn: "14:00",
    checkOut: "11:00",
    phone: "",
    email: "",
    price: "",
    rooms: "",
    status: "Active",
  });

  // Validation States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const formTopRef = useRef(null);

  // Existing image URLs (from DB when editing)
  const [existingImages, setExistingImages] = useState([]);
  // Newly selected File objects for upload
  const [newImageFiles, setNewImageFiles] = useState([]);
  // Object URL previews for newly selected files
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  // Fetch hotels from backend database
  const fetchHotels = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await API.get("/hotels");
      const data = response.data.data || response.data || [];
      setHotels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setErrorMsg(
        error.response?.data?.message || "Failed to load hotels from database."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImagePreviews]);

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(""), 5000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  // ================= FIELD VALIDATION ================= //
  const validateField = (name, value, allFormData = formData, totalImagesCount = existingImages.length + newImageFiles.length) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value || !value.toString().trim()) {
          error = "Hotel name is required.";
        } else if (value.toString().trim().length < 3) {
          error = "Hotel name must be at least 3 characters long.";
        }
        break;

      case "city":
        if (!value || !value.toString().trim()) {
          error = "City / destination is required.";
        }
        break;

      case "shortDesc":
        if (!value || !value.toString().trim()) {
          error = "Short description is required.";
        } else if (value.toString().trim().length < 10) {
          error = "Short description must be at least 10 characters long.";
        }
        break;

      case "detailedDesc":
        if (!value || !value.toString().trim()) {
          error = "Detailed description is required.";
        } else if (value.toString().trim().length < 15) {
          error = "Detailed description must be at least 15 characters long.";
        }
        break;

      case "address":
        if (!value || !value.toString().trim()) {
          error = "Full address is required.";
        } else if (value.toString().trim().length < 5) {
          error = "Please enter a valid, detailed address.";
        }
        break;

      case "amenities":
        if (!value || !value.toString().trim()) {
          error = "Amenities / facilities are required (e.g. Wifi, Pool, AC).";
        }
        break;

      case "price":
        if (value === "" || value === null || value === undefined) {
          error = "Price per night is required.";
        } else if (isNaN(value) || Number(value) <= 0) {
          error = "Price must be a valid positive number greater than 0.";
        }
        break;

      case "rooms":
        if (value === "" || value === null || value === undefined) {
          error = "Total rooms count is required.";
        } else if (isNaN(value) || Number(value) < 1) {
          error = "Rooms must be at least 1.";
        }
        break;

      case "checkIn":
        if (!value || !value.toString().trim()) {
          error = "Check-in time is required (e.g. 14:00).";
        }
        break;

      case "checkOut":
        if (!value || !value.toString().trim()) {
          error = "Check-out time is required (e.g. 11:00).";
        }
        break;

      case "phone": {
        const rawPhone = (value || "").toString().trim();
        if (!rawPhone) {
          error = "Phone number is required.";
        } else if (!/^[0-9]{10}$/.test(rawPhone)) {
          error = "Phone number must be exactly 10 digits.";
        }
        break;
      }

      case "email":
        if (value && value.toString().trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.toString().trim())) {
            error = "Please enter a valid email address (e.g. name@hotel.com).";
          }
        }
        break;

      case "images":
        if (totalImagesCount <= 0) {
          error = "Please upload at least 1 hotel image.";
        } else if (totalImagesCount > 6) {
          error = "Maximum 6 images are allowed.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    const totalImgs = existingImages.length + newImageFiles.length;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field], formData, totalImgs);
      if (error) {
        newErrors[field] = error;
      }
    });

    const imgError = validateField("images", "", formData, totalImgs);
    if (imgError) {
      newErrors.images = imgError;
    }

    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (touched[name]) {
      const error = validateField(name, value, updatedForm);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Validate file formats and size (10MB max)
    const validFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const invalidFiles = files.filter(
      (f) => !validFormats.includes(f.type.toLowerCase()) || f.size > 10 * 1024 * 1024
    );

    if (invalidFiles.length > 0) {
      alert("Only JPG, PNG, and WebP images up to 10MB are allowed.");
      e.target.value = "";
      return;
    }

    const totalCurrentImages = existingImages.length + newImageFiles.length;
    const availableSlots = 6 - totalCurrentImages;

    if (availableSlots <= 0) {
      alert("You can upload a maximum of 6 images in total.");
      e.target.value = "";
      return;
    }

    const filesToAdd = files.slice(0, availableSlots);
    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));

    const updatedFiles = [...newImageFiles, ...filesToAdd];
    setNewImageFiles(updatedFiles);
    setNewImagePreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";

    // Clear image error if valid count
    const totalCount = existingImages.length + updatedFiles.length;
    if (totalCount > 0 && totalCount <= 6) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const removeExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
    const totalCount = updated.length + newImageFiles.length;
    if (totalCount === 0) {
      setErrors((prev) => ({ ...prev, images: "Please upload at least 1 hotel image." }));
    } else {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const removeNewFile = (index) => {
    URL.revokeObjectURL(newImagePreviews[index]);
    const updatedFiles = newImageFiles.filter((_, i) => i !== index);
    setNewImageFiles(updatedFiles);
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));

    const totalCount = existingImages.length + updatedFiles.length;
    if (totalCount === 0) {
      setErrors((prev) => ({ ...prev, images: "Please upload at least 1 hotel image." }));
    } else {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      shortDesc: "",
      detailedDesc: "",
      city: "",
      address: "",
      landmark: "",
      starRating: 5,
      amenities: "",
      checkIn: "14:00",
      checkOut: "11:00",
      phone: "",
      email: "",
      price: "",
      rooms: "",
      status: "Active",
    });
    setErrors({});
    setTouched({});
    setExistingImages([]);
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setErrorMsg("");
    setViewMode("form");
  };

  const handleOpenEditForm = (hotel) => {
    setEditingId(hotel._id || hotel.id);
    setFormData({
      name: hotel.name || "",
      shortDesc: hotel.shortDesc || "",
      detailedDesc: hotel.detailedDesc || "",
      city: hotel.city || "",
      address: hotel.address || "",
      landmark: hotel.landmark || "",
      starRating: hotel.starRating || 5,
      amenities: Array.isArray(hotel.amenities)
        ? hotel.amenities.join(", ")
        : hotel.amenities || "",
      checkIn: hotel.checkIn || "14:00",
      checkOut: hotel.checkOut || "11:00",
      phone: hotel.phone || "",
      email: hotel.email || "",
      price: hotel.price || "",
      rooms: hotel.rooms || "",
      status: hotel.status || "Active",
    });
    setErrors({});
    setTouched({});
    setExistingImages(Array.isArray(hotel.images) ? hotel.images : []);
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setErrorMsg("");
    setViewMode("form");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel and all its associated images?")) return;

    try {
      await API.delete(`/hotels/${id}`);
      setHotels((prev) => prev.filter((h) => (h._id || h.id) !== id));
      showNotification("Hotel and associated images deleted successfully.");
    } catch (error) {
      console.error("Error deleting hotel:", error);
      showNotification(
        error.response?.data?.message || "Failed to delete hotel.",
        true
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      { images: true }
    );
    setTouched(allTouched);

    const { isValid, errors: validationErrors } = validateAll();

    if (!isValid) {
      const errorCount = Object.keys(validationErrors).length;
      showNotification(
        `Please fix the ${errorCount} error${errorCount > 1 ? "s" : ""} in the form before submitting.`,
        true
      );
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    try {
      setSaving(true);
      setErrorMsg("");

      const postData = new FormData();
      postData.append("name", formData.name.trim());
      postData.append("shortDesc", formData.shortDesc.trim());
      postData.append("detailedDesc", formData.detailedDesc ? formData.detailedDesc.trim() : "");
      postData.append("city", formData.city.trim());
      postData.append("address", formData.address.trim());
      postData.append("landmark", formData.landmark ? formData.landmark.trim() : "");
      postData.append("starRating", Number(formData.starRating) || 5);
      postData.append("amenities", formData.amenities ? formData.amenities.trim() : "");
      postData.append("price", Number(formData.price) || 0);
      postData.append("rooms", Number(formData.rooms) || 0);
      postData.append("checkIn", formData.checkIn || "14:00");
      postData.append("checkOut", formData.checkOut || "11:00");
      postData.append("phone", formData.phone.trim());
      postData.append("email", formData.email ? formData.email.trim() : "");
      postData.append("status", formData.status || "Active");

      if (editingId) {
        postData.append("existingImages", JSON.stringify(existingImages));
      }

      // Append new image files
      newImageFiles.forEach((file) => {
        postData.append("images", file);
      });

      if (editingId) {
        const response = await API.put(`/hotels/${editingId}`, postData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updated = response.data.data;
        setHotels((prev) =>
          prev.map((h) => ((h._id || h.id) === editingId ? updated : h))
        );
        showNotification("Hotel updated successfully.");
      } else {
        const response = await API.post("/hotels", postData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const created = response.data.data;
        setHotels((prev) => [created, ...prev]);
        showNotification("Hotel created successfully.");
      }

      setViewMode("list");
    } catch (error) {
      console.error("Error saving hotel:", error);
      setErrorMsg(
        error.response?.data?.message || "Failed to save hotel to database."
      );
    } finally {
      setSaving(false);
    }
  };

  const formatImageUrl = (imgPath) => {
    if (!imgPath) return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80";
    if (imgPath.startsWith("http") || imgPath.startsWith("blob:")) return imgPath;
    return `${IMG_URL}${imgPath}`;
  };

  const filteredHotels = hotels.filter((h) => {
    const query = searchTerm.toLowerCase();
    const nameMatch = (h.name || "").toLowerCase().includes(query);
    const cityMatch = (h.city || "").toLowerCase().includes(query);
    const addressMatch = (h.address || "").toLowerCase().includes(query);
    return nameMatch || cityMatch || addressMatch;
  });

  return (
    <div className="hotel-admin-wrapper">
      {/* Toast / Notification Banner */}
      {successMsg && (
        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto 16px auto",
            padding: "12px 18px",
            borderRadius: "12px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#166534",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={18} color="#16a34a" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto 16px auto",
            padding: "12px 18px",
            borderRadius: "12px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
          }}
        >
          <AlertCircle size={18} color="#dc2626" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ================= LIST VIEW ================= */}
      {viewMode === "list" && (
        <div className="hotel-list-container">
          <div className="hotel-top-action-bar">
            <div className="hotel-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search hotels by name, city, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="hotel-add-new-btn" onClick={handleOpenAddForm}>
              <Plus size={18} /> Add New Hotel
            </button>
          </div>

          <div className="hotel-table-card">
            <div className="hotel-table-responsive">
              <table className="hotel-admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hotel Image</th>
                    <th>Hotel Name</th>
                    <th>Location</th>
                    <th>Star Rating</th>
                    <th>Price (Per Night)</th>
                    <th>Rooms</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="hotel-empty-row">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          <Loader2 className="animate-spin" size={20} /> Loading
                          hotels from database...
                        </div>
                      </td>
                    </tr>
                  ) : filteredHotels.length > 0 ? (
                    filteredHotels.map((hotel, index) => {
                      const hotelId = hotel._id || hotel.id;
                      const primaryImage =
                        hotel.images && hotel.images.length > 0
                          ? hotel.images[0]
                          : null;

                      return (
                        <tr key={hotelId}>
                          <td className="hotel-td-id">{index + 1}</td>
                          <td>
                            <div className="hotel-table-img-wrap">
                              <img
                                src={formatImageUrl(primaryImage)}
                                alt={hotel.name}
                                onError={(e) => {
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80";
                                }}
                              />
                            </div>
                          </td>
                          <td className="hotel-td-name">
                            <strong>{hotel.name}</strong>
                            <span>{hotel.shortDesc}</span>
                          </td>
                          <td>
                            {hotel.city}, {hotel.address}
                          </td>
                          <td>
                            <div className="hotel-star-row">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  fill={
                                    i < (hotel.starRating || 5)
                                      ? "#f59e0b"
                                      : "none"
                                  }
                                  color={
                                    i < (hotel.starRating || 5)
                                      ? "#f59e0b"
                                      : "#cbd5e1"
                                  }
                                />
                              ))}
                            </div>
                          </td>
                          <td className="hotel-td-price">₹{hotel.price}</td>
                          <td>{hotel.rooms || 0}</td>
                          <td>
                            <span
                              className={`hotel-status-badge ${
                                (hotel.status || "Active").toLowerCase()
                              }`}
                            >
                              {hotel.status || "Active"}
                            </span>
                          </td>
                          <td>
                            <div className="hotel-action-btns">
                              <button
                                className="hotel-action-icon-btn edit"
                                onClick={() => handleOpenEditForm(hotel)}
                                title="Edit Hotel"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                className="hotel-action-icon-btn delete"
                                onClick={() => handleDelete(hotelId)}
                                title="Delete Hotel"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" className="hotel-empty-row">
                        {searchTerm
                          ? "No hotels found matching your search."
                          : "No hotels found in the database. Click 'Add New Hotel' to create one."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="hotel-table-footer">
              <span>
                Showing {filteredHotels.length} of {hotels.length} entries
              </span>
              <div className="hotel-pagination">
                <button className="page-btn active">1</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD / EDIT FORM VIEW ================= */}
      {viewMode === "form" && (
        <div className="hotel-form-container" ref={formTopRef}>
          <div className="hotel-form-top-bar">
            <button
              className="hotel-back-btn"
              onClick={() => setViewMode("list")}
              disabled={saving}
            >
              <ArrowLeft size={18} /> Back to List
            </button>
            <h2>{editingId ? "Edit Hotel Details" : "Add New Hotel"}</h2>
          </div>

          <form className="hotel-entry-form" onSubmit={handleSubmit} noValidate>
            <div className="hotel-form-card">
              <h3 className="hotel-form-section-title">Basic Information</h3>

              <div className="hotel-form-grid">
                {/* Hotel Name */}
                <div className={`hotel-field-group ${touched.name && errors.name ? "has-error" : ""}`}>
                  <label>Hotel Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter hotel name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {touched.name && errors.name && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* City */}
                <div className={`hotel-field-group ${touched.city && errors.city ? "has-error" : ""}`}>
                  <label>City / Destination *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Puri, Bhubaneswar, Goa"
                    value={formData.city}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {touched.city && errors.city && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.city}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <div className={`hotel-field-group full-span ${touched.shortDesc && errors.shortDesc ? "has-error" : ""}`}>
                  <label>Short Description *</label>
                  <input
                    type="text"
                    name="shortDesc"
                    placeholder="Brief highlights or overview of the property (min 10 characters)"
                    value={formData.shortDesc}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {touched.shortDesc && errors.shortDesc && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.shortDesc}
                    </span>
                  )}
                </div>

                {/* DETAILED DESCRIPTION */}
                <div className={`hotel-field-group full-span ${touched.detailedDesc && errors.detailedDesc ? "has-error" : ""}`}>
                  <label>Detailed Description *</label>
                  <div className="tinymce-editor-box">
                    <div className="tinymce-toolbar">
                      <button type="button" title="Bold">
                        <Bold size={15} />
                      </button>
                      <button type="button" title="Italic">
                        <Italic size={15} />
                      </button>
                      <button type="button" title="Bullet List">
                        <List size={15} />
                      </button>
                      <button type="button" title="Align Left">
                        <AlignLeft size={15} />
                      </button>
                      <button type="button" title="Insert Link">
                        <Link size={15} />
                      </button>
                      <button type="button" title="Insert Image">
                        <ImageIcon size={15} />
                      </button>
                    </div>
                    <textarea
                      name="detailedDesc"
                      rows={5}
                      placeholder="Write comprehensive hotel overview, luxury suites information, dining experiences, etc..."
                      value={formData.detailedDesc}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                    />
                    <div className="tinymce-statusbar">
                      <span>HTML / Text Supported</span>
                      <span>
                        Words:{" "}
                        {
                          formData.detailedDesc
                            .split(/\s+/)
                            .filter(Boolean).length
                        }
                      </span>
                    </div>
                  </div>
                  {touched.detailedDesc && errors.detailedDesc && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.detailedDesc}
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className={`hotel-field-group ${touched.address && errors.address ? "has-error" : ""}`}>
                  <label>Address *</label>
                  <textarea
                    name="address"
                    rows={2}
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {touched.address && errors.address && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.address}
                    </span>
                  )}
                </div>

                {/* Landmark */}
                <div className="hotel-field-group">
                  <label>Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Enter landmark (optional)"
                    value={formData.landmark}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Star Rating */}
                <div className="hotel-field-group">
                  <label>Star Rating *</label>
                  <select
                    name="starRating"
                    value={formData.starRating}
                    onChange={handleInputChange}
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                {/* Amenities */}
                <div className={`hotel-field-group ${touched.amenities && errors.amenities ? "has-error" : ""}`}>
                  <label>Amenities / Facilities *</label>
                  <input
                    type="text"
                    name="amenities"
                    placeholder="e.g. Free Wifi, Pool, Spa, Parking, AC"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {touched.amenities && errors.amenities && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.amenities}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className={`hotel-field-group ${touched.price && errors.price ? "has-error" : ""}`}>
                  <label>Price per Night (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g. 2898"
                    value={formData.price}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    min="1"
                  />
                  {touched.price && errors.price && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.price}
                    </span>
                  )}
                </div>

                {/* Rooms */}
                <div className={`hotel-field-group ${touched.rooms && errors.rooms ? "has-error" : ""}`}>
                  <label>Total Rooms *</label>
                  <input
                    type="number"
                    name="rooms"
                    placeholder="e.g. 120"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    min="1"
                  />
                  {touched.rooms && errors.rooms && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.rooms}
                    </span>
                  )}
                </div>

                {/* Check In */}
                <div className={`hotel-field-group ${touched.checkIn && errors.checkIn ? "has-error" : ""}`}>
                  <label>Check-in Time *</label>
                  <input
                    type="text"
                    name="checkIn"
                    placeholder="e.g. 14:00"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {touched.checkIn && errors.checkIn && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.checkIn}
                    </span>
                  )}
                </div>

                {/* Check Out */}
                <div className={`hotel-field-group ${touched.checkOut && errors.checkOut ? "has-error" : ""}`}>
                  <label>Check-out Time *</label>
                  <input
                    type="text"
                    name="checkOut"
                    placeholder="e.g. 11:00"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {touched.checkOut && errors.checkOut && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.checkOut}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className={`hotel-field-group ${touched.phone && errors.phone ? "has-error" : ""}`}>
                  <label>Phone Number * (10 Digits)</label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                      handleInputChange({ target: { name: "phone", value: val } });
                    }}
                    onBlur={handleInputBlur}
                  />
                  {touched.phone && errors.phone && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.phone}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className={`hotel-field-group ${touched.email && errors.email ? "has-error" : ""}`}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. contact@hotel.com (optional)"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {touched.email && errors.email && (
                    <span className="hotel-field-error">
                      <AlertCircle size={13} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="hotel-field-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* MULTIPLE IMAGE UPLOAD SECTION */}
              <div className="hotel-form-section-divider"></div>
              <h3 className="hotel-form-section-title">
                Hotel Images * (Max 6 total)
              </h3>

              {existingImages.length + newImageFiles.length < 6 && (
                <div className={`hotel-upload-dropzone ${touched.images && errors.images ? "has-error" : ""}`}>
                  <input
                    type="file"
                    id="hotel-file-input"
                    multiple
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="hotel-file-input"
                    className="hotel-upload-label-box"
                  >
                    <Upload size={32} className="upload-cloud-icon" />
                    <span className="upload-main-text">
                      Click to upload images
                    </span>
                    <span className="upload-sub-text">
                      PNG, JPG or WEBP (Converted to WebP on upload)
                    </span>
                    <span className="upload-limit-text">
                      Remaining slots:{" "}
                      {6 - (existingImages.length + newImageFiles.length)}
                    </span>
                  </label>
                </div>
              )}

              {touched.images && errors.images && (
                <span className="hotel-field-error" style={{ marginTop: "10px" }}>
                  <AlertCircle size={14} /> {errors.images}
                </span>
              )}

              {/* Uploaded Previews Thumbnails Grid */}
              {(existingImages.length > 0 || newImagePreviews.length > 0) && (
                <div className="hotel-preview-grid">
                  {/* Existing images */}
                  {existingImages.map((imgSrc, idx) => (
                    <div className="hotel-preview-thumb-card" key={`exist-${idx}`}>
                      <img
                        src={formatImageUrl(imgSrc)}
                        alt={`Existing ${idx + 1}`}
                      />
                      <button
                        type="button"
                        className="hotel-thumb-remove-btn"
                        onClick={() => removeExistingImage(idx)}
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {/* New pending upload images */}
                  {newImagePreviews.map((previewUrl, idx) => (
                    <div
                      className="hotel-preview-thumb-card"
                      key={`new-${idx}`}
                      style={{ border: "2px dashed #16a34a" }}
                    >
                      <img src={previewUrl} alt={`New upload ${idx + 1}`} />
                      <button
                        type="button"
                        className="hotel-thumb-remove-btn"
                        onClick={() => removeNewFile(idx)}
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* FORM ACTION BUTTONS */}
              <div className="hotel-form-footer-actions">
                <button
                  type="button"
                  className="hotel-form-cancel-btn"
                  onClick={() => setViewMode("list")}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="hotel-form-save-btn"
                  disabled={saving}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {saving
                    ? "Saving to Database..."
                    : editingId
                    ? "Update Hotel"
                    : "Save Hotel"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Hotel;