/* eslint-disable max-len */
import React from "react";

const BugIcon = (props: any) => {
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
        "id": "bug",
        "d": "M20,9H12V8a4.141,4.141,0,0,1,4-4,4.141,4.141,0,0,1,4,4Zm7,7H23V15a3.96447,3.96447,0,0,0-.2467-1.33923L25.707,10.707A.99928.99928,0,0,0,26,10V8a1,1,0,0,0-2,0V9.58594l-2.39844,2.39844A3.9657,3.9657,0,0,0,19,11H13a3.9657,3.9657,0,0,0-2.60156.98438L8,9.58594V8A1,1,0,0,0,6,8v2a.99928.99928,0,0,0,.293.707L9.2467,13.66077A3.96447,3.96447,0,0,0,9,15v1H5a1,1,0,0,0,0,2H9v2.15546a.96334.96334,0,0,0-.207.13751l-2.5,2.5A.99928.99928,0,0,0,6,23.5v3a1,1,0,0,0,2,0V23.91406L9.21606,22.698a6.991,6.991,0,0,0,13.56788,0L24,23.91406V26.5a1,1,0,0,0,2,0v-3a.99928.99928,0,0,0-.293-.707l-2.5-2.5A.96334.96334,0,0,0,23,20.15546V18h4a1,1,0,0,0,0-2Z",
      }),
  );
};

export default BugIcon;