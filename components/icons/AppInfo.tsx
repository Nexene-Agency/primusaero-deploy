/* eslint-disable max-len */
import React from "react";

const AppInfo = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "app-info",
        viewBox: "0 0 24 24",
      },
      props
    ),
    React.createElement("path", {
      id: "app-info-path",
      d: "M12,1C5.9,1,1,5.9,1,12 s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1z M12,21c-5,0-9-4-9-9s4-9,9-9s9,4,9,9S17,21,12,21z M13,11v6c0,0.6-0.4,1-1,1s-1-0.4-1-1 v-6c0-0.6,0.4-1,1-1S13,10.4,13,11z M13,7c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S13,6.4,13,7z",
    })
  );
};

export default AppInfo;
