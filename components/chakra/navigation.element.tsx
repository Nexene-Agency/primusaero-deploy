"use client";
import PropTypes from "prop-types";
import { useTheme } from "@chakra-ui/react";

export const NavigationElement = (props: any) => {
  const theme = useTheme();

  return (
    <a className="__navigation-element" href={props.url}>
      {props.icon ? props.icon : null}
      {props.text}
    </a>
  );
};

NavigationElement.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default NavigationElement;
