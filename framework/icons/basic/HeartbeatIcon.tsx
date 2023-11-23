/* eslint-disable max-len */
import React from "react";

const HeartbeatIcon = (props: any) => {
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
        "id": "heartbeat",
        "d": "M27.78131,11.92578c0,4.71533-5.85589,8.50293-10.69653,13.69824a1.48638,1.48638,0,0,1-2.16956,0c-1.56012-1.67444-3.21441-3.19677-4.75348-4.65673A.94674.94674,0,0,1,10,21H7a1,1,0,0,1,0-2h3a.99994.99994,0,0,0,.94873-.68372l.13672-.41015.98584,2.46521A1.00043,1.00043,0,0,0,13,21l.03857-.00073a1.00066,1.00066,0,0,0,.916-.701l1.57617-5.04383,1.02045,3.06177A1.00016,1.00016,0,0,0,17.5,19h2.03809a1,1,0,0,0,0-2H18.2207l-1.772-5.31628a1.00009,1.00009,0,0,0-1.90332.01806l-1.66113,5.31616-.95557-2.38928a1.00023,1.00023,0,0,0-1.87744.05506L9.2793,17h-2.921a8.28,8.28,0,0,1-2.13953-5.07422c0-5.53076,7.53943-9.48852,11.57764-3.82178a.25523.25523,0,0,0,.415.00538C20.47687,2.43469,27.78131,6.39331,27.78131,11.92578Z",
      }),
  );
};

export default HeartbeatIcon;