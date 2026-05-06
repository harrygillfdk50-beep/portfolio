/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FAF7F2",
        secondary: "#7A7A7A",
        tertiary: "#F3EFE8",
        lavender: "#9B8EC4",
        "lavender-deep": "#6B5B95",
        "lavender-light": "#E8E0F5",
        "cream-card": "#F3EFE8",
        "text-dark": "#2C2C2C",
        "black-100": "#F0EBE0",
        "black-200": "#EDE6D8",
        "white-100": "#2C2C2C",
      },
      boxShadow: {
        card: "0px 10px 40px -10px rgba(107, 91, 149, 0.2)",
        lavender: "0px 0px 20px rgba(155, 142, 196, 0.4)",
      },
      screens: {
        xs: "375px",
        sm: "390px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      backgroundImage: {
        "hero-pattern": "none",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
