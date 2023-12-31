/* eslint-disable max-len */
import React from "react";

const SwitchIcon = (props: any) => {
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
        "id": "switch",
        "d": "M18,19v3a1,1,0,0,1-1,1H12v2.07928a1,1,0,0,1-1.57349.81928L3.88464,21.31921a1,1,0,0,1,0-1.63848l6.54187-4.57935A1,1,0,0,1,12,15.92065V18h5A1,1,0,0,1,18,19Zm10.11536-8.31927L21.57349,6.10138A1,1,0,0,0,20,6.92065V9H15a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h5v2.07928a1,1,0,0,0,1.57349.81928l6.54187-4.57935A1,1,0,0,0,28.11536,10.68073Z",
      }),
  );
};

export default SwitchIcon;
