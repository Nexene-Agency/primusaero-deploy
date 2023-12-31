/* eslint-disable max-len */
import React from "react";

const EggIcon = (props: any) => {
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
        "id": "egg",
        "d": "M15.5,5C11,5,7,12,7,18s3.8056,10,8.5,10S24,24,24,18,20,5,15.5,5Zm0,4c-.50977,0-1.51172.7207-2.50488,2.30371a.99775.99775,0,0,1-.84766.46875.98677.98677,0,0,1-.53027-.15332.99879.99879,0,0,1-.31543-1.37793C12.06055,9.03027,13.61621,7,15.5,7a1,1,0,0,1,0,2Z",
      }),
  );
};

export default EggIcon;
