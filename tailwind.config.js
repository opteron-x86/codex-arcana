/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables dark mode using a class (toggle with 'dark' class)
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1d', // Very dark background for RPG mood
        'dark-gray': '#2c2c2e', // Dark gray for UI containers
        'medium-gray': '#585858', // Medium gray for borders or subdued text
        'light-gray': '#d1d1d4', // Light gray for text or highlights
        'off-white': '#f1f1f5', // Soft white for contrast
        'gold': '#d4af37', // Gold for important highlights or accents
        'ember': '#7c0a02', // Deep ember red for aggressive actions or errors
        'parchment-bg': '#ebe4c9', // Parchment-like background for cards
        'steel-gray': '#404040', // Steely metallic gray for subtle borders
      },
      fontFamily: {
        'serif': ['"Merriweather"', 'Georgia', 'Cambria', 'serif'], // Sophisticated serif for headers
        'sans': ['"Open Sans"', '"Inter"', 'Avenir', 'sans-serif'], // Clean sans-serif for body text
      },
      boxShadow: {
        'glow-gold': '0 0 15px rgba(212, 175, 55, 0.7)', // Golden glow for highlights
        'inner-dark': 'inset 0 0 10px rgba(0, 0, 0, 0.6)', // Subtle dark inner glow
        'card': '0 2px 6px rgba(0, 0, 0, 0.4)', // Card-like shadows
        'soft': '0 2px 4px rgba(0, 0, 0, 0.3)', // General UI element shadow
      },
      backgroundImage: {
        'parchment': "url('/images/parchment-bg.jpg')", // Background for cards or menu
        'grunge': "url('/images/grunge-dark.jpg')", // Dark grunge texture
      },
      spacing: {
        '18': '4.5rem', // Custom spacing for buttons and padding
        '22': '5.5rem', // Additional spacing options
      },
      borderRadius: {
        'xl': '1rem', // Rounded corners for cards or buttons
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
