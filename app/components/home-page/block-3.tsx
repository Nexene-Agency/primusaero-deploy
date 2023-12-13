import { flatten, getMessages, translator } from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import React, { Suspense } from "react";
import TestimonialStepper from "@components/webparts/testimonial.stepper";
import BigArrowLeft from "@components/icons/BigArrowLeft";
import WorldMap from "@components/webparts/world.map";
import MarqueeText from "react-marquee-text";
import "./styles.css";

interface BlockProperties {
  locale: string;
  withoutMap?: boolean;
}

const BlockThree = (props: BlockProperties) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  const renderSlogans = () => (
    <div className="justify-start items-center lg:items-start pt-3 lg:pt-6 gap-2 lg:gap-12 inline-flex mx-1 lg:mx-6">
      <span className="text-white text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("footer.slogans.1")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0" />
      <span className="text-white text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("footer.slogans.2")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0" />
      <span className="text-white text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("footer.slogans.3")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0" />
    </div>
  );
  return (
    <>
      {props.withoutMap ? null : (
        <div className="flex flex-col __restricted-width items-center">
          <div className="w-full ml-6 lg:ml-0 mb-8 lg:mb-0 lg:text-center text-stone-950 mt-36 lg:mt-0 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
            {t("home.locations.ourLocations")}
          </div>
          {/*<img className="mb-36 lg:mb-72 px-2 lg:px-0" src="/assets/map-placeholder.svg" alt="map-placeholder"/>*/}
          <Suspense
            fallback={
              <img
                className="mb-36 lg:mb-72 px-2 lg:px-0"
                src="/assets/map-placeholder.svg"
                alt="map-placeholder"
              />
            }
          >
            <div>
              <WorldMap
                widthPercent={100}
                xCorrection={1.5}
                yCorrection={1.5}
              />
            </div>
          </Suspense>
        </div>
      )}
      <div className="__restricted-width bg-stone-950">
        <Suspense fallback={renderSlogans()}>
          <div className="block w-full">
            <MarqueeText duration={10} direction="right">
              {renderSlogans()}
              {renderSlogans()}
            </MarqueeText>
          </div>
        </Suspense>
        <Suspense fallback={<div></div>}>
          <TestimonialStepper />
        </Suspense>
      </div>
    </>
  );
};

export default BlockThree;
