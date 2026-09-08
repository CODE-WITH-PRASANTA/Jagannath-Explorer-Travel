const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// =========================================
// UPLOAD DIRECTORY
// =========================================

const galleryUploadPath = path.join(
  __dirname,
  "../uploads/gallery"
);

// Automatically create folder if it doesn't exist
if (!fs.existsSync(galleryUploadPath)) {
  fs.mkdirSync(galleryUploadPath, {
    recursive: true,
  });
}


// =========================================
// MULTER MEMORY STORAGE
// =========================================

const storage = multer.memoryStorage();


// =========================================
// FILE FILTER
// =========================================

const fileFilter = (req, file, cb) => {
  // Accept any image format supported by Sharp
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files are allowed"
      ),
      false
    );
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
// =========================================

const convertToWebp = async (req, res, next) => {
  try {
    // No file uploaded
    if (!req.file) {
      return next();
    }

    // =====================================
    // CREATE SAFE FILE NAME
    // =====================================

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

    const outputPath = path.join(
      galleryUploadPath,
      fileName
    );


    // =====================================
    // CONVERT IMAGE TO WEBP
    // =====================================

    await sharp(req.file.buffer)
      .webp({
        quality: 85,
        effort: 4,
      })
      .toFile(outputPath);


    // =====================================
    // UPDATE req.file
    // =====================================

    req.file.filename = fileName;

    req.file.path = outputPath;

    req.file.destination = galleryUploadPath;

    req.file.mimetype = "image/webp";

    req.file.originalname = fileName;

    req.file.size = fs.statSync(outputPath).size;

    // Attach a relative/accessible URL property for your Mongoose model/controllers to consume easily
    req.file.url = `/uploads/gallery/${fileName}`;


    // Continue to controller
    next();

  } catch (error) {
    console.error(
      "IMAGE CONVERSION ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        "Failed to convert image to WebP",
      error: error.message,
    });
  }
};


// =========================================
// MULTIPLE WEBP CONVERSION MIDDLEWARE
// =========================================

const convertMultipleToWebp = async (req, res, next) => {
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

        const outputPath = path.join(galleryUploadPath, fileName);

        await sharp(file.buffer)
          .webp({
            quality: 85,
            effort: 4,
          })
          .toFile(outputPath);

        file.filename = fileName;
        file.path = outputPath;
        file.destination = galleryUploadPath;
        file.mimetype = "image/webp";
        file.originalname = fileName;
        file.size = fs.statSync(outputPath).size;
        file.url = `/uploads/gallery/${fileName}`;
      })
    );

    next();
  } catch (error) {
    console.error("MULTIPLE IMAGE CONVERSION ERROR:", error);

    return res.status(400).json({
      success: false,
      message: "Failed to convert images to WebP",
      error: error.message,
    });
  }
};


// =========================================
// EXPORT
// =========================================

const upload = {
  single: (fieldName) => [
    multerUpload.single(fieldName),
    convertToWebp,
  ],
  array: (fieldName, maxCount) => [
    multerUpload.array(fieldName, maxCount),
    convertMultipleToWebp,
  ],
  fields: (fieldsArray) => [
    multerUpload.fields(fieldsArray),
    convertMultipleToWebp,
  ],
  any: () => [
    multerUpload.any(),
    convertMultipleToWebp,
  ],
};

module.exports = upload;