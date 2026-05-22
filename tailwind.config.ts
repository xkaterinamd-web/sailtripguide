import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F2044',
          50: '#E8EDF5',
          100: '#C5D0E6',
          200: '#8FA5CC',
          300: '#5978B3',
          400: '#2D4F8F',
          500: '#0F2044',
          600: '#0B1A38',
          700: '#08132B',
          800: '#050D1F',
          900: '#020712',
        },
        teal: {
          DEFAULT: '#0EA5E9',
          50: '#E0F5FD',
          100: '#BAE9FA',
          200: '#7BD3F6',
          300: '#3BBEF2',
          400: '#0EA5E9',
          500: '#0B84BA',
          600: '#08638B',
          700: '#05425D',
          800: '#03212E',
          900: '#010D12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
