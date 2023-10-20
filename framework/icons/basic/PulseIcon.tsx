/* eslint-disable max-len */
import React from "react";

const PulseIcon = (props: any) => {
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
        "id": "pulse",
        "d": "M28,19v1a1,1,0,0,1-1,1H22.50018a1.5002,1.5002,0,0,1-1.47674-1.23633L19.95215,13.7666,17.47363,26.78076a1.49992,1.49992,0,0,1-1.40625,1.21778c-.02246.001-.04492.00146-.06836.00146a1.50033,1.50033,0,0,1-1.4414-1.08789L12,17.96l-.55756,1.95191A1.50018,1.50018,0,0,1,10,21H5a1,1,0,0,1-1-1V19a1,1,0,0,1,1-1H8.86816l1.68946-5.91211a1.50014,1.50014,0,0,1,2.88476,0l2.26563,7.9292L18.52637,5.21924a1.5,1.5,0,0,1,2.95019.01709L23.75586,18H27A1,1,0,0,1,28,19Z",
      }),
  );
};

export default PulseIcon;
