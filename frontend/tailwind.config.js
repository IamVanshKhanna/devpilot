/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dp-bg": "#0A0E27",
        "dp-accent": "#6366F1",
        "dp-glow": "#22D3EE",
        "dp-text": "#F8FAFC",
        "dp-muted": "#94A3B8",
      }
    },
  },
  plugins: [],
}