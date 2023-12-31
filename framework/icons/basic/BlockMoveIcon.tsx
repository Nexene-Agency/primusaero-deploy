/* eslint-disable max-len */
import React from "react";

const BlockMoveIcon = (props: any) => {
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
        "id": "block-move",
        "d": "M7.5,12H10v3H7.5a.50609.50609,0,0,0-.5.5V18H4V15.5A3.50424,3.50424,0,0,1,7.5,12ZM7,24.5V22H4v2.5A3.50424,3.50424,0,0,0,7.5,28H10V25H7.5A.50609.50609,0,0,1,7,24.5Zm10,0a.50609.50609,0,0,1-.5.5H14v3h2.5A3.50424,3.50424,0,0,0,20,24.5V22H17Zm11-17v9A3.50424,3.50424,0,0,1,24.5,20h-9A3.50424,3.50424,0,0,1,12,16.5v-9A3.50424,3.50424,0,0,1,15.5,4h9A3.50424,3.50424,0,0,1,28,7.5Zm-3,0a.50609.50609,0,0,0-.5-.5h-9a.50609.50609,0,0,0-.5.5v9a.50609.50609,0,0,0,.5.5h9a.50609.50609,0,0,0,.5-.5Z",
      }),
  );
};

export default BlockMoveIcon;
