"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import PersonnelManager from "@components/dashboard/personnel/manager";

const RealDashboardPersonnelPage = (props: any) => {
  return (
    <DashboardLayout>
      <PersonnelManager/>
    </DashboardLayout>
  );
};

export default RealDashboardPersonnelPage;
