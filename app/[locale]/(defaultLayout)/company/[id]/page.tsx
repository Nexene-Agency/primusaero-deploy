import React, {Suspense} from "react";
import {CompanyResponse, getCompanyData} from "@app/server-actions/company";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import LOCAL_MESSAGES from "./messages";
import {Address} from "@framework/googlemaps/model";
import PrimaryButton from "@app/components/webparts/primary.button";
import ArrowRight from "@components/icons/ArrowRight";
import dynamic from "next/dynamic";
import Script from "next/script";

interface PageProps {
  params: { locale: string, id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ClientComponent = dynamic(
  () => import("@components/contact/contact.form"),
  {
    ssr: false,
  }
);

const CompanyPage = async ({params, searchParams}: PageProps) => {
  const tl = translator(flatten(getMessages(params.locale, LOCAL_MESSAGES))); // local translator
  const companyReference: CompanyResponse = await getCompanyData(params.id);

  const getLocationAddress = (index: number): Address => {
    if (companyReference.locations && companyReference.locations.length > index) {
      return companyReference.locations[index].data.address;
    }
    return {} as any;
  };

  const renderCompany = () => (
    <>
      <div className="w-full text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase pb-16 lg:pb-36">
        {companyReference.company?.data?.name}
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-between items-start">
        <div className="flex flex-col w-full lg:w-3/10 text-stone text-xl font-normal">
          <div className="text-neutral-500 text-lg pb-6">{tl("fullPartnerShip")}</div>
          <div className="flex gap-2">
            <div>{getLocationAddress(0).street}</div>
            <div>{getLocationAddress(0).street_number}</div>
          </div>
          <div className="flex gap-2">
            <div>{getLocationAddress(0).postal_code}</div>
            <div>{getLocationAddress(0).city}</div>
          </div>
          <div className="pb-6">{getLocationAddress(0).country}</div>
          <div>{companyReference.company?.data.email}</div>
          <div className="pb-12 lg:pb-16">{companyReference.company?.data.phone}</div>
          <div className="text-neutral-500">{companyReference.company?.data.name}</div>
          <div
            className="text-neutral-500">{tl("commercialNumber", {data: companyReference.company?.data.registrationNumber})}</div>
          <div
            className="text-neutral-500 pb-12 lg:pb-16">{tl("vat", {data: companyReference.company?.data.vatNumber})}</div>
          <div className="flex">
            <PrimaryButton asLink={true} target="#contact-form">
              {tl("getInTouch")}
              <ArrowRight className="fill-white"/>
            </PrimaryButton>
            <div className="grow-1"></div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-6/10">
          <div className="pt-6">&nbsp;</div>
          <div className="pb-12 lg:pb-36 text-stone-950 text-xl font-normal"
               dangerouslySetInnerHTML={{__html: companyReference.company?.data.description ?? ""}}></div>
          <div className="flex flex-wrap gap-4 pb-36 lg:pb-72">
            {companyReference.personnel?.map((personnel) => (
              <div key={personnel.id} className="flex flex-col items-start w-[340px]">
                <img src={personnel.data.signaturePicture} alt={personnel.data.publicName} className="w-full"/>
                <div
                  className="text-stone-950 text-xl font-normal leading-relaxed pt-8">{personnel.data.publicName}</div>
                <div
                  className="text-neutral-500 h-8 pb-8 text-lg font-normal leading-relaxed">{personnel.data.jobTitle}</div>
                {
                  personnel.data.linkedIn ?
                    <a href={personnel.data.linkedIn} target="_blank" rel="noreferrer noopener"
                       className="text-stone-950 h-8 pb-8 text-lg font-normal leading-relaxed">{tl("linkedIn")}</a> :
                    <div
                      className="text-stone-950 h-8 pb-8 text-lg font-normal leading-relaxed">{tl("linkedIn")}</div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      <Suspense fallback={<div></div>}>
        <div id="contact-form">
          <ClientComponent embedded={true} company={companyReference.company?.data.code}/>
        </div>
      </Suspense>
    </>
  );
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />
      <div className="flex flex-col mt-[137px] lg:mt-[108px] pt-6 lg:pt-[72px] px-6 lg:px-16">
        {companyReference.company ? renderCompany() : null}
      </div>
    </>
  );
};
export default CompanyPage;
