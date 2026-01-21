/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfaf3',
          100: '#faf4e6',
          200: '#f3e5c0',
          300: '#ecd699',
          400: '#deb86f',
          500: '#d4a353',
          600: '#c68d43',
          700: '#a67539',
          800: '#885f33',
          900: '#6f4f2c',
        },
        rose: {
          50: '#fdf4f5',
          100: '#fce7ea',
          200: '#fbd4d9',
          300: '#f7b1bc',
          400: '#f28198',
          500: '#e85678',
          600: '#d13a5f',
          700: '#b02d4f',
          800: '#932848',
          900: '#7d2643',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
