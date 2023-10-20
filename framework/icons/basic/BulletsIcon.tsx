/* eslint-disable max-len */
import React from "react";

const BulletsIcon = (props: any) => {
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
        "id": "bullets",
        "d": "M5,25h6v2a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1Zm8,2a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V25H13Zm8,0a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V25H21ZM10.5,12h-5a.5.5,0,0,0-.5.5V23h6V12.5A.5.5,0,0,0,10.5,12Zm8,0h-5a.5.5,0,0,0-.5.5V23h6V12.5A.5.5,0,0,0,18.5,12Zm8,0h-5a.5.5,0,0,0-.5.5V23h6V12.5A.5.5,0,0,0,26.5,12ZM10,7,8.4472,3.89441a.5.5,0,0,0-.8944,0L6,7v3h4Zm8,0L16.4472,3.89441a.5.5,0,0,0-.8944,0L14,7v3h4Zm8,0L24.4472,3.89441a.5.5,0,0,0-.8944,0L22,7v3h4Z",
      }),
  );
};

export default BulletsIcon;
