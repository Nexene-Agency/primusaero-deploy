"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import "./testimonials.css";
import TestimonialsManager from "@components/dashboard/testimonials/manager";

const RealDashboardTestimonialsPage = (props: any) => {
  return (
    <DashboardLayout>
      <TestimonialsManager/>
    </DashboardLayout>
  );
};

export default RealDashboardTestimonialsPage;
