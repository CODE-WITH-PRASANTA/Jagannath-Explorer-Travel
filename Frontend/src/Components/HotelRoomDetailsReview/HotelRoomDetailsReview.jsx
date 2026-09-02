import React from 'react';
import './HotelRoomDetailsReview.css';

// React Icons
import {
  FaStar,
  FaStarHalfAlt,
  FaPhoneAlt,
  FaReply
} from 'react-icons/fa';

// Webp Image Imports
import user1Img from '../../assets/img4.webp';
import user2Img from '../../assets/img3.webp';
import user3Img from '../../assets/img2.webp';
import authorImg from '../../assets/img1.webp';
import supportAgentImg from '../../assets/img 10.webp';

const HotelRoomDetailsReview = () => {
  // Star rating renderer helper
  const renderStars = (rating = 4.5) => {
    return (
      <div className="HotelRoomDetailsReview-stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </div>
    );
  };

  return (
    <section className="HotelRoomDetailsReview">
      <div className="HotelRoomDetailsReview-container">
        
        {/* Left Column: Customer Reviews */}
        <div className="HotelRoomDetailsReview-left">
          
          <h2 className="HotelRoomDetailsReview-mainTitle">Customer Review</h2>

          {/* Rating Summary Box */}
          <div className="HotelRoomDetailsReview-ratingSummaryBox">
            <div className="HotelRoomDetailsReview-ratingLeft">
              <span className="HotelRoomDetailsReview-bigScore">9.5</span>
              <div className="HotelRoomDetailsReview-summaryStars">
                {renderStars(4.5)}
                <span className="HotelRoomDetailsReview-reviewCount">2590 Reviews</span>
              </div>
            </div>
            <button className="HotelRoomDetailsReview-giveRatingBtn">
              GIVE A RATING
            </button>
          </div>

          {/* Review List */}
          <div className="HotelRoomDetailsReview-list">
            
            {/* Review 1 */}
            <div className="HotelRoomDetailsReview-item">
              <div className="HotelRoomDetailsReview-authorHeader">
                <img
                  src={user1Img}
                  alt="Mr. Bowmik Haldar"
                  className="HotelRoomDetailsReview-avatar"
                />
                <div className="HotelRoomDetailsReview-authorInfo">
                  <span className="HotelRoomDetailsReview-authorName">Mr. Bowmik Haldar,</span>
                  <span className="HotelRoomDetailsReview-date">05 June, 2023</span>
                </div>
              </div>

              {/* Sub Ratings */}
              <div className="HotelRoomDetailsReview-subRatings">
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Cleanliness</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Location</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Service</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Facilities</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Value for money</span>
                  {renderStars(4.5)}
                </div>
              </div>

              <p className="HotelRoomDetailsReview-comment">
                A solution that we came up with is to think of sanitary pads packaging as you would tea. Tea comes individually packaged
              </p>

              <button className="HotelRoomDetailsReview-replyBtn">
                <FaReply className="HotelRoomDetailsReview-replyIcon" /> Reply (01)
              </button>

              {/* Nested Author Reply */}
              <div className="HotelRoomDetailsReview-nestedReply">
                <div className="HotelRoomDetailsReview-authorHeader">
                  <img
                    src={authorImg}
                    alt="Author Response"
                    className="HotelRoomDetailsReview-avatar"
                  />
                  <div className="HotelRoomDetailsReview-authorInfo">
                    <span className="HotelRoomDetailsReview-authorName">Author Response,</span>
                    <span className="HotelRoomDetailsReview-date">05 June, 2023</span>
                  </div>
                </div>
                <p className="HotelRoomDetailsReview-comment">
                  Thanks for your review.
                </p>
                <button className="HotelRoomDetailsReview-replyBtn">
                  <FaReply className="HotelRoomDetailsReview-replyIcon" /> Reply
                </button>
              </div>
            </div>

            {/* Review 2 */}
            <div className="HotelRoomDetailsReview-item">
              <div className="HotelRoomDetailsReview-authorHeader">
                <img
                  src={user2Img}
                  alt="Srileka Panday"
                  className="HotelRoomDetailsReview-avatar"
                />
                <div className="HotelRoomDetailsReview-authorInfo">
                  <span className="HotelRoomDetailsReview-authorName">Srileka Panday,</span>
                  <span className="HotelRoomDetailsReview-date">05 June, 2023</span>
                </div>
              </div>

              <div className="HotelRoomDetailsReview-subRatings">
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Cleanliness</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Location</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Service</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Facilities</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Value for money</span>
                  {renderStars(4.5)}
                </div>
              </div>

              <p className="HotelRoomDetailsReview-comment">
                A solution that we came up with is to think of sanitary pads packaging as you would tea. Tea comes individually packaged
              </p>

              <button className="HotelRoomDetailsReview-replyBtn">
                <FaReply className="HotelRoomDetailsReview-replyIcon" /> Reply
              </button>
            </div>

            {/* Review 3 */}
            <div className="HotelRoomDetailsReview-item">
              <div className="HotelRoomDetailsReview-authorHeader">
                <img
                  src={user3Img}
                  alt="Mr. Bowmik Haldar"
                  className="HotelRoomDetailsReview-avatar"
                />
                <div className="HotelRoomDetailsReview-authorInfo">
                  <span className="HotelRoomDetailsReview-authorName">Mr. Bowmik Haldar,</span>
                  <span className="HotelRoomDetailsReview-date">05 June, 2023</span>
                </div>
              </div>

              <div className="HotelRoomDetailsReview-subRatings">
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Cleanliness</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Location</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Service</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Facilities</span>
                  {renderStars(4.5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Value for money</span>
                  {renderStars(4.5)}
                </div>
              </div>

              <p className="HotelRoomDetailsReview-comment">
                However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...
              </p>

              <button className="HotelRoomDetailsReview-replyBtn">
                <FaReply className="HotelRoomDetailsReview-replyIcon" /> Reply
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Inquiry Sidebar Banner */}
        <div className="HotelRoomDetailsReview-right">
          <div className="HotelRoomDetailsReview-inquiryCard">
            <img
              src={supportAgentImg}
              alt="Customer Support"
              className="HotelRoomDetailsReview-agentImg"
            />
            <div className="HotelRoomDetailsReview-inquiryBanner">
              <div className="HotelRoomDetailsReview-phoneIconCircle">
                <FaPhoneAlt />
              </div>
              <div className="HotelRoomDetailsReview-inquiryTextGroup">
                <span className="HotelRoomDetailsReview-inquiryTitle">To More Inquiry</span>
                <span className="HotelRoomDetailsReview-phoneNumber">+990-737 621 432</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HotelRoomDetailsReview;