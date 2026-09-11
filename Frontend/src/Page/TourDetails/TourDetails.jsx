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
        setError(null);

        // 1. Fetch by specific tour identifier if available
        if (tourIdentifier) {
          const res = await API.get(`/tours/${encodeURIComponent(tourIdentifier)}`);
          const data = res.data?.data || res.data;
          if (data && isMounted) {
            setTour(data);
            return;
          }
        }

        // 2. Fallback: fetch all tours and take the first one
        const allRes = await API.get('/tours');
        const allTours = allRes.data?.data || allRes.data || [];
        if (Array.isArray(allTours) && allTours.length > 0 && isMounted) {
          setTour(allTours[0]);
        } else if (isMounted) {
          setError('No tours found.');
        }
      } catch (err) {
        console.error('Failed to fetch tour details:', err);
        if (isMounted) {
          setError(err.response?.data?.message || 'Could not load tour details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTourDetails();

    return () => {
      isMounted = false;
    };
  }, [tourIdentifier]);

  if (loading) {
    return <div className="p-8 text-center">Loading tour details...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!tour) {
    return <div className="p-8 text-center">Tour not found.</div>;
  }

  return (
    <div className="tour-details-container">
      <TourDetailsBreadCrumb
        title={tour.title}
        destination={tour.destination}
      />
      <TourDetailsPhoto
        mainImage={tour.mainImage}
        galleryImages={tour.galleryImages}
        videoUrl={tour.videoUrl}
        title={tour.title}
      />
      <TourExperience
        tour={tour}
      />
      <TourDetailsMap
        location={tour.location}
        destination={tour.destination}
      />
      <TourDetailsFaq
        faqs={tour.faqs}
      />
      <TourDetailsReview
        tour={tour}
      />
    </div>
  );
};

export default TourDetails;