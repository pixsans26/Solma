/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ott-bg": "var(--ott-bg)",
        "ott-card": "var(--ott-card)",
        "ott-accent": "var(--ott-accent)",
        "ott-text": "var(--ott-text)",
        "ott-muted": "var(--ott-muted)",
        "ott-grad-start": "var(--ott-grad-start)",
        "ott-grad-end": "var(--ott-grad-end)",
      },
      boxShadow: {
        "ott-card": "0 2px 8px rgba(0,0,0,0.125)",
        "ott-glow": "0 4px 16px var(--ott-accent)",
        "ott-nav": "0 -2px 16px rgba(0,0,0,0.62)",
        "ott-hero": "0 0 24px rgba(0,0,0,0.62)",
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}

