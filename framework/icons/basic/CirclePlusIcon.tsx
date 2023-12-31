/* eslint-disable max-len */
import React from "react";

const CirclePlusIcon = (props: any) => {
  return React.createElement(
    "svg", Object.assign(
      {
        "xmlns": "http://www.w3.org/2000/svg",
        "id": "glyphicons-basic",
        "viewBox": "0 0 32 32",
      },
      props),
    React.createElement(
      "path",
      {
        "id": "circle-plus",
        "d": "M16,4A12,12,0,1,0,28,16,12.01312,12.01312,0,0,0,16,4Zm6,13a1,1,0,0,1-1,1H18v3a1,1,0,0,1-1,1H15a1,1,0,0,1-1-1V18H11a1,1,0,0,1-1-1V15a1,1,0,0,1,1-1h3V11a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v3h3a1,1,0,0,1,1,1Z",
      }),
  );
};

export default CirclePlusIcon;
