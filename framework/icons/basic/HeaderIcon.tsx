/* eslint-disable max-len */
import React from "react";

const HeaderIcon = (props: any) => {
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
        "id": "header",
        "d": "M24,8V24h1a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H19a1,1,0,0,1-1-1V25a1,1,0,0,1,1-1h1V17H11v7h1a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V25a1,1,0,0,1,1-1H7V8H6A1,1,0,0,1,5,7V6A1,1,0,0,1,6,5h6a1,1,0,0,1,1,1V7a1,1,0,0,1-1,1H11v6h9V8H19a1,1,0,0,1-1-1V6a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1V7a1,1,0,0,1-1,1Z",
      }),
  );
};

export default HeaderIcon;
