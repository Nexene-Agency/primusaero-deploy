import React from "react";

const BurgerMenu = (props: any) => {
  return React.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        id: "burgerMenu",
        viewBox: "0 0 32 6",
        width: "32",
        height: "6",
      },
      props
    ),
    React.createElement("rect", {
      id: "burgerMenu-path-1",
      width: "32", height: "1", fill: "#0F0F0F"
    }),
    React.createElement("rect", {
      id: "burgerMenu-path-2",
      y: "5", width: "32", height: "1", fill: "#0F0F0F"
    }),
  );
};

export default BurgerMenu;

