import React, { useEffect, useRef, useState } from "react";
import "./Gallary.css";

import API, { IMG_URL } from "../../api/axios";

const ITEMS_PER_PAGE = 5;

const Gallary = () => {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editId, setEditId] = useState(null);

  const [galleryData, setGalleryData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const fileInputRef = useRef(null);

  // =========================================
  // IMAGE URL PARSER
  // =========================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }

    let cleanPath = String(imagePath).replace(/\\/g, "/");

    const baseUrl = (IMG_URL || "").replace(/\/$/, "");

    if (
      cleanPath.startsWith("/uploads/") ||
      cleanPath.startsWith("uploads/")
    ) {
      const formattedPath = cleanPath.startsWith("/")
        ? cleanPath
        : `/${cleanPath}`;

      return `${baseUrl}${formattedPath}`;
    }

    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }

    return `${baseUrl}/uploads/gallery/${cleanPath}`;
  };

  // =========================================
  // FETCH ALL GALLERY
  // =========================================

  const fetchGallery = async () => {
    try {
      setTableLoading(true);

      const response = await API.get("/gallery");

      setGalleryData(response.data?.data || []);
    } catch (error) {
      console.error("FETCH GALLERY ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to load gallery"
      );
    } finally {
      setTableLoading(false);
    }
  };

  // =========================================
  // LOAD GALLERY
  // =========================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // =========================================
  // PAGINATION CALCULATION
  // =========================================

  const totalPages = Math.ceil(galleryData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentGalleryData = galleryData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // =========================================
  // KEEP PAGE VALID AFTER DELETE
  // =========================================

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =========================================
  // IMAGE SELECT & PREVIEW
  // =========================================

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];

    if (!selectedImage) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(selectedImage.type)) {
      alert("Only JPG, JPEG, PNG, WEBP, and AVIF images are allowed.");

      e.target.value = "";
      return;
    }

    if (selectedImage.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10 MB.");

      e.target.value = "";
      return;
    }

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(selectedImage);
    setPreview(URL.createObjectURL(selectedImage));
  };

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageName.trim()) {
      alert("Please enter image name.");
      return;
    }

    if (!editId && !image) {
      alert("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("imageName", imageName.trim());

      if (image) {
        formData.append("image", image);
      }

      let response;

      if (editId) {
        response = await API.put(`/gallery/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await API.post("/gallery", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert(
        response.data?.message || "Gallery image saved successfully"
      );

      await fetchGallery();

      setCurrentPage(1);

      resetForm();
    } catch (error) {
      console.error("SAVE GALLERY ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to save gallery image"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // EDIT GALLERY
  // =========================================

  const handleEdit = (item) => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setEditId(item._id);
    setImageName(item.imageName || "");
    setImage(null);
    setPreview(getImageUrl(item.image));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // DELETE GALLERY
  // =========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      const response = await API.delete(`/gallery/${id}`);

      alert(
        response.data?.message ||
          "Gallery image deleted successfully"
      );

      setGalleryData((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (editId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("DELETE GALLERY ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete gallery image"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // RESET FORM
  // =========================================

  const resetForm = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImageName("");
    setImage(null);
    setPreview("");
    setEditId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================
  // REMOVE PREVIEW
  // =========================================

  const removePreview = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================
  // CHANGE PAGE
  // =========================================

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);
  };

  // =========================================
  // GENERATE PAGE NUMBERS
  // =========================================

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("left-ellipsis");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("right-ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="Gallary">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="GallaryHeader">
        <div>
          <h2>Gallery Management</h2>

          <p>
            Add and manage your travel gallery images
          </p>
        </div>

        <div className="GallaryHeaderBadge">
          <span>{galleryData.length}</span>

          <small>Total Images</small>
        </div>
      </div>

      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="GallaryContent">

        {/* =========================================
            FORM CARD
        ========================================= */}

        <div className="GallaryFormCard">

          <div className="GallaryCardHeader">
            <div>
              <h3>
                {editId ? "Edit Gallery" : "Add Gallery"}
              </h3>

              <p>
                {editId
                  ? "Update gallery image details"
                  : "Upload a new gallery image"}
              </p>
            </div>
          </div>

          <form
            className="GallaryForm"
            onSubmit={handleSubmit}
          >

            {/* IMAGE NAME */}

            <div className="GallaryFormGroup">

              <label htmlFor="GallaryName">
                Image Name <span>*</span>
              </label>

              <input
                id="GallaryName"
                type="text"
                placeholder="Enter image name"
                value={imageName}
                onChange={(e) =>
                  setImageName(e.target.value)
                }
              />

            </div>

            {/* IMAGE UPLOAD */}

            <div className="GallaryFormGroup">

              <label htmlFor="GallaryImage">
                Image {!editId && <span>*</span>}
              </label>

              <div className="GallaryUploadBox">

                <input
                  ref={fileInputRef}
                  id="GallaryImage"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                  onChange={handleImageChange}
                />

                <div className="GallaryUploadContent">

                  <div className="GallaryUploadIcon">
                    ↑
                  </div>

                  <h4>Choose Image</h4>

                  <p>
                    PNG, JPG, JPEG, WEBP or AVIF
                  </p>

                  <small>
                    Maximum size: 10 MB
                  </small>

                </div>

              </div>

            </div>

            {/* PREVIEW */}

            {preview && (
              <div className="GallaryPreview">

                <div className="GallaryPreviewHeader">

                  <span>
                    Image Preview
                  </span>

                  <button
                    type="button"
                    onClick={removePreview}
                  >
                    Remove
                  </button>

                </div>

                <div className="GallaryPreviewImage">

                  <img
                    src={preview}
                    alt="Gallery Preview"
                    onError={(e) => {
                      e.currentTarget.onerror = null;

                      e.currentTarget.src =
                        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23ccc' viewBox='0 0 24 24'><path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/></svg>";
                    }}
                  />

                </div>

              </div>
            )}

            {/* BUTTONS */}

            <div className="GallaryFormActions">

              <button
                type="button"
                className="GallaryCancelButton"
                onClick={resetForm}
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
                  ? "Please Wait..."
                  : editId
                  ? "Update Image"
                  : "Add Image"}
              </button>

            </div>

          </form>

        </div>

        {/* =========================================
            TABLE CARD
        ========================================= */}

        <div className="GallaryTableCard">

          <div className="GallaryCardHeader">

            <div>
              <h3>Gallery List</h3>

              <p>
                All uploaded gallery images
              </p>
            </div>

          </div>

          <div className="GallaryTableWrapper">

            <table className="GallaryTable">

              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Image</th>
                  <th>Image Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {tableLoading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="GallaryLoading"
                    >
                      <div className="GallaryLoadingContent">
                        <span className="GallaryLoader"></span>
                        Loading gallery...
                      </div>
                    </td>
                  </tr>
                ) : currentGalleryData.length > 0 ? (

                  currentGalleryData.map((item, index) => {

                    const computedUrl =
                      getImageUrl(item.image);

                    const serialNumber =
                      startIndex + index + 1;

                    return (
                      <tr
                        key={
                          item._id || index
                        }
                      >

                        {/* SERIAL */}

                        <td>
                          <span className="GallarySerial">
                            {String(
                              serialNumber
                            ).padStart(2, "0")}
                          </span>
                        </td>

                        {/* IMAGE */}

                        <td>

                          <div className="GallaryTableImage">

                            <img
                              src={computedUrl}
                              alt={
                                item.imageName ||
                                "Gallery item"
                              }
                              loading="lazy"
                              onError={(e) => {

                                console.warn(
                                  `Failed to load image for "${item.imageName}":`,
                                  computedUrl
                                );

                                e.currentTarget.onerror =
                                  null;

                                e.currentTarget.src =
                                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='%23a0aec0' viewBox='0 0 24 24'><path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/></svg>";
                              }}
                            />

                          </div>

                        </td>

                        {/* NAME */}

                        <td>

                          <div className="GallaryImageName">
                            {item.imageName}
                          </div>

                        </td>

                        {/* ACTION */}

                        <td>

                          <div className="GallaryActions">

                            <button
                              type="button"
                              className="GallaryEditButton"
                              onClick={() =>
                                handleEdit(item)
                              }
                              disabled={loading}
                              title="Edit"
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
                              disabled={loading}
                              title="Delete"
                            >
                              🗑
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="GallaryEmpty"
                    >

                      <div className="GallaryEmptyIcon">
                        🖼
                      </div>

                      <h4>
                        No Gallery Images
                      </h4>

                      <p>
                        Add your first gallery image
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =========================================
              PREMIUM PAGINATION
          ========================================= */}

          {!tableLoading && totalPages > 1 && (
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
                      startIndex + ITEMS_PER_PAGE,
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

                {/* PREVIOUS */}

                <button
                  type="button"
                  className="GallaryPageArrow"
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  title="Previous page"
                >
                  <span>‹</span>
                </button>

                {/* PAGE NUMBERS */}

                <div className="GallaryPageNumbers">

                  {getPageNumbers().map(
                    (page, index) => {

                      if (
                        page ===
                        "left-ellipsis"
                      ) {
                        return (
                          <span
                            key={`left-${index}`}
                            className="GallaryPageEllipsis"
                          >
                            ...
                          </span>
                        );
                      }

                      if (
                        page ===
                        "right-ellipsis"
                      ) {
                        return (
                          <span
                            key={`right-${index}`}
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
                            currentPage === page
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handlePageChange(
                              page
                            )
                          }
                          aria-label={`Go to page ${page}`}
                          aria-current={
                            currentPage === page
                              ? "page"
                              : undefined
                          }
                        >
                          {String(page).padStart(
                            2,
                            "0"
                          )}
                        </button>
                      );
                    }
                  )}

                </div>

                {/* NEXT */}

                <button
                  type="button"
                  className="GallaryPageArrow"
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  aria-label="Next page"
                  title="Next page"
                >
                  <span>›</span>
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