// pages/_app.js
import {mode} from "@chakra-ui/theme-tools";
// 1. Import the extendTheme function
import {extendTheme} from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    primary: "#ff6445",
    primaryHover: "#D55238",
    secondary: "#645ade",
    secondaryHover: "#453DAA",
    base: {
      white: "#fffdf7",
      whiteHover: "#FFE6DC",
      black: "#302c2c",
      blackHover: "#FFE6DC",
    },
  },
  primary: {
    50: "#ffece9",
    100: "#ffd1c7",
    200: "#ffb2a2",
    300: "#ff937d",
    400: "#ff7b61",
    500: "#ff6445",
    600: "#ff5c3e",
    700: "#ff5236",
    800: "#ff482e",
    900: "#ff361f",
  },
  secondary: {
    50: "#ecebfb",
    100: "#d1cef5",
    200: "#b2adef",
    300: "#938ce8",
    400: "#7b73e3",
    500: "#645ade",
    600: "#5c52da",
    700: "#5248d5",
    800: "#483fd1",
    900: "#362ec8",
  },
  white: {
    50: "#fffffe",
    100: "#fffefd",
    200: "#fffefb",
    300: "#fffef9",
    400: "#fffdf8",
    500: "#fffdf7",
    600: "#fffdf6",
    700: "#fffcf5",
    800: "#fffcf3",
    900: "#fffcf1",
  },
  black: {
    50: "#e6e6e6",
    100: "#c1c0c0",
    200: "#989696",
    300: "#6e6b6b",
    400: "#4f4c4c",
    500: "#302c2c",
    600: "#2b2727",
    700: "#242121",
    800: "#1e1b1b",
    900: "#131010",
  },
};

// const components = {
//   Button: {
//     baseStyle: {
//       position: "relative",
//       borderRadius: "16px",
//       opacity: 1,
//       paddingY: "18px",
//       paddingX: "20px",
//       fontSize: "16px",
//       fontWeight: "normal",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       overflow: "hidden",
//     },
//     variants: {
//       primary: {
//         backgroundColor: "brand.primary",
//         fill: "brand.base.white",
//         color: "brand.base.white",
//         _hover: {
//           backgroundColor: "brand.primaryHover",
//         },
//         _active: {
//           backgroundColor: "brand.primaryHover",
//         },
//       },
//       secondary: {
//         backgroundColor: "brand.secondary",
//         fill: "brand.base.white",
//         color: "brand.base.white",
//         _hover: {
//           backgroundColor: "brand.secondaryHover",
//         },
//         _active: {
//           backgroundColor: "brand.secondaryHover",
//         },
//       },
//       white: {
//         backgroundColor: "brand.base.white",
//         fill: "brand.base.black",
//         color: "brand.base.black",
//         _hover: {
//           backgroundColor: "brand.whiteHover",
//         },
//         _active: {
//           backgroundColor: "brand.whiteHover",
//         },
//       },
//       black: {
//         backgroundColor: "brand.base.black",
//         fill: "brand.base.white",
//         color: "brand.base.white",
//         _hover: {
//           backgroundColor: "brand.blackHover",
//         },
//         _active: {
//           backgroundColor: "brand.blackHover",
//         },
//       },
//     },
//     defaultProps: {
//       variant: "primary",
//     },
//   },
//   Checkbox: {
//     baseStyle: {
//       width: "24px",
//       height: "24px",
//       backgroundColor: "brand.base.white",
//       borderRadius: "50%",
//       verticalAlign: "middle",
//       border: "1px solid #fe6444",
//       appearance: "none",
//       webkitAppearance: "none",
//       outline: "none",
//       cursor: "pointer",
//     },
//   },
//   Stepper: {
//     baseStyle: {
//       indicator: {
//         width: "48px",
//         height: "48px",
//         backgroundColor: "brand.base.black",
//       },
//     },
//   },
// };

const styles = {
  global: () => ({
    body: {
      bg: mode("#fffdf7", "#302c2c"),
    },
  }),
};

export const theme = extendTheme({ colors, styles });
