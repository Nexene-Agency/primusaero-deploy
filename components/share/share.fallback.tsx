"use client";
import React from "react";
import PropTypes from "prop-types";
import "./share.css";
import AppShare from "@components/icons/AppShare";

const ShareFallback = (props: any) => {
  return (
    <div
      className={`flex flex-col items-center __${
        props.cssPrefix ?? "default"
      }-share-block`}
    >
      <div>
        <AppShare className={`__${props.cssPrefix ?? "default"}-share-icon`} />
      </div>
      <div className={`__${props.cssPrefix ?? "default"}-share-text`}>
        {props.text}
      </div>
    </div>
  );
};

ShareFallback.propTypes = {
  text: PropTypes.string.isRequired,
  cssPrefix: PropTypes.string,
};

export default ShareFallback;
