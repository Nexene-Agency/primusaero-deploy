/* eslint-disable max-len */
import React from "react";

const CircleEmptyIcon = (props: any) => {
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
        "id": "circle-empty",
        "d": "M16,5A11,11,0,1,0,27,16,11.01245,11.01245,0,0,0,16,5Zm0,19a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,16,24Z",
      }),
  );
};

export default CircleEmptyIcon;
