/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        primary: '#2b7177',
        primaryLight: '#E5EDD8',
        accent: '#0b3460',
        grayBrand: '#999999',
        grayBrandLight: '#fafafa',
        text: '#050505',
        // ...
      },
    },
  },
  plugins: [],
}
