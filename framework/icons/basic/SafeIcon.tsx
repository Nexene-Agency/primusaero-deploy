/* eslint-disable max-len */
import React from "react";

const SafeIcon = (props: any) => {
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
        "id": "safe",
        "d": "M18,15a.99943.99943,0,0,0,1,1h2.81573a3,3,0,1,1,0-2H19A.99943.99943,0,0,0,18,15ZM28,7.5v15A1.50039,1.50039,0,0,1,26.5,24H5.5A1.50039,1.50039,0,0,1,4,22.5V7.5A1.50039,1.50039,0,0,1,5.5,6h21A1.50039,1.50039,0,0,1,28,7.5ZM24,15a5,5,0,1,0-5,5A5.00588,5.00588,0,0,0,24,15Zm2,11v.5A1.50039,1.50039,0,0,1,24.5,28h-2A1.50039,1.50039,0,0,1,21,26.5V26ZM11,26v.5A1.50039,1.50039,0,0,1,9.5,28h-2A1.50039,1.50039,0,0,1,6,26.5V26Z",
      }),
  );
};

export default SafeIcon;
