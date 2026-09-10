import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useLocation } from 'react-router-dom';
import API from '../../api/axios';
import HotelRoomBreadCrumb from '../../Components/HotelRoomBreadCrumb/HotelRoomBreadCrumb';
import HotelRoomImages from '../../Components/HotelRoomImages/HotelRoomImages';
import HotelRoomExperience from '../../Components/HotelRoomExperience/HotelRoomExperience';
import HotelroomDetailsMap from '../../Components/HotelroomDetailsMap/HotelroomDetailsMap';
import HotelRoomDetailsReview from '../../Components/HotelRoomDetailsReview/HotelRoomDetailsReview';

const HotelRoomDetails = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();

  const hotelIdentifier =
    params.slug ||
    params.name ||
    params.id ||
    searchParams.get('id') ||
    location.state?.hotelId;

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        if (hotelIdentifier) {
          const res = await API.get(`/hotels/${encodeURIComponent(hotelIdentifier)}`);
          const data = res.data.data || res.data;
          setHotel(data);
        } else {
          // If no specific identifier in URL, fetch the first available hotel from DB
          const res = await API.get('/hotels');
          const data = res.data.data || res.data || [];
          if (Array.isArray(data) && data.length > 0) {
            setHotel(data[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelIdentifier]);

  return (
    <div>
      <HotelRoomBreadCrumb hotel={hotel} />
      <HotelRoomImages hotel={hotel} />
      <HotelRoomExperience hotel={hotel} />
      <HotelroomDetailsMap hotel={hotel} />
      <HotelRoomDetailsReview hotel={hotel} />
    </div>
  );
};

export default HotelRoomDetails;