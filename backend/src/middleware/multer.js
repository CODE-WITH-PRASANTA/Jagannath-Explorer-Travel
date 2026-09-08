const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// =========================================
// HELPER: ENSURE DIRECTORY EXISTS
// =========================================
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Base upload directory: src/uploads
const baseUploadDir = path.join(__dirname, "../uploads");
ensureDirExists(baseUploadDir);

// =========================================
// MULTER MEMORY STORAGE
// =========================================
const storage = multer.memoryStorage();

// =========================================
// FILE FILTER
// =========================================
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// =========================================
// MULTER CONFIGURATION
// =========================================
const multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
});

// =========================================
// WEBP CONVERSION MIDDLEWARE GENERATOR
// =========================================
const convertToWebp = (subFolder = "gallery") => {
  return async (req, res, next) => {
    try {
      // If no file uploaded, proceed to controller
      if (!req.file) {
        return next();
      }

      // Determine target directory (e.g. src/uploads/users or src/uploads/gallery)
      const targetUploadPath = path.join(baseUploadDir, subFolder);
      ensureDirExists(targetUploadPath);

      // Create safe sanitized file name
      const originalName = path
        .parse(req.file.originalname)
        .name
        .replace(/[^a-zA-Z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

      const fileName = `${originalName || "image"}-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}.webp`;

      const outputPath = path.join(targetUploadPath, fileName);

      // Convert buffer to WebP via Sharp
      await sharp(req.file.buffer)
        .webp({
          quality: 85,
          effort: 4,
        })
        .toFile(outputPath);

      // Update req.file details
      req.file.filename = fileName;
      req.file.path = outputPath;
      req.file.destination = targetUploadPath;
      req.file.mimetype = "image/webp";
      req.file.originalname = fileName;
      req.file.size = fs.statSync(outputPath).size;

      // URL accessible from the frontend static route
      const relativeUrl = `/uploads/${subFolder}/${fileName}`;
      req.file.url = relativeUrl;
      req.avatarPath = relativeUrl; // Compatibility for controllers checking req.avatarPath

      next();
    } catch (error) {
      console.error("IMAGE CONVERSION ERROR:", error);
      return res.status(400).json({
        success: false,
        message: "Failed to convert image to WebP",
        error: error.message,
      });
    }
  };
};

// =========================================
// EXPORT (Backwards Compatible)
// =========================================
const upload = {
  // Keeps existing syntax: upload.single('avatar', 'users') or upload.single('image')
  single: (fieldName, folder = "gallery") => {
    // If uploading 'avatar', default to the 'users' subfolder
    const targetFolder = fieldName === "avatar" ? "users" : folder;
    return [multerUpload.single(fieldName), convertToWebp(targetFolder)];
  },
};

module.exports = upload;