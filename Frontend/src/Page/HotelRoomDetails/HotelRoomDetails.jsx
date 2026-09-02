import React from 'react'
import HotelRoomBreadCrumb from '../../Components/HotelRoomBreadCrumb/HotelRoomBreadCrumb'
import HotelRoomImages from '../../Components/HotelRoomImages/HotelRoomImages'
import HotelRoomExperience from '../../Components/HotelRoomExperience/HotelRoomExperience'
import HotelroomDetailsMap from '../../Components/HotelroomDetailsMap/HotelroomDetailsMap'
import HotelRoomDetailsReview from '../../Components/HotelRoomDetailsReview/HotelRoomDetailsReview'

const HotelRoomDetails = () => {
  return (
    <div>
<HotelRoomBreadCrumb/>
<HotelRoomImages/>
<HotelRoomExperience/>
<HotelroomDetailsMap/>
<HotelRoomDetailsReview/>
    </div>
  )
}

export default HotelRoomDetails