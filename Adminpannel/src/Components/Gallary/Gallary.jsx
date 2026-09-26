
import React, { useEffect, useRef, useState } from "react";
import "./Gallary.css";

import API, { IMG_URL } from "../../api/axios";

const ITEMS_PER_PAGE = 5;

const Gallary = () => {
  // =====================================================
  // STATE
  // =====================================================

  const [mediaName, setMediaName] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  const [preview, setPreview] = useState("");

  const [editId, setEditId] = useState(null);

  const [galleryData, setGalleryData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Always contains latest gallery list
  const galleryRef = useRef([]);
  galleryRef.current = galleryData;

  // =====================================================
  // API BASE URL HELPER
  // =====================================================

  const getMediaUrl = (url) => {
    if (!url) return "";

    // Already full URL
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("blob:")
    ) {
      return url;
    }

    return `${IMG_URL}${url}`;
  };

  // =====================================================
  // BLOB URL HELPERS
  // =====================================================

  const revokeUrl = (url) => {
    if (
      url &&
      typeof url === "string" &&
      url.startsWith("blob:")
    ) {
      URL.revokeObjectURL(url);
    }
  };

  const revokeIfUnsaved = (url) => {
    if (!url) return;

    const isSaved = galleryRef.current.some(
      (item) => getMediaUrl(item.mediaUrl) === url
    );

    if (!isSaved) {
      revokeUrl(url);
    }
  };

  // =====================================================
  // CLEAR FILE INPUTS
  // =====================================================

  const clearFileInputs = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  // =====================================================
  // COMPONENT CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      galleryRef.current.forEach((item) => {
        revokeUrl(item.mediaUrl);
      });

      revokeUrl(preview);
    };
  }, []);

  // =====================================================
  // FETCH GALLERY FROM BACKEND
  // GET /api/gallery
  // =====================================================

  const fetchGallery = async () => {
    try {
      setFetching(true);

      const response = await API.get("/gallery");

      if (response.data?.success) {
        setGalleryData(response.data.data || []);
      } else {
        setGalleryData([]);
      }
    } catch (error) {
      console.error("FETCH GALLERY ERROR:", error);

      const message =
        error.response?.data?.message ||
        "Failed to load gallery data.";

      alert(message);
    } finally {
      setFetching(false);
    }
  };

  // =====================================================
  // LOAD GALLERY ON PAGE OPEN
  // =====================================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // =====================================================
  // FILE SELECT & PREVIEW
  // =====================================================

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // ===================================================
    // IMAGE VALIDATION
    // ===================================================

    if (type === "image") {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/avif",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert(
          "Only JPG, JPEG, PNG, WEBP, and AVIF images are allowed."
        );

        e.target.value = "";
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("Image size must be less than 10 MB.");

        e.target.value = "";
        return;
      }
    }

    // ===================================================
    // VIDEO VALIDATION
    // ===================================================

    if (type === "video") {
      const allowedTypes = [
        "video/mp4",
        "video/webm",
        "video/ogg",
        "video/quicktime",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert(
          "Only MP4, WEBM, OGG, and MOV videos are allowed."
        );

        e.target.value = "";
        return;
      }

      if (selectedFile.size > 50 * 1024 * 1024) {
        alert("Video size must be less than 50 MB.");

        e.target.value = "";
        return;
      }
    }

    // ===================================================
    // REMOVE OLD UNSAVED BLOB
    // ===================================================

    revokeIfUnsaved(preview);

    // ===================================================
    // CLEAR OTHER INPUT
    // ===================================================

    if (
      type === "image" &&
      videoInputRef.current
    ) {
      videoInputRef.current.value = "";
    }

    if (
      type === "video" &&
      imageInputRef.current
    ) {
      imageInputRef.current.value = "";
    }

    // ===================================================
    // CREATE PREVIEW
    // ===================================================

    const newBlobUrl =
      URL.createObjectURL(selectedFile);

    setMediaFile(selectedFile);
    setMediaType(type);
    setPreview(newBlobUrl);
  };

  // =====================================================
  // SUBMIT FORM
  // CREATE / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ===================================================
    // VALIDATE TITLE
    // ===================================================

    if (!mediaName.trim()) {
      alert("Please enter a media title/name.");
      return;
    }

    // ===================================================
    // VALIDATE FILE FOR CREATE
    // ===================================================

    if (!editId && !mediaFile) {
      alert("Please upload a media file.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // FORM DATA
      // =================================================

      const formData = new FormData();

      formData.append(
        "mediaName",
        mediaName.trim()
      );

      formData.append(
        "mediaType",
        mediaType
      );

      // IMPORTANT:
      // Backend uses upload.single("mediaFile")
      //
      if (mediaFile) {
        formData.append(
          "mediaFile",
          mediaFile
        );
      }

      // =================================================
      // UPDATE
      // =================================================

      if (editId) {
        const response = await API.put(
          `/gallery/${editId}`,
          formData
        );

        if (response.data?.success) {
          alert(
            "Media updated successfully."
          );

          // Remove local blob preview
          revokeUrl(preview);

          resetForm(false);

          // Reload fresh MongoDB data
          await fetchGallery();

          return;
        }

        throw new Error(
          response.data?.message ||
            "Failed to update media."
        );
      }

      // =================================================
      // CREATE
      // =================================================

      const response = await API.post(
        "/gallery",
        formData
      );

      if (response.data?.success) {
        alert(
          "Media uploaded successfully."
        );

        // Remove local blob preview
        revokeUrl(preview);

        resetForm(false);

        setCurrentPage(1);

        // Reload from MongoDB
        await fetchGallery();

        return;
      }

      throw new Error(
        response.data?.message ||
          "Failed to upload media."
      );
    } catch (error) {
      console.error(
        "GALLERY SUBMIT ERROR:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EDIT GALLERY
  // =====================================================

  const handleEdit = (item) => {
    revokeIfUnsaved(preview);

    clearFileInputs();

    setEditId(item._id);

    setMediaName(
      item.mediaName || ""
    );

    setMediaFile(null);

    setMediaType(
      item.mediaType || "image"
    );

    setPreview(
      getMediaUrl(item.mediaUrl)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE GALLERY
  // DELETE /api/gallery/:id
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this item?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await API.delete(
        `/gallery/${id}`
      );

      if (response.data?.success) {
        // If currently editing this item
        if (editId === id) {
          resetForm();
        }

        // Remove from current UI immediately
        setGalleryData((prev) =>
          prev.filter(
            (item) => item._id !== id
          )
        );

        alert(
          "Media deleted successfully."
        );

        return;
      }

      throw new Error(
        response.data?.message ||
          "Failed to delete media."
      );
    } catch (error) {
      console.error(
        "DELETE GALLERY ERROR:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete media.";

      alert(message);
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = (
    revokePreview = true
  ) => {
    if (revokePreview) {
      revokeIfUnsaved(preview);
    }

    setMediaName("");
    setMediaFile(null);
    setMediaType("image");
    setPreview("");
    setEditId(null);

    clearFileInputs();
  };

  // =====================================================
  // REMOVE PREVIEW
  // =====================================================

  const removePreview = () => {
    revokeIfUnsaved(preview);

    setMediaFile(null);
    setPreview("");

    clearFileInputs();
  };

  // =====================================================
  // VIDEO FRAME
  // =====================================================

  const showVideoFrame = (e) => {
    try {
      e.currentTarget.currentTime = 0.1;
    } catch (err) {
      // Ignore
    }
  };

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    galleryData.length /
      ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const currentGalleryData =
    galleryData.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (
    page
  ) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);
  };

  // =====================================================
  // PAGE NUMBERS
  // =====================================================

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("left-ellipsis");
    }

    const startPage = Math.max(
      2,
      currentPage - 1
    );

    const endPage = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (
      let i = startPage;
      i <= endPage;
      i++
    ) {
      pages.push(i);
    }

    if (
      currentPage <
      totalPages - 2
    ) {
      pages.push(
        "right-ellipsis"
      );
    }

    pages.push(totalPages);

    return pages;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="Gallary">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="GallaryHeader">
        <div>
          <h2>
            Gallery & Video Management
          </h2>

          <p>
            Upload, update, and manage
            your travel photos and videos
          </p>
        </div>

        <div className="GallaryHeaderBadge">
          <span>
            {galleryData.length}
          </span>

          <small>
            Total Media
          </small>
        </div>
      </div>

      <div className="GallaryContent">

        {/* =================================================
            FORM CARD
        ================================================= */}

        <div className="GallaryFormCard">

          <div className="GallaryCardHeader">
            <div>
              <h3>
                {editId
                  ? "Edit Media"
                  : "Upload Media"}
              </h3>

              <p>
                {editId
                  ? "Update existing media"
                  : "Add photo or video to gallery"}
              </p>
            </div>
          </div>

          <form
            className="GallaryForm"
            onSubmit={handleSubmit}
          >

            {/* MEDIA NAME */}

            <div className="GallaryFormGroup">
              <label htmlFor="GallaryName">
                Media Title{" "}
                <span>*</span>
              </label>

              <input
                id="GallaryName"
                type="text"
                placeholder="Enter title or description"
                value={mediaName}
                onChange={(e) =>
                  setMediaName(
                    e.target.value
                  )
                }
              />
            </div>

            {/* UPLOAD SECTION */}

            <div className="GallaryUploadGrid">

              {/* PHOTO */}

              <div className="GallaryFormGroup">

                <label>
                  Upload Photo{" "}
                  {!editId &&
                    mediaType ===
                      "image" && (
                      <span>*</span>
                    )}
                </label>

                <div
                  className={`GallaryUploadBox ${
                    mediaType ===
                      "image" &&
                    preview
                      ? "active"
                      : ""
                  }`}
                >

                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "image"
                      )
                    }
                  />

                  <div className="GallaryUploadContent">

                    <div className="GallaryUploadIcon">
                      📷
                    </div>

                    <h4>
                      Upload Photo
                    </h4>

                    <p>
                      JPG, PNG, WEBP, AVIF
                    </p>

                    <small>
                      Max: 10 MB
                    </small>

                  </div>
                </div>
              </div>

              {/* VIDEO */}

              <div className="GallaryFormGroup">

                <label>
                  Upload Video{" "}
                  {!editId &&
                    mediaType ===
                      "video" && (
                      <span>*</span>
                    )}
                </label>

                <div
                  className={`GallaryUploadBox ${
                    mediaType ===
                      "video" &&
                    preview
                      ? "active"
                      : ""
                  }`}
                >

                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "video"
                      )
                    }
                  />

                  <div className="GallaryUploadContent">

                    <div className="GallaryUploadIcon">
                      🎥
                    </div>

                    <h4>
                      Upload Video
                    </h4>

                    <p>
                      MP4, WEBM, MOV
                    </p>

                    <small>
                      Max: 50 MB
                    </small>

                  </div>
                </div>
              </div>
            </div>

            {/* PREVIEW */}

            {preview && (
              <div className="GallaryPreview">

                <div className="GallaryPreviewHeader">

                  <span>
                    Selected Preview (
                    {mediaType.toUpperCase()}
                    )
                  </span>

                  <button
                    type="button"
                    onClick={removePreview}
                  >
                    Remove
                  </button>

                </div>

                <div className="GallaryPreviewImage">

                  {mediaType ===
                  "video" ? (
                    <video
                      key={preview}
                      src={preview}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      key={preview}
                      src={preview}
                      alt="Preview"
                    />
                  )}

                </div>
              </div>
            )}

            {/* BUTTONS */}

            <div className="GallaryFormActions">

              <button
                type="button"
                className="GallaryCancelButton"
                onClick={() =>
                  resetForm()
                }
                disabled={loading}
              >
                Clear
              </button>

              <button
                type="submit"
                className="GallarySubmitButton"
                disabled={loading}
              >
                {loading
                  ? editId
                    ? "Updating..."
                    : "Uploading..."
                  : editId
                  ? "Update Media"
                  : "Publish Media"}
              </button>

            </div>

          </form>
        </div>

        {/* =================================================
            TABLE CARD
        ================================================= */}

        <div className="GallaryTableCard">

          <div className="GallaryCardHeader">

            <div>
              <h3>
                Media Library
              </h3>

              <p>
                All uploaded photos and videos
              </p>
            </div>

          </div>

          <div className="GallaryTableWrapper">

            <table className="GallaryTable">

              <thead>
                <tr>
                  <th>
                    Sl. No.
                  </th>

                  <th>
                    Media Preview
                  </th>

                  <th>
                    Title
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {/* LOADING */}

                {fetching ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="GallaryEmpty"
                    >
                      <div className="GallaryEmptyIcon">
                        ⏳
                      </div>

                      <h4>
                        Loading Media...
                      </h4>

                      <p>
                        Fetching gallery from server
                      </p>
                    </td>
                  </tr>
                ) : currentGalleryData.length >
                  0 ? (

                  currentGalleryData.map(
                    (item, index) => {

                      const serialNumber =
                        startIndex +
                        index +
                        1;

                      const itemUrl =
                        getMediaUrl(
                          item.mediaUrl
                        );

                      return (
                        <tr
                          key={
                            item._id
                          }
                        >

                          {/* SERIAL */}

                          <td>
                            <span className="GallarySerial">
                              {String(
                                serialNumber
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>
                          </td>

                          {/* PREVIEW */}

                          <td>

                            <div className="GallaryTableImage">

                              {item.mediaType ===
                              "video" ? (
                                <video
                                  key={
                                    itemUrl
                                  }
                                  src={
                                    itemUrl
                                  }
                                  preload="metadata"
                                  muted
                                  playsInline
                                  onLoadedMetadata={
                                    showVideoFrame
                                  }
                                />
                              ) : (
                                <img
                                  key={
                                    itemUrl
                                  }
                                  src={
                                    itemUrl
                                  }
                                  alt={
                                    item.mediaName ||
                                    "Media item"
                                  }
                                />
                              )}

                            </div>

                          </td>

                          {/* TITLE */}

                          <td>

                            <div className="GallaryImageName">
                              {
                                item.mediaName
                              }
                            </div>

                          </td>

                          {/* TYPE */}

                          <td>

                            <span
                              className={`GallaryTypeTag ${item.mediaType}`}
                            >
                              {(
                                item.mediaType ||
                                "image"
                              ).toUpperCase()}
                            </span>

                          </td>

                          {/* ACTION */}

                          <td>

                            <div className="GallaryActions">

                              <button
                                type="button"
                                className="GallaryEditButton"
                                onClick={() =>
                                  handleEdit(
                                    item
                                  )
                                }
                                title="Edit"
                                disabled={
                                  loading ||
                                  deletingId ===
                                    item._id
                                }
                              >
                                ✎
                              </button>

                              <button
                                type="button"
                                className="GallaryDeleteButton"
                                onClick={() =>
                                  handleDelete(
                                    item._id
                                  )
                                }
                                title="Delete"
                                disabled={
                                  deletingId ===
                                  item._id
                                }
                              >
                                {deletingId ===
                                item._id
                                  ? "..."
                                  : "🗑"}
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )

                ) : (

                  /* EMPTY */

                  <tr>

                    <td
                      colSpan="5"
                      className="GallaryEmpty"
                    >

                      <div className="GallaryEmptyIcon">
                        📁
                      </div>

                      <h4>
                        No Media Found
                      </h4>

                      <p>
                        Upload your first photo or
                        video using the form
                      </p>

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          {totalPages > 1 && (

            <div className="GallaryPagination">

              <div className="GallaryPaginationInfo">

                <span>

                  Showing{" "}

                  <strong>
                    {startIndex + 1}
                  </strong>

                  {" - "}

                  <strong>
                    {Math.min(
                      startIndex +
                        ITEMS_PER_PAGE,
                      galleryData.length
                    )}
                  </strong>

                  {" of "}

                  <strong>
                    {galleryData.length}
                  </strong>

                </span>

              </div>

              <div className="GallaryPaginationControls">

                <button
                  type="button"
                  className="GallaryPageArrow"
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  disabled={
                    currentPage === 1
                  }
                  aria-label="Previous page"
                >
                  <span>
                    ‹
                  </span>
                </button>

                <div className="GallaryPageNumbers">

                  {getPageNumbers().map(
                    (
                      page,
                      index
                    ) => {

                      if (
                        page ===
                          "left-ellipsis" ||
                        page ===
                          "right-ellipsis"
                      ) {
                        return (
                          <span
                            key={`ell-${index}`}
                            className="GallaryPageEllipsis"
                          >
                            ...
                          </span>
                        );
                      }

                      return (
                        <button
                          key={page}
                          type="button"
                          className={`GallaryPageNumber ${
                            currentPage ===
                            page
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handlePageChange(
                              page
                            )
                          }
                        >
                          {String(
                            page
                          ).padStart(
                            2,
                            "0"
                          )}
                        </button>
                      );
                    }
                  )}

                </div>

                <button
                  type="button"
                  className="GallaryPageArrow"
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  aria-label="Next page"
                >
                  <span>
                    ›
                  </span>
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Gallary;

