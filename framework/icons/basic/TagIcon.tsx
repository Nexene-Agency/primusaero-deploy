/* eslint-disable max-len */
import React from "react";

const TagIcon = (props: any) => {
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
        "id": "tag",
        "d": "M27.04163,17.14209,15.19238,5.293A.99975.99975,0,0,0,14.48529,5H6A1,1,0,0,0,5,6v8.48511a1.00016,1.00016,0,0,0,.29291.70727L17.14215,27.0415a1.00023,1.00023,0,0,0,1.41419,0l8.48529-8.48535A.99986.99986,0,0,0,27.04163,17.14209ZM11,13a2,2,0,1,1,2-2A2.00006,2.00006,0,0,1,11,13Z",
      }),
  );
};

export default TagIcon;
