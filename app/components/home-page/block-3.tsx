import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import React, {Suspense} from "react";
import Marquee from "@components/webparts/marquee";
import TestimonialStepper from "@components/webparts/testimonial.stepper";
import BigArrowLeft from "@components/icons/BigArrowLeft";
import WorldMap from "@components/webparts/world.map";

interface BlockProperties {
  locale: string;
}

const BlockThree = (props: BlockProperties) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  const renderSlogans = () => (
    <div className="justify-start items-center mt-6 gap-6 lg:gap-12 inline-flex">
      <div
        className="text-center text-white text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">{t("footer.slogans.1")}</div>
      <BigArrowLeft className="h-[34px] lg:h-[76px]"/>
      <div
        className="text-center text-white text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">{t("footer.slogans.2")}</div>
      <BigArrowLeft className="h-[34px] lg:h-[76px]"/>
      <div
        className="text-center text-white text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">{t("footer.slogans.3")}</div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="w-full ml-6 lg:ml-0 mb-8 lg:mb-0 lg:text-center text-stone-950 mt-36 lg:mt-0 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
          {t("home.locations.ourLocations")}
        </div>
        {/*<img className="mb-36 lg:mb-72 px-2 lg:px-0" src="/assets/map-placeholder.svg" alt="map-placeholder"/>*/}
        <Suspense fallback={<img className="mb-36 lg:mb-72 px-2 lg:px-0" src="/assets/map-placeholder.svg"
                                 alt="map-placeholder"/>}>
          <div>
            <WorldMap widthPercent={100} xCorrection={1.5} yCorrection={1.5}/>
          </div>
        </Suspense>
      </div>
      <div className="bg-stone-950">
        <Suspense fallback={renderSlogans()}>
          <div className="hidden lg:block">
            <Marquee size={2205} duration={15}>
              {renderSlogans()}
            </Marquee>
          </div>
          <div className="lg:hidden">
            <Marquee size={1250} duration={15}>
              {renderSlogans()}
            </Marquee>
          </div>
        </Suspense>
        <Suspense fallback={<div></div>}>
          <TestimonialStepper/>
        </Suspense>
      </div>
    </>
  );
};

export default BlockThree;