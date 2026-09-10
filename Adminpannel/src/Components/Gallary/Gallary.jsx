
import React, { useEffect, useRef, useState } from "react";
import "./Gallary.css";

// API
import API, { IMG_URL } from "../../api/axios";

const Gallary = () => {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editId, setEditId] = useState(null);

  const [galleryData, setGalleryData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const fileInputRef = useRef(null);

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
  // LOAD GALLERY WHEN COMPONENT LOADS
  // =========================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // =========================================
  // IMAGE SELECT
  // =========================================

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];

    if (!selectedImage) {
      return;
    }

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(selectedImage.type)) {
      alert(
        "Only JPG, JPEG, PNG, WEBP and AVIF images are allowed."
      );

      e.target.value = "";
      return;
    }

    // Maximum 10MB
    if (selectedImage.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10 MB.");

      e.target.value = "";
      return;
    }

    setImage(selectedImage);

    // Create preview
    const previewUrl = URL.createObjectURL(selectedImage);

    setPreview(previewUrl);
  };

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image name
    if (!imageName.trim()) {
      alert("Please enter image name.");
      return;
    }

    // Image required when adding
    if (!editId && !image) {
      alert("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // Add image name
      formData.append("imageName", imageName.trim());

      // Add image if selected
      if (image) {
        formData.append("image", image);
      }

      let response;

      // =======================================
      // UPDATE
      // =======================================

      if (editId) {
        response = await API.put(
          `/gallery/${editId}`,
          formData
        );
      }

      // =======================================
      // CREATE
      // =======================================

      else {
        response = await API.post(
          "/gallery",
          formData
        );
      }

      alert(
        response.data?.message ||
          "Gallery image saved successfully"
      );

      // Reload gallery from database
      await fetchGallery();

      // Reset form
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
    setEditId(item._id);

    setImageName(item.imageName);

    // No new image selected yet
    setImage(null);

    // Show existing image
    setPreview(
      getImageUrl(item.image)
    );

    // Scroll page to form
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

      const response = await API.delete(
        `/gallery/${id}`
      );

      alert(
        response.data?.message ||
          "Gallery image deleted successfully"
      );

      // Remove from current table
      setGalleryData((prev) =>
        prev.filter((item) => item._id !== id)
      );

      // If currently editing deleted image
      if (editId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(
        "DELETE GALLERY ERROR:",
        error
      );

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
    setImageName("");
    setImage(null);
    setPreview("");
    setEditId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================
  // REMOVE SELECTED IMAGE
  // =========================================

  const removePreview = () => {
    setImage(null);
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================
  // IMAGE URL
  // =========================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    // If backend returns complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${IMG_URL}/uploads/gallery/${image}`;
  };

  // =========================================
  // RETURN
  // =========================================

  return (
    <div className="Gallary">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="GallaryHeader">

        <div>
          <h2>Gallery Management</h2>

          <p>
            Add and manage your travel gallery
            images
          </p>
        </div>

        <div className="GallaryHeaderBadge">

          <span>
            {galleryData.length}
          </span>

          <small>
            Total Images
          </small>

        </div>

      </div>


      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="GallaryContent">


        {/* ===================================
            FORM
        ==================================== */}

        <div className="GallaryFormCard">

          <div className="GallaryCardHeader">

            <div>

              <h3>
                {editId
                  ? "Edit Gallery"
                  : "Add Gallery"}
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

                Image Name

                <span>*</span>

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


            {/* IMAGE */}

            <div className="GallaryFormGroup">

              <label htmlFor="GallaryImage">

                Image

                {!editId && (
                  <span>*</span>
                )}

              </label>


              <div className="GallaryUploadBox">

                <input
                  ref={fileInputRef}
                  id="GallaryImage"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                  onChange={
                    handleImageChange
                  }
                />


                <div className="GallaryUploadContent">

                  <div className="GallaryUploadIcon">
                    ↑
                  </div>

                  <h4>
                    Choose Image
                  </h4>

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
                    onClick={
                      removePreview
                    }
                  >
                    Remove
                  </button>

                </div>


                <div className="GallaryPreviewImage">

                  <img
                    src={preview}
                    alt="Gallery Preview"
                  />

                </div>

              </div>

            )}


            {/* FORM BUTTONS */}

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


        {/* ===================================
            TABLE
        ==================================== */}

        <div className="GallaryTableCard">

          <div className="GallaryCardHeader">

            <div>

              <h3>
                Gallery List
              </h3>

              <p>
                All uploaded gallery images
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
                    Image
                  </th>

                  <th>
                    Image Name
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {/* LOADING */}

                {tableLoading ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="GallaryLoading"
                    >
                      Loading gallery...
                    </td>

                  </tr>

                ) : galleryData.length > 0 ? (

                  galleryData.map(
                    (item, index) => (

                      <tr
                        key={item._id}
                      >

                        {/* SERIAL */}

                        <td>

                          <span className="GallarySerial">

                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}

                          </span>

                        </td>


                        {/* IMAGE */}

                        <td>

                          <div className="GallaryTableImage">

                            <img
                              src={getImageUrl(
                                item.image
                              )}
                              alt={
                                item.imageName
                              }
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />

                          </div>

                        </td>


                        {/* NAME */}

                        <td>

                          <div className="GallaryImageName">

                            {
                              item.imageName
                            }

                          </div>

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

                    )
                  )

                ) : (

                  /* EMPTY */

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
                        Add your first gallery
                        image
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Gallary;

