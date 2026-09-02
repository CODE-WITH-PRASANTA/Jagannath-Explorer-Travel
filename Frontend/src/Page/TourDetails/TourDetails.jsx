import React from 'react'
import TourDetailsBreadCrumb from '../../Components/TourDetailsBreadCrumb/TourDetailsBreadCrumb'
import TourDetailsPhoto from '../../Components/TourDetailsPhoto/TourDetailsPhoto'
import TourExperience from '../../Components/Tourexperience/Tourexperience'
import TourDetailsMap from '../../Components/TourDetailsMap/TourDetailsMap'
import TourDetailsFaq from '../../Components/TourDetailsFaq/TourDetailsFaq'
import TourDetailsReview from '../../Components/TourDetailsReview/TourDetailsReview'

const TourDetails = () => {
  return (
    <div>
<TourDetailsBreadCrumb/>
<TourDetailsPhoto/>
<TourExperience/>
<TourDetailsMap/>
<TourDetailsFaq/>
<TourDetailsReview/>
    </div>
  )
}

export default TourDetails