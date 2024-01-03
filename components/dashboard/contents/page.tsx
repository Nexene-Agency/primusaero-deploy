"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import ContentsManager from "@components/dashboard/contents/manager";

const RealDashboardLocationsPage = (props: any) => {
  return (
    <DashboardLayout>
      <ContentsManager/>
    </DashboardLayout>
  );
};

export default RealDashboardLocationsPage;
