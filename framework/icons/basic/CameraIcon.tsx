/* eslint-disable max-len */
import React from "react";

const CameraIcon = (props: any) => {
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
        "id": "camera",
        "d": "M25,8H22.125L21.81,6.91992A2.83342,2.83342,0,0,0,19.25,5h-6.5a2.83342,2.83342,0,0,0-2.56,1.91992L9.875,8H7a3.00879,3.00879,0,0,0-3,3V23a3.00879,3.00879,0,0,0,3,3H25a3.00879,3.00879,0,0,0,3-3V11A3.00879,3.00879,0,0,0,25,8ZM16,23a6,6,0,1,1,6-6A6,6,0,0,1,16,23ZM26,11.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5v-1a.5.5,0,0,1,.5-.5h1a.5.5,0,0,1,.5.5ZM20,17a4,4,0,1,1-4-4A3.99992,3.99992,0,0,1,20,17Z",
      }),
  );
};

export default CameraIcon;
