require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const galleryRoutes = require("./src/routes/galleryRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static("src/uploads"));

app.use(
  "/api/gallery",
  galleryRoutes
);
app.use("/api/testimonials", testimonialRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Jagannath Explorer Travel Backend is running"
  });
});

// Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});