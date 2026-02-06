/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./works/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        serif: ['"Zen Old Mincho"', 'serif'],
        display: ['Teko', 'sans-serif'],
      },
      colors: {
        stone: {
            50: '#F7F5F2', // Type-A Custom
            900: '#1A1A1A', // Type-A Custom
        },
        'accent-gold': '#A68B67', // Type-A Corrected
        'neutral-850': '#1f1f1f', // Type-A
        brand: {
            yellow: '#FACC15', // Type-B
            black: '#050505',  // Type-B
            dark: '#121212',   // Type-B
            gray: '#1F1F1F',   // Type-B
            navy: '#0F172A',   // Type-C
            gold: '#A68A5E',   // Type-C (Note: Different from Type-B yellow, but uses 'brand-gold')
            base: '#FFFFFF',   // Type-C
            light: '#F8FAFC'   // Type-C
        }
      },
      boxShadow: {
        'dreamy': '0 20px 40px -10px rgba(0, 0, 0, 0.15)', // Type-A
      }
    },
  },
  plugins: [],
}
