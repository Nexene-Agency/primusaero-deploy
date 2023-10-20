"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/blogs/content"),
  {
    ssr: false,
  }
);

interface BlogEditorProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const DashboardServerSideBlogEditorPage = ({
  params,
  searchParams,
}: BlogEditorProps) => {
  return <ClientComponent {...params} />;
};

export default DashboardServerSideBlogEditorPage;
