"use client";
import "../styles/brand.css";
import React, { ReactNode } from "react";
import Script from "next/script";

type DashboardLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

const DashboardServerSideLayout = (props: DashboardLayoutProps) => {
  return (
    <html lang={props.params.locale}>
      <head>
        <link
          rel="stylesheet"
          href={"https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css"}
        ></link>
        <Script
          src={"https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"}
        ></Script>
      </head>
      <body className="tk-aktiv-grotesk">
        <div className="__root_layout">{props.children}</div>
      </body>
    </html>
  );
};

export default DashboardServerSideLayout;
