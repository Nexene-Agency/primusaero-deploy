/* eslint-disable max-len */
import React from "react";

const ParkingIcon = (props: any) => {
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
        "id": "parking",
        "d": "M18.77643,15.56836A2.43555,2.43555,0,0,1,16.51794,17H14V12h2.5A2.51651,2.51651,0,0,1,18.77643,15.56836ZM27,7V25a2.00006,2.00006,0,0,1-2,2H7a2.00006,2.00006,0,0,1-2-2V7A2,2,0,0,1,7,5H25A2,2,0,0,1,27,7ZM16.5,9h-5a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5V20h2.5A5.24605,5.24605,0,0,0,22,14.5,5.24605,5.24605,0,0,0,16.5,9Z",
      }),
  );
};

export default ParkingIcon;
