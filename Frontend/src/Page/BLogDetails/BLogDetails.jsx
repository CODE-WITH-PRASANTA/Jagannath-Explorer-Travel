import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BlogDetailsBreadcrumb from '../../Components/BLogDetailsBreadcrumb/BLogDetailsBreadcrumb';
import BlogsDetailsCategories from '../../Components/BlogsDetailsCategories/BlogsDetailsCategories';
import BlogsDetailsSection from '../../Components/BlogsDetailsSection/BlogsDetailsSection';
import BlogsDetailsLeave from '../../Components/BlogsDetailsLeave/BlogsDetailsLeave';
import API, { IMG_URL } from "../../api/axios";

const BLogDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blogId = queryParams.get('id');

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogId) {
      fetchSingleBlog(blogId);
    } else {
      setLoading(false);
    }
  }, [blogId]);

  const fetchSingleBlog = async (id) => {
    try {
      setLoading(true);
      const response = await API.get(`/blogs`); // or API.get(`/blogs/${id}`) if your backend supports single lookup route
      const rawData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.data || response.data.blogs || []);

      const foundBlog = rawData.find(b => (b._id === id || b.id === id));
      
      if (foundBlog) {
        let imageUrl = '';
        if (foundBlog.image) {
          imageUrl = foundBlog.image.startsWith('http') ? foundBlog.image : `${IMG_URL}${foundBlog.image}`;
        }
        setBlog({ ...foundBlog, image: imageUrl });
      }
    } catch (error) {
      console.error('Error fetching blog details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BlogDetailsBreadcrumb blog={blog} />
      <BlogsDetailsCategories />
      <BlogsDetailsSection blog={blog} loading={loading} />
      <BlogsDetailsLeave blogId={blogId} />
    </div>
  );
};

export default BLogDetails;