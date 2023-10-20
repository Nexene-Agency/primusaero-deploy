/* eslint-disable max-len */
import React from "react";

const BankIcon = (props: any) => {
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
        "id": "bank",
        "d": "M27,24.5v3a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-3a.5.5,0,0,1,.5-.5H7V15h4v9h3V15h4v9h3V15h4v9h1.5A.5.5,0,0,1,27,24.5Zm.641-14.67975L16.25922,4.1203a.65.65,0,0,0-.58338.00061L4.35767,9.81989A.65007.65007,0,0,0,4,10.40045V12.35a.65.65,0,0,0,.65.65h22.7a.65.65,0,0,0,.65-.65V10.40143A.65.65,0,0,0,27.64105,9.82025Z",
      }),
  );
};

export default BankIcon;
