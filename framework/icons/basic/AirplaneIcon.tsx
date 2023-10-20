/* eslint-disable max-len */
import React from "react";

const AirplaneIcon = (props: any) => {
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
        "id": "airplane",
        "d": "M28,20.48071v1.04151a1,1,0,0,1-1.37183.92822l-7.98932-3.2-.598,5.38208,2.77155,2.21728A.5001.5001,0,0,1,21,27.24023v1.02124a.49993.49993,0,0,1-.68567.46424L16,27l-4.31433,1.72571A.49993.49993,0,0,1,11,28.26147V27.24023a.5001.5001,0,0,1,.18762-.39038l2.77155-2.21728-.598-5.38208-7.98932,3.2A1,1,0,0,1,4,21.52222V20.48071a1.00009,1.00009,0,0,1,.37543-.781L13,12.802V7a3,3,0,0,1,6,0v5.802l8.62457,6.89771A1.00009,1.00009,0,0,1,28,20.48071Z",
      }),
  );
};

export default AirplaneIcon;
