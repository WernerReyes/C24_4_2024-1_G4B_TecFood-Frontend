/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class
  theme: {
    extend: {
      colors: {
        'primary': '#00B1F7',
        'primary-dark': '#0089CC',
        'primary-darker': '#006BA9',
        'primary-light': '#33C6FF',
        'primary-lighter': '#66D4FF',
        'primary-lightest': '#99E2FF',


        'secondary': '#FDC55E',
        'secondary-dark': '#FDCE71',
        'secondary-darker': '#FDD785',
        'secondary-light': '#FDD785',
        'secondary-lighter': '#FDE399',


        "dashboard-dark": "#111827",
         
        "skeleton": "#f4f5f7",
        "skeleton-dark": "#1f2937",
        "skeleton-darker": "#111827",
        "skeleton-light": "#f9fafb",
        "skeleton-lighter": "#f9fafb",
      },
      fontFamily: {
        'cabin': ['"Cabin", sans-serif'],
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      dropShadow: {
        'primary': '0 5px 105px #00B1F7',
        'primary-dark': '0 5px 105px #FDCE71'
      },

      backgroundImage: theme => ({
        'gradient-primary': "linear-gradient(to left bottom, #69d4ff, #98daff, #bbe0ff, #d7e7ff, #ecf0ff, #f3f5ff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff)",
        'gradient-primary-dark': "linear-gradient(to left, #3f331e, #332c1a, #292416, #1f1d12, #16150d, #12110a, #0c0c07, #060604, #060604, #060604, #060604, #060604)",
      }),
    },
  },

  plugins: [

  ],
}