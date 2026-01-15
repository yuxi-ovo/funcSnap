/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        cta: '#2563EB',
        dark: {
          bg: '#0F172A',
          text: '#F1F5F9',
          border: '#334155',
          code: '#0D1117',
        },
        light: {
          bg: '#F8FAFC',
          text: '#1E293B',
          border: '#E2E8F0',
          code: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
