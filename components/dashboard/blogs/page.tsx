"use client";
import React from "react";
import BlogManager from "@components/dashboard/blogs/manager";
import DashboardLayout from "@components/dashboard/layout";

const RealDashboardBlogPage = (props: any) => {
  return (
    <DashboardLayout>
      <BlogManager />
    </DashboardLayout>
  );
};

export default RealDashboardBlogPage;
