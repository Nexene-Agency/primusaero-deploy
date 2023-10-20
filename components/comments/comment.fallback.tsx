"use server";
import React from "react";
import PropTypes from "prop-types";
import "./comments.css";
import AppComments from "@components/icons/AppComments";

const CommentsFallback = (props: any) => {
  return (
    <div className={`__${props.cssPrefix ?? "default"}-comments-block`}>
      <div>
        <AppComments
          className={`__${props.cssPrefix ?? "default"}-comments-icon`}
        />
      </div>
      <div className={`__${props.cssPrefix ?? "default"}-comments-icon-text`}>
        {props.comments}
      </div>
    </div>
  );
};

CommentsFallback.propTypes = {
  cssPrefix: PropTypes.string,
  comments: PropTypes.number.isRequired,
};

export default CommentsFallback;
