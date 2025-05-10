/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      white: "#FFFFFF",
      gray: "#8D99AE",
      dark: "#2B2D42",
    },
    extend: {
      fontSize: {
        sm: "10px",
        base: "12px",
        lg: "14px",
        xl: "16px",
        "2xl": "18px",
        "3xl": "22px",
      },
    },
  },
  plugins: [],
};
