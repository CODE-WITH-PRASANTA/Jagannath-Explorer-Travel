const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // Import your configured multer upload middleware
const {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

router.route("/")
  .get(getTeamMembers)
  .post(upload.single("image"), createTeamMember);

router.route("/:id")
  .put(upload.single("image"), updateTeamMember)
  .delete(deleteTeamMember);

module.exports = router;