
import React from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from '../../Components/HeroSection/HeroSection';
import About from '../../Components/About/About';
import Journey from '../../Components/Journey/Journey';
import Carrental from '../../Components/Carrental/Carrental';
import Experience from '../../Components/Experience/Experience';
import Facility from '../../Components/Facility/Facility';
import Tourpackage from '../../Components/Tourpackage/Tourpackage';
import Oursuccess from '../../Components/Oursuccess/Oursuccess';
import Explore from '../../Components/Explore/Explore';
import Hurryup from '../../Components/Hurryup/Hurryup';
import Testimonial from '../../Components/Testimonial/Testimonial';
import Latesttravel from '../../Components/Latesttravel/Latesttravel';

const Home = () => {
  return (
    <>
      <Helmet>

        {/* Primary SEO */}
        <title>
          Best Tour and Travel Agency in Bhubaneswar | Jagannath Tours
        </title>

        <meta
          name="description"
          content="Looking for the best tour and travel agency in Bhubaneswar? Explore carefully planned tour packages, comfortable stays, car rentals and memorable travel experiences with Jagannath Tours."
        />

        <meta
          name="keywords"
          content="best tour and travel agency in Bhubaneswar, tour and travel agency in Bhubaneswar, travel agency in Bhubaneswar, best travel agency in Bhubaneswar, Bhubaneswar tour packages, Odisha tour packages, Jagannath tour packages, Odisha travel agency, Puri tour package, travel services in Bhubaneswar"
        />

        <meta name="author" content="Jagannath Tours" />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://yourwebsite.com/"
        />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Best Tour and Travel Agency in Bhubaneswar | Jagannath Tours"
        />

        <meta
          property="og:description"
          content="Plan your next journey with a trusted tour and travel agency in Bhubaneswar. Discover Odisha, Puri, spiritual destinations and exciting tours with Jagannath Tours."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://yourwebsite.com/"
        />

        <meta
          property="og:site_name"
          content="Jagannath Tours"
        />

        {/* Replace this with your actual website image */}
        <meta
          property="og:image"
          content="https://yourwebsite.com/og-image.jpg"
        />

        {/* Twitter / X */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Best Tour and Travel Agency in Bhubaneswar | Jagannath Tours"
        />

        <meta
          name="twitter:description"
          content="Explore memorable destinations, Odisha tour packages, car rentals and travel experiences with Jagannath Tours in Bhubaneswar."
        />

        <meta
          name="twitter:image"
          content="https://yourwebsite.com/og-image.jpg"
        />

        {/* Local SEO */}
        <meta
          name="geo.region"
          content="IN-OD"
        />

        <meta
          name="geo.placename"
          content="Bhubaneswar, Odisha"
        />

      </Helmet>

      <div>
        <HeroSection />
        <About />
        <Journey />
        <Carrental />
        <Experience />
        <Facility />
        <Tourpackage />
        <Oursuccess />
        <Explore />
        <Hurryup />
        <Testimonial />
        <Latesttravel />
      </div>
    </>
  );
};

export default Home;
