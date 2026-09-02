import React from "react";
import { FaArrowUpRightFromSquare, FaFire } from "react-icons/fa6";

import "./Article.css";

// =====================================================
// IMPORT ARTICLE IMAGES
// =====================================================

import articleImage1 from "../../assets/blog-card-img1.webp";
import articleImage2 from "../../assets/blog-card-img2.webp";


const Article = () => {
  const articles = [
    {
      id: 1,
      image: articleImage1,
      day: "20",
      month: "August",
      author: "Rison Donec",
      category: "Adventure",
      title:
        "Our Begin Now What Your Will Bean Forest This Our Agency.",
      readTime: "5 Min Read",
    },

    {
      id: 2,
      image: articleImage2,
      day: "15",
      month: "June",
      author: "Dale Stayel",
      category: "Tourism",
      title:
        "Aliquam Gravida Purus Diam Separate Bibendum Dolore.",
      readTime: "5 Min Read",
    },
  ];

  return (
    <section className="Article">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="Article__header">

        <div className="Article__label">
          <span>Article</span>
        </div>

        <h2 className="Article__heading">
          Travel Article Enthusiast
        </h2>

      </div>


      {/* =================================================
          ARTICLE GRID
      ================================================= */}

      <div className="Article__grid">

        {articles.map((article) => (
          <article
            className="Article__card"
            key={article.id}
          >

            {/* ===========================================
                IMAGE AREA
            ============================================ */}

            <div className="Article__image-wrapper">

              <img
                src={article.image}
                alt={article.title}
                className="Article__image"
              />


              {/* =========================================
                  DATE BADGE
              ========================================== */}

              <div className="Article__date">

                <span className="Article__date-day">
                  {article.day}
                </span>

                <span className="Article__date-month">
                  {article.month}
                </span>

              </div>

            </div>


            {/* ===========================================
                CONTENT BOX
            ============================================ */}

            <div className="Article__content">

              {/* META */}

              <div className="Article__meta">

                <span className="Article__author">
                  By{" "}
                  <a href="#author">
                    {article.author}
                  </a>
                </span>

                <span className="Article__meta-dot">
                  ●
                </span>

                <span className="Article__category">
                  {article.category}
                </span>

              </div>


              {/* TITLE */}

              <h3 className="Article__title">
                {article.title}
              </h3>


              {/* BOTTOM AREA */}

              <div className="Article__bottom">

                <a
                  href="#view-post"
                  className="Article__view"
                >
                  <span>
                    View Post
                  </span>

                  <span className="Article__view-icon">
                    <FaArrowUpRightFromSquare />
                  </span>
                </a>


                <div className="Article__read">

                  <FaFire />

                  <span>
                    {article.readTime}
                  </span>

                </div>

              </div>

            </div>

          </article>
        ))}

      </div>

    </section>
  );
};

export default Article;