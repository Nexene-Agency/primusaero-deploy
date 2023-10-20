"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import LocationsManager from "@components/dashboard/locations/manager";
import "./locations.css";

const RealDashboardLocationsPage = (props: any) => {
  return (
    <DashboardLayout>
      <LocationsManager />
    </DashboardLayout>
  );
};

export default RealDashboardLocationsPage;
