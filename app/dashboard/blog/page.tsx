"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/blogs/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideBlogPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideBlogPage;
