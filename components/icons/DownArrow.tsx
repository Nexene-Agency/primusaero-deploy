import React from "react";

const DownArrow = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "DownArrow",
        viewBox: "0 0 12 7",
        width: "12",
        height: "7",
        fill: "none",
      },
      props
    ),
    React.createElement("path", {
      id: "DownArrow-path-1",
      d: "M11 1L6 6L1 1", stroke: "#0F0F0F"
    }),
  );
};

export default DownArrow;

