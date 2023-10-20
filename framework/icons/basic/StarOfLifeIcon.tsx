/* eslint-disable max-len */
import React from "react";

const StarOfLifeIcon = (props: any) => {
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
        "id": "star-of-life",
        "d": "M27.39258,20.26782l-2,3.46436a1,1,0,0,1-1.366.366L19,21.19629V27a1,1,0,0,1-1,1H14a1,1,0,0,1-1-1V21.19629L7.97345,24.09814a1,1,0,0,1-1.366-.366l-2-3.46436a.99991.99991,0,0,1,.366-1.366L9.99957,16,4.97345,13.09863a1.00005,1.00005,0,0,1-.36615-1.366L6.60742,8.26758a1,1,0,0,1,1.36609-.36621L13,10.80371V5a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v5.80371l5.02649-2.90234a1,1,0,0,1,1.36609.36621l2.00012,3.46509a1.00005,1.00005,0,0,1-.36615,1.366L22.00043,16l5.02612,2.90186A.99991.99991,0,0,1,27.39258,20.26782Z",
      }),
  );
};

export default StarOfLifeIcon;
