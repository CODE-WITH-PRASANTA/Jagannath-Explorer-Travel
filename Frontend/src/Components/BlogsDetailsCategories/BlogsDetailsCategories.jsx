import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BlogsDetailsCategories.css';
import API, { IMG_URL } from "../../api/axios";

// Builds a full image URL from whatever the API gives back (relative path or full URL)
const resolveImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${IMG_URL}${path}`;
};

// Turns "Siku Roy" into "SR" for the fallback avatar when no photo is available
const getInitials = (name = '') => {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const BlogsDetailsCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBlog, setCurrentBlog] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const blogId = queryParams.get('id');

  useEffect(() => {
    fetchBlogData();
  }, [blogId]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const response = await API.get('/blogs');
      const rawData = Array.isArray(response.data)
        ? response.data
        : (response.data.data || response.data.blogs || []);

      // Format all items for sidebar recent list and dynamically calculate categories count
      const categoryCounts = {};

      const formattedAll = rawData.map(b => {
        const cat = b.category || 'Travel';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

        return {
          id: b._id || b.id,
          title: b.title,
          date: b.displayDate || b.date,
          image: resolveImageUrl(b.image)
        };
      });

      // Map dynamic categories array with counts
      const dynamicCategories = Object.keys(categoryCounts).map(catName => ({
        name: catName,
        count: categoryCounts[catName]
      }));

      setCategories(dynamicCategories);
      setRecentPosts(formattedAll.slice(0, 3)); // Top 3 recent posts

      // Find current blog by ID, or default to the first one if no ID is passed
      let selected = null;
      if (blogId) {
        selected = rawData.find(b => (b._id === blogId || b.id === blogId));
      }
      if (!selected && rawData.length > 0) {
        selected = rawData[0]; // fallback
      }

      if (selected) {
        const authorName = selected.author || 'Anonymous';

        // Pull the author photo from whichever field the API actually sends,
        // falling back to initials so the profile never shows a broken image.
        const rawAuthorAvatar =
          selected.authorAvatar ||
          selected.authorImage ||
          (selected.author && selected.author.avatar) ||
          '';

        setCurrentBlog({
          id: selected._id || selected.id,
          title: selected.title,
          category: selected.category || 'Travel',
          date: selected.displayDate || selected.date,
          readTime: selected.readTime || '5 min read',
          views: selected.views || '1.2k',
          author: {
            name: authorName,
            avatar: resolveImageUrl(rawAuthorAvatar),
            initials: getInitials(authorName),
            role: selected.authorRole || 'Travel Contributor'
          },
          heroImage: resolveImageUrl(selected.image),
          content: selected.content || 'No description available for this post yet.',
          tags: [selected.category, 'Travel', 'Exploration', 'Adventure'].filter(Boolean)
        });
      }
    } catch (error) {
      console.error('Error fetching blog details page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentClick = (id) => {
    navigate(`/blogdetails?id=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>Loading article details...</div>;
  }

  if (!currentBlog) {
    return <div style={{ textAlign: 'center', padding: '80px' }}>No blog post found.</div>;
  }

  return (
    <div className="blogs-details-categories">
      <div className="blogs-details-categories__container">
        {/* Main Article: 70% Layout */}
        <main className="blogs-details-categories__main">
          <header className="blogs-details-categories__header">
            <span className="blogs-details-categories__category-badge">{currentBlog.category}</span>
            <h1 className="blogs-details-categories__title">{currentBlog.title}</h1>

            <div className="blogs-details-categories__meta-bar">
              <div className="blogs-details-categories__author">
                <div className="blogs-details-categories__author-avatar-ring">
                  {currentBlog.author.avatar ? (
                    <img
                      src={currentBlog.author.avatar}
                      alt={currentBlog.author.name}
                      className="blogs-details-categories__author-avatar"
                    />
                  ) : (
                    <div className="blogs-details-categories__author-avatar blogs-details-categories__author-avatar--fallback">
                      {currentBlog.author.initials}
                    </div>
                  )}
                </div>
                <div className="blogs-details-categories__author-details">
                  <span className="blogs-details-categories__author-name">
                    {currentBlog.author.name}
                    <svg
                      className="blogs-details-categories__verified-badge"
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      aria-label="Verified contributor"
                    >
                      <path
                        fill="currentColor"
                        d="M12 2l2.4 2.2 3.2-.6 1 3.1 3.1 1-.6 3.2L23 12l-2.2 2.4.6 3.2-3.1 1-1 3.1-3.2-.6L12 23l-2.4-2.2-3.2.6-1-3.1-3.1-1 .6-3.2L1 12l2.2-2.4-.6-3.2 3.1-1 1-3.1 3.2.6L12 2z"
                      />
                      <path
                        fill="#ffffff"
                        d="M9.8 12.6l1.8 1.8 3.6-4.4"
                        stroke="#ffffff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillOpacity="0"
                      />
                    </svg>
                  </span>
                  <span className="blogs-details-categories__author-role">{currentBlog.author.role}</span>
                </div>
              </div>

              <div className="blogs-details-categories__stats">
                <span>{currentBlog.date}</span>
                <span className="blogs-details-categories__dot">•</span>
                <span>{currentBlog.readTime}</span>
                <span className="blogs-details-categories__dot">•</span>
                <span>{currentBlog.views} views</span>
              </div>
            </div>
          </header>

          {currentBlog.heroImage && (
            <figure className="blogs-details-categories__hero-wrapper">
              <img
                src={currentBlog.heroImage}
                alt={currentBlog.title}
                className="blogs-details-categories__hero-image"
              />
            </figure>
          )}

          <article className="blogs-details-categories__content">
            <p>{currentBlog.content}</p>
          </article>

          {/* Article Tags */}
          <footer className="blogs-details-categories__footer">
            <span className="blogs-details-categories__tags-label">Tags:</span>
            <div className="blogs-details-categories__tag-list">
              {currentBlog.tags.map((tag, idx) => (
                <span key={idx} className="blogs-details-categories__tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        </main>

        {/* Sidebar: 30% Sticky Layout */}
        <aside className="blogs-details-categories__sidebar">
          {/* Search Card */}
          <div className="blogs-details-categories__card">
            <h3 className="blogs-details-categories__sidebar-heading">Search</h3>
            <form className="blogs-details-categories__search-box" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blogs-details-categories__search-input"
              />
              <button
                type="submit"
                className="blogs-details-categories__search-button"
                aria-label="Search"
              >
                →
              </button>
            </form>
          </div>

          {/* Categories Card */}
          <div className="blogs-details-categories__card">
            <h3 className="blogs-details-categories__sidebar-heading">Categories</h3>
            <ul className="blogs-details-categories__category-list">
              {categories.map((cat, idx) => (
                <li key={idx} className="blogs-details-categories__category-item">
                  <span className="blogs-details-categories__cat-title">{cat.name}</span>
                  <span className="blogs-details-categories__cat-badge">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts Card */}
          <div className="blogs-details-categories__card">
            <h3 className="blogs-details-categories__sidebar-heading">Recent Posts</h3>
            <div className="blogs-details-categories__recent-posts">
              {recentPosts.map((post) => (
                <article
                  key={post.id}
                  className="blogs-details-categories__recent-item"
                  onClick={() => handleRecentClick(post.id)}
                >
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blogs-details-categories__recent-thumb"
                    />
                  ) : (
                    <div className="blogs-details-categories__recent-thumb blogs-details-categories__recent-thumb--empty">
                      No Img
                    </div>
                  )}
                  <div className="blogs-details-categories__recent-content">
                    <span className="blogs-details-categories__recent-date">{post.date}</span>
                    <h4 className="blogs-details-categories__recent-title">{post.title}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Popular Tags Card */}
          <div className="blogs-details-categories__card">
            <h3 className="blogs-details-categories__sidebar-heading">Popular Tags</h3>
            <div className="blogs-details-categories__tag-list">
              {currentBlog.tags.map((tag, idx) => (
                <span key={idx} className="blogs-details-categories__tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogsDetailsCategories;