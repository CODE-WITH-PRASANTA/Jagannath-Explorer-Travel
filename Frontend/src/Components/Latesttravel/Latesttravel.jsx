import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API, { IMG_URL } from "../../api/axios";
import './Latesttravel.css';

const Latesttravel = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Fetch live blog posts from backend API
  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/blogs');
      const rawData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.data || response.data.blogs || []);

      const publishedBlogs = rawData.filter(blog => !blog.status || blog.status === 'Published');

      const formatted = publishedBlogs.map((blog, index) => {
        const blogDate = blog.date ? new Date(blog.date) : new Date();
        const day = blogDate.getDate().toString().padStart(2, '0');
        const month = blogDate.toLocaleString('default', { month: 'long' });
        const shortMonth = blogDate.toLocaleString('default', { month: 'short' });

        let imageUrl = '';
        if (blog.image) {
          imageUrl = blog.image.startsWith('http') ? blog.image : `${IMG_URL}${blog.image}`;
        }

        return {
          id: blog._id || blog.id,
          image: imageUrl || 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=900&auto=format&fit=crop&q=80',
          dateDay: day,
          dateMonth: month,
          dateText: `${shortMonth} ${day}, ${blogDate.getFullYear()}`,
          author: blog.author || 'Anonymous',
          category: blog.category || 'Travel',
          title: blog.title || '',
          comments: blog.commentsCount ? `${blog.commentsCount} Comment` : '0 Comment',
          readTime: '5 Min Read',
          isFeatured: index === 0, // First blog as featured
        };
      });

      setBlogPosts(formatted);
    } catch (error) {
      console.error('Failed to fetch latest travel blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mobile screen detection (<= 650px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : blogPosts.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < blogPosts.length - 1 ? prev + 1 : 0));
  };

  const handlePostClick = (id) => {
    navigate(`/blogdetails?id=${id}`);
  };

  const handleSocialShare = (e, platform, title) => {
    e.stopPropagation();
    alert(`Sharing "${title}" on ${platform}`);
  };

  // Featured Card Component (Big Left Card)
  const renderFeaturedCard = (post) => (
    <article 
      className="featured-card" 
      key={post.id} 
      onClick={() => handlePostClick(post.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="featured-img-wrap">
        <img
          src={post.image}
          alt={post.title}
          className="blog-img"
          loading="lazy"
        />
        <div className="shine-overlay"></div>
      </div>

      <div className="featured-content">
        <div className="featured-meta">
          <span>By <button type="button" className="author-link" onClick={(e) => e.stopPropagation()}>{post.author}</button></span>
          <span className="meta-dot">•</span>
          <span>{post.dateText}</span>
          <span className="meta-dot">•</span>
          <span>{post.comments}</span>
        </div>

        <h3 className="featured-title">{post.title}</h3>

        <div className="featured-footer">
          <button
            type="button"
            className="view-post-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePostClick(post.id);
            }}
          >
            <span>View Post</span>
            <span className="arrow-circle">↗</span>
          </button>

          {/* Social Share Icons */}
          <div className="social-links-row">
            <button type="button" onClick={(e) => handleSocialShare(e, 'Facebook', post.title)} aria-label="Facebook">
              f
            </button>
            <button type="button" onClick={(e) => handleSocialShare(e, 'X (Twitter)', post.title)} aria-label="X">
              𝕏
            </button>
            <button type="button" onClick={(e) => handleSocialShare(e, 'Pinterest', post.title)} aria-label="Pinterest">
              ρ
            </button>
            <button type="button" onClick={(e) => handleSocialShare(e, 'Instagram', post.title)} aria-label="Instagram">
              📷
            </button>
          </div>
        </div>
      </div>
    </article>
  );

  // Horizontal Card Component (Right Stacked Cards)
  const renderHorizontalCard = (post) => (
    <article 
      className="horizontal-post-card" 
      key={post.id}
      onClick={() => handlePostClick(post.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="horizontal-img-wrap">
        <img
          src={post.image}
          alt={post.title}
          className="blog-img"
          loading="lazy"
        />
        <div className="shine-overlay"></div>

        {/* Circular Date Badge */}
        <div className="date-circle-badge">
          <span className="date-number">{post.dateDay}</span>
          <span className="date-month">{post.dateMonth}</span>
        </div>
      </div>

      <div className="horizontal-content">
        <div className="post-meta-top">
          <span>By <button type="button" className="author-link" onClick={(e) => e.stopPropagation()}>{post.author}</button></span>
          <span className="meta-dot">•</span>
          <span className="category-text">{post.category}</span>
        </div>

        <h4 className="horizontal-title">{post.title}</h4>

        <div className="horizontal-footer">
          <button
            type="button"
            className="view-post-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePostClick(post.id);
            }}
          >
            <span>View Post</span>
            <span className="arrow-circle">↗</span>
          </button>

          <div className="read-time-box">
            <span className="fire-icon">🔥</span>
            <span className="read-time-text">{post.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );

  if (loading) {
    return (
      <section className="latesttravel-section">
        <div className="latesttravel-container" style={{ textAlign: 'center', padding: '60px' }}>
          <p className="exp-loading-text">Loading latest travel blogs...</p>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section className="latesttravel-section">
        <div className="latesttravel-container" style={{ textAlign: 'center', padding: '60px' }}>
          <p className="exp-empty-text">No blog posts available right now.</p>
        </div>
      </section>
    );
  }

  const featuredPost = blogPosts[0];
  const rightPosts = blogPosts.slice(1, 4); // Take up to 3 posts for the right stack

  return (
    <section className="latesttravel-section">
      {/* Background World Map & Tree Line Art */}
      <div className="bg-decorations" aria-hidden="true">
        <div className="bg-world-overlay"></div>
        <div className="bg-pine-trees">
          <svg viewBox="0 0 100 160" fill="none" stroke="#e1e8dc" strokeWidth="1.6">
            <path d="M40 30 L50 15 L60 30 L55 30 L66 45 L58 45 L72 65 L28 65 L42 45 L34 45 L45 30 Z M50 65 L50 80" />
            <path d="M15 70 L22 55 L29 70 L26 70 L34 85 L28 85 L38 105 L2 105 L12 85 L6 85 L14 70 Z M20 105 L20 120" />
          </svg>
        </div>
      </div>

      <div className="latesttravel-container">
        {/* Section Header */}
        <div className="latesttravel-header">
          <div className="latesttravel-badge">
            <span className="badge-arrow">➔</span>
            <span>Latest Blog</span>
            <span className="badge-sparkle">✦</span>
          </div>
          <h2 className="latesttravel-main-title">Latest Travel Blog</h2>
        </div>

        {/* ================= DESKTOP & TABLET VIEW (> 650px) ================= */}
        {!isMobile && (
          <div className="latesttravel-grid">
            {renderFeaturedCard(featuredPost)}
            <div className="stacked-cards-col">
              {rightPosts.map((post) => renderHorizontalCard(post))}
            </div>
          </div>
        )}

        {/* ================= MOBILE SLIDER VIEW (<= 650px) ================= */}
        {isMobile && (
          <div className="mobile-blog-slider-wrap">
            <div className="mobile-single-card-view">
              {blogPosts[currentIndex].isFeatured || currentIndex === 0
                ? renderFeaturedCard(blogPosts[currentIndex])
                : renderHorizontalCard(blogPosts[currentIndex])}
            </div>

            {/* Arrow Navigation & Indicator Dots */}
            <div className="mobile-slider-controls">
              <button
                type="button"
                className="slider-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous Post"
              >
                <FaChevronLeft />
              </button>

              <div className="slider-indicator-dots">
                {blogPosts.map((_, idx) => (
                  <span
                    key={idx}
                    className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="slider-arrow-btn"
                onClick={handleNext}
                aria-label="Next Post"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Latesttravel;