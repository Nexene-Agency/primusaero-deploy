/* eslint-disable max-len */
import React from "react";

const TvIcon = (props: any) => {
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
        "id": "tv",
        "d": "M23,26v1a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V26a1,1,0,0,1,1-1H22A1,1,0,0,1,23,26ZM30,6.5v15A1.50008,1.50008,0,0,1,28.5,23H3.5A1.50008,1.50008,0,0,1,2,21.5V6.5A1.50008,1.50008,0,0,1,3.5,5h25A1.50008,1.50008,0,0,1,30,6.5ZM27,8H5V20H27Z",
      }),
  );
};

export default TvIcon;
