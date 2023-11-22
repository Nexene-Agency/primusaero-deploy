import React from "react";
import LOCAL_MESSAGES from "./messages";
import MESSAGES from "@app/components/data/common-messages";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import ArrowRight from "@components/icons/ArrowRight";
import {SERVICE_MENU_ITEMS} from "@app/components/data/menus";
import ServiceNextButton from "@app/components/webparts/service.next.button";
import ServicePageTitle from "@app/components/webparts/service.page.title";

interface PageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const PrivateAircraftOperations = async ({params, searchParams}: PageProps) => {
  const tl = translator(flatten(getMessages(params.locale, LOCAL_MESSAGES))); // local translator
  const tc = translator(flatten(getMessages(params.locale, MESSAGES))); // common translator

  const acquisition = SERVICE_MENU_ITEMS.find((item) => item.id === "aircraft-acquisition")!;

  const renderSection = (i: number) => (
    <div className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex">
      <div
        className="w-full lg:w-[22%] text-zinc-500 text-xl font-normal leading-relaxed">{tl(`sections.section${i}.title`)}</div>
      <div
        className="w-full lg:w-[56%] text-stone-950 text-xl font-normal leading-relaxed">{tl(`sections.section${i}.text`)}</div>
    </div>
  );

  return (
    <div className="w-full flex flex-col">
      <ServicePageTitle titles={[tl("titles.1"), tl("titles.2")]}/>
      {/*<div className="flex flex-col mt-9 lg:mt-18 ml-6 lg:ml-16 mr-5 lg:mr-14 mb-16 lg:mb-36 items-start">*/}
      {/*  <div className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase">{tl("titles.1")}</div>*/}
      {/*  <div className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase">{tl("titles.2")}</div>*/}
      {/*</div>*/}
      <img src="/images/big-placeholder.png" alt="private aircraft operations image"
           className="w-full h-[393px] lg:h-[864px] overflow-x-hidden"/>
      <div className="flex flex-col my-36 lg:my-72 mx-6 lg:mx-16 items-center gap-16">
        {Array.from({length: 5}).map((_, i) => renderSection(i))}
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
      <ServiceNextButton url={`/services/${acquisition.id}`} text={tc(acquisition.name)}/>
    </div>
  );
};
export default PrivateAircraftOperations;
