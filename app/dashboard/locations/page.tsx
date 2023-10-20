"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/locations/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideLocationsPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideLocationsPage;
