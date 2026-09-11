import React, { useState, useRef } from 'react';
import { 
  LuImage, 
  LuCloudUpload, 
  LuUpload, 
  LuChevronUp, 
  LuChevronDown, 
  LuX, 
  LuLink 
} from 'react-icons/lu';
import './ToursImagesMedia.css';

const ToursImagesMedia = ({
  mainImage: externalMainImage,
  setMainImage: externalSetMainImage,
  galleryImages: externalGalleryImages,
  setGalleryImages: externalSetGalleryImages,
  videoUrl: externalVideoUrl,
  setVideoUrl: externalSetVideoUrl,
  onMainFileChange,
  onGalleryFilesChange,
  onRemoveGalleryImage,
  onSave,
  isSubmitting = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [internalMainImage, setInternalMainImage] = useState(null);
  const [internalGalleryImages, setInternalGalleryImages] = useState([]);
  const [internalVideoUrl, setInternalVideoUrl] = useState('');

  const mainImage = externalMainImage !== undefined ? externalMainImage : internalMainImage;
  const setMainImage = externalSetMainImage || setInternalMainImage;
  const galleryImages = externalGalleryImages !== undefined ? externalGalleryImages : internalGalleryImages;
  const setGalleryImages = externalSetGalleryImages || setInternalGalleryImages;
  const videoUrl = externalVideoUrl !== undefined ? externalVideoUrl : internalVideoUrl;
  const setVideoUrl = externalSetVideoUrl || setInternalVideoUrl;

  const mainInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onMainFileChange) {
        onMainFileChange(file);
      } else {
        setMainImage(URL.createObjectURL(file));
      }
    }
  };

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (onGalleryFilesChange) {
        onGalleryFilesChange(files);
      } else {
        const newUrls = files.map((file) => URL.createObjectURL(file));
        setGalleryImages((prev) => [...prev, ...newUrls]);
      }
    }
  };

  const removeGalleryImage = (indexToRemove) => {
    if (onRemoveGalleryImage) {
      onRemoveGalleryImage(indexToRemove);
    } else {
      setGalleryImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    }
  };

  return (
    <div className="tours-images-media-card">
      {/* Header */}
      <div 
        className="tours-images-media-header" 
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="tours-images-media-header-left">
          <div className="tours-images-media-header-icon-box">
            <LuImage className="tours-images-media-header-icon" />
          </div>
          <h2 className="tours-images-media-header-title">2. Tour Images &amp; Media</h2>
        </div>
        <button 
          type="button" 
          className="tours-images-media-collapse-btn" 
          aria-label="Toggle section"
        >
          {isOpen ? <LuChevronUp /> : <LuChevronDown />}
        </button>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="tours-images-media-body">
          <div className="tours-images-media-layout">
            
            {/* Left Column (Explicit 60% Width) */}
            <div className="tours-images-media-left-col">
              <div className="tours-images-media-form-group">
                <label className="tours-images-media-label">
                  Main Image <span className="tours-images-media-label-muted">(Featured)</span> <span className="tours-images-media-required">*</span>
                </label>

                <input 
                  type="file" 
                  ref={mainInputRef} 
                  onChange={handleMainImageChange} 
                  accept="image/*" 
                  hidden 
                />

                <div 
                  className={`tours-images-media-main-dropzone ${mainImage ? 'tours-images-media-has-preview' : ''}`}
                  onClick={() => mainInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files?.[0]) {
                      setMainImage(URL.createObjectURL(e.dataTransfer.files[0]));
                    }
                  }}
                >
                  {mainImage ? (
                    <div className="tours-images-media-preview-container">
                      <img 
                        src={mainImage} 
                        alt="Featured Tour Preview" 
                        className="tours-images-media-preview-img" 
                      />
                      <button 
                        type="button" 
                        className="tours-images-media-remove-main-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMainImage(null);
                        }}
                        aria-label="Remove featured image"
                      >
                        <LuX />
                      </button>
                    </div>
                  ) : (
                    <div className="tours-images-media-placeholder">
                      <div className="tours-images-media-upload-icon-wrapper">
                        <LuCloudUpload className="tours-images-media-cloud-icon" />
                      </div>
                      <p className="tours-images-media-placeholder-text">
                        <span className="tours-images-media-bold-text">Click to upload</span> or drag and drop
                      </p>
                      <span className="tours-images-media-hint-text">Recommended size: 1000x800px</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Video URL Input */}
              <div className="tours-images-media-form-group tours-images-media-video-group">
                <label className="tours-images-media-label">
                  Video <span className="tours-images-media-label-muted">(Optional)</span>
                </label>
                <div className="tours-images-media-input-wrapper">
                  <LuLink className="tours-images-media-input-icon" />
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=example"
                    className="tours-images-media-input"
                  />
                </div>
                <span className="tours-images-media-subtext">Add YouTube or Vimeo video link</span>
              </div>
            </div>

            {/* Right Column (Gallery Section) */}
            <div className="tours-images-media-right-col">
              <div className="tours-images-media-gallery-header">
                <label className="tours-images-media-label">Gallery Images</label>
                <p className="tours-images-media-sublabel">Upload multiple images</p>
              </div>

              <input 
                type="file" 
                ref={galleryInputRef} 
                onChange={handleGalleryImageChange} 
                accept="image/*" 
                multiple 
                hidden 
              />

              <button 
                type="button" 
                className="tours-images-media-gallery-btn"
                onClick={() => galleryInputRef.current?.click()}
              >
                <LuUpload className="tours-images-media-btn-icon" />
                <span>Upload images</span>
              </button>

              {/* 3-Column Thumbnails Grid */}
              <div className="tours-images-media-gallery-grid">
                {galleryImages.map((src, index) => (
                  <div key={index} className="tours-images-media-thumb-card">
                    <img src={src} alt={`Tour gallery ${index + 1}`} />
                    <button
                      type="button"
                      className="tours-images-media-remove-thumb-btn"
                      onClick={() => removeGalleryImage(index)}
                      aria-label="Remove gallery thumbnail"
                    >
                      <LuX />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="tours-images-media-footer">
            <button type="button" className="tours-images-media-btn-cancel">
              Cancel
            </button>
            <button
              type="button"
              className="tours-images-media-btn-save"
              onClick={onSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Tour Package"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToursImagesMedia;