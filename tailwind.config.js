/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'sans-serif'],
        bn: ['Hind Siliguri', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
        brand: {
  50:  '#fffdf2',
  100: '#fff9db',
  200: '#fff1b3',
  300: '#ffe680',
  400: '#ffd94d',
  500: '#FFCE1B',
  600: '#e6b800',
  700: '#cc9f00',
  800: '#997700',
  900: '#665000',
},
},
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
    },
  },
  plugins: [],
}
