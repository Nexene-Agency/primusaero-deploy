/* eslint-disable max-len */
import React from "react";

const InboxLockIcon = (props: any) => {
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
        "id": "inbox-lock",
        "d": "M25,14h3V25.5A2.50263,2.50263,0,0,1,25.5,28H6.5A2.50263,2.50263,0,0,1,4,25.5V7.5A2.50263,2.50263,0,0,1,6.5,5H19V8H7V18h4.09009a.5.5,0,0,1,.49029.40186l.83924,4.19628A.5.5,0,0,0,12.90991,23h6.18018a.5.5,0,0,0,.49029-.40186l.83924-4.19628A.5.5,0,0,1,20.90991,18H25Zm7-9v6a1.00291,1.00291,0,0,1-1,1H22a1.00291,1.00291,0,0,1-1-1V5a1.00291,1.00291,0,0,1,1-1h1V2a2.0026,2.0026,0,0,1,2-2h3a2.0026,2.0026,0,0,1,2,2V4h1A1.00291,1.00291,0,0,1,32,5ZM28,2.25A.25.25,0,0,0,27.75,2h-2.5a.25.25,0,0,0-.25.25V4h3Z",
      }),
  );
};

export default InboxLockIcon;
