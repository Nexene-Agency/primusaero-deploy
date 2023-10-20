/* eslint-disable max-len */
import React from "react";

const HardDriveIcon = (props: any) => {
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
        "id": "hard-drive",
        "d": "M24,22H8a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V24A2,2,0,0,0,24,22Zm0,3.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5v-1a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5ZM26,7V20.55634A3.95376,3.95376,0,0,0,24,20H8a3.95376,3.95376,0,0,0-2,.55634V7A3,3,0,0,1,9,4H23A3,3,0,0,1,26,7Z",
      }),
  );
};

export default HardDriveIcon;
