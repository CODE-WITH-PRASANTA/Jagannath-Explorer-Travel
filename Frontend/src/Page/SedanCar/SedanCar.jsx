import React from 'react'
import SedanHome from '../../Components/SedanHome/SedanHome'
import SedanDescri from '../../Components/SedanDescri/SedanDescri'
import RateChanges from '../../Components/RateChanges/RateChanges'
import SedanFaq from '../../Components/SedanFaq/SedanFaq'

const SedanCar = () => {
  return (
    <div>
        <SedanHome/>
        <SedanDescri/>
        <RateChanges/>
        <SedanFaq/>
    </div>
  )
}

export default SedanCar