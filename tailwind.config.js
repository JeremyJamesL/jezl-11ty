/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.njk"],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Inconsolata", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};
