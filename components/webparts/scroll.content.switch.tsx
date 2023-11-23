"use client";
import {useWindowScroll} from "@framework/hooks/use.window.scroll";
import PropTypes from "prop-types";

export const ScrollContentSwitch = (props: any) => {
  const [scroll, setScroll] = useWindowScroll();

  return scroll.y < props.yPosition ? props.children[0] : props.children[1];
};

ScrollContentSwitch.protoTypes = {
  key: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  yPosition: PropTypes.number.isRequired,
};

export default ScrollContentSwitch;