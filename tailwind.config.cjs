/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fefae0",
        secondary: "#7a7060",
        tertiary: "#ede7bf",
        lavender: "#dda15e",
        "lavender-mid": "#283618",
        "lavender-deep": "#606c38",
        "lavender-light": "#d4cc9a",
        "lavender-pale": "#e2d9a8",
        "ink": "#283618",
        "cream-section": "#ede7bf",
        "cream-card": "#f5efc8",
        "text-dark": "#283618",
        "accent": "#bc6c25",
        "black-100": "#ede7bf",
        "black-200": "#e2d9a8",
        "white-100": "#fefae0",
      },
      boxShadow: {
        card: "0px 10px 40px -10px rgba(96, 108, 56, 0.25)",
        lavender: "0px 0px 20px rgba(188, 108, 37, 0.35)",
      },
      screens: {
        xs: "375px",
        phone: "414px",
      },
      backgroundImage: {
        "hero-pattern": "none",
      },
      fontFamily: {
        sans: ["ZeroSix", "Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        display: ["'DM Serif Display'", "serif"],
        zerosix: ["ZeroSix", "sans-serif"],
      },
    },
  },
  plugins: [],
};
