import React from "react";
import { Helmet } from "react-helmet-async";

import SuvHome from "../../Components/SuvHome/SuvHome";
import Suvvehcle from "../../Components/Suvvehcle/Suvvehcle";
import SuvRate from "../../Components/SuvRate/SuvRate";
import SuvFaq from "../../Components/SuvFaq/SuvFaq";

const Suvcars = () => {
  const businessName = "Jagannath Explorer Travels";

  const pageTitle =
    "Best Tour and Travel Agency in Bhubaneswar | SUV Car Rental";

  const pageDescription =
    "Jagannath Explorer Travels is a trusted tour and travel agency in Bhubaneswar offering comfortable SUV rentals, local sightseeing, airport transfers, outstation trips and Bhubaneswar travel agency tour packages across Odisha.";

  const canonicalUrl =
    "https://jagannathexplorertravels.com/suv-cars";

  const keywords = [
    "Best tour and travel agency in bhubaneswar",
    "bhubaneswar travel agency tour packages",
    "Best Tour & Travel Agency in Bhubaneswar Odisha",
    "Tour & Travel Agency in Bhubaneswar, Odisha",
    "Best Travels and Tours Agency Bhubaneswar Odisha",
    "Tour packages & Travel operators in Bhubaneswar",
    "Tour and Travels Bhubaneswar",
    "Tour & Travel Agents in Bhubaneswar",
    "travel agency in Bhubaneswar",
    "top 10 travel agency in bhubaneswar",
    "odisha tourism packages with price",
    "SUV rental in Bhubaneswar",
    "SUV car rental Bhubaneswar",
    "outstation car rental Bhubaneswar",
  ].join(", ");

  const businessAddress = {
    "@type": "PostalAddress",
    streetAddress:
      "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    postalCode: "751002",
    addressCountry: "IN",
  };

  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: businessName,
    description: pageDescription,
    url: "https://jagannathexplorertravels.com",
    telephone: "+91-9668892441",
    address: businessAddress,
    areaServed: [
      {
        "@type": "City",
        name: "Bhubaneswar",
      },
      {
        "@type": "State",
        name: "Odisha",
      },
    ],
    serviceType: [
      "Tour and Travel Services",
      "SUV Car Rental",
      "Local Sightseeing",
      "Outstation Travel",
      "Airport Transfer",
      "Tour Packages",
      "Travel Planning",
    ],
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: businessName,
      url: "https://jagannathexplorertravels.com",
    },
    about: {
      "@type": "TravelAgency",
      name: businessName,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://jagannathexplorertravels.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "SUV Cars",
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <Helmet>
        {/* =========================
            BASIC SEO
        ========================== */}

        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <meta
          name="keywords"
          content={keywords}
        />

        <meta
          name="author"
          content={businessName}
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta
          name="language"
          content="English"
        />

        <meta
          name="revisit-after"
          content="7 days"
        />

        <link
          rel="canonical"
          href={canonicalUrl}
        />

        {/* =========================
            LOCATION SEO
        ========================== */}

        <meta
          name="geo.region"
          content="IN-OR"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        {/* =========================
            OPEN GRAPH
        ========================== */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription}
        />

        <meta
          property="og:url"
          content={canonicalUrl}
        />

        <meta
          property="og:site_name"
          content={businessName}
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        {/* Add your actual SUV image URL here */}
        <meta
          property="og:image"
          content="https://jagannathexplorertravels.com/images/suv-cars.jpg"
        />

        <meta
          property="og:image:alt"
          content="SUV car rental and tour travel services in Bhubaneswar"
        />

        {/* =========================
            TWITTER / X SEO
        ========================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={pageDescription}
        />

        <meta
          name="twitter:image"
          content="https://jagannathexplorertravels.com/images/suv-cars.jpg"
        />

        {/* =========================
            MOBILE / THEME
        ========================== */}

        <meta
          name="theme-color"
          content="#ea580c"
        />

        <meta
          name="format-detection"
          content="telephone=yes"
        />

        {/* =========================
            STRUCTURED DATA
        ========================== */}

        <script type="application/ld+json">
          {JSON.stringify(travelAgencySchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(webpageSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* =========================
          PAGE CONTENT
      ========================== */}

      <main>
        <SuvHome />

        <Suvvehcle />

        <SuvRate />

        <SuvFaq />
      </main>
    </>
  );
};

export default Suvcars;