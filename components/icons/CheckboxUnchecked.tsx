import React from "react";

const CheckboxUnchecked = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "CheckboxUnchecked",
        viewBox: "0 0 24 24",
        width: "24",
        height: "24",
        fill: "none"
      },
      props
    ),
    React.createElement("rect", {
      id: "CheckboxUnchecked-rect-1",
      x: "0.5", y: "0.5", width: "23", height: "23", rx: "5.5", fill: "white"
    }),
    React.createElement("rect", {
      id: "CheckboxUnchecked-rect-2",
      x: "0.5", y: "0.5", width: "23", height: "23", rx: "5.5", stroke: "#A39F9F"
    }),
  );
};

export default CheckboxUnchecked;