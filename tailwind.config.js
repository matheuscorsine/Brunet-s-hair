/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais do app Brunet's hair
        cream: {
          DEFAULT: '#FFF7E5',
          50: '#FFFDF8',
          100: '#FFF7E5',
          200: '#FFEFC9',
        },
        brown: {
          DEFAULT: '#59483E',
          light: '#7A6A5E',
          dark: '#3D312B',
        },
        pink: {
          DEFAULT: '#F5A3AF',
          light: '#F8AFB8',
          50: '#FFF0F2',
          100: '#FECDD0',
          200: '#FDA4AF',
        },
        rose: {
          DEFAULT: '#FECDD0',
          light: '#FFE4E6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        'soft': '12px',
        'soft-lg': '16px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(89, 72, 62, 0.08)',
        'soft-lg': '0 4px 16px rgba(89, 72, 62, 0.12)',
      },
    },
  },
  plugins: [],
}
