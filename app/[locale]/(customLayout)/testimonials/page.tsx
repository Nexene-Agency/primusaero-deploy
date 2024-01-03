import React, {Suspense} from "react";
import LOCAL_MESSAGES from "./messages";
import MESSAGES from "@app/components/data/common-messages";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import "../../../styles/brand.css";
import "./page.css";
import Header from "@app/components/webparts/header";
import Footer from "@app/components/webparts/footer";
import {ListContent} from "@framework/list/list.definition";
import {Testimonial} from "@components/dashboard/testimonials/model";
import {getAllTestimonials} from "@app/server-actions/testimonials";
import {DatabaseEntry} from "@framework/firebase.utils";
import ArrowButtonRightInverted from "@components/icons/ArrowButtonRightInverted";
import TestimonialFullStepper from "@components/webparts/testimonial.full.stepper";
import MarqueeText from "react-marquee-text";
import BigArrowLeft from "@components/icons/BigArrowLeft";

interface PageProps {
  params: { locale: string };
}

const TestimonialsPage = async ({params}: PageProps) => {
  const tl = translator(flatten(getMessages(params.locale, LOCAL_MESSAGES))); // local translator
  const tc = translator(flatten(getMessages(params.locale, MESSAGES))); // common translator
  const content: ListContent<Testimonial> = await getAllTestimonials(); // just the first one


  const renderTestimonial = (testimonial: DatabaseEntry<Testimonial>, i: number) => (
    <div key={testimonial.id!} className="flex flex-col gap-6 lg:gap-12">
      <div className="text-stone-950 text-xl font-normal">&ldquo;{testimonial.data.text}&rdquo;</div>
      <div className="text-neutral-500 text-xl font-normal">({testimonial.data.author})</div>
    </div>
  );

  const fallbackStepper = () => (
    <div className="px-6 lg:px-16 py-16 lg:py-36 flex flex-col gap-6 lg:gap-12">
      <div
        className="text-stone-950 text-xl lg:text-3xl font-bold font-muller uppercase">{content.data[0].data.text}</div>
      <div
        className="self-stretch text-neutral-500 text-xl font-normal leading-relaxed">({content.data[0].data.author})
      </div>
      <div className="mt-4 flex gap-6">
        <ArrowButtonRightInverted className="rotate-180"/>
        <ArrowButtonRightInverted/>
      </div>
    </div>
  );

  const renderSlogans = () => (
    <div className="justify-start items-center lg:items-start pt-3 lg:pt-6 gap-2 lg:gap-12 inline-flex mx-1 lg:mx-6">
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {tl("slogans.slogan1")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0"/>
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {tl("slogans.slogan2")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0"/>
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {tl("slogans.slogan3")}
      </span>
      <BigArrowLeft className="h-12 lg:h-[76px] rotate-180 mb-3 lg:mb-0"/>
    </div>
  );

  return (
    <>
      <Header locale={params.locale}/>
      <div className="__restricted-width mt-[137px] lg:mt-[108px]">

        <Suspense fallback={renderSlogans()}>
          <div className="block w-full bg-white">
            <MarqueeText duration={10} direction="right">
              {renderSlogans()}
              {renderSlogans()}
            </MarqueeText>
          </div>
        </Suspense>

        <Suspense fallback={fallbackStepper()}>
          <TestimonialFullStepper testimonials={content.data}/>
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-48 ml-6 lg:ml-16 mr-6 lg:mr-72 mb-36 lg:mb-72">
          {content.data.map((testimonial, i) => renderTestimonial(testimonial, i))}
        </div>

      </div>
      <Footer locale={params.locale}/>
    </>
  );
};
export default TestimonialsPage;
