// pages/_app.js
import {mode} from "@chakra-ui/theme-tools";
// 1. Import the extendTheme function
import {extendTheme} from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    primary: "#0F0F0F",
    base: {
      white: "#ffffff",
      black: "#0F0F0F",
    },
  },
};

const styles = {
  global: () => ({
    body: {
      bg: mode("#ffffff", "#0F0F0F"),
    },
  }),
};

export const theme = extendTheme({colors, styles});
