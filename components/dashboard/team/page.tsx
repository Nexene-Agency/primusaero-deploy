"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import "./team.css";
import TeamMembersManager from "@components/dashboard/team/manager";

const RealDashboardLocationsPage = (props: any) => {
  return (
    <DashboardLayout>
      <TeamMembersManager />
    </DashboardLayout>
  );
};

export default RealDashboardLocationsPage;
