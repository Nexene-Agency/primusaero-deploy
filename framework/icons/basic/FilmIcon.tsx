/* eslint-disable max-len */
import React from "react";

const FilmIcon = (props: any) => {
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
        "id": "film",
        "d": "M27,5H5A1,1,0,0,0,4,6V26a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V6A1,1,0,0,0,27,5ZM9,25H6V23H9Zm0-4H6V19H9Zm0-4H6V15H9Zm0-4H6V11H9ZM9,9H6V7H9ZM21,25H11V17H21Zm0-10H11V7H21Zm5,10H23V23h3Zm0-4H23V19h3Zm0-4H23V15h3Zm0-4H23V11h3Zm0-4H23V7h3Z",
      }),
  );
};

export default FilmIcon;
