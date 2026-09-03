import React from 'react';
import './BlogsDetailsSection.css';

import heroBanner from '../../assets/blog-details-img1.webp'; 

import { 
  FaFacebookF, 
  FaXTwitter, 
  FaPinterestP, 
  FaInstagram, 
  FaReply,
  FaChevronLeft,
  FaChevronRight 
} from 'react-icons/fa6';

const tags = ['Adventure', 'City Tour', 'Road Trip', 'Tourism'];

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
  return (
    <article className="BlogsDetailsSection">
      {/* Hero Media with Imported Asset */}
      <div className="BlogsDetailsSection-heroWrapper">
        <img
          src={heroBanner}
          alt="Two backpackers traversing a scenic rocky canyon trail"
          className="BlogsDetailsSection-heroImage"
          loading="eager"
        />
      </div>

      {/* Article Content */}
      <div className="BlogsDetailsSection-content">
        <h1 className="BlogsDetailsSection-title">Our Begin Now To Beingonl.</h1>
        <p className="BlogsDetailsSection-paragraph">
          Vestibulum quis odio ut dui malesuada ornare ut id tellus. Curabitur viverra at magna ac bibendum. 
          Aliquam erat volutpat. Proin rhoncus est ac ipsum varius fermentum. Integer a odio ornare mauris 
          pharetra suscipitot. Integer vulputate elit erat. Vestibulum quam velit, sagittis et ipsum id.
        </p>
      </div>

      {/* Meta Bar: Tags & Social Sharing */}
      <div className="BlogsDetailsSection-metaBar">
        <div className="BlogsDetailsSection-tags">
          {tags.map((tag) => (
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
        <a href="#prev-post" className="BlogsDetailsSection-navItem BlogsDetailsSection-navPrev">
          <span className="BlogsDetailsSection-navIconBox">
            <FaChevronLeft />
          </span>
          <div className="BlogsDetailsSection-navText">
            <span className="BlogsDetailsSection-navDirection">Prev Post</span>
            <span className="BlogsDetailsSection-navPostTitle">
              Consulting vs. In-House Expertise: Finding the Right Balance
            </span>
          </div>
        </a>

        <div className="BlogsDetailsSection-navDivider" />

        <a href="#next-post" className="BlogsDetailsSection-navItem BlogsDetailsSection-navNext">
          <div className="BlogsDetailsSection-navText BlogsDetailsSection-navTextRight">
            <span className="BlogsDetailsSection-navDirection">Next Post</span>
            <span className="BlogsDetailsSection-navPostTitle">
              Consulting Industry Adapts to the Changing Business Landscape
            </span>
          </div>
          <span className="BlogsDetailsSection-navIconBox">
            <FaChevronRight />
          </span>
        </a>
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