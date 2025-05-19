// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cloud-white': '#F7F9FC',
        'pure-white': '#FFFFFF',
        'cyber-teal': '#00F2C3',
        'hyperlink-blue': '#3B82F6',
        'graphite': '#1F2937',
        'slate': '#6B7280',
        'deep-teal-black': '#0D2B2B',
        'mist': '#F3F4F6',
        'ash': '#E5E7EB',
        'emerald-green': '#10B981',
        'amber': '#F59E0B',
        'signal-red': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': '32px',
        'h2': '24px',
        'h3': '20px',
        'h4': '18px',
        'body-primary': '16px',
        'body-secondary': '14px',
        'label': '14px',
        'helper': '12px',
        'button-lg': '16px',
        'button-sm': '14px',
        'input': '16px',
      },
      lineHeight: {
        'body-primary': '1.6',
        'body-secondary': '1.5',
        'snug': '1.375', // Ensure 'snug' is available if used directly
      },
      boxShadow: {
        'level-1': '0px 1px 3px rgba(25, 39, 55, 0.05), 0px 1px 2px rgba(25, 39, 55, 0.03)',
        'level-2': '0px 4px 8px rgba(25, 39, 55, 0.07), 0px 2px 4px rgba(25, 39, 55, 0.05)',
        'level-3': '0px 10px 20px rgba(25, 39, 55, 0.08), 0px 5px 10px rgba(25, 39, 55, 0.06)',
      },
      borderRadius: {
        'ui-element': '8px',
        'card': '8px',
        'modal': '12px',
      },
      keyframes: {
        fadeInScaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0px)' },
        },
      },
      animation: {
        fadeInScaleUp: 'fadeInScaleUp 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};