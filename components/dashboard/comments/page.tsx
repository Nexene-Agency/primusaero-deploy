"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import "./comments.css";
import CommentsManager from "./manager";

const RealDashboardCommentsPage = (props: any) => {
  return (
    <DashboardLayout>
      <CommentsManager />
    </DashboardLayout>
  );
};

export default RealDashboardCommentsPage;
