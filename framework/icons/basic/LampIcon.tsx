/* eslint-disable max-len */
import React from "react";

const LampIcon = (props: any) => {
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
        "id": "lamp",
        "d": "M21,26v2H12V26a1,1,0,0,1,1-1h2V15h3V25h2A1,1,0,0,1,21,26Zm2.20837-14.40613-3.11108-7A1,1,0,0,0,19.18347,4H13.81653a1,1,0,0,0-.91382.59387l-3.11108,7A1,1,0,0,0,10.70544,13H22.29456A1,1,0,0,0,23.20837,11.59387Z",
      }),
  );
};

export default LampIcon;
