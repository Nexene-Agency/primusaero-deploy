/* eslint-disable max-len */
import React from "react";

const FolderLockIcon = (props: any) => {
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
        "id": "folder-lock",
        "d": "M19,10H4V7A2,2,0,0,1,6,5h4.17157a1.99993,1.99993,0,0,1,1.41425.58582L13,7h6Zm.18433,2H4V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V14H22A2.995,2.995,0,0,1,19.18433,12ZM32,5v6a1.003,1.003,0,0,1-1,1H22a1.003,1.003,0,0,1-1-1V5a1.003,1.003,0,0,1,1-1h1V2a2.0026,2.0026,0,0,1,2-2h3a2.0026,2.0026,0,0,1,2,2V4h1A1.003,1.003,0,0,1,32,5ZM28,2.25A.25.25,0,0,0,27.75,2h-2.5a.25.25,0,0,0-.25.25V4h3Z",
      }),
  );
};

export default FolderLockIcon;
