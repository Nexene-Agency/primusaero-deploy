/* eslint-disable max-len */
import React from "react";

const SpeakersIcon = (props: any) => {
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
        "id": "speakers",
        "d": "M13,20a2,2,0,1,1-2-2A2,2,0,0,1,13,20Zm-2-9a1,1,0,1,0-1-1A1,1,0,0,0,11,11Zm7-5V26a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V6A1,1,0,0,1,5,5H17A1,1,0,0,1,18,6ZM8,10a3,3,0,1,0,3-3A3,3,0,0,0,8,10Zm8,10a5,5,0,1,0-5,5A5,5,0,0,0,16,20ZM27,5H19.81573A2.96457,2.96457,0,0,1,20,6V7.18372a3.0002,3.0002,0,1,1,0,5.63256v2.28449a5,5,0,1,1,0,9.79846V26a2.96457,2.96457,0,0,1-.18427,1H27a1,1,0,0,0,1-1V6A1,1,0,0,0,27,5Zm-5,5a1,1,0,1,0-1,1A1,1,0,0,0,22,10Zm1,10a2,2,0,0,0-2-2,1.97948,1.97948,0,0,0-1,.2774v3.4452A1.97948,1.97948,0,0,0,21,22,2,2,0,0,0,23,20Z",
      }),
  );
};

export default SpeakersIcon;
