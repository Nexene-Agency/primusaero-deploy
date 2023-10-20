/* eslint-disable max-len */
import React from "react";

const FlagIcon = (props: any) => {
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
        "id": "flag",
        "d": "M26,7V18a1,1,0,0,1-1,1H11v7a1,1,0,0,1,1,1v1H7V27a1,1,0,0,1,1-1V5A1,1,0,0,1,9,4h1a1,1,0,0,1,1,1V6H25A1,1,0,0,1,26,7Z",
      }),
  );
};

export default FlagIcon;
