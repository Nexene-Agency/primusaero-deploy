import React from "react";

const ArrowButtonRight = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "ArrowButtonRight",
        viewBox: "0 0 48 48",
        width: "48",
        height: "48",
      },
      props
    ),
    React.createElement("circle", {
      id: "ArrowButtonRight-path-1",
      cx: "24", cy: "24", r: "24", fill: "white"
    }),
    React.createElement("path", {
      id: "ArrowButtonRight-path-1",
      d: "M25.5 19L24.79 19.71L28.09 23H18V24H28.09L24.79 27.29L25.5 28L30 23.5L25.5 19Z", fill: "#0F0F0F"
    }),
  );
};

export default ArrowButtonRight;