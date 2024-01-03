"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/contents/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideContentPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideContentPage;
