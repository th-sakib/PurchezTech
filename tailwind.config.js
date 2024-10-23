import daisyui from "daisyui";

import gradient from "./src/assets/images/Banner-image/gradient-image.png";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sankofa: ["Sankofa Display", "sans-serif"],
        josefin_sans: ["Josefin Sans", "sans-serif"],
        avro: ["Arvo", "serif"],
      },
      backgroundImage: {
        "hero-background":
          "url('./src/assets/images/Banner-image/gradient-image.png')",
      },
      colors: {
        // Light blue (#E9F1FA), bright blue (#00ABE4), white (#FFFFFF)
        "primary-color": "#00ABE4", //light blue
        textC: "#FFF",
        "on-hover": "#0e7192ec",
        backgroundC: "#E9F1FA",
      },
    },
  },
  plugins: [daisyui],
};
