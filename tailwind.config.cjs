/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Mahogany palette — full atmospheric swap (token NAMES kept for code stability).
        // primary = page background (was cornsilk, now darkest mahogany).
        primary: "#250902",          // rich-mahogany (page bg)
        secondary: "#c4a8aa",        // muted rose (body text on dark)
        tertiary: "#38040e",         // rich-mahogany-2 (section bg)
        lavender: "#ad2831",         // brown-red (primary accent, was sunlit clay)
        "lavender-mid": "#640d14",   // black-cherry (was forest green)
        "lavender-deep": "#800e13",  // dark-wine (main interactive, was olive)
        "lavender-light": "#5a2228", // muted wine (subtle borders)
        "lavender-pale": "#3d0a12",  // very dark wine (subtle bg variants)
        "ink": "#f5e7e8",            // soft cream — LIGHT text on dark
        "cream-section": "#38040e",  // rich-mahogany-2 (alt section bg)
        "cream-card": "#3d0a12",     // slightly lighter card bg
        "text-dark": "#f5e7e8",      // LIGHT text (flipped from forest green)
        "accent": "#ad2831",         // brown-red (was copper)
        "black-100": "#38040e",
        "black-200": "#3d0a12",
        "white-100": "#250902",      // page bg (was cornsilk)
      },
      boxShadow: {
        card: "0px 10px 40px -10px rgba(0, 0, 0, 0.5)",
        lavender: "0px 0px 24px rgba(173, 40, 49, 0.5)",
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
