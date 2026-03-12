import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // allow toggling light/dark with a class on html or body
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px",
        },
      },
      colors: {
        brand: {
          DEFAULT: "#111827",
          light: "#1f2937",
          accent: "#f97316",
        },
        neutral: {
          50: "#f9fafb",
          800: "#1f2937",
          900: "#111827",
        },
      },
      boxShadow: {
        soft: "0 10px 40px rgba(15, 23, 42, 0.10)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;

