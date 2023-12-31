/* eslint-disable max-len */
import React from "react";

const DivisionIcon = (props: any) => {
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
        "id": "division",
        "d": "M26,14v4a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V14a1,1,0,0,1,1-1H25A1,1,0,0,1,26,14Zm-9,7H15a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V23A2,2,0,0,0,17,21ZM15,11h2a2,2,0,0,0,2-2V7a2,2,0,0,0-2-2H15a2,2,0,0,0-2,2V9A2,2,0,0,0,15,11Z",
      }),
  );
};

export default DivisionIcon;
