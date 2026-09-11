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
    // Maximum original upload size: 10 MB per file
    fileSize: 10 * 1024 * 1024,
  },
});

// =========================================
// SINGLE WEBP CONVERSION MIDDLEWARE
// WEBP CONVERSION MIDDLEWARE GENERATOR
// =========================================
const convertToWebp = (subFolder = "gallery") => {
  return async (req, res, next) => {
    try {
      // If no file uploaded, proceed to controller
      if (!req.file) {
        return next();
      }

      // Determine target directory (e.g. src/uploads/users, src/uploads/team, or src/uploads/gallery)
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
// MULTIPLE WEBP CONVERSION MIDDLEWARE
// =========================================
const convertMultipleToWebp = (subFolder = "gallery") => {
  return async (req, res, next) => {
    try {
      let filesArray = [];

      if (Array.isArray(req.files)) {
        filesArray = req.files;
      } else if (req.files && typeof req.files === "object") {
        filesArray = Object.values(req.files).flat();
      }

      if (!filesArray.length) {
        return next();
      }

      const targetUploadPath = path.join(baseUploadDir, subFolder);
      ensureDirExists(targetUploadPath);

      await Promise.all(
        filesArray.map(async (file) => {
          const originalName = path
            .parse(file.originalname)
            .name
            .replace(/[^a-zA-Z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .toLowerCase();

          const fileName = `${originalName || "image"}-${Date.now()}-${Math.round(
            Math.random() * 1e9
          )}.webp`;

          const outputPath = path.join(targetUploadPath, fileName);

          await sharp(file.buffer)
            .webp({
              quality: 85,
              effort: 4,
            })
            .toFile(outputPath);

          file.filename = fileName;
          file.path = outputPath;
          file.destination = targetUploadPath;
          file.mimetype = "image/webp";
          file.originalname = fileName;
          file.size = fs.statSync(outputPath).size;
          file.url = `/uploads/${subFolder}/${fileName}`;
        })
      );

      next();
    } catch (error) {
      console.error("MULTIPLE IMAGE CONVERSIONERROR:", error);

      return res.status(400).json({
        success: false,
        message: "Failed to convert images to WebP",
        error: error.message,
      });
    }
  };
};

// =========================================
// EXPORT (Backwards Compatible & Team Supported)
// =========================================
const upload = {
  single: (fieldName, folder = "gallery") => {
    // Automatically route 'avatar' to 'users' and 'image' (team member upload) to 'team'
    let targetFolder = folder;
    if (fieldName === "avatar") {
      targetFolder = "users";
    } else if (fieldName === "image") {
      targetFolder = "team";
    }
    return [multerUpload.single(fieldName), convertToWebp(targetFolder)];
  },
  array: (fieldName, maxCount, folder = "gallery") => [
    multerUpload.array(fieldName, maxCount),
    convertMultipleToWebp(folder),
  ],
  fields: (fieldsArray, folder = "gallery") => [
    multerUpload.fields(fieldsArray),
    convertMultipleToWebp(folder),
  ],
  any: (folder = "gallery") => [
    multerUpload.any(),
    convertMultipleToWebp(folder),
  ],
};

module.exports = upload;