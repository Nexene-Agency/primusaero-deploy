/* eslint-disable max-len */
import React from "react";

const SquaresIcon = (props: any) => {
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
        "id": "squares",
        "d": "M29,6.5v13a3.495,3.495,0,0,1-3,3.44946V6.5a.50641.50641,0,0,0-.5-.5H9.05054A3.495,3.495,0,0,1,12.5,3h13A3.50424,3.50424,0,0,1,29,6.5Zm-5,5v13A3.50424,3.50424,0,0,1,20.5,28H7.5A3.50424,3.50424,0,0,1,4,24.5v-13A3.50424,3.50424,0,0,1,7.5,8h13A3.50424,3.50424,0,0,1,24,11.5Zm-3,0a.50641.50641,0,0,0-.5-.5H7.5a.50641.50641,0,0,0-.5.5v13a.50641.50641,0,0,0,.5.5h13a.50641.50641,0,0,0,.5-.5Z",
      }),
  );
};

export default SquaresIcon;
