/* eslint-disable max-len */
import React from "react";

const DirectionsArrowIcon = (props: any) => {
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
        "id": "directions-arrow",
        "d": "M14.58582,11.75732l-1.41443,1.41456a3.967,3.967,0,0,0-1.02283,1.80517l-6.27-6.2699a1.00009,1.00009,0,0,1,.00006-1.4143l1.41431-1.414a1,1,0,0,1,1.41412,0Zm11.362-6.83654-5.91876.84552a1,1,0,0,0-.56567,1.69708l1.12244,1.12244-6.00007,6.00006A1.99984,1.99984,0,0,0,14,16V27a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V16.82837l5.41425-5.41412,1.12237,1.12237a1,1,0,0,0,1.697-.56573l.84558-5.91877A1,1,0,0,0,25.94781,4.92078Z",
      }),
  );
};

export default DirectionsArrowIcon;
