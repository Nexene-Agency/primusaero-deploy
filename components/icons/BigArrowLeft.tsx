import React from "react";

const BigArrowLeft = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "BigArrowLeft",
        viewBox: "0 0 105 76",
        width: "105",
        height: "76",
        fill: "none",
      },
      props
    ),
    React.createElement("path", {
      id: "BigArrowLeft-path-1",
      d: "m 6.18093,37.386 h 98.24559", stroke: "#C5D97D", strokeWidth: "8"
    }),
    React.createElement("path", {
      id: "BigArrowLeft-path-2",
      d: "M 40.56693,73 6.18093,38 40.56693,3", stroke: "#C5D97D", strokeWidth: "8"
    }),
  );
};

export default BigArrowLeft;