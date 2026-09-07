import React, { useState } from 'react';
import { 
  FiPlus, 
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
  FiRotateCw 
} from 'react-icons/fi';
import './Blogs.css';

const initialBlogs = [
  {
    id: 1,
    title: 'Semper Nulla Vestibul Umdot Vitae Morbi Semper.',
    category: 'Adventure',
    author: 'Zakai Math',
    date: '2023-08-20',
    displayDate: '20 Aug 2023',
    status: 'Published',
    content: ''
  },
  {
    id: 2,
    title: 'Nisi Laoreet Etiam Fringilland Mauris Vitae Arcu.',
    category: 'Local Story',
    author: 'Tourism',
    date: '2023-08-20',
    displayDate: '20 Aug 2023',
    status: 'Published',
    content: ''
  },
  {
    id: 3,
    title: 'The Nomadic Explorer Discovi Hidden Gems..',
    category: 'Wildlife',
    author: 'Kaiser Bocio',
    date: '2023-08-20',
    displayDate: '20 Aug 2023',
    status: 'Published',
    content: ''
  },
  {
    id: 4,
    title: 'Passport Diariesoni Journeys And Experiences',
    category: 'Wildlife',
    author: 'Kaiser Bocio',
    date: '2023-08-20',
    displayDate: '20 Aug 2023',
    status: 'Draft',
    content: ''
  },
  {
    id: 5,
    title: 'Roaming Free Adventures Off The Beaten Path.',
    category: 'Wildlife',
    author: 'Kaiser Bocio',
    date: '2023-08-20',
    displayDate: '20 Aug 2023',
    status: 'Published',
    content: ''
  }
];

const categories = ['Adventure', 'Local Story', 'Wildlife', 'Travel', 'Food'];

const defaultFormData = {
  id: null,
  title: '',
  category: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
  status: 'Published',
  featuredImage: null,
  fileName: '',
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
  const [blogs, setBlogs] = useState(initialBlogs);
  const [formData, setFormData] = useState(defaultFormData);
  const [isEditing, setIsEditing] = useState(false);

  const handleResetForm = () => {
    setFormData(defaultFormData);
    setIsEditing(false);
  };

  const handleSelectBlogForEdit = (blog) => {
    setFormData({
      id: blog.id,
      title: blog.title,
      category: blog.category,
      author: blog.author || '',
      date: blog.date || new Date().toISOString().split('T')[0],
      status: blog.status || 'Published',
      featuredImage: null,
      fileName: '',
      content: blog.content || ''
    });
    setIsEditing(true);

    // Smooth scroll to form on mobile devices
    if (window.innerWidth <= 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs((prev) => prev.filter((item) => item.id !== id));
      if (formData.id === id) {
        handleResetForm();
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
        fileName: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      alert('Please fill in the required fields (Title, Category).');
      return;
    }

    if (isEditing) {
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === formData.id
            ? {
                ...blog,
                title: formData.title,
                category: formData.category,
                author: formData.author || 'Anonymous',
                date: formData.date,
                displayDate: formatDate(formData.date),
                status: formData.status,
                content: formData.content
              }
            : blog
        )
      );
    } else {
      const newBlog = {
        id: blogs.length ? Math.max(...blogs.map((b) => b.id)) + 1 : 1,
        title: formData.title,
        category: formData.category,
        author: formData.author || 'Anonymous',
        date: formData.date,
        displayDate: formatDate(formData.date),
        status: formData.status,
        content: formData.content
      };
      setBlogs((prev) => [newBlog, ...prev]);
    }

    handleResetForm();
  };

  return (
    <div className="blogs-wrapper">
      {/* Top Header */}
      <div className="blogs-header">

      </div>

      {/* Main Two-Column Layout */}
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
            {/* Title */}
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

            {/* Category & Status */}
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

            {/* Author & Date */}
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

            {/* Featured Image */}
            <div className="blogs-form-group">
              <label className="blogs-form-label">Featured Image</label>
              <div className="blogs-file-wrapper">
                <label htmlFor="blogs-featured-upload" className="blogs-file-custom-btn">
                  Choose File
                </label>
                <span className="blogs-file-name-text">
                  {formData.fileName || 'No file chosen'}
                </span>
                <input
                  id="blogs-featured-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="blogs-file-input-hidden"
                />
              </div>
            </div>

            {/* Content Textarea with Toolbar */}
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

            {/* Form Actions */}
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
            <h2 className="blogs-table-title">All Blogs ({blogs.length})</h2>
          </div>

          <div className="blogs-table-responsive">
            <table className="blogs-table">
              <thead>
                <tr className="blogs-table-head-row">
                  <th className="blogs-th-id">ID</th>
                  <th className="blogs-th-title">Title</th>
                  <th className="blogs-th-category">Category</th>
                  <th className="blogs-th-author">Author</th>
                  <th className="blogs-th-date">Date</th>
                  <th className="blogs-th-status">Status</th>
                  <th className="blogs-th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr 
                    key={blog.id} 
                    className={`blogs-table-body-row ${formData.id === blog.id ? 'blogs-row-active' : ''}`}
                  >
                    <td className="blogs-td-id">#{blog.id}</td>
                    <td className="blogs-td-title">
                      <span className="blogs-cell-title" title={blog.title}>
                        {blog.title}
                      </span>
                    </td>
                    <td className="blogs-td-category">{blog.category}</td>
                    <td className="blogs-td-author">{blog.author}</td>
                    <td className="blogs-td-date">{blog.displayDate || formatDate(blog.date)}</td>
                    <td className="blogs-td-status">
                      <span className={`blogs-status-badge blogs-status-${blog.status.toLowerCase()}`}>
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
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan="7" className="blogs-empty-row">
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