import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import API from '../../api/axios';

import TourDetailsBreadCrumb from '../../Components/TourDetailsBreadCrumb/TourDetailsBreadCrumb';
import TourDetailsPhoto from '../../Components/TourDetailsPhoto/TourDetailsPhoto';
import TourDetailsMap from '../../Components/TourDetailsMap/TourDetailsMap';
import TourDetailsFaq from '../../Components/TourDetailsFaq/TourDetailsFaq';
import TourExperiance from '../../Components/TourExperiance/TourExperiance';

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

        // Fetch specific tour by slug or ID
        if (tourIdentifier) {
          const res = await API.get(
            `/tours/${encodeURIComponent(tourIdentifier)}`
          );

          const data = res.data?.data || res.data;

          if (data && isMounted) {
            setTour(data);
            return;
          }
        }

        // Fallback: fetch all tours
        const allRes = await API.get('/tours');

        const allTours =
          allRes.data?.data ||
          allRes.data ||
          [];

        if (
          Array.isArray(allTours) &&
          allTours.length > 0 &&
          isMounted
        ) {
          setTour(allTours[0]);
        } else if (isMounted) {
          setError('No tours found.');
        }
      } catch (err) {
        console.error('Failed to fetch tour details:', err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              'Could not load tour details.'
          );
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

  // Loading state
  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading tour details...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  // No tour found
  if (!tour) {
    return (
      <div className="p-8 text-center">
        Tour not found.
      </div>
    );
  }

  return (
    <div className="tour-details-container">
      
      {/* Breadcrumb */}
      <TourDetailsBreadCrumb
        title={tour.title}
        destination={tour.destination}
      />

      {/* Tour Images / Video */}
      <TourDetailsPhoto
        mainImage={tour.mainImage}
        galleryImages={tour.galleryImages}
        videoUrl={tour.videoUrl}
        title={tour.title}
      />

      {/* Tour Experience */}
      <TourExperiance
        tour={tour}
      />

      {/* Tour Map */}
      <TourDetailsMap
        location={tour.location}
        destination={tour.destination}
      />

      {/* Tour FAQ */}
      <TourDetailsFaq
        faqs={tour.faqs}
      />

    </div>
  );
};

export default TourDetails;