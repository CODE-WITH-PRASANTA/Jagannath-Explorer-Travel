import React, { useEffect, useRef, useState } from "react";
import {
  FaUserFriends,
  FaHandsHelping,
  FaThumbsUp,
  FaUserTie,
  FaTripadvisor,
} from "react-icons/fa";

import "./Reviewer.css";

const ReviewerCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(
        start + (target - start) * easedProgress
      );

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <>
      <span className="Reviewer__counter">
        {count}
      </span>
      <span>{suffix}</span>
    </>
  );
};

const Reviewer = () => {
  const reviewerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (reviewerRef.current) {
      observer.observe(reviewerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={reviewerRef}
      className={`Reviewer ${
        isVisible ? "Reviewer--visible" : ""
      }`}
    >
      <div className="Reviewer__container">

        <div className="Reviewer__statistics">

          <div className="Reviewer__stat-item">
            <div className="Reviewer__icon">
              <FaUserFriends />
            </div>

            <div className="Reviewer__stat-content">
              <div className="Reviewer__number">
                {isVisible && (
                  <ReviewerCounter
                    target={60}
                    suffix="k+"
                  />
                )}
              </div>

              <span className="Reviewer__label">
                Happy Traveler
              </span>
            </div>
          </div>

          <div className="Reviewer__divider" />

          <div className="Reviewer__stat-item">
            <div className="Reviewer__icon">
              <FaHandsHelping />
            </div>

            <div className="Reviewer__stat-content">
              <div className="Reviewer__number">
                {isVisible && (
                  <ReviewerCounter
                    target={60}
                    suffix="k+"
                  />
                )}
              </div>

              <span className="Reviewer__label">
                Tours Success
              </span>
            </div>
          </div>

          <div className="Reviewer__divider" />

          <div className="Reviewer__stat-item">
            <div className="Reviewer__icon">
              <FaThumbsUp />
            </div>

            <div className="Reviewer__stat-content">
              <div className="Reviewer__number">
                {isVisible && (
                  <ReviewerCounter
                    target={60}
                    suffix="%"
                  />
                )}
              </div>

              <span className="Reviewer__label">
                Positives Review
              </span>
            </div>
          </div>

          <div className="Reviewer__divider" />

          <div className="Reviewer__stat-item">
            <div className="Reviewer__icon">
              <FaUserTie />
            </div>

            <div className="Reviewer__stat-content">
              <div className="Reviewer__number">
                {isVisible && (
                  <ReviewerCounter
                    target={60}
                    suffix="+"
                  />
                )}
              </div>

              <span className="Reviewer__label">
                Travel Guide
              </span>
            </div>
          </div>

        </div>

        <div className="Reviewer__rating-section">
          <div className="Reviewer__rating-wrapper">

            <strong className="Reviewer__excellent">
              Excellent!
            </strong>

            <div className="Reviewer__rating-dots">
              <span className="Reviewer__rating-dot" />
              <span className="Reviewer__rating-dot" />
              <span className="Reviewer__rating-dot" />
              <span className="Reviewer__rating-dot" />

              <span className="Reviewer__rating-dot Reviewer__rating-dot--half" />
            </div>

            <div className="Reviewer__rating-text">
              <strong>5.0</strong>
              <span>Rating out of</span>
              <strong>5.0</strong>
              <span>based on</span>

              <a
                href="#reviews"
                className="Reviewer__reviews-link"
              >
                245354
              </a>

              <span>reviews</span>
            </div>

            <div className="Reviewer__tripadvisor">
              <div className="Reviewer__tripadvisor-icon">
                <FaTripadvisor />
              </div>

              <span>Tripadvisor</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Reviewer;