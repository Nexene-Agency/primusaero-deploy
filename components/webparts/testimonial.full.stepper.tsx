"use client";

import {DatabaseEntry} from "@framework/firebase.utils";
import {Testimonial} from "@components/dashboard/testimonials/model";
import React, {useState} from "react";
import ArrowButtonRightInverted from "@components/icons/ArrowButtonRightInverted";

interface TestimonialFullStepperProps {
  testimonials: DatabaseEntry<Testimonial>[],
}

const TestimonialFullStepper = (props: TestimonialFullStepperProps) => {
  const [index, setIndex] = useState<number>(0);
  const {testimonials} = props;

  const stepBack = () => {
    if (testimonials) {
      setIndex((actual) => actual > 0 ? actual - 1 : testimonials.length - 1);
    }
  };

  const stepForward = () => {
    if (testimonials) {
      setIndex((actual) => (actual + 1) % testimonials.length);
    }
  };

  return (
    <div className="px-6 lg:px-16 py-16 lg:py-36 flex flex-col gap-6 lg:gap-12">
      <div
        className="text-stone-950 text-xl lg:text-3xl font-bold font-muller uppercase">{testimonials[index].data.text}</div>
      <div
        className="self-stretch text-neutral-500 text-xl font-normal leading-relaxed">({testimonials[index].data.author})
      </div>
      <div className="mt-4 flex gap-6">
        <ArrowButtonRightInverted className="rotate-180 cursor-pointer" onClick={stepBack}/>
        <ArrowButtonRightInverted className="cursor-pointer" onClick={stepForward}/>
      </div>
    </div>
  );
};

export default TestimonialFullStepper;