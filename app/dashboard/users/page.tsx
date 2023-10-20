"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/users/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideUsersPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideUsersPage;
