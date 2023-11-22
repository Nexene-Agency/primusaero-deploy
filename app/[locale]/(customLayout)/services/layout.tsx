/* eslint-disable @next/next/no-sync-scripts */
import "../../../styles/brand.css";
import React from "react";
import Footer from "@app/components/webparts/footer";
import Header from "@app/components/webparts/header";

export function generateStaticParams() {
  return [{locale: "en"}, {locale: "de"}];
}

export const metadata = {
  title: process.env.NEXT_PUBLIC_APPLICATION_NAME,
  description: process.env.NEXT_PUBLIC_APPLICATION_NAME,
};

const DefaultFallback = () => {
  return <></>;
};

// @ts-ignore
export default async function LocaleLayout({children, params: {locale}}) {
  return (
    <>
      <Header locale={locale}/>
      {children}
      <Footer locale={locale}/>
    </>
  );
}
