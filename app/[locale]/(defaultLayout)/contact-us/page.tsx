import React, {Suspense} from "react";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import dynamic from "next/dynamic";
import Script from "next/script";

interface HomeProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ClientComponent = dynamic(
  () => import("@components/contact/contact.form"),
  {
    ssr: false,
  }
);
const ContactUs = async ({params, searchParams}: HomeProps) => {
  const t = translator(flatten(getMessages(params.locale, MESSAGES)));

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />
      <div className="flex flex-col w-full items-center lg:mt-[108px]">
        <Suspense fallback={<div className="p-8 mx-auto my-8 uppercase">{t("menu.contactUs")}</div>}>
          <ClientComponent/>
        </Suspense>
      </div>
    </>
  );
};
export default ContactUs;
