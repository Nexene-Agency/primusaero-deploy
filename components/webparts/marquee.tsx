"use client";
import React from "react";
import { motion } from "framer-motion";
import "./marquee.css";
import PropTypes from "prop-types";

const Marquee = (props: any) => {
  const variants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: props.duration,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div>
      <div className="__marquee">
        <motion.div
          className="__marquee-track"
          variants={variants}
          animate="animate"
        >
          {props.children}
          {props.children}
        </motion.div>
      </div>
    </div>
  );
};

Marquee.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};
export default Marquee;
