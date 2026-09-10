import React, { useState, useEffect, useRef } from "react";
import ToursBasicInformation from "../../Components/ToursBasicInformation/ToursBasicInformation";
import ToursImagesMedia from "../../Components/ToursImagesMedia/ToursImagesMedia";
import ToursItinerary from "../../Components/ToursItinerary/ToursItinerary";
import ToursLocation from "../../Components/ToursLocation/ToursLocation";
import ToursFAQSection from "../../Components/ToursFAQSection/ToursFAQSection";
import ToursAllSection from "../../Components/ToursAllSection/ToursAllSection";
import API, { IMG_URL } from "../../api/axios";

import {
  FiPlus,
  FiList,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
  FiX,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";

import "./Tours.css";

const INITIAL_BASIC_INFO = {
  title: "",
  slug: "",
  destination: "",
  duration: "",
  shortDescription: "",
  detailedDescription: "",
};

const INITIAL_ITINERARY = [
  {
    id: 1,
    dayNumber: "Day 01",
    title: "",
    description: "",
    highlights: [],
    isOpen: true,
  },
];

const INITIAL_FAQS = [
  {
    id: 1,
    number: "01",
    question: "",
    answer: "",
    isOpen: true,
  },
];

const Tours = () => {
  // View mode: "list" | "form"
  const [viewMode, setViewMode] = useState("form");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);
  const [isErrorToast, setIsErrorToast] = useState(false);

  // Delete Modal State
  const [deleteModalTour, setDeleteModalTour] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Unified Form States (Clean, no auto-filled dummy data)
  const [basicInfo, setBasicInfo] = useState(INITIAL_BASIC_INFO);

  // Media
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  // Itinerary, Location, FAQs
  const [itineraryDays, setItineraryDays] = useState(INITIAL_ITINERARY);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [faqs, setFaqs] = useState(INITIAL_FAQS);

  // Sidebar details
  const [status, setStatus] = useState("Draft");
  const [visibility, setVisibility] = useState("Public");
  const [publishDate, setPublishDate] = useState("Immediately");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [seoImagePreview, setSeoImagePreview] = useState(null);
  const [seoImageFile, setSeoImageFile] = useState(null);

  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [category, setCategory] = useState("");
  const [includes, setIncludes] = useState([]);
  const [excludes, setExcludes] = useState([]);
  const [tags, setTags] = useState([]);

  // Show Toast
  const showToast = (message, isError = false) => {
    setToastMessage(message);
    setIsErrorToast(isError);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch all tours from backend
  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tours");
      const data = res.data.data || res.data || [];
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tours:", error);
      showToast(error.response?.data?.message || "Failed to load tours from database", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Reset form to completely blank
  const resetForm = () => {
    setEditingId(null);
    setBasicInfo(INITIAL_BASIC_INFO);
    setMainImagePreview(null);
    setMainImageFile(null);
    setGalleryPreviews([]);
    setGalleryFiles([]);
    setExistingGalleryImages([]);
    setVideoUrl("");
    setItineraryDays(INITIAL_ITINERARY);
    setAddress("");
    setCoordinates("");
    setFaqs(INITIAL_FAQS);
    setStatus("Draft");
    setVisibility("Public");
    setPublishDate("Immediately");
    setMetaTitle("");
    setMetaDescription("");
    setFocusKeyword("");
    setSeoImagePreview(null);
    setSeoImageFile(null);
    setPrice("");
    setDiscountPrice("");
    setMaxPeople("");
    setDifficulty("Easy");
    setBestTimeToVisit("");
    setCategory("");
    setIncludes([]);
    setExcludes([]);
    setTags([]);
  };

  // Populate form for editing
  const handleEditTour = (tour) => {
    setEditingId(tour._id);
    setBasicInfo({
      title: tour.title || "",
      slug: tour.slug || "",
      destination: tour.destination || "",
      duration: tour.duration || "",
      shortDescription: tour.shortDescription || "",
      detailedDescription: tour.detailedDescription || "",
    });

    const fullMainImg = tour.mainImage
      ? tour.mainImage.startsWith("http")
        ? tour.mainImage
        : `${IMG_URL}${tour.mainImage}`
      : null;
    setMainImagePreview(fullMainImg);
    setMainImageFile(null);

    const existingGallery = (tour.galleryImages || []).map((img) =>
      img.startsWith("http") ? img : `${IMG_URL}${img}`
    );
    setExistingGalleryImages(tour.galleryImages || []);
    setGalleryPreviews(existingGallery);
    setGalleryFiles([]);

    setVideoUrl(tour.videoUrl || "");

    if (Array.isArray(tour.itinerary) && tour.itinerary.length > 0) {
      setItineraryDays(
        tour.itinerary.map((d, i) => ({
          id: d._id || i + 1,
          dayNumber: d.dayNumber || `Day 0${i + 1}`,
          title: d.title || "",
          description: d.description || "",
          highlights: d.highlights || [],
          isOpen: i === 0,
        }))
      );
    } else {
      setItineraryDays(INITIAL_ITINERARY);
    }

    setAddress(tour.location?.address || "Puri, Odisha, India");
    setCoordinates(tour.location?.coordinates || "");

    if (Array.isArray(tour.faqs) && tour.faqs.length > 0) {
      setFaqs(
        tour.faqs.map((f, i) => ({
          id: f._id || i + 1,
          number: f.number || `0${i + 1}`,
          question: f.question || "",
          answer: f.answer || "",
          isOpen: i === 0,
        }))
      );
    } else {
      setFaqs(INITIAL_FAQS);
    }

    setStatus(tour.status || "Published");
    setVisibility(tour.visibility || "Public");
    setPublishDate(tour.publishDate || "Immediately");
    setMetaTitle(tour.metaTitle || "");
    setMetaDescription(tour.metaDescription || "");
    setFocusKeyword(tour.focusKeyword || "");

    const fullSeoImg = tour.seoImage
      ? tour.seoImage.startsWith("http")
        ? tour.seoImage
        : `${IMG_URL}${tour.seoImage}`
      : null;
    setSeoImagePreview(fullSeoImg);
    setSeoImageFile(null);

    setPrice(String(tour.price || "0"));
    setDiscountPrice(String(tour.discountPrice || "0"));
    setMaxPeople(String(tour.maxPeople || "20"));
    setDifficulty(tour.difficulty || "Easy");
    setBestTimeToVisit(tour.bestTimeToVisit || "October to March");
    setCategory(tour.category || "Culture");
    setIncludes(tour.includes || []);
    setExcludes(tour.excludes || []);
    setTags(tour.tags || []);

    setViewMode("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Main File
  const handleMainFileChange = (file) => {
    setMainImageFile(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  // Handle Gallery Files
  const handleGalleryFilesChange = (newFiles) => {
    setGalleryFiles((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveGalleryImage = (index) => {
    const existingCount = existingGalleryImages.length;
    if (index < existingCount) {
      // Removing an existing image
      setExistingGalleryImages((prev) => prev.filter((_, idx) => idx !== index));
      setGalleryPreviews((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      // Removing a newly uploaded file
      const newFileIndex = index - existingCount;
      setGalleryFiles((prev) => prev.filter((_, idx) => idx !== newFileIndex));
      setGalleryPreviews((prev) => prev.filter((_, idx) => idx !== index));
    }
  };

  // Handle SEO File
  const handleSeoFileChange = (file) => {
    setSeoImageFile(file);
    setSeoImagePreview(URL.createObjectURL(file));
  };

  // Submit to Backend Database
  const handleSaveTour = async () => {
    // Validation
    if (!basicInfo.title || !basicInfo.title.trim()) {
      showToast("Please enter a Tour Title.", true);
      return;
    }
    if (!basicInfo.destination || !basicInfo.destination.trim()) {
      showToast("Please enter a Destination.", true);
      return;
    }
    if (!basicInfo.duration || !basicInfo.duration.trim()) {
      showToast("Please enter Tour Duration (e.g. 5 Days 4 Nights).", true);
      return;
    }
    if (!basicInfo.shortDescription || !basicInfo.shortDescription.trim()) {
      showToast("Please enter Short Description.", true);
      return;
    }
    if (!basicInfo.detailedDescription || !basicInfo.detailedDescription.trim()) {
      showToast("Please enter Detailed Description.", true);
      return;
    }
    if (!price || isNaN(Number(price))) {
      showToast("Please enter a valid Price.", true);
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();

      // Basic Information
      formData.append("title", basicInfo.title.trim());
      formData.append("slug", basicInfo.slug.trim());
      formData.append("destination", basicInfo.destination.trim());
      formData.append("duration", basicInfo.duration.trim());
      formData.append("shortDescription", basicInfo.shortDescription.trim());
      formData.append("detailedDescription", basicInfo.detailedDescription.trim());

      // Media files
      if (mainImageFile) {
        formData.append("mainImage", mainImageFile);
      }
      if (seoImageFile) {
        formData.append("seoImage", seoImageFile);
      }
      galleryFiles.forEach((file) => {
        formData.append("galleryImages", file);
      });
      formData.append("existingGalleryImages", JSON.stringify(existingGalleryImages));
      formData.append("videoUrl", videoUrl.trim());

      // Itinerary, Location, FAQs (as JSON strings)
      const cleanItinerary = itineraryDays.map((d) => ({
        dayNumber: d.dayNumber,
        title: d.title,
        description: d.description,
        highlights: d.highlights || [],
      }));
      formData.append("itinerary", JSON.stringify(cleanItinerary));

      const cleanLocation = {
        address: address.trim(),
        coordinates: coordinates.trim(),
        mapUrl: `https://maps.google.com/maps?q=${encodeURIComponent(address.trim())}&output=embed`,
      };
      formData.append("location", JSON.stringify(cleanLocation));

      const cleanFaqs = faqs.map((f) => ({
        number: f.number,
        question: f.question,
        answer: f.answer,
      }));
      formData.append("faqs", JSON.stringify(cleanFaqs));

      // Sidebar details
      formData.append("status", status);
      formData.append("visibility", visibility);
      formData.append("publishDate", publishDate);
      formData.append("metaTitle", metaTitle.trim());
      formData.append("metaDescription", metaDescription.trim());
      formData.append("focusKeyword", focusKeyword.trim());

      formData.append("price", Number(price) || 0);
      formData.append("discountPrice", Number(discountPrice) || 0);
      formData.append("maxPeople", Number(maxPeople) || 20);
      formData.append("difficulty", difficulty);
      formData.append("bestTimeToVisit", bestTimeToVisit.trim());
      formData.append("category", category.trim());

      formData.append("includes", JSON.stringify(includes));
      formData.append("excludes", JSON.stringify(excludes));
      formData.append("tags", JSON.stringify(tags));

      let res;
      if (editingId) {
        res = await API.put(`/tours/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Tour package updated successfully in database!");
      } else {
        res = await API.post("/tours", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Tour package created and saved to database successfully!");
      }

      await fetchTours();
      resetForm();
      setViewMode("list");
    } catch (error) {
      console.error("Save tour error:", error);
      showToast(
        error.response?.data?.message || "Failed to save tour package to database",
        true
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete Tour and all associated images from disk
  const confirmDeleteTour = async () => {
    if (!deleteModalTour) return;
    try {
      setIsDeleting(true);
      await API.delete(`/tours/${deleteModalTour._id}`);
      showToast("Tour package and all associated images deleted successfully!");
      setDeleteModalTour(null);
      await fetchTours();
    } catch (error) {
      console.error("Delete tour error:", error);
      showToast(error.response?.data?.message || "Failed to delete tour package", true);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered tours for list view
  const filteredTours = tours.filter((t) => {
    const q = searchTerm.toLowerCase();
    return (
      (t.title && t.title.toLowerCase().includes(q)) ||
      (t.destination && t.destination.toLowerCase().includes(q)) ||
      (t.category && t.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="tours-admin-wrapper">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`tours-toast-notification ${
            isErrorToast ? "tours-toast-error" : "tours-toast-success"
          }`}
        >
          {isErrorToast ? (
            <FiAlertCircle className="tours-toast-icon" />
          ) : (
            <FiCheckCircle className="tours-toast-icon" />
          )}
          <span>{toastMessage}</span>
          <button
            type="button"
            className="tours-toast-close"
            onClick={() => setToastMessage(null)}
          >
            <FiX />
          </button>
        </div>
      )}

      {/* Top Admin Controls Navigation Bar */}
      <div className="tours-nav-header">
        <div className="tours-nav-left">
          {viewMode === "form" && (
            <button
              type="button"
              className="tours-btn-back"
              onClick={() => {
                resetForm();
                setViewMode("list");
              }}
              title="View all tours"
            >
              <FiArrowLeft /> Back to Tours List
            </button>
          )}
          <h1 className="tours-heading-main">
            {viewMode === "list"
              ? "Tour Packages"
              : editingId
              ? `Edit Tour: ${basicInfo.title || "Tour Package"}`
              : "Add New Tour Package"}
          </h1>
        </div>

        <div className="tours-nav-right">
          {viewMode === "list" ? (
            <button
              type="button"
              className="tours-btn-primary-action"
              onClick={() => {
                resetForm();
                setViewMode("form");
              }}
            >
              <FiPlus /> Add New Tour
            </button>
          ) : (
            <button
              type="button"
              className="tours-btn-secondary-action"
              onClick={() => {
                fetchTours();
                setViewMode("list");
              }}
            >
              <FiList /> View All Tours ({tours.length})
            </button>
          )}
        </div>
      </div>

      {/* =========================================================
          VIEW MODE: LIST (ALL TOURS TABLE)
      ========================================================= */}
      {viewMode === "list" ? (
        <div className="tours-list-container">
          {/* Search bar */}
          <div className="tours-list-toolbar">
            <div className="tours-search-box">
              <FiSearch className="tours-search-icon" />
              <input
                type="text"
                placeholder="Search by title, destination, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="tours-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="tours-search-clear"
                  onClick={() => setSearchTerm("")}
                >
                  <FiX />
                </button>
              )}
            </div>
            <span className="tours-count-badge">
              Total: <strong>{filteredTours.length}</strong> {filteredTours.length === 1 ? "tour" : "tours"}
            </span>
          </div>

          {loading ? (
            <div className="tours-loading-box">
              <div className="tours-spinner"></div>
              <p>Loading tour packages from database...</p>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="tours-empty-state">
              <p className="tours-empty-title">No tour packages found</p>
              <p className="tours-empty-subtitle">
                {searchTerm
                  ? "Try clearing your search query."
                  : "Click '+ Add New Tour' to create your first package."}
              </p>
              <button
                type="button"
                className="tours-btn-primary-action"
                onClick={() => {
                  resetForm();
                  setViewMode("form");
                }}
              >
                <FiPlus /> Create Tour Package
              </button>
            </div>
          ) : (
            <div className="tours-table-card">
              <table className="tours-table">
                <thead>
                  <tr>
                    <th>Tour Details</th>
                    <th>Destination</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTours.map((t) => {
                    const thumbUrl = t.mainImage
                      ? t.mainImage.startsWith("http")
                        ? t.mainImage
                        : `${IMG_URL}${t.mainImage}`
                      : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80";

                    return (
                      <tr key={t._id}>
                        <td>
                          <div className="tours-table-item">
                            <img
                              src={thumbUrl}
                              alt={t.title}
                              className="tours-table-thumb"
                            />
                            <div>
                              <strong className="tours-table-title">{t.title}</strong>
                              <span className="tours-table-slug">/{t.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="tours-table-info-cell">
                            <FiMapPin className="tours-cell-icon" />
                            <span>{t.destination}</span>
                          </div>
                        </td>
                        <td>
                          <div className="tours-table-info-cell">
                            <FiClock className="tours-cell-icon" />
                            <span>{t.duration}</span>
                          </div>
                        </td>
                        <td>
                          <div className="tours-table-price">
                            <strong>₹{Number(t.price || 0).toLocaleString("en-IN")}</strong>
                            {t.discountPrice > 0 && (
                              <span className="tours-table-discount">
                                ₹{Number(t.discountPrice).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`tours-status-pill ${
                              t.status === "Published"
                                ? "status-published"
                                : t.status === "Archived"
                                ? "status-archived"
                                : "status-draft"
                            }`}
                          >
                            {t.status || "Draft"}
                          </span>
                        </td>
                        <td>
                          <div className="tours-table-actions">
                            <button
                              type="button"
                              className="tours-action-btn tours-action-edit"
                              onClick={() => handleEditTour(t)}
                              title="Edit Tour Package"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              type="button"
                              className="tours-action-btn tours-action-delete"
                              onClick={() => setDeleteModalTour(t)}
                              title="Delete Tour & Images"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* =========================================================
            VIEW MODE: FORM (6 EDIT / CREATE SUBCOMPONENTS)
        ========================================================= */
        <div className="tours-page">
          {/* LEFT CONTENT */}
          <main className="tours-main-content">
            <ToursBasicInformation
              formData={basicInfo}
              setFormData={setBasicInfo}
              onSave={handleSaveTour}
              isSubmitting={saving}
            />

            <ToursImagesMedia
              mainImage={mainImagePreview}
              setMainImage={setMainImagePreview}
              galleryImages={galleryPreviews}
              setGalleryImages={setGalleryPreviews}
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              onMainFileChange={handleMainFileChange}
              onGalleryFilesChange={handleGalleryFilesChange}
              onRemoveGalleryImage={handleRemoveGalleryImage}
              onSave={handleSaveTour}
              isSubmitting={saving}
            />

            <ToursItinerary
              days={itineraryDays}
              setDays={setItineraryDays}
              onSave={handleSaveTour}
              isSubmitting={saving}
            />

            <ToursLocation
              address={address}
              setAddress={setAddress}
              coordinates={coordinates}
              setCoordinates={setCoordinates}
            />

            <ToursFAQSection
              faqs={faqs}
              setFaqs={setFaqs}
              onSave={handleSaveTour}
              isSubmitting={saving}
            />
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="tours-right-sidebar">
            <ToursAllSection
              status={status}
              setStatus={setStatus}
              visibility={visibility}
              setVisibility={setVisibility}
              publishDate={publishDate}
              setPublishDate={setPublishDate}
              metaTitle={metaTitle}
              setMetaTitle={setMetaTitle}
              metaDescription={metaDescription}
              setMetaDescription={setMetaDescription}
              focusKeyword={focusKeyword}
              setFocusKeyword={setFocusKeyword}
              seoImage={seoImagePreview}
              setSeoImage={setSeoImagePreview}
              onSeoFileChange={handleSeoFileChange}
              price={price}
              setPrice={setPrice}
              discountPrice={discountPrice}
              setDiscountPrice={setDiscountPrice}
              maxPeople={maxPeople}
              setMaxPeople={setMaxPeople}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              bestTimeToVisit={bestTimeToVisit}
              setBestTimeToVisit={setBestTimeToVisit}
              category={category}
              setCategory={setCategory}
              includes={includes}
              setIncludes={setIncludes}
              excludes={excludes}
              setExcludes={setExcludes}
              tags={tags}
              setTags={setTags}
              onSubmit={handleSaveTour}
              isSubmitting={saving}
              toastMessage={toastMessage}
              showToast={showToast}
            />
          </aside>
        </div>
      )}

      {/* =========================================================
          DELETE CONFIRMATION MODAL
      ========================================================= */}
      {deleteModalTour && (
        <div className="tours-modal-overlay">
          <div className="tours-modal-card">
            <div className="tours-modal-icon-danger">
              <FiTrash2 />
            </div>
            <h3 className="tours-modal-title">Delete Tour Package?</h3>
            <p className="tours-modal-desc">
              Are you sure you want to permanently delete{" "}
              <strong>"{deleteModalTour.title}"</strong>?
              <br />
              <span className="tours-modal-note">
                All associated featured, gallery, and SEO images will also be permanently deleted from the server.
              </span>
            </p>

            <div className="tours-modal-actions">
              <button
                type="button"
                className="tours-modal-btn-cancel"
                onClick={() => setDeleteModalTour(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="tours-modal-btn-delete"
                onClick={confirmDeleteTour}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting & Cleaning Images..." : "Yes, Delete Everything"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;