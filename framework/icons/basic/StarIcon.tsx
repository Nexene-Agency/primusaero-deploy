/* eslint-disable max-len */
import React from "react";

const StarIcon = (props: any) => {
  return React.createElement(
    "svg", Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "glyphicons-basic",
        viewBox: "0 0 32 32",
        width: "32",
        height: "32",
      },
      props),
    React.createElement(
      "path",
      {
        "id": "star",
        "d": "M27.34766,14.17944l-6.39209,4.64307,2.43744,7.506a.65414.65414,0,0,1-.62238.85632.643.643,0,0,1-.38086-.12744l-6.38568-4.6383-6.38574,4.6383a.643.643,0,0,1-.38086.12744.65419.65419,0,0,1-.62238-.85632l2.43744-7.506L4.66046,14.17944A.65194.65194,0,0,1,5.04358,13h7.89978L15.384,5.48438a.652.652,0,0,1,1.24018,0L19.06476,13h7.89978A.652.652,0,0,1,27.34766,14.17944Z",
      }),
  );
};

export default StarIcon;