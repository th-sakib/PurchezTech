import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sankofa: ["Sankofa Display", "sans-serif"],
        josefin_sans:["Josefin Sans", "sans-serif"]
      },
    },
  },
  plugins: [
    daisyui,
  ],
}