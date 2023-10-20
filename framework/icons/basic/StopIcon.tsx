/* eslint-disable max-len */
import React from "react";

const StopIcon = (props: any) => {
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
        "id": "stop",
        "d": "M25,8V24a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8A1,1,0,0,1,8,7H24A1,1,0,0,1,25,8Z",
      }),
  );
};

export default StopIcon;
