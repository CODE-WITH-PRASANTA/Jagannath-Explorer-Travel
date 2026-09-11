import React from "react";
import { Helmet } from "react-helmet-async";

import SedanHome from "../../Components/SedanHome/SedanHome";
import SedanDescri from "../../Components/SedanDescri/SedanDescri";
import RateChanges from "../../Components/RateChanges/RateChanges";
import SedanFaq from "../../Components/SedanFaq/SedanFaq";

const SedanCar = () => {
  return (
    <>
      <Helmet>
        {/* =========================================================
            Basic SEO
        ========================================================= */}

        <title>
          Best Tour and Travel Agency in Bhubaneswar | Car Rental & Tours
        </title>

        <meta
          name="description"
          content="Jagannath Explorer Travels is a trusted tour and travel agency in Bhubaneswar offering sedan car rentals, local and outstation travel, Odisha tour packages, airport transfers and customized sightseeing trips."
        />

        <meta
          name="keywords"
          content="Best tour and travel agency in Bhubaneswar, Bhubaneswar travel agency tour packages, Best Tour & Travel Agency in Bhubaneswar Odisha, Tour & Travel Agency in Bhubaneswar Odisha, Best Travels and Tours Agency Bhubaneswar Odisha, Tour packages and Travel operators in Bhubaneswar, Tour and Travels Bhubaneswar, Tour & Travel Agents in Bhubaneswar, travel agency in Bhubaneswar, top travel agency in Bhubaneswar, Odisha tourism packages with price, sedan car rental Bhubaneswar, car rental Bhubaneswar, outstation cab Bhubaneswar"
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
          content="index, follow"
        />

        <meta
          name="language"
          content="English"
        />

        <meta
          name="revisit-after"
          content="7 days"
        />

        {/* =========================================================
            Canonical URL
        ========================================================= */}

        <link
          rel="canonical"
          href="https://jagannathexplorertravels.com/sedan-car"
        />

        {/* =========================================================
            Open Graph / Facebook
        ========================================================= */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Best Tour and Travel Agency in Bhubaneswar | Jagannath Explorer Travels"
        />

        <meta
          property="og:description"
          content="Book comfortable sedan cars, local and outstation cabs, airport transfers and customized Odisha tour packages with Jagannath Explorer Travels in Bhubaneswar."
        />

        <meta
          property="og:url"
          content="https://jagannathexplorertravels.com/sedan-car"
        />

        <meta
          property="og:site_name"
          content="Jagannath Explorer Travels"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        {/* =========================================================
            Twitter Card
        ========================================================= */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Best Tour and Travel Agency in Bhubaneswar | Jagannath Explorer Travels"
        />

        <meta
          name="twitter:description"
          content="Explore Bhubaneswar and Odisha with comfortable sedan car rentals, tour packages, airport transfers and outstation travel services."
        />

        {/* =========================================================
            Local Business Information
        ========================================================= */}

        <meta
          name="geo.region"
          content="IN-OD"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

        {/* =========================================================
            Theme / Mobile
        ========================================================= */}

        <meta
          name="theme-color"
          content="#2563eb"
        />

        <meta
          name="format-detection"
          content="telephone=yes"
        />

        {/* =========================================================
            Structured Data - Travel Agency
        ========================================================= */}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",

            name: "Jagannath Explorer Travels",

            description:
              "Jagannath Explorer Travels is a tour and travel agency in Bhubaneswar offering car rental, local and outstation travel, airport transfers, sightseeing and customized Odisha tour packages.",

            url: "https://jagannathexplorertravels.com",

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
              "Car Rental",
              "Sedan Car Rental",
              "Local Cab Service",
              "Outstation Cab Service",
              "Airport Transfer",
              "Railway Station Transfer",
              "Odisha Tour Packages",
              "Bhubaneswar Sightseeing",
              "Travel Packages",
            ],

            sameAs: [],
          })}
        </script>

        {/* =========================================================
            Breadcrumb Structured Data
        ========================================================= */}

        <script type="application/ld+json">
          {JSON.stringify({
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
                name: "Sedan Car Rental",
                item:
                  "https://jagannathexplorertravels.com/sedan-car",
              },
            ],
          })}
        </script>
      </Helmet>

      <main>
        <SedanHome />

        <SedanDescri />

        <RateChanges />

        <SedanFaq />
      </main>
    </>
  );
};

export default SedanCar;