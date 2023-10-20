/* eslint-disable max-len */
import React from "react";

const StopwatchIcon = (props: any) => {
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
        "id": "stopwatch",
        "d": "M29.14642,6.85352l-1.4588,1.45886a14.08606,14.08606,0,0,0-2.31653-2.68347l1.27533-1.27539a.5.5,0,0,1,.70716,0l1.79284,1.793A.49981.49981,0,0,1,29.14642,6.85352ZM18,2.15967V1a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1V2.15967A13.99676,13.99676,0,0,1,16,2,13.99676,13.99676,0,0,1,18,2.15967ZM28,16A12,12,0,1,1,16,4,12.01343,12.01343,0,0,1,28,16Zm-3,0a9,9,0,1,0-9,9A9.01016,9.01016,0,0,0,25,16Zm-8-1.72266V10a1,1,0,0,0-2,0v4.27734a1.98378,1.98378,0,0,0,0,3.44532V18a1,1,0,0,0,2,0v-.27734a1.98378,1.98378,0,0,0,0-3.44532Z",
      }),
  );
};

export default StopwatchIcon;
