/* eslint-disable max-len */
import React from "react";

const DoorHandleIcon = (props: any) => {
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
        "id": "door-handle",
        "d": "M17,15a3.00328,3.00328,0,0,1-3-3V10a3.00328,3.00328,0,0,1,3-3h5V5a1,1,0,0,0-1-1H11a1,1,0,0,0-1,1V27a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V15Zm0,7.72266V25a1,1,0,0,1-2,0V22.72266a2,2,0,1,1,2,0ZM29,13H17a1,1,0,0,1-1-1V10a1,1,0,0,1,1-1H29a1,1,0,0,1,1,1v2A1,1,0,0,1,29,13Z",
      }),
  );
};

export default DoorHandleIcon;
