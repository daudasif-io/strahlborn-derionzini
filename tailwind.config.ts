import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        gold: {
          light: "#e8c97a",
          DEFAULT: "#c9a84c",
          dark: "#a07830",
        },
        manor: {
          bg: "#0d1117",
          surface: "#111820",
        },
      },
      animation: {
        "orbit-slow": "orbit 12s linear infinite",
        "float-up": "floatUp 3s ease-out forwards",
        "fade-in": "fadeIn 1.5s ease forwards",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;