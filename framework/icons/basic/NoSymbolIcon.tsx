/* eslint-disable max-len */
import React from "react";

const NoSymbolIcon = (props: any) => {
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
        "id": "no-symbol",
        "d": "M16,4A12,12,0,1,0,28,16,12.01343,12.01343,0,0,0,16,4ZM7,16A8.99435,8.99435,0,0,1,21.00226,8.52313L8.52313,21.00226A8.94687,8.94687,0,0,1,7,16Zm9,9a8.94713,8.94713,0,0,1-5.00226-1.52313L23.47687,10.99774A8.99435,8.99435,0,0,1,16,25Z",
      }),
  );
};

export default NoSymbolIcon;
