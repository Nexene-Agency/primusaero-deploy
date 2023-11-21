"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/testimonials/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideTestimonialsPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideTestimonialsPage;
