const HotelBooking = require("../models/HotelBooking");
const mongoose = require("mongoose");

// @desc    Create new hotel room booking
// @route   POST /api/hotel-bookings
// @access  Public
const createHotelBooking = async (req, res) => {
  try {
    const {
      bookingId,
      hotelName,
      packageName,
      fullName,
      name,
      phone,
      mobileNumber,
      destination,
      checkIn,
      checkOut,
      stayNights,
      roomType,
      category,
      roomNo,
      guests,
      member,
      adults,
      children,
      price,
      status,
      extraServices,
      notes,
      message,
    } = req.body;

    const finalFullName = (fullName || name || "").trim();
    const finalPhone = (phone || mobileNumber || "").trim();
    const finalHotelName = (hotelName || packageName || "Grand Luxury Hotel & Resort Stay").trim();
    const finalDestination = (destination || "Puri, Odisha, India").trim();
    const finalCheckIn = (checkIn || "").trim();
    const finalCheckOut = (checkOut || "").trim();
    const finalStayNights = (stayNights || "1 Night").trim();
    const finalRoomType = (roomType || category || "Standard Room").trim();
    const finalRoomNo = (roomNo || "Unassigned").trim();
    const finalGuests = Number(guests || member || (Number(adults || 2) + Number(children || 0)) || 2);
    const finalAdults = Number(adults || 2);
    const finalChildren = Number(children || 0);
    const finalPrice = (price || "").toString().trim();
    const finalStatus = status || "Booked";
    const finalNotes = (notes || message || "").trim();

    if (!finalFullName) {
      return res.status(400).json({
        success: false,
        message: "Customer full name is required",
      });
    }

    if (!finalPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Auto create unique booking ID
    const uniqueSuffix = new mongoose.Types.ObjectId().toString().slice(-6).toUpperCase();
    const generatedBookingId = bookingId && bookingId.startsWith("BK-") ? bookingId : `BK-${uniqueSuffix}`;

    const newBooking = await HotelBooking.create({
      bookingId: generatedBookingId,
      hotelName: finalHotelName,
      fullName: finalFullName,
      phone: finalPhone,
      destination: finalDestination,
      checkIn: finalCheckIn || "Flexible / TBD",
      checkOut: finalCheckOut || "Flexible / TBD",
      stayNights: finalStayNights,
      roomType: finalRoomType,
      roomNo: finalRoomNo,
      guests: finalGuests,
      adults: finalAdults,
      children: finalChildren,
      price: finalPrice || "₹0",
      status: finalStatus,
      extraServices: extraServices || {},
      notes: finalNotes,
    });

    return res.status(201).json({
      success: true,
      message: `Hotel booking request received successfully for ${newBooking.fullName}!`,
      data: newBooking,
    });
  } catch (error) {
    console.error("CREATE HOTEL BOOKING ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create hotel booking",
      error: error.message,
    });
  }
};

// @desc    Get all hotel bookings (with search & filters)
// @route   GET /api/hotel-bookings
// @access  Public / Admin
const getHotelBookings = async (req, res) => {
  try {
    const { search, status, roomType } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { bookingId: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { hotelName: { $regex: search, $options: "i" } },
        { roomNo: { $regex: search, $options: "i" } },
        { roomType: { $regex: search, $options: "i" } },
        { destination: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "All" && status !== "All Status") {
      query.status = status;
    }

    if (roomType && roomType !== "All" && roomType !== "All Room Types") {
      query.roomType = roomType;
    }

    const bookings = await HotelBooking.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("GET HOTEL BOOKINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotel bookings",
      error: error.message,
    });
  }
};

// @desc    Get single hotel booking by ID
// @route   GET /api/hotel-bookings/:id
// @access  Public / Admin
const getHotelBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format",
      });
    }

    const booking = await HotelBooking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("GET HOTEL BOOKING BY ID ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotel booking",
      error: error.message,
    });
  }
};

// @desc    Update hotel booking
// @route   PUT /api/hotel-bookings/:id
// @access  Admin
const updateHotelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format",
      });
    }

    const updatePayload = { ...req.body };
    if (updatePayload.name && !updatePayload.fullName) {
      updatePayload.fullName = updatePayload.name;
    }
    if (updatePayload.package && !updatePayload.hotelName) {
      updatePayload.hotelName = updatePayload.package;
    }
    if (updatePayload.category && !updatePayload.roomType) {
      updatePayload.roomType = updatePayload.category;
    }

    const updatedBooking = await HotelBooking.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("UPDATE HOTEL BOOKING ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update hotel booking",
      error: error.message,
    });
  }
};

// @desc    Delete hotel booking
// @route   DELETE /api/hotel-bookings/:id
// @access  Admin
const deleteHotelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format",
      });
    }

    const deleted = await HotelBooking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel booking deleted successfully",
    });
  } catch (error) {
    console.error("DELETE HOTEL BOOKING ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete hotel booking",
      error: error.message,
    });
  }
};

module.exports = {
  createHotelBooking,
  getHotelBookings,
  getHotelBookingById,
  updateHotelBooking,
  deleteHotelBooking,
};
