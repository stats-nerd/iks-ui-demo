/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robotoSlab: ["Roboto Slab", "serif"],
      },
      colors: {
        prGreenDark: "#1e6406",
        PrimaryGreen: "#258503",
        PrimaryGreenLight: "#92C281",
        PrimaryGreenLighter: "#EFF6EC",
        PrimaryGreenLight001: "#7AB167",
        PrimaryGrayText: "#6D6760",
        PrimaryDarkGreenText: "#134501",
      },
    },
    plugins: [],
  },
};
