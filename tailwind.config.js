/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        rafgins: ['Rafgins', 'sans-serif'],
        satisfy: ['Satisfy', 'cursive'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
 
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
