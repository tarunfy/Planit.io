/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
      },
      fontFamily: {
        Lexend: ["Lexend", "sans-serif"],
      },
      colors: {
        primary: "#2463EB",

        secondary: {
          50: "#f3f3f4",
          100: "#e7e8e9",
          200: "#c3c5c9",
          300: "#9fa3a9",
          400: "#585d68",
          500: "#101827",
          600: "#0e1623",
          700: "#0c121d",
          800: "#0a0e17",
          900: "#080c13",
        },
      },
    },
  },
  plugins: [],
};
