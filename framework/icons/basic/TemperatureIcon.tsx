/* eslint-disable max-len */
import React from "react";

const TemperatureIcon = (props: any) => {
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
        "id": "temperature",
        "d": "M20,18.835V8.08594a4,4,0,0,0-8,0V18.835a5.50005,5.50005,0,1,0,8,0Zm-4,6.25049a2.49807,2.49807,0,0,1-1-4.78809V14.08545a1,1,0,0,1,2,0v6.21191a2.49807,2.49807,0,0,1-1,4.78809Z",
      }),
  );
};

export default TemperatureIcon;
