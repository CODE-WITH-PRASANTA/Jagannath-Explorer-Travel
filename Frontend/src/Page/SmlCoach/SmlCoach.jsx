import React from 'react'
import SmlHome from '../../Components/SmlHome/SmlHome'
import SmlBus from '../../Components/SmlBus/SmlBus'
import SmlTransport from '../../Components/SmlTransport/SmlTransport'
import Smlfaq from '../../Components/Smlfaq/Smlfaq'

const SmlCoach = () => {
  return (
    <div>
       <SmlHome/> 
       <SmlBus/>
       <SmlTransport/>
       <Smlfaq/>
    </div>
  )
}

export default SmlCoach