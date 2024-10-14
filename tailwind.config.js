/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // sesuaikan dengan jalur file Anda
  ],
  theme: {
    extend: {
      screens: {
        phone: { min: "120px", max: "440px" },
        tablet: { min: "441px", max: "1100px" },
      },
    },
  },
  plugins: [require('daisyui')],
}
