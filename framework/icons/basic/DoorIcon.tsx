/* eslint-disable max-len */
import React from "react";

const DoorIcon = (props: any) => {
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
        "id": "door",
        "d": "M25.08307,4.92358l-10-.83337A.9908.9908,0,0,0,14.01849,5H14V26h.01849a.9907.9907,0,0,0,1.06458.90967l10-.83325A1.00012,1.00012,0,0,0,26,25.07983V5.92017A1,1,0,0,0,25.08307,4.92358ZM17,17a1,1,0,1,1,1-1A1,1,0,0,1,17,17ZM8,5h4V7H8V24h4v2H8a2.0026,2.0026,0,0,1-2-2V7A2.0026,2.0026,0,0,1,8,5Z",
      }),
  );
};

export default DoorIcon;
