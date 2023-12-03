import React from "react";

const SuccessIcon = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "SuccessIcon",
        viewBox: "0 0 88 88",
        width: "88",
        height: "88",
        fill: "none",
      },
      props
    ),
    React.createElement("circle", {
      id: "SuccessIcon-circle-1",
      opacity: "0.2", cx: "44", cy: "44", r: "41.5", fill: "#86B32E", stroke: "#86B32E", strokeWidth: "5"
    }),
    React.createElement("circle", {
      id: "SuccessIcon-circle-2",
      cx: "44", cy: "44", r: "33.5", fill: "#86B32E", stroke: "#86B32E", strokeWidth: "5"
    }),
    React.createElement("path", {
      id: "SuccessIcon-path-3",
      d: "M32.5 43.1429L40.75 51L56.5 36", stroke: "white", strokeWidth: "2"
    }),
  );
};

export default SuccessIcon;