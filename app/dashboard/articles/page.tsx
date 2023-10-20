"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/article/page"),
  {
    ssr: false,
  }
);

const DashboardServerSideArticlesPage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSideArticlesPage;
