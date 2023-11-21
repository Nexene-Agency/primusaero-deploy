import React from "react";

const ArrowRight = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "arrowRight",
        viewBox: "0 0 12 10",
        width: "12",
        height: "10",
      },
      props
    ),
    React.createElement("path", {
      id: "arrowRight-path-1",
      d: "M7.5 0.5L6.79 1.21L10.09 4.5H0V5.5H10.09L6.79 8.79L7.5 9.5L12 5L7.5 0.5Z",
    }),
  );
};

export default ArrowRight;