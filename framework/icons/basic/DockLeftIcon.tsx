/* eslint-disable max-len */
import React from "react";

const DockLeftIcon = (props: any) => {
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
        "id": "dock-left",
        "d": "M4,7.5v17A3.50425,3.50425,0,0,0,7.5,28h17A3.50425,3.50425,0,0,0,28,24.5V7.5A3.50425,3.50425,0,0,0,24.5,4H7.5A3.50425,3.50425,0,0,0,4,7.5ZM24.5,7a.50641.50641,0,0,1,.5.5v17a.50641.50641,0,0,1-.5.5H7.5a.50641.50641,0,0,1-.5-.5V7.5A.50641.50641,0,0,1,7.5,7ZM12,10V22a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V10a1,1,0,0,1,1-1h1A1,1,0,0,1,12,10Z",
      }),
  );
};

export default DockLeftIcon;
