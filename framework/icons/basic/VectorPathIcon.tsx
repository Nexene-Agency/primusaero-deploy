/* eslint-disable max-len */
import React from "react";

const VectorPathIcon = (props: any) => {
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
        "id": "vector-path",
        "d": "M27,11a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1H22a1,1,0,0,0-1,1V6H11V5a1,1,0,0,0-1-1H5A1,1,0,0,0,4,5v5a1,1,0,0,0,1,1H6V21H5a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V26H21v1a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V22a1,1,0,0,0-1-1H26V11ZM6,6H9V9H6ZM9,26H6V23H9Zm12-4v1H11V22a1,1,0,0,0-1-1H9V11h1a1,1,0,0,0,1-1V9H21v1a1,1,0,0,0,1,1h1V21H22A1,1,0,0,0,21,22Zm5,4H23V23h3ZM23,9V6h3V9Z",
      }),
  );
};

export default VectorPathIcon;
