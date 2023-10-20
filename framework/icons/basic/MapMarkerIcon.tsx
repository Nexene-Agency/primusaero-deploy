/* eslint-disable max-len */
import React from "react";

const MapMarkerIcon = (props: any) => {
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
        "id": "map-marker",
        "d": "M16,4a8.9999,8.9999,0,0,0-9,9c0,6,6.7583,13.07764,8.16156,14.63135a1.13778,1.13778,0,0,0,1.67688,0C18.2417,26.07764,25,19,25,13A8.9999,8.9999,0,0,0,16,4Zm0,14a5,5,0,1,1,5-5A5.00013,5.00013,0,0,1,16,18Z",
      }),
  );
};

export default MapMarkerIcon;
