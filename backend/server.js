
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./src/config/db");

// ============================================
// ROUTES
// ============================================

const testimonialRoutes = require("./src/routes/testimonialRoutes");
const couponRoutes = require("./src/routes/couponRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const hotelRoutes = require("./src/routes/hotelRoutes");
const tourRoutes = require("./src/routes/tourRoutes");
const userRoutes = require("./src/routes/userRoutes");
const teamRoutes = require("./src/routes/teamRoutes");

const galleryRoutes = require("./src/routes/galleryRoutes");
const carBookingRoutes = require("./src/routes/carBookingRoutes");
const hotelBookingRoutes = require("./src/routes/hotelBookingRoutes");
const tourBookingRoutes = require("./src/routes/tourBookingRoutes");

// Hotel booking form route
const hotelBookingFormRoutes = require("./src/routes/hotelBookingFormRoutes");

const coupenRoutes = require("./src/routes/coupenRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const enquiryRoutes = require("./src/routes/enquiryRoutes");

// ============================================
// GALLERY ROUTE
// ============================================



// ============================================
// APP
// ============================================

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// STATIC UPLOADS
// ============================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "src/uploads"))
);

// ============================================
// API ROUTES
// ============================================

// Gallery


// Testimonials
app.use("/api/testimonials", testimonialRoutes);

// Coupons
app.use("/api/coupons", couponRoutes);

// Blogs
app.use("/api/blogs", blogRoutes);

// Hotels
app.use("/api/hotels", hotelRoutes);

// Tours
app.use("/api/tours", tourRoutes);

// Users
app.use("/api/users", userRoutes);

// Team
app.use("/api/team", teamRoutes);

// ============================================
// CAR BOOKINGS
// ============================================
app.use(
  "/api/gallery",
  galleryRoutes
);
app.use("/api/car-bookings", carBookingRoutes);

app.use("/api/bookings", carBookingRoutes);

// ============================================
// HOTEL BOOKINGS
// ============================================

// Existing hotel booking route
app.use("/api/hotel-bookings", hotelBookingRoutes);

// Hotel booking form route
app.use("/api/hotel-bookings", hotelBookingFormRoutes);

// Alternative hotel booking URL
app.use("/api/hotelbookings", hotelBookingRoutes);

// ============================================
// TOUR BOOKINGS
// ============================================

app.use("/api/tour-bookings", tourBookingRoutes);

app.use("/api/tourbookings", tourBookingRoutes);

// ============================================
// COUPEN
// ============================================

app.use("/api/coupen", coupenRoutes);

// ============================================
// PROFILE
// ============================================

app.use("/api/profiles", profileRoutes);

// ============================================
// ENQUIRIES
// ============================================

app.use("/api/enquiries", enquiryRoutes);

// ============================================
// ROOT ROUTE
// ============================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Jagannath Explorer Travel Backend is running",
  });
});

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ============================================
// GLOBAL ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ============================================
// DATABASE + SERVER
// ============================================

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

