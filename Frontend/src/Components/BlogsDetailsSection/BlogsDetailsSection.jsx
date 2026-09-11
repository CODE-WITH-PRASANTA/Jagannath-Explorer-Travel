import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BlogsDetailsSection.css';
import API, { IMG_URL } from "../../api/axios";

import { 
  FaFacebookF, 
  FaXTwitter, 
  FaPinterestP, 
  FaInstagram, 
  FaReply,
  FaChevronLeft,
  FaChevronRight 
} from 'react-icons/fa6';

const commentsData = [
  {
    id: 1,
    author: 'Mr. Bowmik Haldar',
    date: '05 June, 2023',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
    replyCount: 2,
    replies: [
      {
        id: 101,
        author: 'Jacoline Juie',
        date: '05 June, 2023',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        content: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
        replyCount: null,
      },
      {
        id: 102,
        author: 'Robert Smith',
        date: '05 June, 2023',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        content: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
        replyCount: null,
      }
    ]
  },
  {
    id: 2,
    author: 'Srileka Panday',
    date: '05 June, 2023',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    content: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
    replyCount: 2,
    replies: []
  },
  {
    id: 3,
    author: 'Mr. Bowmik Haldar',
    date: '05 June, 2023',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    content: "However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...",
    replyCount: 2,
    replies: []
  }
];

const BlogsDetailsSection = () => {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [adjacentPosts, setAdjacentPosts] = useState({ prev: null, next: null });
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const blogId = queryParams.get('id');

  useEffect(() => {
    fetchBlogDetails();
  }, [blogId]);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get('/blogs');
      const rawData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.data || response.data.blogs || []);

      if (rawData.length === 0) return;

      // Find active blog index
      let currentIndex = rawData.findIndex(b => (b._id === blogId || b.id === blogId));
      if (currentIndex === -1) currentIndex = 0; // Fallback to first item

      const active = rawData[currentIndex];
      let imageUrl = '';
      if (active.image) {
        imageUrl = active.image.startsWith('http') ? active.image : `${IMG_URL}${active.image}`;
      }

      setCurrentBlog({
        id: active._id || active.id,
        title: active.title || '',
        content: active.content || '',
        category: active.category || 'Adventure',
        image: imageUrl,
        tags: [active.category, 'Adventure', 'Tourism']
      });

      // Calculate prev and next posts dynamically based on array layout
      const prevItem = currentIndex > 0 ? rawData[currentIndex - 1] : null;
      const nextItem = currentIndex < rawData.length - 1 ? rawData[currentIndex + 1] : null;

      setAdjacentPosts({
        prev: prevItem ? { id: prevItem._id || prevItem.id, title: prevItem.title } : null,
        next: nextItem ? { id: nextItem._id || nextItem.id, title: nextItem.title } : null
      });

    } catch (error) {
      console.error('Error fetching blog details section data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavClick = (id) => {
    if (id) {
      navigate(`/blogdetails?id=${id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading content...</div>;
  }

  if (!currentBlog) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Blog post not found.</div>;
  }

  return (
    <article className="BlogsDetailsSection">
      {/* Hero Media with Live Database Asset */}
      {currentBlog.image && (
        <div className="BlogsDetailsSection-heroWrapper">
          <img
            src={currentBlog.image}
            alt={currentBlog.title}
            className="BlogsDetailsSection-heroImage"
            loading="eager"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="BlogsDetailsSection-content">
        <h1 className="BlogsDetailsSection-title">{currentBlog.title}</h1>
        <p className="BlogsDetailsSection-paragraph">
          {currentBlog.content}
        </p>
      </div>

      {/* Meta Bar: Tags & Social Sharing */}
      <div className="BlogsDetailsSection-metaBar">
        <div className="BlogsDetailsSection-tags">
          {currentBlog.tags.map((tag) => (
            <button key={tag} type="button" className="BlogsDetailsSection-tagPill">
              {tag}
            </button>
          ))}
        </div>
        <div className="BlogsDetailsSection-share">
          <span className="BlogsDetailsSection-shareLabel">Share On:</span>
          <div className="BlogsDetailsSection-shareIcons">
            <a href="#share-facebook" aria-label="Share on Facebook" className="BlogsDetailsSection-shareLink">
              <FaFacebookF />
            </a>
            <a href="#share-twitter" aria-label="Share on X" className="BlogsDetailsSection-shareLink">
              <FaXTwitter />
            </a>
            <a href="#share-pinterest" aria-label="Share on Pinterest" className="BlogsDetailsSection-shareLink">
              <FaPinterestP />
            </a>
            <a href="#share-instagram" aria-label="Share on Instagram" className="BlogsDetailsSection-shareLink">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Post Navigation */}
      <div className="BlogsDetailsSection-navigation">
        {adjacentPosts.prev ? (
          <button 
            type="button" 
            onClick={() => handleNavClick(adjacentPosts.prev.id)} 
            className="BlogsDetailsSection-navItem BlogsDetailsSection-navPrev"
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
          >
            <span className="BlogsDetailsSection-navIconBox">
              <FaChevronLeft />
            </span>
            <div className="BlogsDetailsSection-navText">
              <span className="BlogsDetailsSection-navDirection">Prev Post</span>
              <span className="BlogsDetailsSection-navPostTitle">
                {adjacentPosts.prev.title}
              </span>
            </div>
          </button>
        ) : <div />}

        <div className="BlogsDetailsSection-navDivider" />

        {adjacentPosts.next ? (
          <button 
            type="button" 
            onClick={() => handleNavClick(adjacentPosts.next.id)} 
            className="BlogsDetailsSection-navItem BlogsDetailsSection-navNext"
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right', width: '100%' }}
          >
            <div className="BlogsDetailsSection-navText BlogsDetailsSection-navTextRight">
              <span className="BlogsDetailsSection-navDirection">Next Post</span>
              <span className="BlogsDetailsSection-navPostTitle">
                {adjacentPosts.next.title}
              </span>
            </div>
            <span className="BlogsDetailsSection-navIconBox">
              <FaChevronRight />
            </span>
          </button>
        ) : <div />}
      </div>

      {/* Comments Section */}
      <section className="BlogsDetailsSection-commentsSection">
        <div className="BlogsDetailsSection-commentsHeader">
          <h2 className="BlogsDetailsSection-commentsCountTitle">Comments (03)</h2>
          <div className="BlogsDetailsSection-commentsHeaderLine" />
        </div>

        <div className="BlogsDetailsSection-commentsList">
          {commentsData.map((comment) => (
            <div key={comment.id} className="BlogsDetailsSection-commentBlock">
              <div className="BlogsDetailsSection-commentItem">
                <img 
                  src={comment.avatar} 
                  alt={comment.author} 
                  className="BlogsDetailsSection-commentAvatar" 
                  loading="lazy"
                />
                <div className="BlogsDetailsSection-commentBody">
                  <div className="BlogsDetailsSection-commentMeta">
                    <span className="BlogsDetailsSection-commentAuthor">{comment.author}</span>
                    <span className="BlogsDetailsSection-commentDate">, {comment.date}</span>
                  </div>
                  <p className="BlogsDetailsSection-commentContent">{comment.content}</p>
                  <button type="button" className="BlogsDetailsSection-commentReplyBtn">
                    <FaReply className="BlogsDetailsSection-replyIcon" /> Reply {comment.replyCount ? `(0${comment.replyCount})` : ''}
                  </button>
                </div>
              </div>

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="BlogsDetailsSection-commentReplies">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="BlogsDetailsSection-commentItem BlogsDetailsSection-replyItem">
                      <img 
                        src={reply.avatar} 
                        alt={reply.author} 
                        className="BlogsDetailsSection-commentAvatar" 
                        loading="lazy"
                      />
                      <div className="BlogsDetailsSection-commentBody">
                        <div className="BlogsDetailsSection-commentMeta">
                          <span className="BlogsDetailsSection-commentAuthor">{reply.author}</span>
                          <span className="BlogsDetailsSection-commentDate">, {reply.date}</span>
                        </div>
                        <p className="BlogsDetailsSection-commentContent">{reply.content}</p>
                        <button type="button" className="BlogsDetailsSection-commentReplyBtn">
                          <FaReply className="BlogsDetailsSection-replyIcon" /> Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default BlogsDetailsSection;