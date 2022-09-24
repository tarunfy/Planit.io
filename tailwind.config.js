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
        Outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: {
    "50": "#eef2ff",
    "100": "#e0e7ff",
    "200": "#c7d2fe",
    "300": "#a5b4fc",
    "400": "#818cf8",
    "500": "#6366f1",
    "600": "#4f46e5",
    "700": "#4338ca",
    "800": "#3730a3",
    "900": "#312e81",
        },

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


// kgvimfei