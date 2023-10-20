/* eslint-disable max-len */
import React from "react";

const BarcodeIcon = (props: any) => {
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
        "id": "barcode",
        "d": "M6,26h6v2H6ZM6,4H4V24H6Zm4,0H8V24h2Zm8,0H14V24h4ZM14,28h2V26H14Zm4,0h2V26H18Zm4,0h4V26H22ZM24,4V24h4V4ZM22,4H20V24h2Z",
      }),
  );
};

export default BarcodeIcon;
