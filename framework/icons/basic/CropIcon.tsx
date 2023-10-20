/* eslint-disable max-len */
import React from "react";

const CropIcon = (props: any) => {
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
        "id": "crop",
        "d": "M20,11H4a1,1,0,0,1-1-1V8A1,1,0,0,1,4,7H7V4A1,1,0,0,1,8,3h2a1,1,0,0,1,1,1V7H23a1,1,0,0,1,1,1V18H20Zm7,9H11V13H7V23a1,1,0,0,0,1,1H20v3a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V24h3a1,1,0,0,0,1-1V21A1,1,0,0,0,27,20Z",
      }),
  );
};

export default CropIcon;
