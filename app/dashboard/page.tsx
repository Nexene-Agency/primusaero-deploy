"use client";
import React from "react";
import dynamic from "next/dynamic";


const ClientComponent = dynamic(() => import("@components/dashboard/page"), {
  ssr: false,
});

const DashboardServerSidePage = (props: any) => {
  return <ClientComponent {...props} />;
};

export default DashboardServerSidePage;
