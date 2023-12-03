import React from "react";

const RadioButtonChecked = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "RadioButtonChecked",
        viewBox: "0 0 26 26",
        width: "26",
        height: "26",
        fill: "none"
      },
      props
    ),
    React.createElement("circle", {
      id: "RadioButtonChecked-outer",
      cx: "13", cy: "13", r: "12.5", stroke: "currentColor",
    }),
    React.createElement("circle", {
      id: "RadioButtonChecked-inner",
      cx: "13", cy: "13", r: "8", fill: "currentColor"
    }),
  );
};

export default RadioButtonChecked;
