/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#FBF6EE",
        terracotta: "#E2725B",
        sage: "#8BA888",
        mustard: "#F2C14E",
        lavender: "#C9A0DC",
        ink: "#2D2A26",
        "ink-soft": "#6B6560",
      },
      fontFamily: {
        heading: ["Fredoka_600SemiBold"],
        "heading-bold": ["Fredoka_700Bold"],
        body: ["SpaceGrotesk_400Regular"],
        "body-medium": ["SpaceGrotesk_500Medium"],
        "body-bold": ["SpaceGrotesk_700Bold"],
      },
    },
  },
  plugins: [],
};