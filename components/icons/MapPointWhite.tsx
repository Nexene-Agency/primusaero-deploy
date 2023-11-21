import React from "react";

const MapPointWhite = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "MapPointWhite",
        viewBox: "0 0 12 13",
        width: "12",
        height: "13",
      },
      props
    ),
    React.createElement("circle", {
      id: "MapPointWhite-path-1",
      cx: "6", cy: "6.13623", r: "3.5", fill: "#86B32E", stroke: "#F7F5F5", strokeWidth: "5"
    }),
  );
};

export default MapPointWhite;

