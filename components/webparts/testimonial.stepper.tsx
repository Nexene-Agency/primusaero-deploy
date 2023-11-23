"use client";
import axios from "axios";
import {ListContent} from "@framework/list/list.definition";
import {Testimonial} from "@components/dashboard/testimonials/model";
import React, {useEffect, useState} from "react";
import ArrowButtonLeft from "@components/icons/ArrowButtonLeft";
import ArrowButtonRight from "@components/icons/ArrowButtonRight";

const TestimonialStepper = (props: any) => {
  const [testimonials, setTestimonials] = useState<ListContent<Testimonial> | undefined>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    axios.get("/api/testimonials").then((res) => setTestimonials(res.data));
  }, []);


  const stepBack = () => {
    if (testimonials) {
      setCurrentIndex((actual) => actual > 0 ? actual - 1 : testimonials.data.length - 1);
    }
  };

  const stepForward = () => {
    if (testimonials) {
      setCurrentIndex((actual) => (actual + 1) % testimonials.data.length);
    }
  };

  return (
    <div className="px-6 lg:px-16 py-36 lg:py-72 flex-col justify-start items-start gap-2.5 inline-flex">
      {testimonials ? <>
        <div className="w-full flex-col justify-start items-center gap-8 lg:gap-12 inline-flex">
          <div className="self-stretch text-white text-xl lg:text-4xl font-normal leading-normal lg:leading-10">
            “{testimonials.data[currentIndex].data.text}”
          </div>
          <div className="self-stretch text-neutral-100 text-xl font-normal leading-relaxed">
            ({testimonials.data[currentIndex].data.author})
          </div>
        </div>

        <div className="flex flex-row mt-12 lg:mt-8 gap-4 lg:gap-6">
          <ArrowButtonLeft className="cursor-pointer" onClick={stepBack}/>
          <ArrowButtonRight className="cursor-pointer" onClick={stepForward}/>
        </div>
      </> : null}
    </div>
  );
};

TestimonialStepper.propTypes = {};

export default TestimonialStepper;