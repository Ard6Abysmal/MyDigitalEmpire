/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode for theme switcher
  theme: {
    extend: {
      colors: {
        // True Dark Palette
        'true-black': '#000000',
        'dark-bg': '#0a0a0a',
        'dark-surface': '#111111',
        'dark-border': '#1a1a1a',
        
        // Light theme colors (NEW for theme switcher)
        'light-bg': '#ffffff',
        'light-surface': '#f8f9fa',
        'light-border': '#e9ecef',
        'light-text': '#212529',
        'light-muted': '#6c757d',
        
        // Accent Colors (Empire colors - work for both themes)
        'empire-purple': '#a855f7',
        'empire-cyan': '#06b6d4',
        'empire-green': '#10b981',
        'empire-orange': '#f97316',
        'empire-pink': '#ec4899',
        
        // Text Colors
        'empire-text': '#f8fafc',
        'text-muted': '#94a3b8',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
