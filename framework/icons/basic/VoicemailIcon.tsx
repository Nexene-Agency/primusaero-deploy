/* eslint-disable max-len */
import React from "react";

const VoicemailIcon = (props: any) => {
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
        "id": "voicemail",
        "d": "M23,10a5.98922,5.98922,0,0,0-5.18823,9H14.18823A5.995,5.995,0,1,0,9,22H23a6,6,0,0,0,0-12ZM9,19a3,3,0,1,1,3-3A3.00328,3.00328,0,0,1,9,19Zm14,0a3,3,0,1,1,3-3A3.00328,3.00328,0,0,1,23,19Z",
      }),
  );
};

export default VoicemailIcon;
