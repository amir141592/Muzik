/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    fontFamily: {
      "fira-sans": ["fira-sans", "sans-serif"],
      signika: ["signika", "sans-serif"],
      "material-symbols-rounded": ["Material Symbols Rounded"],
    },
  },
  plugins: [],
};
