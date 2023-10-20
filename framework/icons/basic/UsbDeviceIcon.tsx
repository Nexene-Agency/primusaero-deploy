/* eslint-disable max-len */
import React from "react";

const UsbDeviceIcon = (props: any) => {
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
        "id": "usb-device",
        "d": "M24,13H23V5a.99943.99943,0,0,0-1-1H10A.99943.99943,0,0,0,9,5v8H8a.99943.99943,0,0,0-1,1V25a3.00328,3.00328,0,0,0,3,3H22a3.00328,3.00328,0,0,0,3-3V14A.99943.99943,0,0,0,24,13ZM11,6H21v7H11Zm2,2h2v2H13Zm6,0v2H17V8Z",
      }),
  );
};

export default UsbDeviceIcon;
