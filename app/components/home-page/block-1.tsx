import { SERVICE_MENU_ITEMS } from "@app/components/data/menus";
import { flatten, getMessages, translator } from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import ArrowRight from "@components/icons/ArrowRight";
import Marquee from "@components/webparts/marquee";
// import Marquee from "react-fast-marquee";
import React, { Suspense } from "react";
import BigArrowLeft from "@components/icons/BigArrowLeft";
import "./block1.css";
import TestimonialSlideshow from "@components/webparts/testimonial.slideshow";
import PropTypes from "prop-types";

const BlockOne = (props: any) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  const renderSlogans = () => (
    <div className="justify-start pt-6 gap-6 lg:gap-12 inline-flex mx-6">
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("home.slogans.1")}
      </span>
      <BigArrowLeft className="h-[34px] lg:h-[76px] " />
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("home.slogans.2")}
      </span>
      <BigArrowLeft className="h-[34px] lg:h-[76px] " />
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {t("home.slogans.3")}
      </span>
      <BigArrowLeft className="h-[34px] lg:h-[76px] " />
    </div>
  );

  return (
    <div className="flex flex-col items-center mt-[108px] bg-stone-950">
      {/*<img
        className="hidden lg:block"
        src="/images/first-block-1.webp"
        alt={"Gulfstream G700"}
      />*/}
      {/*--- Hero Section ---*/}
      <div className="w-[1536px] h-[764px] flex flex-col items-center justify-between z-101">
        {/*<div className="w-full h-[620px] absolute __cloud-467" />*/}
        {/*--- Headline ---*/}
        <div className="w-full h-[620px] absolute">
          <div className="w-full text-center mt-12">
            <span className="text-white text-5xl sm:text-7xl lg:text-9xl xl:text-[13.5rem] font-bold font-muller uppercase">
              PRIMUS
            </span>
            <span className="text-white text-5xl sm:text-7xl lg:text-9xl xl:text-[13.5rem] font-light font-muller uppercase">
              AERO
            </span>
          </div>
        </div>
        {/*--- Testimonials ---*/}
        <Suspense
          fallback={
            <div className="px-8 lg:px-16 py-36 lg:py-72 bg-white bg-opacity-90 border-b border-stone-950 backdrop-blur-3xl flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="flex-col justify-start items-center gap-8 lg:gap-12 flex">
                <div className="self-stretch text-stone-950 text-xl lg:text-4xl font-normal leading-normal lg:leading-10">
                  “{props.testimonial?.data?.text}”
                </div>
                <div className="self-stretch text-zinc-500 text-lg lg:text-xl font-normal lg:leading-relaxed">
                  ({props.testimonial?.data?.author})
                </div>
              </div>
            </div>
          }
        >
          <TestimonialSlideshow timeout={5000} />
        </Suspense>
        {/*<img
          src={"/images/hero_plane_top.webp"}
          alt={"Gulfstream G700"}
          className="w-[76.875rem] xl:w-[93.75rem] h-[840px] absolute top-26 xl:top-32 object-none"
        />
        <div className="bg-[url('/images/hero_plane_top.webp')] bg-no-repeat bg-center w-full h-[620px] [background-position-y:-120px] absolute" />
        <div className="w-full h-[620px] absolute __cloud-748" />*/}
      </div>
      {/*--- Services ---*/}
      <div className="w-full h-14 px-16 bg-white bg-opacity-90 border-t border-b border-stone-950 backdrop-blur-2xl justify-center items-center inline-flex">
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

      {/*<Suspense
        fallback={
          <div className="px-8 lg:px-16 py-36 lg:py-72 bg-white bg-opacity-90 border-b border-stone-950 backdrop-blur-3xl flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex-col justify-start items-center gap-8 lg:gap-12 flex">
              <div className="self-stretch text-stone-950 text-xl lg:text-4xl font-normal leading-normal lg:leading-10">
                “{props.testimonial?.data?.text}”
              </div>
              <div className="self-stretch text-zinc-500 text-lg lg:text-xl font-normal lg:leading-relaxed">
                ({props.testimonial?.data?.author})
              </div>
            </div>
          </div>
        }
      >
        <TestimonialSlideshow timeout={5000} />
      </Suspense>*/}
      {/*--- Marquee ---*/}
      <Suspense fallback={renderSlogans()}>
        <div className="hidden lg:block">
          <Marquee size={1536} duration={10}>
            {renderSlogans()}
          </Marquee>
        </div>
        <div className="lg:hidden">
          <Marquee size={1100} duration={10}>
            {renderSlogans()}
          </Marquee>
        </div>
      </Suspense>

      <div className="w-full px-8 lg:px-16 py-36 lg:py-72 justify-start items-start flex flex-col lg:flex-row">
        <div className="lg:w-[24%] mb-6 lg:mb-0 text-zinc-500 text-lg lg:text-xl font-normal leading-relaxed">
          {t("home.whatWeDo.title")}
        </div>
        <div className="hidden lg:block w-[14%]">&nbsp;</div>
        <div className="lg:w-[62%] flex-col justify-start items-start gap-12 lg:gap-16 inline-flex">
          <div className="text-stone-950 text-xl font-normal leading-normal lg:leading-relaxed">
            {t("home.whatWeDo.text")}
          </div>
          <a
            href="#"
            className="pl-6 pr-4 pt-3.5 pb-3.5 bg-stone-950 text-white rounded-3xl justify-start items-center gap-2.5 flex flex-row"
          >
            {t("home.whatWeDo.button")}
            <div className="fill-white">
              <ArrowRight />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

BlockOne.propTypes = {
  locale: PropTypes.string.isRequired,
  testimonial: PropTypes.object.isRequired,
};
export default BlockOne;
