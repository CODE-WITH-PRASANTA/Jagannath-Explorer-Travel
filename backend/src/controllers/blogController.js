const Blog = require("../models/Blog");

// Helper to format date nicely
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// @desc    Get all blogs
// @route   GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new blog
// @route   POST /api/blogs
const createBlog = async (req, res) => {
  try {
    const { title, category, author, date, status, content } = req.body;

    const formattedDate = date || new Date().toISOString().split('T')[0];

    // Check if an image file was processed by multer/sharp middleware
    const imagePath = req.file ? req.file.url : (req.body.image || '');

    const newBlog = await Blog.create({
      title,
      category,
      author: author || 'Anonymous',
      date: formattedDate,
      displayDate: formatDate(formattedDate),
      status: status || 'Published',
      content,
      image: imagePath,
    });

    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update an existing blog
// @route   PUT /api/blogs/:id
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, author, date, status, content } = req.body;

    let updateData = {
      title,
      category,
      author,
      date,
      status,
      content,
    };

    // If a new image file was uploaded, update the image field with the new WebP URL
    if (req.file) {
      updateData.image = req.file.url;
    } else if (req.body.image !== undefined) {
      updateData.image = req.body.image;
    }

    if (date) {
      updateData.displayDate = formatDate(date);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};