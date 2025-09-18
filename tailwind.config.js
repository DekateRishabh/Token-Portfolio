/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: "#0f0f0f",
          card: "#1a1a1a",
          surface: "#262626",
          border: "#404040",
          text: {
            primary: "#ffffff",
            secondary: "#a3a3a3",
            muted: "#737373",
          },
        },
        // Accent colors
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
        // Chart colors
        chart: {
          blue: "#3b82f6",
          teal: "#14b8a6",
          orange: "#f97316",
          red: "#ef4444",
          yellow: "#eab308",
          purple: "#a855f7",
          pink: "#ec4899",
          cyan: "#06b6d4",
        },
      },
      boxShadow: {
        "dark-card":
          "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
