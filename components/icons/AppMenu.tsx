/* eslint-disable max-len */
import React from "react";

const AppMenu = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "app-menu",
        viewBox: "0 0 24 8",
      },
      props
    ),
    React.createElement("path", {
      id: "app-menu-path",
      d: "M24,1c0,0.6-0.4,1-1,1H1C0.4,2,0,1.6,0,1s0.4-1,1-1h22C23.6,0,24,0.4,24,1z M15,6H1C0.4,6,0,6.4,0,7s0.4,1,1,1h14 c0.6,0,1-0.4,1-1S15.6,6,15,6z",
    })
  );
};

export default AppMenu;
