/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#EFECE3',
          light: '#F5F3EF',
          dark: '#E5E0D5',
        },
        blue: {
          light: '#8FABD4',
          DEFAULT: '#4A70A9',
          dark: '#3A5A87',
        },
        black: {
          DEFAULT: '#000000',
          light: '#1A1A1A',
          lighter: '#333333',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4A70A9, #8FABD4)',
        'gradient-accent': 'linear-gradient(135deg, #8FABD4, #EFECE3)',
        'gradient-dark': 'linear-gradient(135deg, #000000, #1A1A1A)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(79, 112, 169, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(79, 112, 169, 0.8)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

