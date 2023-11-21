import React from "react";

const BigArrow = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "BigArrow",
        viewBox: "0 0 105 76",
        width: "105",
        height: "76",
        fill: "none",
      },
      props
    ),
    React.createElement("path", {
      id: "BigArrow-path-1",
      d: "M98.4912 38.614L0.245605 38.614", stroke: "#C5D97D", strokeWidth: "8"
    }),
    React.createElement("path", {
      id: "BigArrow-path-2",
      d: "M64.1052 3L98.4912 38L64.1052 73", stroke: "#C5D97D", strokeWidth: "8"
    }),
  );
};

export default BigArrow;