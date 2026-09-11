import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { API } from '../../api/axios';

import TourDetailsBreadCrumb from '../../Components/TourDetailsBreadCrumb/TourDetailsBreadCrumb';
import TourDetailsPhoto from '../../Components/TourDetailsPhoto/TourDetailsPhoto';
import TourExperience from '../../Components/Tourexperience/Tourexperience';
import TourDetailsMap from '../../Components/TourDetailsMap/TourDetailsMap';
import TourDetailsFaq from '../../Components/TourDetailsFaq/TourDetailsFaq';
import TourDetailsReview from '../../Components/TourDetailsReview/TourDetailsReview';

const TourDetails = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const tourIdentifier =
    params.slug ||
    params.id ||
    searchParams.get('slug') ||
    searchParams.get('id') ||
    location.state?.slug ||
    location.state?.tourId ||
    location.state?.id;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTourDetails = async () => {
      try {
        setLoading(true);
        // If specific identifier exists
        if (tourIdentifier) {
          const res = await API.get(`/tours/${encodeURIComponent(tourIdentifier)}`);
          const data = res.data?.data || res.data;
          if (data && isMounted) {
            setTour(data);
            return;
          }
        }
        
        // Fallback: fetch all tours from database and select the first available
        const allRes = await API.get('/tours');
        const allTours = allRes.data?.data || allRes.data || [];
        if (Array.isArray(allTours) && allTours.length > 0 && isMounted) {
          setTour(allTours[0]);
        }
      } catch (err) {
        console.error('Failed to fetch tour details:', err);
        if (isMounted) setError('Could not load tour details');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTourDetails();
    return () => {
      isMounted = false;
    };
  }, [tourIdentifier]);

  return (
    <div>
      <TourDetailsBreadCrumb 
        title={tour?.title} 
        destination={tour?.destination} 
      />
      <TourDetailsPhoto 
        mainImage={tour?.mainImage} 
        galleryImages={tour?.galleryImages} 
        videoUrl={tour?.videoUrl} 
        title={tour?.title} 
      />
      <TourExperience 
        tour={tour} 
      />
      <TourDetailsMap 
        location={tour?.location} 
        destination={tour?.destination} 
      />
      <TourDetailsFaq 
        faqs={tour?.faqs} 
      />
      <TourDetailsReview 
        tour={tour} 
      />
    </div>
  );
};

export default TourDetails;