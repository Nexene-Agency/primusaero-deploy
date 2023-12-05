import React from "react";

const Close = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "close",
        viewBox: "0 0 24 25",
        width: "24",
        height: "25",
        fill: "none"
      },
      props
    ),
    React.createElement("rect", {
      id: "close-path-1",
      x: "0.332886", y: "23.4602", width: "32", height: "1", transform: "rotate(-45 0.332886 23.4602)"
    }),
    React.createElement("rect", {
      id: "close-path-2",
      x: "1.03992", y: "0.832764", width: "32", height: "1", transform: "rotate(45 1.03992 0.832764)"
    }),
  );
};

export default Close;