/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#0D0621',
        'space-navy': '#0F0E2E',
        'indigo-glow': '#4F46E5',
        'cyan-spark': '#06B6D4',
        'violet-mid': '#7C3AED',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D0621 0%, #0F0E2E 40%, #1a0533 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(6,182,212,0.1) 100%)',
        'cta-gradient': 'linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)',
      },
      boxShadow: {
        'glow-indigo': '0 0 30px rgba(79,70,229,0.4)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.4)',
        'glass': '0 8px 32px 0 rgba(0,0,0,0.37)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79,70,229,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(79,70,229,0.8)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
      },
    },
  },
  plugins: [],
}
