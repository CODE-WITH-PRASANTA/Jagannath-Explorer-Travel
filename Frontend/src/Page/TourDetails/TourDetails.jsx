import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { API } from '../../api/axios';

import TourDetailsBreadCrumb from '../../Components/TourDetailsBreadCrumb/TourDetailsBreadCrumb';
import TourDetailsPhoto from '../../Components/TourDetailsPhoto/TourDetailsPhoto';
import TourExperience from '../../Components/Tourexperience/Tourexperience';
import TourDetailsMap from '../../Components/TourDetailsMap/TourDetailsMap';
import TourDetailsFaq from '../../Components/TourDetailsFaq/TourDetailsFaq';
import TourDetailsReview from '../../Components/TourDetailsReview/TourDetailsReview';

const TourDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTourDetails = async () => {
      try {
        setLoading(true);
        // If slug exists in URL parameter
        if (slug) {
          const res = await API.get(`/tours/${slug}`);
          if (res.data && res.data.success && isMounted) {
            setTour(res.data.data);
            return;
          }
        }
        
        // Fallback: fetch all tours and select first available if no slug provided
        const allRes = await API.get('/tours');
        if (allRes.data && allRes.data.success && allRes.data.data.length > 0 && isMounted) {
          setTour(allRes.data.data[0]);
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
  }, [slug, location]);

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