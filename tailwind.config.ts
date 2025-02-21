import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "chess-pulse": "chess-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "chess-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.7",
          },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "chess-light": '#FFD700',
        "chess-dark": '#003366',
        "chess-highlight": "#87CEFA",
      },
    },
  },
  plugins: [],
} satisfies Config;
