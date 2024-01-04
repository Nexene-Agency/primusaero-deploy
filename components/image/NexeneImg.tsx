"use client";

import { useInView } from "react-intersection-observer";
import "../../app/styles/animations.css";
import { Image } from "@chakra-ui/react";
import React from "react";

interface NexeneImgProps {
  src: string;
  className: string;
}

const NexeneImg = (props: NexeneImgProps) => {
  const { ref, inView } = useInView({ threshold: 1 });

  return (
    <Image
      ref={ref}
      src={props.src}
      className={inView ? `zoom-in-150 ${props.className}` : props.className}
    />
  );
};

export default NexeneImg;
