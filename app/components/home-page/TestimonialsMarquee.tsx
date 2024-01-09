import React, { Suspense } from "react";
import MarqueeText from "react-marquee-text";
import TestimonialStepper from "@components/webparts/testimonial.stepper";
import BigArrowLeft from "@components/icons/BigArrowLeft";
import { flatten, getMessages, translator } from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";

interface BlockProperties {
  locale: string;
}
const TestimonialsMarquee = (props: BlockProperties) => {
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
    <div className="w-full bg-stone-950 flex justify-center">
      <div className="__restricted-width ">
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
    </div>
  );
};

export default TestimonialsMarquee;
