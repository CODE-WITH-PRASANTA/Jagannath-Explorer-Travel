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

const HotelRoomDetailsReview = ({ hotel }) => {
  const phone = hotel?.phone || "+91 9876543210";
  const hotelName = hotel?.name || "the hotel";
  const ratingVal = hotel?.starRating ? Number(hotel.starRating) : 4.8;

  // Star rating renderer helper
  const renderStars = (rating = 5) => {
    return (
      <div className="HotelRoomDetailsReview-stars">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            style={{ color: i < rating ? "#f59e0b" : "#cbd5e1" }}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="HotelRoomDetailsReview">
      <div className="HotelRoomDetailsReview-container">
        
        {/* Left Column: Customer Reviews */}
        <div className="HotelRoomDetailsReview-left">
          
          <h2 className="HotelRoomDetailsReview-mainTitle">Guest Reviews</h2>

          {/* Rating Summary Box */}
          <div className="HotelRoomDetailsReview-ratingSummaryBox">
            <div className="HotelRoomDetailsReview-ratingLeft">
              <span className="HotelRoomDetailsReview-bigScore">{ratingVal}.0</span>
              <div className="HotelRoomDetailsReview-summaryStars">
                {renderStars(ratingVal)}
                <span className="HotelRoomDetailsReview-reviewCount">Verified Guest Rating</span>
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
                  alt="Amitav Mohanty"
                  className="HotelRoomDetailsReview-avatar"
                />
                <div className="HotelRoomDetailsReview-authorInfo">
                  <span className="HotelRoomDetailsReview-authorName">Amitav Mohanty,</span>
                  <span className="HotelRoomDetailsReview-date">12 August, 2024</span>
                </div>
              </div>

              {/* Sub Ratings */}
              <div className="HotelRoomDetailsReview-subRatings">
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Cleanliness</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Location</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Service</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Facilities</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Value for money</span>
                  {renderStars(5)}
                </div>
              </div>

              <p className="HotelRoomDetailsReview-comment">
                Exceptional hospitality and pristine cleanliness throughout our stay at {hotelName}. The staff was welcoming, check-in was seamless, and the room amenities exceeded our expectations.
              </p>

              <button className="HotelRoomDetailsReview-replyBtn">
                <FaReply className="HotelRoomDetailsReview-replyIcon" /> Reply (01)
              </button>

              {/* Nested Author Reply */}
              <div className="HotelRoomDetailsReview-nestedReply">
                <div className="HotelRoomDetailsReview-authorHeader">
                  <img
                    src={authorImg}
                    alt="Management Response"
                    className="HotelRoomDetailsReview-avatar"
                  />
                  <div className="HotelRoomDetailsReview-authorInfo">
                    <span className="HotelRoomDetailsReview-authorName">Management Response,</span>
                    <span className="HotelRoomDetailsReview-date">13 August, 2024</span>
                  </div>
                </div>
                <p className="HotelRoomDetailsReview-comment">
                  Thank you for your wonderful feedback, Amitav! We are thrilled that you enjoyed your stay at {hotelName} and look forward to welcoming you back soon.
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
                  alt="Priya Sharma"
                  className="HotelRoomDetailsReview-avatar"
                />
                <div className="HotelRoomDetailsReview-authorInfo">
                  <span className="HotelRoomDetailsReview-authorName">Priya Sharma,</span>
                  <span className="HotelRoomDetailsReview-date">28 July, 2024</span>
                </div>
              </div>

              <div className="HotelRoomDetailsReview-subRatings">
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Cleanliness</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Location</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Service</span>
                  {renderStars(4)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Facilities</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Value for money</span>
                  {renderStars(5)}
                </div>
              </div>

              <p className="HotelRoomDetailsReview-comment">
                The location was super convenient and peaceful. The room was well-appointed with comfortable bedding, high-speed WiFi, and excellent room service. Highly recommended for families and leisure travelers.
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
                  alt="Rajesh Kumar"
                  className="HotelRoomDetailsReview-avatar"
                />
                <div className="HotelRoomDetailsReview-authorInfo">
                  <span className="HotelRoomDetailsReview-authorName">Rajesh Kumar,</span>
                  <span className="HotelRoomDetailsReview-date">15 June, 2024</span>
                </div>
              </div>

              <div className="HotelRoomDetailsReview-subRatings">
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Cleanliness</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Location</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Service</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Facilities</span>
                  {renderStars(5)}
                </div>
                <div className="HotelRoomDetailsReview-ratingMetric">
                  <span className="HotelRoomDetailsReview-metricLabel">Value for money</span>
                  {renderStars(5)}
                </div>
              </div>

              <p className="HotelRoomDetailsReview-comment">
                Great value for money. The staff was extremely polite and attentive to all our requirements. The dining experience and breakfast spread were delightful.
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
                <span className="HotelRoomDetailsReview-inquiryTitle">Direct Inquiry & Booking</span>
                <span className="HotelRoomDetailsReview-phoneNumber">{phone}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HotelRoomDetailsReview;