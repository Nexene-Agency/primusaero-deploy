import React from "react";

const Print = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "print",
        viewBox: "0 0 24 24",
        width: "24",
        height: "24",
        fill: "currentColor",
      },
      props
    ),
    React.createElement("path", {
      id: "print-path-1",
      d: "M16.0005 8.30771V5.30771H8.00054V8.30771H6.50056V3.80774H17.5005V8.30771H16.0005ZM17.8082 12.3077C18.0915 12.3077 18.329 12.2118 18.5207 12.0202C18.7124 11.8285 18.8082 11.591 18.8082 11.3077C18.8082 11.0243 18.7124 10.7868 18.5207 10.5952C18.329 10.4035 18.0915 10.3077 17.8082 10.3077C17.5249 10.3077 17.2874 10.4035 17.0957 10.5952C16.904 10.7868 16.8082 11.0243 16.8082 11.3077C16.8082 11.591 16.904 11.8285 17.0957 12.0202C17.2874 12.2118 17.5249 12.3077 17.8082 12.3077ZM16.0005 19V14.7307H8.00054V19H16.0005ZM17.5005 20.5H6.50056V16.5H2.78906V10.8077C2.78906 10.0993 3.03105 9.50561 3.51501 9.02644C3.99898 8.54729 4.59031 8.30771 5.28901 8.30771H18.7121C19.4204 8.30771 20.0141 8.54729 20.4933 9.02644C20.9724 9.50561 21.212 10.0993 21.212 10.8077V16.5H17.5005V20.5ZM19.7121 15V10.8077C19.7121 10.5243 19.6162 10.2868 19.4246 10.0952C19.2329 9.9035 18.9954 9.80766 18.7121 9.80766H5.28901C5.00568 9.80766 4.76818 9.9035 4.57651 10.0952C4.38485 10.2868 4.28901 10.5243 4.28901 10.8077V15H6.50056V13.2308H17.5005V15H19.7121Z"
    }),
  );
};

export default Print;