
import React from "react";
import { Helmet } from "react-helmet-async";
import {
  FaArrowUpRightFromSquare,
  FaFire,
} from "react-icons/fa6";

import "./Article.css";

// =====================================================
// IMPORT ARTICLE IMAGES
// =====================================================

import articleImage1 from "../../assets/wedo.webp";
import articleImage2 from "../../assets/odisha23.webp";

// =====================================================
// ARTICLE COMPONENT
// =====================================================

const Article = () => {
  const articles = [
    {
      id: 1,
      image: articleImage1,
      day: "20",
      month: "August",
      author: "Jagannath Explorer Travels",
      category: "Odisha Tourism",
      title:
        "Top Places to Visit in Odisha: A Complete Travel Guide",
      readTime: "5 Min Read",
      slug: "/blog/top-places-to-visit-in-odisha",
    },

    {
      id: 2,
      image: articleImage2,
      day: "15",
      month: "June",
      author: "Jagannath Explorer Travels",
      category: "Travel Guide",
      title:
        "Best Odisha Tour Packages for an Unforgettable Holiday",
      readTime: "5 Min Read",
      slug: "/blog/best-odisha-tour-packages",
    },
  ];

  // =====================================================
  // SEO STRUCTURED DATA
  // =====================================================

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Jagannath Explorer Travels Travel Blog",
    description:
      "Travel guides, Odisha tourism information, tour packages and travel tips from Jagannath Explorer Travels in Bhubaneswar, Odisha.",
    publisher: {
      "@type": "TravelAgency",
      name: "Jagannath Explorer Travels",
      telephone: "+91-9668892441",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        postalCode: "751002",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      {/* =====================================================
          SEO / HELMET
      ===================================================== */}

      <Helmet>

        {/* Primary SEO */}

        <title>
          Odisha Travel Blog | Tour Packages & Travel Guide | Jagannath Explorer Travels
        </title>

        <meta
          name="description"
          content="Explore Odisha travel guides, tourism destinations, tour packages and travel tips with Jagannath Explorer Travels, a tour and travel agency in Bhubaneswar, Odisha."
        />

        <meta
          name="keywords"
          content="Odisha travel blog, Odisha tourism, Odisha tour packages, Bhubaneswar travel agency, tour and travel agency Bhubaneswar, Odisha travel guide, Odisha tourism packages with price, Bhubaneswar tour packages"
        />

        <meta
          name="author"
          content="Jagannath Explorer Travels"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />

        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large"
        />

        <meta
          name="language"
          content="English"
        />

        {/* Canonical */}

        <link
          rel="canonical"
          href="https://www.jagannathexplorertravels.com/blog"
        />

        {/* =====================================================
            OPEN GRAPH
        ===================================================== */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Odisha Travel Blog | Jagannath Explorer Travels"
        />

        <meta
          property="og:description"
          content="Discover Odisha tourism destinations, travel guides, tour packages and useful travel tips from Jagannath Explorer Travels."
        />

        <meta
          property="og:url"
          content="https://www.jagannathexplorertravels.com/blog"
        />

        <meta
          property="og:site_name"
          content="Jagannath Explorer Travels"
        />

        <meta
          property="og:image"
          content="https://www.jagannathexplorertravels.com/assets/odisha23.webp"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        {/* =====================================================
            TWITTER / X
        ===================================================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Odisha Travel Blog | Jagannath Explorer Travels"
        />

        <meta
          name="twitter:description"
          content="Read Odisha travel guides, discover destinations and explore tour packages with Jagannath Explorer Travels."
        />

        <meta
          name="twitter:image"
          content="https://www.jagannathexplorertravels.com/assets/odisha23.webp"
        />

        {/* =====================================================
            STRUCTURED DATA
        ===================================================== */}

        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>

      </Helmet>

      {/* =====================================================
          ARTICLE SECTION
      ===================================================== */}

      <section
        className="Article"
        aria-labelledby="article-heading"
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="Article__header">

          <div className="Article__label">
            <span>Travel Articles</span>
          </div>

          <h2
            id="article-heading"
            className="Article__heading"
          >
            Odisha Travel Guides & Tourism Articles
          </h2>

          <p className="Article__intro">
            Discover helpful travel guides, Odisha tourism information,
            destination ideas and tour planning tips from Jagannath
            Explorer Travels, a trusted tour and travel agency in
            Bhubaneswar, Odisha.
          </p>

        </div>

        {/* =====================================================
            ARTICLE GRID
        ===================================================== */}

        <div className="Article__grid">

          {articles.map((article) => (

            <article
              className="Article__card"
              key={article.id}
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="Article__image-wrapper">

                <img
                  src={article.image}
                  alt={`${article.title} - Jagannath Explorer Travels`}
                  className="Article__image"
                  loading="lazy"
                  decoding="async"
                />

                {/* Date */}

                <div
                  className="Article__date"
                  aria-label={`Published ${article.day} ${article.month}`}
                >

                  <span className="Article__date-day">
                    {article.day}
                  </span>

                  <span className="Article__date-month">
                    {article.month}
                  </span>

                </div>

              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="Article__content">

                {/* META */}

                <div className="Article__meta">

                  <span className="Article__author">
                    By{" "}
                    <span>
                      {article.author}
                    </span>
                  </span>

                  <span
                    className="Article__meta-dot"
                    aria-hidden="true"
                  >
                    •
                  </span>

                  <span className="Article__category">
                    {article.category}
                  </span>

                </div>

                {/* TITLE */}

                <h3 className="Article__title">
                  {article.title}
                </h3>

                {/* =================================================
                    BOTTOM
                ================================================= */}

                <div className="Article__bottom">

                  <a
                    href={article.slug}
                    className="Article__view"
                    aria-label={`Read ${article.title}`}
                  >

                    <span>
                      Read Article
                    </span>

                    <span
                      className="Article__view-icon"
                      aria-hidden="true"
                    >
                      <FaArrowUpRightFromSquare />
                    </span>

                  </a>

                  <div className="Article__read">

                    <FaFire aria-hidden="true" />

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
    </>
  );
};

export default Article;

