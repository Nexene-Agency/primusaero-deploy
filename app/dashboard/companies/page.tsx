"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/companies/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideCompaniesPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideCompaniesPage;
