/* eslint-disable max-len */
import React from "react";

const WalletIcon = (props: any) => {
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
        "id": "wallet",
        "d": "M26,11H8.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,8.5,9H27V8a2,2,0,0,0-2-2H8A3,3,0,0,0,5,9V23a3,3,0,0,0,3,3H25a3,3,0,0,0,3-3V13A2,2,0,0,0,26,11Zm-2.5,9A1.5,1.5,0,1,1,25,18.5,1.5,1.5,0,0,1,23.5,20Z",
      }),
  );
};

export default WalletIcon;
