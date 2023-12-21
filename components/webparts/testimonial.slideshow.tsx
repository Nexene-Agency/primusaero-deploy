"use client";
import axios from "axios";
import {ListContent} from "@framework/list/list.definition";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {timer} from "rxjs";
import {Testimonial} from "@components/dashboard/testimonials/model";

const TestimonialSlideshow = (props: any) => {
  const [testimonials, setTestimonials] = useState<
    ListContent<Testimonial> | undefined
  >();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const ticker = timer(props.timeout ?? 5000, props.timeout ?? 5000);
  const [ticked, setTicked] = useState<number>(0);

  useEffect(() => {
    axios.get("/api/testimonials").then((res) => {
      console.log("setting testimonials", res.data);
      setTestimonials(res.data);
    });
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

  return testimonials ? (
    <>
      <div
        className={props.textCss}>
        “{testimonials.data[currentIndex].data.text}”
      </div>
      <div className={props.authorCss}>
        ({testimonials.data[currentIndex].data.author})
      </div>
    </>
  ) : null;
};

TestimonialSlideshow.propTypes = {
  timeout: PropTypes.number.isRequired,
  textCss: PropTypes.string.isRequired,
  authorCss: PropTypes.string.isRequired,
};

export default TestimonialSlideshow;
