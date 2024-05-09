/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.njk"],
  variants: {
    extend: {
      borderStyle: ["responsive", "hover"],
      borderWidth: ["responsive", "hover"],
    },
  },
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
