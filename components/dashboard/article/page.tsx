"use client";
import React from "react";
import DashboardLayout from "@components/dashboard/layout";
import "./article.css";
import ArticlesManager from "@components/dashboard/article/manager";

const RealDashboardArticlesPage = (props: any) => {
  return (
    <DashboardLayout>
      <ArticlesManager />
    </DashboardLayout>
  );
};

export default RealDashboardArticlesPage;
