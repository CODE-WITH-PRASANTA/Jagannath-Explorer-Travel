import React from "react";
import { Helmet } from "react-helmet-async";

import LuxuryHome from "../../Components/LuxuryHome/LuxuryHome";
import WedCars from "../../Components/WedCars/WedCars";
import TransportFees from "../../Components/TransportFees/TransportFees";
import Questionluxury from "../../Components/Questionluxury/Questionluxury";

const LuxuryCars = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Jagannath Explorer Travels",
    url: "https://jagannathexplorertravels.com/luxury-cars",
    telephone: ["+919668892441", "+919556355446"],
    description:
      "Jagannath Explorer Travels is a trusted Tour & Travel Agency in Bhubaneswar, Odisha, offering luxury car rentals, wedding cars, local and outstation travel, airport transfers and comfortable transportation services.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur",
      addressLocality: "Bhubaneswar",
      addressRegion: "Odisha",
      postalCode: "751002",
      addressCountry: "IN",
    },
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
      "Luxury Car Rental",
      "Wedding Car Rental",
      "Tour and Travel Services",
      "Outstation Cab Service",
      "Airport Transfer",
      "Local Car Rental",
    ],
  };

  return (
    <>
      {/* =========================================================
          SEO META TAGS
      ========================================================= */}
      <Helmet>
        {/* Primary SEO Title */}
        <title>
          Luxury Car Rental in Bhubaneswar | Wedding Cars | Jagannath Explorer
          Travels
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Book luxury cars, wedding cars, premium vehicles and comfortable travel services in Bhubaneswar with Jagannath Explorer Travels. We offer local rentals, outstation trips, airport transfers and tour travel services across Odisha."
        />

        {/* SEO Keywords */}
        <meta
          name="keywords"
          content="luxury car rental in Bhubaneswar, luxury cars Bhubaneswar, wedding car rental Bhubaneswar, wedding cars in Bhubaneswar, premium car rental Bhubaneswar, luxury vehicle rental Odisha, car rental Bhubaneswar, outstation car rental Bhubaneswar, tour and travel agency Bhubaneswar, Jagannath Explorer Travels"
        />

        {/* Author */}
        <meta
          name="author"
          content="Jagannath Explorer Travels"
        />

        {/* Search Engine Instructions */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />

        {/* Language */}
        <meta name="language" content="English" />

        {/* Geographic SEO */}
        <meta name="geo.region" content="IN-OD" />
        <meta name="geo.placename" content="Bhubaneswar" />

        {/* Theme */}
        <meta name="theme-color" content="#c5a059" />

        {/* =========================================================
            CANONICAL URL
        ========================================================= */}
        <link
          rel="canonical"
          href="https://jagannathexplorertravels.com/luxury-cars"
        />

        {/* =========================================================
            OPEN GRAPH - FACEBOOK / WHATSAPP / SOCIAL SHARING
        ========================================================= */}
        <meta property="og:type" content="website" />

        <meta
          property="og:title"
          content="Luxury Car Rental in Bhubaneswar | Jagannath Explorer Travels"
        />

        <meta
          property="og:description"
          content="Explore luxury cars, wedding cars and premium travel services in Bhubaneswar with Jagannath Explorer Travels. Book comfortable vehicles for weddings, local travel, airport transfers and outstation journeys."
        />

        <meta
          property="og:url"
          content="https://jagannathexplorertravels.com/luxury-cars"
        />

        <meta
          property="og:site_name"
          content="Jagannath Explorer Travels"
        />

        <meta property="og:locale" content="en_IN" />

        {/* Replace this with your actual luxury car image URL */}
        <meta
          property="og:image"
          content="https://jagannathexplorertravels.com/assets/luxury-cars-og.jpg"
        />

        <meta
          property="og:image:alt"
          content="Luxury car rental and wedding cars in Bhubaneswar"
        />

        {/* =========================================================
            TWITTER / X CARD
        ========================================================= */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Luxury Car Rental in Bhubaneswar | Jagannath Explorer Travels"
        />

        <meta
          name="twitter:description"
          content="Book luxury cars, wedding cars and premium transportation services in Bhubaneswar, Odisha with Jagannath Explorer Travels."
        />

        <meta
          name="twitter:image"
          content="https://jagannathexplorertravels.com/assets/luxury-cars-og.jpg"
        />

        {/* =========================================================
            BUSINESS INFORMATION
        ========================================================= */}
        <meta
          property="business:contact_data:locality"
          content="Bhubaneswar"
        />

        <meta
          property="business:contact_data:region"
          content="Odisha"
        />

        <meta
          property="business:contact_data:postal_code"
          content="751002"
        />

        <meta
          property="business:contact_data:country_name"
          content="India"
        />

        {/* =========================================================
            STRUCTURED DATA / JSON-LD
        ========================================================= */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* =========================================================
          PAGE CONTENT
      ========================================================= */}
      <main>
        <LuxuryHome />
        <WedCars />
        <TransportFees />
        <Questionluxury />
      </main>
    </>
  );
};

export default LuxuryCars;