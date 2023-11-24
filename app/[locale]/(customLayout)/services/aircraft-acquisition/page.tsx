import React, {Suspense} from "react";
import LOCAL_MESSAGES from "./messages";
import MESSAGES from "@app/components/data/common-messages";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import ArrowRight from "@components/icons/ArrowRight";
import {SERVICE_MENU_ITEMS} from "@app/components/data/menus";
import ServiceNextButton from "@app/components/webparts/service.next.button";
import ServicePageTitle from "@app/components/webparts/service.page.title";
import ScrollContentSwitch from "@components/webparts/scroll.content.switch";

interface PageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const AircraftAcquisition = async ({params, searchParams}: PageProps) => {
  const tl = translator(flatten(getMessages(params.locale, LOCAL_MESSAGES))); // local translator
  const tc = translator(flatten(getMessages(params.locale, MESSAGES))); // common translator

  const technical = SERVICE_MENU_ITEMS.find((item) => item.id === "technical-management")!;

  const renderSection = (i: number) => (
    <div key={`rs-${i}`}
         className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex">
      <div
        className="w-full lg:w-[22%] text-zinc-500 text-xl font-normal leading-relaxed">{tl(`sections.section${i}.title`)}</div>
      <div
        className="w-full lg:w-[56%] text-stone-950 text-xl font-normal leading-relaxed">{tl(`sections.section${i}.text`)}</div>
    </div>
  );

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full relative top-0 left-0">
          <img src="/images/black-background.webp" alt="private aircraft operations image"
               className="relative top-0 left-0"/>
          <div className="absolute mt-[108px] top-0 left-0">
            <ServicePageTitle titles={[tl("titles.1")]}/>
          </div>
          <Suspense fallback={
            <img src="/images/aircraft-acquisition.webp" alt="aircraft acquisition image"
                 className="absolute top-0 left-0 z-[100]"/>
          }>
            <ScrollContentSwitch key="aircraftPicture" yPosition={10}>
              <img src="/images/aircraft-acquisition.webp" alt="aircraft acquisition image"
                   className="absolute top-0 left-0 z-[100]"/>
              <img src="/images/aircraft-acquisition.webp" alt="aircraft acquisition image"
                   className="absolute top-0 left-0"/>
            </ScrollContentSwitch>
          </Suspense>
        </div>
      </div>

      <div>
        <div className="flex flex-col my-36 lg:my-72 mx-6 lg:mx-16 items-center gap-16">
          {renderSection(0)}
          <div className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex">
            <div className="hidden lg:block lg:w-[22%]">&nbsp;</div>
            <div className="w-[56%]">
              <div
                className="h-11 pl-6 pr-4 pt-2.5 bg-stone-950 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
                <a href="#" className="justify-start items-center gap-2 inline-flex">
                  <div className="text-right text-white text-lg font-normal">{tl("getInTouch")}</div>
                  <div className="fill-white"><ArrowRight/></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ServiceNextButton url={`/services/${technical.id}`} text={tc(technical.name)}/>
      </div>
    </>
  );
};
export default AircraftAcquisition;
