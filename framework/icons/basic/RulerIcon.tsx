/* eslint-disable max-len */
import React from "react";

const RulerIcon = (props: any) => {
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
        "id": "ruler",
        "d": "M27,11H25v3.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V11H21v3.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V11H17v3.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V11H13v3.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V11H9v3.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V11H5a1,1,0,0,0-1,1V23a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V12A1,1,0,0,0,27,11ZM7,22.5A1.5,1.5,0,1,1,8.5,21,1.49992,1.49992,0,0,1,7,22.5Z",
      }),
  );
};

export default RulerIcon;