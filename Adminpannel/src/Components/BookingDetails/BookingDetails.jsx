import React, { useEffect, useMemo, useState } from "react";
import "./BookingDetails.css";
import API from "../../api/axios";

import {
  FaCalendarAlt,
  FaPlus,
  FaBed,
  FaUsers,
  FaSearch,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaFilter,
  FaCar,
  FaUtensils,
  FaMapMarkerAlt,
  FaUserFriends,
  FaPhoneAlt,
  FaSyncAlt,
  FaSpinner,
} from "react-icons/fa";

// =====================================================
// DEFAULT FORM
// =====================================================

const defaultFormData = {
  name: "",
  phone: "",
  package: "Golden Tulip Luxury Package",
  destination: "",
  members: 2,
  roomNo: "",
  roomType: "Standard Room",
  checkIn: "",
  checkOut: "",
  adults: 2,
  children: 0,
  homePickup: 0,
  nightFood: 0,
  status: "Booked",
  price: 0,
  totalPrice: 0,
};

// =====================================================
// HELPERS
// =====================================================

const formatINR = (val) =>
  Number(val || 0).toLocaleString("en-IN");

const getStatusClass = (status = "") =>
  `BookingDetails-status-${String(status)
    .toLowerCase()
    .replace(/\s+/g, "")}`;

const getRoomTypeClass = (roomType = "") =>
  `BookingDetails-room-${String(roomType)
    .split(" ")[0]
    .toLowerCase()}`;

// =====================================================
// DATE FORMAT
// =====================================================

const formatDate = (date) => {
  if (!date) return "-";
  const value = String(date);

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// =====================================================
// ISO DATE FOR FORM
// =====================================================

const toISODate = (date) => {
  if (!date) return "";
  const value = String(date);

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// =====================================================
// CALCULATE NIGHTS
// =====================================================

const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const difference = end.getTime() - start.getTime();
  const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
};

// =====================================================
// BOOKING ID
// =====================================================

const getBookingId = (booking, index) => {
  if (booking?.bookingId) return booking.bookingId;
  if (booking?._id) {
    return `BK${String(booking._id).slice(-6).toUpperCase()}`;
  }
  return `BK${1001 + index}`;
};

// =====================================================
// DATE RANGE CHECKER
// =====================================================

const matchesDateRange = (checkInStr, rangeFilter) => {
  if (rangeFilter === "Select Date Range" || !checkInStr) return true;
  
  const checkInDate = new Date(checkInStr);
  if (Number.isNaN(checkInDate.getTime())) return true;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (rangeFilter === "This Week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return checkInDate >= startOfWeek && checkInDate <= endOfWeek;
  }

  if (rangeFilter === "This Month") {
    return (
      checkInDate.getMonth() === now.getMonth() &&
      checkInDate.getFullYear() === now.getFullYear()
    );
  }

  return true;
};

// =====================================================
// BACKEND → FRONTEND FORMAT
// =====================================================

const normalizeBooking = (booking, index = 0) => {
  const extraServices = booking?.extraServices || {};
  const homePickup = extraServices.homePickup ? 500 : 0;
  const nightFood = extraServices.nightFood ? 350 : 0;

  const roomPrice =
    Number(String(booking?.price || "0").replace(/[^\d.-]/g, "")) || 0;

  const adults = Number(booking?.adults) || 1;
  const children = Number(booking?.children) || 0;
  const guests = Number(booking?.guests) || adults + children;
  const totalPrice = roomPrice + homePickup + nightFood;

  return {
    id: booking?._id || booking?.id || `local-${index}`,
    _id: booking?._id,
    bookingId: getBookingId(booking, index),
    name: booking?.fullName || "",
    phone: booking?.phone || "",
    package: booking?.hotelName || "Hotel Booking",
    destination: booking?.destination || "",
    members: guests,
    roomNo: booking?.roomNo || "-",
    roomType: booking?.roomType || "Standard Room",
    checkIn: booking?.checkIn || "",
    checkOut: booking?.checkOut || "",
    status: booking?.status || "Booked",
    adults,
    children,
    homePickup,
    nightFood,
    price: roomPrice,
    totalPrice: Number(booking?.totalPrice) || totalPrice,
    stayNights: booking?.stayNights || `${calculateNights(booking?.checkIn, booking?.checkOut)} Night${calculateNights(booking?.checkIn, booking?.checkOut) > 1 ? "s" : ""}`,
    extraServices: {
      homePickup: Boolean(extraServices.homePickup),
      nightFood: Boolean(extraServices.nightFood),
    },
    createdAt: booking?.createdAt,
    updatedAt: booking?.updatedAt,
  };
};

// =====================================================
// FRONTEND → BACKEND FORMAT
// =====================================================

const buildBackendPayload = (formData) => {
  const adults = Number(formData.adults) || 1;
  const children = Number(formData.children) || 0;
  const guests = Number(formData.members) || adults + children;
  const roomPrice = Number(formData.price) || 0;
  const homePickup = Number(formData.homePickup) > 0;
  const nightFood = Number(formData.nightFood) > 0;
  const nights = calculateNights(formData.checkIn, formData.checkOut);

  return {
    hotelName: String(formData.package || "").trim(),
    fullName: String(formData.name || "").trim(),
    phone: String(formData.phone || "").replace(/\D/g, "").slice(0, 10),
    destination: String(formData.destination || "").trim(),
    checkIn: formData.checkIn,
    checkOut: formData.checkOut,
    stayNights: `${nights} Night${nights > 1 ? "s" : ""}`,
    roomType: formData.roomType,
    guests,
    adults,
    children,
    price: `₹${roomPrice.toLocaleString("en-IN")}`,
    status: formData.status || "Booked",
    extraServices: {
      homePickup,
      nightFood,
    },
  };
};

// =====================================================
// COMPONENT
// =====================================================

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roomTypeFilter, setRoomTypeFilter] = useState("All Room Types");
  const [dateRangeFilter, setDateRangeFilter] = useState("Select Date Range");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  const [formData, setFormData] = useState({ ...defaultFormData });
  const itemsPerPage = 8;

  const fetchBookings = async () => {
    setIsLoading(true);
    setApiError("");
    try {
      const response = await API.get("/hotel-bookings");
      const responseData = response.data;
      let bookingList = [];

      if (Array.isArray(responseData)) {
        bookingList = responseData;
      } else if (Array.isArray(responseData?.data)) {
        bookingList = responseData.data;
      } else if (Array.isArray(responseData?.bookings)) {
        bookingList = responseData.bookings;
      }

      const normalized = bookingList.map((b, idx) => normalizeBooking(b, idx));
      setBookings(normalized);
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data?.message || "Failed to load hotel bookings.");
      } else if (error.request) {
        setApiError("Unable to connect to the backend server (localhost:5000).");
      } else {
        setApiError("Something went wrong while loading bookings.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const calculateTotal = (data) => {
    return (+data.price || 0) + (+data.homePickup || 0) + (+data.nightFood || 0);
  };

  const filteredBookings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !q ||
        String(booking.name || "").toLowerCase().includes(q) ||
        String(booking.bookingId || "").toLowerCase().includes(q) ||
        String(booking.phone || "").includes(q) ||
        String(booking.roomNo || "").toLowerCase().includes(q) ||
        String(booking.destination || "").toLowerCase().includes(q) ||
        String(booking.package || "").toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All Status" || booking.status === statusFilter;

      const matchesRoom =
        roomTypeFilter === "All Room Types" || booking.roomType === roomTypeFilter;

      const matchesDate = matchesDateRange(booking.checkIn, dateRangeFilter);

      return matchesSearch && matchesStatus && matchesRoom && matchesDate;
    });
  }, [bookings, searchQuery, statusFilter, roomTypeFilter, dateRangeFilter]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (["price", "homePickup", "nightFood"].includes(name)) {
        updated.totalPrice = calculateTotal(updated);
      }
      if (name === "adults" || name === "children") {
        updated.members =
          (Number(name === "adults" ? value : prev.adults) || 0) +
          (Number(name === "children" ? value : prev.children) || 0);
      }
      return updated;
    });
    setApiError("");
    setSuccessMessage("");
  };

  const handleServiceChange = (service, checked) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [service]: checked ? (service === "homePickup" ? 500 : 350) : 0,
      };
      updated.totalPrice = calculateTotal(updated);
      return updated;
    });
  };

  const handleAddBooking = () => {
    setEditingBooking(null);
    setFormData({ ...defaultFormData });
    setApiError("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      name: booking.name || "",
      phone: booking.phone || "",
      package: booking.package || "",
      destination: booking.destination || "",
      members: Number(booking.members) || 1,
      roomNo: booking.roomNo === "-" ? "" : booking.roomNo || "",
      roomType: booking.roomType || "Standard Room",
      checkIn: toISODate(booking.checkIn),
      checkOut: toISODate(booking.checkOut),
      adults: Number(booking.adults) || 1,
      children: Number(booking.children) || 0,
      homePickup: Number(booking.homePickup) || 0,
      nightFood: Number(booking.nightFood) || 0,
      status: booking.status || "Booked",
      price: Number(booking.price) || 0,
      totalPrice: Number(booking.totalPrice) || calculateTotal(booking),
    });
    setApiError("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setApiError("");
    setSuccessMessage("");

    const name = String(formData.name || "").trim();
    const phone = String(formData.phone || "").replace(/\D/g, "").trim();
    const packageName = String(formData.package || "").trim();
    const destination = String(formData.destination || "").trim();
    const checkIn = formData.checkIn;
    const checkOut = formData.checkOut;
    const adults = Number(formData.adults) || 0;
    const children = Number(formData.children) || 0;

    if (name.length < 2) {
      setApiError("Customer name must contain at least 2 characters.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setApiError("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    if (!packageName) {
      setApiError("Hotel / package name is required.");
      return;
    }
    if (!destination) {
      setApiError("Destination is required.");
      return;
    }
    if (!checkIn || !checkOut) {
      setApiError("Please select check-in and check-out dates.");
      return;
    }
    if (checkOut <= checkIn) {
      setApiError("Check-out date must be after check-in date.");
      return;
    }
    if (adults < 1) {
      setApiError("At least one adult is required.");
      return;
    }

    const payload = buildBackendPayload({
      ...formData,
      name,
      phone,
      package: packageName,
      destination,
      checkIn,
      checkOut,
      adults,
      children,
    });

    setIsSubmitting(true);

    try {
      if (!editingBooking) {
        const response = await API.post("/hotel-bookings", payload);
        if (response.status === 200 || response.status === 201) {
          setSuccessMessage("Hotel booking created successfully.");
          closeModal();
          await fetchBookings();
        } else {
          setApiError(response.data?.message || "Booking could not be created.");
        }
        return;
      }

      if (!editingBooking?._id) {
        setApiError("This booking does not have a MongoDB ID, so it cannot be updated.");
        return;
      }

      const response = await API.put(`/hotel-bookings/${editingBooking._id}`, payload);
      if (response.status === 200 || response.status === 201) {
        closeModal();
        await fetchBookings();
        setSuccessMessage("Hotel booking updated successfully.");
      }
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.message;
        const errors = error.response.data?.errors;
        if (Array.isArray(errors) && errors.length) {
          setApiError(errors.join(", "));
        } else {
          setApiError(message || "Unable to save hotel booking.");
        }
      } else if (error.request) {
        setApiError("Backend server is not reachable at localhost:5000.");
      } else {
        setApiError("Something went wrong while saving the booking.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (booking) => {
    if (!booking?._id) {
      setApiError("This booking does not have a MongoDB ID and cannot be deleted.");
      return;
    }

    if (!window.confirm(`Delete booking ${booking.bookingId}?`)) return;

    try {
      setApiError("");
      await API.delete(`/hotel-bookings/${booking._id}`);
      setBookings((prev) => prev.filter((item) => item._id !== booking._id));
      setSuccessMessage("Booking deleted successfully.");
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data?.message || "Unable to delete booking.");
      } else {
        setApiError("Something went wrong while deleting the booking.");
      }
    }
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditingBooking(null);
    setFormData({ ...defaultFormData });
  };

  const exportToCSV = () => {
    if (!filteredBookings.length) return;

    const headers = [
      "Booking ID", "Name", "Phone", "Hotel", "Destination", "Members",
      "Room", "Room Type", "Check In", "Check Out", "Adults", "Children",
      "Home Pickup", "Night Food", "Status", "Room Price", "Total Price",
    ];

    const rows = filteredBookings.map((b) => [
      b.bookingId, b.name, b.phone, b.package, b.destination || "-",
      b.members || "-", b.roomNo || "-", b.roomType, formatDate(b.checkIn),
      formatDate(b.checkOut), b.adults, b.children, b.homePickup, b.nightFood,
      b.status, b.price, b.totalPrice,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Room_Bookings.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const stats = [
    { label: "Total Bookings", val: bookings.length, icon: <FaBed />, cls: "blue", sub: "All hotel bookings" },
    { label: "Checked In", val: bookings.filter((b) => b.status === "Checked In").length, icon: <FaCalendarAlt />, cls: "green", sub: "Currently staying" },
    { label: "Checked Out", val: bookings.filter((b) => b.status === "Checked Out").length, icon: <FaCalendarAlt />, cls: "orange", sub: "Completed stays" },
    { label: "Total Guests", val: bookings.reduce((t, b) => t + (Number(b.adults) || 0) + (Number(b.children) || 0), 0), icon: <FaUsers />, cls: "purple", sub: "Adults + Children" },
  ];

  return (
    <div className="BookingDetails-container">
      {/* HEADER */}
      <div className="BookingDetails-header">
        <div className="BookingDetails-header-left">
          <div className="BookingDetails-header-icon-box"><FaCalendarAlt /></div>
          <div>
            <h1>Room Bookings</h1>
            <p>Manage and view all hotel room bookings, check-in and check-out details.</p>
          </div>
        </div>
        <div className="BookingDetails-header-actions">
          <button className="BookingDetails-btn-secondary" type="button" onClick={fetchBookings} disabled={isLoading}>
            <FaSyncAlt className={isLoading ? "BookingDetails-spin" : ""} /> Refresh
          </button>
          <button className="BookingDetails-btn-primary" onClick={handleAddBooking}>
            <FaPlus /> Add New Booking
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      {apiError && (
        <div className="BookingDetails-api-error" role="alert">
          <FaTimes /><span>{apiError}</span>
          <button type="button" onClick={() => setApiError("")}><FaTimes /></button>
        </div>
      )}
      {successMessage && (
        <div className="BookingDetails-api-success" role="status">
          <span>{successMessage}</span>
          <button type="button" onClick={() => setSuccessMessage("")}><FaTimes /></button>
        </div>
      )}

      {/* STATS */}
      <div className="BookingDetails-stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="BookingDetails-stat-card">
            <div className={`BookingDetails-stat-icon-wrapper BookingDetails-stat-${stat.cls}`}>{stat.icon}</div>
            <div className="BookingDetails-stat-info">
              <span className="BookingDetails-stat-label">{stat.label}</span>
              <h2 className="BookingDetails-stat-value">{stat.val}</h2>
              <span className="BookingDetails-stat-subtext">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="BookingDetails-table-card">
        <div className="BookingDetails-controls">
          <div className="BookingDetails-search-box">
            <FaSearch className="BookingDetails-search-icon" />
            <input
              type="text"
              placeholder="Search by name, package, destination, room no, or booking ID..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="BookingDetails-filters-group">
            <div className="BookingDetails-select-wrapper">
              <FaFilter className="BookingDetails-select-icon" />
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                {["All Status", "Checked In", "Booked", "Checked Out", "Pending", "Confirmed", "Cancelled"].map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="BookingDetails-select-wrapper">
              <FaBed className="BookingDetails-select-icon" />
              <select value={roomTypeFilter} onChange={(e) => { setRoomTypeFilter(e.target.value); setCurrentPage(1); }}>
                {["All Room Types", "Standard Room", "Deluxe Room", "Premium Room", "Executive Suite", "Suite Room"].map((rt) => (
                  <option key={rt} value={rt}>{rt}</option>
                ))}
              </select>
            </div>

            <div className="BookingDetails-select-wrapper">
              <FaCalendarAlt className="BookingDetails-select-icon" />
              <select value={dateRangeFilter} onChange={(e) => { setDateRangeFilter(e.target.value); setCurrentPage(1); }}>
                <option>Select Date Range</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <button className="BookingDetails-btn-export" onClick={exportToCSV} disabled={!filteredBookings.length}>
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="BookingDetails-table-responsive">
          <table className="BookingDetails-table">
            <thead>
              <tr>
                {["#", "Booking ID", "Customer", "Phone", "Package", "Destination", "Members", "Room", "Room Type", "Check In", "Check Out", "Guests", "Extra Services", "Status", "Room Price", "Total Price", "Actions"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="17" className="BookingDetails-no-data">
                    <FaSpinner className="BookingDetails-loading-spinner" />
                    <span>Loading hotel bookings...</span>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td><span className="BookingDetails-booking-id">{item.bookingId}</span></td>
                    <td>
                      <div className="BookingDetails-customer">
                        <div className="BookingDetails-avatar">{item.name?.[0]?.toUpperCase() || "G"}</div>
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.package}</small>
                        </div>
                      </div>
                    </td>
                    <td><span className="BookingDetails-phone"><FaPhoneAlt /> {item.phone}</span></td>
                    <td><span className="BookingDetails-package">{item.package}</span></td>
                    <td><span className="BookingDetails-destination"><FaMapMarkerAlt /> {item.destination || "-"}</span></td>
                    <td><span className="BookingDetails-members"><FaUserFriends /> {item.members || 1}</span></td>
                    <td><strong>{item.roomNo || "-"}</strong></td>
                    <td><span className={`BookingDetails-badge ${getRoomTypeClass(item.roomType)}`}>{item.roomType}</span></td>
                    <td><div className="BookingDetails-date"><FaCalendarAlt /><span>{formatDate(item.checkIn)}</span></div></td>
                    <td><div className="BookingDetails-date"><FaCalendarAlt /><span>{formatDate(item.checkOut)}</span></div></td>
                    <td>
                      <div className="BookingDetails-guests">
                        <div><FaUsers /><span><strong>{item.adults}</strong> Adult{item.adults !== 1 ? "s" : ""}</span></div>
                        <div className="BookingDetails-children"><span><strong>{item.children}</strong> Child{item.children !== 1 ? "ren" : ""}</span></div>
                      </div>
                    </td>
                    <td>
                      <div className="BookingDetails-extra-services">
                        {item.homePickup > 0 && <span className="BookingDetails-extra pickup"><span><FaCar /> Pickup</span><small>₹{formatINR(item.homePickup)}</small></span>}
                        {item.nightFood > 0 && <span className="BookingDetails-extra food"><span><FaUtensils /> Night Food</span><small>₹{formatINR(item.nightFood)}</small></span>}
                        {!item.homePickup && !item.nightFood && <span className="BookingDetails-no-extra">No Extra</span>}
                      </div>
                    </td>
                    <td><span className={`BookingDetails-badge ${getStatusClass(item.status)}`}>{item.status}</span></td>
                    <td><strong className="BookingDetails-price">₹{formatINR(item.price)}</strong></td>
                    <td><strong className="BookingDetails-total-price">₹{formatINR(item.totalPrice)}</strong></td>
                    <td>
                      <div className="BookingDetails-actions">
                        <button className="BookingDetails-action-btn BookingDetails-action-view" onClick={() => setViewBooking(item)} title="View"><FaEye /></button>
                        <button className="BookingDetails-action-btn BookingDetails-action-edit" onClick={() => handleEdit(item)} title="Edit"><FaEdit /></button>
                        <button className="BookingDetails-action-btn BookingDetails-action-delete" onClick={() => handleDelete(item)} title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17" className="BookingDetails-no-data">
                    <FaBed /><span>No bookings found.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="BookingDetails-pagination-container">
          <p className="BookingDetails-showing-text">
            Showing {filteredBookings.length ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfFirstItem + itemsPerPage, filteredBookings.length)} of {filteredBookings.length} entries
          </p>
          <div className="BookingDetails-pagination">
            <button className="BookingDetails-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}><FaChevronLeft /></button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} className={`BookingDetails-page-btn ${currentPage === i + 1 ? "active" : ""}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="BookingDetails-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}><FaChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="BookingDetails-modal-overlay" onClick={closeModal}>
          <div className="BookingDetails-modal BookingDetails-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="BookingDetails-modal-header">
              <div>
                <h3>{editingBooking ? "Edit Booking" : "Add New Booking"}</h3>
                <p>Enter guest and room booking details</p>
              </div>
              <button className="BookingDetails-close-btn" onClick={closeModal} disabled={isSubmitting} type="button"><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit} className="BookingDetails-modal-body">
              {apiError && (
                <div className="BookingDetails-form-error">
                  <FaTimes /><span>{apiError}</span>
                </div>
              )}

              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Customer Name</label>
                  <input type="text" name="name" placeholder="Enter customer name" value={formData.name} onChange={handleInputChange} required minLength="2" />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="Enter 10-digit phone number" value={formData.phone} onChange={handleInputChange} required maxLength="10" inputMode="numeric" />
                </div>
              </div>

              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Hotel / Package Name</label>
                  <input type="text" name="package" placeholder="Enter hotel name" value={formData.package} onChange={handleInputChange} required />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Destination</label>
                  <input type="text" name="destination" placeholder="e.g. Puri, Bhubaneswar" value={formData.destination} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Total Members</label>
                  <input type="number" name="members" min="1" value={formData.members} onChange={handleInputChange} required />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Room Number</label>
                  <input type="text" name="roomNo" placeholder="Optional - e.g. 101" value={formData.roomNo} onChange={handleInputChange} />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Room Type</label>
                  <select name="roomType" value={formData.roomType} onChange={handleInputChange}>
                    {["Standard Room", "Deluxe Room", "Premium Room", "Executive Suite", "Suite Room"].map((room) => (
                      <option key={room} value={room}>{room}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Check In</label>
                  <input type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange} required />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Check Out</label>
                  <input type="date" name="checkOut" min={formData.checkIn || undefined} value={formData.checkOut} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="BookingDetails-section-title"><FaUsers /><span>Guest Details</span></div>
              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Adults</label>
                  <input type="number" name="adults" min="1" value={formData.adults} onChange={handleInputChange} required />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Children</label>
                  <input type="number" name="children" min="0" value={formData.children} onChange={handleInputChange} />
                </div>
              </div>

              <div className="BookingDetails-section-title"><FaPlus /><span>Other Extra Services</span></div>
              <div className="BookingDetails-extra-form-section">
                {[
                  { key: "homePickup", label: "Home Pickup", price: 500, icon: <FaCar />, cls: "pickup" },
                  { key: "nightFood", label: "Night Food", price: 350, icon: <FaUtensils />, cls: "food" },
                ].map((service) => (
                  <div key={service.key} className="BookingDetails-service-row">
                    <label>
                      <input type="checkbox" checked={Number(formData[service.key]) > 0} onChange={(e) => handleServiceChange(service.key, e.target.checked)} />
                      <span className={`BookingDetails-service-icon ${service.cls}`}>{service.icon}</span>
                      <span>{service.label}</span>
                    </label>
                    <strong>₹{formatINR(service.price)}</strong>
                  </div>
                ))}
              </div>

              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Room Price</label>
                  <div className="BookingDetails-price-input">
                    <span>₹</span>
                    <input type="number" name="price" min="0" placeholder="4500" value={formData.price} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="BookingDetails-form-group">
                  <label>Booking Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    {["Booked", "Pending", "Confirmed", "Checked In", "Checked Out", "Cancelled"].map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="BookingDetails-form-total">
                <div>
                  <span>Total Price</span>
                  <small>Room + selected extra services</small>
                </div>
                <strong>₹{formatINR(formData.totalPrice)}</strong>
              </div>

              <div className="BookingDetails-modal-footer">
                <button type="button" className="BookingDetails-btn-secondary" onClick={closeModal} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="BookingDetails-btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? <><FaSpinner className="BookingDetails-spin" /> {editingBooking ? "Updating..." : "Saving..."}</> : (editingBooking ? "Update Booking" : "Save Booking")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewBooking && (
        <div className="BookingDetails-modal-overlay" onClick={() => setViewBooking(null)}>
          <div className="BookingDetails-modal BookingDetails-view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="BookingDetails-modal-header">
              <div>
                <h3>Booking Details</h3>
                <p>{viewBooking.bookingId}</p>
              </div>
              <button className="BookingDetails-close-btn" onClick={() => setViewBooking(null)}><FaTimes /></button>
            </div>

            <div className="BookingDetails-view-customer">
              <div className="BookingDetails-view-avatar">{viewBooking.name?.[0]?.toUpperCase() || "G"}</div>
              <div>
                <h4>{viewBooking.name}</h4>
                <p>{viewBooking.phone}</p>
              </div>
              <span className={`BookingDetails-badge ${getStatusClass(viewBooking.status)}`}>{viewBooking.status}</span>
            </div>

            <div className="BookingDetails-view-section">
              <h4>Booking Information</h4>
              <div className="BookingDetails-view-grid">
                {[
                  { label: "Hotel / Package", val: viewBooking.package },
                  { label: "Destination", val: viewBooking.destination || "-" },
                  { label: "Members", val: viewBooking.members || "-" },
                  { label: "Room", val: viewBooking.roomNo || "-" },
                  { label: "Room Type", val: viewBooking.roomType },
                  { label: "Check In", val: formatDate(viewBooking.checkIn) },
                  { label: "Check Out", val: formatDate(viewBooking.checkOut) },
                  { label: "Stay", val: viewBooking.stayNights || "-" },
                  { label: "Adults", val: viewBooking.adults },
                  { label: "Children", val: viewBooking.children },
                ].map((info, idx) => (
                  <div key={idx} className="BookingDetails-view-item">
                    <span>{info.label}</span>
                    <strong>{info.val}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="BookingDetails-view-section">
              <h4>Other Extra Services</h4>
              <div className="BookingDetails-view-services">
                {[
                  { label: "Home Pickup", val: viewBooking.homePickup, icon: <FaCar />, cls: "pickup" },
                  { label: "Night Food", val: viewBooking.nightFood, icon: <FaUtensils />, cls: "food" },
                ].map((service, idx) => (
                  <div key={idx} className="BookingDetails-view-service">
                    <div>
                      <span className={`BookingDetails-view-service-icon ${service.cls}`}>{service.icon}</span>
                      <span>{service.label}</span>
                    </div>
                    <strong>{service.val > 0 ? `₹${formatINR(service.val)}` : "Not Selected"}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="BookingDetails-view-price">
              <div>
                <span>Room Price</span>
                <strong>₹{formatINR(viewBooking.price)}</strong>
              </div>
              <div>
                <span>Extra Services</span>
                <strong>₹{formatINR((+viewBooking.homePickup || 0) + (+viewBooking.nightFood || 0))}</strong>
              </div>
              <div className="BookingDetails-final-price">
                <span>Total Price</span>
                <strong>₹{formatINR(viewBooking.totalPrice)}</strong>
              </div>
            </div>

            <div className="BookingDetails-modal-footer">
              <button className="BookingDetails-btn-secondary" onClick={() => setViewBooking(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;