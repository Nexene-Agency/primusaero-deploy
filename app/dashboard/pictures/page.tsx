"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/pictures/page"),
  {
    ssr: false,
  }
);

const DashboardServerSidePicturesPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSidePicturesPage;
