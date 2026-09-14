const express = require("express");
const router = express.Router();

const {
  createCoupen,
  getCoupens,
  getCoupenById,
  updateCoupen,
  deleteCoupen,
} = require("../controllers/coupenController");

const upload = require("../middleware/multer");

// POST /api/coupen
router.post(
  "/",
  upload.single("image", "coupen"),
  createCoupen
);

// GET /api/coupen
router.get("/", getCoupens);

// GET /api/coupen/:id
router.get("/:id", getCoupenById);

// PUT /api/coupen/:id
router.put(
  "/:id",
  upload.single("image", "coupen"),
  updateCoupen
);

// DELETE /api/coupen/:id
router.delete("/:id", deleteCoupen);

module.exports = router;