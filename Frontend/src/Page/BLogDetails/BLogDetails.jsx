import React from 'react'
import BlogDetailsBreadcrumb from '../../Components/BLogDetailsBreadcrumb/BLogDetailsBreadcrumb';
import BlogsDetailsCategories from '../../Components/BlogsDetailsCategories/BlogsDetailsCategories';
import BlogsDetailsSection from '../../Components/BlogsDetailsSection/BlogsDetailsSection';
import BlogsDetailsLeave from '../../Components/BlogsDetailsLeave/BlogsDetailsLeave';

const BLogDetails = () => {
  return (
    <div>
      <BlogDetailsBreadcrumb />
      <BlogsDetailsCategories />
      <BlogsDetailsSection />
      <BlogsDetailsLeave />
    </div>
  );
};

export default BLogDetails;