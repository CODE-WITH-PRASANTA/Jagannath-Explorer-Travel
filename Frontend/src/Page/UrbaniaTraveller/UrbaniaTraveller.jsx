import React from 'react'
import TravellerJourney from '../../Components/TravellerJourney/TravellerJourney'
import TransportTariff from '../../Components/TransportTariff/TransportTariff'
import Frequently from '../../Components/Frequently/Frequently'
import UrbaniaTravellerBreadcrumb from '../../Components/UrbaniaTravellerBreadcrumb/UrbaniaTravellerBreadcrumb'
 
const UrbaniaTraveller = () => {
  return (
    <div>
      <UrbaniaTravellerBreadcrumb />
      <TravellerJourney />
      <TransportTariff />
      <Frequently />
    </div>
  )
}

export default UrbaniaTraveller