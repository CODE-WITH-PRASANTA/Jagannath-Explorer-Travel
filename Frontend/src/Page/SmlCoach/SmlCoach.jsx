import React from "react";
import { Helmet } from "react-helmet-async";

import SmlHome from "../../Components/SmlHome/SmlHome";
import SmlBus from "../../Components/SmlBus/SmlBus";
import SmlTransport from "../../Components/SmlTransport/SmlTransport";
import Smlfaq from "../../Components/Smlfaq/Smlfaq";

const SmlCoach = () => {
  return (
    <>
      {/* =====================================================
          SEO META TAGS
      ===================================================== */}

      <Helmet>
        {/* Primary SEO */}
        <title>
          Best Tour &amp; Travel Agency in Bhubaneswar | Odisha Tours
        </title>

        <meta
          name="description"
          content="Looking for the best tour and travel agency in Bhubaneswar? Explore Odisha with comfortable cars, Travellers, Urbania and SML coaches. Book local sightseeing, outstation trips and Odisha tourism packages."
        />

        <meta
          name="keywords"
          content="Best Tour & Travel Agency in Bhubaneswar, Odisha Tour & Travel Agency in Bhubaneswar, Odisha, Odisha tourism packages with price, tour and travel agency Bhubaneswar, travel agency in Bhubaneswar, Odisha tour packages, Bhubaneswar sightseeing, Puri Konark tour, Chilika tour, outstation cab Bhubaneswar, SML coach rental Bhubaneswar"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://yourwebsite.com/sml-coach"
        />

        {/* =================================================
            OPEN GRAPH / FACEBOOK
        ================================================= */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Best Tour & Travel Agency in Bhubaneswar | Odisha Tours"
        />

        <meta
          property="og:description"
          content="Plan comfortable local and outstation journeys with a trusted tour and travel service in Bhubaneswar. Explore Odisha with cars, Travellers, Urbania and SML coaches."
        />

        <meta
          property="og:url"
          content="https://yourwebsite.com/sml-coach"
        />

        <meta
          property="og:site_name"
          content="Your Travel Agency"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        {/* Replace with your actual page image */}
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/odisha-tour-travel.jpg"
        />

        <meta
          property="og:image:alt"
          content="Best Tour & Travel Agency in Bhubaneswar"
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
          content="Best Tour & Travel Agency in Bhubaneswar"
        />

        <meta
          name="twitter:description"
          content="Explore Odisha with comfortable vehicles, sightseeing tours, outstation travel and customized Odisha tourism packages from Bhubaneswar."
        />

        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/odisha-tour-travel.jpg"
        />

        {/* =================================================
            THEME / MOBILE
        ================================================= */}

        <meta
          name="theme-color"
          content="#0f172a"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        {/* =================================================
            GEO META
        ================================================= */}

        <meta
          name="geo.region"
          content="IN-OR"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

      </Helmet>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <main className="sml-coach-page">
        <SmlHome />

        <SmlBus />

        <SmlTransport />

        <Smlfaq />
      </main>
    </>
  );
};

export default SmlCoach;