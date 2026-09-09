import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiGrid, 
  FiList, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiCalendar, 
  FiImage 
} from 'react-icons/fi';
import './Blogmanagement.css';
import API, { IMG_URL } from "../../api/axios";

const Blogmanagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/blogs');
      const rawData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.data || response.data.blogs || []);

      const formatted = rawData.map(blog => ({
        ...blog,
        id: blog._id || blog.id,
        image: blog.image ? (blog.image.startsWith('http') ? blog.image : `${IMG_URL}${blog.image}`) : '',
        dateFormatted: blog.displayDate || (blog.date ? new Date(blog.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '20 Aug 2023'),
        views: blog.views || '1.2K'
      }));

      setBlogs(formatted);
    } catch (error) {
      console.error('Error fetching blogs for management:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await API.delete(`/blogs/${id}`);
        setBlogs(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog.');
      }
    }
  };

  const handleEditClick = (id) => {
    navigate(`/blog/new?id=${id}`);
  };

  const handleToggleStatus = async (blog) => {
    const newStatus = blog.status === 'Published' ? 'Draft' : 'Published';
    try {
      const response = await API.put(`/blogs/${blog.id}`, {
        ...blog,
        status: newStatus
      });
      const updated = response.data.data;
      
      setBlogs(prev => prev.map(item => {
        if (item.id === blog.id) {
          return { ...item, status: updated.status || newStatus };
        }
        return item;
      }));
    } catch (error) {
      console.error('Error updating blog status:', error);
      alert('Failed to update publication status.');
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (blog.author && blog.author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || blog.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'Latest') {
      return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
    } else if (sortBy === 'Oldest') {
      return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
    } else if (sortBy === 'Title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const uniqueCategories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

  return (
    <div className="blogmanagement-wrapper">
      <div className="blogmanagement-controls-bar">
        <div className="blogmanagement-view-toggles">
          <button 
            type="button" 
            className={`blogmanagement-toggle-btn ${viewMode === 'grid' ? 'blogmanagement-toggle-active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FiGrid /> Grid View
          </button>
          <button 
            type="button" 
            className={`blogmanagement-toggle-btn ${viewMode === 'list' ? 'blogmanagement-toggle-active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FiList /> List View
          </button>
        </div>

        <div className="blogmanagement-filters-group">
          <select 
            className="blogmanagement-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {uniqueCategories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            className="blogmanagement-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <div className="blogmanagement-search-container">
            <FiSearch className="blogmanagement-search-icon" />
            <input 
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blogmanagement-search-input"
            />
          </div>
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="blogmanagement-list-header-bar">
          <h2 className="blogmanagement-section-title">Blog List</h2>
          <div className="blogmanagement-sort-wrapper">
            <span className="blogmanagement-sort-label">Sort by:</span>
            <select 
              className="blogmanagement-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="blogmanagement-loading">Loading management dashboard...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="blogmanagement-empty">No blogs found matching your filters.</div>
      ) : viewMode === 'grid' ? (
        <div className="blogmanagement-grid-view">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="blogmanagement-card">
              <div className="blogmanagement-card-media">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="blogmanagement-card-img" />
                ) : (
                  <div className="blogmanagement-card-img-placeholder"><FiImage /></div>
                )}
                <span className="blogmanagement-card-category-tag">{blog.category}</span>
              </div>
              <div className="blogmanagement-card-body">
                <h3 className="blogmanagement-card-title" title={blog.title}>{blog.title}</h3>
                <div className="blogmanagement-card-meta">
                  <span><FiCalendar /> {blog.dateFormatted}</span>
                </div>
                <div className="blogmanagement-card-footer">
                  <button 
                    type="button" 
                    className={`blogmanagement-status-toggle-btn blogmanagement-status-${blog.status ? blog.status.toLowerCase() : 'published'}`}
                    onClick={() => handleToggleStatus(blog)}
                    title="Click to toggle status"
                  >
                    {blog.status || 'Published'}
                  </button>
                  <div className="blogmanagement-card-actions">
                    <button type="button" className="blogmanagement-action-btn blogmanagement-edit" onClick={() => handleEditClick(blog.id)} title="Edit">
                      <FiEdit2 />
                    </button>
                    <button type="button" className="blogmanagement-action-btn blogmanagement-delete" onClick={() => handleDelete(blog.id)} title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="blogmanagement-table-container">
          <table className="blogmanagement-table">
            <thead>
              <tr>
                <th className="blogmanagement-th-id">#</th>
                <th className="blogmanagement-th-image">Image</th>
                <th className="blogmanagement-th-title">Title</th>
                <th className="blogmanagement-th-category">Category</th>
                <th className="blogmanagement-th-status">Status</th>
                <th className="blogmanagement-th-date">Date</th>
                <th className="blogmanagement-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog, index) => (
                <tr key={blog.id} className="blogmanagement-tr">
                  <td className="blogmanagement-td-id">{index + 1}</td>
                  <td className="blogmanagement-td-image">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="blogmanagement-table-thumb" />
                    ) : (
                      <div className="blogmanagement-table-thumb-placeholder"><FiImage /></div>
                    )}
                  </td>
                  <td className="blogmanagement-td-title">
                    <span className="blogmanagement-table-title-text" title={blog.title}>{blog.title}</span>
                  </td>
                  <td className="blogmanagement-td-category">
                    <span className="blogmanagement-table-chip">{blog.category}</span>
                  </td>
                  <td className="blogmanagement-td-status">
                    <button 
                      type="button" 
                      className={`blogmanagement-status-toggle-btn blogmanagement-status-${blog.status ? blog.status.toLowerCase() : 'published'}`}
                      onClick={() => handleToggleStatus(blog)}
                      title="Click to toggle status"
                    >
                      {blog.status || 'Published'}
                    </button>
                  </td>
                  <td className="blogmanagement-td-date">{blog.dateFormatted}</td>
                  <td className="blogmanagement-td-actions">
                    <div className="blogmanagement-table-actions-group">
                      <button type="button" className="blogmanagement-action-btn blogmanagement-edit" onClick={() => handleEditClick(blog.id)} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button type="button" className="blogmanagement-action-btn blogmanagement-delete" onClick={() => handleDelete(blog.id)} title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Blogmanagement;