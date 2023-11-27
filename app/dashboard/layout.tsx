"use client";
import "../styles/brand.css";
import "../styles/components.css";
import "../styles/google.maps.css";
import React, {ReactNode} from "react";
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
    <body>
    {props.children}
    </body>
    </html>
  );
};

export default DashboardServerSideLayout;
