"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import SystemSettingsManager from "@components/dashboard/settings/manager";

const RealDashboardSystemSettingsPage = (props: any) => {
  return (
    <DashboardLayout>
      <SystemSettingsManager />
    </DashboardLayout>
  );
};

export default RealDashboardSystemSettingsPage;
