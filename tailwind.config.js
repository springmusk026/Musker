/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D3FE7',
          dark: '#1E2B9F',
          light: '#4557FF'
        },
        secondary: {
          DEFAULT: '#0F172A',
          light: '#1E293B'
        },
        accent: {
          DEFAULT: '#7C3AED',
          light: '#9F67FF'
        },
        surface: {
          DEFAULT: '#0A0F1E',
          light: '#131B2E',
          lighter: '#1C2842'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounce 1s ease-in-out 2'
      },
      backdropBlur: {
        'xs': '2px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography'),
  ],
}