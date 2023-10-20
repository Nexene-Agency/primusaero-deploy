/* eslint-disable max-len */
import React from "react";

const VignettingIcon = (props: any) => {
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
        "id": "vignetting",
        "d": "M27.5,5H4.5A1.50039,1.50039,0,0,0,3,6.5v19A1.50039,1.50039,0,0,0,4.5,27h23A1.50039,1.50039,0,0,0,29,25.5V6.5A1.50039,1.50039,0,0,0,27.5,5ZM16,24c-5.51367,0-10-3.58887-10-8s4.48633-8,10-8,10,3.58887,10,8S21.51367,24,16,24Z",
      }),
  );
};

export default VignettingIcon;
