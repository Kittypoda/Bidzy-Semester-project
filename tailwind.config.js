/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",       
    "./src/**/*.{js,ts,jsx,tsx}",  
  ],
  theme: {
    extend: {
      colors: {
        customLYellow: '#FFF7E7',
        customDYellow: '#FFECC7',
        customBlue: '#6D8CDC',
      },
      fontFamily: {
        bagel: ['"Bagel Fat One"', 'serif'],
        baloo: ['"Baloo 2"', 'sans-serif'],
      },
      fontSize: {
        xs: '16px',
        sm: '20px',
        lg:'30px',
        xl: '32px',
       '2xl': '50px',
       '3xl': '96px',
      },
      borderRadius: {
        'md': '5px',
        'lg': '10px',
      }


    },
  },
  plugins: [],
}

