/* eslint-disable max-len */
import React from "react";

const TextIcon = (props: any) => {
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
        "id": "text",
        "d": "M26,5V8a.99943.99943,0,0,1-.99933,1h-1a1,1,0,0,1-1-1V7H18V25h1a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H13a1,1,0,0,1-1-1V26a1,1,0,0,1,1-1h1V7H9.00067V8a1,1,0,0,1-1,1h-1a1,1,0,0,1-1-1L6,5A1,1,0,0,1,7,4H25.00067A.99943.99943,0,0,1,26,5Z",
      }),
  );
};

export default TextIcon;
