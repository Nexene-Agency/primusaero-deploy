import React from "react";
import LOCAL_MESSAGES from "./messages";
import MESSAGES from "@app/components/data/common-messages";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import ArrowRight from "@components/icons/ArrowRight";
import {SERVICE_MENU_ITEMS} from "@app/components/data/menus";
import ServiceNextButton from "@app/components/webparts/service.next.button";
import ServicePageTitle from "@app/components/webparts/service.page.title";
import "./page.css";

interface PageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const SparePartsAndLogistics = async ({params, searchParams}: PageProps) => {
  const tl = translator(flatten(getMessages(params.locale, LOCAL_MESSAGES))); // local translator
  const tc = translator(flatten(getMessages(params.locale, MESSAGES))); // common translator

  const privateAircraft = SERVICE_MENU_ITEMS.find((item) => item.id === "private-aircraft-operation")!;

  const renderSection = (i: number) => (
    <div key={`rs-${i}`}
         className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex">
      <div
        className="w-full lg:w-[24%] text-zinc-500 text-xl font-normal leading-relaxed">{tl(`sections.section${i}.title`)}</div>
      <div className="w-full lg:w-[62%]">
        <div
          className="w-full text-stone-950 text-xl font-normal leading-relaxed mb-8">{tl(`sections.section${i}.block.title`)}</div>
        <div
          className="w-full text-color-grey-3 text-xl font-normal leading-relaxed"
          dangerouslySetInnerHTML={{__html: tl(`sections.section${i}.block.text`) as any}}></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full flex flex-col __restricted-width">
        <div className="w-full relative top-0 left-0 h-[520px] lg:h-[1080px]">
          <div className="__main-background"></div>
          <div className="absolute mt-[137px] lg:mt-[108px] top-0 left-0">
            <ServicePageTitle titles={[tl("titles.1"), tl("titles.2")]}/>
          </div>
          <div className="__main-image"></div>
        </div>
      </div>

      <div className="__restricted-width">
        <div className="flex flex-col my-36 lg:my-72 mx-6 lg:mx-16 items-center gap-16">
          {Array.from({length: 3}).map((_, i) => renderSection(i))}
          <div className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex">
            <div className="hidden lg:block lg:w-[24%]">&nbsp;</div>
            <div className="w-[62%]">
              <div
                className="h-11 pl-6 pr-4 pt-2.5 bg-stone-950 rounded-3xl flex-col justify-start items-start gap-2.5 inline-flex">
                <a href="/contact-us" className="justify-start items-center gap-2 inline-flex">
                  <div className="text-right text-white text-lg font-normal">{tl("getInTouch")}</div>
                  <div className="fill-white"><ArrowRight/></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ServiceNextButton url={`/services/${privateAircraft.id}`} text={tc(privateAircraft.name)}/>
      </div>
    </>
  );
};
export default SparePartsAndLogistics;
