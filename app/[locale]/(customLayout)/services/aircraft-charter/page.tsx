import React, { Suspense } from "react";
import LOCAL_MESSAGES from "./messages";
import MESSAGES from "@app/components/data/common-messages";
import { flatten, getMessages, translator } from "@framework/i18n.utils";
import { SERVICE_MENU_ITEMS } from "@app/components/data/menus";
import ServiceNextButton from "@app/components/webparts/service.next.button";
import ServicePageTitle from "@app/components/webparts/service.page.title";
import "./page.css";
import ArrowRight from "@components/icons/ArrowRight";
import NexeneH1 from "@components/heading/NexeneH1";
import NexeneImg from "@components/image/NexeneImg";
import NexeneH2 from "@components/heading/NexeneH2";
import NexeneText from "@components/text/NexeneText";

interface PageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const AircraftCharter = async ({ params, searchParams }: PageProps) => {
  const tl = translator(flatten(getMessages(params.locale, LOCAL_MESSAGES))); // local translator
  const tc = translator(flatten(getMessages(params.locale, MESSAGES))); // common translator

  const maintenance = SERVICE_MENU_ITEMS.find(
    (item) => item.id === "maintenance"
  )!;

  const renderSection = (i: number) => (
    <Suspense
      fallback={
        <div
          key={`rs-${i}`}
          className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex"
        >
          <div className="w-full lg:w-[24%] text-stone-950 text-xl font-normal leading-relaxed mb-8">
            {tl(`sections.section${i}.title`)}
          </div>
          <div className="w-full lg:w-[62%] flex flex-col gap-6">
            <div>
              <div className="w-full text-stone-950 text-xl font-normal leading-relaxed mb-8">
                {tl(`sections.section${i}.block0.title`)}
              </div>
              <div className="w-full text-color-grey-3 text-xl font-normal leading-relaxed">
                {tl(`sections.section${i}.block0.text`)}
              </div>
            </div>
            <div>
              <div className="w-full text-stone-950 text-xl font-normal leading-relaxed mb-8">
                {tl(`sections.section${i}.block1.title`)}
              </div>
              <div className="w-full text-color-grey-3 text-xl font-normal leading-relaxed">
                {tl(`sections.section${i}.block1.text`)}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div
        key={`rs-${i}`}
        className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex"
      >
        <div className="w-full lg:w-[24%]">
          <NexeneH2 text={tl(`sections.section${i}.title`)} />
        </div>
        <div className="w-full lg:w-[62%] flex flex-col gap-6">
          <div>
            <NexeneH2 text={tl(`sections.section${i}.block0.title`)} />
            <NexeneText text={tl(`sections.section${i}.block0.text`)} />
          </div>
          <div>
            <NexeneH2 text={tl(`sections.section${i}.block1.title`)} />
            <NexeneText text={tl(`sections.section${i}.block1.text`)} />
          </div>
        </div>
      </div>
    </Suspense>
  );

  return (
    <>
      <div className="w-full flex flex-col bg-stone-950 h-screen lg:px-16">
        <div className="__restricted-width relative top-0 left-0 h-[520px] lg:h-[1080px]">
          <div className="absolute mt-[137px] lg:mt-[108px] top-0 left-0">
            <Suspense fallback={<ServicePageTitle titles={[tl("titles.1")]} />}>
              <NexeneH1 text={tl("titles.1")} />
            </Suspense>
          </div>

          <NexeneImg
            src={"/images/aircraft-charter.webp"}
            className="block max-h-screen object-center mx-auto mt-64 lg:mt-0"
          />
        </div>
      </div>
      <div className="__restricted-width lg:px-16">
        <div className="flex flex-col my-36 lg:my-72 items-center gap-16">
          {renderSection(0)}
          <div className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex">
            <div className="hidden lg:block lg:w-[24%]">&nbsp;</div>
            <div className="w-[62%]">
              <div className="h-11 pl-6 pr-4 pt-2.5 ml-6 lg:ml-0 bg-stone-950 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
                <a
                  href="/contact-us"
                  className="justify-start items-center gap-2 inline-flex mt-1"
                >
                  <div className="text-right text-white text-lg leading-none font-normal my-auto">
                    {tl("getInTouch")}
                  </div>
                  <div className="fill-white my-auto">
                    <ArrowRight />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ServiceNextButton
          url={`/services/${maintenance.id}`}
          text={tc(maintenance.name)}
        />
      </div>
    </>
  );
};
export default AircraftCharter;
