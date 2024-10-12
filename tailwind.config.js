/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.njk"],
  safelist: ["invisible", "visible", "max-h-0", "mb-0"],
  variants: {
    extend: {
      borderStyle: ["responsive", "hover"],
      borderWidth: ["responsive", "hover"],
      height: { "50vh": "50vh" },
    },
  },
  theme: {
    fontFamily: {
      heading: ["Inria Serif", "sans-serif"],
      body: ["Lato", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Inconsolata", "monospace"],
    },
    // colors: {
    //   "theme-green": "#166351",
    // },
    extend: {},
  },
  plugins: [],
};
