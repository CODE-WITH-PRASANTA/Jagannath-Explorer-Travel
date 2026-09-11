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
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        if (hotelIdentifier) {
          const res = await API.get(`/hotels/${encodeURIComponent(hotelIdentifier)}`);
          const data = res.data?.data ?? res.data;
          if (isMounted) setHotel(data);
        } else {
          // If no specific identifier in URL, fetch the first available hotel
          const res = await API.get('/hotels');
          const data = res.data?.data ?? res.data ?? [];
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setHotel(data[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching hotel details:', err);
        if (isMounted) setError(err.response?.data?.message || 'Failed to load hotel details.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHotelDetails();

    return () => {
      isMounted = false;
    };
  }, [hotelIdentifier]);

  if (loading) {
    return <div className="p-8 text-center">Loading hotel details...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!hotel) {
    return <div className="p-8 text-center">Hotel not found.</div>;
  }

  return (
    <div className="hotel-room-details-container">
      <HotelRoomBreadCrumb hotel={hotel} />
      <HotelRoomImages hotel={hotel} />
      <HotelRoomExperience hotel={hotel} />
      <HotelroomDetailsMap hotel={hotel} />
      <HotelRoomDetailsReview hotel={hotel} />
    </div>
  );
};

export default HotelRoomDetails;