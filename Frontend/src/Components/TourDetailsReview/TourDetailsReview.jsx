import React from 'react';
import './TourDetailsReview.css';

// React Icons
import { FaStar, FaStarHalfAlt, FaReply } from 'react-icons/fa';

// WebP / Image imports from src/assets/
import avatar1 from '../../assets/img1.webp';
import avatarAuthor from '../../assets/img2.webp';
import avatar2 from '../../assets/img4.webp';
import avatar3 from '../../assets/img 10.webp';

const TourDetailsReview = ({ tour }) => {
  const tourTitle = tour?.title || "Odisha Holiday Tour";
  const tourDestination = tour?.destination || "Puri & Konark";

  // Dynamic SEO Schema Markup for Jagannatha Tour and Travels
  const schemaMarkup = {
    "@context": "https://schema.org/",
    "@type": "TouristAttraction",
    "name": `Jagannatha Tour and Travels - ${tourTitle}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "1280"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Bhabani Shankar Patnaik" },
        "datePublished": "2024-04-12",
        "reviewBody": `Our tour to ${tourDestination} was exceptionally organized. Vehicle was clean, driver was polite, and all darshan & sightseeing timings were accurately managed.`,
        "reviewRating": { "@type": "Rating", "ratingValue": "5.0" }
      }
    ]
  };

  // Helper function to render star icons
  const renderStars = (rating = 5) => {
    return (
      <div className="TourDetailsReview-stars">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className="TourDetailsReview-starIcon"
            style={{ color: i < rating ? "#f59e0b" : "#cbd5e1" }}
          />
        ))}
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
          Customer Reviews
        </h2>

        {/* Aggregate Rating Banner Card */}
        <div className="TourDetailsReview-summaryCard">
          <div className="TourDetailsReview-summaryLeft">
            <span className="TourDetailsReview-score">4.9</span>
            <div className="TourDetailsReview-summaryMeta">
              {renderStars(5)}
              <span className="TourDetailsReview-reviewCount">Verified Traveler Reviews</span>
            </div>
          </div>
          <button 
            type="button"
            className="TourDetailsReview-ratingBtn"
            onClick={() => window.location.href = "tel:9668892441"}
          >
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
                alt="Bhabani Shankar Patnaik - Verified Traveler"
                className="TourDetailsReview-avatar"
              />
              <div className="TourDetailsReview-userInfo">
                <h3 className="TourDetailsReview-userName">
                  Bhabani Shankar Patnaik, <span className="TourDetailsReview-date">12 April, 2024</span>
                </h3>
              </div>
            </div>

            {/* Criteria Rating Breakdown Grid */}
            <div className="TourDetailsReview-ratingsGrid">
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Overall</span>
                {renderStars(5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Transport</span>
                {renderStars(5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Guide Service</span>
                {renderStars(5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Sightseeing</span>
                {renderStars(5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Hospitality</span>
                {renderStars(5)}
              </div>
            </div>

            <p className="TourDetailsReview-text">
              We booked the {tourTitle} with Jagannath Explorer Travel. The whole itinerary covering {tourDestination} was seamlessly executed. The cab arrived on time, hotel transfers were smooth, and our family had a memorable spiritual journey.
            </p>

            <button type="button" className="TourDetailsReview-replyBtn">
              <FaReply className="TourDetailsReview-replyIcon" /> Reply (01)
            </button>

            {/* Nested Author Reply */}
            <div className="TourDetailsReview-nestedReply">
              <img
                src={avatarAuthor}
                alt="Jagannath Explorer Team"
                className="TourDetailsReview-avatar"
              />
              <div className="TourDetailsReview-replyContent">
                <h4 className="TourDetailsReview-userName">
                  Jagannath Explorer Team, <span className="TourDetailsReview-date">13 April, 2024</span>
                </h4>
                <p className="TourDetailsReview-text">
                  Jai Jagannath! Thank you so much for traveling with us, Bhabani Ji. We are honored to have hosted your family tour.
                </p>
                <button type="button" className="TourDetailsReview-replyBtn">
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
                alt="Rashmi Ranjan Das - Verified Traveler"
                className="TourDetailsReview-avatar"
              />
              <div className="TourDetailsReview-userInfo">
                <h3 className="TourDetailsReview-userName">
                  Rashmi Ranjan Das, <span className="TourDetailsReview-date">28 March, 2024</span>
                </h3>
              </div>
            </div>

            <div className="TourDetailsReview-ratingsGrid">
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Overall</span>
                {renderStars(5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Transport</span>
                {renderStars(5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Guide Service</span>
                {renderStars(5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Sightseeing</span>
                {renderStars(5)}
              </div>
              <div className="TourDetailsReview-ratingCol">
                <span className="TourDetailsReview-ratingLabel">Hospitality</span>
                {renderStars(5)}
              </div>
            </div>

            <p className="TourDetailsReview-text">
              Excellent travel agency in Odisha! Everything promised in the package was delivered with highest quality. Transparent pricing and very courteous driver.
            </p>

            <button type="button" className="TourDetailsReview-replyBtn">
              <FaReply className="TourDetailsReview-replyIcon" /> Reply
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TourDetailsReview;