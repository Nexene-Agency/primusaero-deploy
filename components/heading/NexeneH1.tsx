"use client";

import { useInView } from "react-intersection-observer";
import "../../app/styles/animations.css";

interface NexeneH1Props {
  text: string;
}

const NexeneH1 = (props: NexeneH1Props) => {
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <div
      ref={ref}
      className={
        inView
          ? "easeOut text-white text-5xl break-keep lg:text-8xl font-bold font-muller uppercase overflow-hidden mx-6 lg:mx-0"
          : "opacity-0 text-white text-5xl break-keep lg:text-8xl font-bold font-muller uppercase overflow-hidden mx-6 lg:mx-0"
      }
    >
      {props.text}
    </div>
    /*<div
      ref={ref}
      className="text-white text-5xl break-keep lg:text-8xl font-bold font-muller uppercase overflow-hidden mx-6"
  >
    {props.text.match(/./gu)!.map((char, index) => (
        <span
            key={`${char}-${index}`}
            style={{animationDelay: `${index * 0.04}s` }}
          className={
            inView ? "revealTextAnimation" : "revealTextAnimation-start"
          }
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>*/
  );
};

export default NexeneH1;
