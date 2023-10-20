"use client";
import React from "react";
import "./users.css";
import DashboardLayout from "@components/dashboard/layout";
import UsersManager from "@components/dashboard/users/manager";

const RealDashboardUsersPage = (props: any) => {
  return (
    <DashboardLayout>
      <UsersManager />
    </DashboardLayout>
  );
};

export default RealDashboardUsersPage;
