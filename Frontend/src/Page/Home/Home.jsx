import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import About from '../../Components/About/About'
import Journey from '../../Components/Journey/Journey'
import Experience from '../../Components/Experience/Experience'
import Facility from '../../Components/Facility/Facility'
import Tourpackage from '../../Components/Tourpackage/Tourpackage'
import Oursuccess from '../../Components/Oursuccess/Oursuccess'
import Explore from '../../Components/Explore/Explore'
import Hurryup from '../../Components/Hurryup/Hurryup'
import Testimonial from '../../Components/Testimonial/Testimonial'
import Latesttravel from '../../Components/Latesttravel/Latesttravel'





const Home = () => {
  return (
    <div>
      <HeroSection/>
      <About/>
      <Journey/>
      <Experience/>
      <Facility/>
      <Tourpackage/>
      <Oursuccess/>
      <Explore/>
      <Hurryup/>
      <Testimonial/>
      <Latesttravel/>
    </div>
  )
}

export default Home