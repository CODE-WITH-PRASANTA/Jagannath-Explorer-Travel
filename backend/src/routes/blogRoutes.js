const express = require('express');
const router = express.Router();
const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const upload = require("../middleware/multer"); // Adjust path to where your upload middleware is saved

// Route: /api/blogs
router.route('/')
  .get(getBlogs)
  .post(upload.single('image'), createBlog); 
  // Note: Change to upload.array('images', 5) if you want to allow multiple gallery images per blog post

// Route: /api/blogs/:id
router.route('/:id')
  .put(upload.single('image'), updateBlog) // Handles updating the blog's image as well
  .delete(deleteBlog);

module.exports = router;