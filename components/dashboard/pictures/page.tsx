"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import PicturesManager from "@components/dashboard/pictures/manager";

const RealDashboardPicturesPage = (props: any) => {
  return (
    <DashboardLayout>
      <PicturesManager />
    </DashboardLayout>
  );
};

export default RealDashboardPicturesPage;
