/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1E1E20",
        paper: "#F6F1E6",
        ink: "#22201E",
        muted: "#7A7873",
        accent: "#B33A2E",
        "border-dark": "#3A3A40",
        "border-paper": "#DDD6C5",
        success: "#2E5339",
      },
      fontFamily: {
        vazir: ["Vazirmatn", "system-ui", "sans-serif"],
        display: ["Vazirmatn", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'editorial': '6px',
        'editorial-lg': '12px',
      },
      maxWidth: {
        'newspaper': '1440px',
      }
    },
  },
  plugins: [],
}
