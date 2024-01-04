"use client";

import { useInView } from "react-intersection-observer";
import "../../app/styles/animations.css";

interface NexeneH2Props {
  text: string;
}

const NexeneH2 = (props: NexeneH2Props) => {
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <div
      ref={ref}
      className={
        inView
          ? "easeOut text-stone-950 text-xl font-normal leading-relaxed mb-8 mx-6 lg:mx-0 overflow-hidden"
          : "opacity-0 text-stone-950 text-xl font-normal leading-relaxed mb-8 lg:mx-0 overflow-hidden"
      }
    >
      {props.text}
    </div>
  );
};

export default NexeneH2;
