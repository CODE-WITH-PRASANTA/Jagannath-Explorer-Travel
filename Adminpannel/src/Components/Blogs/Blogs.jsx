import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FiEdit2,
  FiTrash2,
  FiBold,
  FiItalic,
  FiUnderline,
  FiSquare,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiLink,
  FiImage,
  FiRotateCcw,
  FiRotateCw,
  FiUploadCloud,
  FiX
} from 'react-icons/fi';
import './Blogs.css';
import API, { IMG_URL } from "../../api/axios";

const categories = ['Adventure', 'Local Story', 'Wildlife', 'Travel', 'Food'];

const defaultFormData = {
  id: null,
  title: '',
  category: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
  status: 'Published',
  featuredImage: null,
  imagePreview: '',
  content: ''
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const editBlogId = queryParams.get('id');

  useEffect(() => {
    fetchBlogs();
  }, [editBlogId]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/blogs');
      const rawData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.data || response.data.blogs || []);

      const formattedBlogs = rawData.map(blog => ({
        ...blog,
        id: blog._id || blog.id,
        image: blog.image ? (blog.image.startsWith('http') ? blog.image : `${IMG_URL}${blog.image}`) : ''
      }));
      
      setBlogs(formattedBlogs);

      // If an ID is passed in the URL, prepopulate the form for editing
      if (editBlogId) {
        const targetBlog = formattedBlogs.find(b => b.id === editBlogId);
        if (targetBlog) {
          setFormData({
            id: targetBlog.id,
            title: targetBlog.title,
            category: targetBlog.category,
            author: targetBlog.author || '',
            date: targetBlog.date ? targetBlog.date.split('T')[0] : new Date().toISOString().split('T')[0],
            status: targetBlog.status || 'Published',
            featuredImage: null,
            imagePreview: targetBlog.image || '',
            content: targetBlog.content || ''
          });
          setIsEditing(true);
        }
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('Failed to load blogs from server.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData(defaultFormData);
    setIsEditing(false);
    if (editBlogId) {
      navigate('/blog/new'); // Clear query param on cancel/reset
    }
  };

  const handleSelectBlogForEdit = (blog) => {
    navigate(`/blog/new?id=${blog.id}`);
    setFormData({
      id: blog.id,
      title: blog.title,
      category: blog.category,
      author: blog.author || '',
      date: blog.date ? blog.date.split('T')[0] : new Date().toISOString().split('T')[0],
      status: blog.status || 'Published',
      featuredImage: null,
      imagePreview: blog.image || '',
      content: blog.content || ''
    });
    setIsEditing(true);

    if (window.innerWidth <= 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await API.delete(`/blogs/${id}`);
        setBlogs((prev) => prev.filter((item) => item.id !== id));
        if (formData.id === id) {
          handleResetForm();
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: null,
      imagePreview: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      alert('Please fill in the required fields (Title, Category).');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('author', formData.author || 'Anonymous');
      data.append('date', formData.date);
      data.append('status', formData.status);
      data.append('content', formData.content);
      
      if (formData.featuredImage) {
        data.append('image', formData.featuredImage);
      }

      if (isEditing) {
        const response = await API.put(`/blogs/${formData.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const updated = response.data.data;
        const formattedUpdated = {
          ...updated,
          id: updated._id || updated.id,
          image: updated.image ? (updated.image.startsWith('http') ? updated.image : `${IMG_URL}${updated.image}`) : ''
        };

        setBlogs((prev) =>
          prev.map((blog) => (blog.id === formData.id ? formattedUpdated : blog))
        );
      } else {
        const response = await API.post('/blogs', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const created = response.data.data;
        const formattedCreated = {
          ...created,
          id: created._id || created.id,
          image: created.image ? (created.image.startsWith('http') ? created.image : `${IMG_URL}${created.image}`) : ''
        };

        setBlogs((prev) => [formattedCreated, ...prev]);
      }

      handleResetForm();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert(error.response?.data?.message || 'Failed to save blog post.');
    }
  };

  return (
    <div className="blogs-wrapper">
      <div className="blogs-grid-container">
        {/* Left Side: Form Panel */}
        <aside className="blogs-form-card">
          <div className="blogs-form-header">
            <h2 className="blogs-form-title">
              {isEditing ? 'Edit Blog Article' : 'Create New Blog'}
            </h2>
            <span className="blogs-form-badge">
              {isEditing ? 'Editing Mode' : 'New Article'}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="blogs-form">
            <div className="blogs-form-group">
              <label className="blogs-form-label">
                Title <span className="blogs-required-mark">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="blogs-input-text"
                required
              />
            </div>

            <div className="blogs-form-row">
              <div className="blogs-form-group blogs-flex-1">
                <label className="blogs-form-label">
                  Category <span className="blogs-required-mark">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="blogs-input-select"
                  required
                >
                  <option value="" disabled>Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="blogs-form-group blogs-flex-1">
                <label className="blogs-form-label">Status</label>
                <div className="blogs-radio-group-horizontal">
                  <label className="blogs-radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="Published"
                      checked={formData.status === 'Published'}
                      onChange={handleInputChange}
                      className="blogs-radio-input"
                    />
                    <span>Published</span>
                  </label>
                  <label className="blogs-radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="Draft"
                      checked={formData.status === 'Draft'}
                      onChange={handleInputChange}
                      className="blogs-radio-input"
                    />
                    <span>Draft</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="blogs-form-row">
              <div className="blogs-form-group blogs-flex-1">
                <label className="blogs-form-label">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author name"
                  className="blogs-input-text"
                />
              </div>

              <div className="blogs-form-group blogs-flex-1">
                <label className="blogs-form-label">Publish Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="blogs-input-date"
                />
              </div>
            </div>

            <div className="blogs-form-group">
              <label className="blogs-form-label">Featured Image</label>
              {formData.imagePreview ? (
                <div className="blogs-image-preview">
                  <img
                    src={formData.imagePreview}
                    alt="Featured preview"
                    className="blogs-image-preview-img"
                  />
                  <div className="blogs-image-preview-overlay">
                    <label htmlFor="blogs-featured-upload" className="blogs-image-replace-btn">
                      Replace
                    </label>
                    <button
                      type="button"
                      className="blogs-image-remove-btn"
                      onClick={handleRemoveImage}
                      title="Remove image"
                    >
                      <FiX />
                    </button>
                  </div>
                  <input
                    id="blogs-featured-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="blogs-file-input-hidden"
                  />
                </div>
              ) : (
                <label htmlFor="blogs-featured-upload" className="blogs-file-dropzone">
                  <FiUploadCloud className="blogs-file-dropzone-icon" />
                  <span className="blogs-file-dropzone-title">Click to upload an image</span>
                  <span className="blogs-file-dropzone-sub">PNG, JPG up to 10MB</span>
                  <input
                    id="blogs-featured-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="blogs-file-input-hidden"
                  />
                </label>
              )}
            </div>

            <div className="blogs-form-group">
              <label className="blogs-form-label">Content</label>
              <div className="blogs-editor-container">
                <div className="blogs-editor-toolbar">
                  <button type="button" className="blogs-toolbar-btn" title="Bold"><FiBold /></button>
                  <button type="button" className="blogs-toolbar-btn" title="Italic"><FiItalic /></button>
                  <button type="button" className="blogs-toolbar-btn" title="Underline"><FiUnderline /></button>
                  <button type="button" className="blogs-toolbar-btn" title="Format Block"><FiSquare /></button>
                  <span className="blogs-toolbar-divider" />
                  <button type="button" className="blogs-toolbar-btn" title="Unordered List"><FiList /></button>
                  <span className="blogs-toolbar-divider" />
                  <button type="button" className="blogs-toolbar-btn" title="Align Left"><FiAlignLeft /></button>
                  <button type="button" className="blogs-toolbar-btn" title="Align Center"><FiAlignCenter /></button>
                  <button type="button" className="blogs-toolbar-btn" title="Align Right"><FiAlignRight /></button>
                  <span className="blogs-toolbar-divider" />
                  <button type="button" className="blogs-toolbar-btn" title="Insert Link"><FiLink /></button>
                  <button type="button" className="blogs-toolbar-btn" title="Insert Image"><FiImage /></button>
                  <span className="blogs-toolbar-divider" />
                  <button type="button" className="blogs-toolbar-btn" title="Undo"><FiRotateCcw /></button>
                  <button type="button" className="blogs-toolbar-btn" title="Redo"><FiRotateCw /></button>
                </div>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog post here..."
                  rows="6"
                  className="blogs-editor-textarea"
                />
              </div>
            </div>

            <div className="blogs-form-actions">
              {isEditing && (
                <button
                  type="button"
                  className="blogs-btn-cancel"
                  onClick={handleResetForm}
                >
                  Cancel Edit
                </button>
              )}
              <button type="submit" className="blogs-btn-submit">
                {isEditing ? 'Update Blog' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </aside>

        {/* Right Side: Data Table */}
        <section className="blogs-table-card">
          <div className="blogs-table-header">
            <h2 className="blogs-table-title">All Blogs</h2>
            <span className="blogs-table-count">{blogs.length} articles</span>
          </div>

          <div className="blogs-table-responsive">
            <table className="blogs-table">
              <thead>
                <tr className="blogs-table-head-row">
                  <th className="blogs-th-id">#</th>
                  <th className="blogs-th-image">Image</th>
                  <th className="blogs-th-title">Title</th>
                  <th className="blogs-th-category">Category</th>
                  <th className="blogs-th-author">Author</th>
                  <th className="blogs-th-date">Date</th>
                  <th className="blogs-th-status">Status</th>
                  <th className="blogs-th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className={`blogs-table-body-row ${formData.id === blog.id ? 'blogs-row-active' : ''}`}
                  >
                    <td className="blogs-td-id">{index + 1}</td>
                    <td className="blogs-td-image">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="blogs-thumb"
                        />
                      ) : (
                        <div className="blogs-thumb blogs-thumb-placeholder">
                          <FiImage />
                        </div>
                      )}
                    </td>
                    <td className="blogs-td-title">
                      <span className="blogs-cell-title" title={blog.title}>
                        {blog.title}
                      </span>
                    </td>
                    <td className="blogs-td-category">
                      <span className="blogs-category-chip">{blog.category}</span>
                    </td>
                    <td className="blogs-td-author">{blog.author}</td>
                    <td className="blogs-td-date">{blog.displayDate || formatDate(blog.date)}</td>
                    <td className="blogs-td-status">
                      <span className={`blogs-status-badge blogs-status-${blog.status.toLowerCase()}`}>
                        <span className="blogs-status-dot" />
                        {blog.status}
                      </span>
                    </td>
                    <td className="blogs-td-actions">
                      <div className="blogs-actions-group">
                        <button
                          className="blogs-action-btn blogs-action-btn-edit"
                          onClick={() => handleSelectBlogForEdit(blog)}
                          title="Edit Blog"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="blogs-action-btn blogs-action-btn-delete"
                          onClick={() => handleDelete(blog.id)}
                          title="Delete Blog"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && !loading && (
                  <tr>
                    <td colSpan="8" className="blogs-empty-row">
                      No blogs found. Use the form on the left to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;