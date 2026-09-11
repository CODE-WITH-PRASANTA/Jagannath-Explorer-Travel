import React, { useState, useMemo } from "react";
import "./BookingDetails.css";
import {
  FaCalendarAlt, FaPlus, FaBed, FaUsers, FaSearch, FaDownload,
  FaEye, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaTimes,
  FaArrowUp, FaFilter, FaCar, FaUtensils, FaMapMarkerAlt, FaUserFriends
} from "react-icons/fa";

const initialBookings = [
  { id: 1, bookingId: "BK1001", name: "Ankita Nayak", phone: "9827825440", package: "Golden Tulip Luxury Package", destination: "Puri", members: 2, roomNo: "101", roomType: "Deluxe Room", checkIn: "10 Sep 2026", checkOut: "12 Sep 2026", status: "Checked In", adults: 2, children: 0, homePickup: 0, nightFood: 0, price: 4500, totalPrice: 4500 },
  { id: 2, bookingId: "BK1002", name: "Rahul Sharma", phone: "9876543210", package: "Golden Tulip Luxury Package", destination: "Bhubaneswar", members: 3, roomNo: "203", roomType: "Premium Room", checkIn: "11 Sep 2026", checkOut: "13 Sep 2026", status: "Checked In", adults: 2, children: 1, homePickup: 500, nightFood: 350, price: 7200, totalPrice: 8050 },
  { id: 3, bookingId: "BK1003", name: "Priya Das", phone: "9123456780", package: "Golden Tulip Luxury Package", destination: "Goa", members: 2, roomNo: "305", roomType: "Suite Room", checkIn: "12 Sep 2026", checkOut: "14 Sep 2026", status: "Booked", adults: 2, children: 0, homePickup: 500, nightFood: 0, price: 11000, totalPrice: 11500 },
  { id: 4, bookingId: "BK1004", name: "Rohit Sahoo", phone: "8765432109", package: "Golden Tulip Luxury Package", destination: "Manali", members: 2, roomNo: "108", roomType: "Deluxe Room", checkIn: "13 Sep 2026", checkOut: "15 Sep 2026", status: "Checked Out", adults: 1, children: 1, homePickup: 0, nightFood: 350, price: 5800, totalPrice: 6150 },
  { id: 5, bookingId: "BK1005", name: "Sneha Mishra", phone: "7987654321", package: "Golden Tulip Luxury Package", destination: "Darjeeling", members: 2, roomNo: "204", roomType: "Premium Room", checkIn: "14 Sep 2026", checkOut: "16 Sep 2026", status: "Booked", adults: 2, children: 0, homePickup: 0, nightFood: 350, price: 8500, totalPrice: 8850 },
  { id: 6, bookingId: "BK1006", name: "Sourav Patra", phone: "9432145678", package: "Golden Tulip Luxury Package", destination: "Puri", members: 4, roomNo: "302", roomType: "Suite Room", checkIn: "15 Sep 2026", checkOut: "17 Sep 2026", status: "Checked In", adults: 3, children: 1, homePickup: 500, nightFood: 350, price: 12000, totalPrice: 12850 },
  { id: 7, bookingId: "BK1007", name: "Neha Singh", phone: "7734562180", package: "Golden Tulip Luxury Package", destination: "Shimla", members: 2, roomNo: "109", roomType: "Deluxe Room", checkIn: "16 Sep 2026", checkOut: "18 Sep 2026", status: "Pending", adults: 2, children: 0, homePickup: 0, nightFood: 0, price: 6200, totalPrice: 6200 },
  { id: 8, bookingId: "BK1008", name: "Amit Kumar", phone: "9056783210", package: "Golden Tulip Luxury Package", destination: "Jaipur", members: 4, roomNo: "207", roomType: "Premium Room", checkIn: "17 Sep 2026", checkOut: "19 Sep 2026", status: "Booked", adults: 2, children: 2, homePickup: 500, nightFood: 350, price: 9800, totalPrice: 10650 },
  { id: 9, bookingId: "BK1009", name: "Pooja Verma", phone: "9812345678", package: "Golden Tulip Luxury Package", destination: "Bhubaneswar", members: 2, roomNo: "102", roomType: "Deluxe Room", checkIn: "18 Sep 2026", checkOut: "20 Sep 2026", status: "Checked In", adults: 2, children: 0, homePickup: 0, nightFood: 350, price: 4500, totalPrice: 4850 },
];

const defaultFormData = {
  name: "", phone: "", package: "Golden Tulip Luxury Package", destination: "", members: 2,
  roomNo: "", roomType: "Deluxe Room", checkIn: "", checkOut: "", adults: 2, children: 0,
  homePickup: 0, nightFood: 0, status: "Booked", price: 0, totalPrice: 0
};

const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");
const getStatusClass = (s) => `BookingDetails-status-${s.toLowerCase().replace(/\s+/g, "")}`;
const getRoomTypeClass = (r) => `BookingDetails-room-${r.split(" ")[0].toLowerCase()}`;

const BookingDetails = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roomTypeFilter, setRoomTypeFilter] = useState("All Room Types");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);

  const itemsPerPage = 8;
  const calculateTotal = (d) => (+d.price || 0) + (+d.homePickup || 0) + (+d.nightFood || 0);

  const filteredBookings = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return bookings.filter((b) =>
      (b.name.toLowerCase().includes(q) ||
       b.bookingId.toLowerCase().includes(q) ||
       b.phone.includes(searchQuery) ||
       b.roomNo.includes(searchQuery) ||
       (b.destination && b.destination.toLowerCase().includes(q)) ||
       b.package.toLowerCase().includes(q)) &&
      (statusFilter === "All Status" || b.status === statusFilter) &&
      (roomTypeFilter === "All Room Types" || b.roomType === roomTypeFilter)
    );
  }, [bookings, searchQuery, statusFilter, roomTypeFilter]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const handleDelete = (id) => window.confirm("Delete this booking?") && setBookings((prev) => prev.filter((b) => b.id !== id));

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({ ...booking });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (["price", "homePickup", "nightFood"].includes(name)) updated.totalPrice = calculateTotal(updated);
      return updated;
    });
  };

  const handleServiceChange = (service, checked) => {
    setFormData((prev) => {
      const updated = { ...prev, [service]: checked ? (service === "homePickup" ? 500 : 350) : 0 };
      updated.totalPrice = calculateTotal(updated);
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = {
      ...formData,
      members: +formData.members || 1,
      adults: +formData.adults || 0,
      children: +formData.children || 0,
      homePickup: +formData.homePickup || 0,
      nightFood: +formData.nightFood || 0,
      price: +formData.price || 0,
    };
    clean.totalPrice = calculateTotal(clean);

    setBookings((prev) =>
      editingBooking
        ? prev.map((b) => (b.id === editingBooking.id ? { ...clean, id: b.id, bookingId: b.bookingId } : b))
        : [{ ...clean, id: Date.now(), bookingId: `BK${prev.length + 1001}` }, ...prev]
    );
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBooking(null);
    setFormData(defaultFormData);
  };

  const exportToCSV = () => {
    const headers = ["Booking ID", "Name", "Phone", "Package", "Destination", "Members", "Room", "Room Type", "Check In", "Check Out", "Adults", "Children", "Home Pickup", "Night Food", "Status", "Room Price", "Total Price"];
    const rows = filteredBookings.map((b) => [b.bookingId, b.name, b.phone, b.package, b.destination || "-", b.members || "-", b.roomNo, b.roomType, b.checkIn, b.checkOut, b.adults, b.children, b.homePickup, b.nightFood, b.status, b.price, b.totalPrice]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const link = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" })),
      download: "Room_Bookings.csv"
    });
    link.click();
  };

  const stats = [
    { label: "Total Bookings", val: bookings.length, icon: <FaBed />, cls: "blue", sub: <><FaArrowUp /> +12% this month</>, subCls: "BookingDetails-text-green" },
    { label: "Checked In", val: bookings.filter((b) => b.status === "Checked In").length, icon: <FaCalendarAlt />, cls: "green", sub: "Currently staying" },
    { label: "Checked Out", val: bookings.filter((b) => b.status === "Checked Out").length, icon: <FaCalendarAlt />, cls: "orange", sub: "Completed stays" },
    { label: "Total Guests", val: bookings.reduce((acc, b) => acc + (+b.adults || 0) + (+b.children || 0), 0), icon: <FaUsers />, cls: "purple", sub: "Adults + Children" },
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
        <button className="BookingDetails-btn-primary" onClick={() => { setEditingBooking(null); setFormData(defaultFormData); setIsModalOpen(true); }}>
          <FaPlus /> Add New Booking
        </button>
      </div>

      {/* STATS */}
      <div className="BookingDetails-stats-grid">
        {stats.map((s, idx) => (
          <div key={idx} className="BookingDetails-stat-card">
            <div className={`BookingDetails-stat-icon-wrapper BookingDetails-stat-${s.cls}`}>{s.icon}</div>
            <div className="BookingDetails-stat-info">
              <span className="BookingDetails-stat-label">{s.label}</span>
              <h2 className="BookingDetails-stat-value">{s.val}</h2>
              <span className={`BookingDetails-stat-subtext ${s.subCls || ""}`}>{s.sub}</span>
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
                {["All Status", "Checked In", "Booked", "Checked Out", "Pending"].map((st) => <option key={st}>{st}</option>)}
              </select>
            </div>

            <div className="BookingDetails-select-wrapper">
              <FaBed className="BookingDetails-select-icon" />
              <select value={roomTypeFilter} onChange={(e) => { setRoomTypeFilter(e.target.value); setCurrentPage(1); }}>
                {["All Room Types", "Deluxe Room", "Premium Room", "Suite Room"].map((rt) => <option key={rt}>{rt}</option>)}
              </select>
            </div>

            <div className="BookingDetails-select-wrapper">
              <FaCalendarAlt className="BookingDetails-select-icon" />
              <select><option>Select Date Range</option><option>This Week</option><option>This Month</option></select>
            </div>

            <button className="BookingDetails-btn-export" onClick={exportToCSV}><FaDownload /> Export CSV</button>
          </div>
        </div>

        {/* TABLE */}
        <div className="BookingDetails-table-responsive">
          <table className="BookingDetails-table">
            <thead>
              <tr>
                {["#", "Booking ID", "Customer", "Phone", "Package", "Destination", "Members", "Room", "Room Type", "Check In", "Check Out", "Guests", "Extra Services", "Status", "Room Price", "Total Price", "Actions"].map((h) => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{indexOfFirstItem + idx + 1}</td>
                    <td><span className="BookingDetails-booking-id">{item.bookingId}</span></td>
                    <td>
                      <div className="BookingDetails-customer">
                        <div className="BookingDetails-avatar">{item.name[0]?.toUpperCase()}</div>
                        <div><strong>{item.name}</strong><small>{item.package}</small></div>
                      </div>
                    </td>
                    <td><span className="BookingDetails-phone">{item.phone}</span></td>
                    <td><span className="BookingDetails-package">{item.package}</span></td>
                    <td>
                      <span className="BookingDetails-destination">
                        <FaMapMarkerAlt /> {item.destination || "-"}
                      </span>
                    </td>
                    <td>
                      <span className="BookingDetails-members">
                        <FaUserFriends /> {item.members || 1}
                      </span>
                    </td>
                    <td><strong>{item.roomNo}</strong></td>
                    <td><span className={`BookingDetails-badge ${getRoomTypeClass(item.roomType)}`}>{item.roomType}</span></td>
                    <td><div className="BookingDetails-date"><FaCalendarAlt /><span>{item.checkIn}</span></div></td>
                    <td><div className="BookingDetails-date"><FaCalendarAlt /><span>{item.checkOut}</span></div></td>
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
                        <button className="BookingDetails-action-btn BookingDetails-action-delete" onClick={() => handleDelete(item.id)} title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="17" className="BookingDetails-no-data">No bookings found.</td></tr>
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

      {/* FORM MODAL */}
      {isModalOpen && (
        <div className="BookingDetails-modal-overlay" onClick={closeModal}>
          <div className="BookingDetails-modal BookingDetails-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="BookingDetails-modal-header">
              <div>
                <h3>{editingBooking ? "Edit Booking" : "Add New Booking"}</h3>
                <p>Enter guest and room booking details</p>
              </div>
              <button className="BookingDetails-close-btn" onClick={closeModal}><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit} className="BookingDetails-modal-body">
              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Customer Name</label>
                  <input type="text" name="name" placeholder="Enter customer name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Package Name</label>
                  <input type="text" name="package" value={formData.package} onChange={handleInputChange} required />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Destination</label>
                  <input type="text" name="destination" placeholder="e.g. Puri, Goa" value={formData.destination || ""} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="BookingDetails-form-row">
                <div className="BookingDetails-form-group">
                  <label>Total Members</label>
                  <input type="number" name="members" min="1" placeholder="2" value={formData.members || 1} onChange={handleInputChange} required />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Room Number</label>
                  <input type="text" name="roomNo" placeholder="101" value={formData.roomNo} onChange={handleInputChange} required />
                </div>
                <div className="BookingDetails-form-group">
                  <label>Room Type</label>
                  <select name="roomType" value={formData.roomType} onChange={handleInputChange}>
                    {["Deluxe Room", "Premium Room", "Suite Room"].map((rt) => <option key={rt}>{rt}</option>)}
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
                  <input type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange} required />
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
                  { key: "nightFood", label: "Night Food", price: 350, icon: <FaUtensils />, cls: "food" }
                ].map((s) => (
                  <div key={s.key} className="BookingDetails-service-row">
                    <label>
                      <input type="checkbox" checked={Number(formData[s.key]) > 0} onChange={(e) => handleServiceChange(s.key, e.target.checked)} />
                      <span className={`BookingDetails-service-icon ${s.cls}`}>{s.icon}</span>
                      <span>{s.label}</span>
                    </label>
                    <strong>₹{s.price}</strong>
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
                    {["Booked", "Checked In", "Checked Out", "Pending"].map((st) => <option key={st} value={st}>{st}</option>)}
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
                <button type="button" className="BookingDetails-btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="BookingDetails-btn-primary">{editingBooking ? "Update Booking" : "Save Booking"}</button>
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
              <div className="BookingDetails-view-avatar">{viewBooking.name[0]?.toUpperCase()}</div>
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
                  { label: "Package", val: viewBooking.package },
                  { label: "Destination", val: viewBooking.destination || "-" },
                  { label: "Members", val: viewBooking.members || "-" },
                  { label: "Room", val: viewBooking.roomNo },
                  { label: "Room Type", val: viewBooking.roomType },
                  { label: "Check In", val: viewBooking.checkIn },
                  { label: "Check Out", val: viewBooking.checkOut },
                  { label: "Adults", val: viewBooking.adults },
                  { label: "Children", val: viewBooking.children },
                ].map((info, i) => (
                  <div key={i} className="BookingDetails-view-item">
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
                ].map((s, i) => (
                  <div key={i} className="BookingDetails-view-service">
                    <div>
                      <span className={`BookingDetails-view-service-icon ${s.cls}`}>{s.icon}</span>
                      <span>{s.label}</span>
                    </div>
                    <strong>{s.val > 0 ? `₹${formatINR(s.val)}` : "Not Selected"}</strong>
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