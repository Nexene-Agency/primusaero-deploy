/* eslint-disable max-len */
import React from "react";

const MoreIcon = (props: any) => {
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
        "id": "more",
        "d": "M27,16a3,3,0,1,1-3-3A3,3,0,0,1,27,16ZM16,13a3,3,0,1,0,3,3A3,3,0,0,0,16,13ZM8,13a3,3,0,1,0,3,3A3,3,0,0,0,8,13Z",
      }),
  );
};

export default MoreIcon;
