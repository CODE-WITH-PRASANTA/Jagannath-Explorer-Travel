import React from 'react';
import './TourDetailsReview.css';

// React Icons
import { FaStar, FaStarHalfAlt, FaRegStar, FaReply } from 'react-icons/fa';

// WebP / Image imports from src/assets/
import avatar1 from '../../assets/img1.webp';
import avatarAuthor from '../../assets/img2.webp';
import avatar2 from '../../assets/img4.webp';
import avatar3 from '../../assets/img 10.webp';

const TourDetailsReview = () => {
  // SEO Schema Markup for Jagannatha Tour and Travels
  const schemaMarkup = {
    "@context": "https://schema.org/",
    "@type": "TouristAttraction",
    "name": "Jagannatha Tour and Travels",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "9.5",
      "bestRating": "10",
      "ratingCount": "2590"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Mr. Bowmik Haldar" },
        "datePublished": "2023-06-05",
        "reviewBody": "A solution that we came up with is to think of sanitary pads packaging as you would tea. Tea comes individually packaged",
        "reviewRating": { "@type": "Rating", "ratingValue": "4.5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Srileka Panday" },
        "datePublished": "2023-06-05",
        "reviewBody": "A solution that we came up with is to think of sanitary pads packaging as you would tea. Tea comes individually packaged",
        "reviewRating": { "@type": "Rating", "ratingValue": "4.5" }
      }
    ]
  };

  // Helper function to render star icons
  const renderStars = (rating = 4.5) => {
    return (
      <div className="TourDetailsReview-stars">
        <FaStar className="TourDetailsReview-starIcon" />
        <FaStar className="TourDetailsReview-starIcon" />
        <FaStar className="TourDetailsReview-starIcon" />
        <FaStar className="TourDetailsReview-starIcon" />
        <FaStarHalfAlt className="TourDetailsReview-starIcon" />
      </div>
    );
  };

  return (
    <section className="TourDetailsReview" aria-labelledby="review-heading">
      {/* Dynamic SEO JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="TourDetailsReview-container">
        {/* Main Section Header */}
        <h2 id="review-heading" className="TourDetailsReview-heading">
          Customer Review
        </h2>

        {/* Aggregate Rating Banner Card */}
        <div className="TourDetailsReview-summaryCard">
          <div className="TourDetailsReview-summaryLeft">
            <span className="TourDetailsReview-score">9.5</span>
            <div className="TourDetailsReview-summaryMeta">
              {renderStars(4.5)}
              <span className="TourDetailsReview-reviewCount">2590 Reviews</span>
            </div>
          </div>
          <button className="TourDetailsReview-ratingBtn">
            GIVE A RATING
          </button>
        </div>

        {/* Reviews List */}
        <div className="TourDetailsReview-list">

          {/* Review Item 1 */}
          <div className="TourDetailsReview-card">
            <div className="TourDetailsReview-userHeader">
              <img
                src={avatar1}
                alt="Mr. Bowmik Haldar - Jagannatha Tour and Travels Reviewer"
                className="TourDetailsReview-avatar"
              />
              <div className="TourDetailsReview-userInfo">
                <h3 className="TourDetailsReview-userName">
                  Mr. Bowmik Haldar, <span className="TourDetailsReview-date">05 June, 2023</span>
                </h3>
              </div>
            </div>

            {/* Criteria Rating Breakdown Grid */}
            <div className="TourDetailsReview-ratingsGrid">
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Overall</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Transport</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Food</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Destination</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Hospitality</span>
                {renderStars(4.5)}
              </div>
            </div>

            <p className="TourDetailsReview-text">
              A solution that we came up with is to think of sanitary pads packaging as you would tea. Tea comes individually packaged
            </p>

            <button className="TourDetailsReview-replyBtn">
              <FaReply className="TourDetailsReview-replyIcon" /> Reply (01)
            </button>

            {/* Nested Author Reply */}
            <div className="TourDetailsReview-nestedReply">
              <img
                src={avatarAuthor}
                alt="Author Response"
                className="TourDetailsReview-avatar"
              />
              <div className="TourDetailsReview-replyContent">
                <h4 className="TourDetailsReview-userName">
                  Author Response, <span className="TourDetailsReview-date">05 June, 2023</span>
                </h4>
                <p className="TourDetailsReview-text">
                  Thanks for your review.
                </p>
                <button className="TourDetailsReview-replyBtn">
                  <FaReply className="TourDetailsReview-replyIcon" /> Reply
                </button>
              </div>
            </div>
          </div>

          <hr className="TourDetailsReview-divider" />

          {/* Review Item 2 */}
          <div className="TourDetailsReview-card">
            <div className="TourDetailsReview-userHeader">
              <img
                src={avatar2}
                alt="Srileka Panday - Jagannatha Tour and Travels Reviewer"
                className="TourDetailsReview-avatar"
              />
              <div className="TourDetailsReview-userInfo">
                <h3 className="TourDetailsReview-userName">
                  Srileka Panday, <span className="TourDetailsReview-date">05 June, 2023</span>
                </h3>
              </div>
            </div>

            <div className="TourDetailsReview-ratingsGrid">
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Overall</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Transport</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Food</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Destination</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Hospitality</span>
                {renderStars(4.5)}
              </div>
            </div>

            <p className="TourDetailsReview-text">
              A solution that we came up with is to think of sanitary pads packaging as you would tea. Tea comes individually packaged
            </p>

            <button className="TourDetailsReview-replyBtn">
              <FaReply className="TourDetailsReview-replyIcon" /> Reply
            </button>
          </div>

          <hr className="TourDetailsReview-divider" />

          {/* Review Item 3 */}
          <div className="TourDetailsReview-card">
            <div className="TourDetailsReview-userHeader">
              <img
                src={avatar3}
                alt="Mr. Bowmik Haldar - Jagannatha Tour and Travels Reviewer"
                className="TourDetailsReview-avatar"
              />
              <div className="TourDetailsReview-userInfo">
                <h3 className="TourDetailsReview-userName">
                  Mr. Bowmik Haldar, <span className="TourDetailsReview-date">05 June, 2023</span>
                </h3>
              </div>
            </div>

            <div className="TourDetailsReview-ratingsGrid">
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Overall</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Transport</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Food</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Destination</span>
                {renderStars(4.5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Hospitality</span>
                {renderStars(4.5)}
              </div>
            </div>

            <p className="TourDetailsReview-text">
              However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...
            </p>

            <button className="TourDetailsReview-replyBtn">
              <FaReply className="TourDetailsReview-replyIcon" /> Reply
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TourDetailsReview;