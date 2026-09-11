import React from "react";
import { Helmet } from "react-helmet-async";

import TravellerJourney from "../../Components/TravellerJourney/TravellerJourney";
import TransportTariff from "../../Components/TransportTariff/TransportTariff";
import Frequently from "../../Components/Frequently/Frequently";
import UrbaniaTravellerBreadcrumb from "../../Components/UrbaniaTravellerBreadcrumb/UrbaniaTravellerBreadcrumb";

const UrbaniaTraveller = () => {
  const pageTitle =
    "Best Tour and Travel Agency in Bhubaneswar | Jagannath Explorer Travels";

  const pageDescription =
    "Looking for the best tour and travel agency in Bhubaneswar? Jagannath Explorer Travels offers Urbania tempo traveller, cab, car and group travel services in Bhubaneswar, Odisha with comfortable vehicles and flexible travel options.";

  const keywords =
    "Best tour and travel agency in bhubaneswar, Best Tour & Travel Agency in Bhubaneswar Odisha, Tour & Travel Agency in Bhubaneswar Odisha, odisha tourism packages with price, Urbania tempo traveller in Bhubaneswar, tempo traveller service in Bhubaneswar, travel agency in Bhubaneswar";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Jagannath Explorer Travels",
    description: pageDescription,
    telephone: ["+91-9668892441", "+91-9556355446"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Plot No - 001, Mahaveer Nagar, Road No. - 18, Samantray Pur",
      addressLocality: "Bhubaneswar",
      addressRegion: "Odisha",
      postalCode: "751002",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Bhubaneswar",
    },
    serviceType: [
      "Tour and Travel Agency",
      "Urbania Tempo Traveller Rental",
      "Tempo Traveller Service",
      "Cab Service",
      "Car Rental",
      "Outstation Travel",
      "Odisha Tourism Packages",
    ],
  };

  return (
    <>
      <Helmet>
        {/* =========================
            BASIC SEO
        ========================= */}

        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <meta
          name="keywords"
          content={keywords}
        />

        <meta name="robots" content="index, follow" />

        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="author"
          content="Jagannath Explorer Travels"
        />

        <meta
          name="publisher"
          content="Jagannath Explorer Travels"
        />

        {/* =========================
            LOCAL SEO
        ========================= */}

        <meta
          name="geo.region"
          content="IN-OR"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        <meta
          name="business:contact_data:locality"
          content="Bhubaneswar"
        />

        <meta
          name="business:contact_data:region"
          content="Odisha"
        />

        <meta
          name="business:contact_data:country_name"
          content="India"
        />

        {/* =========================
            CANONICAL
        ========================= */}

        {/* Replace this with your actual live page URL */}
        <link
          rel="canonical"
          href="https://yourdomain.com/urbania-traveller"
        />

        {/* =========================
            OPEN GRAPH
        ========================= */}

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
          property="og:site_name"
          content="Jagannath Explorer Travels"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        {/* Add your actual image URL */}
        <meta
          property="og:image"
          content="https://yourdomain.com/images/urbania-traveller.webp"
        />

        <meta
          property="og:image:alt"
          content="Urbania Tempo Traveller service in Bhubaneswar"
        />

        {/* =========================
            TWITTER / SOCIAL
        ========================= */}

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
          content="https://yourdomain.com/images/urbania-traveller.webp"
        />

        {/* =========================
            THEME
        ========================= */}

        <meta
          name="theme-color"
          content="#20a6df"
        />

        {/* =========================
            STRUCTURED DATA
        ========================= */}

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div>
        <UrbaniaTravellerBreadcrumb />

        <TravellerJourney />

        <TransportTariff />

        <Frequently />
      </div>
    </>
  );
};

export default UrbaniaTraveller;