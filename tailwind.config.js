/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      white: "#FFFFFF",
      gray: "#8D99AE",
      dark: "#2B2D42",
    },
  },
  plugins: [],
};
