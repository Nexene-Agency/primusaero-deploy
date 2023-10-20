/* eslint-disable max-len */
import React from "react";

const BowlingIcon = (props: any) => {
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
        "id": "bowling",
        "d": "M16,5A11,11,0,1,0,27,16,11.01245,11.01245,0,0,0,16,5Zm-4.5,7A1.5,1.5,0,1,1,13,10.5,1.5,1.5,0,0,1,11.5,12Zm4,3A1.5,1.5,0,1,1,17,13.5,1.5,1.5,0,0,1,15.5,15Zm0-5A1.5,1.5,0,1,1,17,8.5,1.5,1.5,0,0,1,15.5,10Z",
      }),
  );
};

export default BowlingIcon;
