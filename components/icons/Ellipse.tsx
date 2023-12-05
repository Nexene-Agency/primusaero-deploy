import React from "react";

const Ellipse = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "Ellipse",
        viewBox: "0 0 12 12",
        width: "12",
        height: "12",
        fill: "none"
      },
      props
    ),
    React.createElement("circle", {
      id: "Ellipse-path-1",
      cx: "6", cy: "6", r: "6", fill: "#0F0F0F"
    }),
  );
};

export default Ellipse;