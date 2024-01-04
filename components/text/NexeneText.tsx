"use client";

import { useInView } from "react-intersection-observer";
import "../../app/styles/animations.css";

interface NexeneTextProps {
  text: string;
}

const NexeneText = (props: NexeneTextProps) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={
        inView
          ? "easeOut max-w-screen text-color-grey-3 text-xl mx-6 lg:mx-0 font-normal leading-relaxed"
          : "opacity-0 w-full text-color-grey-3 text-xl mx-6 lg:mx-0 font-normal leading-relaxed"
      }
    >
      {props.text}
    </div>
  );
};

export default NexeneText;
