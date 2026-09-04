import React, { useState } from 'react';
import './BlogsDetailsLeave.css';

const BlogsDetailsLeave = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    saveInfo: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Comment submitted:', formData);
  };

  return (
    <section className="BlogsDetailsLeave">
      <div className="BlogsDetailsLeave-container">
        <h2 className="BlogsDetailsLeave-heading">Leave Your Comment:</h2>

        <form onSubmit={handleSubmit} className="BlogsDetailsLeave-form">
          <div className="BlogsDetailsLeave-row">
            <div className="BlogsDetailsLeave-field">
              <label htmlFor="name" className="BlogsDetailsLeave-label">
                Your Name* :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jackson Mile"
                className="BlogsDetailsLeave-input"
                required
              />
            </div>

            <div className="BlogsDetailsLeave-field">
              <label htmlFor="email" className="BlogsDetailsLeave-label">
                Your Email* :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="BlogsDetailsLeave-input"
                required
              />
            </div>
          </div>

          <div className="BlogsDetailsLeave-checkbox-wrapper">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="BlogsDetailsLeave-checkbox"
            />
            <label htmlFor="saveInfo" className="BlogsDetailsLeave-checkbox-label">
              Please save my name, email address for the next time I comment.
            </label>
          </div>

          <div className="BlogsDetailsLeave-field BlogsDetailsLeave-field-full">
            <label htmlFor="message" className="BlogsDetailsLeave-label">
              Your Message :
            </label>
            <textarea
              id="message"
              name="message"
              rows="7"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write Something..."
              className="BlogsDetailsLeave-textarea"
              required
            ></textarea>
          </div>

          <div className="BlogsDetailsLeave-action">
            <button type="submit" className="BlogsDetailsLeave-submit-btn">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BlogsDetailsLeave;