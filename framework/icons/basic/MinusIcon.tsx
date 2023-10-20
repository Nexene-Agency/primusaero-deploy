/* eslint-disable max-len */
import React from "react";

const MinusIcon = (props: any) => {
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
        "id": "minus",
        "d": "M26,14v4a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V14a1,1,0,0,1,1-1H25A1,1,0,0,1,26,14Z",
      }),
  );
};

export default MinusIcon;
