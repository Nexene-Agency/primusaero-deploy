import React from "react";
import dynamic from "next/dynamic";

interface ProtectorPageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const NoSSR = dynamic(() => import("@components/protector/page"), {
  ssr: false,
});

const MapFallback = () => <></>;

const ProtectorServerPage = async ({
  params,
  searchParams,
}: ProtectorPageProps) => {
  return <NoSSR locale={params.locale} />;
};

export default ProtectorServerPage;
