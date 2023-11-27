"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import CompaniesManager from "@components/dashboard/companies/manager";

const RealDashBoardCompaniesPage = (props: any) => {
  return (
    <DashboardLayout>
      <CompaniesManager/>
    </DashboardLayout>
  );
};

export default RealDashBoardCompaniesPage;
