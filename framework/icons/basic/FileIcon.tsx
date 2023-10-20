/* eslint-disable max-len */
import React from "react";

const FileIcon = (props: any) => {
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
        "id": "file",
        "d": "M20,11h5.5a.5.5,0,0,1,.5.5V27a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V5A1,1,0,0,1,8,4H18.5a.5.5,0,0,1,.5.5V10A1,1,0,0,0,20,11Zm1.5-2H26L21,4V8.5A.5.5,0,0,0,21.5,9Z",
      }),
  );
};

export default FileIcon;
