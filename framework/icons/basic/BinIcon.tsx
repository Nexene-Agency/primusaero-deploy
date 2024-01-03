/* eslint-disable max-len */
import React from "react";

const BinIcon = (props: any) => {
  return React.createElement(
    "svg", Object.assign(
      {
        "xmlns": "http://www.w3.org/2000/svg",
        "id": "glyphicons-basic",
        "viewBox": "0 0 32 32",
        "fill": "currentColor",
        "width": "32px",
        "height": "32px",
      },
      props),
    React.createElement(
      "path",
      {
        "id": "bin",
        "d": "M7,26a2.00006,2.00006,0,0,0,2,2H23a2.00006,2.00006,0,0,0,2-2V10H7ZM20,14a1,1,0,0,1,2,0V24a1,1,0,0,1-2,0Zm-5,0a1,1,0,0,1,2,0V24a1,1,0,0,1-2,0Zm-5,0a1,1,0,0,1,2,0V24a1,1,0,0,1-2,0ZM26,6V8H6V6A1,1,0,0,1,7,5h6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V5h6A1,1,0,0,1,26,6Z",
      }),
  );
};

export default BinIcon;
