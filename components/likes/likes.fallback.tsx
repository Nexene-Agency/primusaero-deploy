"use server";
import React from "react";
import PropTypes from "prop-types";
import "./likes.css";
import AppHeart from "@components/icons/AppHeart";

const LikesFallback = (props: any) => {
  return (
    <div
      className={`flex flex-col items-center __${
        props.cssPrefix ?? "default"
      }-likes-block`}
    >
      <div>
        <AppHeart className={`__${props.cssPrefix ?? "default"}-likes-icon`} />
      </div>
      <div className={`__${props.cssPrefix ?? "default"}-likes-text`}>
        {props.likes}
      </div>
    </div>
  );
};

LikesFallback.propTypes = {
  cssPrefix: PropTypes.string,
  likes: PropTypes.number.isRequired,
};

export default LikesFallback;
