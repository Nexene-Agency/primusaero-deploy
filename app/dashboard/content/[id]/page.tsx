"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(
  () => import("@components/dashboard/contents/editor/page"),
  {
    ssr: false,
  }
);

interface File {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const DashboardServerSideContentEditorPage = ({params, searchParams}: File) => {
  return <ClientComponent {...params} />;
};

export default DashboardServerSideContentEditorPage;
