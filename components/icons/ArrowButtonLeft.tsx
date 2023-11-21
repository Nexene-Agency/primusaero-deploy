import React from "react";

const ArrowButtonLeft = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "ArrowButtonLeft",
        viewBox: "0 0 48 48",
        width: "48",
        height: "48",
      },
      props
    ),
    React.createElement("circle", {
      id: "ArrowButtonLeft-path-1",
      cx: "24", cy: "24", r: "24", fill: "white"
    }),
    React.createElement("path", {
      id: "ArrowButtonLeft-path-1",
      d: "M22.5 29L23.21 28.29L19.91 25L30 25L30 24L19.91 24L23.21 20.71L22.5 20L18 24.5L22.5 29Z", fill: "#0F0F0F"
    }),
  );
};

export default ArrowButtonLeft;