/* eslint-disable max-len */
import React from "react";

const ThumbnailsIcon = (props: any) => {
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
        "id": "thumbnails",
        "d": "M27,6v8a1,1,0,0,1-1,1H18a1,1,0,0,1-1-1V6a1,1,0,0,1,1-1h8A1,1,0,0,1,27,6ZM14,17H6a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V18A1,1,0,0,0,14,17ZM14,5H6A1,1,0,0,0,5,6v8a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V6A1,1,0,0,0,14,5ZM26,17H18a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V18A1,1,0,0,0,26,17Z",
      }),
  );
};

export default ThumbnailsIcon;
