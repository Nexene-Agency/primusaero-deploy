import { SERVICE_MENU_ITEMS } from "@app/components/data/menus";
import { flatten, getMessages, translator } from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import Marquee from "@components/webparts/marquee";
import React, { Suspense } from "react";
import BigArrowLeft from "@components/icons/BigArrowLeft";
import TestimonialSlideshow from "@components/webparts/testimonial.slideshow";
import PropTypes from "prop-types";
import MarqueeText from "react-marquee-text";
import "./styles.css";
import "../../styles/animations.css";

const testimonialFallback = (
  testimonialCss: string,
  authorCss: string,
  text: string,
  author: string
) => (
  <>
    <div className={testimonialCss}>“{text}”</div>
    <div className={authorCss}>({author})</div>
  </>
);

const BlockOne = (props: any) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  const renderSlogans = () => (
    <div className="justify-start items-center lg:items-start pt-3 lg:pt-6 gap-2 lg:gap-12 inline-flex px-1 lg:px-6">
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("home.slogans.1")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0" />
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("home.slogans.2")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0" />
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("home.slogans.3")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0" />
    </div>
  );

  return (
    <div className="flex flex-col items-center mt-[108px] bg-stone-950">
      {/*--- Hero Section ---*/}
      <div
        id="hero-section"
        className="h-[calc(100vh-108px-56px)] flex flex-col items-center z-101"
      >
        {/*--- Headline ---*/}
        <div className=" __restricted-width h-[620px] absolute">
          <div className="w-full text-center mt-16 lg:mt-0">
            <span className="text-white text-5xl sm:text-7xl lg:text-9xl xl:text-[11.5rem] 2xl:text-[13.5rem] font-bold font-muller uppercase">
              PRIMUS
            </span>
            <span className="text-white text-5xl sm:text-7xl lg:text-9xl xl:text-[11.5rem] 2xl:text-[13.5rem] font-light font-muller uppercase">
              AERO
            </span>
          </div>
        </div>
        <div className="grow" />
        {/* testiomonials in the header, only lg and above*/}
        <div className={`hidden lg:flex __restricted-width flex-col py-16 gap-6 max-w-full`}>
          <Suspense
            fallback={testimonialFallback(
              " text-stone-950 leading-7 text-white self-stretch font-medium font-muller text-3xl",
              "text-neutral-500 text-xl",
              props.testimonial?.data?.text,
              props.testimonial?.data?.author
            )}
          >
            <TestimonialSlideshow
              timeout={5000}
              textCss="text-stone-950 max-w-full mx-16 leading-7 uppercase text-white font-medium font-muller text-3xl"
              authorCss="text-neutral-500 text-xl max-w-full mx-16"
            />
          </Suspense>
        </div>
      </div>
      {/*--- Services ---*/}
      <div className="w-screen h-14 px-16 bg-white  border-t border-b border-stone-950 backdrop-blur-2xl justify-center items-center inline-flex">
        <div className="hidden 2xl:inline-flex self-stretch justify-start items-center gap-16">
          {SERVICE_MENU_ITEMS.map((item) => (
            <a
              className="text-stone-950 text-lg font-normal font-nimbus whitespace-nowrap"
              key={item.id}
              href={item.target}
            >
              {t(item.name)}
            </a>
          ))}
        </div>
        <div className="block 2xl:hidden">
          <Suspense fallback={<div></div>}>
            <Marquee size={1536} duration={15}>
              <div className="inline-flex self-stretch justify-start items-center gap-16">
                {SERVICE_MENU_ITEMS.map((item) => (
                  <a
                    className="text-stone-950 text-lg font-normal font-nimbus whitespace-nowrap"
                    key={item.id}
                    href={item.target}
                  >
                    {t(item.name)}
                  </a>
                ))}
              </div>
            </Marquee>
          </Suspense>
        </div>
      </div>

      <hr />

      <div
        className={`flex lg:hidden flex-col w-full px-6 py-36 bg-white gap-8 border-b border-stone-950`}
      >
        <Suspense
          fallback={testimonialFallback(
            "leading-7 text-stone-950 self-stretch font-normal text-xl",
            "text-neutral-500 text-xl",
            props.testimonial?.data?.text,
            props.testimonial?.data?.author
          )}
        >
          <TestimonialSlideshow
            timeout={5000}
            textCss="text-stone-950 leading-7 self-stretch font-normal text-xl"
            authorCss="text-neutral-500 text-xl"
          />
        </Suspense>
      </div>

      {/*--- Marquee ---*/}
      <Suspense fallback={renderSlogans()}>
        <div id="first-marquee" className="block w-full bg-white">
          <MarqueeText duration={10} direction="right">
            {renderSlogans()}
            {renderSlogans()}
          </MarqueeText>
        </div>
      </Suspense>
    </div>
  );
};

BlockOne.propTypes = {
  locale: PropTypes.string.isRequired,
  testimonial: PropTypes.object.isRequired,
};
export default BlockOne;
