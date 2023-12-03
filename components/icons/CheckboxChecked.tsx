import React from "react";

const CheckboxChecked = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "CheckboxChecked",
        viewBox: "0 0 24 24",
        width: "24",
        height: "24",
      },
      props
    ),
    React.createElement("rect", {
      id: "CheckboxChecked-rect",
      width: "24", height: "24", rx: "6", fill: "#0F0F0F"
    }),
    React.createElement("path", {
      id: "CheckboxChecked-checkmark",
      d: "M6 10.7222L10.5517 15L18 8", stroke: "white"
    }),
  );
};

export default CheckboxChecked;