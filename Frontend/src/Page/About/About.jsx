import React from 'react'
import AboutBreadcrumb from '../../Components/AboutBreadcrumb/AboutBreadcrumb'
import AboutUs from '../../Components/Aboutus/Aboutus'
import Reviewer from '../../Components/Reviewer/Reviewer'
import WhoWeAre from '../../Components/WhoWeAre/WhoWeAre'
import WhatWeDo from '../../Components/WhatWeDo/WhatWeDo'
import TourGuide from '../../Components/TourGuide/TourGuide'
import Article from '../../Components/Article/Article'

const About = () => {
  return (
    <div>
        <AboutBreadcrumb />
        <AboutUs />
        <Reviewer />
        <WhoWeAre />
        <WhatWeDo />
        <TourGuide />
        <Article />
    </div>
  )
}

export default About