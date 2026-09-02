import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Aboutus from '../../Components/Aboutus/Aboutus'
import Journey from '../../Components/Journey/Journey'
import Tourexperience from '../../Components/Tourexperience/Tourexperience'
import Facility from '../../Components/Facility/Facility'
import Tourpackage from '../../Components/Tourpackage/Tourpackage'


const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Aboutus/>
      <Journey/>
      <Tourexperience/>
      <Facility/>
      <Tourpackage/>
    </div>
  )
}

export default Home