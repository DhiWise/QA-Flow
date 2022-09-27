module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { lg: "1120px", xl: "1281px", "2xl": "1441px", "3xl": "1729px" },
    extend: {
      colors: {
        gray_400: "#bbbbbb",
        bluegray_50: "#eaecf0",
        gray_901: "#232629",
        gray_900: "#1e1b1d",
        bluegray_100: "#d6dae2",
        green_600: "#349765",
        gray_50: "#f4f8fd",
        bluegray_900: "#262b35",
        bluegray_700: "#424c5d",
        bluegray_400: "#74839d",
        yellow_900: "#f58025",
        bluegray_200: "#bac1ce",
        gray_900_a2: "#0d1624a2",
        deep_orange_300: "#ff7a59",
        white_A700: "#ffffff",
      },
      borderRadius: {
        radius6: "6px",
        radius8: "8px",
        radius16: "16px",
        radius50: "50%",
      },
      fontFamily: { sourcesanspro: "Source Sans Pro", gilroy: "Gilroy" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
