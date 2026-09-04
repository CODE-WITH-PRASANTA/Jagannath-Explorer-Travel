import React, { useState } from 'react';
import './BlogsImageSection.css';

import blogImg1 from '../../assets/blog-card1.webp';
import blogImg2 from '../../assets/blog-card2.webp';
import blogImg3 from '../../assets/blog-card3.webp';
import blogImg4 from '../../assets/blog-card4.webp';
import blogImg5 from '../../assets/blog-card5.webp';

const blogPosts = [
  {
    id: 1,
    image: blogImg1,
    date: { day: '20', month: 'August' },
    author: 'Zakai Math',
    category: 'Adventure',
    title: 'Semper Nulla Vestibul Umdot Vitae Morbi Semper.',
    readTime: '5 Min Read',
    slug: '#',
  },
  {
    id: 2,
    image: blogImg2,
    date: { day: '20', month: 'August' },
    author: 'Tourism',
    category: 'Locan Stany',
    title: 'Nisi Laoreet Etiam Fringilland Mauris Vitae Arcu.',
    readTime: '5 Min Read',
    slug: '#',
  },
  {
    id: 3,
    image: blogImg3,
    date: { day: '20', month: 'August' },
    author: 'Kaiser Becio',
    category: 'Wildlife',
    title: 'The Nomadic Explorer Discovi Hidden Gems..',
    readTime: '5 Min Read',
    slug: '#',
  },
  {
    id: 4,
    image: blogImg4,
    date: { day: '20', month: 'August' },
    author: 'Kaiser Becio',
    category: 'Wildlife',
    title: 'Passport Diariesoni Journeys And Experiences',
    readTime: '5 Min Read',
    slug: '#',
  },
  {
    id: 5,
    image: blogImg5,
    date: { day: '20', month: 'August' },
    author: 'Kaiser Becio',
    category: 'Wildlife',
    title: 'Roaming Free Adventures Off The Beaten Path.',
    readTime: '5 Min Read',
    slug: '#',
  },
];

const BlogsImageSection = () => {
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <section className="blogs-image-section">
      <div className="blogs-image-section__container">
        {/* Card Grid */}
        <div className="blogs-image-section__grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blogs-image-section__card">
              {/* Media Container & Date Badge */}
              <div className="blogs-image-section__media">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blogs-image-section__img"
                  loading="lazy"
                />
                <div className="blogs-image-section__date-badge">
                  <span className="blogs-image-section__date-day">{post.date.day}</span>
                  <span className="blogs-image-section__date-month">{post.date.month}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="blogs-image-section__body">
                <div className="blogs-image-section__meta">
                  <span className="blogs-image-section__author">
                    By <a href="#author">{post.author}</a>
                  </span>
                  <span className="blogs-image-section__dot">•</span>
                  <span className="blogs-image-section__category">{post.category}</span>
                </div>

                <h3 className="blogs-image-section__title">
                  <a href={post.slug}>{post.title}</a>
                </h3>

                {/* Footer with Link & Time */}
                <div className="blogs-image-section__footer">
                  <a href={post.slug} className="blogs-image-section__view-link">
                    <span>View Post</span>
                    <svg
                      className="blogs-image-section__arrow-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>

                  <div className="blogs-image-section__read-time">
                    <svg
                      className="blogs-image-section__flame-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 23c-4.97 0-9-4.03-9-9 0-4.02 2.65-7.42 6.35-8.52.41-.12.8.2.78.63-.08 1.49.2 3.03.88 4.29.18.34.6.48.94.33.34-.14.56-.47.54-.84-.1-1.89.5-3.8 1.74-5.26.27-.32.74-.39 1.09-.17 3.51 2.22 5.68 6.07 5.68 10.54 0 4.97-4.03 9-9 9z" />
                    </svg>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="blogs-image-section__pagination" aria-label="Pagination">
          <button
            className="blogs-image-section__page-btn blogs-image-section__page-nav"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`blogs-image-section__page-btn blogs-image-section__page-num ${
                currentPage === page ? 'blogs-image-section__page-num--active' : ''
              }`}
            >
              {page}
            </button>
          ))}

          <span className="blogs-image-section__pagination-ellipsis">...</span>

          <button
            onClick={() => setCurrentPage(6)}
            className={`blogs-image-section__page-btn blogs-image-section__page-num ${
              currentPage === 6 ? 'blogs-image-section__page-num--active' : ''
            }`}
          >
            6
          </button>

          <button
            className="blogs-image-section__page-btn blogs-image-section__page-nav"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 6))}
            disabled={currentPage === 6}
            aria-label="Next Page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsImageSection;