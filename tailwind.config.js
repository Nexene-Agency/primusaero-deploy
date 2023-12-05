/** @type {import("tailwindcss").Config} */
module.exports = {
  // important: true, // This will add !important to all of your utilities' declarations, but not needed anymore
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./framework/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "sm": "640px",
      // => @media (min-width: 640px) { ... }

      "md": "768px",
      // => @media (min-width: 768px) { ... }

      "lg": "1024px",
      // => @media (min-width: 1024px) { ... }

      "xl": "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "color-grey-1": "var(--color-grey-1)",
        "color-grey-2": "var(--color-grey-2)",
        "color-grey-3": "var(--color-grey-3)",
        "color-grey-4": "var(--color-grey-4)",
        "primus-green": "var(--primus-green)",
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "33%",
      },
      width: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "1/20": "5%"
      }
    },
  },
  plugins: [],
};
