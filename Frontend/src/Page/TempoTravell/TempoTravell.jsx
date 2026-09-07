import React from "react";
import { Helmet } from "react-helmet-async";

import TempoHome from "../../Components/TempoHome/TempoHome";
import Tempovehicle from "../../Components/Tempovehicle/Tempovehicle";
import Tempotransport from "../../Components/Tempotransport/Tempotransport";
import Tempofaq from "../../Components/Tempofaq/Tempofaq";

const TempoTravell = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Jagannath Explorer Travels",
    description:
      "Jagannath Explorer Travels is a tour and travel agency in Bhubaneswar, Odisha, providing car rentals, Tempo Traveller, Urbania, SML Coach, local sightseeing and outstation travel services.",
    url: "https://jagannathexplorertravels.com/",
    telephone: [
      "+91-9668892441",
      "+91-9556355446",
    ],
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
      "Tour and Travel Services",
      "Car Rental",
      "Tempo Traveller Rental",
      "Urbania Rental",
      "SML Coach Rental",
      "Local Sightseeing",
      "Outstation Travel",
      "Odisha Tourism Packages",
    ],
  };

  return (
    <>
      {/* =====================================================
          SEO META TAGS
      ===================================================== */}

      <Helmet>
        {/* Basic SEO */}
        <html lang="en" />

        <title>
          Tempo Traveller &amp; Tour Travel Agency in Bhubaneswar | Jagannath Explorer Travels
        </title>

        <meta
          name="description"
          content="Jagannath Explorer Travels is a trusted tour and travel agency in Bhubaneswar offering Tempo Traveller, car rental, Urbania, SML Coach, local sightseeing, outstation trips and Odisha tourism packages."
        />

        <meta
          name="keywords"
          content="Best tour and travel agency in bhubaneswar, bhubaneswar travel agency tour packages, Best Tour & Travel Agency in Bhubaneswar Odisha, Tour & Travel Agency in Bhubaneswar Odisha, Best Travels and Tours Agency Bhubaneswar Odisha, Tour packages & Travel operators in Bhubaneswar, Tour and Travels Bhubaneswar, Tour & Travel Agents in Bhubaneswar, travel agency in Bhubaneswar, top 10 travel agency in bhubaneswar, odisha tourism packages with price, Tempo Traveller in Bhubaneswar, Tempo Traveller rental Bhubaneswar, Tempo Traveller booking Bhubaneswar, Urbania rental Bhubaneswar, SML Coach rental Bhubaneswar"
        />

        <meta
          name="author"
          content="Jagannath Explorer Travels"
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
          name="theme-color"
          content="#0f172a"
        />

        {/* Geographic SEO */}
        <meta
          name="geo.region"
          content="IN-OR"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        <meta
          name="language"
          content="English"
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://jagannathexplorertravels.com/tempo-traveller"
        />

        {/* =================================================
            OPEN GRAPH
        ================================================= */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        <meta
          property="og:site_name"
          content="Jagannath Explorer Travels"
        />

        <meta
          property="og:title"
          content="Tempo Traveller & Tour Travel Agency in Bhubaneswar | Jagannath Explorer Travels"
        />

        <meta
          property="og:description"
          content="Book Tempo Travellers, cars, Urbania and SML Coaches with Jagannath Explorer Travels for local sightseeing, group travel and outstation journeys from Bhubaneswar, Odisha."
        />

        <meta
          property="og:url"
          content="https://jagannathexplorertravels.com/tempo-traveller"
        />

        {/* Replace this image with your actual website image */}
        <meta
          property="og:image"
          content="https://jagannathexplorertravels.com/assets/tempo-traveller.jpg"
        />

        <meta
          property="og:image:alt"
          content="Tempo Traveller rental and tour travel services in Bhubaneswar"
        />

        {/* =================================================
            TWITTER / X
        ================================================= */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Tempo Traveller & Tour Travel Agency in Bhubaneswar | Jagannath Explorer Travels"
        />

        <meta
          name="twitter:description"
          content="Tempo Traveller, car rental, Urbania, SML Coach and Odisha tour travel services from Jagannath Explorer Travels, Bhubaneswar."
        />

        <meta
          name="twitter:image"
          content="https://jagannathexplorertravels.com/assets/tempo-traveller.jpg"
        />

        {/* =================================================
            STRUCTURED DATA
        ================================================= */}

        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
      </Helmet>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <main className="tempo-travell-page">
        <TempoHome />

        <Tempovehicle />

        <Tempotransport />

        <Tempofaq />
      </main>
    </>
  );
};

export default TempoTravell;