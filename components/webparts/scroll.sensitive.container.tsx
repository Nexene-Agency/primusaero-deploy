"use client";
import React from "react";
import {useWindowScroll} from "@framework/hooks/use.window.scroll";
import PropTypes from "prop-types";

export const ScrollSensitiveContainer = (props: any) => {
  const [scroll, setScroll] = useWindowScroll();

  return (
    <div key={props.key}
         className={`${props.defaultClassName ?? ""} ${scroll.y < props.yPosition ? (props.belowPosition ?? "") : (props.abovePosition ?? "")}`}>
      {props.children}
    </div>
  );
};

ScrollSensitiveContainer.protoTypes = {
  key: PropTypes.string.isRequired,
  defaultClassName: PropTypes.string,
  children: PropTypes.any.isRequired,
  yPosition: PropTypes.number.isRequired,
  belowPosition: PropTypes.string,
  abovePosition: PropTypes.string,
};

export default ScrollSensitiveContainer;