"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/personnel/page"),
  {
    ssr: false,
  }
);

const DashboardServerSidePersonnelPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSidePersonnelPage;
