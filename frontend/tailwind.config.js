
import daisyui from 'daisyui'
import daisyUIThemes from "daisyui/src/theming/themes"

/** @type {import('tailwindcss').Config} */

export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyUIThemes["aqua"],
          primary: "blue",
          secondary: "teal",
        },
      },
    ],
  }, 
}

