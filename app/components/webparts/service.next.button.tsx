import ArrowButtonRightInverted from "@components/icons/ArrowButtonRightInverted";
import React from "react";
import PropTypes from "prop-types";

const ServiceNextButton = (props: any) => {

  return (
    <div className="flex items-center justify-end mr-5 lg:mr-16 mb-6 lg:mb-16">
      <a href={props.url} className="h-12 items-center gap-4 inline-flex">
        <div className="text-stone-950 text-xl font-normal leading-relaxed">{props.text}</div>
        <ArrowButtonRightInverted/>
      </a>
    </div>
  );
};

ServiceNextButton.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default ServiceNextButton;
