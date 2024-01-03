import React from "react";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import dynamic from "next/dynamic";
import MESSAGES from "./messages";
import "./page.css";
import ArrowRight from "@components/icons/ArrowRight";
import PrimaryButton from "@app/components/webparts/primary.button";
import Block3 from "@app/components/home-page/Map";

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

const BecomeOurPartner = async ({params, searchParams}: HomeProps) => {
  const tl = translator(flatten(getMessages(params.locale, MESSAGES)));

  const renderSection = (i: number) => (
    <div
      key={`rs-${i}`}
      className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex"
    >
      <div className="w-full lg:w-[24%] text-lg lg:text-xl font-normal leading-relaxed">
        {tl(`sections.section${i}.title`)}
      </div>
      <div className="w-full lg:w-[62%]">
        <div className="w-full text-stone-950 text-lg lg:text-xl font-normal leading-relaxed mb-8">
          {tl(`sections.section${i}.block.title`)}
        </div>
        <div
          className="w-full text-color-grey-3 text-xl font-normal leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: tl(`sections.section${i}.block.text`) ?? ("" as string),
          }}
        ></div>
        {tl(`sections.section${i}.block.topic`) &&
        tl(`sections.section${i}.block.topic`) !== "" ? (
          <div className="mt-12 lg:mt-16 flex">
            <PrimaryButton
              asLink={true}
              target={`/contact-us?topic=${tl(
                `sections.section${i}.block.topic`
              )}`}
            >
              {tl("getInTouch")}
              <ArrowRight className="fill-white"/>
            </PrimaryButton>
            <div className="flex-grow">&nbsp;</div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <div
        className="flex flex-col __restricted-width px-6 lg:px-16 pt-6 lg:pt-20 text-stone-950 mt-[137px] lg:mt-[108px]">
        <div className="text-5xl lg:text-8xl font-bold font-muller uppercase leading-10 mb-16 lg:mb-36">
          {tl("title")}
        </div>
      </div>
      <div className="__restricted-width __video-placeholder">
        <img
          src="/images/smaller_placeholder_image-transparent.webp"
          alt="video placeholder"
        />
      </div>
      <div className="__restricted-width">
        <div className="flex flex-col my-36 lg:my-72 mx-6 lg:mx-16 items-center gap-16">
          {renderSection(0)}
          {renderSection(1)}
          {renderSection(2)}
          {renderSection(3)}
          <div className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex">
            <div className="w-full lg:w-[24%] text-lg lg:text-xl font-normal leading-relaxed">
              &nbsp;
            </div>
            <div className="w-full lg:w-[62%] flex">
              <PrimaryButton
                asLink={true}
                target="https://primusaero.tapfiliate.com/"
                newWindow={true}
              >
                {tl("getInTouch")}
                <ArrowRight className="fill-white"/>
              </PrimaryButton>
              <div className="flex-grow">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
      <div className="__restricted-width __video-placeholder">
        <img
          src="/images/smaller_placeholder_image-transparent.webp"
          alt="video placeholder"
        />
      </div>
      <div className="h-36 lg:h-72">&nbsp;</div>
      <div className="__restricted-width">
        <Block3 locale={params.locale} withoutMap={true}/>
      </div>
    </>
  );
};
export default BecomeOurPartner;
