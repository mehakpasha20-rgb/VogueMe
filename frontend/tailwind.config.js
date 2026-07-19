/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#D45D79', // Deep rose/pink gold
        secondary: '#A9445D', // Darker berry pink
        accent: '#FF8DA1', // Soft coral-pink
        navy: '#351C24', // Deep velvet plum
      },
      animation: {
        slideIn: 'slideIn 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        scaleIn: 'scaleIn 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        slideInUp: 'slideInUp 0.6s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
