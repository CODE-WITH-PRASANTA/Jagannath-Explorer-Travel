import React, { useState } from 'react';
import './BlogsDetailsCategories.css';

import heroImg from '../../assets/blog-standard-img2.jpg';

const BlogsDetailsCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const postData = {
    title: "Hidden Gems of the Northern Fjords: A Guide Beyond the Tourist Trails",
    category: "Travel & Adventure",
    date: "Aug 24, 2025",
    readTime: "6 min read",
    views: "2.4k",
    author: {
      name: "Elena Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Solo Backpacker & Photographer"
    },
    heroImage: heroImg,
    tags: ["Nature", "Hiking", "Scandinavia", "Photography", "Fjords", "Budget Travel"]
  };

  const categories = [
    { name: "Backpacking Guides", count: 14 },
    { name: "Hidden Paradises", count: 9 },
    { name: "Photography Tips", count: 6 },
    { name: "Cultural Experiences", count: 11 },
    { name: "Gear Reviews", count: 4 }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "10 Days Exploring the Ancient Trails of Kyoto",
      date: "Sep 01, 2025",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      title: "Navigating Italy's Amalfi Coast on a Backpacker Budget",
      date: "Aug 18, 2025",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      title: "A Sunrise Above the Clouds in the Swiss Alps",
      date: "Jul 29, 2025",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const comments = [
    {
      id: 1,
      author: "Marcus Lind",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      date: "Aug 25, 2025",
      text: "The ferry schedule tip alone saved my trip planning! Stunning photographs as always, Elena."
    },
    {
      id: 2,
      author: "Sofia Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      date: "Aug 26, 2025",
      text: "That overlook near the western ridge looks completely breathtaking. Adding this straight to my bucket list."
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="blogs-details-categories">
      <div className="blogs-details-categories__container">
        {/* Main Article: 70% Layout */}
        <main className="blogs-details-categories__main">
          <header className="blogs-details-categories__header">
            <span className="blogs-details-categories__category-badge">{postData.category}</span>
            <h1 className="blogs-details-categories__title">{postData.title}</h1>

            <div className="blogs-details-categories__meta-bar">
              <div className="blogs-details-categories__author">
                <img
                  src={postData.author.avatar}
                  alt={postData.author.name}
                  className="blogs-details-categories__author-avatar"
                />
                <div className="blogs-details-categories__author-details">
                  <span className="blogs-details-categories__author-name">{postData.author.name}</span>
                  <span className="blogs-details-categories__author-role">{postData.author.role}</span>
                </div>
              </div>

              <div className="blogs-details-categories__stats">
                <span>{postData.date}</span>
                <span className="blogs-details-categories__dot">•</span>
                <span>{postData.readTime}</span>
                <span className="blogs-details-categories__dot">•</span>
                <span>{postData.views} views</span>
              </div>
            </div>
          </header>

          <figure className="blogs-details-categories__hero-wrapper">
            <img
              src={postData.heroImage}
              alt="Panoramic view of northern fjords"
              className="blogs-details-categories__hero-image"
            />
          </figure>

          <article className="blogs-details-categories__content">
            <p>
              Tucked beneath towering vertical cliffs and carved by millenniums of ice,
              these northern fjords hold secrets that standard tour buses routinely bypass.
              The whisper of glacial water rushing down sheer slate walls forms the soundtrack
              to crisp mornings untouched by heavy tourism.
            </p>

            <blockquote className="blogs-details-categories__quote">
              "The wilderness holds no promises of comfort, but in exchange, it offers clarity
              that civilization rarely affords."
            </blockquote>

            <p>
              Getting here demands patience: a sporadic local ferry followed by an unpaved
              ascent. Yet standing atop the western crest as morning cloud-cover dissolves reveals
              a labyrinth of deep emerald channels threading silently toward the open Arctic waters.
            </p>
          </article>

          {/* Article Tags */}
          <footer className="blogs-details-categories__footer">
            <span className="blogs-details-categories__tags-label">Tags:</span>
            <div className="blogs-details-categories__tag-list">
              {postData.tags.map((tag, idx) => (
                <span key={idx} className="blogs-details-categories__tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </footer>

          {/* Discussion Section */}
          <section className="blogs-details-categories__comments-section">
            <h2 className="blogs-details-categories__section-title">
              Discussion ({comments.length})
            </h2>
            <div className="blogs-details-categories__comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="blogs-details-categories__comment-card">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="blogs-details-categories__comment-avatar"
                  />
                  <div className="blogs-details-categories__comment-body">
                    <div className="blogs-details-categories__comment-head">
                      <span className="blogs-details-categories__comment-author">{comment.author}</span>
                      <span className="blogs-details-categories__comment-date">{comment.date}</span>
                    </div>
                    <p className="blogs-details-categories__comment-message">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
                <article key={post.id} className="blogs-details-categories__recent-item">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blogs-details-categories__recent-thumb"
                  />
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
              {postData.tags.map((tag, idx) => (
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