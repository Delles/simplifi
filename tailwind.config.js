// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base Colors
        'cloud-white': '#F7F9FC',
        'pure-white': '#FFFFFF',
        'app-canvas': '#F7F9FC',
        'graphite': '#2D3748',
        'slate': '#5A6A7F',
        'deep-teal-black': '#0D2B2B',
        'mist': '#F3F4F6',
        'ash': '#E5E7EB',
        'silver': '#9CA3AF',

        // Primary Brand Colors
        'theme-blue': '#3c7fba',
        'theme-blue-light': '#63a4d4',
        'theme-blue-dark': '#2c5d8a',
        'digital-lavender': '#E0D8FF',

        // Action-Specific Colors (from PDR design language)
        'create': {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#c7e4ff',
          300: '#9fd1ff',
          400: '#66b3ff',
          500: '#3c7fba', // theme-blue
          600: '#2c5d8a', // theme-blue-dark
          700: '#1d4167',
          800: '#152e4d',
          900: '#0f1e33',
        },
        'create-primary': '#3c7fba',
        'create-secondary': '#2c5d8a',
        'create-light': '#f0f7ff',

        'manage': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10B981', // emerald-green
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        'manage-primary': '#10B981',
        'manage-secondary': '#059669',
        'manage-light': '#f0fdf4',

        'distribute': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F59E0B', // amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'distribute-primary': '#F59E0B',
        'distribute-secondary': '#d97706',
        'distribute-light': '#fffbeb',

        // Risk Communication (Traffic Light System)
        'risk': {
          'safe': '#10B981',      // emerald-green
          'caution': '#F59E0B',   // amber
          'danger': '#EF4444',    // signal-red
          'safe-bg': '#f0fdf4',
          'caution-bg': '#fffbeb',
          'danger-bg': '#fef2f2',
        },

        // Educational Components
        'education': {
          'primary': '#3c7fba',     // theme-blue
          'secondary': '#E0D8FF',   // digital-lavender
          'background': '#f8fafc',
          'border': '#e2e8f0',
          'tooltip-bg': '#1e293b',
          'tooltip-text': '#f8fafc',
        },

        // Status & Feedback Colors
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6',

        // Legacy mappings (maintain compatibility)
        'emerald-green': '#10B981',
        'amber': '#F59E0B',
        'signal-red': '#EF4444',
        'link-blue': '#3B82F6',
        'app-blue': '#3c7fba',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },

      fontSize: {
        // Enhanced Typography Scale
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.05em' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
        '6xl': ['60px', { lineHeight: '1' }],
        '7xl': ['72px', { lineHeight: '1' }],

        // Semantic Font Sizes
        'h1': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '44px', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '24px', fontWeight: '500' }],
        'body-xl': ['18px', { lineHeight: '28px' }],
        'body-lg': ['16px', { lineHeight: '24px' }],
        'body-primary': ['16px', { lineHeight: '24px' }],
        'body-secondary': ['14px', { lineHeight: '20px' }],
        'caption': ['12px', { lineHeight: '16px', letterSpacing: '0.05em' }],
        'button-lg': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'button-md': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'button-sm': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'label': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'helper': ['12px', { lineHeight: '16px' }],
        'input': ['16px', { lineHeight: '24px' }],
      },

      spacing: {
        // Enhanced Spacing Scale for Better Layouts
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '100': '25rem',   // 400px
        '112': '28rem',   // 448px
        '128': '32rem',   // 512px
      },

      boxShadow: {
        // Enhanced Shadow System
        'level-1': '0px 1px 3px rgba(25, 39, 55, 0.05), 0px 1px 2px rgba(25, 39, 55, 0.03)',
        'level-2': '0px 4px 8px rgba(25, 39, 55, 0.07), 0px 2px 4px rgba(25, 39, 55, 0.05)',
        'level-3': '0px 10px 20px rgba(25, 39, 55, 0.08), 0px 5px 10px rgba(25, 39, 55, 0.06)',
        'level-4': '0px 25px 50px rgba(25, 39, 55, 0.12), 0px 12px 24px rgba(25, 39, 55, 0.08)',

        // Interactive Shadows
        'soft-lift': '0px 12px 24px rgba(0,0,0,0.07), 0px 4px 8px rgba(0,0,0,0.05)',
        'soft-hover': '0px 18px 36px rgba(0,0,0,0.08), 0px 6px 12px rgba(0,0,0,0.06)',
        'interactive': '0px 4px 12px rgba(60, 127, 186, 0.15), 0px 2px 4px rgba(60, 127, 186, 0.08)',
        'interactive-hover': '0px 8px 24px rgba(60, 127, 186, 0.2), 0px 4px 8px rgba(60, 127, 186, 0.12)',

        // Educational Components
        'tooltip': '0px 4px 12px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.08)',
        'modal': '0px 20px 40px rgba(0, 0, 0, 0.15), 0px 8px 16px rgba(0, 0, 0, 0.08)',
        'card': '0px 2px 8px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0px 8px 16px rgba(0, 0, 0, 0.12), 0px 4px 8px rgba(0, 0, 0, 0.06)',
      },

      borderRadius: {
        // Enhanced Border Radius System
        'none': '0',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        'full': '9999px',

        // Semantic Border Radius
        'ui-element': '8px',
        'card': '12px',
        'modal': '16px',
        'feature-module': '20px',
        'button': '8px',
        'input': '8px',
        'badge': '12px',
        'tooltip': '6px',
      },

      keyframes: {
        // Enhanced Animations
        fadeInScaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        // Enhanced Animation System
        'fade-in-scale-up': 'fadeInScaleUp 0.2s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.3s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 1s ease-in-out infinite',
        'spin-slow': 'spin-slow 2s linear infinite',

        // Legacy support
        'fadeInScaleUp': 'fadeInScaleUp 0.2s ease-out forwards',
      },

      backdropBlur: {
        xs: '2px',
      },

      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },

      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};