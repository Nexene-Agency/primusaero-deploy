/* eslint-disable max-len */
import React from "react";

const CandleIcon = (props: any) => {
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
        "id": "candle",
        "d": "M13.50555,11.76514c-2.19653-2.967.48481-6.31324,2.9513-8.511a.49292.49292,0,0,1,.7987.21265c.6883,2.16943,2.30848,4.0144,2.30848,6.2644a4.21768,4.21768,0,0,1-.95008,2.82788.49981.49981,0,0,1-.85992-.43579c.23-1.42505-.75836-2.55908-1.52179-3.64673a.24622.24622,0,0,0-.37866-.03467,3.78949,3.78949,0,0,0-1.45417,2.9773A.50074.50074,0,0,1,13.50555,11.76514ZM24.382,24H7.618a1,1,0,0,0-.89443,1.44722L8,28H24l1.27642-2.55278A1,1,0,0,0,24.382,24ZM21,16a1,1,0,0,0-1-1H12a1,1,0,0,0-1,1v6H21Z",
      }),
  );
};

export default CandleIcon;