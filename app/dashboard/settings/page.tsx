"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/settings/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideSettingsPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideSettingsPage;
