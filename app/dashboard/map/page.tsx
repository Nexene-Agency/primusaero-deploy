"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/map/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideMapPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideMapPage;
