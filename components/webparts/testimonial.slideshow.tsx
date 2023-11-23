"use client";
import axios from "axios";
import {ListContent} from "@framework/list/list.definition";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {timer} from "rxjs";
import {Testimonial} from "@components/dashboard/testimonials/model";

const TestimonialSlideshow = (props: any) => {
  const [testimonials, setTestimonials] = useState<ListContent<Testimonial> | undefined>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const ticker = timer(props.timeout ?? 5000, props.timeout ?? 5000);
  const [ticked, setTicked] = useState<number>(0);

  useEffect(() => {
    axios.get("/api/testimonials").then((res) => {
        console.log("setting testimonials", res.data);
        setTestimonials(res.data);
      }
    );
    const subscription = ticker.subscribe(setTicked);

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  useEffect(() => {
    if (testimonials) {
      setCurrentIndex((actual) => (actual + 1) % testimonials.data.length);
    }
  }, [ticked]);

  return (
    <div
      className="px-8 lg:px-16 py-36 lg:py-72 bg-white bg-opacity-90 border-b border-stone-950 backdrop-blur-3xl flex-col justify-start items-start gap-2.5 inline-flex">
      {testimonials ? <>
        <div className="flex-col justify-start items-center gap-8 lg:gap-12 flex">
          <div
            className="self-stretch text-stone-950 text-xl lg:text-4xl font-normal leading-normal lg:leading-10">“{testimonials.data[currentIndex].data.text}”
          </div>
          <div
            className="self-stretch text-zinc-500 text-lg lg:text-xl font-normal lg:leading-relaxed">({testimonials.data[currentIndex].data.author})
          </div>
        </div>
      </> : null}
    </div>
  );
};

TestimonialSlideshow.propTypes = {
  timeout: PropTypes.number.isRequired
};

export default TestimonialSlideshow;