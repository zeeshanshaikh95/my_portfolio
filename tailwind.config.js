/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Space Grotesk', 'sans-serif'], body: ['Inter', 'sans-serif'] },
      colors: { ink: '#050816', panel: '#0B1120', card: '#111827', mute: '#9CA3AF' },
      boxShadow: { glow: '0 0 50px rgba(99, 102, 241, .18)' }
    }
  },
  plugins: []
}
