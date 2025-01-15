import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin_sans: ["Josefin Sans", "sans-serif"],
        secondaryFont: ["Roboto", "sans-serif"],
      },
      colors: {
        "primary-color": "#1A1F2B", // Dark Charcoal - for main text and headers, providing a deep, strong contrast
        "accent-color": "#0077B6", // Deep Blue - for buttons, call-to-actions, and logo accents, giving a bold and confident touch
        "secondary-color": "#E0E0E0", // Cool Gray - for input backgrounds and secondary sections, keeping it neutral and grounded
        "on-hover": "#005F8A", // Midnight Blue - hover effect for buttons and interactive elements, adding a darker, assertive contrast
        "background-color": "#F2F4F5", // Warm Gray - a subtle gray that provides a soft, neutral backdrop without overpowering the design
        "additional-color": "#F4A261", // Burnt Orange - for highlights, icons, and calls to action, adding a warm yet earthy contrast
        "faded-text": "#aaa", // for descriptions of product
      },
      screens: {
        xs: "400px",
        orderSm: "615px",
        bannerMd: "950px",
        userDMd: "768px",
        userDLg: "900px",
        logoMd: "807px",
      },
    },
  },
  plugins: [daisyui],
};
// Background: #FFFFFF — Pure white for a bright, clean canvas.
// Primary Text: #333333 — Dark gray for excellent readability and contrast.
// Secondary Text: #6B7280 — Medium gray for less prominent text, like subtitles or descriptions.
// Accent Color 1 (Primary): #00B4D8 — Soft teal-blue, great for buttons, links, and key accents.
// Accent Color 2 (Secondary): #FF7A59 — Warm coral for highlights, call-to-actions, or icons.
// Border/Divider: #E0E0E0 — Light gray for subtle dividers and card borders.
// Hover/Active State: #0077B6 — Slightly darker teal for hover effects on interactive elements.
// Success: #36B37E — Fresh minty green for success indicators or positive alerts.
// Error: #D64550 — Gentle, warm red for error states, alerts, and warnings.
