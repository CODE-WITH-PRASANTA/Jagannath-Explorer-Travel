const Hotel = require("../models/Hotel");
const fs = require("fs");
const path = require("path");

// Base upload directory: src/uploads
const baseUploadDir = path.join(__dirname, "../uploads");

// Helper to remove files from uploads
const deleteUploadedFile = (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== "string") return;
  try {
    let cleanPath = fileUrl;
    // Extract part starting with /uploads/ if URL contains domain
    if (cleanPath.includes("/uploads/")) {
      cleanPath = cleanPath.substring(cleanPath.indexOf("/uploads/"));
    }

    if (cleanPath.startsWith("/uploads/")) {
      const relativePart = cleanPath.replace(/^\/uploads\//, "");
      const filePath = path.join(baseUploadDir, relativePart);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else if (cleanPath.startsWith("hotels/")) {
      const filePath = path.join(baseUploadDir, cleanPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (err) {
    console.error("Error deleting image file:", err.message);
  }
};

// @desc    Get all hotels
// @route   GET /api/hotels
const getHotels = async (req, res) => {
  try {
    const { search, city, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }

    if (city && city !== "All") {
      query.city = { $regex: `^${city}$`, $options: "i" };
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const hotels = await Hotel.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error("GET HOTELS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
      error: error.message,
    });
  }
};

const mongoose = require("mongoose");

// @desc    Get single hotel by ID or Name/Slug
// @route   GET /api/hotels/:id
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    let hotel = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      hotel = await Hotel.findById(id);
    }

    if (!hotel) {
      // Decode URL component and construct flexible regex for slug/name
      const decodedParam = decodeURIComponent(id).trim();
      const cleanPattern = decodedParam
        .replace(/[+]/g, " ")
        .replace(/[-_]/g, "[-\\s_]?");

      hotel = await Hotel.findOne({
        name: { $regex: new RegExp(`^${cleanPattern}$`, "i") },
      });

      // Fallback: match words loosely
      if (!hotel) {
        const words = decodedParam.split(/[-_\s+]+/).filter(Boolean);
        if (words.length > 0) {
          const loosePattern = words.join(".*");
          hotel = await Hotel.findOne({
            name: { $regex: new RegExp(loosePattern, "i") },
          });
        }
      }
    }

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error("GET SINGLE HOTEL ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotel details",
      error: error.message,
    });
  }
};

// @desc    Create a new hotel
// @route   POST /api/hotels
const createHotel = async (req, res) => {
  try {
    const {
      name,
      shortDesc,
      detailedDesc,
      city,
      address,
      landmark,
      starRating,
      amenities,
      price,
      rooms,
      checkIn,
      checkOut,
      phone,
      email,
      status,
    } = req.body;

    if (!name || !shortDesc || !city || !address || !price || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, shortDesc, city, address, price, phone)",
      });
    }

    const cleanPhone = phone.toString().trim().replace(/\D/g, "");
    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    // Collect uploaded image URLs
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = req.files.map((file) => file.url);
    }

    // Also support images passed via body (e.g. URLs or fallback)
    let bodyImages = [];
    if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        bodyImages = req.body.images;
      } else if (typeof req.body.images === "string") {
        try {
          const parsed = JSON.parse(req.body.images);
          bodyImages = Array.isArray(parsed) ? parsed : [req.body.images];
        } catch {
          bodyImages = [req.body.images];
        }
      }
    }

    const finalImages = [...uploadedImages, ...bodyImages].filter(Boolean);

    const newHotel = await Hotel.create({
      name: name.trim(),
      shortDesc: shortDesc.trim(),
      detailedDesc: detailedDesc || "",
      city: city.trim(),
      address: address.trim(),
      landmark: landmark ? landmark.trim() : "",
      starRating: Number(starRating) || 5,
      amenities: amenities || "",
      price: Number(price) || 0,
      rooms: Number(rooms) || 0,
      checkIn: checkIn || "14:00",
      checkOut: checkOut || "11:00",
      phone: phone.trim(),
      email: email ? email.trim() : "",
      status: status || "Active",
      images: finalImages,
    });

    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: newHotel,
    });
  } catch (error) {
    console.error("CREATE HOTEL ERROR:", error);

    // Clean up uploaded files if DB creation failed
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => deleteUploadedFile(file.url));
    }

    res.status(400).json({
      success: false,
      message: error.message || "Failed to create hotel",
    });
  }
};

// @desc    Update an existing hotel
// @route   PUT /api/hotels/:id
const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => deleteUploadedFile(file.url));
      }
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const {
      name,
      shortDesc,
      detailedDesc,
      city,
      address,
      landmark,
      starRating,
      amenities,
      price,
      rooms,
      checkIn,
      checkOut,
      phone,
      email,
      status,
      existingImages,
    } = req.body;

    // Handle existing images retained
    let retainedImages = [];
    if (existingImages !== undefined) {
      if (Array.isArray(existingImages)) {
        retainedImages = existingImages;
      } else if (typeof existingImages === "string") {
        try {
          const parsed = JSON.parse(existingImages);
          retainedImages = Array.isArray(parsed) ? parsed : [existingImages];
        } catch {
          retainedImages = [existingImages];
        }
      }
    } else {
      retainedImages = hotel.images;
    }

    // New uploaded images
    let newUploadedImages = [];
    if (req.files && req.files.length > 0) {
      newUploadedImages = req.files.map((file) => file.url);
    }

    const updatedImages = [...retainedImages, ...newUploadedImages].filter(Boolean);

    // Identify images that were removed and delete them from disk
    const removedImages = hotel.images.filter((img) => !updatedImages.includes(img));
    removedImages.forEach((img) => deleteUploadedFile(img));

    if (phone !== undefined) {
      const cleanPhone = phone.toString().trim().replace(/\D/g, "");
      if (!/^[0-9]{10}$/.test(cleanPhone)) {
        return res.status(400).json({
          success: false,
          message: "Phone number must be exactly 10 digits",
        });
      }
    }

    let updateData = {
      name: name !== undefined ? name.trim() : hotel.name,
      shortDesc: shortDesc !== undefined ? shortDesc.trim() : hotel.shortDesc,
      detailedDesc: detailedDesc !== undefined ? detailedDesc : hotel.detailedDesc,
      city: city !== undefined ? city.trim() : hotel.city,
      address: address !== undefined ? address.trim() : hotel.address,
      landmark: landmark !== undefined ? landmark.trim() : hotel.landmark,
      starRating: starRating !== undefined ? Number(starRating) : hotel.starRating,
      amenities: amenities !== undefined ? amenities : hotel.amenities,
      price: price !== undefined ? Number(price) : hotel.price,
      rooms: rooms !== undefined ? Number(rooms) : hotel.rooms,
      checkIn: checkIn !== undefined ? checkIn : hotel.checkIn,
      checkOut: checkOut !== undefined ? checkOut : hotel.checkOut,
      phone: phone !== undefined ? phone.toString().trim().replace(/\D/g, "") : hotel.phone,
      email: email !== undefined ? email.trim() : hotel.email,
      status: status !== undefined ? status : hotel.status,
      images: updatedImages,
    };

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: updatedHotel,
    });
  } catch (error) {
    console.error("UPDATE HOTEL ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update hotel",
    });
  }
};

// @desc    Delete a hotel
// @route   DELETE /api/hotels/:id
const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // Clean up uploaded image files
    if (hotel.images && hotel.images.length > 0) {
      hotel.images.forEach((img) => deleteUploadedFile(img));
    }

    await Hotel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.error("DELETE HOTEL ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete hotel",
    });
  }
};

module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
};
