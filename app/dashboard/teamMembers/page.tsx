"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/team/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideTeamPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideTeamPage;
