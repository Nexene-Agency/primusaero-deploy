/* eslint-disable max-len */
import React from "react";

const FontIcon = (props: any) => {
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
        "id": "font",
        "d": "M30,6V9a.99943.99943,0,0,1-.99933,1h-1a1,1,0,0,1-1-1V8H22V25h1a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H17a1,1,0,0,1-1-1V26a1,1,0,0,1,1-1h1V8H13.00067V9a1,1,0,0,1-1,1h-1a1,1,0,0,1-1-1L10,6a1,1,0,0,1,1-1H29.00067A.99943.99943,0,0,1,30,6ZM14.00067,14H3a1,1,0,0,0-1,1l.00067,3a1,1,0,0,0,1,1h1a1,1,0,0,0,1-1V17H7v8H6a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V26a1,1,0,0,0-1-1H10V17h2.00067v1a1,1,0,0,0,1,1h1A.99943.99943,0,0,0,15,18V15A.99943.99943,0,0,0,14.00067,14Z",
      }),
  );
};

export default FontIcon;
