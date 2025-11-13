/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['btn-primary', 'btn-secondary', 'btn-danger'],
  theme: {
    extend: {
      colors: {
        // TODO: implement your own color system if needed
        brand: {
          50: '#e6f8f6',
          100: '#ccefe9',
          200: '#99dfd3',
          300: '#66cfbd',
          400: '#33bfa7',
          500: '#00af91', // main accent
          600: '#008c74',
          700: '#006957',
          800: '#00463a',
          900: '#00231d',
        },
      },
    },
  },
  plugins: [],
};
