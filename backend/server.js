require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");

const galleryRoutes = require("./src/routes/galleryRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const couponRoutes = require("./src/routes/couponRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const hotelRoutes = require("./src/routes/hotelRoutes");
const tourRoutes = require("./src/routes/tourRoutes");
const userRoutes = require("./src/routes/userRoutes");
const teamRoutes = require("./src/routes/teamRoutes");
const carBookingRoutes = require("./src/routes/carBookingRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files (uploads folder in src)
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use('/api/coupons', couponRoutes);

// Test route
app.use("/api/blogs", blogRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/car-bookings", carBookingRoutes);
app.use("/api/bookings", carBookingRoutes);
// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Jagannath Explorer Travel Backend is running",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// DB and Port Connection
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});