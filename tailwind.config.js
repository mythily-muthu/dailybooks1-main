const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000D9",
        "border-gray": "#e5e7eb",
        "border-color": "rgb(218 223 248)",
        "bg-blue": "rgb(55 97 238)",
        "text-light": "#22314f",
        "light-gray": "rgb(209 213 219)",
        "text-gray": "rgb(75 85 99)",
        "text-color": "rgb(34 49 79)",
        "nav-grey": "#455a64",
        "text-green": "#15803d"
      }
    },
  },
  plugins: [],
}

