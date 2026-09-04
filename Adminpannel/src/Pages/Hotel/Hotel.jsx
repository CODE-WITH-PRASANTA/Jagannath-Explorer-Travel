import React, { useState } from "react";
import "./Hotel.css";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Upload, 
  X, 
  Star, 
  MapPin, 
  Building2, 
  Check, 
  ArrowLeft,
  Bold,
  Italic,
  List,
  AlignLeft,
  Link,
  Image as ImageIcon
} from "lucide-react";

const INITIAL_HOTELS = [
  {
    id: 1,
    name: "Golden Tulip The Grandmark Dhaka",
    shortDesc: "Luxury stay in the heart of Dhaka city center.",
    detailedDesc: "<p>Welcome to the best <strong>five-star luxury hotel</strong> featuring modern architecture, world-class dining, and premium suites.</p><ul><li>Free high-speed WiFi</li><li>Rooftop infinity pool</li><li>24/7 concierge service</li></ul>",
    city: "Dhaka",
    address: "House 168/170, Road 02, Banani, Dhaka",
    landmark: "Near City Center",
    checkIn: "14:00",
    checkOut: "11:00",
    phone: "+880123456789",
    email: "booking@goldentulip.com",
    starRating: 5,
    amenities: "Free Wifi, Swimming Pool, Spa, Gym, Restaurant",
    price: "2,898",
    rooms: 120,
    status: "Active",
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: 2,
    name: "Castle Bay Touch Cox's Bazar",
    shortDesc: "Stunning beach view resort with infinity pool.",
    detailedDesc: "<p>Enjoy the soothing sound of waves and breathtaking sunset views directly from your private balcony.</p>",
    city: "Cox's Bazar",
    address: "Marine Drive Road, Cox's Bazar",
    landmark: "Sugandha Beach",
    checkIn: "15:00",
    checkOut: "12:00",
    phone: "+880987654321",
    email: "stay@castlebay.com",
    starRating: 5,
    amenities: "Beach Access, Parking, AC, Room Service",
    price: "3,450",
    rooms: 85,
    status: "Active",
    images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: 3,
    name: "Sea Pearl Beach Resort",
    shortDesc: "Tropical getaway resort surrounded by nature.",
    detailedDesc: "<p>A complete paradise offering water sports, lush green gardens, and high-end relaxation facilities.</p>",
    city: "Goa",
    address: "Baga Beach Road, Goa, India",
    landmark: "Near Tito's Lane",
    checkIn: "14:00",
    checkOut: "11:00",
    phone: "+919876543210",
    email: "reservations@seapearl.com",
    starRating: 4,
    amenities: "Bar, Spa, Free Breakfast, Airport Shuttle",
    price: "4,200",
    rooms: 60,
    status: "Active",
    images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80"]
  }
];

const Hotel = () => {
  const [hotels, setHotels] = useState(INITIAL_HOTELS);
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
    checkIn: "",
    checkOut: "",
    phone: "",
    email: "",
    price: "",
    rooms: "",
    status: "Active",
  });

  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImageUrls].slice(0, 6)); // Max 6 images
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
      checkIn: "",
      checkOut: "",
      phone: "",
      email: "",
      price: "",
      rooms: "",
      status: "Active",
    });
    setImages([]);
    setViewMode("form");
  };

  const handleOpenEditForm = (hotel) => {
    setEditingId(hotel.id);
    setFormData({
      name: hotel.name,
      shortDesc: hotel.shortDesc,
      detailedDesc: hotel.detailedDesc,
      city: hotel.city,
      address: hotel.address,
      landmark: hotel.landmark,
      starRating: hotel.starRating,
      amenities: hotel.amenities,
      checkIn: hotel.checkIn,
      checkOut: hotel.checkOut,
      phone: hotel.phone,
      email: hotel.email,
      price: hotel.price,
      rooms: hotel.rooms,
      status: hotel.status,
    });
    setImages(hotel.images || []);
    setViewMode("form");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      setHotels((prev) => prev.filter((h) => h.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setHotels((prev) =>
        prev.map((h) =>
          h.id === editingId
            ? { ...h, ...formData, images: images.length ? images : h.images }
            : h
        )
      );
    } else {
      const newHotel = {
        id: hotels.length ? Math.max(...hotels.map((h) => h.id)) + 1 : 1,
        ...formData,
        images: images.length ? images : ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"]
      };
      setHotels((prev) => [newHotel, ...prev]);
    }
    setViewMode("list");
  };

  const filteredHotels = hotels.filter((h) =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hotel-admin-wrapper">
      
      {/* ================= LIST VIEW ================= */}
      {viewMode === "list" && (
        <div className="hotel-list-container">
          <div className="hotel-top-action-bar">
            <div className="hotel-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search hotels by name or city..."
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
                  {filteredHotels.length > 0 ? (
                    filteredHotels.map((hotel, index) => (
                      <tr key={hotel.id}>
                        <td className="hotel-td-id">{index + 1}</td>
                        <td>
                          <div className="hotel-table-img-wrap">
                            <img src={hotel.images[0]} alt={hotel.name} />
                          </div>
                        </td>
                        <td className="hotel-td-name">
                          <strong>{hotel.name}</strong>
                          <span>{hotel.shortDesc}</span>
                        </td>
                        <td>{hotel.city}, {hotel.address}</td>
                        <td>
                          <div className="hotel-star-row">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < hotel.starRating ? "#f59e0b" : "none"}
                                color={i < hotel.starRating ? "#f59e0b" : "#cbd5e1"}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="hotel-td-price">₹{hotel.price}</td>
                        <td>{hotel.rooms || 50}</td>
                        <td>
                          <span className={`hotel-status-badge ${hotel.status.toLowerCase()}`}>
                            {hotel.status}
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
                              onClick={() => handleDelete(hotel.id)}
                              title="Delete Hotel"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="hotel-empty-row">
                        No hotels found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="hotel-table-footer">
              <span>Showing 1 to {filteredHotels.length} of {hotels.length} entries</span>
              <div className="hotel-pagination">
                <button className="page-btn active">1</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD / EDIT FORM VIEW ================= */}
      {viewMode === "form" && (
        <div className="hotel-form-container">
          <div className="hotel-form-top-bar">
            <button className="hotel-back-btn" onClick={() => setViewMode("list")}>
              <ArrowLeft size={18} /> Back to List
            </button>
            <h2>{editingId ? "Edit Hotel Details" : "Add New Hotel"}</h2>
          </div>

          <form className="hotel-entry-form" onSubmit={handleSubmit}>
            <div className="hotel-form-card">
              <h3 className="hotel-form-section-title">Basic Information</h3>
              
              <div className="hotel-form-grid">
                <div className="hotel-field-group">
                  <label>Hotel Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter hotel name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="hotel-field-group">
                  <label>City / Destination *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Select city / destination"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="hotel-field-group full-span">
                  <label>Short Description *</label>
                  <input
                    type="text"
                    name="shortDesc"
                    placeholder="Enter short description"
                    value={formData.shortDesc}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* TINYMCE PREMIUM EDITOR SIMULATION FOR DETAILED DESCRIPTION */}
                <div className="hotel-field-group full-span">
                  <label>Detailed Description *</label>
                  <div className="tinymce-editor-box">
                    <div className="tinymce-toolbar">
                      <button type="button" title="Bold"><Bold size={15} /></button>
                      <button type="button" title="Italic"><Italic size={15} /></button>
                      <button type="button" title="Bullet List"><List size={15} /></button>
                      <button type="button" title="Align Left"><AlignLeft size={15} /></button>
                      <button type="button" title="Insert Link"><Link size={15} /></button>
                      <button type="button" title="Insert Image"><ImageIcon size={15} /></button>
                    </div>
                    <textarea
                      name="detailedDesc"
                      rows={5}
                      placeholder="Write comprehensive hotel overview, luxury suites information, dining experiences, etc..."
                      value={formData.detailedDesc}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="tinymce-statusbar">
                      <span>HTML Powered Editor</span>
                      <span>Words: {formData.detailedDesc.split(/\s+/).filter(Boolean).length}</span>
                    </div>
                  </div>
                </div>

                <div className="hotel-field-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    rows={2}
                    placeholder="Enter full address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

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

                <div className="hotel-field-group">
                  <label>Amenities / Facilities *</label>
                  <input
                    type="text"
                    name="amenities"
                    placeholder="e.g. Free Wifi, Pool, Spa, Parking"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="hotel-field-group">
                  <label>Price per Night (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g. 2898"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="hotel-field-group">
                  <label>Total Rooms *</label>
                  <input
                    type="number"
                    name="rooms"
                    placeholder="e.g. 120"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="hotel-field-group">
                  <label>Check-in Time *</label>
                  <input
                    type="text"
                    name="checkIn"
                    placeholder="e.g. 14:00"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="hotel-field-group">
                  <label>Check-out Time *</label>
                  <input
                    type="text"
                    name="checkOut"
                    placeholder="e.g. 11:00"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="hotel-field-group">
                  <label>Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="hotel-field-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

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
              <h3 className="hotel-form-section-title">Hotel Images * (Max 6)</h3>
              
              <div className="hotel-upload-dropzone">
                <input
                  type="file"
                  id="hotel-file-input"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="hotel-file-input" className="hotel-upload-label-box">
                  <Upload size={32} className="upload-cloud-icon" />
                  <span className="upload-main-text">Click to upload images</span>
                  <span className="upload-sub-text">PNG, JPG or WEBP (Max. 5MB each)</span>
                  <span className="upload-limit-text">You can upload up to 6 images</span>
                </label>
              </div>

              {/* Uploaded Previews Thumbnails Grid */}
              {images.length > 0 && (
                <div className="hotel-preview-grid">
                  {images.map((imgSrc, idx) => (
                    <div className="hotel-preview-thumb-card" key={idx}>
                      <img src={imgSrc} alt={`Upload ${idx + 1}`} />
                      <button
                        type="button"
                        className="hotel-thumb-remove-btn"
                        onClick={() => removeImage(idx)}
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
                >
                  Cancel
                </button>
                <button type="submit" className="hotel-form-save-btn">
                  Save Hotel
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